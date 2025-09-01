"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const coordinator_1 = require("../coordinator");
const mockLLM_1 = require("../mocks/mockLLM");
const program = new commander_1.Command();
program
    .name('feral-code')
    .description('CLI for feral-code coding agent')
    .version('1.0.0');
program
    .command('task <description>')
    .description('Process a coding task')
    .action(async (description) => {
    const llm = new mockLLM_1.MockLLM();
    const coordinator = new coordinator_1.Coordinator(llm);
    const result = await coordinator.processTask(description);
    console.log(result);
});
program.parse();
//# sourceMappingURL=index.js.map