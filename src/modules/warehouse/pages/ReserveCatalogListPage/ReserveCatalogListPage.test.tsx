import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import React from 'react'

import { UserPermissionsEnum } from 'modules/user/constants'
import { WarehouseRouteEnum } from 'modules/warehouse/constants/routes'
import EquipmentNomenclatureListPage from 'modules/warehouse/pages/EquipmentNomenclatureListPage'
import { testUtils as equipmentNomenclatureListPageTestUtils } from 'modules/warehouse/pages/EquipmentNomenclatureListPage/EquipmentNomenclatureListPage.test'
import InventorizationsPage from 'modules/warehouse/pages/InventorizationsPage'
import { testUtils as inventorizationsPageTestUtils } from 'modules/warehouse/pages/InventorizationsPage/InventorizationsPage.test'
import RelocationTasksPage from 'modules/warehouse/pages/RelocationTasksPage'
import { testUtils as relocationTaskListPageTestUtils } from 'modules/warehouse/pages/RelocationTasksPage/RelocationTasksPage.test'

import userFixtures from '_tests_/fixtures/user'
import {
  mockGetEquipmentNomenclaturesSuccess,
  mockGetInventorizationsSuccess,
  mockGetRelocationTasksSuccess,
} from '_tests_/mocks/api'
import { getUserMeQueryMock } from '_tests_/mocks/state/user'
import { getStoreWithAuth, linkTestUtils, renderInRoute_latest } from '_tests_/utils'

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

// inventorizations link
const getInventorizationsLink = () =>
  linkTestUtils.getLinkIn(getCatalogContainer(), 'Инвентаризация')

const queryInventorizationsLink = () =>
  linkTestUtils.queryLinkIn(getCatalogContainer(), 'Инвентаризация')

const clickInventorizationsLink = async (user: UserEvent) =>
  linkTestUtils.clickLinkIn(getCatalogContainer(), user, 'Инвентаризация')

export const testUtils = {
  getContainer,

  getCatalogContainer,

  getEquipmentLink,
  queryEquipmentLink,
  clickEquipmentLink,

  getRelocationTasksLink,
  queryRelocationTasksLink,
  clickRelocationTasksLink,

  getInventorizationsLink,
  queryInventorizationsLink,
  clickInventorizationsLink,
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
        {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        },
      )

      const link = testUtils.queryEquipmentLink()
      expect(link).not.toBeInTheDocument()
    })

    test('При клике переходит на страницу списка номенклатуры оборудования', async () => {
      mockGetEquipmentNomenclaturesSuccess()

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
        {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        },
      )

      const link = testUtils.queryRelocationTasksLink()
      expect(link).not.toBeInTheDocument()
    })

    test('При клике переходит на страницу списка заявок на перемещение', async () => {
      mockGetRelocationTasksSuccess()

      const { user } = renderInRoute_latest(
        [
          {
            path: WarehouseRouteEnum.Reserves,
            element: <ReserveCatalogListPage />,
          },
          {
            path: WarehouseRouteEnum.RelocationTasks,
            element: <RelocationTasksPage />,
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

  describe('Инвентаризация', () => {
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
              ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.InventorizationRead] }),
            },
          }),
        },
      )

      const link = testUtils.getInventorizationsLink()

      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', WarehouseRouteEnum.Inventorizations)
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
        {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        },
      )

      const link = testUtils.queryInventorizationsLink()
      expect(link).not.toBeInTheDocument()
    })

    test('При клике переходит на страницу списка инвентаризаций', async () => {
      mockGetInventorizationsSuccess()

      const { user } = renderInRoute_latest(
        [
          {
            path: WarehouseRouteEnum.Reserves,
            element: <ReserveCatalogListPage />,
          },
          {
            path: WarehouseRouteEnum.Inventorizations,
            element: <InventorizationsPage />,
          },
        ],
        { initialEntries: [WarehouseRouteEnum.Reserves], initialIndex: 0 },
        {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.InventorizationRead] }),
            },
          }),
        },
      )

      await testUtils.clickInventorizationsLink(user)
      const page = inventorizationsPageTestUtils.getContainer()

      expect(page).toBeInTheDocument()
    })
  })
})
