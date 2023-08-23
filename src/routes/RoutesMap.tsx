import { lazy, ReactElement } from 'react'

// project imports
import Loadable from 'components/progress/Loadable'
import AuthGuard from './guards/AuthGuard'
import NavigationScroll from './guards/NavigationScroll'

// sample page routing
const HomePage = Loadable(lazy(() => import('views/home')))
const StatisticsPage = Loadable(lazy(() => import('views/statistics')))

type Route = {
  path: string
  title?: string
  element: ReactElement
}

const RoutesMap: Route[] = [
  {
    path: '/',
    title: '打卡',
    element: (
      <AuthGuard>
        <NavigationScroll>
          <HomePage />
        </NavigationScroll>
      </AuthGuard>
    )
  },
  {
    path: '/statistics',
    title: '打卡统计',
    element: (
      <AuthGuard>
        <StatisticsPage />
      </AuthGuard>
    )
  }
]

export default RoutesMap
