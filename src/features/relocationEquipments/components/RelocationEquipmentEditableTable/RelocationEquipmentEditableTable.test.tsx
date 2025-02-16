import { Form } from 'antd'

import { props } from '_tests_/features/warehouses/components/RelocationEquipmentEditableTable/constants'
import { relocationEquipmentEditableTableTestUtils } from '_tests_/features/warehouses/components/RelocationEquipmentEditableTable/testUtils'
import { buttonTestUtils, render } from '_tests_/helpers'

import RelocationEquipmentEditableTable from './index'

describe('Таблица добавления оборудования для перемещения', () => {
  describe('Кнопка добавить оборудование', () => {
    test('Отображается корректно', () => {
      render(
        <Form>
          <RelocationEquipmentEditableTable {...props} />
        </Form>,
      )

      const button = buttonTestUtils.getButtonIn(
        relocationEquipmentEditableTableTestUtils.getContainer(),
        /Добавить оборудование/,
      )

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })
  })
})
