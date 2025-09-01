import { ImmersiveCLI } from './cli/immersive';

// Launch the immersive oracle by default
const cli = new ImmersiveCLI();
cli.run().catch(console.error);
