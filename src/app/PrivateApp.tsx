import get from 'lodash/get'
import moment from 'moment-timezone'
import React, { FC, useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { getPrivateRoutesConfig } from 'configs/routes'

import { useGetUserMe, useGetUserStatusList } from 'modules/user/hooks'
import { useGetUserMeCodeQuery } from 'modules/user/services/userApi.service'

import { useGetSystemInfoQuery } from 'shared/services/api'
import { useGetTimeZoneList } from 'shared/services/api/hooks'

const PrivateApp: FC = () => {
  const { data: userMe } = useGetUserMe()
  useGetTimeZoneList()
  useGetUserStatusList()
  useGetUserMeCodeQuery()
  useGetSystemInfoQuery()

  /* Предполагается что в компоненте PrivateLayout отображается спиннер
   во время загрузки данных пользователя, прежде чем отобразить страницу
  */
  useEffect(() => {
    if (userMe?.timezone) {
      moment.tz.setDefault(userMe.timezone)
    }
  }, [userMe?.timezone])

  const routesConfig = createBrowserRouter(
    getPrivateRoutesConfig({
      isStaff: get(userMe, 'isStaff', false),
    }),
  )

  return <RouterProvider router={routesConfig} />
}

export default PrivateApp
