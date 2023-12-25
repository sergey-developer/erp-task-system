import { screen, within } from '@testing-library/react'

import {
  EquipmentCategoryEnum,
  equipmentConditionDict,
  EquipmentConditionEnum,
} from 'modules/warehouse/constants/equipment'

import { MaybeNull, NumberOrString } from 'shared/types/utils'
import { getYesNoWord } from 'shared/utils/common'

import { fakeId, fakeInteger, fakeWord, render, tableTestUtils } from '_tests_/utils'

import EquipmentsByFileTable from './index'
import { EquipmentByFileTableRow, EquipmentsByFileTableProps } from './types'

const tableRow: EquipmentByFileTableRow = {
  rowId: fakeId(),
  title: fakeWord(),
  inventoryNumber: fakeWord(),
  serialNumber: fakeWord(),
  quantity: fakeInteger(),
  comment: fakeWord(),
  price: fakeInteger(),
  usageCounter: fakeInteger(),
  isNew: false,
  isRepaired: false,
  isWarranty: false,
  condition: EquipmentConditionEnum.Working,
  nomenclature: { id: fakeId(), title: fakeWord(), measurementUnit: fakeWord() },
  owner: { id: fakeId(), title: fakeWord() },
  currency: { id: fakeId(), title: fakeWord() },
  category: { id: fakeId(), title: fakeWord(), code: EquipmentCategoryEnum.Equipment },
  purpose: { id: fakeId(), title: fakeWord() },
}

const props: Readonly<EquipmentsByFileTableProps> = {
  dataSource: [tableRow],
  onEdit: jest.fn(),
  errors: undefined,
}

const getContainer = () => screen.getByTestId('equipments-by-file-table')
const getRow = (id: number) => tableTestUtils.getRowIn(getContainer(), id)
const getColTitle = (text: string) => within(getContainer()).getByText(text)
const getColValue = (id: number, value: NumberOrString): MaybeNull<HTMLElement> => {
  const row = getRow(id)
  return row ? within(row).getByText(value) : null
}

// loading
const expectLoadingStarted = () => tableTestUtils.expectLoadingStarted(getContainer())
const expectLoadingFinished = () => tableTestUtils.expectLoadingFinished(getContainer())

export const testUtils = {
  getContainer,
  getRow,
  getColTitle,
  getColValue,

  expectLoadingStarted,
  expectLoadingFinished,
}

describe('Таблица оборудования по шаблону файла', () => {
  test('Отображается', () => {
    render(<EquipmentsByFileTable {...props} />)

    const table = testUtils.getContainer()
    expect(table).toBeInTheDocument()

    props.dataSource.forEach((item) => {
      const row = testUtils.getRow(item.rowId)
      expect(row).toBeInTheDocument()
    })
  })

  test('Колонка категория отображается', () => {
    render(<EquipmentsByFileTable {...props} />)

    const title = testUtils.getColTitle('Категория')
    const value = testUtils.getColValue(tableRow.rowId, tableRow.category!.title)

    expect(title).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  test('Колонка номенклатура отображается', () => {
    render(<EquipmentsByFileTable {...props} />)

    const title = testUtils.getColTitle('Номенклатура')
    const value = testUtils.getColValue(tableRow.rowId, tableRow.nomenclature!.title)

    expect(title).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  test('Колонка инв. № отображается', () => {
    render(<EquipmentsByFileTable {...props} />)

    const title = testUtils.getColTitle('Инв. №')
    const value = testUtils.getColValue(tableRow.rowId, tableRow.inventoryNumber!)

    expect(title).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  test('Колонка серийный № отображается', () => {
    render(<EquipmentsByFileTable {...props} />)

    const title = testUtils.getColTitle('Серийный №')
    const value = testUtils.getColValue(tableRow.rowId, tableRow.serialNumber!)

    expect(title).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  test('Колонка состояние отображается', () => {
    render(<EquipmentsByFileTable {...props} />)

    const title = testUtils.getColTitle('Состояние')
    const value = testUtils.getColValue(tableRow.rowId, equipmentConditionDict[tableRow.condition!])

    expect(title).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  test('Колонка стоимость отображается', () => {
    render(<EquipmentsByFileTable {...props} />)

    const title = testUtils.getColTitle('Стоимость')
    const value = testUtils.getColValue(tableRow.rowId, tableRow.price!)

    expect(title).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  test('Колонка валюта отображается', () => {
    render(<EquipmentsByFileTable {...props} />)

    const title = testUtils.getColTitle('Валюта')
    const value = testUtils.getColValue(tableRow.rowId, tableRow.currency!.title)

    expect(title).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  test('Колонка количество отображается', () => {
    render(<EquipmentsByFileTable {...props} />)

    const title = testUtils.getColTitle('Количество')
    const value = testUtils.getColValue(tableRow.rowId, tableRow.quantity!)

    expect(title).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  test('Колонка ед. изм. отображается', () => {
    render(<EquipmentsByFileTable {...props} />)

    const title = testUtils.getColTitle('Ед. изм.')
    const value = testUtils.getColValue(tableRow.rowId, tableRow.nomenclature!.measurementUnit)

    expect(title).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  test('Колонка новое отображается', () => {
    render(<EquipmentsByFileTable {...props} />)

    const title = testUtils.getColTitle('Новое')
    const value = within(testUtils.getRow(tableRow.rowId)).getAllByText(
      getYesNoWord(tableRow.isNew!),
    )[0]

    expect(title).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  test('Колонка на гарантии отображается', () => {
    render(<EquipmentsByFileTable {...props} />)

    const title = testUtils.getColTitle('На гарантии')
    const value = within(testUtils.getRow(tableRow.rowId)).getAllByText(
      getYesNoWord(tableRow.isWarranty!),
    )[1]

    expect(title).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  test('Колонка отремонтиров. отображается', () => {
    render(<EquipmentsByFileTable {...props} />)

    const title = testUtils.getColTitle('Отремонтиров.')
    const value = within(testUtils.getRow(tableRow.rowId)).getAllByText(
      getYesNoWord(tableRow.isRepaired!),
    )[2]

    expect(title).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  test('Колонка пробег отображается', () => {
    render(<EquipmentsByFileTable {...props} />)

    const title = testUtils.getColTitle('Пробег')
    const value = testUtils.getColValue(tableRow.rowId, tableRow.usageCounter!)

    expect(title).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  test('Колонка владелец отображается', () => {
    render(<EquipmentsByFileTable {...props} />)

    const title = testUtils.getColTitle('Владелец')
    const value = testUtils.getColValue(tableRow.rowId, tableRow.owner!.title)

    expect(title).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  test('Колонка назначение отображается', () => {
    render(<EquipmentsByFileTable {...props} />)

    const title = testUtils.getColTitle('Назначение')
    const value = testUtils.getColValue(tableRow.rowId, tableRow.purpose!.title)

    expect(title).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  test('Колонка комментарий отображается', () => {
    render(<EquipmentsByFileTable {...props} />)

    const title = testUtils.getColTitle('Комментарий')
    const value = testUtils.getColValue(tableRow.rowId, tableRow.comment!)

    expect(title).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })
})
