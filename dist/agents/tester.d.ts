import { BaseAgent } from './base';
import { Message } from '../interfaces/llm';
export declare class TesterAgent extends BaseAgent {
    protected getAgentName(): string;
    process(message: Message): Promise<Message>;
}
//# sourceMappingURL=tester.d.ts.map