import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { linkTestUtils } from '_tests_/utils/index'

import { TestIdsEnum } from './constants'

const getContainer = () => screen.getByTestId(TestIdsEnum.ReserveCatalogListPage)
const getCatalogContainer = () => within(getContainer()).getByTestId(TestIdsEnum.ReserveCatalogList)

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

export const reserveCatalogListPageTestUtils = {
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
