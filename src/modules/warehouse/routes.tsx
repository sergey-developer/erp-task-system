import React from 'react'
import { Navigate, Outlet, RouteObject } from 'react-router-dom'

import { RouteEnum } from 'configs/routes'

import Breadcrumbs from 'components/Breadcrumbs'
import Space from 'components/Space'

import WarehouseCatalogListPageBreadcrumb from './pages/WarehouseCatalogListPage/Breadcrumb'
import WarehouseListPageBreadcrumb from './pages/WarehouseListPage/Breadcrumb'

const WarehouseListPage = React.lazy(() => import('./pages/WarehouseListPage'))

const WarehouseCatalogListPage = React.lazy(
  () => import('./pages/WarehouseCatalogListPage'),
)

export const warehousesListRoute: Readonly<RouteObject> = {
  path: RouteEnum.WarehouseList,
  element: <WarehouseListPage />,
  handle: {
    crumb: WarehouseListPageBreadcrumb,
  },
}

export const warehousesCatalogListRoute: Readonly<RouteObject> = {
  path: RouteEnum.WarehouseCatalogList,
  children: [
    {
      index: true,
      element: <WarehouseCatalogListPage />,
    },
    warehousesListRoute,
  ],
  handle: {
    crumb: WarehouseCatalogListPageBreadcrumb,
  },
}

export const warehousesRootRoute: Readonly<RouteObject> = {
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
      element: <Navigate to={RouteEnum.WarehouseCatalogList} />,
    },
    warehousesCatalogListRoute,
  ],
}
