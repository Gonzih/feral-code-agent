import { LLM, Message } from './interfaces/llm';
import { PlannerAgent } from './agents/planner';
import { CoderAgent } from './agents/coder';
import { ReviewerAgent } from './agents/reviewer';
import { DebuggerAgent } from './agents/debugger';
import { TesterAgent } from './agents/tester';
import { OptimizerAgent } from './agents/optimizer';
import { SecurityAgent } from './agents/security';
import { DocumenterAgent } from './agents/documenter';
import { MessageBus } from './messageBus';

export class Coordinator {
  private llm: LLM;
  private bus: MessageBus;
  private planner: PlannerAgent;
  private coder: CoderAgent;
  private reviewer: ReviewerAgent;
  private debugger: DebuggerAgent;
  private tester: TesterAgent;
  private optimizer: OptimizerAgent;
  private security: SecurityAgent;
  private documenter: DocumenterAgent;

  constructor(llm: LLM) {
    this.llm = llm;
    this.bus = new MessageBus();
    this.planner = new PlannerAgent(llm, this.bus);
    this.coder = new CoderAgent(llm, this.bus);
    this.reviewer = new ReviewerAgent(llm, this.bus);
    this.debugger = new DebuggerAgent(llm, this.bus);
    this.tester = new TesterAgent(llm, this.bus);
    this.optimizer = new OptimizerAgent(llm, this.bus);
    this.security = new SecurityAgent(llm, this.bus);
    this.documenter = new DocumenterAgent(llm, this.bus);
  }

  async processTask(task: string): Promise<string> {
    return new Promise((resolve) => {
      // Listen for final response
      this.bus.on('user', (message: Message) => {
        if (message.type === 'review_response') {
          resolve(message.content);
        }
      });

      // Start the chain
      const planMsg: Message = { type: 'plan', content: task, from: 'user', to: 'planner' };
      this.bus.send(planMsg);
    });
  }
}
