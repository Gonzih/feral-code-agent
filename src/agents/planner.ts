import { BaseAgent } from './base';
import { Message } from '../interfaces/llm';

export class PlannerAgent extends BaseAgent {
  protected getAgentName(): string {
    return 'planner';
  }

  async process(message: Message): Promise<Message> {
    if (message.type === 'plan') {
      const prompt = `As a planning agent, break down the following coding task into steps: ${message.content}`;
      const plan = await this.llm.generate(prompt);
      return {
        type: 'plan_response',
        content: plan,
        from: 'planner',
        to: 'coder'
      };
    }
    return message;
  }
}
