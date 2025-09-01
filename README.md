# 🤖 Feral Code Agent

**Cutting-edge multi-agent coding assistant with LLM integration and 252 comprehensive tests**

[![CI](https://github.com/Gonzih/feral-code-agent/actions/workflows/ci.yml/badge.svg)](https://github.com/Gonzih/feral-code-agent/actions/workflows/ci.yml)
[![Coverage](https://codecov.io/gh/Gonzih/feral-code-agent/branch/main/graph/badge.svg)](https://codecov.io/gh/Gonzih/feral-code-agent)
[![Quality Score](https://img.shields.io/badge/Quality-94%25-EXCELLENT-brightgreen)](https://github.com/Gonzih/feral-code-agent)

## 🚀 Features

- **8 Specialized Agents**: Planner, Coder, Tester, Debugger, Optimizer, Security, Documenter, Reviewer
- **LLM Agnostic**: Pluggable interface supporting any language model (Grok, GPT, Claude, etc.)
- **252 Comprehensive Tests**: 90%+ coverage with automated quality assessment
- **CLI Interface**: Command-line tool for processing coding tasks
- **Async Message Bus**: Event-driven communication between agents
- **Production Ready**: Error handling, security measures, and TypeScript throughout

## 📊 Quality Metrics

| Metric | Score | Status |
|--------|-------|--------|
| **Test Coverage** | 90%+ | ✅ EXCELLENT |
| **Quality Assessment** | 94% | ✅ EXCELLENT |
| **TypeScript Compliance** | 100% | ✅ PERFECT |
| **Automated Testing** | 252 tests | ✅ COMPREHENSIVE |

## 🏗️ Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   CLI Interface │───▶│   Coordinator    │───▶│  Message Bus    │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                │                        │
                                ▼                        ▼
                       ┌─────────────────┐    ┌─────────────────┐
                       │   8 Agents      │    │   LLM Interface │
                       │ • Planner       │    │ • GrokLLM       │
                       │ • Coder         │    │ • MockLLM       │
                       │ • Tester        │    │ • Custom LLMs   │
                       │ • Debugger      │    │                 │
                       │ • Optimizer     │    └─────────────────┘
                       │ • Security      │
                       │ • Documenter    │
                       │ • Reviewer      │
                       └─────────────────┘
```

## 🛠️ Installation

```bash
# Clone the repository
git clone https://github.com/Gonzih/feral-code-agent.git
cd feral-code-agent

# Install dependencies
npm install

# Build the project
npm run build
```

## 🚀 Usage

### CLI Interface

```bash
# Process a coding task
npm start task "Create a TypeScript function that calculates the factorial of a number with proper error handling"

# Or use the built CLI directly
node dist/index.js task "Your coding task here"
```

### Programmatic Usage

```typescript
import { Coordinator } from './src/coordinator';
import { GrokLLM } from './src/llms/grokLLM';

const llm = new GrokLLM(process.env.XAI_API_KEY!);
const coordinator = new Coordinator(llm);

const result = await coordinator.processTask('Create a React component...');
console.log(result);
```

## 🧪 Testing

### Run All Tests
```bash
npm test
```

### Run Tests with Coverage
```bash
npm run test:coverage
```

### Automated Quality Assessment
```bash
cd tmp/test-example
npx ts-node automated-test-runner.ts
```

## 📈 Quality Assessment Results

### Factorial Function Test (83% - EXCELLENT)
✅ TypeScript syntax with proper type annotations
✅ Error handling for negative numbers and non-integers
✅ Iterative implementation for efficiency
✅ Input validation with throw statements
❌ Missing JSDoc documentation

### React Component Test (100% - EXCELLENT)
✅ React import and functional component
✅ useState hook implementation
✅ Event handlers with proper onClick
✅ JSX return with TypeScript types

### API Endpoint Test (100% - EXCELLENT)
✅ Express.js router setup
✅ POST method implementation
✅ Request validation middleware
✅ Error handling and responses

## 🤖 Agent Pipeline

The feral-code agent processes tasks through a sophisticated 8-agent pipeline:

1. **Planner Agent**: Analyzes requirements and creates detailed task breakdown
2. **Coder Agent**: Generates production-ready code based on specifications
3. **Tester Agent**: Creates comprehensive test cases and validation scenarios
4. **Debugger Agent**: Reviews code for potential bugs and edge cases
5. **Optimizer Agent**: Improves performance and code efficiency
6. **Security Agent**: Implements security measures and vulnerability checks
7. **Documenter Agent**: Generates comprehensive documentation and JSDoc comments
8. **Reviewer Agent**: Final quality assessment and validation

## 🔧 Configuration

### Environment Variables

```bash
# For Grok LLM integration
XAI_API_KEY=your-xai-api-key-here

# For custom LLM configurations
CUSTOM_LLM_ENDPOINT=https://your-llm-endpoint.com
CUSTOM_LLM_API_KEY=your-custom-api-key
```

### Custom LLM Integration

```typescript
import { LLM } from './src/interfaces/llm';

class CustomLLM implements LLM {
  async generate(prompt: string): Promise<string> {
    // Your custom LLM implementation
    return 'Generated response';
  }
}

const llm = new CustomLLM();
const coordinator = new Coordinator(llm);
```

## 📊 CI/CD Pipeline

The project includes a comprehensive GitHub Actions CI/CD pipeline that:

- ✅ Tests on multiple Node.js versions (18.x, 20.x, 22.x)
- ✅ Enforces 90% test coverage threshold
- ✅ Runs automated quality assessment
- ✅ Generates coverage reports with Codecov
- ✅ Performs quality gate checks
- ✅ Prepares production deployments

## 🎯 Quality Standards

- **Test Coverage**: Minimum 90% across all files
- **TypeScript**: Strict mode with no type errors
- **Code Quality**: ESLint compliant with best practices
- **Documentation**: Comprehensive JSDoc and README
- **Security**: Input validation and secure coding practices

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by cutting-edge multi-agent systems research
- Built with modern TypeScript and Node.js best practices
- Comprehensive testing framework ensures reliability
- Open-source community contributions welcome

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/Gonzih/feral-code-agent/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Gonzih/feral-code-agent/discussions)
- **Documentation**: [Wiki](https://github.com/Gonzih/feral-code-agent/wiki)

---

**⭐ Star this repository if you find it useful!**

*Built with ❤️ using cutting-edge AI and software engineering practices*
