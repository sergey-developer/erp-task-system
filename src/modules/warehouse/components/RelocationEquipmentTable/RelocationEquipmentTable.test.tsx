import { equipmentConditionDict } from 'modules/warehouse/constants/equipment'

import {
  props,
  relocationEquipmentListItem,
} from '_tests_/features/warehouse/RelocationEquipmentTable/constants'
import { relocationEquipmentTableTestUtils } from '_tests_/features/warehouse/RelocationEquipmentTable/testUtils'
import { render, tableTestUtils } from '_tests_/utils'

import RelocationEquipmentTable from './index'

describe('Таблица перечня оборудования заявки на перемещение оборудования', () => {
  test('Отображается корректно', () => {
    render(<RelocationEquipmentTable {...props} />)

    const table = relocationEquipmentTableTestUtils.getContainer()

    expect(table).toBeInTheDocument()
    tableTestUtils.expectPaginationEnabledIn(table)

    props.dataSource.forEach((item) => {
      const row = relocationEquipmentTableTestUtils.getRow(item.id)
      expect(row).toBeInTheDocument()
    })
  })

  describe('Оборудование', () => {
    test('Отображается корректно', () => {
      render(<RelocationEquipmentTable {...props} />)

      const title = relocationEquipmentTableTestUtils.getColTitle('Оборудование')
      const value = relocationEquipmentTableTestUtils.getColValue(
        relocationEquipmentListItem.id,
        relocationEquipmentListItem.title,
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })
  })

  describe('Серийный номер', () => {
    test('Отображается корректно', () => {
      render(<RelocationEquipmentTable {...props} />)

      const title = relocationEquipmentTableTestUtils.getColTitle('Серийный номер')
      const value = relocationEquipmentTableTestUtils.getColValue(
        relocationEquipmentListItem.id,
        relocationEquipmentListItem.serialNumber!,
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })
  })

  describe('Назначение', () => {
    test('Отображается корректно', () => {
      render(<RelocationEquipmentTable {...props} />)

      const title = relocationEquipmentTableTestUtils.getColTitle('Назначение')
      const value = relocationEquipmentTableTestUtils.getColValue(
        relocationEquipmentListItem.id,
        relocationEquipmentListItem.purpose,
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })
  })

  describe('Состояние', () => {
    test('Отображается корректно', () => {
      render(<RelocationEquipmentTable {...props} />)

      const title = relocationEquipmentTableTestUtils.getColTitle('Состояние')
      const value = relocationEquipmentTableTestUtils.getColValue(
        relocationEquipmentListItem.id,
        equipmentConditionDict[relocationEquipmentListItem.condition],
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })
  })

  describe('Количество', () => {
    test('Отображается корректно', () => {
      render(<RelocationEquipmentTable {...props} />)

      const title = relocationEquipmentTableTestUtils.getColTitle('Количество')
      const value = relocationEquipmentTableTestUtils.getColValue(
        relocationEquipmentListItem.id,
        relocationEquipmentListItem.quantity,
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })
  })

  describe('Стоимость', () => {
    test('Отображается корректно', () => {
      render(<RelocationEquipmentTable {...props} />)

      const title = relocationEquipmentTableTestUtils.getColTitle('Стоимость')
      const value = relocationEquipmentTableTestUtils.getColValue(
        relocationEquipmentListItem.id,
        relocationEquipmentListItem.price!,
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })
  })

  describe('Валюта', () => {
    test('Отображается корректно', () => {
      render(<RelocationEquipmentTable {...props} />)

      const title = relocationEquipmentTableTestUtils.getColTitle('Валюта')
      const value = relocationEquipmentTableTestUtils.getColValue(
        relocationEquipmentListItem.id,
        relocationEquipmentListItem.currency!.title,
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })
  })

  describe('Изображения', () => {
    test('Заголовок и кнопка отображаются', () => {
      render(<RelocationEquipmentTable {...props} />)

      const title = relocationEquipmentTableTestUtils.getColTitle('Изображения')
      const button = relocationEquipmentTableTestUtils.getViewImagesButton(
        relocationEquipmentListItem.id,
      )

      expect(title).toBeInTheDocument()
      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('При клике на кнопку обработчик вызывается', async () => {
      const { user } = render(<RelocationEquipmentTable {...props} />)

      await relocationEquipmentTableTestUtils.clickViewImagesButton(
        user,
        relocationEquipmentListItem.id,
      )

      expect(props.onClickImages).toBeCalledTimes(1)
      expect(props.onClickImages).toBeCalledWith(expect.anything(), relocationEquipmentListItem)
    })
  })
})
