interface ExampleModel {
    key: string
    title: string
    subTitle: string
    model: string,
    prompt: string
    temperature: number
    max_tokens: number
    top_p: number
    frequency_penalty: number
    presence_penalty: number
    tags: string[]
    stop: string[]
    description: string,
    sample_response: string,
}

const DefaultExampleModel: ExampleModel = {
    key: '',
    title: '',
    subTitle: '',
    model: 'text-davinci-003',
    prompt: '',
    temperature: 0.0,
    max_tokens: 0,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    tags: [],
    stop: [],
    description: '',
    sample_response: '',
}

export {
    DefaultExampleModel,
}

export type {
    ExampleModel,
}