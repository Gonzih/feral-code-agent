import { LLM, Message } from '../interfaces/llm';
import { MessageBus } from '../messageBus';
export declare abstract class BaseAgent {
    protected llm: LLM;
    protected bus: MessageBus;
    constructor(llm: LLM, bus: MessageBus);
    protected setupListeners(): void;
    protected abstract getAgentName(): string;
    protected handleMessage(message: Message): Promise<void>;
    abstract process(message: Message): Promise<Message>;
}
//# sourceMappingURL=base.d.ts.map