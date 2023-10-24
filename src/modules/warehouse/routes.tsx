import React from 'react'
import { Link, Navigate, RouteObject } from 'react-router-dom'

import { BreadCrumbArgs } from 'components/Breadcrumbs'

import EquipmentPageLayout from './components/EquipmentPageLayout'
import ManageWarehousesLayout from './components/ManageWarehousesLayout'
import { WarehouseRouteEnum } from './constants/routes'

const WarehouseCatalogListPage = React.lazy(() => import('./pages/WarehouseCatalogListPage'))
const WarehouseListPage = React.lazy(() => import('./pages/WarehouseListPage'))
const WarehousePage = React.lazy(() => import('./pages/WarehousePage'))

const NomenclatureListPage = React.lazy(() => import('./pages/NomenclatureListPage'))

const ReserveCatalogListPage = React.lazy(() => import('./pages/ReserveCatalogListPage'))

const EquipmentNomenclatureListPage = React.lazy(
  () => import('./pages/EquipmentNomenclatureListPage'),
)

const EquipmentListPage = React.lazy(() => import('./pages/EquipmentListPage'))

const RelocationTaskListPage = React.lazy(() => import('./pages/RelocationTaskListPage'))
const CreateRelocationTaskPage = React.lazy(() => import('./pages/CreateRelocationTaskPage'))
const EditRelocationTaskPage = React.lazy(() => import('./pages/EditRelocationTaskPage'))

export const route: Readonly<RouteObject> = {
  path: WarehouseRouteEnum.ManageWarehouses,
  element: <ManageWarehousesLayout />,
  children: [
    {
      index: true,
      element: <Navigate to={WarehouseRouteEnum.WarehouseCatalogList} />,
    },
    {
      path: WarehouseRouteEnum.WarehouseCatalogList,
      handle: {
        crumb: () => <Link to={WarehouseRouteEnum.WarehouseCatalogList}>Справочники</Link>,
      },
      children: [
        {
          index: true,
          element: <WarehouseCatalogListPage />,
        },
        {
          path: WarehouseRouteEnum.WarehouseList,
          handle: {
            crumb: () => <Link to={WarehouseRouteEnum.WarehouseList}>Склады</Link>,
          },
          children: [
            {
              index: true,
              element: <WarehouseListPage />,
            },
            {
              path: WarehouseRouteEnum.Warehouse,
              element: <WarehousePage />,
              handle: {
                crumb: ({ qs }: BreadCrumbArgs) => qs.get('title'),
              },
            },
          ],
        },
        {
          path: WarehouseRouteEnum.NomenclatureList,
          handle: {
            crumb: () => <Link to={WarehouseRouteEnum.NomenclatureList}>Номенклатура</Link>,
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
      path: WarehouseRouteEnum.ReserveCatalogList,
      handle: {
        crumb: () => <Link to={WarehouseRouteEnum.ReserveCatalogList}>Управление запасами</Link>,
      },
      children: [
        {
          index: true,
          element: <ReserveCatalogListPage />,
        },
        {
          path: WarehouseRouteEnum.EquipmentNomenclatureList,
          element: <EquipmentPageLayout />,
          handle: {
            crumb: () => (
              <Link to={WarehouseRouteEnum.EquipmentNomenclatureList}>Оборудование</Link>
            ),
          },
          children: [
            {
              index: true,
              element: <EquipmentNomenclatureListPage />,
            },
            {
              path: WarehouseRouteEnum.EquipmentList,
              element: <EquipmentListPage />,
              handle: { crumb: ({ qs }: BreadCrumbArgs) => qs.get('title') },
            },
          ],
        },
        {
          path: WarehouseRouteEnum.RelocationTaskList,
          handle: {
            crumb: () => (
              <Link to={WarehouseRouteEnum.RelocationTaskList}>
                Заявки на перемещение оборудования
              </Link>
            ),
          },
          children: [
            {
              index: true,
              element: <RelocationTaskListPage />,
            },
            {
              path: WarehouseRouteEnum.CreateRelocationTask,
              element: <CreateRelocationTaskPage />,
              handle: { crumb: () => 'Создать заявку' },
            },
            {
              path: WarehouseRouteEnum.EditRelocationTask,
              element: <EditRelocationTaskPage />,
              handle: { crumb: () => 'Редактировать заявку' },
            },
          ],
        },
      ],
    },
  ],
}
