import { FC } from 'react'
import { useRoutes } from 'react-router-dom'

import { publicRoutes } from '../configs/routes'

const PublicApp: FC = () => {
  return useRoutes(publicRoutes)
}

export default PublicApp
