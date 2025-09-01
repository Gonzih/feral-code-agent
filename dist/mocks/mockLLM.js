"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockLLM = void 0;
class MockLLM {
    async generate(prompt) {
        if (prompt.includes('planning agent'))
            return 'Plan: Step 1, Step 2';
        if (prompt.includes('coding agent'))
            return 'function code() {}';
        if (prompt.includes('testing agent'))
            return 'Test cases';
        if (prompt.includes('debugger agent'))
            return 'Debugged code';
        if (prompt.includes('optimization agent'))
            return 'Optimized code';
        if (prompt.includes('security agent'))
            return 'Secured code';
        if (prompt.includes('documentation agent'))
            return 'Documentation';
        if (prompt.includes('review agent'))
            return 'Reviewed code';
        return `Mock response for: ${prompt}`;
    }
}
exports.MockLLM = MockLLM;
//# sourceMappingURL=mockLLM.js.map