"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const coordinator_1 = require("../coordinator");
const mockLLM_1 = require("../mocks/mockLLM");
describe('Coordinator', () => {
    it('should process task through agent chain', async () => {
        const llm = new mockLLM_1.MockLLM();
        const coordinator = new coordinator_1.Coordinator(llm);
        const result = await coordinator.processTask('Create a function');
        expect(result).toBe('Reviewed code');
    });
    it('should handle empty task', async () => {
        const llm = new mockLLM_1.MockLLM();
        const coordinator = new coordinator_1.Coordinator(llm);
        const result = await coordinator.processTask('');
        expect(result).toBe('Reviewed code');
    });
    it('should handle complex task', async () => {
        const llm = new mockLLM_1.MockLLM();
        const coordinator = new coordinator_1.Coordinator(llm);
        const result = await coordinator.processTask('Build a web app');
        expect(result).toBe('Reviewed code');
    });
});
//# sourceMappingURL=coordinator.test.js.map