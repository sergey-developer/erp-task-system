import React from 'react'
import { Outlet, RouteObject } from 'react-router-dom'

import { RouteEnum } from 'configs/routes'

import WarehouseCatalogListPageBreadcrumb from './pages/WarehouseCatalogListPage/Breadcrumb'

const WarehouseListPage = React.lazy(() => import('./pages/WarehouseListPage'))
const WarehouseCatalogListPage = React.lazy(
  () => import('./pages/WarehouseCatalogListPage'),
)

export const warehousesCatalogListRoute: Readonly<RouteObject> = {
  path: RouteEnum.WarehouseCatalogList,
  element: <WarehouseCatalogListPage />,
  handle: {
    crumb: WarehouseCatalogListPageBreadcrumb,
  },
}

export const warehousesListRoute: Readonly<RouteObject> = {
  path: RouteEnum.WarehouseList,
  element: <WarehouseListPage />,
}

export const warehousesIndexRoute: Readonly<RouteObject> = {
  index: true,
  element: warehousesCatalogListRoute.element,
  handle: warehousesCatalogListRoute.handle,
}

export const warehousesRootRoute: Readonly<RouteObject> = {
  path: RouteEnum.Warehouses,
  element: <Outlet />,
  children: [
    warehousesIndexRoute,
    warehousesCatalogListRoute,
    warehousesListRoute,
  ],
}
