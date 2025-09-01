import { BaseAgent } from './base';
import { Message } from '../interfaces/llm';
export declare class ReviewerAgent extends BaseAgent {
    protected getAgentName(): string;
    process(message: Message): Promise<Message>;
}
//# sourceMappingURL=reviewer.d.ts.map