import { BaseAgent } from './base';
import { Message } from '../interfaces/llm';
export declare class SecurityAgent extends BaseAgent {
    protected getAgentName(): string;
    process(message: Message): Promise<Message>;
}
//# sourceMappingURL=security.d.ts.map