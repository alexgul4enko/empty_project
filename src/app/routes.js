import AppLayout from 'layouts/appLayout'
import { routes as auth } from 'pages/auth'
import { routes as main } from 'pages/main'
import NotFound from 'pages/fallbacks'
import { access } from 'common/session'


const appRoutes = [
  {
    path: '/',
    exact: true,
    name: 'root',
    redirectTo: 'dashboard',
  },
  {
    path: '/',
    layout: AppLayout,
    routes: [
      {
        path: '/auth',
        routes: auth,
        access: access.F_UNAUTHORISED,
        accessRedirectTo: 'dashboard',
        name: 'auth',
      },
      {
        path: '/dashboard',
        routes: main,
        access: access.F_PROTECTED,
        accessRedirectTo: 'auth',
        name: 'dashboard',
      },
      {
        component: NotFound,
      },
    ],
  },
]

export default appRoutes
