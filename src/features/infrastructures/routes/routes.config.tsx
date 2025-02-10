import ProtectedRoute from 'features/auth/components/ProtectedRoute'
import { ChangeInfrastructurePageLocationState } from 'features/infrastructures/pages/ChangeInfrastructurePage/types'
import { UserPermissionsEnum } from 'features/user/api/constants'
import { userHasPermissions } from 'features/user/utils'
import { WorkTypeActionsEnum } from 'features/warehouse/constants/workType'
import React from 'react'
import { RouteObject } from 'react-router-dom'

import { CommonRoutesEnum } from 'configs/routes'

import { InfrastructuresRoutesEnum } from './routes'

const ChangeInfrastructurePage = React.lazy(
  () => import('features/infrastructures/pages/ChangeInfrastructurePage'),
)

export const infrastructuresRoutes: Readonly<RouteObject> = {
  path: CommonRoutesEnum.Desktop,
  children: [
    {
      path: InfrastructuresRoutesEnum.DesktopChangeInfrastructure,
      element: (
        <ProtectedRoute<ChangeInfrastructurePageLocationState>
          component={<ChangeInfrastructurePage />}
          permitted={(user, locationState) =>
            userHasPermissions(
              user,
              [
                UserPermissionsEnum.InfrastructureProjectRead,
                UserPermissionsEnum.AnyStatusInfrastructureProjectRead,
              ],
              false,
            ) &&
            !!locationState?.task.infrastructureProject &&
            !!locationState?.task.workType?.actions?.includes(
              WorkTypeActionsEnum.CreateInfrastructureProject,
            )
          }
        />
      ),
    },
  ],
}
