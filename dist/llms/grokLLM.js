"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrokLLM = void 0;
class GrokLLM {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://api.x.ai/v1';
    }
    async generate(prompt) {
        try {
            const response = await fetch(`${this.baseUrl}/chat/completions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`,
                },
                body: JSON.stringify({
                    model: 'grok-beta',
                    messages: [
                        {
                            role: 'user',
                            content: prompt,
                        },
                    ],
                    max_tokens: 1000,
                    temperature: 0.7,
                }),
            });
            if (!response.ok) {
                throw new Error(`API request failed: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            return data.choices[0].message.content;
        }
        catch (error) {
            console.error('Error calling Grok API:', error);
            return `Error: ${error.message}`;
        }
    }
}
exports.GrokLLM = GrokLLM;
//# sourceMappingURL=grokLLM.js.map