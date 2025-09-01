import { BaseAgent } from './base';
import { Message } from '../interfaces/llm';

export class ReviewerAgent extends BaseAgent {
  protected getAgentName(): string {
    return 'reviewer';
  }

  async process(message: Message): Promise<Message> {
    if (message.type === 'document_response') {
      const prompt = `As a review agent, review and improve this code: ${message.content}`;
      const review = await this.llm.generate(prompt);
      return {
        type: 'review_response',
        content: review,
        from: 'reviewer',
        to: 'user'
      };
    }
    return message;
  }
}
