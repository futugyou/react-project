import 'gitalk/dist/gitalk.css'
import Gitalk from 'gitalk'
// @ts-ignore
import GitalkComponent from "gitalk/dist/gitalk-component"

const Comment = () => {
    return (
        <GitalkComponent options={{
            clientID: import.meta.env.REACT_APP_GITTALK_CLIENTID,
            clientSecret: import.meta.env.REACT_APP_GITTALK_CLIENTSECRET,
            repo: import.meta.env.REACT_APP_GITTALK_REPO,      // The repository of store comments,
            owner: import.meta.env.REACT_APP_GITTALK_OWNER,
            admin: [import.meta.env.REACT_APP_GITTALK_ADMIN,],
            id: location.pathname,      // Ensure uniqueness and length less than 50
            number: import.meta.env.REACT_APP_GITTALK_NUMBER,
            distractionFreeMode: false  // Facebook-like distraction free mode
        }} />
    )
}

export default Comment
