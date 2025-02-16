import InventorizationsPage from 'features/inventorizations/pages/InventorizationsPage'
import EquipmentNomenclaturesPage from 'features/nomenclatures/pages/EquipmentNomenclaturesPage'
import RelocationTasksPage from 'features/relocationTasks/pages/RelocationTasksPage'
import { UserPermissionsEnum } from 'features/users/api/constants'
import { WarehousesRoutesEnum } from 'features/warehouses/routes/routes'
import React from 'react'

import { equipmentNomenclatureListPageTestUtils } from '_tests_/features/warehouses/pages/EquipmentNomenclatureListPage/testUtils'
import { inventorizationsPageTestUtils } from '_tests_/features/warehouses/pages/InventorizationsPage/testUtils'
import { relocationTasksPageTestUtils } from '_tests_/features/warehouses/pages/RelocationTasksPage/testUtils'
import { reserveCatalogListPageTestUtils } from '_tests_/features/warehouses/pages/ReserveCatalogListPage/testUtils'
import userFixtures from '_tests_/fixtures/users'
import { getStoreWithAuth, renderWithRouter } from '_tests_/helpers'
import {
  mockGetEquipmentNomenclaturesSuccess,
  mockGetInventorizationsSuccess,
  mockGetRelocationTasksSuccess,
} from '_tests_/mocks/api'
import { getUserMeQueryMock } from '_tests_/mocks/store/users'

import ReservesCatalogPage from './index'

describe('Страница списка справочников запасов', () => {
  describe('Оборудование', () => {
    test('Отображается если есть права', async () => {
      renderWithRouter(
        [
          {
            path: WarehousesRoutesEnum.Reserves,
            element: <ReservesCatalogPage />,
          },
        ],
        { initialEntries: [WarehousesRoutesEnum.Reserves], initialIndex: 0 },
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
      expect(link).toHaveAttribute('href', WarehousesRoutesEnum.EquipmentNomenclatures)
    })

    test('Не отображается если нет прав', async () => {
      renderWithRouter(
        [
          {
            path: WarehousesRoutesEnum.Reserves,
            element: <ReservesCatalogPage />,
          },
        ],
        { initialEntries: [WarehousesRoutesEnum.Reserves], initialIndex: 0 },
        {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
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
            path: WarehousesRoutesEnum.Reserves,
            element: <ReservesCatalogPage />,
          },
          {
            path: WarehousesRoutesEnum.EquipmentNomenclatures,
            element: <EquipmentNomenclaturesPage />,
          },
        ],
        { initialEntries: [WarehousesRoutesEnum.Reserves], initialIndex: 0 },
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
            path: WarehousesRoutesEnum.Reserves,
            element: <ReservesCatalogPage />,
          },
        ],
        { initialEntries: [WarehousesRoutesEnum.Reserves], initialIndex: 0 },
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
      expect(link).toHaveAttribute('href', WarehousesRoutesEnum.RelocationTasks)
    })

    test('Не отображается если нет прав', async () => {
      renderWithRouter(
        [
          {
            path: WarehousesRoutesEnum.Reserves,
            element: <ReservesCatalogPage />,
          },
        ],
        { initialEntries: [WarehousesRoutesEnum.Reserves], initialIndex: 0 },
        {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
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
            path: WarehousesRoutesEnum.Reserves,
            element: <ReservesCatalogPage />,
          },
          {
            path: WarehousesRoutesEnum.RelocationTasks,
            element: <RelocationTasksPage />,
          },
        ],
        { initialEntries: [WarehousesRoutesEnum.Reserves], initialIndex: 0 },
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
            path: WarehousesRoutesEnum.Reserves,
            element: <ReservesCatalogPage />,
          },
        ],
        { initialEntries: [WarehousesRoutesEnum.Reserves], initialIndex: 0 },
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
      expect(link).toHaveAttribute('href', WarehousesRoutesEnum.Inventorizations)
    })

    test('Не отображается если нет прав', async () => {
      renderWithRouter(
        [
          {
            path: WarehousesRoutesEnum.Reserves,
            element: <ReservesCatalogPage />,
          },
        ],
        { initialEntries: [WarehousesRoutesEnum.Reserves], initialIndex: 0 },
        {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
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
            path: WarehousesRoutesEnum.Reserves,
            element: <ReservesCatalogPage />,
          },
          {
            path: WarehousesRoutesEnum.Inventorizations,
            element: <InventorizationsPage />,
          },
        ],
        { initialEntries: [WarehousesRoutesEnum.Reserves], initialIndex: 0 },
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
