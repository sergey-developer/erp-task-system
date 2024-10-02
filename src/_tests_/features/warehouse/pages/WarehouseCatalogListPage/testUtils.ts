import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { linkTestUtils } from '_tests_/utils/index'

import { TestIdsEnum } from './constants'

const getContainer = () => screen.getByTestId(TestIdsEnum.WarehouseCatalogListPage)
const getCatalogContainer = () =>
  within(getContainer()).getByTestId(TestIdsEnum.WarehouseCatalogList)

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

export const warehouseCatalogListPageTestUtils = {
  getContainer,

  getCatalogContainer,

  getWarehouseLink,
  queryWarehouseLink,
  clickWarehouseLink,

  getNomenclatureLink,
  queryNomenclatureLink,
  clickNomenclatureLink,
}
