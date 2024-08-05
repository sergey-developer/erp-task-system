import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { IdType } from 'shared/types/common'
import { MaybeNull, NumberOrString } from 'shared/types/utils'
import { makeString } from 'shared/utils/string'

import {
  ariaSortAttrAscValue,
  ariaSortAttrDescValue,
  ariaSortAttrName,
  columnWithSortingClass,
} from '_tests_/constants/components'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import { render, tableTestUtils } from '_tests_/utils'

import DiscrepanciesEquipmentTable from './index'
import { DiscrepanciesEquipmentTableProps } from './types'

const inventorizationEquipmentListItem = warehouseFixtures.inventorizationEquipmentListItem()

const props: Readonly<DiscrepanciesEquipmentTableProps> = {
  dataSource: [inventorizationEquipmentListItem],
  pagination: {},
  loading: false,
  onChange: jest.fn(),
  sort: undefined,
}

const getContainer = () => screen.getByTestId('discrepancies-equipment-table')

const getRow = (id: IdType) => tableTestUtils.getRowById(getContainer(), id)

const clickRow = async (user: UserEvent, id: IdType) =>
  tableTestUtils.clickRowIn(getContainer(), user, id)

const getHeadCell = (text: string) => tableTestUtils.getHeadCell(getContainer(), text)
const getColTitle = (text: string) => within(getContainer()).getByText(text)

const getColValue = (id: IdType, value: NumberOrString): MaybeNull<HTMLElement> => {
  const row = getRow(id)
  return row ? within(row).getByText(value) : null
}

const clickColTitle = async (user: UserEvent, title: string) => {
  const col = getColTitle(title)
  await user.click(col)
}

// loading
const expectLoadingStarted = () => tableTestUtils.expectLoadingStarted(getContainer())
const expectLoadingFinished = () => tableTestUtils.expectLoadingFinished(getContainer())

export const testUtils = {
  getContainer,
  getRow,
  clickRow,
  getHeadCell,
  getColTitle,
  getColValue,
  clickColTitle,

  expectLoadingStarted,
  expectLoadingFinished,
}

afterEach(() => {
  const onChange = props.onChange as jest.Mock
  onChange.mockReset()
})

describe('Таблица инвентаризаций', () => {
  test('Отображается', () => {
    render(<DiscrepanciesEquipmentTable {...props} />)

    const table = testUtils.getContainer()

    expect(table).toBeInTheDocument()
    tableTestUtils.expectPaginationEnabledIn(table)

    props.dataSource.forEach((item) => {
      const row = testUtils.getRow(item.id)
      expect(row).toBeInTheDocument()
    })
  })

  test('Пагинация работает', async () => {
    const inventorizationEquipments = warehouseFixtures.inventorizationEquipments(11)

    const { user } = render(
      <DiscrepanciesEquipmentTable {...props} dataSource={inventorizationEquipments} />,
    )

    const table = testUtils.getContainer()
    await tableTestUtils.clickPaginationNextButtonIn(user, table)

    expect(props.onChange).toBeCalledTimes(1)
    expect(props.onChange).toBeCalledWith(
      expect.anything(),
      expect.anything(),
      expect.anything(),
      expect.anything(),
    )
    inventorizationEquipments.slice(-1).forEach((item) => {
      const row = testUtils.getRow(item.id)
      expect(row).toBeInTheDocument()
    })
  })

  test('Можно установить сортировку по умолчанию', () => {
    render(<DiscrepanciesEquipmentTable {...props} sort='-title' />)
    const headCell = testUtils.getHeadCell('Наименование')
    expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)
  })

  describe('Наименование', () => {
    test('Отображается', () => {
      render(<DiscrepanciesEquipmentTable {...props} />)

      const headCell = testUtils.getHeadCell('Наименование')
      const title = testUtils.getColTitle('Наименование')
      const value = testUtils.getColValue(
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

      await testUtils.clickColTitle(user, 'Наименование')
      const headCell = testUtils.getHeadCell('Наименование')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

      await testUtils.clickColTitle(user, 'Наименование')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)
      await testUtils.clickColTitle(user, 'Наименование')

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
        const row = testUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })
  })

  describe('Плановое местонахождение', () => {
    test('Отображается', () => {
      render(<DiscrepanciesEquipmentTable {...props} />)

      const headCell = testUtils.getHeadCell('Плановое местонахождение')
      const title = testUtils.getColTitle('Плановое местонахождение')
      const value = testUtils.getColValue(
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

      await testUtils.clickColTitle(user, 'Плановое местонахождение')
      const headCell = testUtils.getHeadCell('Плановое местонахождение')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

      await testUtils.clickColTitle(user, 'Плановое местонахождение')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)
      await testUtils.clickColTitle(user, 'Плановое местонахождение')

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
        const row = testUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })
  })

  describe('Фактическое местонахождение', () => {
    test('Отображается', () => {
      render(<DiscrepanciesEquipmentTable {...props} />)

      const headCell = testUtils.getHeadCell('Фактическое местонахождение')
      const title = testUtils.getColTitle('Фактическое местонахождение')
      const value = testUtils.getColValue(
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

      await testUtils.clickColTitle(user, 'Фактическое местонахождение')
      let headCell = testUtils.getHeadCell('Фактическое местонахождение')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

      await testUtils.clickColTitle(user, 'Фактическое местонахождение')
      headCell = testUtils.getHeadCell('Фактическое местонахождение')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      await testUtils.clickColTitle(user, 'Фактическое местонахождение')
      headCell = testUtils.getHeadCell('Фактическое местонахождение')

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
        const row = testUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })
  })

  describe('Расхождение', () => {
    test('Отображается', () => {
      render(<DiscrepanciesEquipmentTable {...props} />)

      const headCell = testUtils.getHeadCell('Расхождение')
      const title = testUtils.getColTitle('Расхождение')
      const value = testUtils.getColValue(
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

      await testUtils.clickColTitle(user, 'Расхождение')
      let headCell = testUtils.getHeadCell('Расхождение')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

      await testUtils.clickColTitle(user, 'Расхождение')
      headCell = testUtils.getHeadCell('Расхождение')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      await testUtils.clickColTitle(user, 'Расхождение')
      headCell = testUtils.getHeadCell('Расхождение')

      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)
      props.dataSource.forEach((item) => {
        const row = testUtils.getRow(item.id)
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
