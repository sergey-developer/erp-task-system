import React from 'react'
import { Navigate, RouteObject } from 'react-router-dom'

import { RouteEnum } from 'configs/routes'

const TaskListPage = React.lazy(() => import('modules/task/pages/TaskListPage'))
const TaskListMapPage = React.lazy(() => import('modules/task/pages/TaskListMapPage'))

export const route: Readonly<RouteObject> = {
  path: RouteEnum.Desktop,
  children: [
    {
      index: true,
      element: <Navigate to={RouteEnum.DesktopTaskList} />,
    },
    {
      path: RouteEnum.DesktopTaskList,
      element: <TaskListPage />,
    },
    {
      path: RouteEnum.DesktopTaskListMap,
      element: <TaskListMapPage />,
    },
  ],
}
