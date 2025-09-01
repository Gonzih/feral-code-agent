import { EventEmitter } from 'events';
import { Message } from './interfaces/llm';

export class MessageBus extends EventEmitter {
  send(message: Message) {
    if (!message) return;
    this.emit(message.to || 'all', message);
  }

  broadcast(message: Message) {
    if (!message) return;
    this.emit('all', message);
  }
}
