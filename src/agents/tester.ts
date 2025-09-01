import { BaseAgent } from './base';
import { Message } from '../interfaces/llm';

export class TesterAgent extends BaseAgent {
  protected getAgentName(): string {
    return 'tester';
  }

  async process(message: Message): Promise<Message> {
    if (message.type === 'code_response') {
      const prompt = `As a testing agent, write comprehensive tests for this code: ${message.content}`;
      const tests = await this.llm.generate(prompt);
      return {
        type: 'test_response',
        content: tests,
        from: 'tester',
        to: 'debugger'
      };
    }
    return message;
  }
}
