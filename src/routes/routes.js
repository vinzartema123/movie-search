import { lazy } from 'react';


export default [
  {
    path: 'home',
    component: lazy(() => import('../pages/Home')),
    exact: true,
  },
]
