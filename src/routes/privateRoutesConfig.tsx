import NotFound from '../components/NotFound';
import { Routes } from './constants'
import { RouteConfig } from './interfaces'
import PrivateLayout from '../components/Layout/PrivateLayout'


export default  [
  {
    path: Routes.notFound,
    element: NotFound,
    layout: PrivateLayout,
    index: true,
  },
] as RouteConfig[];

