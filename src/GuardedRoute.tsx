import { Navigate, Outlet } from 'react-router-dom'

import { useAuth } from './Auth/index'

interface GuardedRouteProps {
    children?: React.ReactNode;
}


function GuardedRoute({ children }: GuardedRouteProps) {
    const { authService } = useAuth()
    const isRouteAccessible = authService.isAuthenticated()
    if (!isRouteAccessible) {
        return (<></>)
    } else {
        return (<>{children}</>)
    }
}

export default GuardedRoute