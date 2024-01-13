import Pusher from 'pusher'

const {
    REACT_APP_FLUID_LOCAL_ENDPOINT: appId,
    REACT_APP_PUSHER_KEY: key,
    REACT_APP_PUSHER_SECRET: secret,
    REACT_APP_PUSHER_CLUSTER: cluster,
} = process.env

const pusher = new Pusher({
    appId: appId!,
    key: key!,
    secret: secret!,
    cluster: cluster!,
    useTLS: true
})

export default async function handler(req, res) {
    const { x0, x1, y0, y1, color } = req.body
    console.log(appId, cluster, x0, x1, y0, y1, color)
    try {
        const response = await pusher.trigger('my-channel', 'my-event',
            { x0, x1, y0, y1, color },
        )
        if (response.ok) {
            res.status(200).end('sent event succesfully')
        } else {
            const text = await response.text()
            res.status(response.status).end(text)
        }

    } catch (e) {
        res.status(500).end(e.message)
    }
}
