import { props } from '_tests_/features/warehouses/components/RelocationEquipmentSimplifiedEditableTable/constants'
import { relocationEquipmentSimplifiedEditableTableTestUtils } from '_tests_/features/warehouses/components/RelocationEquipmentSimplifiedEditableTable/testUtils'
import { buttonTestUtils, render } from '_tests_/helpers'

import RelocationEquipmentSimplifiedEditableTable from './index'

describe('Упрощенная таблица добавления оборудования для перемещения', () => {
  describe('Кнопка добавить оборудование', () => {
    test('Отображается корректно', () => {
      render(<RelocationEquipmentSimplifiedEditableTable {...props} />)

      const button = buttonTestUtils.getButtonIn(
        relocationEquipmentSimplifiedEditableTableTestUtils.getContainer(),
        /Добавить оборудование/,
      )

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })
  })
})
