import get from 'lodash/get'
import isEqual from 'lodash/isEqual'
import React from 'react'
import { Link, Navigate, RouteObject } from 'react-router-dom'

import ProtectedRoute from 'modules/auth/components/ProtectedRoute'
import { UserPermissionsEnum } from 'modules/user/constants'
import { hasPermissions } from 'modules/user/utils'
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
const CreateRelocationTaskSimplifiedPage = React.lazy(
  () => import('modules/warehouse/pages/CreateRelocationTaskSimplifiedPage'),
)
const EditRelocationTaskPage = React.lazy(
  () => import('modules/warehouse/pages/EditRelocationTaskPage'),
)

const ReportsCatalogPage = React.lazy(() => import('modules/warehouse/pages/ReportsCatalogPage'))

export const route: Readonly<RouteObject> = {
  path: WarehouseRouteEnum.ManageWarehouses,
  element: <ManageWarehousesLayout />,
  children: [
    {
      index: true,
      element: <Navigate to={WarehouseRouteEnum.WarehouseCatalogs} />,
    },
    {
      path: WarehouseRouteEnum.WarehouseCatalogs,
      handle: {
        crumb: () => <Link to={WarehouseRouteEnum.WarehouseCatalogs}>Справочники</Link>,
      },
      children: [
        {
          index: true,
          element: <ProtectedRoute component={<WarehouseCatalogListPage />} />,
        },
        {
          path: WarehouseRouteEnum.Warehouses,
          handle: {
            crumb: () => <Link to={WarehouseRouteEnum.Warehouses}>Склады</Link>,
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
                crumb: ({ qs }: BreadCrumbArgs) => qs.get('warehouseTitle'),
              },
            },
          ],
        },
        {
          path: WarehouseRouteEnum.Nomenclatures,
          handle: {
            crumb: () => <Link to={WarehouseRouteEnum.Nomenclatures}>Номенклатура</Link>,
          },
          children: [
            {
              index: true,
              element: (
                <ProtectedRoute
                  component={<NomenclatureListPage />}
                  permitted={(user) => hasPermissions(user, ['NOMENCLATURES_READ'])}
                />
              ),
            },
          ],
        },
      ],
    },
    {
      path: WarehouseRouteEnum.ReserveCatalogs,
      handle: {
        crumb: () => <Link to={WarehouseRouteEnum.ReserveCatalogs}>Управление запасами</Link>,
      },
      children: [
        {
          index: true,
          element: <ProtectedRoute component={<ReserveCatalogListPage />} />,
        },
        {
          path: WarehouseRouteEnum.EquipmentNomenclatures,
          element: (
            <ProtectedRoute
              component={<EquipmentPageLayout />}
              permitted={(user) => hasPermissions(user, ['EQUIPMENTS_READ'])}
            />
          ),
          handle: {
            crumb: () => <Link to={WarehouseRouteEnum.EquipmentNomenclatures}>Оборудование</Link>,
          },
          children: [
            {
              index: true,
              element: <EquipmentNomenclatureListPage />,
            },
            {
              path: WarehouseRouteEnum.Equipments,
              element: <EquipmentListPage />,
              handle: { crumb: ({ qs }: BreadCrumbArgs) => qs.get('equipmentNomenclatureTitle') },
            },
          ],
        },
        {
          path: WarehouseRouteEnum.RelocationTasks,
          handle: {
            crumb: () => (
              <Link to={WarehouseRouteEnum.RelocationTasks}>
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
                  permitted={(user) => hasPermissions(user, ['RELOCATION_TASKS_READ'])}
                />
              ),
            },
            {
              path: WarehouseRouteEnum.CreateRelocationTask,
              element: (
                <ProtectedRoute
                  component={<CreateRelocationTaskPage />}
                  permitted={(user) => hasPermissions(user, ['RELOCATION_TASKS_CREATE'])}
                />
              ),
              handle: { crumb: () => 'Создать заявку' },
            },
            {
              path: WarehouseRouteEnum.CreateRelocationTaskSimplified,
              element: (
                <ProtectedRoute
                  component={<CreateRelocationTaskSimplifiedPage />}
                  permitted={(user, locationState) =>
                    hasPermissions(user, ['RELOCATION_TASKS_CREATE']) &&
                    isEqual(get(locationState, 'task.assignee.id'), user.id)
                  }
                />
              ),
              handle: { crumb: () => 'Создать перемещение' },
            },
            {
              path: WarehouseRouteEnum.EditRelocationTask,
              element: (
                <ProtectedRoute
                  component={<EditRelocationTaskPage />}
                  permitted={(user) => hasPermissions(user, ['RELOCATION_TASKS_UPDATE'])}
                />
              ),
              handle: { crumb: () => 'Редактировать заявку' },
            },
          ],
        },
      ],
    },
    {
      path: WarehouseRouteEnum.Reports,
      handle: { crumb: () => <Link to={WarehouseRouteEnum.Reports}>Отчеты</Link> },
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute
              component={<ReportsCatalogPage />}
              permitted={(user) => hasPermissions(user, [UserPermissionsEnum.WarehouseReportsRead])}
            />
          ),
        },
      ],
    },
  ],
}
