"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityAgent = void 0;
const base_1 = require("./base");
class SecurityAgent extends base_1.BaseAgent {
    getAgentName() {
        return 'security';
    }
    async process(message) {
        if (message.type === 'optimize_response') {
            const prompt = `As a security agent, analyze and fix security vulnerabilities in this code: ${message.content}`;
            const secured = await this.llm.generate(prompt);
            return {
                type: 'security_response',
                content: secured,
                from: 'security',
                to: 'documenter'
            };
        }
        return message;
    }
}
exports.SecurityAgent = SecurityAgent;
//# sourceMappingURL=security.js.map