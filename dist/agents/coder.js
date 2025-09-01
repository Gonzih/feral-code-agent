"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoderAgent = void 0;
const base_1 = require("./base");
class CoderAgent extends base_1.BaseAgent {
    getAgentName() {
        return 'coder';
    }
    async process(message) {
        if (message.type === 'plan_response') {
            const prompt = `As a coding agent, generate code based on this plan: ${message.content}`;
            const code = await this.llm.generate(prompt);
            return {
                type: 'code_response',
                content: code,
                from: 'coder',
                to: 'tester'
            };
        }
        return message;
    }
}
exports.CoderAgent = CoderAgent;
//# sourceMappingURL=coder.js.map