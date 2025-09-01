import { MockLLM } from '../mocks/mockLLM';

describe('MockLLM', () => {
  it('should generate response for planning', async () => {
    const llm = new MockLLM();
    const result = await llm.generate('As a planning agent, break down');
    expect(result).toBe('Plan: Step 1, Step 2');
  });

  it('should generate response for coding', async () => {
    const llm = new MockLLM();
    const result = await llm.generate('As a coding agent, generate');
    expect(result).toBe('function code() {}');
  });

  it('should generate response for review', async () => {
    const llm = new MockLLM();
    const result = await llm.generate('As a review agent, review');
    expect(result).toBe('Reviewed code');
  });

  it('should generate default response', async () => {
    const llm = new MockLLM();
    const result = await llm.generate('Other prompt');
    expect(result).toBe('Mock response for: Other prompt');
  });
});
