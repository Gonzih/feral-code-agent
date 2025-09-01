"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseAgent = void 0;
class BaseAgent {
    constructor(llm, bus) {
        this.llm = llm;
        this.bus = bus;
        this.setupListeners();
    }
    setupListeners() {
        this.bus.on(this.getAgentName(), (message) => {
            this.handleMessage(message);
        });
    }
    async handleMessage(message) {
        const response = await this.process(message);
        if (response !== message) { // if processed
            this.bus.send(response);
        }
    }
}
exports.BaseAgent = BaseAgent;
//# sourceMappingURL=base.js.map