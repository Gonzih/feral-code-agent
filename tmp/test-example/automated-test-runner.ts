// Automated test runner for feral-code agent quality assessment

import { Coordinator } from '../../src/coordinator';
import { MockLLM } from '../../src/mocks/mockLLM';
import * as fs from 'fs';
import * as path from 'path';

interface TestCase {
  name: string;
  task: string;
  criteria: {
    name: string;
    check: (output: string) => boolean;
  }[];
}

interface TestResult {
  testCase: string;
  output: string;
  score: number;
  maxScore: number;
  percentage: number;
  quality: string;
  criteriaResults: { name: string; passed: boolean }[];
}

class AutomatedTester {
  private coordinator: Coordinator;
  private results: TestResult[] = [];

  constructor() {
    const llm = new MockLLM();
    this.coordinator = new Coordinator(llm);
  }

  async runTest(testCase: TestCase): Promise<TestResult> {
    console.log(`\n🧪 Running test: ${testCase.name}`);
    console.log(`Task: ${testCase.task}`);

    const output = await this.coordinator.processTask(testCase.task);

    const criteriaResults = testCase.criteria.map(criterion => ({
      name: criterion.name,
      passed: criterion.check(output)
    }));

    const score = criteriaResults.filter(r => r.passed).length;
    const maxScore = testCase.criteria.length;
    const percentage = Math.round((score / maxScore) * 100);

    let quality: string;
    if (percentage >= 80) quality = 'EXCELLENT';
    else if (percentage >= 60) quality = 'GOOD';
    else if (percentage >= 40) quality = 'FAIR';
    else quality = 'NEEDS IMPROVEMENT';

    const result: TestResult = {
      testCase: testCase.name,
      output,
      score,
      maxScore,
      percentage,
      quality,
      criteriaResults
    };

    this.results.push(result);
    return result;
  }

  async runAllTests(testCases: TestCase[]): Promise<void> {
    console.log('🚀 Starting automated feral-code agent testing...\n');

    for (const testCase of testCases) {
      const result = await this.runTest(testCase);
      this.printResult(result);
    }

    this.generateReport();
  }

  private printResult(result: TestResult): void {
    console.log(`\n📊 Results for: ${result.testCase}`);
    console.log(`Score: ${result.score}/${result.maxScore} (${result.percentage}%)`);
    console.log(`Quality: ${result.quality}`);

    console.log('\nCriteria:');
    result.criteriaResults.forEach(criterion => {
      console.log(`  ${criterion.passed ? '✅' : '❌'} ${criterion.name}`);
    });

    console.log('\n' + '='.repeat(50));
  }

  private generateReport(): void {
    const report = {
      timestamp: new Date().toISOString(),
      totalTests: this.results.length,
      averageScore: Math.round(this.results.reduce((sum, r) => sum + r.percentage, 0) / this.results.length),
      excellentTests: this.results.filter(r => r.quality === 'EXCELLENT').length,
      goodTests: this.results.filter(r => r.quality === 'GOOD').length,
      fairTests: this.results.filter(r => r.quality === 'FAIR').length,
      needsImprovementTests: this.results.filter(r => r.quality === 'NEEDS IMPROVEMENT').length,
      results: this.results
    };

    const reportPath = path.join(__dirname, 'test-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    console.log('\n📈 Final Report Generated');
    console.log(`Total Tests: ${report.totalTests}`);
    console.log(`Average Score: ${report.averageScore}%`);
    console.log(`Excellent: ${report.excellentTests}`);
    console.log(`Good: ${report.goodTests}`);
    console.log(`Fair: ${report.fairTests}`);
    console.log(`Needs Improvement: ${report.needsImprovementTests}`);
    console.log(`\nReport saved to: ${reportPath}`);
  }
}

// Define test cases
const testCases: TestCase[] = [
  {
    name: 'Factorial Function',
    task: 'Create a TypeScript function that calculates the factorial of a number with proper error handling for negative numbers and non-integer inputs.',
    criteria: [
      { name: 'TypeScript syntax', check: (o) => o.includes('function') && o.includes(': number') },
      { name: 'Error handling for negative', check: (o) => o.includes('negative') || o.includes('< 0') },
      { name: 'Error handling for non-integer', check: (o) => o.includes('integer') || o.includes('Number.isInteger') },
      { name: 'Iterative implementation', check: (o) => o.includes('for') || o.includes('while') },
      { name: 'Input validation', check: (o) => o.includes('if') && o.includes('throw') },
      { name: 'Documentation', check: (o) => o.includes('/**') || o.includes('* @') }
    ]
  },
  {
    name: 'React Component',
    task: 'Create a React functional component that displays a counter with increment and decrement buttons.',
    criteria: [
      { name: 'React import', check: (o) => o.includes('import React') || o.includes('from "react"') },
      { name: 'Functional component', check: (o) => o.includes('const') && o.includes('=>') },
      { name: 'useState hook', check: (o) => o.includes('useState') },
      { name: 'Event handlers', check: (o) => o.includes('onClick') },
      { name: 'JSX return', check: (o) => o.includes('return') && o.includes('<') },
      { name: 'TypeScript types', check: (o) => o.includes(':') && o.includes('number') }
    ]
  },
  {
    name: 'API Endpoint',
    task: 'Create an Express.js API endpoint that handles POST requests for user registration with validation.',
    criteria: [
      { name: 'Express import', check: (o) => o.includes('express') },
      { name: 'Router setup', check: (o) => o.includes('router') || o.includes('app.') },
      { name: 'POST method', check: (o) => o.includes('post') },
      { name: 'Request validation', check: (o) => o.includes('body') || o.includes('req.') },
      { name: 'Error handling', check: (o) => o.includes('try') || o.includes('catch') },
      { name: 'Response sending', check: (o) => o.includes('res.') || o.includes('json') }
    ]
  }
];

// Run automated tests
const tester = new AutomatedTester();
tester.runAllTests(testCases).catch(console.error);
