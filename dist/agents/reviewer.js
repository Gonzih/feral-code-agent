"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewerAgent = void 0;
const base_1 = require("./base");
class ReviewerAgent extends base_1.BaseAgent {
    getAgentName() {
        return 'reviewer';
    }
    async process(message) {
        if (message.type === 'document_response') {
            const prompt = `As a review agent, review and improve this code: ${message.content}`;
            const review = await this.llm.generate(prompt);
            return {
                type: 'review_response',
                content: review,
                from: 'reviewer',
                to: 'user'
            };
        }
        return message;
    }
}
exports.ReviewerAgent = ReviewerAgent;
//# sourceMappingURL=reviewer.js.map