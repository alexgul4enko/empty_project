import { Suspense, lazy } from 'react'
const LoginForm = lazy(() => import('./login'))

const routes = [
  {
    path: '/',
    routes: [
      {
        path: '/',
        exact: true,
        redirectTo: 'login',
      },
      {
        path: '/login',
        component: () => <Suspense fallback={<div>Loading...</div>}><LoginForm/></Suspense>,
        name: 'login',
      },
    ],
  },
]

export default routes
