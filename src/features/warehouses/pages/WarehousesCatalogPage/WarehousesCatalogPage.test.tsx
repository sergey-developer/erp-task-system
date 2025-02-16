import NomenclaturesPage from 'features/nomenclatures/pages/NomenclaturesPage'
import { UserPermissionsEnum } from 'features/users/api/constants'
import { WarehousesRoutesEnum } from 'features/warehouses/routes/routes'
import React from 'react'

import { nomenclatureListPageTestUtils } from '_tests_/features/warehouses/pages/NomenclatureListPage/testUtils'
import { warehouseCatalogListPageTestUtils } from '_tests_/features/warehouses/pages/WarehouseCatalogListPage/testUtils'
import { warehouseListPageTestUtils } from '_tests_/features/warehouses/pages/WarehouseListPage/testUtils'
import userFixtures from '_tests_/fixtures/users'
import { getStoreWithAuth, renderWithRouter } from '_tests_/helpers'
import {
  mockGetNomenclatureGroupsSuccess,
  mockGetNomenclaturesSuccess,
  mockGetWarehousesSuccess,
} from '_tests_/mocks/api'
import { getUserMeQueryMock } from '_tests_/mocks/store/users'

import WarehousesPage from '../WarehousesPage'
import WarehousesCatalogPage from './index'

describe('Страница списка справочников складов', () => {
  describe('Элемент "Склады"', () => {
    test('Отображается корректно', async () => {
      renderWithRouter(
        [
          {
            path: WarehousesRoutesEnum.WarehousesCatalog,
            element: <WarehousesCatalogPage />,
          },
        ],
        { initialEntries: [WarehousesRoutesEnum.WarehousesCatalog], initialIndex: 0 },
        {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
          }),
        },
      )

      const link = warehouseCatalogListPageTestUtils.getWarehouseLink()

      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', WarehousesRoutesEnum.Warehouses)
    })

    test('При клике переходит на страницу складов', async () => {
      mockGetWarehousesSuccess()

      const { user } = renderWithRouter(
        [
          {
            path: WarehousesRoutesEnum.WarehousesCatalog,
            element: <WarehousesCatalogPage />,
          },
          {
            path: WarehousesRoutesEnum.Warehouses,
            element: <WarehousesPage />,
          },
        ],
        { initialEntries: [WarehousesRoutesEnum.WarehousesCatalog], initialIndex: 0 },
        {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
          }),
        },
      )

      await warehouseCatalogListPageTestUtils.clickWarehouseLink(user)
      const page = warehouseListPageTestUtils.getContainer()

      expect(page).toBeInTheDocument()
    })
  })

  describe('Элемент "Номенклатура"', () => {
    test('Отображается если есть права', async () => {
      renderWithRouter(
        [
          {
            path: WarehousesRoutesEnum.WarehousesCatalog,
            element: <WarehousesCatalogPage />,
          },
        ],
        { initialEntries: [WarehousesRoutesEnum.WarehousesCatalog], initialIndex: 0 },
        {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.NomenclaturesRead] }),
            },
          }),
        },
      )

      const link = warehouseCatalogListPageTestUtils.getNomenclatureLink()

      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', WarehousesRoutesEnum.Nomenclatures)
    })

    test('Не отображается если нет прав', async () => {
      renderWithRouter(
        [
          {
            path: WarehousesRoutesEnum.WarehousesCatalog,
            element: <WarehousesCatalogPage />,
          },
        ],
        { initialEntries: [WarehousesRoutesEnum.WarehousesCatalog], initialIndex: 0 },
        {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
          }),
        },
      )

      const link = warehouseCatalogListPageTestUtils.queryNomenclatureLink()
      expect(link).not.toBeInTheDocument()
    })

    test('При клике переходит на страницу списка номенклатур', async () => {
      mockGetNomenclaturesSuccess()
      mockGetNomenclatureGroupsSuccess()

      const { user } = renderWithRouter(
        [
          {
            path: WarehousesRoutesEnum.WarehousesCatalog,
            element: <WarehousesCatalogPage />,
          },
          {
            path: WarehousesRoutesEnum.Nomenclatures,
            element: <NomenclaturesPage />,
          },
        ],
        { initialEntries: [WarehousesRoutesEnum.WarehousesCatalog], initialIndex: 0 },
        {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.NomenclaturesRead] }),
            },
          }),
        },
      )

      await warehouseCatalogListPageTestUtils.clickNomenclatureLink(user)
      const page = nomenclatureListPageTestUtils.getContainer()

      expect(page).toBeInTheDocument()
    })
  })
})
