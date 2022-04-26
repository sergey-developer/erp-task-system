import { RouteObject } from 'react-router-dom'
import PublicLayout from '../components/Layout/PublicLayout'
import PrivateLayout from '../components/Layout/PrivateLayout'
import { FC } from 'react'

export type RouteConfig = RouteObject & { layout?: typeof PublicLayout | typeof PrivateLayout, element: FC };
