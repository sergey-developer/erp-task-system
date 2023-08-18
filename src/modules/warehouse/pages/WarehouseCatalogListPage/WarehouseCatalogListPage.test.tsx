import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import React from 'react'

import { RouteEnum } from 'configs/routes'

import { mockGetWarehouseListSuccess } from '_tests_/mocks/api'
import { renderInRoute_latest } from '_tests_/utils'

import WarehouseListPage from '../WarehouseListPage'
import { testUtils as warehouseListPageTestUtils } from '../WarehouseListPage/WarehouseListPage.test'
import WarehouseCatalogListPage from './index'

const getContainer = () => screen.getByTestId('warehouse-catalog-list-page')

const getCatalogLink = (name: string) =>
  within(getContainer()).getByRole('link', { name })

const clickCatalogLink = async (user: UserEvent, name: string) => {
  const link = getCatalogLink(name)
  await user.click(link)
  return link
}

const testUtils = {
  getContainer,

  getCatalogLink,
  clickCatalogLink,
}

describe('Страница списка справочников складов', () => {
  describe('Элемент "Склады"', () => {
    test('Отображается корректно', async () => {
      renderInRoute_latest(
        [
          {
            path: RouteEnum.WarehouseCatalogList,
            element: <WarehouseCatalogListPage />,
          },
        ],
        { initialEntries: [RouteEnum.WarehouseCatalogList], initialIndex: 0 },
      )

      const link = testUtils.getCatalogLink('Склады')

      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', RouteEnum.WarehouseList)
    })

    test('При клике переходит на страницу складов', async () => {
      mockGetWarehouseListSuccess()

      const { user } = renderInRoute_latest(
        [
          {
            path: RouteEnum.WarehouseCatalogList,
            element: <WarehouseCatalogListPage />,
          },
          {
            path: RouteEnum.WarehouseList,
            element: <WarehouseListPage />,
          },
        ],
        { initialEntries: [RouteEnum.WarehouseCatalogList], initialIndex: 0 },
      )

      await testUtils.clickCatalogLink(user, 'Склады')
      const page = warehouseListPageTestUtils.getContainer()

      expect(page).toBeInTheDocument()
    })
  })
})
