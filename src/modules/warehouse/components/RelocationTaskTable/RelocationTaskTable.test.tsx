import { screen, within } from '@testing-library/react'

import { relocationTaskStatusDict } from 'modules/warehouse/constants/relocationTask'

import { IdType } from 'shared/types/common'
import { MaybeNull, NumberOrString } from 'shared/types/utils'
import { formatDate } from 'shared/utils/date'

import warehouseFixtures from '_tests_/fixtures/warehouse'
import { render, tableTestUtils } from '_tests_/utils'

import EquipmentNomenclatureTable from './index'
import { RelocationTaskTableProps } from './types'

const relocationTaskListItem = warehouseFixtures.relocationTaskListItem()

const props: Readonly<RelocationTaskTableProps> = {
  dataSource: [relocationTaskListItem],
  pagination: {},
  loading: false,
  onChange: jest.fn(),
}

const getContainer = () => screen.getByTestId('relocation-task-table')

const getRow = (id: IdType) => tableTestUtils.getRowIn(getContainer(), id)

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
  getColTitle,
  getColValue,

  expectLoadingStarted,
  expectLoadingFinished,
}

afterEach(() => {
  const onChange = props.onChange as jest.Mock
  onChange.mockReset()
})

describe('Таблица заявок на перемещение оборудования', () => {
  test('Отображается корректно', () => {
    render(<EquipmentNomenclatureTable {...props} />)

    const table = testUtils.getContainer()

    expect(table).toBeInTheDocument()
    tableTestUtils.expectPaginationEnabledIn(table)

    props.dataSource.forEach((item) => {
      const row = testUtils.getRow(item.id)
      expect(row).toBeInTheDocument()
    })
  })

  test('Пагинация работает', async () => {
    const relocationTaskList = warehouseFixtures.relocationTaskList(11)

    const { user } = render(
      <EquipmentNomenclatureTable {...props} dataSource={relocationTaskList} />,
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
    relocationTaskList.slice(-1).forEach((item) => {
      const row = testUtils.getRow(item.id)
      expect(row).toBeInTheDocument()
    })
  })

  describe('Срок выполнения', () => {
    test('Отображается корректно', () => {
      render(<EquipmentNomenclatureTable {...props} />)

      const title = testUtils.getColTitle('Срок выполнения')
      const value = testUtils.getColValue(
        relocationTaskListItem.id,
        formatDate(relocationTaskListItem.deadlineAt),
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })
  })

  describe('Объект выбытия', () => {
    test('Отображается корректно', () => {
      render(<EquipmentNomenclatureTable {...props} />)

      const title = testUtils.getColTitle('Объект выбытия')
      const value = testUtils.getColValue(
        relocationTaskListItem.id,
        relocationTaskListItem.relocateFrom!.title,
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })
  })

  describe('Объект прибытия', () => {
    test('Отображается корректно', () => {
      render(<EquipmentNomenclatureTable {...props} />)

      const title = testUtils.getColTitle('Объект прибытия')
      const value = testUtils.getColValue(
        relocationTaskListItem.id,
        relocationTaskListItem.relocateTo!.title,
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })
  })

  describe('Исполнитель', () => {
    test('Отображается корректно', () => {
      render(<EquipmentNomenclatureTable {...props} />)

      const title = testUtils.getColTitle('Исполнитель')
      const value = testUtils.getColValue(
        relocationTaskListItem.id,
        relocationTaskListItem.executor!.fullName,
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })
  })

  describe('Статус', () => {
    test('Отображается корректно', () => {
      render(<EquipmentNomenclatureTable {...props} />)

      const title = testUtils.getColTitle('Статус')
      const value = testUtils.getColValue(
        relocationTaskListItem.id,
        relocationTaskStatusDict[relocationTaskListItem.status],
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })
  })

  describe('Инициатор', () => {
    test('Отображается корректно', () => {
      render(<EquipmentNomenclatureTable {...props} />)

      const title = testUtils.getColTitle('Инициатор')
      const value = testUtils.getColValue(
        relocationTaskListItem.id,
        relocationTaskListItem.createdBy!.fullName,
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })
  })

  describe('Создано', () => {
    test('Отображается корректно', () => {
      render(<EquipmentNomenclatureTable {...props} />)

      const title = testUtils.getColTitle('Создано')
      const value = testUtils.getColValue(
        relocationTaskListItem.id,
        formatDate(relocationTaskListItem.createdAt),
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })
  })
})
