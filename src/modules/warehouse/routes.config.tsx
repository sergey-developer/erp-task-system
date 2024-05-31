import get from 'lodash/get'
import React from 'react'
import { Navigate, RouteObject } from 'react-router-dom'

import ProtectedRoute from 'modules/auth/components/ProtectedRoute'
import { UserPermissionsEnum } from 'modules/user/constants'
import { userHasPermissions } from 'modules/user/utils'
import { WarehouseRouteEnum } from 'modules/warehouse/constants/routes'

import Breadcrumb from 'components/Breadcrumbs/Breadcrumb'
import BreadcrumbsLayout from 'components/Layouts/BreadcrumbsLayout '

import { BreadCrumbData } from 'shared/hooks/useBreadcrumbsMatches'

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

const EquipmentPageLayout = React.lazy(
  () => import('modules/warehouse/components/EquipmentPageLayout'),
)

const EquipmentListPage = React.lazy(() => import('modules/warehouse/pages/EquipmentListPage'))

const RelocationTasksPage = React.lazy(() => import('modules/warehouse/pages/RelocationTasksPage'))

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

const EmployeesActionsReportPage = React.lazy(
  () => import('modules/warehouse/pages/EmployeesActionsReportPage'),
)

const AmountEquipmentSpentReportPage = React.lazy(
  () => import('modules/warehouse/pages/AmountEquipmentSpentReportPage'),
)

const HistoryNomenclatureOperationsReportPage = React.lazy(
  () => import('modules/warehouse/pages/HistoryNomenclatureOperationsReportPage'),
)

const CreateDocumentsPackagePage = React.lazy(
  () => import('modules/warehouse/pages/CreateDocumentsPackagePage'),
)

const InventorizationsPage = React.lazy(
  () => import('modules/warehouse/pages/InventorizationsPage'),
)

export const route: Readonly<RouteObject> = {
  path: WarehouseRouteEnum.ManageWarehouses,
  element: <BreadcrumbsLayout />,
  children: [
    {
      index: true,
      element: <Navigate to={WarehouseRouteEnum.WarehouseCatalogs} />,
    },
    {
      path: WarehouseRouteEnum.CreateDocumentsPackage,
      element: <ProtectedRoute component={<CreateDocumentsPackagePage />} />,
    },
    {
      path: WarehouseRouteEnum.WarehouseCatalogs,
      handle: {
        crumb: () => <Breadcrumb link={WarehouseRouteEnum.WarehouseCatalogs} text='Справочники' />,
      },
      children: [
        {
          index: true,
          element: <ProtectedRoute component={<WarehouseCatalogListPage />} />,
        },
        {
          path: WarehouseRouteEnum.Warehouses,
          handle: {
            crumb: () => <Breadcrumb link={WarehouseRouteEnum.Warehouses} text='Склады' />,
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
                crumb: ({ qs }: BreadCrumbData) => (
                  <Breadcrumb
                    link={WarehouseRouteEnum.Warehouse}
                    text={qs.get('warehouseTitle') || ''}
                  />
                ),
              },
            },
          ],
        },
        {
          path: WarehouseRouteEnum.Nomenclatures,
          handle: {
            crumb: () => <Breadcrumb link={WarehouseRouteEnum.Nomenclatures} text='Номенклатура' />,
          },
          children: [
            {
              index: true,
              element: (
                <ProtectedRoute
                  component={<NomenclatureListPage />}
                  permitted={(user) =>
                    userHasPermissions(user, [UserPermissionsEnum.NomenclaturesRead])
                  }
                />
              ),
            },
          ],
        },
      ],
    },
    {
      path: WarehouseRouteEnum.Reserves,
      handle: {
        crumb: () => <Breadcrumb link={WarehouseRouteEnum.Reserves} text='Управление запасами' />,
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
              permitted={(user) => userHasPermissions(user, [UserPermissionsEnum.EquipmentsRead])}
            />
          ),
          handle: {
            crumb: () => (
              <Breadcrumb link={WarehouseRouteEnum.EquipmentNomenclatures} text='Оборудование' />
            ),
          },
          children: [
            {
              index: true,
              element: <EquipmentNomenclatureListPage />,
            },
            {
              path: WarehouseRouteEnum.Equipments,
              element: <EquipmentListPage />,
              handle: {
                crumb: ({ qs }: BreadCrumbData) => (
                  <Breadcrumb link={WarehouseRouteEnum.Equipments} text={qs.get('title') || ''} />
                ),
              },
            },
          ],
        },
        {
          path: WarehouseRouteEnum.RelocationTasks,
          handle: {
            crumb: () => (
              <Breadcrumb
                link={WarehouseRouteEnum.RelocationTasks}
                text='Заявки на перемещение оборудования'
              />
            ),
          },
          children: [
            {
              index: true,
              element: (
                <ProtectedRoute
                  component={<RelocationTasksPage />}
                  permitted={(user) =>
                    userHasPermissions(user, [UserPermissionsEnum.RelocationTasksRead])
                  }
                />
              ),
            },
            {
              path: WarehouseRouteEnum.CreateRelocationTask,
              element: (
                <ProtectedRoute
                  component={<CreateRelocationTaskPage />}
                  permitted={(user) =>
                    userHasPermissions(user, [UserPermissionsEnum.RelocationTasksCreate])
                  }
                />
              ),
              handle: {
                crumb: () => (
                  <Breadcrumb
                    link={WarehouseRouteEnum.CreateRelocationTask}
                    text='Создать заявку'
                  />
                ),
              },
            },
            {
              path: WarehouseRouteEnum.CreateRelocationTaskSimplified,
              element: (
                <ProtectedRoute
                  component={<CreateRelocationTaskSimplifiedPage />}
                  permitted={(user, locationState) =>
                    userHasPermissions(user, [UserPermissionsEnum.RelocationTasksCreate]) &&
                    get(locationState, 'task.assignee')
                  }
                />
              ),
              handle: {
                crumb: () => (
                  <Breadcrumb
                    link={WarehouseRouteEnum.CreateRelocationTaskSimplified}
                    text='Создать перемещение'
                  />
                ),
              },
            },
            {
              path: WarehouseRouteEnum.EditRelocationTask,
              element: (
                <ProtectedRoute
                  component={<EditRelocationTaskPage />}
                  permitted={(user) =>
                    userHasPermissions(user, [UserPermissionsEnum.RelocationTasksUpdate])
                  }
                />
              ),
              handle: {
                crumb: () => (
                  <Breadcrumb
                    link={WarehouseRouteEnum.EditRelocationTask}
                    text='Редактировать заявку'
                  />
                ),
              },
            },
          ],
        },
        {
          path: WarehouseRouteEnum.Inventorizations,
          handle: {
            crumb: () => (
              <Breadcrumb link={WarehouseRouteEnum.Inventorizations} text='Инвентаризация' />
            ),
          },
          children: [
            {
              index: true,
              element: (
                <ProtectedRoute
                  component={<InventorizationsPage />}
                  permitted={(user) =>
                    userHasPermissions(user, [UserPermissionsEnum.InventorizationRead])
                  }
                />
              ),
            },
          ],
        },
      ],
    },
    {
      path: WarehouseRouteEnum.Reports,
      handle: { crumb: () => <Breadcrumb link={WarehouseRouteEnum.Reports} text='Отчёты' /> },
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute
              component={<ReportsCatalogPage />}
              permitted={(user) =>
                userHasPermissions(user, [UserPermissionsEnum.WarehouseReportsRead])
              }
            />
          ),
        },
        {
          path: WarehouseRouteEnum.EmployeesActions,
          element: (
            <ProtectedRoute
              component={<EmployeesActionsReportPage />}
              permitted={(user) =>
                userHasPermissions(user, [UserPermissionsEnum.WarehouseReportsRead])
              }
            />
          ),
          handle: {
            crumb: () => (
              <Breadcrumb link={WarehouseRouteEnum.EmployeesActions} text='Действия сотрудников' />
            ),
          },
        },
        {
          path: WarehouseRouteEnum.AmountEquipmentSpent,
          element: (
            <ProtectedRoute
              component={<AmountEquipmentSpentReportPage />}
              permitted={(user) =>
                userHasPermissions(user, [UserPermissionsEnum.WarehouseReportsRead])
              }
            />
          ),
          handle: {
            crumb: () => (
              <Breadcrumb
                link={WarehouseRouteEnum.AmountEquipmentSpent}
                text='Количество потраченного оборудования'
              />
            ),
          },
        },
        {
          path: WarehouseRouteEnum.HistoryNomenclatureOperations,
          element: (
            <ProtectedRoute
              component={<HistoryNomenclatureOperationsReportPage />}
              permitted={(user) =>
                userHasPermissions(user, [UserPermissionsEnum.WarehouseReportsRead])
              }
            />
          ),
          handle: {
            crumb: () => (
              <Breadcrumb
                link={WarehouseRouteEnum.HistoryNomenclatureOperations}
                text='История операций по номенклатуре'
              />
            ),
          },
        },
      ],
    },
  ],
}
