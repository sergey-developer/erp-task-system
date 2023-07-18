import React from 'react'
import { Navigate, Outlet, RouteObject } from 'react-router-dom'

import { RouteEnum } from 'configs/routes'

import Breadcrumbs from 'components/Breadcrumbs'
import Space from 'components/Space'

import WarehouseCatalogListPageBreadcrumb from './pages/WarehouseCatalogListPage/Breadcrumb'
import WarehouseListPageBreadcrumb from './pages/WarehouseListPage/Breadcrumb'

const WarehouseCatalogListPage = React.lazy(
  () => import('./pages/WarehouseCatalogListPage'),
)

const WarehouseListPage = React.lazy(() => import('./pages/WarehouseListPage'))

const WarehousePage = React.lazy(() => import('./pages/WarehousePage'))

export const manageWarehousesRoute: Readonly<RouteObject> = {
  path: RouteEnum.ManageWarehouses,
  element: (
    <Space $block direction='vertical' size='large'>
      <Breadcrumbs />
      <Outlet />
    </Space>
  ),
  children: [
    {
      index: true,
      element: <Navigate to={RouteEnum.WarehouseCatalogList} />,
    },
    {
      path: RouteEnum.WarehouseCatalogList,
      handle: {
        crumb: WarehouseCatalogListPageBreadcrumb,
      },
      children: [
        {
          index: true,
          element: <WarehouseCatalogListPage />,
        },
        {
          path: RouteEnum.WarehouseList,
          handle: {
            crumb: WarehouseListPageBreadcrumb,
          },
          children: [
            {
              index: true,
              element: <WarehouseListPage />,
            },
            {
              path: RouteEnum.Warehouse,
              element: <WarehousePage />,
              handle: {
                crumb: ({ qs }: { qs: URLSearchParams }) => qs.get('name'),
              },
            },
          ],
        },
      ],
    },
  ],
}
