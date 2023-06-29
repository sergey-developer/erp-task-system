import get from 'lodash/get'
import moment from 'moment-timezone'
import { FC, useEffect } from 'react'
import { useRoutes } from 'react-router-dom'

import { getPrivateRoutesConfig } from 'configs/routes'

import { useGetUserMe, useGetUserStatusList } from 'modules/user/hooks'
import { useGetUserMeCodeQuery } from 'modules/user/services/userApi.service'

import { useGetSystemInfoQuery } from 'shared/services/api'
import { useGetTimeZoneList } from 'shared/services/api/hooks'

const PrivateApp: FC = () => {
  const { data: userMe, isSuccess: userMeLoadedSuccess } = useGetUserMe()
  useGetTimeZoneList()
  useGetUserStatusList()
  useGetUserMeCodeQuery()
  useGetSystemInfoQuery()

  /* Предполагается что в компоненте PrivateLayout отображается спиннер
   во время загрузки данных пользователя, прежде чем отобразить страницу
  */
  useEffect(() => {
    if (userMeLoadedSuccess && userMe) {
      moment.tz.setDefault(userMe.timezone)
    }
  }, [userMeLoadedSuccess, userMe])

  const routesConfig = getPrivateRoutesConfig({
    isStaff: get(userMe, 'isStaff', false),
  })

  return useRoutes(routesConfig)
}

export default PrivateApp
