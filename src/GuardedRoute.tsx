import { lazy } from 'react'
import { useAuth } from './auth/index'

const ErrorPage = lazy(() => import('./ErrorPage'))

interface GuardedRouteProps {
    children?: React.ReactNode;
}

const GuardedRoute = ({ children }: GuardedRouteProps) => {
    const { authService } = useAuth()
    const isRouteAccessible = authService.isAuthenticated()
    if (!isRouteAccessible) {
        return (
            <ErrorPage message="This page is only accessible to logged-in users">
            </ErrorPage>
        )
    } else {
        return (<>{children}</>)
    }
}

export default GuardedRoute