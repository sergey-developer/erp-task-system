import get from 'lodash/get'
import { FC } from 'react'
import { useRoutes } from 'react-router-dom'

import { getPrivateRoutesConfig } from 'configs/routes'
import { useGetUserProfile } from 'modules/user/hooks'

const PrivateApp: FC = () => {
  const { data: userProfile } = useGetUserProfile()

  const routesConfig = getPrivateRoutesConfig({
    isStaff: get(userProfile, 'isStaff', false),
  })

  return useRoutes(routesConfig)
}

export default PrivateApp
