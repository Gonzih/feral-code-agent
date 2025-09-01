export interface LLM {
  generate(prompt: string): Promise<string>;
}

export interface Message {
  type: string;
  content: string;
  from: string;
  to?: string;
}
