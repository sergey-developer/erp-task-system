import { within } from '@testing-library/react'

import { props } from '_tests_/features/warehouses/components/CreateEquipmentsByFileModal/constants'
import { createEquipmentsByFileModalTestUtils } from '_tests_/features/warehouses/components/CreateEquipmentsByFileModal/testUtils'
import { equipmentsByFileTableTestUtils } from '_tests_/features/warehouses/components/EquipmentsByFileTable/testUtils'
import { render } from '_tests_/helpers'

import CreateEquipmentsByFileModal from './index'

describe('Модалка создания оборудования по шаблону файла', () => {
  test('Заголовок отображается', () => {
    render(<CreateEquipmentsByFileModal {...props} />)
    const title = within(createEquipmentsByFileModalTestUtils.getContainer()).getByText(
      'Оборудование из Excel',
    )
    expect(title).toBeInTheDocument()
  })

  test('Таблица отображается', () => {
    render(<CreateEquipmentsByFileModal {...props} />)
    const table = equipmentsByFileTableTestUtils.getContainer()
    expect(table).toBeInTheDocument()
  })

  describe('Кнопка добавления', () => {
    test('Отображается', () => {
      render(<CreateEquipmentsByFileModal {...props} />)

      const button = createEquipmentsByFileModalTestUtils.getAddButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('При клике вызывается обработчик', async () => {
      const { user } = render(<CreateEquipmentsByFileModal {...props} />)
      await createEquipmentsByFileModalTestUtils.clickAddButton(user)
      expect(props.onCreate).toBeCalledTimes(1)
    })
  })

  describe('Кнопка отмены', () => {
    test('Отображается', () => {
      render(<CreateEquipmentsByFileModal {...props} />)

      const button = createEquipmentsByFileModalTestUtils.getCancelButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('При клике вызывается обработчик', async () => {
      const { user } = render(<CreateEquipmentsByFileModal {...props} />)
      await createEquipmentsByFileModalTestUtils.clickCancelButton(user)
      expect(props.onCancel).toBeCalledTimes(1)
    })
  })
})
