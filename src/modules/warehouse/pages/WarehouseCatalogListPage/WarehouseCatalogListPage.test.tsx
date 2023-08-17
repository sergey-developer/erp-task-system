import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import React from 'react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'

import { RouteEnum } from 'configs/routes'

import { render } from '_tests_/utils'

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

    // todo: доработать как будет готова страница складов
    test('При клике переходит на страницу складов', async () => {
      const router = createMemoryRouter(
        [
          {
            path: RouteEnum.WarehouseCatalogList,
            element: <WarehouseCatalogListPage />,
          },
        ],
        { initialEntries: [RouteEnum.WarehouseCatalogList], initialIndex: 0 },
      )
      const { user } = render(<RouterProvider router={router} />)

      const link = await testUtils.clickCatalogLink(user, 'Склады')
      expect(link).not.toBeInTheDocument()
    })
  })
})
