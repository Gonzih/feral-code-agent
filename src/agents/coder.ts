import { BaseAgent } from './base';
import { Message } from '../interfaces/llm';

export class CoderAgent extends BaseAgent {
  protected getAgentName(): string {
    return 'coder';
  }

  async process(message: Message): Promise<Message> {
    if (message.type === 'plan_response') {
      const prompt = `As a coding agent, generate code based on this plan: ${message.content}`;
      const code = await this.llm.generate(prompt);
      return {
        type: 'code_response',
        content: code,
        from: 'coder',
        to: 'tester'
      };
    }
    return message;
  }
}
