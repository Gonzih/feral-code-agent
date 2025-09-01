"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const coordinator_1 = require("../coordinator");
const immersive_1 = require("./immersive");
const mockLLM_1 = require("../mocks/mockLLM");
// Check if any arguments are provided
const hasArgs = process.argv.length > 2;
// If no arguments, launch the oracle directly
if (!hasArgs) {
    const cli = new immersive_1.ImmersiveCLI();
    cli.run().catch(console.error);
    process.exit(0);
}
const program = new commander_1.Command();
program
    .name('feral-code')
    .description('Feral Code Oracle - Multi-Agent Coding Adventure')
    .version('3.0.0');
program
    .command('task <description>')
    .description('Process a coding task with the basic coordinator')
    .action(async (description) => {
    const llm = new mockLLM_1.MockLLM();
    const coordinator = new coordinator_1.Coordinator(llm);
    const result = await coordinator.processTask(description);
    console.log(result);
});
program
    .command('oracle')
    .description('Launch the immersive Feral Code Oracle experience')
    .action(async () => {
    const cli = new immersive_1.ImmersiveCLI();
    await cli.run();
});
program
    .command('quest <description>')
    .description('Start a coding quest with the immersive oracle')
    .action(async (description) => {
    const cli = new immersive_1.ImmersiveCLI();
    await cli.startTask(description);
});
program.parse();
//# sourceMappingURL=index.js.map