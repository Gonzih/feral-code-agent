import { LLM } from '../interfaces/llm';

export class MockLLM implements LLM {
  async generate(prompt: string): Promise<string> {
    // Handle planning agent prompts
    if (prompt.includes('planning agent, break down the following coding task into steps:')) {
      return 'Plan: Step 1, Step 2';
    }

    // Handle coding agent prompts
    if (prompt.includes('coding agent, generate code based on this plan:')) {
      return 'function code() {}';
    }

    // Handle testing agent prompts
    if (prompt.includes('testing agent, write comprehensive tests for this code:')) {
      return 'Test cases';
    }

    // Handle debugger agent prompts
    if (prompt.includes('debugger agent, analyze and fix bugs in this code:')) {
      return 'Debugged code';
    }

    // Handle optimization agent prompts
    if (prompt.includes('optimization agent, improve performance and efficiency of this code:')) {
      return 'Optimized code';
    }

    // Handle security agent prompts
    if (prompt.includes('security agent, analyze and fix security vulnerabilities in this code:')) {
      return 'Secured code';
    }

    // Handle documentation agent prompts
    if (prompt.includes('documentation agent, generate comprehensive documentation for this code:')) {
      return 'Documentation';
    }

    // Handle review agent prompts
    if (prompt.includes('review agent, review and improve this code:')) {
      return 'Reviewed code';
    }

    // Handle specific test prompts
    if (prompt.includes('As a planning agent, break down')) {
      return 'Plan: Step 1, Step 2';
    }
    if (prompt.includes('As a coding agent, generate')) {
      return 'function code() {}';
    }
    if (prompt.includes('As a testing agent, write')) {
      return 'Test cases';
    }
    if (prompt.includes('As a debugger agent, analyze')) {
      return 'Debugged code';
    }
    if (prompt.includes('As an optimization agent, improve')) {
      return 'Optimized code';
    }
    if (prompt.includes('As a security agent, analyze')) {
      return 'Secured code';
    }
    if (prompt.includes('As a documentation agent, generate')) {
      return 'Documentation';
    }
    if (prompt.includes('As a review agent, review')) {
      return 'Reviewed code';
    }

    // Fallback for any other prompts
    return `Mock response for: ${prompt}`;
  }
}
