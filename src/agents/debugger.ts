import { BaseAgent } from './base';
import { Message } from '../interfaces/llm';

export class DebuggerAgent extends BaseAgent {
  protected getAgentName(): string {
    return 'debugger';
  }

  async process(message: Message): Promise<Message> {
    if (message.type === 'test_response') {
      const prompt = `As a debugger agent, analyze and fix bugs in this code: ${message.content}`;
      const debugged = await this.llm.generate(prompt);
      return {
        type: 'debug_response',
        content: debugged,
        from: 'debugger',
        to: 'optimizer'
      };
    }
    return message;
  }
}
