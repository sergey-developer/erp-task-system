import { within } from '@testing-library/react'

import { equipmentConditionDict } from 'modules/warehouse/constants/equipment'

import { getYesNoWord } from 'shared/utils/common'

import {
  props,
  tableRow,
} from '_tests_/features/warehouse/components/EquipmentsByFileTable/constants'
import { equipmentsByFileTableTestUtils } from '_tests_/features/warehouse/components/EquipmentsByFileTable/testUtils'
import { render } from '_tests_/utils'

import EquipmentsByFileTable from './index'

describe('Таблица оборудования по шаблону файла', () => {
  test('Отображается', () => {
    render(<EquipmentsByFileTable {...props} />)

    const table = equipmentsByFileTableTestUtils.getContainer()
    expect(table).toBeInTheDocument()

    props.dataSource.forEach((item) => {
      const row = equipmentsByFileTableTestUtils.getRow(item.rowId)
      expect(row).toBeInTheDocument()
    })
  })

  test('Колонка категория отображается', () => {
    render(<EquipmentsByFileTable {...props} />)

    const title = equipmentsByFileTableTestUtils.getColTitle('Категория')
    const value = equipmentsByFileTableTestUtils.getColValue(
      tableRow.rowId,
      tableRow.category!.title,
    )

    expect(title).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  test('Колонка номенклатура отображается', () => {
    render(<EquipmentsByFileTable {...props} />)

    const title = equipmentsByFileTableTestUtils.getColTitle('Номенклатура')
    const value = equipmentsByFileTableTestUtils.getColValue(
      tableRow.rowId,
      tableRow.nomenclature!.title,
    )

    expect(title).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  test('Колонка инв. № отображается', () => {
    render(<EquipmentsByFileTable {...props} />)

    const title = equipmentsByFileTableTestUtils.getColTitle('Инв. №')
    const value = equipmentsByFileTableTestUtils.getColValue(
      tableRow.rowId,
      tableRow.inventoryNumber!,
    )

    expect(title).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  test('Колонка серийный № отображается', () => {
    render(<EquipmentsByFileTable {...props} />)

    const title = equipmentsByFileTableTestUtils.getColTitle('Серийный №')
    const value = equipmentsByFileTableTestUtils.getColValue(tableRow.rowId, tableRow.serialNumber!)

    expect(title).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  test('Колонка состояние отображается', () => {
    render(<EquipmentsByFileTable {...props} />)

    const title = equipmentsByFileTableTestUtils.getColTitle('Состояние')
    const value = equipmentsByFileTableTestUtils.getColValue(
      tableRow.rowId,
      equipmentConditionDict[tableRow.condition!],
    )

    expect(title).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  test('Колонка стоимость отображается', () => {
    render(<EquipmentsByFileTable {...props} />)

    const title = equipmentsByFileTableTestUtils.getColTitle('Стоимость')
    const value = equipmentsByFileTableTestUtils.getColValue(tableRow.rowId, tableRow.price!)

    expect(title).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  test('Колонка валюта отображается', () => {
    render(<EquipmentsByFileTable {...props} />)

    const title = equipmentsByFileTableTestUtils.getColTitle('Валюта')
    const value = equipmentsByFileTableTestUtils.getColValue(
      tableRow.rowId,
      tableRow.currency!.title,
    )

    expect(title).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  test('Колонка количество отображается', () => {
    render(<EquipmentsByFileTable {...props} />)

    const title = equipmentsByFileTableTestUtils.getColTitle('Количество')
    const value = equipmentsByFileTableTestUtils.getColValue(tableRow.rowId, tableRow.quantity!)

    expect(title).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  test('Колонка ед. изм. отображается', () => {
    render(<EquipmentsByFileTable {...props} />)

    const title = equipmentsByFileTableTestUtils.getColTitle('Ед. изм.')
    const value = equipmentsByFileTableTestUtils.getColValue(
      tableRow.rowId,
      tableRow.nomenclature!.measurementUnit,
    )

    expect(title).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  test('Колонка новое отображается', () => {
    render(<EquipmentsByFileTable {...props} />)

    const title = equipmentsByFileTableTestUtils.getColTitle('Новое')
    const value = within(equipmentsByFileTableTestUtils.getRow(tableRow.rowId)).getAllByText(
      getYesNoWord(tableRow.isNew!),
    )[0]

    expect(title).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  test('Колонка на гарантии отображается', () => {
    render(<EquipmentsByFileTable {...props} />)

    const title = equipmentsByFileTableTestUtils.getColTitle('На гарантии')
    const value = within(equipmentsByFileTableTestUtils.getRow(tableRow.rowId)).getAllByText(
      getYesNoWord(tableRow.isWarranty!),
    )[1]

    expect(title).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  test('Колонка отремонтиров. отображается', () => {
    render(<EquipmentsByFileTable {...props} />)

    const title = equipmentsByFileTableTestUtils.getColTitle('Отремонтиров.')
    const value = within(equipmentsByFileTableTestUtils.getRow(tableRow.rowId)).getAllByText(
      getYesNoWord(tableRow.isRepaired!),
    )[2]

    expect(title).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  test('Колонка пробег отображается', () => {
    render(<EquipmentsByFileTable {...props} />)

    const title = equipmentsByFileTableTestUtils.getColTitle('Пробег')
    const value = equipmentsByFileTableTestUtils.getColValue(tableRow.rowId, tableRow.usageCounter!)

    expect(title).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  test('Колонка владелец отображается', () => {
    render(<EquipmentsByFileTable {...props} />)

    const title = equipmentsByFileTableTestUtils.getColTitle('Владелец')
    const value = equipmentsByFileTableTestUtils.getColValue(tableRow.rowId, tableRow.owner!.title)

    expect(title).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  test('Колонка назначение отображается', () => {
    render(<EquipmentsByFileTable {...props} />)

    const title = equipmentsByFileTableTestUtils.getColTitle('Назначение')
    const value = equipmentsByFileTableTestUtils.getColValue(
      tableRow.rowId,
      tableRow.purpose!.title,
    )

    expect(title).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  test('Колонка комментарий отображается', () => {
    render(<EquipmentsByFileTable {...props} />)

    const title = equipmentsByFileTableTestUtils.getColTitle('Комментарий')
    const value = equipmentsByFileTableTestUtils.getColValue(tableRow.rowId, tableRow.comment!)

    expect(title).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })
})
