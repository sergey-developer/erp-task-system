import { props } from '_tests_/features/warehouse/RelocationEquipmentSimplifiedEditableTable/constants'
import { relocationEquipmentSimplifiedEditableTableTestUtils } from '_tests_/features/warehouse/RelocationEquipmentSimplifiedEditableTable/testUtils'
import { buttonTestUtils, render } from '_tests_/utils'

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
