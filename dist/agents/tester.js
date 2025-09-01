"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TesterAgent = void 0;
const base_1 = require("./base");
class TesterAgent extends base_1.BaseAgent {
    getAgentName() {
        return 'tester';
    }
    async process(message) {
        if (message.type === 'code_response') {
            const prompt = `As a testing agent, write comprehensive tests for this code: ${message.content}`;
            const tests = await this.llm.generate(prompt);
            return {
                type: 'test_response',
                content: tests,
                from: 'tester',
                to: 'debugger'
            };
        }
        return message;
    }
}
exports.TesterAgent = TesterAgent;
//# sourceMappingURL=tester.js.map