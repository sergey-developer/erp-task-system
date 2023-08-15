import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import React from 'react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'

import { RouteEnum } from 'configs/routes'

import {
  mockGetNomenclatureGroupListSuccess,
  mockGetNomenclatureListSuccess,
  mockGetWarehouseListSuccess,
} from '_tests_/mocks/api'
import { getUserMeQueryMock } from '_tests_/mocks/user'
import { render } from '_tests_/utils'

import NomenclatureListPage from '../NomenclatureListPage'
import { testUtils as nomenclatureListPageTestUtils } from '../NomenclatureListPage/NomenclatureListPage.test'
import WarehouseListPage from '../WarehouseListPage'
import { testUtils as warehouseListPageTestUtils } from '../WarehouseListPage/WarehouseListPage.test'
import WarehouseCatalogListPage from './index'

const getContainer = () => screen.getByTestId('warehouse-catalog-list-page')

const getCatalogLink = (name: string) =>
  within(getContainer()).getByRole('link', { name })

const queryCatalogLink = (name: string) =>
  within(getContainer()).queryByRole('link', { name })

const clickCatalogLink = async (user: UserEvent, name: string) => {
  const link = getCatalogLink(name)
  await user.click(link)
  return link
}

const testUtils = {
  getContainer,

  getCatalogLink,
  queryCatalogLink,
  clickCatalogLink,
}

describe('Страница списка справочников складов', () => {
  describe('Элемент "Склады"', () => {
    test('Отображается корректно', async () => {
      // todo: создать компонент для переиспользования в тестах
      const router = createMemoryRouter(
        [
          {
            path: RouteEnum.WarehouseCatalogList,
            element: <WarehouseCatalogListPage />,
          },
        ],
        { initialEntries: [RouteEnum.WarehouseCatalogList], initialIndex: 0 },
      )
      render(<RouterProvider router={router} />)

      const link = testUtils.getCatalogLink('Склады')

      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', RouteEnum.WarehouseList)
    })

    test('При клике переходит на страницу складов', async () => {
      mockGetWarehouseListSuccess()

      const router = createMemoryRouter(
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
      const { user } = render(<RouterProvider router={router} />)

      await testUtils.clickCatalogLink(user, 'Склады')
      const page = warehouseListPageTestUtils.getContainer()

      expect(page).toBeInTheDocument()
    })
  })

  describe('Элемент "Номенклатура"', () => {
    test('Отображается если есть права', async () => {
      const router = createMemoryRouter(
        [
          {
            path: RouteEnum.WarehouseCatalogList,
            element: <WarehouseCatalogListPage />,
          },
        ],
        { initialEntries: [RouteEnum.WarehouseCatalogList], initialIndex: 0 },
      )

      render(<RouterProvider router={router} />, {
        preloadedState: {
          api: {
            // @ts-ignore
            queries: {
              ...getUserMeQueryMock({ permissions: ['NOMENCLATURES_READ'] }),
            },
          },
        },
      })

      const link = testUtils.getCatalogLink('Номенклатура')

      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', RouteEnum.NomenclatureList)
    })

    test('Не отображается если нет прав', async () => {
      const router = createMemoryRouter(
        [
          {
            path: RouteEnum.WarehouseCatalogList,
            element: <WarehouseCatalogListPage />,
          },
        ],
        { initialEntries: [RouteEnum.WarehouseCatalogList], initialIndex: 0 },
      )

      render(<RouterProvider router={router} />)

      const link = testUtils.queryCatalogLink('Номенклатура')
      expect(link).not.toBeInTheDocument()
    })

    test('При клике переходит на страницу списка номенклатур', async () => {
      mockGetNomenclatureListSuccess()
      mockGetNomenclatureGroupListSuccess()

      const router = createMemoryRouter(
        [
          {
            path: RouteEnum.WarehouseCatalogList,
            element: <WarehouseCatalogListPage />,
          },
          {
            path: RouteEnum.NomenclatureList,
            element: <NomenclatureListPage />,
          },
        ],
        { initialEntries: [RouteEnum.WarehouseCatalogList], initialIndex: 0 },
      )

      const { user } = render(<RouterProvider router={router} />, {
        preloadedState: {
          api: {
            // @ts-ignore
            queries: {
              ...getUserMeQueryMock({ permissions: ['NOMENCLATURES_READ'] }),
            },
          },
        },
      })

      await testUtils.clickCatalogLink(user, 'Номенклатура')
      const page = nomenclatureListPageTestUtils.getContainer()

      expect(page).toBeInTheDocument()
    })
  })
})
