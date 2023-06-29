import React from 'react'
import { Navigate, RouteObject } from 'react-router-dom'

import { UserModel } from 'modules/user/models'

import PrivateLayout from 'components/Layouts/PrivateLayout'
import NotFoundPage from 'components/Pages/NotFoundPage'

import { RouteEnum } from './constants'
import { staffRoutesConfig } from './staffRoutes.config'

const TaskListPage = React.lazy(() => import('modules/task/pages/TaskListPage'))

const FiscalDriversPage = React.lazy(
  () => import('modules/fiscalDrives/pages/FiscalDriverListPage'),
)

export const getPrivateRoutesConfig = ({
  isStaff,
}: Pick<UserModel, 'isStaff'>): Array<RouteObject> => [
  {
    path: RouteEnum.Root,
    element: <PrivateLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={RouteEnum.TaskList} />,
      },
      {
        path: RouteEnum.TaskList,
        element: <TaskListPage />,
      },
      {
        path: RouteEnum.FiscalDrives,
        element: <FiscalDriversPage />,
      },
      ...(isStaff ? staffRoutesConfig : []),
      {
        path: RouteEnum.NotFound,
        element: <NotFoundPage />,
      },
    ],
  },
]
