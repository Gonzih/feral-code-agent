import { Command } from 'commander';
import { Coordinator } from '../coordinator';
import { MockLLM } from '../mocks/mockLLM';

const program = new Command();

program
  .name('feral-code')
  .description('CLI for feral-code coding agent')
  .version('1.0.0');

program
  .command('task <description>')
  .description('Process a coding task')
  .action(async (description: string) => {
    const llm = new MockLLM();
    const coordinator = new Coordinator(llm);
    const result = await coordinator.processTask(description);
    console.log(result);
  });

program.parse();
