import { Coordinator } from '../coordinator';
import { MockLLM } from '../mocks/mockLLM';

describe('Coordinator', () => {
  it('should process task through agent chain', async () => {
    const llm = new MockLLM();
    const coordinator = new Coordinator(llm);
    const result = await coordinator.processTask('Create a function');
    expect(result).toBe('Reviewed code');
  });

  it('should handle empty task', async () => {
    const llm = new MockLLM();
    const coordinator = new Coordinator(llm);
    const result = await coordinator.processTask('');
    expect(result).toBe('Reviewed code');
  });

  it('should handle complex task', async () => {
    const llm = new MockLLM();
    const coordinator = new Coordinator(llm);
    const result = await coordinator.processTask('Build a web app');
    expect(result).toBe('Reviewed code');
  });
});
