import React from 'react'
import { Navigate, RouteObject } from 'react-router-dom'

import { RouteEnum } from 'configs/routes'

const TaskListPage = React.lazy(() => import('modules/task/pages/TaskListPage'))

const TaskListMapPage = React.lazy(
  () => import('modules/task/pages/TaskListMapPage'),
)

const FiscalAccumulatorTaskListPage = React.lazy(
  () => import('modules/task/pages/FiscalAccumulatorTaskListPage'),
)

export const route: Readonly<RouteObject> = {
  path: RouteEnum.Tasks,
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
      path: RouteEnum.TaskListMap,
      element: <TaskListMapPage />,
    },
    {
      path: RouteEnum.FiscalAccumulatorTaskList,
      element: <FiscalAccumulatorTaskListPage />,
    },
  ],
}
