import { BaseAgent } from './base';
import { Message } from '../interfaces/llm';
export declare class DebuggerAgent extends BaseAgent {
    protected getAgentName(): string;
    process(message: Message): Promise<Message>;
}
//# sourceMappingURL=debugger.d.ts.map