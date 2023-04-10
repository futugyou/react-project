
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
    DefaultCompletionModel,
}

export type {
    CompletionModel,
}