"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptimizerAgent = void 0;
const base_1 = require("./base");
class OptimizerAgent extends base_1.BaseAgent {
    getAgentName() {
        return 'optimizer';
    }
    async process(message) {
        if (message.type === 'debug_response') {
            const prompt = `As an optimization agent, improve performance and efficiency of this code: ${message.content}`;
            const optimized = await this.llm.generate(prompt);
            return {
                type: 'optimize_response',
                content: optimized,
                from: 'optimizer',
                to: 'security'
            };
        }
        return message;
    }
}
exports.OptimizerAgent = OptimizerAgent;
//# sourceMappingURL=optimizer.js.map