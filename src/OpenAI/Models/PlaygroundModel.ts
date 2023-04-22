export interface PlaygroundModel {
    createdAt: number
    prompt: string
    suffix: string
    instruction: string
    completion: string
    chatLog: ChatLog[]
    completionMode: string
    stopSequence: string[]
    startSequence: string
    startSequenceEnabled: boolean
    restartSequence: string
    restartSequenceEnabled: boolean
    model: string
    temperature: number
    responseLength: number
    top_p: number
    frequency_penalty: number
    presence_penalty: number
    best_of: number
    Date?: string
}

export const DefaultPlayground: PlaygroundModel = {
    createdAt: Date.now(),
    prompt: "",
    suffix: "",
    instruction: "",
    completion: "",
    chatLog: [],
    completionMode: "",
    stopSequence: [],
    startSequence: "",
    startSequenceEnabled: false,
    restartSequence: "",
    restartSequenceEnabled: false,
    model: "",
    temperature: 0,
    responseLength: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    best_of: 1
}

export interface ChatLog {
    role: string
    content: string
}
