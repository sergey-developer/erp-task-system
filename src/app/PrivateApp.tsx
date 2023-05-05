import get from 'lodash/get'
import { FC } from 'react'
import { useRoutes } from 'react-router-dom'

import { getPrivateRoutesConfig } from 'configs/routes'

import { useGetUserMe } from 'modules/user/hooks'
import { useGetUserCodeQuery } from 'modules/user/services/userApi.service'

import { useGetTimeZoneList } from 'shared/services/api/hooks'

const PrivateApp: FC = () => {
  const { data: userMe } = useGetUserMe()
  useGetTimeZoneList()
  useGetUserCodeQuery()

  const routesConfig = getPrivateRoutesConfig({
    isStaff: get(userMe, 'isStaff', false),
  })

  return useRoutes(routesConfig)
}

export default PrivateApp
