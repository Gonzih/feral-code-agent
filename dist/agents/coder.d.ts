import { BaseAgent } from './base';
import { Message } from '../interfaces/llm';
export declare class CoderAgent extends BaseAgent {
    protected getAgentName(): string;
    process(message: Message): Promise<Message>;
}
//# sourceMappingURL=coder.d.ts.map