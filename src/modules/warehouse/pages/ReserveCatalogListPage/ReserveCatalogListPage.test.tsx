import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import React from 'react'

import { RouteEnum } from 'configs/routes'

import { getUserMeQueryMock } from '_tests_/mocks/user'
import { linkTestUtils, renderInRoute_latest } from '_tests_/utils'

import ReserveCatalogListPage from './index'

const getContainer = () => screen.getByTestId('reserve-catalog-list-page')

const getCatalogContainer = () =>
  within(getContainer()).getByTestId('reserve-catalog-list')

// equipment link
const getEquipmentLink = () =>
  linkTestUtils.getLinkIn(getCatalogContainer(), 'Оборудование')

const queryEquipmentLink = () =>
  linkTestUtils.queryLinkIn(getCatalogContainer(), 'Оборудование')

const clickEquipmentLink = async (user: UserEvent) =>
  linkTestUtils.clickLinkIn(getCatalogContainer(), user, 'Оборудование')

export const testUtils = {
  getContainer,

  getCatalogContainer,

  getEquipmentLink,
  queryEquipmentLink,
  clickEquipmentLink,
}

describe('Страница списка справочников запасов', () => {
  describe('Оборудование', () => {
    test('Отображается если есть права', async () => {
      renderInRoute_latest(
        [
          {
            path: RouteEnum.ReserveCatalogList,
            element: <ReserveCatalogListPage />,
          },
        ],
        { initialEntries: [RouteEnum.ReserveCatalogList], initialIndex: 0 },
        {
          preloadedState: {
            api: {
              // @ts-ignore
              queries: {
                ...getUserMeQueryMock({ permissions: ['EQUIPMENTS_READ'] }),
              },
            },
          },
        },
      )

      const link = testUtils.getEquipmentLink()

      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', RouteEnum.ReserveEquipmentNomenclatureList)
    })

    test('Не отображается если нет прав', async () => {
      renderInRoute_latest(
        [
          {
            path: RouteEnum.ReserveCatalogList,
            element: <ReserveCatalogListPage />,
          },
        ],
        { initialEntries: [RouteEnum.ReserveCatalogList], initialIndex: 0 },
      )

      const link = testUtils.queryEquipmentLink()
      expect(link).not.toBeInTheDocument()
    })

    test.todo('При клике переходит на страницу списка оборудования')
  })
})
