// @ts-nocheck - Blessed types are causing issues, focusing on functionality
import blessed from 'blessed';
import contrib from 'blessed-contrib';
import chalk from 'chalk';
import boxen from 'boxen';
import ora, { Ora } from 'ora';
import { Oracle, AgentStatus, OracleState } from '../oracle';
import { MockLLM } from '../mocks/mockLLM';

export class ImmersiveCLI {
  private screen!: any;
  private oracle!: Oracle;
  private grid!: any;
  private log!: any;
  private agentList!: any;
  private progressBar!: any;
  private statusBox!: any;
  private taskDisplay!: any;
  private spinner: Ora;

  constructor() {
    this.spinner = ora();
    this.initializeUI();
    this.initializeOracle();
  }

  private initializeUI() {
    // Create main screen
    this.screen = blessed.screen({
      smartCSR: true,
      title: '🧙‍♂️ Feral Code Oracle - Multi-Agent Coding Adventure',
      cursor: {
        artificial: true,
        shape: 'line',
        blink: true,
        color: 'cyan'
      }
    });

    // Create grid layout
    this.grid = new contrib.grid({
      rows: 12,
      cols: 12,
      screen: this.screen
    });

    // Create UI components
    this.createHeader();
    this.createAgentPanel();
    this.createProgressPanel();
    this.createLogPanel();
    this.createStatusPanel();
    this.createTaskPanel();

    // Setup key bindings
    this.setupKeyBindings();

    // Render initial screen
    this.screen.render();
  }

  private createHeader() {
    const header = blessed.box({
      top: 0,
      left: 0,
      width: '100%',
      height: 3,
      content: boxen(
        chalk.magenta.bold('🧙‍♂️ FERAL CODE ORACLE 🧙‍♂️') + '\n' +
        chalk.cyan('Multi-Agent Coding Adventure - Press ? for help'),
        {
          padding: 1,
          margin: 0,
          borderStyle: 'double',
          borderColor: 'magenta',
          backgroundColor: '#000011'
        }
      ),
      style: {
        fg: 'magenta',
        bg: 'black',
        border: {
          fg: 'cyan'
        }
      }
    });

    this.screen.append(header);
  }

  private createAgentPanel() {
    this.agentList = blessed.list({
      top: 3,
      left: 0,
      width: '30%',
      height: '70%',
      label: ' {bold}{cyan-fg}🧠 Agent Legion{/cyan-fg}{/bold} ',
      tags: true,
      border: {
        type: 'line',
        fg: 'green'
      },
      style: {
        fg: 'white',
        bg: 'black',
        border: {
          fg: 'green' as any
        },
        selected: {
          bg: 'blue' as any,
          fg: 'white'
        }
      },
      items: [
        '🧠 Planner: Idle',
        '💻 Coder: Idle',
        '🧪 Tester: Idle',
        '🔧 Debugger: Idle',
        '⚡ Optimizer: Idle',
        '🛡️ Security: Idle',
        '📚 Documenter: Idle',
        '👁️ Reviewer: Idle'
      ]
    });

    this.screen.append(this.agentList);
  }

  private createProgressPanel() {
    this.progressBar = blessed.progressbar({
      top: 3,
      left: '30%',
      width: '40%',
      height: 3,
      label: ' {bold}{yellow-fg}⚡ Oracle Progress{/yellow-fg}{/bold} ',
      border: {
        type: 'line',
        fg: 'yellow'
      },
      style: {
        fg: 'yellow',
        bg: 'black',
        border: {
          fg: 'yellow'
        },
        bar: {
          bg: 'green'
        }
      },
      ch: '█',
      filled: 0
    });

    this.screen.append(this.progressBar);
  }

  private createLogPanel() {
    this.log = blessed.log({
      top: '73%',
      left: 0,
      width: '70%',
      height: '27%',
      label: ' {bold}{red-fg}📜 Oracle Chronicles{/red-fg}{/bold} ',
      tags: true,
      border: {
        type: 'line',
        fg: 'red'
      },
      style: {
        fg: 'white',
        bg: 'black',
        border: {
          fg: 'red'
        }
      },
      scrollable: true,
      alwaysScroll: true
    });

    this.screen.append(this.log);
  }

  private createStatusPanel() {
    this.statusBox = blessed.box({
      top: 6,
      left: '70%',
      width: '30%',
      height: '67%',
      label: ' {bold}{blue-fg}📊 Mission Status{/blue-fg}{/bold} ',
      content: 'Awaiting task...\n\nPhase: Planning\nAgents Active: 0\nTime Elapsed: 0s',
      tags: true,
      border: {
        type: 'line',
        fg: 'blue'
      },
      style: {
        fg: 'white',
        bg: 'black',
        border: {
          fg: 'blue'
        }
      }
    });

    this.screen.append(this.statusBox);
  }

  private createTaskPanel() {
    this.taskDisplay = blessed.box({
      top: '30%',
      left: '30%',
      width: '40%',
      height: '43%',
      label: ' {bold}{magenta-fg}🎯 Current Task{/magenta-fg}{/bold} ',
      content: 'No active task',
      tags: true,
      border: {
        type: 'line',
        fg: 'magenta'
      },
      style: {
        fg: 'white',
        bg: 'black',
        border: {
          fg: 'magenta'
        }
      }
    });

    this.screen.append(this.taskDisplay);
  }

  private setupKeyBindings() {
    this.screen.key(['escape', 'q', 'C-c'], () => {
      this.log.log(chalk.red('🧙‍♂️ Oracle: Farewell, brave coder!'));
      setTimeout(() => {
        process.exit(0);
      }, 1000);
    });

    this.screen.key(['?'], () => {
      this.showHelp();
    });

    this.screen.key(['r'], () => {
      this.startRandomTask();
    });
  }

  private initializeOracle() {
    const llm = new MockLLM();
    this.oracle = new Oracle(llm);

    // Listen for oracle events
    this.oracle.on('taskStart', (state: OracleState) => {
      this.onTaskStart(state);
    });

    this.oracle.on('agentUpdate', (status: AgentStatus) => {
      this.onAgentUpdate(status);
    });

    this.oracle.on('message', (message: any) => {
      this.onMessage(message);
    });

    this.oracle.on('taskComplete', (state: OracleState) => {
      this.onTaskComplete(state);
    });

    this.oracle.on('taskError', (error: any) => {
      this.onTaskError(error);
    });
  }

  private onTaskStart(state: OracleState) {
    this.taskDisplay.setContent(
      chalk.magenta.bold('🎯 TASK INITIATED\n\n') +
      chalk.white(state.task) + '\n\n' +
      chalk.cyan('Phase: ') + chalk.yellow(state.phase.toUpperCase())
    );

    this.log.log(chalk.magenta('🧙‍♂️ Oracle: ') + chalk.white('Task initiated! Summoning agent legion...'));
    this.log.log(chalk.cyan('📜 Quest: ') + chalk.white(state.task));
  }

  private onAgentUpdate(status: AgentStatus) {
    const statusEmoji = {
      idle: '💤',
      working: '⚡',
      completed: '✅',
      error: '❌'
    };

    const statusColor = {
      idle: 'gray',
      working: 'yellow',
      completed: 'green',
      error: 'red'
    };

    const progressBar = '█'.repeat(Math.floor(status.progress / 10)) + '░'.repeat(10 - Math.floor(status.progress / 10));

    this.agentList.setItem(status.id === 'planner' ? 0 :
                          status.id === 'coder' ? 1 :
                          status.id === 'tester' ? 2 :
                          status.id === 'debugger' ? 3 :
                          status.id === 'optimizer' ? 4 :
                          status.id === 'security' ? 5 :
                          status.id === 'documenter' ? 6 : 7,
      `${status.name}: ${statusEmoji[status.status]} ${status.message} [${progressBar}] ${status.progress}%`
    );

    this.screen.render();
  }

  private onMessage(message: any) {
    const messageType = message.type || 'unknown';
    const from = message.from || 'unknown';

    this.log.log(chalk.blue('📨 Message: ') +
      chalk.cyan(`[${from}]`) +
      chalk.white(` ${messageType}: `) +
      chalk.gray(message.content?.substring(0, 50) + '...'));
  }

  private onTaskComplete(state: OracleState) {
    this.progressBar.setProgress(100);
    this.taskDisplay.setContent(
      chalk.green.bold('🎉 QUEST COMPLETE!\n\n') +
      chalk.white(state.task) + '\n\n' +
      chalk.green('All agents have contributed their wisdom!')
    );

    this.log.log(chalk.green('🧙‍♂️ Oracle: ') + chalk.white('Quest completed! The agent legion has triumphed!'));

    // Show completion animation
    this.showCompletionAnimation();
  }

  private onTaskError(error: any) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    this.log.log(chalk.red('❌ Oracle Error: ') + chalk.white(errorMessage));
    this.taskDisplay.setContent(
      chalk.red.bold('💥 QUEST FAILED!\n\n') +
      chalk.white('An error occurred during the coding adventure.')
    );
  }

  private showHelp() {
    const helpContent = blessed.box({
      top: 'center',
      left: 'center',
      width: '80%',
      height: '60%',
      label: ' {bold}{cyan-fg}❓ Help - Feral Code Oracle{/cyan-fg}{/bold} ',
      content: `
${chalk.bold.magenta('🧙‍♂️ FERAL CODE ORACLE HELP')}

${chalk.bold.cyan('CONTROLS:')}
${chalk.yellow('ESC, Q, Ctrl+C')} - Exit the oracle
${chalk.yellow('?')} - Show this help
${chalk.yellow('R')} - Start a random coding quest

${chalk.bold.cyan('AGENTS:')}
${chalk.green('🧠 Planner')} - Analyzes and plans coding tasks
${chalk.green('💻 Coder')} - Generates production-ready code
${chalk.green('🧪 Tester')} - Creates comprehensive test suites
${chalk.green('🔧 Debugger')} - Identifies and fixes bugs
${chalk.green('⚡ Optimizer')} - Improves performance and efficiency
${chalk.green('🛡️ Security')} - Implements security measures
${chalk.green('📚 Documenter')} - Generates documentation
${chalk.green('👁️ Reviewer')} - Final quality assessment

${chalk.bold.cyan('HOW TO USE:')}
1. Enter a coding task when prompted
2. Watch as the oracle spawns agents asynchronously
3. Monitor progress in real-time
4. View results and agent contributions

${chalk.bold.magenta('Press any key to continue...')}
      `,
      tags: true,
      border: {
        type: 'line',
        fg: 'cyan'
      },
      style: {
        fg: 'white',
        bg: 'black',
        border: {
          fg: 'cyan'
        }
      },
      scrollable: true
    });

    this.screen.append(helpContent);
    this.screen.render();

    helpContent.key(['enter', 'escape', 'space'], () => {
      this.screen.remove(helpContent);
      this.screen.render();
    });
  }

  private startRandomTask() {
    const tasks = [
      'Create a TypeScript function to calculate fibonacci numbers with memoization',
      'Build a React component for a real-time chat interface',
      'Implement a REST API endpoint for user authentication',
      'Create a data structure for efficient graph traversal',
      'Build a CLI tool for file system operations',
      'Implement a caching layer for database queries',
      'Create a web scraper with error handling',
      'Build a task scheduler with priority queues'
    ];

    const randomTask = tasks[Math.floor(Math.random() * tasks.length)];
    this.startTask(randomTask);
  }

  private showCompletionAnimation() {
    let frame = 0;
    const animation = setInterval(() => {
      const chars = ['🌟', '✨', '💫', '⭐', '🎆'];
      const char = chars[frame % chars.length];

      this.log.log(chalk.magenta(`${char} Agent wisdom collected... ${char}`));

      frame++;
      if (frame > 10) {
        clearInterval(animation);
        this.log.log(chalk.green.bold('🎉 ALL AGENTS HAVE CONTRIBUTED THEIR WISDOM! 🎉'));
      }
    }, 300);
  }

  async startTask(task: string) {
    try {
      this.spinner.start(chalk.cyan('🧙‍♂️ Oracle is summoning the agent legion...'));

      const result = await this.oracle.processTask(task);

      this.spinner.succeed(chalk.green('Quest completed successfully!'));

      // Update final status
      this.statusBox.setContent(
        chalk.green('✅ MISSION ACCOMPLISHED\n\n') +
        chalk.white('All agents have completed their tasks\n\n') +
        chalk.cyan('Result: ') + chalk.white(result)
      );

      this.screen.render();

    } catch (error) {
      this.spinner.fail(chalk.red('Quest failed!'));
      const errorMessage = error instanceof Error ? error.message : String(error);
      this.log.log(chalk.red('💥 Error: ') + chalk.white(errorMessage));
    }
  }

  async run() {
    // Show welcome animation
    this.log.log(chalk.magenta.bold('🧙‍♂️ Welcome to the Feral Code Oracle!'));
    this.log.log(chalk.cyan('The most advanced multi-agent coding experience awaits...'));

    // Wait for user input
    setTimeout(() => {
      this.promptForTask();
    }, 2000);
  }

  private promptForTask() {
    const prompt = blessed.prompt({
      parent: this.screen,
      top: 'center',
      left: 'center',
      width: 80,
      height: 8,
      label: ' {bold}{green-fg}🎯 Enter Your Coding Quest{/green-fg}{/bold} ',
      border: {
        type: 'line',
        fg: 'green'
      },
      style: {
        fg: 'white',
        bg: 'black',
        border: {
          fg: 'green'
        }
      }
    });

    prompt.input('What coding adventure shall we embark upon?', '', (err, value) => {
      this.screen.remove(prompt);
      if (value && value.trim()) {
        this.startTask(value.trim());
      } else {
        this.log.log(chalk.yellow('🧙‍♂️ Oracle: ') + chalk.white('No task provided. Press R for a random quest!'));
        this.screen.render();
      }
    });

    this.screen.render();
  }
}

// ImmersiveCLI is already exported as a class declaration above
