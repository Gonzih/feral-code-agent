import { EventEmitter } from 'events';
import { Message } from './interfaces/llm';
export declare class MessageBus extends EventEmitter {
    send(message: Message): void;
    broadcast(message: Message): void;
}
//# sourceMappingURL=messageBus.d.ts.map