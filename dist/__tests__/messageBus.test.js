"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const messageBus_1 = require("../messageBus");
describe('MessageBus', () => {
    it('should send message to specific recipient', () => {
        const bus = new messageBus_1.MessageBus();
        const mockListener = jest.fn();
        bus.on('test', mockListener);
        const message = { type: 'test', content: 'hello', from: 'sender', to: 'test' };
        bus.send(message);
        expect(mockListener).toHaveBeenCalledWith(message);
    });
    it('should broadcast message to all', () => {
        const bus = new messageBus_1.MessageBus();
        const mockListener1 = jest.fn();
        const mockListener2 = jest.fn();
        bus.on('all', mockListener1);
        bus.on('all', mockListener2);
        const message = { type: 'broadcast', content: 'hello all', from: 'sender' };
        bus.broadcast(message);
        expect(mockListener1).toHaveBeenCalledWith(message);
        expect(mockListener2).toHaveBeenCalledWith(message);
    });
    it('should not call listener for different recipient', () => {
        const bus = new messageBus_1.MessageBus();
        const mockListener = jest.fn();
        bus.on('other', mockListener);
        const message = { type: 'test', content: 'hello', from: 'sender', to: 'test' };
        bus.send(message);
        expect(mockListener).not.toHaveBeenCalled();
    });
});
//# sourceMappingURL=messageBus.test.js.map