import { screen } from '@testing-library/react'

import { buttonTestUtils, render } from '_tests_/utils'

import RelocationEquipmentEditableTable, { RelocationEquipmentEditableTableProps } from './index'

const props: RelocationEquipmentEditableTableProps = {
  onClickDeleteRow: jest.fn(),
}

const getContainer = () => screen.getByTestId('relocation-equipment-editable-table-form-item')

export const testUtils = {
  getContainer,
}

describe('Таблица добавления оборудования для перемещения', () => {
  describe('Кнопка добавить оборудование', () => {
    test('Отображается корректно', () => {
      render(<RelocationEquipmentEditableTable {...props} />)

      const button = buttonTestUtils.getButtonIn(getContainer(), /Добавить оборудование/)

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })
  })
})
