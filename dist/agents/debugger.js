"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebuggerAgent = void 0;
const base_1 = require("./base");
class DebuggerAgent extends base_1.BaseAgent {
    getAgentName() {
        return 'debugger';
    }
    async process(message) {
        if (message.type === 'test_response') {
            const prompt = `As a debugger agent, analyze and fix bugs in this code: ${message.content}`;
            const debugged = await this.llm.generate(prompt);
            return {
                type: 'debug_response',
                content: debugged,
                from: 'debugger',
                to: 'optimizer'
            };
        }
        return message;
    }
}
exports.DebuggerAgent = DebuggerAgent;
//# sourceMappingURL=debugger.js.map