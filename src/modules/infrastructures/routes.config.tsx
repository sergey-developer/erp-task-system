import React from 'react'
import { RouteObject } from 'react-router-dom'

import { CommonRouteEnum } from 'configs/routes'

import ProtectedRoute from 'modules/auth/components/ProtectedRoute'
import { InfrastructuresRoutesEnum } from 'modules/infrastructures/constants/routes'
import { ChangeInfrastructurePageLocationState } from 'modules/infrastructures/pages/ChangeInfrastructurePage/types'

const ChangeInfrastructurePage = React.lazy(
  () => import('modules/infrastructures/pages/ChangeInfrastructurePage'),
)

export const infrastructuresRoute: Readonly<RouteObject> = {
  path: CommonRouteEnum.Desktop,
  children: [
    {
      path: InfrastructuresRoutesEnum.DesktopChangeInfrastructure,
      element: (
        <ProtectedRoute<ChangeInfrastructurePageLocationState>
          component={<ChangeInfrastructurePage />}
          // permitted={(user, locationState) =>
          //   userHasPermissions(
          //     user,
          //     [
          //       UserPermissionsEnum.InfrastructureProjectRead,
          //       UserPermissionsEnum.AnyStatusInfrastructureProjectRead,
          //     ],
          //     false,
          //   ) &&
          //   !!locationState?.task.infrastructureProject &&
          //   !!locationState?.task.workType?.actions?.includes(
          //     WorkTypeActionsEnum.CreateInfrastructureProject,
          //   )
          // }
        />
      ),
    },
  ],
}
