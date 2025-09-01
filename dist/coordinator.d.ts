import { LLM } from './interfaces/llm';
export declare class Coordinator {
    private llm;
    private bus;
    private planner;
    private coder;
    private reviewer;
    private debugger;
    private tester;
    private optimizer;
    private security;
    private documenter;
    constructor(llm: LLM);
    processTask(task: string): Promise<string>;
}
//# sourceMappingURL=coordinator.d.ts.map