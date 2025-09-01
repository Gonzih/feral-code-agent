import { BaseAgent } from './base';
import { Message } from '../interfaces/llm';

export class DocumenterAgent extends BaseAgent {
  protected getAgentName(): string {
    return 'documenter';
  }

  async process(message: Message): Promise<Message> {
    if (message.type === 'security_response') {
      const prompt = `As a documentation agent, generate comprehensive documentation for this code: ${message.content}`;
      const docs = await this.llm.generate(prompt);
      return {
        type: 'document_response',
        content: docs,
        from: 'documenter',
        to: 'reviewer'
      };
    }
    return message;
  }
}
