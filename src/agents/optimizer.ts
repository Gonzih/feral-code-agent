import { BaseAgent } from './base';
import { Message } from '../interfaces/llm';

export class OptimizerAgent extends BaseAgent {
  protected getAgentName(): string {
    return 'optimizer';
  }

  async process(message: Message): Promise<Message> {
    if (message.type === 'debug_response') {
      const prompt = `As an optimization agent, improve performance and efficiency of this code: ${message.content}`;
      const optimized = await this.llm.generate(prompt);
      return {
        type: 'optimize_response',
        content: optimized,
        from: 'optimizer',
        to: 'security'
      };
    }
    return message;
  }
}
