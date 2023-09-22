import { screen, within } from '@testing-library/react'

import { equipmentConditionDict } from 'modules/warehouse/constants/equipment'

import { IdType } from 'shared/types/common'
import { MaybeNull, NumberOrString } from 'shared/types/utils'

import warehouseFixtures from '_tests_/fixtures/warehouse'
import { render, tableTestUtils } from '_tests_/utils'

import RelocationEquipmentTable from './index'
import { RelocationEquipmentTableProps } from './types'

const relocationEquipmentListItem = warehouseFixtures.relocationEquipmentListItem()

const props: Readonly<RelocationEquipmentTableProps> = {
  dataSource: [relocationEquipmentListItem],
  pagination: {},
  loading: false,
  onChange: jest.fn(),
}

const getContainer = () => screen.getByTestId('relocation-equipment-table')

const getRow = (id: IdType) => tableTestUtils.getRowIn(getContainer(), id)

const getHeadCell = (text: string) => tableTestUtils.getHeadCell(getContainer(), text)

const getColTitle = (text: string) => within(getContainer()).getByText(text)

const getColValue = (id: IdType, value: NumberOrString): MaybeNull<HTMLElement> => {
  const row = getRow(id)
  return row ? within(row).getByText(value) : null
}

// loading
const expectLoadingStarted = () => tableTestUtils.expectLoadingStarted(getContainer())

const expectLoadingFinished = async (): Promise<HTMLElement> => {
  const container = getContainer()
  await tableTestUtils.expectLoadingFinished(container)
  return container
}

export const testUtils = {
  getContainer,
  getRow,
  getHeadCell,
  getColTitle,
  getColValue,

  expectLoadingStarted,
  expectLoadingFinished,
}

afterEach(() => {
  const onChange = props.onChange as jest.Mock

  onChange.mockReset()
})

describe('Таблица перечня оборудования заявки на перемещение оборудования', () => {
  test('Отображается корректно', () => {
    render(<RelocationEquipmentTable {...props} />)

    const table = testUtils.getContainer()

    expect(table).toBeInTheDocument()
    tableTestUtils.expectPaginationEnabledIn(table)

    props.dataSource.forEach((item) => {
      const row = testUtils.getRow(item.id)
      expect(row).toBeInTheDocument()
    })
  })

  test('Пагинация работает', async () => {
    const relocationEquipmentList = warehouseFixtures.relocationEquipmentList(11)

    const { user } = render(
      <RelocationEquipmentTable {...props} dataSource={relocationEquipmentList} />,
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
    relocationEquipmentList.slice(-1).forEach((item) => {
      const row = testUtils.getRow(item.id)
      expect(row).toBeInTheDocument()
    })
  })

  describe('Оборудование', () => {
    test('Отображается корректно', () => {
      render(<RelocationEquipmentTable {...props} />)

      const title = testUtils.getColTitle('Оборудование')
      const value = testUtils.getColValue(
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

      const title = testUtils.getColTitle('Серийный номер')
      const value = testUtils.getColValue(
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

      const title = testUtils.getColTitle('Назначение')
      const value = testUtils.getColValue(
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

      const title = testUtils.getColTitle('Состояние')
      const value = testUtils.getColValue(
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

      const title = testUtils.getColTitle('Количество')
      const value = testUtils.getColValue(
        relocationEquipmentListItem.id,
        relocationEquipmentListItem.quantity,
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })
  })
})
