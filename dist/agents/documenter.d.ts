import { BaseAgent } from './base';
import { Message } from '../interfaces/llm';
export declare class DocumenterAgent extends BaseAgent {
    protected getAgentName(): string;
    process(message: Message): Promise<Message>;
}
//# sourceMappingURL=documenter.d.ts.map