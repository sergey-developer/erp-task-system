import React from 'react'
import { Navigate, RouteObject } from 'react-router-dom'

import { RouteEnum } from 'configs/routes'

import TaskListLayout from './features/TaskListLayout'

const TaskListPage = React.lazy(() => import('modules/task/pages/TaskListPage'))

const FiscalAccumulatorTaskListPage = React.lazy(
  () => import('modules/task/pages/FiscalAccumulatorTaskListPage'),
)

export const routes: RouteObject[] = [
  {
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
        element: <TaskListLayout>TaskListMap</TaskListLayout>,
      },
      {
        path: RouteEnum.FiscalAccumulatorTaskList,
        element: <FiscalAccumulatorTaskListPage />,
      },
    ],
  },
]
