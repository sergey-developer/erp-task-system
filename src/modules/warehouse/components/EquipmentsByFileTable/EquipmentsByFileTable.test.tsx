import { screen, within } from '@testing-library/react'

import { equipmentConditionDict } from 'modules/warehouse/constants/equipment'

import { MaybeNull, NumberOrString } from 'shared/types/utils'
import { getYesNoWord } from 'shared/utils/common'

import warehouseFixtures from '_tests_/fixtures/warehouse'
import { render, tableTestUtils } from '_tests_/utils'

import EquipmentsByFileTable from './index'
import { EquipmentsByFileTableProps } from './types'

const importedEquipmentByFile = warehouseFixtures.importedEquipmentByFile()

const props: Readonly<EquipmentsByFileTableProps> = {
  dataSource: [importedEquipmentByFile],
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
    const value = testUtils.getColValue(
      importedEquipmentByFile.rowId,
      importedEquipmentByFile.category!.title,
    )

    expect(title).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  test('Колонка номенклатура отображается', () => {
    render(<EquipmentsByFileTable {...props} />)

    const title = testUtils.getColTitle('Номенклатура')
    const value = testUtils.getColValue(
      importedEquipmentByFile.rowId,
      importedEquipmentByFile.nomenclature!.title,
    )

    expect(title).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  test('Колонка инв. № отображается', () => {
    render(<EquipmentsByFileTable {...props} />)

    const title = testUtils.getColTitle('Инв. №')
    const value = testUtils.getColValue(
      importedEquipmentByFile.rowId,
      importedEquipmentByFile.customerInventoryNumber!,
    )

    expect(title).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  test('Колонка серийный № отображается', () => {
    render(<EquipmentsByFileTable {...props} />)

    const title = testUtils.getColTitle('Серийный №')
    const value = testUtils.getColValue(
      importedEquipmentByFile.rowId,
      importedEquipmentByFile.serialNumber!,
    )

    expect(title).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  test('Колонка состояние отображается', () => {
    render(<EquipmentsByFileTable {...props} />)

    const title = testUtils.getColTitle('Состояние')
    const value = testUtils.getColValue(
      importedEquipmentByFile.rowId,
      equipmentConditionDict[importedEquipmentByFile.condition!],
    )

    expect(title).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  test('Колонка стоимость отображается', () => {
    render(<EquipmentsByFileTable {...props} />)

    const title = testUtils.getColTitle('Стоимость')
    const value = testUtils.getColValue(
      importedEquipmentByFile.rowId,
      importedEquipmentByFile.price!,
    )

    expect(title).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  test('Колонка валюта отображается', () => {
    render(<EquipmentsByFileTable {...props} />)

    const title = testUtils.getColTitle('Валюта')
    const value = testUtils.getColValue(
      importedEquipmentByFile.rowId,
      importedEquipmentByFile.currency!.title,
    )

    expect(title).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  test('Колонка количество отображается', () => {
    render(<EquipmentsByFileTable {...props} />)

    const title = testUtils.getColTitle('Количество')
    const value = testUtils.getColValue(
      importedEquipmentByFile.rowId,
      importedEquipmentByFile.quantity!,
    )

    expect(title).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  test('Колонка ед. изм. отображается', () => {
    render(<EquipmentsByFileTable {...props} />)

    const title = testUtils.getColTitle('Ед. изм.')
    const value = testUtils.getColValue(
      importedEquipmentByFile.rowId,
      importedEquipmentByFile.nomenclature!.measurementUnit,
    )

    expect(title).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  test('Колонка новое отображается', () => {
    render(<EquipmentsByFileTable {...props} />)

    const title = testUtils.getColTitle('Новое')
    const value = within(testUtils.getRow(importedEquipmentByFile.rowId)).getAllByText(
      getYesNoWord(importedEquipmentByFile.isNew!),
    )[0]

    expect(title).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  test('Колонка на гарантии отображается', () => {
    render(<EquipmentsByFileTable {...props} />)

    const title = testUtils.getColTitle('На гарантии')
    const value = within(testUtils.getRow(importedEquipmentByFile.rowId)).getAllByText(
      getYesNoWord(importedEquipmentByFile.isWarranty!),
    )[1]

    expect(title).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  test('Колонка отремонтиров. отображается', () => {
    render(<EquipmentsByFileTable {...props} />)

    const title = testUtils.getColTitle('Отремонтиров.')
    const value = within(testUtils.getRow(importedEquipmentByFile.rowId)).getAllByText(
      getYesNoWord(importedEquipmentByFile.isRepaired!),
    )[2]

    expect(title).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  test('Колонка пробег отображается', () => {
    render(<EquipmentsByFileTable {...props} />)

    const title = testUtils.getColTitle('Пробег')
    const value = testUtils.getColValue(
      importedEquipmentByFile.rowId,
      importedEquipmentByFile.usageCounter!,
    )

    expect(title).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  test('Колонка владелец отображается', () => {
    render(<EquipmentsByFileTable {...props} />)

    const title = testUtils.getColTitle('Владелец')
    const value = testUtils.getColValue(
      importedEquipmentByFile.rowId,
      importedEquipmentByFile.owner!.title,
    )

    expect(title).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  test('Колонка назначение отображается', () => {
    render(<EquipmentsByFileTable {...props} />)

    const title = testUtils.getColTitle('Назначение')
    const value = testUtils.getColValue(
      importedEquipmentByFile.rowId,
      importedEquipmentByFile.purpose!.title,
    )

    expect(title).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  test('Колонка комментарий отображается', () => {
    render(<EquipmentsByFileTable {...props} />)

    const title = testUtils.getColTitle('Комментарий')
    const value = testUtils.getColValue(
      importedEquipmentByFile.rowId,
      importedEquipmentByFile.comment!,
    )

    expect(title).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })
})
