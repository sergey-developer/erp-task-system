import ProtectedRoute from 'features/auth/components/ProtectedRoute'
import {
  checkInventorizationStatusIsInProgress,
  checkInventorizationStatusIsNew,
} from 'features/inventorizations/helpers'
import { ExecuteInventorizationPageLocationState } from 'features/inventorizations/types'
import { RelocationTaskStatusEnum } from 'features/relocationTasks/api/constants'
import {
  CreateRelocationTaskDraftPageLocationState,
  EditRelocationTaskDraftPageLocationState,
} from 'features/relocationTasks/types'
import { UserPermissionsEnum } from 'features/users/api/constants'
import { userHasPermissions } from 'features/users/helpers'
import { WarehousesRoutesEnum } from 'features/warehouses/routes/routes'
import get from 'lodash/get'
import React from 'react'
import { Navigate, RouteObject } from 'react-router-dom'

import Breadcrumb from 'components/Breadcrumbs/Breadcrumb'
import BreadcrumbsLayout from 'components/Layouts/BreadcrumbsLayout '

import { BreadCrumbData } from 'shared/hooks/useBreadcrumbsMatches'

const WarehousesCatalogPage = React.lazy(
  () => import('features/warehouses/pages/WarehousesCatalogPage'),
)

const WarehousesPage = React.lazy(() => import('features/warehouses/pages/WarehousesPage'))

const WarehousePage = React.lazy(() => import('features/warehouses/pages/WarehousePage'))

const NomenclaturesPage = React.lazy(() => import('features/nomenclatures/pages/NomenclaturesPage'))

const ReservesCatalogPage = React.lazy(() => import('features/warehouses/pages/ReservesCatalogPage'))

const EquipmentNomenclaturesPage = React.lazy(
  () => import('features/nomenclatures/pages/EquipmentNomenclaturesPage'),
)

const EquipmentPageLayout = React.lazy(
  () => import('features/equipments/components/EquipmentPageLayout'),
)

const EquipmentsPage = React.lazy(() => import('features/equipments/pages/EquipmentsPage'))

const RelocationTasksPage = React.lazy(
  () => import('features/relocationTasks/pages/RelocationTasksPage'),
)

const CreateRelocationTaskPage = React.lazy(
  () => import('features/relocationTasks/pages/CreateRelocationTaskPage'),
)

const CreateRelocationTaskDraftPage = React.lazy(
  () => import('features/relocationTasks/pages/CreateRelocationTaskDraftPage'),
)

const EditRelocationTaskDraftPage = React.lazy(
  () => import('features/relocationTasks/pages/EditRelocationTaskDraftPage'),
)

const CreateRelocationTaskSimplifiedPage = React.lazy(
  () => import('features/relocationTasks/pages/CreateRelocationTaskSimplifiedPage'),
)

const EditRelocationTaskPage = React.lazy(
  () => import('features/relocationTasks/pages/EditRelocationTaskPage'),
)

const ReportsCatalogPage = React.lazy(() => import('features/reports/pages/ReportsCatalogPage'))

const EmployeesActionsReportPage = React.lazy(
  () => import('features/reports/pages/EmployeesActionsReportPage'),
)

const AmountEquipmentSpentReportPage = React.lazy(
  () => import('features/reports/pages/AmountEquipmentSpentReportPage'),
)

const HistoryNomenclatureOperationsReportPage = React.lazy(
  () => import('features/reports/pages/HistoryNomenclatureOperationsReportPage'),
)

const CreateDocumentsPackagePage = React.lazy(
  () => import('features/warehouses/pages/CreateDocumentsPackagePage'),
)

const InventorizationsPage = React.lazy(
  () => import('features/inventorizations/pages/InventorizationsPage'),
)

const ExecuteInventorizationPage = React.lazy(
  () => import('features/inventorizations/pages/ExecuteInventorizationPage'),
)

export const warehousesRoutes: Readonly<RouteObject> = {
  path: WarehousesRoutesEnum.ManageWarehouses,
  element: <BreadcrumbsLayout />,
  children: [
    {
      index: true,
      element: <Navigate to={WarehousesRoutesEnum.WarehousesCatalog} />,
    },
    {
      path: WarehousesRoutesEnum.CreateDocumentsPackage,
      element: <ProtectedRoute component={<CreateDocumentsPackagePage />} />,
    },
    {
      path: WarehousesRoutesEnum.WarehousesCatalog,
      handle: {
        crumb: () => (
          <Breadcrumb link={WarehousesRoutesEnum.WarehousesCatalog} text='Справочники' />
        ),
      },
      children: [
        {
          index: true,
          element: <ProtectedRoute component={<WarehousesCatalogPage />} />,
        },
        {
          path: WarehousesRoutesEnum.Warehouses,
          handle: {
            crumb: () => <Breadcrumb link={WarehousesRoutesEnum.Warehouses} text='Склады' />,
          },
          children: [
            {
              index: true,
              element: <ProtectedRoute component={<WarehousesPage />} />,
            },
            {
              path: WarehousesRoutesEnum.Warehouse,
              element: <ProtectedRoute component={<WarehousePage />} />,
              handle: {
                crumb: ({ qs }: BreadCrumbData) => (
                  <Breadcrumb
                    link={WarehousesRoutesEnum.Warehouse}
                    text={qs.get('warehouseTitle') || ''}
                  />
                ),
              },
            },
          ],
        },
        {
          path: WarehousesRoutesEnum.Nomenclatures,
          handle: {
            crumb: () => (
              <Breadcrumb link={WarehousesRoutesEnum.Nomenclatures} text='Номенклатура' />
            ),
          },
          children: [
            {
              index: true,
              element: (
                <ProtectedRoute
                  component={<NomenclaturesPage />}
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
      path: WarehousesRoutesEnum.Reserves,
      handle: {
        crumb: () => <Breadcrumb link={WarehousesRoutesEnum.Reserves} text='Управление запасами' />,
      },
      children: [
        {
          index: true,
          element: <ProtectedRoute component={<ReservesCatalogPage />} />,
        },
        {
          path: WarehousesRoutesEnum.EquipmentNomenclatures,
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
              <Breadcrumb link={WarehousesRoutesEnum.EquipmentNomenclatures} text='Оборудование' />
            ),
          },
          children: [
            {
              index: true,
              element: <EquipmentNomenclaturesPage />,
            },
            {
              path: WarehousesRoutesEnum.Equipments,
              element: <EquipmentsPage />,
              handle: {
                crumb: ({ qs }: BreadCrumbData) => (
                  <Breadcrumb link={WarehousesRoutesEnum.Equipments} text={qs.get('title') || ''} />
                ),
              },
            },
          ],
        },
        {
          path: WarehousesRoutesEnum.RelocationTasks,
          handle: {
            crumb: () => (
              <Breadcrumb
                link={WarehousesRoutesEnum.RelocationTasks}
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
              path: WarehousesRoutesEnum.CreateRelocationTask,
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
                    link={WarehousesRoutesEnum.CreateRelocationTask}
                    text='Создать заявку'
                  />
                ),
              },
            },
            {
              path: WarehousesRoutesEnum.CreateRelocationTaskSimplified,
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
                    link={WarehousesRoutesEnum.CreateRelocationTaskSimplified}
                    text='Создать перемещение'
                  />
                ),
              },
            },
            {
              path: WarehousesRoutesEnum.EditRelocationTask,
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
                    link={WarehousesRoutesEnum.EditRelocationTask}
                    text='Редактировать заявку'
                  />
                ),
              },
            },
          ],
        },
        {
          path: WarehousesRoutesEnum.Inventorizations,
          handle: {
            crumb: () => (
              <Breadcrumb link={WarehousesRoutesEnum.Inventorizations} text='Инвентаризация' />
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
              path: WarehousesRoutesEnum.ExecuteInventorization,
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
              path: WarehousesRoutesEnum.CreateRelocationTaskDraft,
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
              path: WarehousesRoutesEnum.EditRelocationTaskDraft,
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
      path: WarehousesRoutesEnum.Reports,
      handle: { crumb: () => <Breadcrumb link={WarehousesRoutesEnum.Reports} text='Отчёты' /> },
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
          path: WarehousesRoutesEnum.EmployeesActions,
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
              <Breadcrumb
                link={WarehousesRoutesEnum.EmployeesActions}
                text='Действия сотрудников'
              />
            ),
          },
        },
        {
          path: WarehousesRoutesEnum.AmountEquipmentSpent,
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
                link={WarehousesRoutesEnum.AmountEquipmentSpent}
                text='Количество потраченного оборудования'
              />
            ),
          },
        },
        {
          path: WarehousesRoutesEnum.HistoryNomenclatureOperations,
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
                link={WarehousesRoutesEnum.HistoryNomenclatureOperations}
                text='История операций по номенклатуре'
              />
            ),
          },
        },
      ],
    },
  ],
}
