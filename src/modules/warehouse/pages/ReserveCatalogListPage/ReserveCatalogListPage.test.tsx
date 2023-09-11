import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import React from 'react'

import { RouteEnum } from 'configs/routes'

import { mockGetEquipmentNomenclatureListSuccess } from '_tests_/mocks/api'
import { getUserMeQueryMock } from '_tests_/mocks/state/user'
import { linkTestUtils, renderInRoute_latest } from '_tests_/utils'

import EquipmentNomenclatureListPage from '../EquipmentNomenclatureListPage'
import { testUtils as equipmentNomenclatureListPageTestUtils } from '../EquipmentNomenclatureListPage/EquipmentNomenclatureListPage.test'
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
      expect(link).toHaveAttribute('href', RouteEnum.EquipmentNomenclatureList)
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

    test('При клике переходит на страницу списка номенклатуры оборудования', async () => {
      mockGetEquipmentNomenclatureListSuccess()

      const { user } = renderInRoute_latest(
        [
          {
            path: RouteEnum.ReserveCatalogList,
            element: <ReserveCatalogListPage />,
          },
          {
            path: RouteEnum.EquipmentNomenclatureList,
            element: <EquipmentNomenclatureListPage />,
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

      await testUtils.clickEquipmentLink(user)
      const page = equipmentNomenclatureListPageTestUtils.getContainer()

      expect(page).toBeInTheDocument()
    })
  })
})
