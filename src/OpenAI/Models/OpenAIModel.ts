interface OpenAIModel {
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
    suffix?: string
}

const DefaultOpenAIModel: OpenAIModel = {
    model: 'text-davinci-003',
    prompt: '',
    max_tokens: 256,
    top_p: 1,
    temperature: 0.5,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop: [],
    best_of: 1,
    echo: false,
    logprobs: 0,
};


export {
    DefaultOpenAIModel,
}

export type {
    OpenAIModel,
}