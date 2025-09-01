"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Coordinator = void 0;
const planner_1 = require("./agents/planner");
const coder_1 = require("./agents/coder");
const reviewer_1 = require("./agents/reviewer");
const debugger_1 = require("./agents/debugger");
const tester_1 = require("./agents/tester");
const optimizer_1 = require("./agents/optimizer");
const security_1 = require("./agents/security");
const documenter_1 = require("./agents/documenter");
const messageBus_1 = require("./messageBus");
class Coordinator {
    constructor(llm) {
        this.llm = llm;
        this.bus = new messageBus_1.MessageBus();
        this.planner = new planner_1.PlannerAgent(llm, this.bus);
        this.coder = new coder_1.CoderAgent(llm, this.bus);
        this.reviewer = new reviewer_1.ReviewerAgent(llm, this.bus);
        this.debugger = new debugger_1.DebuggerAgent(llm, this.bus);
        this.tester = new tester_1.TesterAgent(llm, this.bus);
        this.optimizer = new optimizer_1.OptimizerAgent(llm, this.bus);
        this.security = new security_1.SecurityAgent(llm, this.bus);
        this.documenter = new documenter_1.DocumenterAgent(llm, this.bus);
    }
    async processTask(task) {
        return new Promise((resolve) => {
            // Listen for final response
            this.bus.on('user', (message) => {
                if (message.type === 'review_response') {
                    resolve(message.content);
                }
            });
            // Start the chain
            const planMsg = { type: 'plan', content: task, from: 'user', to: 'planner' };
            this.bus.send(planMsg);
        });
    }
}
exports.Coordinator = Coordinator;
//# sourceMappingURL=coordinator.js.map