import InventorizationsPage from 'features/inventorizations/pages/InventorizationsPage'
import EquipmentNomenclaturesPage from 'features/nomenclatures/pages/EquipmentNomenclaturesPage'
import RelocationTasksPage from 'features/relocationTasks/pages/RelocationTasksPage'
import { UserPermissionsEnum } from 'features/users/api/constants'
import { WarehouseRouteEnum } from 'features/warehouse/constants/routes'
import React from 'react'

import { equipmentNomenclatureListPageTestUtils } from '_tests_/features/warehouse/pages/EquipmentNomenclaturesPage/testUtils'
import { inventorizationsPageTestUtils } from '_tests_/features/warehouse/pages/InventorizationsPage/testUtils'
import { relocationTasksPageTestUtils } from '_tests_/features/warehouse/pages/RelocationTasksPage/testUtils'
import { reserveCatalogListPageTestUtils } from '_tests_/features/warehouse/pages/ReserveCatalogListPage/testUtils'
import userFixtures from '_tests_/fixtures/user'
import {
  mockGetEquipmentNomenclaturesSuccess,
  mockGetInventorizationsSuccess,
  mockGetRelocationTasksSuccess,
} from '_tests_/mocks/api'
import { getUserMeQueryMock } from '_tests_/mocks/state/user'
import { getStoreWithAuth, renderWithRouter } from '_tests_/utils'

import ReserveCatalogListPage from './index'

describe('Страница списка справочников запасов', () => {
  describe('Оборудование', () => {
    test('Отображается если есть права', async () => {
      renderWithRouter(
        [
          {
            path: WarehouseRouteEnum.Reserves,
            element: <ReserveCatalogListPage />,
          },
        ],
        { initialEntries: [WarehouseRouteEnum.Reserves], initialIndex: 0 },
        {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.EquipmentsRead] }),
            },
          }),
        },
      )

      const link = reserveCatalogListPageTestUtils.getEquipmentLink()

      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', WarehouseRouteEnum.EquipmentNomenclatures)
    })

    test('Не отображается если нет прав', async () => {
      renderWithRouter(
        [
          {
            path: WarehouseRouteEnum.Reserves,
            element: <ReserveCatalogListPage />,
          },
        ],
        { initialEntries: [WarehouseRouteEnum.Reserves], initialIndex: 0 },
        {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        },
      )

      const link = reserveCatalogListPageTestUtils.queryEquipmentLink()
      expect(link).not.toBeInTheDocument()
    })

    test('При клике переходит на страницу списка номенклатуры оборудования', async () => {
      mockGetEquipmentNomenclaturesSuccess()

      const { user } = renderWithRouter(
        [
          {
            path: WarehouseRouteEnum.Reserves,
            element: <ReserveCatalogListPage />,
          },
          {
            path: WarehouseRouteEnum.EquipmentNomenclatures,
            element: <EquipmentNomenclaturesPage />,
          },
        ],
        { initialEntries: [WarehouseRouteEnum.Reserves], initialIndex: 0 },
        {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.EquipmentsRead] }),
            },
          }),
        },
      )

      await reserveCatalogListPageTestUtils.clickEquipmentLink(user)
      const page = equipmentNomenclatureListPageTestUtils.getContainer()

      expect(page).toBeInTheDocument()
    })
  })

  describe('Заявки на перемещение оборудования', () => {
    test('Отображается если есть права', async () => {
      renderWithRouter(
        [
          {
            path: WarehouseRouteEnum.Reserves,
            element: <ReserveCatalogListPage />,
          },
        ],
        { initialEntries: [WarehouseRouteEnum.Reserves], initialIndex: 0 },
        {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.RelocationTasksRead] }),
            },
          }),
        },
      )

      const link = reserveCatalogListPageTestUtils.getRelocationTasksLink()

      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', WarehouseRouteEnum.RelocationTasks)
    })

    test('Не отображается если нет прав', async () => {
      renderWithRouter(
        [
          {
            path: WarehouseRouteEnum.Reserves,
            element: <ReserveCatalogListPage />,
          },
        ],
        { initialEntries: [WarehouseRouteEnum.Reserves], initialIndex: 0 },
        {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        },
      )

      const link = reserveCatalogListPageTestUtils.queryRelocationTasksLink()
      expect(link).not.toBeInTheDocument()
    })

    test('При клике переходит на страницу списка заявок на перемещение', async () => {
      mockGetRelocationTasksSuccess()

      const { user } = renderWithRouter(
        [
          {
            path: WarehouseRouteEnum.Reserves,
            element: <ReserveCatalogListPage />,
          },
          {
            path: WarehouseRouteEnum.RelocationTasks,
            element: <RelocationTasksPage />,
          },
        ],
        { initialEntries: [WarehouseRouteEnum.Reserves], initialIndex: 0 },
        {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.RelocationTasksRead] }),
            },
          }),
        },
      )

      await reserveCatalogListPageTestUtils.clickRelocationTasksLink(user)
      const page = relocationTasksPageTestUtils.getContainer()

      expect(page).toBeInTheDocument()
    })
  })

  describe('Инвентаризация', () => {
    test('Отображается если есть права', async () => {
      renderWithRouter(
        [
          {
            path: WarehouseRouteEnum.Reserves,
            element: <ReserveCatalogListPage />,
          },
        ],
        { initialEntries: [WarehouseRouteEnum.Reserves], initialIndex: 0 },
        {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.InventorizationRead] }),
            },
          }),
        },
      )

      const link = reserveCatalogListPageTestUtils.getInventorizationsLink()

      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', WarehouseRouteEnum.Inventorizations)
    })

    test('Не отображается если нет прав', async () => {
      renderWithRouter(
        [
          {
            path: WarehouseRouteEnum.Reserves,
            element: <ReserveCatalogListPage />,
          },
        ],
        { initialEntries: [WarehouseRouteEnum.Reserves], initialIndex: 0 },
        {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        },
      )

      const link = reserveCatalogListPageTestUtils.queryInventorizationsLink()
      expect(link).not.toBeInTheDocument()
    })

    test('При клике переходит на страницу списка инвентаризаций', async () => {
      mockGetInventorizationsSuccess()

      const { user } = renderWithRouter(
        [
          {
            path: WarehouseRouteEnum.Reserves,
            element: <ReserveCatalogListPage />,
          },
          {
            path: WarehouseRouteEnum.Inventorizations,
            element: <InventorizationsPage />,
          },
        ],
        { initialEntries: [WarehouseRouteEnum.Reserves], initialIndex: 0 },
        {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.InventorizationRead] }),
            },
          }),
        },
      )

      await reserveCatalogListPageTestUtils.clickInventorizationsLink(user)
      const page = inventorizationsPageTestUtils.getContainer()

      expect(page).toBeInTheDocument()
    })
  })
})
