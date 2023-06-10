import './User.css'

import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'

import { AuthProvider, AuthService, useAuth } from './Auth/index'

const User = (props: any) => {
    const { authService } = useAuth()
    const user = authService.getUser()

    const login = async () => {
        authService.authorize()
    }

    const logout = async () => {
        authService.logout()
    }

    const logoutPopover = (
        <Popover id="model-popover">
            <Popover.Body>
                <button onClick={logout}>Logout</button>
            </Popover.Body>
        </Popover>
    );

    if (!authService.isAuthenticated() || user == null) {
        return (
            <div>
                <button onClick={login}>Login</button>
            </div>
        )
    }

    return (
        <OverlayTrigger placement="bottom" overlay={logoutPopover} delay={{ show: 100, hide: 1000 }} >
            <div className="user-name">{user.name}</div>
        </OverlayTrigger >
    )
}
export { User }