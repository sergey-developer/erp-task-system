import get from 'lodash/get'
import { FC } from 'react'
import { useRoutes } from 'react-router-dom'

import { getPrivateRoutesConfig } from 'configs/routes'

import { useGetUserProfile } from 'modules/user/hooks'
import { useGetUserCodeQuery } from 'modules/user/services/userApi.service'

import { useGetTimeZoneList } from 'shared/services/api/hooks'

const PrivateApp: FC = () => {
  const { data: userProfile } = useGetUserProfile()
  useGetTimeZoneList()
  useGetUserCodeQuery()

  const routesConfig = getPrivateRoutesConfig({
    isStaff: get(userProfile, 'isStaff', false),
  })

  return useRoutes(routesConfig)
}

export default PrivateApp
