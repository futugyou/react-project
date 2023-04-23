export interface ChatModel {
    model: string
    temperature: number
    top_p: number
    max_tokens: number
    frequency_penalty: number
    presence_penalty: number
    messages: ChatMessage[]
}

export interface ChatMessage {
    role: string
    content: string
}