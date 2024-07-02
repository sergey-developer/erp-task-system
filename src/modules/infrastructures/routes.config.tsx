import React from 'react'
import { RouteObject } from 'react-router-dom'

import ProtectedRoute from 'modules/auth/components/ProtectedRoute'
import { InfrastructuresRoutesEnum } from 'modules/infrastructures/constants/routes'
import { TasksRoutesEnum } from 'modules/task/constants/routes'

const ChangeInfrastructurePage = React.lazy(
  () => import('modules/infrastructures/pages/ChangeInfrastructurePage'),
)

export const infrastructuresRoute: Readonly<RouteObject> = {
  path: TasksRoutesEnum.Desktop,
  children: [
    {
      path: InfrastructuresRoutesEnum.DesktopChangeInfrastructure,
      // todo: дополнить функцией permitted
      element: <ProtectedRoute component={<ChangeInfrastructurePage />} />,
    },
  ],
}
