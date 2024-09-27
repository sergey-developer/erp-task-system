import { screen } from '@testing-library/react'

import { EquipmentCategoryEnum } from 'modules/warehouse/constants/equipment'

import {
  props,
  tableRow,
} from '_tests_/features/inventorizationEquipments/components/CheckInventorizationEquipmentsTable/constants'
import { checkInventorizationEquipmentsTableTestUtils as testUtils } from '_tests_/features/inventorizationEquipments/components/CheckInventorizationEquipmentsTable/testUtils'
import warehouseFixtures from '_tests_/fixtures/warehouse'
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

  describe('Колонка иконки isCredited', () => {
    test('Отображает зеленую галочку если поле isCredited=false и была попытка редактирования', () => {
      const tableRow = warehouseFixtures.checkInventorizationEquipmentsTableRow({
        isCredited: false,
      })

      render(
        <CheckInventorizationEquipmentsTable
          {...props}
          dataSource={[tableRow]}
          editTouchedRowsIds={[tableRow.rowId]}
        />,
      )

      const icon = testUtils.getIsCreditedIcon('check-circle')
      expect(icon).toBeInTheDocument()
    })

    test('При наведении на зеленую галочку отображается текст', async () => {
      const tableRow = warehouseFixtures.checkInventorizationEquipmentsTableRow({
        isCredited: false,
      })

      const { user } = render(
        <CheckInventorizationEquipmentsTable
          {...props}
          dataSource={[tableRow]}
          editTouchedRowsIds={[tableRow.rowId]}
        />,
      )

      const icon = testUtils.getIsCreditedIcon('check-circle')
      await user.hover(icon)
      const text = await screen.findByText(
        'Оборудование отсутствует и будет оприходовано. Проверьте заполнение обязательных параметров, нажав на карандаш',
      )
      expect(text).toBeInTheDocument()
    })

    test('Отображает восклицательный знак если поле isCredited=false и попытки редактирования не было', () => {
      const tableRow = warehouseFixtures.checkInventorizationEquipmentsTableRow({
        isCredited: false,
      })

      render(
        <CheckInventorizationEquipmentsTable
          {...props}
          dataSource={[tableRow]}
          editTouchedRowsIds={[]}
        />,
      )

      const icon = testUtils.getIsCreditedIcon('exclamation-circle')
      expect(icon).toBeInTheDocument()
    })

    test('При наведении на восклицательный знак отображается текст', async () => {
      const tableRow = warehouseFixtures.checkInventorizationEquipmentsTableRow({
        isCredited: false,
      })

      const { user } = render(
        <CheckInventorizationEquipmentsTable
          {...props}
          dataSource={[tableRow]}
          editTouchedRowsIds={[]}
        />,
      )

      const icon = testUtils.getIsCreditedIcon('exclamation-circle')
      await user.hover(icon)
      const text = await screen.findByText(
        'Оборудование отсутствует и будет оприходовано. Проверьте заполнение обязательных параметров, нажав на карандаш',
      )
      expect(text).toBeInTheDocument()
    })

    test('Никакая иконка не отображается если поле isCredited не false, даже если была попытка редактирования', () => {
      const tableRow = warehouseFixtures.checkInventorizationEquipmentsTableRow({
        isCredited: true,
      })

      render(
        <CheckInventorizationEquipmentsTable
          {...props}
          dataSource={[tableRow]}
          editTouchedRowsIds={[tableRow.rowId]}
        />,
      )

      const checkIcon = testUtils.queryIsCreditedIcon('check-circle')
      const exclamationIcon = testUtils.queryIsCreditedIcon('exclamation-circle')
      expect(checkIcon).not.toBeInTheDocument()
      expect(exclamationIcon).not.toBeInTheDocument()
    })
  })

  test('Колонка иконки редактирования отображается и при клике вызывается обработчик', async () => {
    const { user } = render(<CheckInventorizationEquipmentsTable {...props} />)

    const icon = testUtils.getEditIcon()
    expect(icon).toBeInTheDocument()

    await testUtils.clickEditIcon(user)
    expect(props.onClickEdit).toBeCalledTimes(1)
    expect(props.onClickEdit).toBeCalledWith(props.dataSource[0])
  })
})
