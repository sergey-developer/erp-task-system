import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import React from 'react'

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
            path: WarehouseRouteEnum.WarehouseCatalogList,
            element: <WarehouseCatalogListPage />,
          },
        ],
        { initialEntries: [WarehouseRouteEnum.WarehouseCatalogList], initialIndex: 0 },
      )

      const link = testUtils.getWarehouseLink()

      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', WarehouseRouteEnum.WarehouseList)
    })

    test('При клике переходит на страницу складов', async () => {
      mockGetWarehouseListSuccess()

      const { user } = renderInRoute_latest(
        [
          {
            path: WarehouseRouteEnum.WarehouseCatalogList,
            element: <WarehouseCatalogListPage />,
          },
          {
            path: WarehouseRouteEnum.WarehouseList,
            element: <WarehouseListPage />,
          },
        ],
        { initialEntries: [WarehouseRouteEnum.WarehouseCatalogList], initialIndex: 0 },
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
            path: WarehouseRouteEnum.WarehouseCatalogList,
            element: <WarehouseCatalogListPage />,
          },
        ],
        { initialEntries: [WarehouseRouteEnum.WarehouseCatalogList], initialIndex: 0 },
        {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock({ permissions: ['NOMENCLATURES_READ'] }),
            },
          }),
        },
      )

      const link = testUtils.getNomenclatureLink()

      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', WarehouseRouteEnum.NomenclatureList)
    })

    test('Не отображается если нет прав', async () => {
      renderInRoute_latest(
        [
          {
            path: WarehouseRouteEnum.WarehouseCatalogList,
            element: <WarehouseCatalogListPage />,
          },
        ],
        { initialEntries: [WarehouseRouteEnum.WarehouseCatalogList], initialIndex: 0 },
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
            path: WarehouseRouteEnum.WarehouseCatalogList,
            element: <WarehouseCatalogListPage />,
          },
          {
            path: WarehouseRouteEnum.NomenclatureList,
            element: <NomenclatureListPage />,
          },
        ],
        { initialEntries: [WarehouseRouteEnum.WarehouseCatalogList], initialIndex: 0 },
        {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock({ permissions: ['NOMENCLATURES_READ'] }),
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
