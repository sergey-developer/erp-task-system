import ProtectedRoute from 'features/auth/components/ProtectedRoute'
import { UserPermissionsEnum } from 'features/users/api/constants'
import { userHasPermissions } from 'features/users/helpers'
import { WarehouseRouteEnum } from 'features/warehouse/constants/routes'
import {
  CreateRelocationTaskDraftPageLocationState,
  EditRelocationTaskDraftPageLocationState,
  ExecuteInventorizationPageLocationState,
} from 'features/warehouse/types'
import {
  checkInventorizationStatusIsInProgress,
  checkInventorizationStatusIsNew,
} from 'features/warehouse/utils/inventorization'
import get from 'lodash/get'
import React from 'react'
import { Navigate, RouteObject } from 'react-router-dom'

import Breadcrumb from 'components/Breadcrumbs/Breadcrumb'
import BreadcrumbsLayout from 'components/Layouts/BreadcrumbsLayout '

import { BreadCrumbData } from 'shared/hooks/useBreadcrumbsMatches'

import { RelocationTaskStatusEnum } from './constants/relocationTask'

const WarehouseCatalogListPage = React.lazy(
  () => import('features/warehouse/pages/WarehouseCatalogListPage'),
)

const WarehouseListPage = React.lazy(() => import('features/warehouse/pages/WarehouseListPage'))

const WarehousePage = React.lazy(() => import('features/warehouse/pages/WarehousePage'))

const NomenclatureListPage = React.lazy(
  () => import('features/warehouse/pages/NomenclatureListPage'),
)

const ReserveCatalogListPage = React.lazy(
  () => import('features/warehouse/pages/ReserveCatalogListPage'),
)

const EquipmentNomenclatureListPage = React.lazy(
  () => import('features/warehouse/pages/EquipmentNomenclatureListPage'),
)

const EquipmentPageLayout = React.lazy(
  () => import('features/warehouse/components/EquipmentPageLayout'),
)

const EquipmentListPage = React.lazy(() => import('features/warehouse/pages/EquipmentListPage'))

const RelocationTasksPage = React.lazy(() => import('features/warehouse/pages/RelocationTasksPage'))

const CreateRelocationTaskPage = React.lazy(
  () => import('features/warehouse/pages/CreateRelocationTaskPage'),
)

const CreateRelocationTaskDraftPage = React.lazy(
  () => import('features/warehouse/pages/CreateRelocationTaskDraftPage'),
)

const EditRelocationTaskDraftPage = React.lazy(
  () => import('features/warehouse/pages/EditRelocationTaskDraftPage'),
)

const CreateRelocationTaskSimplifiedPage = React.lazy(
  () => import('features/warehouse/pages/CreateRelocationTaskSimplifiedPage'),
)

const EditRelocationTaskPage = React.lazy(
  () => import('features/warehouse/pages/EditRelocationTaskPage'),
)

const ReportsCatalogPage = React.lazy(() => import('features/warehouse/pages/ReportsCatalogPage'))

const EmployeesActionsReportPage = React.lazy(
  () => import('features/warehouse/pages/EmployeesActionsReportPage'),
)

const AmountEquipmentSpentReportPage = React.lazy(
  () => import('features/warehouse/pages/AmountEquipmentSpentReportPage'),
)

const HistoryNomenclatureOperationsReportPage = React.lazy(
  () => import('features/warehouse/pages/HistoryNomenclatureOperationsReportPage'),
)

const CreateDocumentsPackagePage = React.lazy(
  () => import('features/warehouse/pages/CreateDocumentsPackagePage'),
)

const InventorizationsPage = React.lazy(
  () => import('features/warehouse/pages/InventorizationsPage'),
)

const ExecuteInventorizationPage = React.lazy(
  () => import('features/warehouse/pages/ExecuteInventorizationPage'),
)

export const warehousesRoutes: Readonly<RouteObject> = {
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
                  permitted={(currentUser) =>
                    userHasPermissions(currentUser, [UserPermissionsEnum.NomenclaturesRead])
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
              permitted={(currentUser) =>
                userHasPermissions(currentUser, [UserPermissionsEnum.EquipmentsRead])
              }
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
                  permitted={(currentUser) =>
                    userHasPermissions(currentUser, [UserPermissionsEnum.RelocationTasksRead])
                  }
                />
              ),
            },
            {
              path: WarehouseRouteEnum.CreateRelocationTask,
              element: (
                <ProtectedRoute
                  component={<CreateRelocationTaskPage />}
                  permitted={(currentUser) =>
                    userHasPermissions(currentUser, [UserPermissionsEnum.RelocationTasksCreate])
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
                  permitted={(currentUser, locationState) =>
                    userHasPermissions(currentUser, [UserPermissionsEnum.RelocationTasksCreate]) &&
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
                  permitted={(currentUser) =>
                    userHasPermissions(currentUser, [UserPermissionsEnum.RelocationTasksUpdate])
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
                  permitted={(currentUser) =>
                    userHasPermissions(currentUser, [UserPermissionsEnum.InventorizationRead])
                  }
                />
              ),
            },
            {
              path: WarehouseRouteEnum.ExecuteInventorization,
              element: (
                // todo: сделать в других местах также где используется locationState
                <ProtectedRoute<ExecuteInventorizationPageLocationState>
                  component={<ExecuteInventorizationPage />}
                  permitted={(currentUser, locationState) =>
                    userHasPermissions(currentUser, [UserPermissionsEnum.InventorizationUpdate]) &&
                    !!locationState &&
                    locationState.inventorization?.executor.id === currentUser.id &&
                    (checkInventorizationStatusIsNew(locationState.inventorization?.status) ||
                      checkInventorizationStatusIsInProgress(locationState.inventorization?.status))
                  }
                />
              ),
              handle: {
                crumb: ({ match }: BreadCrumbData) => (
                  <Breadcrumb link={match.pathname} text='Проведение инвентаризации' />
                ),
              },
            },
            {
              path: WarehouseRouteEnum.CreateRelocationTaskDraft,
              element: (
                <ProtectedRoute<CreateRelocationTaskDraftPageLocationState>
                  component={<CreateRelocationTaskDraftPage />}
                  permitted={(currentUser, locationState) =>
                    userHasPermissions(currentUser, [UserPermissionsEnum.InventorizationUpdate]) &&
                    !!locationState &&
                    locationState.inventorization.executor.id === currentUser.id &&
                    (checkInventorizationStatusIsNew(locationState.inventorization.status) ||
                      checkInventorizationStatusIsInProgress(locationState.inventorization.status))
                  }
                />
              ),
              handle: {
                crumb: ({ match }: BreadCrumbData) => (
                  <Breadcrumb link={match.pathname} text='Создать черновик заявки на перемещение' />
                ),
              },
            },
            {
              path: WarehouseRouteEnum.EditRelocationTaskDraft,
              element: (
                <ProtectedRoute<EditRelocationTaskDraftPageLocationState>
                  component={<EditRelocationTaskDraftPage />}
                  permitted={(currentUser, locationState) =>
                    userHasPermissions(currentUser, [
                      UserPermissionsEnum.InventorizationUpdate,
                      UserPermissionsEnum.RelocationTasksUpdate,
                    ]) &&
                    !!locationState &&
                    locationState.inventorization.executor.id === currentUser.id &&
                    locationState.relocationTask.status === RelocationTaskStatusEnum.Draft
                  }
                />
              ),
              handle: {
                crumb: ({ match }: BreadCrumbData) => (
                  <Breadcrumb
                    link={match.pathname}
                    text='Изменить черновик заявки на перемещение'
                  />
                ),
              },
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
