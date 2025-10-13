import './User.css'

import Popover from "@cloudscape-design/components/popover"

import { useAuth } from '../Auth/index'

const User = (props: any) => {
    const { authService } = useAuth()
    const user = authService.getUser()

    const login = async () => {
        authService.authorize()
    }

    const logout = async () => {
        authService.logout()
    }

    if (!authService.isAuthenticated() || user == null) {
        return (
            <div className="header-user">
                <button onClick={login} className="login-btn">Login</button>
            </div>
        )
    }

    return (
        <div className="header-user">
            <Popover
                dismissButton={false}
                content={
                    <button onClick={logout}>Logout</button>
                }
                position="bottom"                
                size="small"
            >
                <div className="user-name">{user.name}</div>
            </Popover >
        </div>
    )
}
export { User }