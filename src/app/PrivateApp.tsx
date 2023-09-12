import get from 'lodash/get'
import moment from 'moment-timezone'
import { FC, useEffect } from 'react'

import { getPrivateRoutesConfig } from 'configs/routes'

import { useGetUserMe } from 'modules/user/hooks'
import { useGetUserMeCodeQuery } from 'modules/user/services/userApiService'

import { useGetTimeZoneList } from 'shared/hooks/catalogs/timeZone'
import { useGetUserStatusList } from 'shared/hooks/catalogs/userStatus'
import { useGetSystemInfoQuery } from 'shared/services/systemApi.service'

import AppRoutes from './AppRoutes'

const PrivateApp: FC = () => {
  const { data: userMe } = useGetUserMe()
  useGetTimeZoneList()
  useGetUserStatusList()
  useGetUserMeCodeQuery()
  useGetSystemInfoQuery()

  /* В компоненте PrivateLayout отображается спиннер
   во время загрузки данных пользователя, прежде чем отобразить страницу
  */
  useEffect(() => {
    if (userMe?.timezone) {
      moment.tz.setDefault(userMe.timezone)
    }
  }, [userMe?.timezone])

  const routes = getPrivateRoutesConfig({
    isStaff: get(userMe, 'isStaff', false),
  })

  return <AppRoutes routes={routes} />
}

export default PrivateApp
