import { Command } from 'commander';
import { Coordinator } from '../coordinator';
import { ImmersiveCLI } from './immersive';
import { MockLLM } from '../mocks/mockLLM';

// Check if any arguments are provided
const hasArgs = process.argv.length > 2;

// If no arguments, launch the oracle directly
if (!hasArgs) {
  const cli = new ImmersiveCLI();
  cli.run().catch(console.error);
  process.exit(0);
}

const program = new Command();

program
  .name('feral-code')
  .description('Feral Code Oracle - Multi-Agent Coding Adventure')
  .version('3.0.0');

program
  .command('task <description>')
  .description('Process a coding task with the basic coordinator')
  .action(async (description: string) => {
    const llm = new MockLLM();
    const coordinator = new Coordinator(llm);
    const result = await coordinator.processTask(description);
    console.log(result);
  });

program
  .command('oracle')
  .description('Launch the immersive Feral Code Oracle experience')
  .action(async () => {
    const cli = new ImmersiveCLI();
    await cli.run();
  });

program
  .command('quest <description>')
  .description('Start a coding quest with the immersive oracle')
  .action(async (description: string) => {
    const cli = new ImmersiveCLI();
    await cli.startTask(description);
  });

program.parse();
