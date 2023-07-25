import { FC } from 'react'

import { publicRoutesConfig } from 'configs/routes'

import AppRoutes from './AppRoutes'

const PublicApp: FC = () => {
  return <AppRoutes routes={publicRoutesConfig} />
}

export default PublicApp
