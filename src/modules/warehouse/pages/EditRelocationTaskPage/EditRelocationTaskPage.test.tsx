import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { testUtils as createRelocationTaskFormTestUtils } from 'modules/warehouse/components/RelocationTaskForm/RelocationTaskForm.test'
import { testUtils as relocationEquipmentEditableTableTestUtils } from 'modules/warehouse/components/RelocationEquipmentEditableTable/RelocationEquipmentEditableTable.test'

import {
  mockGetCurrencyListSuccess,
  mockGetEquipmentCatalogListSuccess,
  mockGetLocationListSuccess,
  mockGetUserListSuccess,
} from '_tests_/mocks/api'
import { buttonTestUtils, render, setupApiTests } from '_tests_/utils'

import CreateRelocationTaskPage from './index'

const getContainer = () => screen.getByTestId('create-relocation-task-page')

// submit button
const getSubmitButton = () => buttonTestUtils.getButtonIn(getContainer(), 'Создать заявку')
const clickSubmitButton = async (user: UserEvent) => {
  const button = getSubmitButton()
  await user.click(button)
}

// cancel button
const getCancelButton = () => buttonTestUtils.getButtonIn(getContainer(), 'Отменить')
const clickCancelButton = async (user: UserEvent) => {
  const button = getCancelButton()
  await user.click(button)
}

export const testUtils = {
  getContainer,

  getSubmitButton,
  clickSubmitButton,

  getCancelButton,
  clickCancelButton,
}

setupApiTests()

describe('Страница создания заявки на перемещение', () => {
  describe('Форма', () => {
    test('Отображается корректно', () => {
      mockGetUserListSuccess()
      mockGetLocationListSuccess()
      mockGetEquipmentCatalogListSuccess()
      mockGetCurrencyListSuccess()

      render(<CreateRelocationTaskPage />)

      const form = createRelocationTaskFormTestUtils.getContainer()
      expect(form).toBeInTheDocument()
    })
  })

  describe('Перечень оборудования', () => {
    test('Отображается корректно', () => {
      mockGetUserListSuccess()
      mockGetLocationListSuccess()
      mockGetEquipmentCatalogListSuccess()
      mockGetCurrencyListSuccess()

      render(<CreateRelocationTaskPage />)

      const title = within(getContainer()).getByText('Перечень оборудования')
      const table = relocationEquipmentEditableTableTestUtils.getContainer()

      expect(title).toBeInTheDocument()
      expect(table).toBeInTheDocument()
    })
  })
})
