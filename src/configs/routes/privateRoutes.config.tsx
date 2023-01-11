import React from 'react'
import { Navigate, RouteObject } from 'react-router-dom'

import PrivateLayout from 'components/Layout/PrivateLayout'
import NotFound from 'components/NotFound'
import { UserProfileModel } from 'modules/user/models'

import { RoutesEnum } from './constants'
import { staffRoutesConfig } from './staffRoutes.config'

const TaskListPage = React.lazy(() => import('modules/task/pages/TaskListPage'))

export const getPrivateRoutesConfig = ({
  isStaff,
}: Pick<UserProfileModel, 'isStaff'>): Array<RouteObject> => [
  {
    path: RoutesEnum.Root,
    element: <PrivateLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={RoutesEnum.TaskList} />,
      },
      {
        path: RoutesEnum.TaskList,
        element: <TaskListPage />,
      },
      ...(isStaff ? staffRoutesConfig : []),
      {
        path: RoutesEnum.NotFound,
        element: <NotFound />,
      },
    ],
  },
]
