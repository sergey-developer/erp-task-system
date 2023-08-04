import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { testUtils as nomenclatureTableTestUtils } from 'modules/warehouse/components/NomenclatureTable/NomenclatureTable.test'

import { fakeWord, getButtonIn, render } from '_tests_/utils'

import NomenclatureListPage from './index'

const getContainer = () => screen.getByTestId('nomenclature-list-page')

// search field
const getSearchField = () =>
  within(getContainer()).getByPlaceholderText('Поиск номенклатуры')

const setSearchValue = async (user: UserEvent, value: string) => {
  const field = getSearchField()
  await user.type(field, value)
  return field
}

// add group button
const getAddGroupBtn = () => getButtonIn(getContainer(), /Добавить группу/)

// add nomenclature button
const getAddNomenclatureBtn = () =>
  getButtonIn(getContainer(), /Добавить номенклатуру/)

// group list
const getGroupList = () => within(getContainer()).getByTestId('group-list')

export const testUtils = {
  getContainer,

  getSearchField,
  setSearchValue,

  getAddGroupBtn,

  getAddNomenclatureBtn,

  getGroupList,
}

describe('Страница списка номенклатур', () => {
  describe('Поле поиска', () => {
    test('Отображается', () => {
      render(<NomenclatureListPage />)

      const field = testUtils.getSearchField()

      expect(field).toBeInTheDocument()
      expect(field).toBeEnabled()
      expect(field).not.toHaveValue()
    })

    test('Можно установить значение', async () => {
      const { user } = render(<NomenclatureListPage />)

      const value = fakeWord()
      const field = await testUtils.setSearchValue(user, value)

      expect(field).toHaveDisplayValue(value)
    })
  })

  describe('Кнопка добавления группы', () => {
    test('Отображается', () => {
      render(<NomenclatureListPage />)

      const button = testUtils.getAddGroupBtn()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })
  })

  describe('Кнопка добавления номенклатуры', () => {
    test('Отображается', () => {
      render(<NomenclatureListPage />)

      const button = testUtils.getAddNomenclatureBtn()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })
  })

  describe('Список групп', () => {
    test('Отображается', () => {
      render(<NomenclatureListPage />)
      const groupList = testUtils.getGroupList()
      expect(groupList).toBeInTheDocument()
    })
  })

  test('Таблица номенклатур отображается', () => {
    render(<NomenclatureListPage />)
    const table = nomenclatureTableTestUtils.getContainer()
    expect(table).toBeInTheDocument()
  })
})
