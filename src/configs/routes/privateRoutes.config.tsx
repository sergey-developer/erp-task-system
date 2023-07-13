import React from 'react'
import { Navigate, Outlet, RouteObject } from 'react-router-dom'

import { UserModel } from 'modules/user/models'
import WarehouseCatalogListPageBreadcrumb from 'modules/warehouse/pages/WarehouseCatalogListPage/Breadcrumb'

import Breadcrumbs from 'components/Breadcrumbs'
import PrivateLayout from 'components/Layouts/PrivateLayout'
import NotFoundPage from 'components/Pages/NotFoundPage'
import Space from 'components/Space'

import { RouteEnum } from './constants'
import { staffRoutesConfig } from './staffRoutes.config'

const TaskListPage = React.lazy(() => import('modules/task/pages/TaskListPage'))

const WarehouseCatalogListPage = React.lazy(
  () => import('modules/warehouse/pages/WarehouseCatalogListPage'),
)

const ChangePasswordPage = React.lazy(
  () => import('modules/auth/pages/ChangePasswordPage'),
)

const FiscalAccumulatorTaskListPage = React.lazy(
  () => import('modules/task/pages/FiscalAccumulatorTaskListPage'),
)

// todo: разделить роуты по модулям

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
        path: RouteEnum.FiscalAccumulatorTaskList,
        element: <FiscalAccumulatorTaskListPage />,
      },
      {
        path: RouteEnum.ChangePassword,
        element: <ChangePasswordPage />,
      },
      {
        path: RouteEnum.Warehouses,
        element: (
          <Space $block direction='vertical' size='large'>
            <Breadcrumbs />
            <Outlet />
          </Space>
        ),
        children: [
          {
            index: true,
            element: <WarehouseCatalogListPage />,
            handle: {
              crumb: WarehouseCatalogListPageBreadcrumb,
            },
          },
          {
            path: RouteEnum.WarehouseCatalogList,
            element: <WarehouseCatalogListPage />,
            handle: {
              crumb: WarehouseCatalogListPageBreadcrumb,
            },
          },
          {
            path: RouteEnum.WarehouseList,
            element: <div>WarehouseList</div>,
          },
        ],
      },
      ...(isStaff ? staffRoutesConfig : []),
      {
        path: RouteEnum.NotFound,
        element: <NotFoundPage />,
      },
    ],
  },
]
