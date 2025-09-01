import { BaseAgent } from './base';
import { Message } from '../interfaces/llm';

export class SecurityAgent extends BaseAgent {
  protected getAgentName(): string {
    return 'security';
  }

  async process(message: Message): Promise<Message> {
    if (message.type === 'optimize_response') {
      const prompt = `As a security agent, analyze and fix security vulnerabilities in this code: ${message.content}`;
      const secured = await this.llm.generate(prompt);
      return {
        type: 'security_response',
        content: secured,
        from: 'security',
        to: 'documenter'
      };
    }
    return message;
  }
}
