export interface OpenAIModel {
    model: string,
    prompt: string
    max_tokens: number
    temperature: number
    top_p: number
    frequency_penalty: number
    presence_penalty: number
    best_of: number
    echo: boolean
    logprobs: number
    stop: string[]
}