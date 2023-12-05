import { screen, within } from '@testing-library/react'

import { equipmentConditionDict } from 'modules/warehouse/constants/equipment'

import { IdType } from 'shared/types/common'
import { MaybeNull, NumberOrString } from 'shared/types/utils'
import { getYesNoWord } from 'shared/utils/common'

import warehouseFixtures from '_tests_/fixtures/warehouse'
import { render, tableTestUtils } from '_tests_/utils'

import EquipmentsByFileTemplateTable from './index'
import { EquipmentsByFileTemplateTableProps } from './types'

const equipmentByFileTemplate = warehouseFixtures.equipmentByFileTemplate()

const props: Readonly<EquipmentsByFileTemplateTableProps> = {
  dataSource: [equipmentByFileTemplate],
}

const getContainer = () => screen.getByTestId('equipments-by-file-template-table')
const getRow = (id: IdType) => tableTestUtils.getRowIn(getContainer(), id)
const getColTitle = (text: string) => within(getContainer()).getByText(text)
const getColValue = (id: IdType, value: NumberOrString): MaybeNull<HTMLElement> => {
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
    render(<EquipmentsByFileTemplateTable {...props} />)

    const table = testUtils.getContainer()
    expect(table).toBeInTheDocument()

    props.dataSource.forEach((item) => {
      const row = testUtils.getRow(item.id)
      expect(row).toBeInTheDocument()
    })
  })

  test('Колонка категория отображается', () => {
    render(<EquipmentsByFileTemplateTable {...props} />)

    const title = testUtils.getColTitle('Категория')
    const value = testUtils.getColValue(
      equipmentByFileTemplate.id,
      equipmentByFileTemplate.category!.title,
    )

    expect(title).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  test('Колонка номенклатура отображается', () => {
    render(<EquipmentsByFileTemplateTable {...props} />)

    const title = testUtils.getColTitle('Номенклатура')
    const value = testUtils.getColValue(
      equipmentByFileTemplate.id,
      equipmentByFileTemplate.nomenclature!.title,
    )

    expect(title).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  test('Колонка инв. № отображается', () => {
    render(<EquipmentsByFileTemplateTable {...props} />)

    const title = testUtils.getColTitle('Инв. №')
    const value = testUtils.getColValue(
      equipmentByFileTemplate.id,
      equipmentByFileTemplate.inventoryNumber!,
    )

    expect(title).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  test('Колонка серийный № отображается', () => {
    render(<EquipmentsByFileTemplateTable {...props} />)

    const title = testUtils.getColTitle('Серийный №')
    const value = testUtils.getColValue(
      equipmentByFileTemplate.id,
      equipmentByFileTemplate.serialNumber!,
    )

    expect(title).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  test('Колонка состояние отображается', () => {
    render(<EquipmentsByFileTemplateTable {...props} />)

    const title = testUtils.getColTitle('Состояние')
    const value = testUtils.getColValue(
      equipmentByFileTemplate.id,
      equipmentConditionDict[equipmentByFileTemplate.condition!],
    )

    expect(title).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  test('Колонка стоимость отображается', () => {
    render(<EquipmentsByFileTemplateTable {...props} />)

    const title = testUtils.getColTitle('Стоимость')
    const value = testUtils.getColValue(equipmentByFileTemplate.id, equipmentByFileTemplate.price!)

    expect(title).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  test('Колонка валюта отображается', () => {
    render(<EquipmentsByFileTemplateTable {...props} />)

    const title = testUtils.getColTitle('Валюта')
    const value = testUtils.getColValue(
      equipmentByFileTemplate.id,
      equipmentByFileTemplate.currency!.title,
    )

    expect(title).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  test('Колонка количество отображается', () => {
    render(<EquipmentsByFileTemplateTable {...props} />)

    const title = testUtils.getColTitle('Количество')
    const value = testUtils.getColValue(
      equipmentByFileTemplate.id,
      equipmentByFileTemplate.quantity!,
    )

    expect(title).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  test('Колонка ед. изм. отображается', () => {
    render(<EquipmentsByFileTemplateTable {...props} />)

    const title = testUtils.getColTitle('Ед. изм.')
    const value = testUtils.getColValue(
      equipmentByFileTemplate.id,
      equipmentByFileTemplate.nomenclature!.measurementUnit,
    )

    expect(title).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  test('Колонка новое отображается', () => {
    render(<EquipmentsByFileTemplateTable {...props} />)

    const title = testUtils.getColTitle('Новое')
    const value = within(testUtils.getRow(equipmentByFileTemplate.id)).getAllByText(
      getYesNoWord(equipmentByFileTemplate.isNew!),
    )[0]

    expect(title).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  test('Колонка на гарантии отображается', () => {
    render(<EquipmentsByFileTemplateTable {...props} />)

    const title = testUtils.getColTitle('На гарантии')
    const value = within(testUtils.getRow(equipmentByFileTemplate.id)).getAllByText(
      getYesNoWord(equipmentByFileTemplate.isWarranty!),
    )[1]

    expect(title).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  test('Колонка отремонтиров. отображается', () => {
    render(<EquipmentsByFileTemplateTable {...props} />)

    const title = testUtils.getColTitle('Отремонтиров.')
    const value = within(testUtils.getRow(equipmentByFileTemplate.id)).getAllByText(
      getYesNoWord(equipmentByFileTemplate.isRepaired!),
    )[2]

    expect(title).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  test('Колонка пробег отображается', () => {
    render(<EquipmentsByFileTemplateTable {...props} />)

    const title = testUtils.getColTitle('Пробег')
    const value = testUtils.getColValue(
      equipmentByFileTemplate.id,
      equipmentByFileTemplate.usageCounter!,
    )

    expect(title).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  test('Колонка владелец отображается', () => {
    render(<EquipmentsByFileTemplateTable {...props} />)

    const title = testUtils.getColTitle('Владелец')
    const value = testUtils.getColValue(
      equipmentByFileTemplate.id,
      equipmentByFileTemplate.owner!.title,
    )

    expect(title).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  test('Колонка назначение отображается', () => {
    render(<EquipmentsByFileTemplateTable {...props} />)

    const title = testUtils.getColTitle('Назначение')
    const value = testUtils.getColValue(
      equipmentByFileTemplate.id,
      equipmentByFileTemplate.purpose!.title,
    )

    expect(title).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  test('Колонка комментарий отображается', () => {
    render(<EquipmentsByFileTemplateTable {...props} />)

    const title = testUtils.getColTitle('Комментарий')
    const value = testUtils.getColValue(
      equipmentByFileTemplate.id,
      equipmentByFileTemplate.comment!,
    )

    expect(title).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })
})
