export interface OpenAIModel {
    prompt: string
    maxTokens: number
    temperature: number
    topP: number
    frequencyPenalty: number
    presencePenalty: number
    bestOf: number
    echo: boolean
    logprobs: number
    stop: string[]
}
