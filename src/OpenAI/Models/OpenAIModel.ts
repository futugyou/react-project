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

interface CompletionModel {
    error: string,
    created: string,
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
    texts: string[]
}

const DefaultCompletionModel: CompletionModel = {
    error: '',
    created: '',
    prompt_tokens: 0,
    completion_tokens: 0,
    total_tokens: 0,
    texts: []
};

export {
    DefaultOpenAIModel,
    DefaultCompletionModel,
}

export type {
    CompletionModel,
    OpenAIModel,
}