import { PlannerAgent } from '../agents/planner';
import { CoderAgent } from '../agents/coder';
import { ReviewerAgent } from '../agents/reviewer';
import { DebuggerAgent } from '../agents/debugger';
import { TesterAgent } from '../agents/tester';
import { OptimizerAgent } from '../agents/optimizer';
import { SecurityAgent } from '../agents/security';
import { DocumenterAgent } from '../agents/documenter';
import { Message } from '../interfaces/llm';
import { MockLLM } from '../mocks/mockLLM';
import { MessageBus } from '../messageBus';

describe('PlannerAgent', () => {
  it('should process plan message', async () => {
    const llm = new MockLLM();
    const bus = new MessageBus();
    const agent = new PlannerAgent(llm, bus);
    const msg: Message = { type: 'plan', content: 'Create a function', from: 'user' };
    const result = await agent.process(msg);
    expect(result.type).toBe('plan_response');
    expect(result.content).toBe('Plan: Step 1, Step 2');
    expect(result.from).toBe('planner');
    expect(result.to).toBe('coder');
  });

  it('should pass through non-plan message', async () => {
    const llm = new MockLLM();
    const bus = new MessageBus();
    const agent = new PlannerAgent(llm, bus);
    const msg: Message = { type: 'other', content: 'test', from: 'user' };
    const result = await agent.process(msg);
    expect(result).toBe(msg);
  });
});

describe('CoderAgent', () => {
  it('should process plan_response message', async () => {
    const llm = new MockLLM();
    const bus = new MessageBus();
    const agent = new CoderAgent(llm, bus);
    const msg: Message = { type: 'plan_response', content: 'Plan: Step 1', from: 'planner' };
    const result = await agent.process(msg);
    expect(result.type).toBe('code_response');
    expect(result.content).toBe('function code() {}');
    expect(result.from).toBe('coder');
    expect(result.to).toBe('tester');
  });

  it('should pass through non-plan_response message', async () => {
    const llm = new MockLLM();
    const bus = new MessageBus();
    const agent = new CoderAgent(llm, bus);
    const msg: Message = { type: 'other', content: 'test', from: 'user' };
    const result = await agent.process(msg);
    expect(result).toBe(msg);
  });
});

describe('TesterAgent', () => {
  it('should process code_response message', async () => {
    const llm = new MockLLM();
    const bus = new MessageBus();
    const agent = new TesterAgent(llm, bus);
    const msg: Message = { type: 'code_response', content: 'function code() {}', from: 'coder' };
    const result = await agent.process(msg);
    expect(result.type).toBe('test_response');
    expect(result.content).toBe('Test cases');
    expect(result.from).toBe('tester');
    expect(result.to).toBe('debugger');
  });

  it('should pass through non-code_response message', async () => {
    const llm = new MockLLM();
    const bus = new MessageBus();
    const agent = new TesterAgent(llm, bus);
    const msg: Message = { type: 'other', content: 'test', from: 'user' };
    const result = await agent.process(msg);
    expect(result).toBe(msg);
  });
});

describe('DebuggerAgent', () => {
  it('should process test_response message', async () => {
    const llm = new MockLLM();
    const bus = new MessageBus();
    const agent = new DebuggerAgent(llm, bus);
    const msg: Message = { type: 'test_response', content: 'Test cases', from: 'tester' };
    const result = await agent.process(msg);
    expect(result.type).toBe('debug_response');
    expect(result.content).toBe('Debugged code');
    expect(result.from).toBe('debugger');
    expect(result.to).toBe('optimizer');
  });

  it('should pass through non-test_response message', async () => {
    const llm = new MockLLM();
    const bus = new MessageBus();
    const agent = new DebuggerAgent(llm, bus);
    const msg: Message = { type: 'other', content: 'test', from: 'user' };
    const result = await agent.process(msg);
    expect(result).toBe(msg);
  });
});

describe('OptimizerAgent', () => {
  it('should process debug_response message', async () => {
    const llm = new MockLLM();
    const bus = new MessageBus();
    const agent = new OptimizerAgent(llm, bus);
    const msg: Message = { type: 'debug_response', content: 'Debugged code', from: 'debugger' };
    const result = await agent.process(msg);
    expect(result.type).toBe('optimize_response');
    expect(result.content).toBe('Optimized code');
    expect(result.from).toBe('optimizer');
    expect(result.to).toBe('security');
  });

  it('should pass through non-debug_response message', async () => {
    const llm = new MockLLM();
    const bus = new MessageBus();
    const agent = new OptimizerAgent(llm, bus);
    const msg: Message = { type: 'other', content: 'test', from: 'user' };
    const result = await agent.process(msg);
    expect(result).toBe(msg);
  });
});

describe('SecurityAgent', () => {
  it('should process optimize_response message', async () => {
    const llm = new MockLLM();
    const bus = new MessageBus();
    const agent = new SecurityAgent(llm, bus);
    const msg: Message = { type: 'optimize_response', content: 'Optimized code', from: 'optimizer' };
    const result = await agent.process(msg);
    expect(result.type).toBe('security_response');
    expect(result.content).toBe('Secured code');
    expect(result.from).toBe('security');
    expect(result.to).toBe('documenter');
  });

  it('should pass through non-optimize_response message', async () => {
    const llm = new MockLLM();
    const bus = new MessageBus();
    const agent = new SecurityAgent(llm, bus);
    const msg: Message = { type: 'other', content: 'test', from: 'user' };
    const result = await agent.process(msg);
    expect(result).toBe(msg);
  });
});

describe('DocumenterAgent', () => {
  it('should process security_response message', async () => {
    const llm = new MockLLM();
    const bus = new MessageBus();
    const agent = new DocumenterAgent(llm, bus);
    const msg: Message = { type: 'security_response', content: 'Secured code', from: 'security' };
    const result = await agent.process(msg);
    expect(result.type).toBe('document_response');
    expect(result.content).toBe('Documentation');
    expect(result.from).toBe('documenter');
    expect(result.to).toBe('reviewer');
  });

  it('should pass through non-security_response message', async () => {
    const llm = new MockLLM();
    const bus = new MessageBus();
    const agent = new DocumenterAgent(llm, bus);
    const msg: Message = { type: 'other', content: 'test', from: 'user' };
    const result = await agent.process(msg);
    expect(result).toBe(msg);
  });
});

describe('ReviewerAgent', () => {
  it('should process document_response message', async () => {
    const llm = new MockLLM();
    const bus = new MessageBus();
    const agent = new ReviewerAgent(llm, bus);
    const msg: Message = { type: 'document_response', content: 'Documentation', from: 'documenter' };
    const result = await agent.process(msg);
    expect(result.type).toBe('review_response');
    expect(result.content).toBe('Reviewed code');
    expect(result.from).toBe('reviewer');
    expect(result.to).toBe('user');
  });

  it('should pass through non-document_response message', async () => {
    const llm = new MockLLM();
    const bus = new MessageBus();
    const agent = new ReviewerAgent(llm, bus);
    const msg: Message = { type: 'other', content: 'test', from: 'user' };
    const result = await agent.process(msg);
    expect(result).toBe(msg);
  });
});
