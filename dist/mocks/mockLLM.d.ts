import { LLM } from '../interfaces/llm';
export declare class MockLLM implements LLM {
    private taskContext;
    generate(prompt: string): Promise<string>;
}
//# sourceMappingURL=mockLLM.d.ts.map