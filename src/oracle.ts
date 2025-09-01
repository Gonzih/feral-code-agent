import { EventEmitter } from 'events';
import { LLM, Message } from './interfaces/llm';
import { MessageBus } from './messageBus';
import { PlannerAgent } from './agents/planner';
import { CoderAgent } from './agents/coder';
import { TesterAgent } from './agents/tester';
import { DebuggerAgent } from './agents/debugger';
import { OptimizerAgent } from './agents/optimizer';
import { SecurityAgent } from './agents/security';
import { DocumenterAgent } from './agents/documenter';
import { ReviewerAgent } from './agents/reviewer';

export interface AgentStatus {
  id: string;
  name: string;
  status: 'idle' | 'working' | 'completed' | 'error';
  progress: number;
  message: string;
  result?: string;
  startTime?: Date;
  endTime?: Date;
}

export interface OracleState {
  task: string;
  agents: Map<string, AgentStatus>;
  overallProgress: number;
  phase: 'planning' | 'coding' | 'testing' | 'debugging' | 'optimizing' | 'securing' | 'documenting' | 'reviewing' | 'complete';
  startTime: Date;
  messages: Message[];
}

export class Oracle extends EventEmitter {
  private llm: LLM;
  private bus: MessageBus;
  private agents: Map<string, any> = new Map();
  private state: OracleState;

  constructor(llm: LLM) {
    super();
    this.llm = llm;
    this.bus = new MessageBus();
    this.state = {
      task: '',
      agents: new Map(),
      overallProgress: 0,
      phase: 'planning',
      startTime: new Date(),
      messages: []
    };

    this.initializeAgents();
    this.setupEventHandlers();
  }

  private initializeAgents() {
    const agentConfigs = [
      { id: 'planner', name: '🧠 Planner', agent: PlannerAgent },
      { id: 'coder', name: '💻 Coder', agent: CoderAgent },
      { id: 'tester', name: '🧪 Tester', agent: TesterAgent },
      { id: 'debugger', name: '🔧 Debugger', agent: DebuggerAgent },
      { id: 'optimizer', name: '⚡ Optimizer', agent: OptimizerAgent },
      { id: 'security', name: '🛡️ Security', agent: SecurityAgent },
      { id: 'documenter', name: '📚 Documenter', agent: DocumenterAgent },
      { id: 'reviewer', name: '👁️ Reviewer', agent: ReviewerAgent }
    ];

    for (const config of agentConfigs) {
      const agent = new config.agent(this.llm, this.bus);
      this.agents.set(config.id, agent);

      this.state.agents.set(config.id, {
        id: config.id,
        name: config.name,
        status: 'idle',
        progress: 0,
        message: 'Awaiting task...'
      });
    }
  }

  private setupEventHandlers() {
    this.bus.on('all', (message: Message) => {
      this.state.messages.push(message);
      this.emit('message', message);
    });

    // Listen for agent status updates
    for (const [id, agent] of this.agents) {
      this.bus.on(id, (message: Message) => {
        this.updateAgentStatus(id, 'working', `Processing: ${message.type}`);
      });
    }
  }

  private updateAgentStatus(agentId: string, status: AgentStatus['status'], message: string, progress?: number) {
    const agentStatus = this.state.agents.get(agentId);
    if (agentStatus) {
      agentStatus.status = status;
      agentStatus.message = message;
      if (progress !== undefined) {
        agentStatus.progress = progress;
      }
      if (status === 'working' && !agentStatus.startTime) {
        agentStatus.startTime = new Date();
      }
      if (status === 'completed' || status === 'error') {
        agentStatus.endTime = new Date();
      }
      this.emit('agentUpdate', agentStatus);
    }
  }

  private async spawnAgent(agentId: string, message: Message): Promise<void> {
    return new Promise((resolve) => {
      this.updateAgentStatus(agentId, 'working', `Starting ${agentId}...`, 0);

      // Simulate async work with progress updates
      const progressInterval = setInterval(() => {
        const agentStatus = this.state.agents.get(agentId);
        if (agentStatus && agentStatus.progress < 90) {
          this.updateAgentStatus(agentId, 'working', `Working on ${message.type}...`, agentStatus.progress + 10);
        }
      }, 200);

      // Send message to agent
      setTimeout(() => {
        this.bus.send(message);
        clearInterval(progressInterval);
        this.updateAgentStatus(agentId, 'completed', `Completed ${message.type}`, 100);
        resolve();
      }, 1000);
    });
  }

  async processTask(task: string): Promise<string> {
    this.state.task = task;
    this.state.startTime = new Date();
    this.emit('taskStart', this.state);

    try {
      // Phase 1: Planning
      this.state.phase = 'planning';
      await this.spawnAgent('planner', { type: 'plan', content: task, from: 'oracle' });

      // Phase 2: Coding (parallel with planning results)
      this.state.phase = 'coding';
      await this.spawnAgent('coder', { type: 'code', content: 'Planning results...', from: 'oracle' });

      // Phase 3: Testing
      this.state.phase = 'testing';
      await this.spawnAgent('tester', { type: 'test', content: 'Code results...', from: 'oracle' });

      // Phase 4: Debugging
      this.state.phase = 'debugging';
      await this.spawnAgent('debugger', { type: 'debug', content: 'Test results...', from: 'oracle' });

      // Phase 5: Optimizing
      this.state.phase = 'optimizing';
      await this.spawnAgent('optimizer', { type: 'optimize', content: 'Debug results...', from: 'oracle' });

      // Phase 6: Security
      this.state.phase = 'securing';
      await this.spawnAgent('security', { type: 'security', content: 'Optimized code...', from: 'oracle' });

      // Phase 7: Documenting
      this.state.phase = 'documenting';
      await this.spawnAgent('documenter', { type: 'document', content: 'Secured code...', from: 'oracle' });

      // Phase 8: Reviewing
      this.state.phase = 'reviewing';
      await this.spawnAgent('reviewer', { type: 'review', content: 'Documentation...', from: 'oracle' });

      this.state.phase = 'complete';
      this.state.overallProgress = 100;
      this.emit('taskComplete', this.state);

      return '🎉 Task completed successfully! All agents have contributed their wisdom.';

    } catch (error) {
      this.emit('taskError', error);
      throw error;
    }
  }

  getState(): OracleState {
    return { ...this.state };
  }

  getAgentStatus(agentId: string): AgentStatus | undefined {
    return this.state.agents.get(agentId);
  }

  getAllAgentStatuses(): AgentStatus[] {
    return Array.from(this.state.agents.values());
  }
}
