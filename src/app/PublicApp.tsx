import { FC } from 'react'
import { useRoutes } from 'react-router-dom'

import { publicRoutesConfig } from 'configs/routes'

const PublicApp: FC = () => {
  return useRoutes(publicRoutesConfig)
}

export default PublicApp
