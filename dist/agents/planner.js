"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlannerAgent = void 0;
const base_1 = require("./base");
class PlannerAgent extends base_1.BaseAgent {
    getAgentName() {
        return 'planner';
    }
    async process(message) {
        if (message.type === 'plan') {
            const prompt = `As a planning agent, break down the following coding task into steps: ${message.content}`;
            const plan = await this.llm.generate(prompt);
            return {
                type: 'plan_response',
                content: plan,
                from: 'planner',
                to: 'coder'
            };
        }
        return message;
    }
}
exports.PlannerAgent = PlannerAgent;
//# sourceMappingURL=planner.js.map