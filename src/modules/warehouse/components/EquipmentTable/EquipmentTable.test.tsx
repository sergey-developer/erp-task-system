import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { equipmentConditionDict } from 'modules/warehouse/constants'

import { MaybeNull, NumberOrString } from 'shared/types/utils'

import warehouseFixtures from 'fixtures/warehouse'

import { render, tableTestUtils } from '_tests_/utils'

import EquipmentTable from './index'
import { EquipmentTableProps } from './types'

const equipmentListItem = warehouseFixtures.equipmentListItem()

const props: Readonly<EquipmentTableProps> = {
  dataSource: [equipmentListItem],
  pagination: {},
  loading: false,
  onChange: jest.fn(),
  onRow: jest.fn(),
}

const getContainer = () => screen.getByTestId('equipment-table')

const getRow = (id: number) => tableTestUtils.getRowIn(getContainer(), id)

const clickRow = async (user: UserEvent, id: number) =>
  tableTestUtils.clickRowIn(getContainer(), user, id)

const getColTitle = (text: string) => within(getContainer()).getByText(text)

const getColValue = (
  id: number,
  value: NumberOrString,
): MaybeNull<HTMLElement> => {
  const row = getRow(id)
  return row ? within(row).getByText(value) : null
}

// loading
const expectLoadingStarted = () =>
  tableTestUtils.expectLoadingStarted(getContainer())

const expectLoadingFinished = async (): Promise<HTMLElement> => {
  const container = getContainer()
  await tableTestUtils.expectLoadingFinished(container)
  return container
}

export const testUtils = {
  getContainer,
  getRow,
  clickRow,
  getColTitle,
  getColValue,

  expectLoadingStarted,
  expectLoadingFinished,
}

afterEach(() => {
  const onRow = props.onRow as jest.Mock
  const onChange = props.onChange as jest.Mock

  onRow.mockReset()
  onChange.mockReset()
})

describe('Таблица оборудования', () => {
  test('Отображается корректно', () => {
    render(<EquipmentTable {...props} />)

    const table = testUtils.getContainer()

    expect(table).toBeInTheDocument()
    tableTestUtils.expectPaginationEnabledIn(table)

    props.dataSource.forEach((item) => {
      const row = testUtils.getRow(item.id)
      expect(row).toBeInTheDocument()
    })
  })

  test('Пагинация работает', async () => {
    const equipmentList = warehouseFixtures.equipmentList(11)

    const { user } = render(
      <EquipmentTable {...props} dataSource={equipmentList} />,
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
    equipmentList.slice(-1).forEach((item) => {
      const row = testUtils.getRow(item.id)
      expect(row).toBeInTheDocument()
    })
  })

  test('При клике на строку обработчик вызывается корректно', async () => {
    const { user } = render(<EquipmentTable {...props} />)

    await testUtils.clickRow(user, props.dataSource[0].id)
    expect(props.onRow).toBeCalledTimes(1)
  })

  describe('Наименование', () => {
    test('Отображается', () => {
      render(<EquipmentTable {...props} />)

      const title = testUtils.getColTitle('Наименование')
      const value = testUtils.getColValue(
        equipmentListItem.id,
        equipmentListItem.title,
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })
  })

  describe('Серийный номер', () => {
    test('Отображается', () => {
      render(<EquipmentTable {...props} />)

      const title = testUtils.getColTitle('Серийный номер')
      const value = testUtils.getColValue(
        equipmentListItem.id,
        equipmentListItem.serialNumber!,
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })
  })

  describe('Инвентарный номер', () => {
    test('Отображается', () => {
      render(<EquipmentTable {...props} />)

      const title = testUtils.getColTitle('Инвентарный номер')
      const value = testUtils.getColValue(
        equipmentListItem.id,
        equipmentListItem.inventoryNumber!,
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })
  })

  describe('Склад', () => {
    test('Отображается', () => {
      render(<EquipmentTable {...props} />)

      const title = testUtils.getColTitle('Склад')
      const value = testUtils.getColValue(
        equipmentListItem.id,
        equipmentListItem.warehouse!.title,
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })
  })

  describe('Состояние', () => {
    test('Отображается', () => {
      render(<EquipmentTable {...props} />)

      const title = testUtils.getColTitle('Состояние')
      const value = testUtils.getColValue(
        equipmentListItem.id,
        equipmentConditionDict[equipmentListItem.condition],
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })
  })

  describe('Количество', () => {
    test('Отображается', () => {
      render(<EquipmentTable {...props} />)

      const title = testUtils.getColTitle('Количество')
      const value = testUtils.getColValue(
        equipmentListItem.id,
        equipmentListItem.quantity,
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })
  })

  describe('Категория', () => {
    test('Отображается', () => {
      render(<EquipmentTable {...props} />)

      const title = testUtils.getColTitle('Категория')
      const value = testUtils.getColValue(
        equipmentListItem.id,
        equipmentListItem.category.title,
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })
  })

  describe('Назначение', () => {
    test('Отображается', () => {
      render(<EquipmentTable {...props} />)

      const title = testUtils.getColTitle('Назначение')
      const value = testUtils.getColValue(
        equipmentListItem.id,
        equipmentListItem.purpose.title,
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })
  })
})
