import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import React from 'react'

import { UserPermissionsEnum } from 'modules/user/constants'
import { WarehouseRouteEnum } from 'modules/warehouse/constants/routes'

import { mockGetEquipmentNomenclatureListSuccess } from '_tests_/mocks/api'
import { getUserMeQueryMock } from '_tests_/mocks/state/user'
import { getStoreWithAuth, linkTestUtils, renderInRoute_latest } from '_tests_/utils'

import EquipmentNomenclatureListPage from '../EquipmentNomenclatureListPage'
import { testUtils as equipmentNomenclatureListPageTestUtils } from '../EquipmentNomenclatureListPage/EquipmentNomenclatureListPage.test'
import RelocationTaskListPage from '../RelocationTaskListPage'
import { testUtils as relocationTaskListPageTestUtils } from '../RelocationTaskListPage/RelocationTaskListPage.test'
import ReserveCatalogListPage from './index'

const getContainer = () => screen.getByTestId('reserve-catalog-list-page')

const getCatalogContainer = () => within(getContainer()).getByTestId('reserve-catalog-list')

// equipment link
const getEquipmentLink = () => linkTestUtils.getLinkIn(getCatalogContainer(), 'Оборудование')

const queryEquipmentLink = () => linkTestUtils.queryLinkIn(getCatalogContainer(), 'Оборудование')

const clickEquipmentLink = async (user: UserEvent) =>
  linkTestUtils.clickLinkIn(getCatalogContainer(), user, 'Оборудование')

// relocation tasks link
const getRelocationTasksLink = () =>
  linkTestUtils.getLinkIn(getCatalogContainer(), 'Заявки на перемещение оборудования')

const queryRelocationTasksLink = () =>
  linkTestUtils.queryLinkIn(getCatalogContainer(), 'Заявки на перемещение оборудования')

const clickRelocationTasksLink = async (user: UserEvent) =>
  linkTestUtils.clickLinkIn(getCatalogContainer(), user, 'Заявки на перемещение оборудования')

export const testUtils = {
  getContainer,

  getCatalogContainer,

  getEquipmentLink,
  queryEquipmentLink,
  clickEquipmentLink,

  getRelocationTasksLink,
  queryRelocationTasksLink,
  clickRelocationTasksLink,
}

describe('Страница списка справочников запасов', () => {
  describe('Оборудование', () => {
    test('Отображается если есть права', async () => {
      renderInRoute_latest(
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

      const link = testUtils.getEquipmentLink()

      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', WarehouseRouteEnum.EquipmentNomenclatures)
    })

    test('Не отображается если нет прав', async () => {
      renderInRoute_latest(
        [
          {
            path: WarehouseRouteEnum.Reserves,
            element: <ReserveCatalogListPage />,
          },
        ],
        { initialEntries: [WarehouseRouteEnum.Reserves], initialIndex: 0 },
      )

      const link = testUtils.queryEquipmentLink()
      expect(link).not.toBeInTheDocument()
    })

    test('При клике переходит на страницу списка номенклатуры оборудования', async () => {
      mockGetEquipmentNomenclatureListSuccess()

      const { user } = renderInRoute_latest(
        [
          {
            path: WarehouseRouteEnum.Reserves,
            element: <ReserveCatalogListPage />,
          },
          {
            path: WarehouseRouteEnum.EquipmentNomenclatures,
            element: <EquipmentNomenclatureListPage />,
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

      await testUtils.clickEquipmentLink(user)
      const page = equipmentNomenclatureListPageTestUtils.getContainer()

      expect(page).toBeInTheDocument()
    })
  })

  describe('Заявки на перемещение оборудования', () => {
    test('Отображается если есть права', async () => {
      renderInRoute_latest(
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

      const link = testUtils.getRelocationTasksLink()

      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', WarehouseRouteEnum.RelocationTasks)
    })

    test('Не отображается если нет прав', async () => {
      renderInRoute_latest(
        [
          {
            path: WarehouseRouteEnum.Reserves,
            element: <ReserveCatalogListPage />,
          },
        ],
        { initialEntries: [WarehouseRouteEnum.Reserves], initialIndex: 0 },
      )

      const link = testUtils.queryRelocationTasksLink()
      expect(link).not.toBeInTheDocument()
    })

    test('При клике переходит на страницу списка заявок на перемещение', async () => {
      // todo: добавить мок запроса когда интеграция будет готова

      const { user } = renderInRoute_latest(
        [
          {
            path: WarehouseRouteEnum.Reserves,
            element: <ReserveCatalogListPage />,
          },
          {
            path: WarehouseRouteEnum.RelocationTasks,
            element: <RelocationTaskListPage />,
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

      await testUtils.clickRelocationTasksLink(user)
      const page = relocationTaskListPageTestUtils.getContainer()

      expect(page).toBeInTheDocument()
    })
  })
})
