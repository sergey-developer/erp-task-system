import React from 'react'
import { Link, Navigate, RouteObject } from 'react-router-dom'

import { RouteEnum } from 'configs/routes'

import ManageWarehousesLayout from './components/ManageWarehousesLayout'
import ReservesListLayout from './components/ReservesListLayout'

const WarehouseCatalogListPage = React.lazy(
  () => import('./pages/WarehouseCatalogListPage'),
)
const WarehouseListPage = React.lazy(() => import('./pages/WarehouseListPage'))
const WarehousePage = React.lazy(() => import('./pages/WarehousePage'))

const NomenclatureListPage = React.lazy(
  () => import('./pages/NomenclatureListPage'),
)

const ReserveCatalogListPage = React.lazy(
  () => import('./pages/ReserveCatalogListPage'),
)

export const route: Readonly<RouteObject> = {
  path: RouteEnum.ManageWarehouses,
  element: <ManageWarehousesLayout />,
  children: [
    {
      index: true,
      element: <Navigate to={RouteEnum.WarehouseCatalogList} />,
    },
    {
      path: RouteEnum.WarehouseCatalogList,
      handle: {
        crumb: () => (
          <Link to={RouteEnum.WarehouseCatalogList}>Справочники</Link>
        ),
      },
      children: [
        {
          index: true,
          element: <WarehouseCatalogListPage />,
        },
        {
          path: RouteEnum.WarehouseList,
          handle: {
            crumb: () => <Link to={RouteEnum.WarehouseList}>Склады</Link>,
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
        {
          path: RouteEnum.NomenclatureList,
          handle: {
            crumb: () => (
              <Link to={RouteEnum.NomenclatureList}>Номенклатура</Link>
            ),
          },
          children: [
            {
              index: true,
              element: <NomenclatureListPage />,
            },
          ],
        },
      ],
    },
    {
      path: RouteEnum.ReserveCatalogList,
      handle: {
        crumb: () => (
          <Link to={RouteEnum.ReserveCatalogList}>Управление запасами</Link>
        ),
      },
      children: [
        {
          index: true,
          element: <ReserveCatalogListPage />,
        },
        {
          path: RouteEnum.ReserveEquipmentNomenclatureList,
          element: <ReservesListLayout />,
          handle: {
            crumb: () => (
              <Link to={RouteEnum.ReserveEquipmentNomenclatureList}>
                Оборудование
              </Link>
            ),
          },
          children: [],
        },
      ],
    },
  ],
}
