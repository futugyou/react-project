

import { PlaygroundModel, DefaultPlayground } from './PlaygroundModel'
import { ExampleModel, DefaultExampleModel } from './ExampleModel'
import { OpenAIModel } from './OpenAIModel'
import { ChatModel, ChatMessage } from './ChatModel'

const convertOpenAIToExample = (data: PlaygroundModel): ExampleModel => {
    const response: ExampleModel = {
        key: '',
        title: '',
        subTitle: '',
        model: data.model,
        prompt: data.prompt,
        temperature: data.temperature,
        max_tokens: data.responseLength,
        top_p: data.top_p,
        frequency_penalty: data.frequency_penalty ?? 0.0,
        presence_penalty: data.presence_penalty ?? 0.0,
        tags: [],
        stop: data.stopSequence ?? [],
        description: '',
        sample_response: ''
    }

    return response
}

const mapExampleModelToPlaygroundModel = (data: ExampleModel): PlaygroundModel => {
    let result: PlaygroundModel = {
        ...DefaultPlayground,
        model: data.model,
        prompt: data.prompt,
        responseLength: data.max_tokens,
        top_p: data.top_p,
        temperature: data.temperature,
        frequency_penalty: data.frequency_penalty,
        presence_penalty: data.presence_penalty,
        stopSequence: data.stop,
    }

    return result
}

const mapPlaygroundModelToOpenAIModel = (data: PlaygroundModel, modeParam: string): OpenAIModel => {
    let result: OpenAIModel = {
        model: data.model,
        prompt: data.prompt,
        max_tokens: data.responseLength,
        temperature: data.temperature,
        top_p: data.top_p,
        frequency_penalty: data.frequency_penalty,
        presence_penalty: data.presence_penalty,
        best_of: data.best_of,
        echo: false,
        logprobs: 0,
        stop: data.stopSequence,
        suffix: data.suffix,
    }

    if ((modeParam == "Complete") && data.startSequenceEnabled && data.startSequence.length > 0) {
        result.prompt = data.prompt + data.startSequence
    }

    return result
}

const mapPlaygroundModelToChatModel = (data: PlaygroundModel): ChatModel => {
    let messages: ChatMessage[] = data.chatLog.map(i => { return { role: i.role, content: i.content } })
    if (data.instruction.length > 0) {
        let message: ChatMessage = {
            role: "system",
            content: data.instruction,
        }

        messages.push(message)
    }

    let result: ChatModel = {
        model: data.model,
        temperature: data.temperature,
        top_p: data.top_p,
        max_tokens: data.responseLength,
        frequency_penalty: data.frequency_penalty,
        presence_penalty: data.presence_penalty,
        messages: messages,
    }

    return result
}

export default {
    convertOpenAIToExample: convertOpenAIToExample,
    mapExampleModelToPlaygroundModel: mapExampleModelToPlaygroundModel,
    mapPlaygroundModelToOpenAIModel: mapPlaygroundModelToOpenAIModel,
    mapPlaygroundModelToChatModel: mapPlaygroundModelToChatModel,
}