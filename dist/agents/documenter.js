"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumenterAgent = void 0;
const base_1 = require("./base");
class DocumenterAgent extends base_1.BaseAgent {
    getAgentName() {
        return 'documenter';
    }
    async process(message) {
        if (message.type === 'security_response') {
            const prompt = `As a documentation agent, generate comprehensive documentation for this code: ${message.content}`;
            const docs = await this.llm.generate(prompt);
            return {
                type: 'document_response',
                content: docs,
                from: 'documenter',
                to: 'reviewer'
            };
        }
        return message;
    }
}
exports.DocumenterAgent = DocumenterAgent;
//# sourceMappingURL=documenter.js.map