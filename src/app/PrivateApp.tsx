import get from 'lodash/get'
import { FC } from 'react'
import { useRoutes } from 'react-router-dom'

import { getPrivateRoutesConfig } from 'configs/routes'
import { useGetUserProfile } from 'modules/user/hooks'

const PrivateApp: FC = () => {
  const { data: userProfile } = useGetUserProfile()

  return useRoutes(
    getPrivateRoutesConfig({ isStaff: get(userProfile, 'isStaff', false) }),
  )
}

export default PrivateApp
