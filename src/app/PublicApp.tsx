import { FC } from 'react'

import { publicRoutesConfig } from 'configs/routes'

import AppRouter from './AppRouter'

const PublicApp: FC = () => {
  return <AppRouter routes={publicRoutesConfig} />
}

export default PublicApp
