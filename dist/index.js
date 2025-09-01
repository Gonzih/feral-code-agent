"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const immersive_1 = require("./cli/immersive");
// Launch the immersive oracle by default
const cli = new immersive_1.ImmersiveCLI();
cli.run().catch(console.error);
//# sourceMappingURL=index.js.map