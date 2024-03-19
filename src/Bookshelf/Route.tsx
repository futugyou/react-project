
import { lazy } from 'react'
import { RouteDescription } from '@/RouteDescription'

const Bookshelf = lazy(() => import('./App'))

export const BookshelfRoute: RouteDescription = {
    display: "Bookshelf",
    path: "/bookshelf",
    element: <Bookshelf />,
    checkActive: (path: string) => path.startsWith('/bookshelf'),
    show: () => false,
}