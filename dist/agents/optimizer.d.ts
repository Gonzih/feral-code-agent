import { BaseAgent } from './base';
import { Message } from '../interfaces/llm';
export declare class OptimizerAgent extends BaseAgent {
    protected getAgentName(): string;
    process(message: Message): Promise<Message>;
}
//# sourceMappingURL=optimizer.d.ts.map