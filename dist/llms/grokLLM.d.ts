import { LLM } from '../interfaces/llm';
export declare class GrokLLM implements LLM {
    private apiKey;
    private baseUrl;
    constructor(apiKey: string);
    generate(prompt: string): Promise<string>;
}
//# sourceMappingURL=grokLLM.d.ts.map