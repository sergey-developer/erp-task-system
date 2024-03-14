import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import React from 'react'

import { UserPermissionsEnum } from 'modules/user/constants'
import { WarehouseRouteEnum } from 'modules/warehouse/constants/routes'

import {
  mockGetNomenclatureGroupListSuccess,
  mockGetNomenclatureListSuccess,
  mockGetWarehouseListSuccess,
} from '_tests_/mocks/api'
import { getUserMeQueryMock } from '_tests_/mocks/state/user'
import { getStoreWithAuth, linkTestUtils, renderInRoute_latest } from '_tests_/utils'

import NomenclatureListPage from '../NomenclatureListPage'
import { testUtils as nomenclatureListPageTestUtils } from '../NomenclatureListPage/NomenclatureListPage.test'
import WarehouseListPage from '../WarehouseListPage'
import { testUtils as warehouseListPageTestUtils } from '../WarehouseListPage/WarehouseListPage.test'
import WarehouseCatalogListPage from './index'

const getContainer = () => screen.getByTestId('warehouse-catalog-list-page')

const getCatalogContainer = () => within(getContainer()).getByTestId('warehouse-catalog-list')

// warehouse link
const getWarehouseLink = () => linkTestUtils.getLinkIn(getCatalogContainer(), 'Склады')

const queryWarehouseLink = () => linkTestUtils.queryLinkIn(getCatalogContainer(), 'Склады')

const clickWarehouseLink = async (user: UserEvent) =>
  linkTestUtils.clickLinkIn(getCatalogContainer(), user, 'Склады')

// nomenclature link
const getNomenclatureLink = () => linkTestUtils.getLinkIn(getCatalogContainer(), 'Номенклатура')

const queryNomenclatureLink = () => linkTestUtils.queryLinkIn(getCatalogContainer(), 'Номенклатура')

const clickNomenclatureLink = async (user: UserEvent) =>
  linkTestUtils.clickLinkIn(getCatalogContainer(), user, 'Номенклатура')

export const testUtils = {
  getContainer,

  getCatalogContainer,

  getWarehouseLink,
  queryWarehouseLink,
  clickWarehouseLink,

  getNomenclatureLink,
  queryNomenclatureLink,
  clickNomenclatureLink,
}

describe('Страница списка справочников складов', () => {
  describe('Элемент "Склады"', () => {
    test('Отображается корректно', async () => {
      renderInRoute_latest(
        [
          {
            path: WarehouseRouteEnum.WarehouseCatalogs,
            element: <WarehouseCatalogListPage />,
          },
        ],
        { initialEntries: [WarehouseRouteEnum.WarehouseCatalogs], initialIndex: 0 },
      )

      const link = testUtils.getWarehouseLink()

      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', WarehouseRouteEnum.Warehouses)
    })

    test('При клике переходит на страницу складов', async () => {
      mockGetWarehouseListSuccess()

      const { user } = renderInRoute_latest(
        [
          {
            path: WarehouseRouteEnum.WarehouseCatalogs,
            element: <WarehouseCatalogListPage />,
          },
          {
            path: WarehouseRouteEnum.Warehouses,
            element: <WarehouseListPage />,
          },
        ],
        { initialEntries: [WarehouseRouteEnum.WarehouseCatalogs], initialIndex: 0 },
      )

      await testUtils.clickWarehouseLink(user)
      const page = warehouseListPageTestUtils.getContainer()

      expect(page).toBeInTheDocument()
    })
  })

  describe('Элемент "Номенклатура"', () => {
    test('Отображается если есть права', async () => {
      renderInRoute_latest(
        [
          {
            path: WarehouseRouteEnum.WarehouseCatalogs,
            element: <WarehouseCatalogListPage />,
          },
        ],
        { initialEntries: [WarehouseRouteEnum.WarehouseCatalogs], initialIndex: 0 },
        {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.NomenclaturesRead] }),
            },
          }),
        },
      )

      const link = testUtils.getNomenclatureLink()

      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', WarehouseRouteEnum.Nomenclatures)
    })

    test('Не отображается если нет прав', async () => {
      renderInRoute_latest(
        [
          {
            path: WarehouseRouteEnum.WarehouseCatalogs,
            element: <WarehouseCatalogListPage />,
          },
        ],
        { initialEntries: [WarehouseRouteEnum.WarehouseCatalogs], initialIndex: 0 },
      )

      const link = testUtils.queryNomenclatureLink()
      expect(link).not.toBeInTheDocument()
    })

    test('При клике переходит на страницу списка номенклатур', async () => {
      mockGetNomenclatureListSuccess()
      mockGetNomenclatureGroupListSuccess()

      const { user } = renderInRoute_latest(
        [
          {
            path: WarehouseRouteEnum.WarehouseCatalogs,
            element: <WarehouseCatalogListPage />,
          },
          {
            path: WarehouseRouteEnum.Nomenclatures,
            element: <NomenclatureListPage />,
          },
        ],
        { initialEntries: [WarehouseRouteEnum.WarehouseCatalogs], initialIndex: 0 },
        {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.NomenclaturesRead] }),
            },
          }),
        },
      )

      await testUtils.clickNomenclatureLink(user)
      const page = nomenclatureListPageTestUtils.getContainer()

      expect(page).toBeInTheDocument()
    })
  })
})
