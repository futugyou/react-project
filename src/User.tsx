import './User.css'

import { AuthProvider, AuthService, useAuth } from './Auth/index'

const User = (props: any) => {
    const { authService } = useAuth()
    const user = authService.getUser()

    if (user == null) {
        return <div></div>
    }

    return (
        <div>{user.name}</div>
    )
}
export { User }