import React from 'react'
import { Link, Navigate, RouteObject } from 'react-router-dom'

import { RouteEnum } from 'configs/routes'

import { BreadCrumbArgs } from 'components/Breadcrumbs'

import ManageWarehousesLayout from './components/ManageWarehousesLayout'
import EquipmentNomenclatureLayout from './components/EquipmentNomenclatureLayout'

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

const EquipmentNomenclatureListPage = React.lazy(
  () => import('./pages/EquipmentNomenclatureListPage'),
)

const EquipmentListPage = React.lazy(() => import('./pages/EquipmentListPage'))

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
                crumb: ({ qs }: BreadCrumbArgs) => qs.get('title'),
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
          path: RouteEnum.EquipmentNomenclatureList,
          element: <EquipmentNomenclatureLayout />,
          handle: {
            crumb: () => (
              <Link to={RouteEnum.EquipmentNomenclatureList}>Оборудование</Link>
            ),
          },
          children: [
            {
              index: true,
              element: <EquipmentNomenclatureListPage />,
            },
            {
              path: RouteEnum.EquipmentList,
              element: <EquipmentListPage />,
              handle: {
                crumb: ({ qs }: BreadCrumbArgs) => qs.get('title'),
              },
            },
          ],
        },
      ],
    },
  ],
}
