import React from 'react'
import { Link, Navigate, RouteObject } from 'react-router-dom'

import ProtectedRoute from 'modules/auth/components/ProtectedRoute'
import { expectedPermissionsAllowed } from 'modules/user/utils'
import EquipmentPageLayout from 'modules/warehouse/components/EquipmentPageLayout'
import ManageWarehousesLayout from 'modules/warehouse/components/ManageWarehousesLayout'
import { WarehouseRouteEnum } from 'modules/warehouse/constants/routes'

import { BreadCrumbArgs } from 'components/Breadcrumbs'

const WarehouseCatalogListPage = React.lazy(
  () => import('modules/warehouse/pages/WarehouseCatalogListPage'),
)

const WarehouseListPage = React.lazy(() => import('modules/warehouse/pages/WarehouseListPage'))
const WarehousePage = React.lazy(() => import('modules/warehouse/pages/WarehousePage'))

const NomenclatureListPage = React.lazy(
  () => import('modules/warehouse/pages/NomenclatureListPage'),
)

const ReserveCatalogListPage = React.lazy(
  () => import('modules/warehouse/pages/ReserveCatalogListPage'),
)

const EquipmentNomenclatureListPage = React.lazy(
  () => import('modules/warehouse/pages/EquipmentNomenclatureListPage'),
)

const EquipmentListPage = React.lazy(() => import('modules/warehouse/pages/EquipmentListPage'))

const RelocationTaskListPage = React.lazy(
  () => import('modules/warehouse/pages/RelocationTaskListPage'),
)

const CreateRelocationTaskPage = React.lazy(
  () => import('modules/warehouse/pages/CreateRelocationTaskPage'),
)

const EditRelocationTaskPage = React.lazy(
  () => import('modules/warehouse/pages/EditRelocationTaskPage'),
)

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
          element: <ProtectedRoute component={<WarehouseCatalogListPage />} />,
        },
        {
          path: WarehouseRouteEnum.WarehouseList,
          handle: {
            crumb: () => <Link to={WarehouseRouteEnum.WarehouseList}>Склады</Link>,
          },
          children: [
            {
              index: true,
              element: <ProtectedRoute component={<WarehouseListPage />} />,
            },
            {
              path: WarehouseRouteEnum.Warehouse,
              element: <ProtectedRoute component={<WarehousePage />} />,
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
              element: (
                <ProtectedRoute
                  component={<NomenclatureListPage />}
                  permitted={(user) => expectedPermissionsAllowed(user, ['NOMENCLATURES_READ'])}
                />
              ),
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
          element: <ProtectedRoute component={<ReserveCatalogListPage />} />,
        },
        {
          path: WarehouseRouteEnum.EquipmentNomenclatureList,
          element: (
            <ProtectedRoute
              component={<EquipmentPageLayout />}
              permitted={(user) => expectedPermissionsAllowed(user, ['EQUIPMENTS_READ'])}
            />
          ),
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
              element: (
                <ProtectedRoute
                  component={<RelocationTaskListPage />}
                  permitted={(user) => expectedPermissionsAllowed(user, ['RELOCATION_TASKS_READ'])}
                />
              ),
            },
            {
              path: WarehouseRouteEnum.CreateRelocationTask,
              element: (
                <ProtectedRoute
                  component={<CreateRelocationTaskPage />}
                  permitted={(user) =>
                    expectedPermissionsAllowed(user, [
                      'RELOCATION_TASKS_READ',
                      'RELOCATION_TASKS_CREATE',
                    ])
                  }
                />
              ),
              handle: { crumb: () => 'Создать заявку' },
            },
            {
              path: WarehouseRouteEnum.EditRelocationTask,
              element: (
                <ProtectedRoute
                  component={<EditRelocationTaskPage />}
                  permitted={(user) =>
                    expectedPermissionsAllowed(user, [
                      'RELOCATION_TASKS_READ',
                      'RELOCATION_TASKS_UPDATE',
                    ])
                  }
                />
              ),
              handle: { crumb: () => 'Редактировать заявку' },
            },
          ],
        },
      ],
    },
  ],
}
