export interface PlaygroundModel {
    createdAt: number
    prompt: string
    suffix: any
    instruction: string
    completion: string
    chatLog: ChatLog[]
    completionMode: string
    stopSequence: any[]
    startSequence: string
    startSequenceEnabled: boolean
    restartSequence: string
    restartSequenceEnabled: boolean
    model: string
    temperature: number
    responseLength: number
    topP: number
    frequencyPenalty: number
    presencePenalty: number
    bestOf: number
    Date?: string
}

export interface ChatLog {
    role: string
    content: string
}
