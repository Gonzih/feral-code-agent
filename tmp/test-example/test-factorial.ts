// Test script for factorial function generation
// Expected output: A TypeScript function that calculates factorial with error handling

import { Coordinator } from '../../src/coordinator';
import { MockLLM } from '../../src/mocks/mockLLM';

async function testFactorialGeneration() {
  // For demonstration, using MockLLM. In real usage, use GrokLLM with API key
  // const apiKey = process.env.XAI_API_KEY;
  // const llm = new GrokLLM(apiKey);

  const llm = new MockLLM();
  const coordinator = new Coordinator(llm);

  const task = 'Create a TypeScript function that calculates the factorial of a number with proper error handling for negative numbers and non-integer inputs.';

  console.log('Task:', task);
  console.log('Processing with feral-code agent...\n');

  try {
    const result = await coordinator.processTask(task);
    console.log('Final Result:');
    console.log('=============');
    console.log(result);
    console.log('=============\n');

    // Assessment
    assessQuality(result);
  } catch (error) {
    console.error('Error:', error);
  }
}

function assessQuality(output: string) {
  console.log('Quality Assessment:');
  console.log('==================');

  const criteria = [
    { name: 'TypeScript syntax', check: output.includes('function') && output.includes(':') },
    { name: 'Error handling for negative', check: output.includes('negative') || output.includes('< 0') },
    { name: 'Error handling for non-integer', check: output.includes('integer') || output.includes('Number.isInteger') },
    { name: 'Recursive or iterative implementation', check: output.includes('factorial') },
    { name: 'Return type annotation', check: output.includes('number') },
    { name: 'Input validation', check: output.includes('if') || output.includes('throw') },
  ];

  criteria.forEach(criterion => {
    console.log(`${criterion.name}: ${criterion.check ? '✓' : '✗'}`);
  });

  const score = criteria.filter(c => c.check).length;
  console.log(`\nOverall Score: ${score}/${criteria.length} (${Math.round(score/criteria.length*100)}%)`);

  if (score >= 4) {
    console.log('Quality: EXCELLENT - Ready for production');
  } else if (score >= 3) {
    console.log('Quality: GOOD - Minor improvements needed');
  } else {
    console.log('Quality: NEEDS IMPROVEMENT - Significant issues');
  }
}

// Run the test
testFactorialGeneration();
