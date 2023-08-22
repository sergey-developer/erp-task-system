import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import React from 'react'

import { RouteEnum } from 'configs/routes'

import EquipmentNomenclatureListPage from 'modules/warehouse/pages/EquipmentNomenclatureListPage'
import { testUtils as equipmentNomenclatureListPageTestUtils } from 'modules/warehouse/pages/EquipmentNomenclatureListPage/EquipmentNomenclatureListPage.test'

import {
  fakeWord,
  getButtonIn,
  render,
  renderInRoute_latest,
} from '_tests_/utils'

import ReservesListLayout from './index'

const getContainer = () => screen.getByTestId('reserves-list-layout')

// filter button
const getFilterButton = () => getButtonIn(getContainer(), /filter/)

// add equipment button
const getAddEquipmentButton = () =>
  getButtonIn(getContainer(), /Добавить оборудование/)

// search field
const getSearchField = () =>
  within(getContainer()).getByPlaceholderText('Поиск оборудования')

const setSearch = async (user: UserEvent, value: string) => {
  const field = getSearchField()
  await user.type(field, value)
  return field
}

const testUtils = {
  getContainer,

  getFilterButton,

  getAddEquipmentButton,

  getSearchField,
  setSearch,
}

describe('Layout списка резервов', () => {
  test('Отображает дочерний роут', () => {
    renderInRoute_latest(
      [
        {
          path: RouteEnum.EquipmentNomenclatureList,
          element: <ReservesListLayout />,
          children: [
            {
              index: true,
              element: <EquipmentNomenclatureListPage />,
            },
          ],
        },
      ],
      { initialEntries: [RouteEnum.EquipmentNomenclatureList] },
    )

    const page = equipmentNomenclatureListPageTestUtils.getContainer()
    expect(page).toBeInTheDocument()
  })

  describe('Кнопка фильтров', () => {
    test('Отображается', () => {
      render(<ReservesListLayout />)

      const button = testUtils.getFilterButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })
  })

  describe('Кнопка добавления оборудования', () => {
    test('Отображается', () => {
      render(<ReservesListLayout />)

      const button = testUtils.getAddEquipmentButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })
  })

  describe('Поле поиска', () => {
    test('Отображается', () => {
      render(<ReservesListLayout />)

      const field = testUtils.getSearchField()

      expect(field).toBeInTheDocument()
      expect(field).toBeEnabled()
      expect(field).not.toHaveValue()
    })

    test('Можно установить значение', async () => {
      const { user } = render(<ReservesListLayout />)

      const value = fakeWord()
      const field = await testUtils.setSearch(user, value)

      expect(field).toHaveDisplayValue(value)
    })
  })
})
