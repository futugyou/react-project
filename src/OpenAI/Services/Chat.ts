import { openaiserver } from './Const'
import { ChatModel } from '../Models/ChatModel'
import * as SSEClient from '@/@types/sse/sse'


const createChatStream = async (data: ChatModel, processfn: (a: any) => void, endfn: () => void) => {
    const jwtToken = JSON.parse(window.localStorage.getItem('auth') || '{}')
    const path = 'chat/sse'
    const sse = SSEClient.SSE(`${openaiserver}${path}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + jwtToken.access_token,
        },
        method: "POST",
        payload: JSON.stringify(data),
    })

    sse.addEventListener('message', (event: any) => {
        if (event.data == "[DONE]") {
            sse.close()
            endfn()
        } else {
            let tmp = event.data.replace(/\+/gi, '%20')
            processfn(decodeURIComponent(tmp))
        }
    })

    sse.stream()
}

export default {
    createChatStream: createChatStream,
}