import React from 'react'
import { Navigate, RouteObject } from 'react-router-dom'

import { CommonRouteEnum } from 'configs/routes'

import TaskListLayout from 'modules/task/components/TaskListLayout'

const TaskListPage = React.lazy(() => import('modules/task/pages/TaskListPage'))
const TaskListMapPage = React.lazy(() => import('modules/task/pages/TaskListMapPage'))

export const route: Readonly<RouteObject> = {
  path: CommonRouteEnum.DesktopTasks,
  element: <TaskListLayout defaultRoute={CommonRouteEnum.DesktopTaskList} />,
  children: [
    {
      index: true,
      element: <Navigate to={CommonRouteEnum.DesktopTaskList} />,
    },
    {
      path: CommonRouteEnum.DesktopTaskList,
      element: <TaskListPage />,
    },
    {
      path: CommonRouteEnum.DesktopTaskListMap,
      element: <TaskListMapPage />,
    },
  ],
}
