import { LLM, Message } from '../interfaces/llm';
import { MessageBus } from '../messageBus';

export abstract class BaseAgent {
  protected llm: LLM;
  protected bus: MessageBus;

  constructor(llm: LLM, bus: MessageBus) {
    this.llm = llm;
    this.bus = bus;
    this.setupListeners();
  }

  protected setupListeners() {
    this.bus.on(this.getAgentName(), (message: Message) => {
      this.handleMessage(message);
    });
  }

  protected abstract getAgentName(): string;

  protected async handleMessage(message: Message) {
    const response = await this.process(message);
    if (response !== message) { // if processed
      this.bus.send(response);
    }
  }

  abstract process(message: Message): Promise<Message>;
}
