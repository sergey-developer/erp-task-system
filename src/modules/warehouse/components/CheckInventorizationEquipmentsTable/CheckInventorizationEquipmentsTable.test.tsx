import { EquipmentCategoryEnum } from 'modules/warehouse/constants/equipment'

import {
  props,
  tableRow,
} from '_tests_/features/inventorizationEquipments/CheckInventorizationEquipmentsTable/constants'
import { checkInventorizationEquipmentsTableTestUtils as testUtils } from '_tests_/features/inventorizationEquipments/CheckInventorizationEquipmentsTable/utils'
import { render } from '_tests_/utils'

import CheckInventorizationEquipmentsTable from './index'
import { CheckInventorizationEquipmentsTableRow } from './types'

describe('Таблица проверки оборудования по инвентаризации', () => {
  test('Отображается', () => {
    render(<CheckInventorizationEquipmentsTable {...props} />)

    const table = testUtils.getContainer()
    expect(table).toBeInTheDocument()

    props.dataSource.forEach((item) => {
      expect(testUtils.getRow(item.rowId)).toBeInTheDocument()
    })
  })

  test('Колонка "Наименование" отображается', () => {
    render(<CheckInventorizationEquipmentsTable {...props} />)

    const title = testUtils.getColTitle('Наименование')
    const value = testUtils.getColValue(tableRow.rowId, tableRow.title!)

    expect(title).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  describe('Колонка "Серийный № / Артикул"', () => {
    test('Отображает вендор код номенклатуры если категория расходный материал', () => {
      const row: CheckInventorizationEquipmentsTableRow = {
        ...tableRow,
        category: { ...tableRow.category!, code: EquipmentCategoryEnum.Consumable },
      }
      render(<CheckInventorizationEquipmentsTable {...props} dataSource={[row]} />)

      const title = testUtils.getColTitle('Серийный № / Артикул')
      const value = testUtils.getColValue(tableRow.rowId, tableRow.nomenclature!.vendorCode)

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('Отображает серийный номер если категория не расходный материал', () => {
      const row: CheckInventorizationEquipmentsTableRow = {
        ...tableRow,
        category: { ...tableRow.category!, code: EquipmentCategoryEnum.Equipment },
      }
      render(<CheckInventorizationEquipmentsTable {...props} dataSource={[row]} />)

      const title = testUtils.getColTitle('Серийный № / Артикул')
      const value = testUtils.getColValue(tableRow.rowId, tableRow.serialNumber!)

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })
  })

  test('Колонка "Инвентарный №" отображается', () => {
    render(<CheckInventorizationEquipmentsTable {...props} />)

    const title = testUtils.getColTitle('Инвентарный №')
    const value = testUtils.getColValue(tableRow.rowId, tableRow.inventoryNumber!)

    expect(title).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  test('Колонка "Наличие" отображается', () => {
    render(<CheckInventorizationEquipmentsTable {...props} />)

    const title = testUtils.getColTitle('Наличие')
    const value = testUtils.getColValue(tableRow.rowId, tableRow.quantityFact!)

    expect(title).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  test('Колонка "Фактическое местонахождение" отображается', () => {
    render(<CheckInventorizationEquipmentsTable {...props} />)

    const title = testUtils.getColTitle('Фактическое местонахождение')
    const value = testUtils.getColValue(tableRow.rowId, tableRow.locationFact!.title)

    expect(title).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })
})
