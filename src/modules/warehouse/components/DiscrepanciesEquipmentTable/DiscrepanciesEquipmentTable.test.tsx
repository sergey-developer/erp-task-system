import { makeString } from 'shared/utils/string'

import {
  ariaSortAttrAscValue,
  ariaSortAttrDescValue,
  ariaSortAttrName,
  columnWithSortingClass,
} from '_tests_/constants/components'
import {
  inventorizationEquipmentListItem,
  props,
} from '_tests_/features/warehouse/DiscrepanciesEquipmentTable/constants'
import { discrepanciesEquipmentTableTestUtils } from '_tests_/features/warehouse/DiscrepanciesEquipmentTable/testUtils'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import { render, tableTestUtils } from '_tests_/utils'

import DiscrepanciesEquipmentTable from './index'

afterEach(() => {
  const onChange = props.onChange as jest.Mock
  onChange.mockReset()
})

describe('Таблица инвентаризаций', () => {
  test('Отображается', () => {
    render(<DiscrepanciesEquipmentTable {...props} />)

    const table = discrepanciesEquipmentTableTestUtils.getContainer()

    expect(table).toBeInTheDocument()
    tableTestUtils.expectPaginationEnabledIn(table)

    props.dataSource.forEach((item) => {
      const row = discrepanciesEquipmentTableTestUtils.getRow(item.id)
      expect(row).toBeInTheDocument()
    })
  })

  test('Пагинация работает', async () => {
    const inventorizationEquipments = warehouseFixtures.inventorizationEquipments(11)

    const { user } = render(
      <DiscrepanciesEquipmentTable {...props} dataSource={inventorizationEquipments} />,
    )

    const table = discrepanciesEquipmentTableTestUtils.getContainer()
    await tableTestUtils.clickPaginationNextButtonIn(user, table)

    expect(props.onChange).toBeCalledTimes(1)
    expect(props.onChange).toBeCalledWith(
      expect.anything(),
      expect.anything(),
      expect.anything(),
      expect.anything(),
    )
    inventorizationEquipments.slice(-1).forEach((item) => {
      const row = discrepanciesEquipmentTableTestUtils.getRow(item.id)
      expect(row).toBeInTheDocument()
    })
  })

  test('Можно установить сортировку по умолчанию', () => {
    render(<DiscrepanciesEquipmentTable {...props} sort='-title' />)
    const headCell = discrepanciesEquipmentTableTestUtils.getHeadCell('Наименование')
    expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)
  })

  describe('Наименование', () => {
    test('Отображается', () => {
      render(<DiscrepanciesEquipmentTable {...props} />)

      const headCell = discrepanciesEquipmentTableTestUtils.getHeadCell('Наименование')
      const title = discrepanciesEquipmentTableTestUtils.getColTitle('Наименование')
      const value = discrepanciesEquipmentTableTestUtils.getColValue(
        inventorizationEquipmentListItem.id,
        makeString(
          ' ',
          inventorizationEquipmentListItem.equipment.title,
          inventorizationEquipmentListItem.equipment.serialNumber,
          inventorizationEquipmentListItem.equipment.inventoryNumber,
        ),
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
      expect(headCell).toHaveClass(columnWithSortingClass)
      expect(headCell).not.toHaveAttribute(ariaSortAttrName)
    })

    test('Сортировка работает', async () => {
      const { user } = render(<DiscrepanciesEquipmentTable {...props} />)

      await discrepanciesEquipmentTableTestUtils.clickColTitle(user, 'Наименование')
      const headCell = discrepanciesEquipmentTableTestUtils.getHeadCell('Наименование')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

      await discrepanciesEquipmentTableTestUtils.clickColTitle(user, 'Наименование')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)
      await discrepanciesEquipmentTableTestUtils.clickColTitle(user, 'Наименование')

      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)
      expect(props.onChange).toBeCalledTimes(3)
      expect(props.onChange).toBeCalledWith(
        expect.anything(),
        expect.anything(),
        expect.anything(),
        expect.anything(),
      )
      props.dataSource.forEach((item) => {
        const row = discrepanciesEquipmentTableTestUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })
  })

  describe('Плановое местонахождение', () => {
    test('Отображается', () => {
      render(<DiscrepanciesEquipmentTable {...props} />)

      const headCell = discrepanciesEquipmentTableTestUtils.getHeadCell('Плановое местонахождение')
      const title = discrepanciesEquipmentTableTestUtils.getColTitle('Плановое местонахождение')
      const value = discrepanciesEquipmentTableTestUtils.getColValue(
        inventorizationEquipmentListItem.id,
        inventorizationEquipmentListItem.locationPlan!.title,
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
      expect(headCell).toHaveClass(columnWithSortingClass)
      expect(headCell).not.toHaveAttribute(ariaSortAttrName)
    })

    test('Сортировка работает', async () => {
      const { user } = render(<DiscrepanciesEquipmentTable {...props} />)

      await discrepanciesEquipmentTableTestUtils.clickColTitle(user, 'Плановое местонахождение')
      const headCell = discrepanciesEquipmentTableTestUtils.getHeadCell('Плановое местонахождение')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

      await discrepanciesEquipmentTableTestUtils.clickColTitle(user, 'Плановое местонахождение')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)
      await discrepanciesEquipmentTableTestUtils.clickColTitle(user, 'Плановое местонахождение')

      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)
      expect(props.onChange).toBeCalledTimes(3)
      expect(props.onChange).toBeCalledWith(
        expect.anything(),
        expect.anything(),
        expect.anything(),
        expect.anything(),
      )
      props.dataSource.forEach((item) => {
        const row = discrepanciesEquipmentTableTestUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })
  })

  describe('Фактическое местонахождение', () => {
    test('Отображается', () => {
      render(<DiscrepanciesEquipmentTable {...props} />)

      const headCell = discrepanciesEquipmentTableTestUtils.getHeadCell(
        'Фактическое местонахождение',
      )
      const title = discrepanciesEquipmentTableTestUtils.getColTitle('Фактическое местонахождение')
      const value = discrepanciesEquipmentTableTestUtils.getColValue(
        inventorizationEquipmentListItem.id,
        inventorizationEquipmentListItem.locationFact!.title,
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
      expect(headCell).toHaveClass(columnWithSortingClass)
      expect(headCell).not.toHaveAttribute(ariaSortAttrName)
    })

    test('Сортировка работает', async () => {
      const { user } = render(<DiscrepanciesEquipmentTable {...props} />)

      await discrepanciesEquipmentTableTestUtils.clickColTitle(user, 'Фактическое местонахождение')
      let headCell = discrepanciesEquipmentTableTestUtils.getHeadCell('Фактическое местонахождение')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

      await discrepanciesEquipmentTableTestUtils.clickColTitle(user, 'Фактическое местонахождение')
      headCell = discrepanciesEquipmentTableTestUtils.getHeadCell('Фактическое местонахождение')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      await discrepanciesEquipmentTableTestUtils.clickColTitle(user, 'Фактическое местонахождение')
      headCell = discrepanciesEquipmentTableTestUtils.getHeadCell('Фактическое местонахождение')

      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)
      expect(props.onChange).toBeCalledTimes(3)
      expect(props.onChange).toBeCalledWith(
        expect.anything(),
        expect.anything(),
        expect.anything(),
        expect.anything(),
      )
      props.dataSource.forEach((item) => {
        const row = discrepanciesEquipmentTableTestUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })
  })

  describe('Расхождение', () => {
    test('Отображается', () => {
      render(<DiscrepanciesEquipmentTable {...props} />)

      const headCell = discrepanciesEquipmentTableTestUtils.getHeadCell('Расхождение')
      const title = discrepanciesEquipmentTableTestUtils.getColTitle('Расхождение')
      const value = discrepanciesEquipmentTableTestUtils.getColValue(
        inventorizationEquipmentListItem.id,
        inventorizationEquipmentListItem.quantity.diff!,
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
      expect(headCell).toHaveClass(columnWithSortingClass)
      expect(headCell).not.toHaveAttribute(ariaSortAttrName)
    })

    test('Сортировка работает', async () => {
      const { user } = render(<DiscrepanciesEquipmentTable {...props} />)

      await discrepanciesEquipmentTableTestUtils.clickColTitle(user, 'Расхождение')
      let headCell = discrepanciesEquipmentTableTestUtils.getHeadCell('Расхождение')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

      await discrepanciesEquipmentTableTestUtils.clickColTitle(user, 'Расхождение')
      headCell = discrepanciesEquipmentTableTestUtils.getHeadCell('Расхождение')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      await discrepanciesEquipmentTableTestUtils.clickColTitle(user, 'Расхождение')
      headCell = discrepanciesEquipmentTableTestUtils.getHeadCell('Расхождение')

      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)
      props.dataSource.forEach((item) => {
        const row = discrepanciesEquipmentTableTestUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
      expect(props.onChange).toBeCalledTimes(3)
      expect(props.onChange).toBeCalledWith(
        expect.anything(),
        expect.anything(),
        expect.anything(),
        expect.anything(),
      )
    })
  })
})
