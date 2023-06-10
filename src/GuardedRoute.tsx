import { useAuth } from './Auth/index'
import ErrorPage from './ErrorPage'

interface GuardedRouteProps {
    children?: React.ReactNode;
}


function GuardedRoute({ children }: GuardedRouteProps) {
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