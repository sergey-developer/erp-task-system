import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { buttonTestUtils, spinnerTestUtils } from '_tests_/utils'

import { TestIdsEnum } from './constants'

const getContainer = () => screen.getByTestId(TestIdsEnum.NomenclaturesPage)

// search field
const getSearchField = () => within(getContainer()).getByPlaceholderText('Поиск номенклатуры')

const setSearchValue = async (user: UserEvent, value: string) => {
  const field = getSearchField()
  await user.type(field, value)
  return field
}

// add nomenclature group button
const getAddNomenclatureGroupButton = () =>
  buttonTestUtils.getButtonIn(getContainer(), 'Добавить группу')

const queryAddNomenclatureGroupButton = () =>
  buttonTestUtils.queryButtonIn(getContainer(), 'Добавить группу')

const clickAddNomenclatureGroupButton = async (user: UserEvent) => {
  const button = getAddNomenclatureGroupButton()
  await user.click(button)
}

// add nomenclature button
const getAddNomenclatureButton = () =>
  buttonTestUtils.getButtonIn(getContainer(), 'Добавить номенклатуру')

const queryAddNomenclatureButton = () =>
  buttonTestUtils.queryButtonIn(getContainer(), 'Добавить номенклатуру')

const clickAddNomenclatureButton = async (user: UserEvent) => {
  const button = getAddNomenclatureButton()
  await user.click(button)
}

// all nomenclature button
const getAllNomenclatureButton = () =>
  buttonTestUtils.getButtonIn(getContainer(), /Вся номенклатура/)

const clickAllNomenclatureButton = async (user: UserEvent) => {
  const button = getAllNomenclatureButton()
  await user.click(button)
}

// group list
const getGroupList = () => within(getContainer()).getByRole('menu')
const getGroupListItem = (name: string) => within(getGroupList()).getByRole('menuitem', { name })
const getAllGroupListItems = () => within(getGroupList()).getAllByRole('menuitem')
const expectGroupListLoadingStarted = spinnerTestUtils.expectLoadingStarted('group-list-loading')
const expectGroupListLoadingFinished = spinnerTestUtils.expectLoadingFinished('group-list-loading')

export const nomenclatureListPageTestUtils = {
  getContainer,

  getSearchField,
  setSearchValue,

  getAddNomenclatureGroupButton,
  queryAddNomenclatureGroupButton,
  clickAddNomenclatureGroupButton,

  getAddNomenclatureButton,
  queryAddNomenclatureButton,
  clickAddNomenclatureButton,

  getAllNomenclatureButton,
  clickAllNomenclatureButton,

  getGroupList,
  getGroupListItem,
  getAllGroupListItems,
  expectGroupListLoadingStarted,
  expectGroupListLoadingFinished,
}
