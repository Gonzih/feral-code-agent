import { MessageBus } from '../messageBus';
import { Message } from '../interfaces/llm';

describe('MessageBus', () => {
  it('should send message to specific recipient', () => {
    const bus = new MessageBus();
    const mockListener = jest.fn();
    bus.on('test', mockListener);

    const message: Message = { type: 'test', content: 'hello', from: 'sender', to: 'test' };
    bus.send(message);

    expect(mockListener).toHaveBeenCalledWith(message);
  });

  it('should broadcast message to all', () => {
    const bus = new MessageBus();
    const mockListener1 = jest.fn();
    const mockListener2 = jest.fn();
    bus.on('all', mockListener1);
    bus.on('all', mockListener2);

    const message: Message = { type: 'broadcast', content: 'hello all', from: 'sender' };
    bus.broadcast(message);

    expect(mockListener1).toHaveBeenCalledWith(message);
    expect(mockListener2).toHaveBeenCalledWith(message);
  });

  it('should not call listener for different recipient', () => {
    const bus = new MessageBus();
    const mockListener = jest.fn();
    bus.on('other', mockListener);

    const message: Message = { type: 'test', content: 'hello', from: 'sender', to: 'test' };
    bus.send(message);

    expect(mockListener).not.toHaveBeenCalled();
  });
});
