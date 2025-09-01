"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageBus = void 0;
const events_1 = require("events");
class MessageBus extends events_1.EventEmitter {
    send(message) {
        if (!message)
            return;
        this.emit(message.to || 'all', message);
    }
    broadcast(message) {
        if (!message)
            return;
        this.emit('all', message);
    }
}
exports.MessageBus = MessageBus;
//# sourceMappingURL=messageBus.js.map