import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import {
  inventorizationStatusDict,
  inventorizationTypeDict,
} from 'modules/warehouse/constants/inventorization'

import { IdType } from 'shared/types/common'
import { MaybeNull, NumberOrString } from 'shared/types/utils'
import { formatDate } from 'shared/utils/date'

import {
  ariaSortAttrAscValue,
  ariaSortAttrDescValue,
  ariaSortAttrName,
  columnWithSortingClass,
} from '_tests_/constants/components'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import { render, tableTestUtils } from '_tests_/utils'

import InventorizationTable from './index'
import { InventorizationTableProps } from './types'

const inventorizationListItem = warehouseFixtures.inventorizationListItem()

const props: Readonly<InventorizationTableProps> = {
  dataSource: [inventorizationListItem],
  pagination: {},
  loading: false,
  onChange: jest.fn(),
  onRow: jest.fn(),
}

const getContainer = () => screen.getByTestId('inventorization-table')
const getRow = (id: IdType) => tableTestUtils.getRowIn(getContainer(), id)
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

const expectLoadingFinished = async (): Promise<HTMLElement> => {
  const container = getContainer()
  await tableTestUtils.expectLoadingFinished(container)
  return container
}

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
  const onRow = props.onRow as jest.Mock

  onChange.mockReset()
  onRow.mockReset()
})

describe('Таблица инвентаризаций', () => {
  test('Отображается', () => {
    render(<InventorizationTable {...props} />)

    const table = testUtils.getContainer()

    expect(table).toBeInTheDocument()
    tableTestUtils.expectPaginationEnabledIn(table)

    props.dataSource.forEach((item) => {
      const row = testUtils.getRow(item.id)
      expect(row).toBeInTheDocument()
    })
  })

  test('Пагинация работает', async () => {
    const inventorizations = warehouseFixtures.inventorizations(11)

    const { user } = render(<InventorizationTable {...props} dataSource={inventorizations} />)

    const table = testUtils.getContainer()
    await tableTestUtils.clickPaginationNextButtonIn(user, table)

    expect(props.onChange).toBeCalledTimes(1)
    expect(props.onChange).toBeCalledWith(
      expect.anything(),
      expect.anything(),
      expect.anything(),
      expect.anything(),
    )
    inventorizations.slice(-1).forEach((item) => {
      const row = testUtils.getRow(item.id)
      expect(row).toBeInTheDocument()
    })
  })

  test('Можно установить сортировку по умолчанию', () => {
    render(<InventorizationTable {...props} sort='-deadline_at' />)
    const headCell = testUtils.getHeadCell('Срок выполнения')
    expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)
  })

  describe('Тип', () => {
    test('Отображается', () => {
      render(<InventorizationTable {...props} />)

      const headCell = testUtils.getHeadCell('Тип')
      const title = testUtils.getColTitle('Тип')
      const value = testUtils.getColValue(
        inventorizationListItem.id,
        inventorizationTypeDict[inventorizationListItem.type],
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
      expect(headCell).toHaveClass(columnWithSortingClass)
      expect(headCell).not.toHaveAttribute(ariaSortAttrName)
    })

    test('При клике на заголовок вызывается обработчик', async () => {
      const { user } = render(<InventorizationTable {...props} />)

      await testUtils.clickColTitle(user, 'Тип')

      expect(props.onChange).toBeCalledTimes(1)
      expect(props.onChange).toBeCalledWith(
        expect.anything(),
        expect.anything(),
        expect.anything(),
        expect.anything(),
      )
    })

    test('Сортировка работает', async () => {
      const { user } = render(<InventorizationTable {...props} />)

      await testUtils.clickColTitle(user, 'Тип')
      const headCell = testUtils.getHeadCell('Тип')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

      await testUtils.clickColTitle(user, 'Тип')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      await testUtils.clickColTitle(user, 'Тип')
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      props.dataSource.forEach((item) => {
        const row = testUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })
  })

  describe('Склады', () => {
    test('Отображается', () => {
      render(<InventorizationTable {...props} />)

      const headCell = testUtils.getHeadCell('Склады')
      const title = testUtils.getColTitle('Склады')

      expect(title).toBeInTheDocument()
      expect(headCell).not.toHaveClass(columnWithSortingClass)
      expect(headCell).not.toHaveAttribute(ariaSortAttrName)
      props.dataSource.forEach((item) => {
        const row = testUtils.getRow(item.id)
        const warehousesValue = item.warehouses.map((warehouse) => warehouse.title).join(', ')
        expect(row).toHaveTextContent(warehousesValue)
      })
    })
  })

  describe('Срок выполнения', () => {
    test('Отображается', () => {
      render(<InventorizationTable {...props} />)

      const headCell = testUtils.getHeadCell('Срок выполнения')
      const title = testUtils.getColTitle('Срок выполнения')
      const value = testUtils.getColValue(
        inventorizationListItem.id,
        formatDate(inventorizationListItem.deadlineAt),
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
      expect(headCell).toHaveClass(columnWithSortingClass)
      expect(headCell).not.toHaveAttribute(ariaSortAttrName)
    })

    test('При клике на заголовок вызывается обработчик', async () => {
      const { user } = render(<InventorizationTable {...props} />)

      await testUtils.clickColTitle(user, 'Срок выполнения')

      expect(props.onChange).toBeCalledTimes(1)
      expect(props.onChange).toBeCalledWith(
        expect.anything(),
        expect.anything(),
        expect.anything(),
        expect.anything(),
      )
    })

    test('Сортировка работает', async () => {
      const { user } = render(<InventorizationTable {...props} />)

      await testUtils.clickColTitle(user, 'Срок выполнения')
      let headCell = testUtils.getHeadCell('Срок выполнения')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

      await testUtils.clickColTitle(user, 'Срок выполнения')
      headCell = testUtils.getHeadCell('Срок выполнения')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      await testUtils.clickColTitle(user, 'Срок выполнения')
      headCell = testUtils.getHeadCell('Срок выполнения')
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      props.dataSource.forEach((item) => {
        const row = testUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })
  })

  describe('Исполнитель', () => {
    test('Отображается', () => {
      render(<InventorizationTable {...props} />)

      const headCell = testUtils.getHeadCell('Исполнитель')
      const title = testUtils.getColTitle('Исполнитель')
      const value = testUtils.getColValue(
        inventorizationListItem.id,
        inventorizationListItem.executor.fullName,
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
      expect(headCell).toHaveClass(columnWithSortingClass)
      expect(headCell).not.toHaveAttribute(ariaSortAttrName)
    })

    test('При клике на заголовок вызывается обработчик', async () => {
      const { user } = render(<InventorizationTable {...props} />)

      await testUtils.clickColTitle(user, 'Исполнитель')

      expect(props.onChange).toBeCalledTimes(1)
      expect(props.onChange).toBeCalledWith(
        expect.anything(),
        expect.anything(),
        expect.anything(),
        expect.anything(),
      )
    })

    test('Сортировка работает', async () => {
      const { user } = render(<InventorizationTable {...props} />)

      await testUtils.clickColTitle(user, 'Исполнитель')
      let headCell = testUtils.getHeadCell('Исполнитель')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

      await testUtils.clickColTitle(user, 'Исполнитель')
      headCell = testUtils.getHeadCell('Исполнитель')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      await testUtils.clickColTitle(user, 'Исполнитель')
      headCell = testUtils.getHeadCell('Исполнитель')
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      props.dataSource.forEach((item) => {
        const row = testUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })
  })

  describe('Статус', () => {
    test('Отображается', () => {
      render(<InventorizationTable {...props} />)

      const headCell = testUtils.getHeadCell('Статус')
      const title = testUtils.getColTitle('Статус')
      const value = testUtils.getColValue(
        inventorizationListItem.id,
        inventorizationStatusDict[inventorizationListItem.status],
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
      expect(headCell).toHaveClass(columnWithSortingClass)
      expect(headCell).not.toHaveAttribute(ariaSortAttrName)
    })

    test('При клике на заголовок вызывается обработчик', async () => {
      const { user } = render(<InventorizationTable {...props} />)

      await testUtils.clickColTitle(user, 'Статус')

      expect(props.onChange).toBeCalledTimes(1)
      expect(props.onChange).toBeCalledWith(
        expect.anything(),
        expect.anything(),
        expect.anything(),
        expect.anything(),
      )
    })

    test('Сортировка работает', async () => {
      const { user } = render(<InventorizationTable {...props} />)

      await testUtils.clickColTitle(user, 'Статус')
      let headCell = testUtils.getHeadCell('Статус')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

      await testUtils.clickColTitle(user, 'Статус')
      headCell = testUtils.getHeadCell('Статус')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      await testUtils.clickColTitle(user, 'Статус')
      headCell = testUtils.getHeadCell('Статус')
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      props.dataSource.forEach((item) => {
        const row = testUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })
  })

  describe('Автор', () => {
    test('Отображается', () => {
      render(<InventorizationTable {...props} />)

      const headCell = testUtils.getHeadCell('Автор')
      const title = testUtils.getColTitle('Автор')
      const value = testUtils.getColValue(
        inventorizationListItem.id,
        inventorizationListItem.createdBy.fullName,
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
      expect(headCell).toHaveClass(columnWithSortingClass)
      expect(headCell).not.toHaveAttribute(ariaSortAttrName)
    })

    test('При клике на заголовок вызывается обработчик', async () => {
      const { user } = render(<InventorizationTable {...props} />)

      await testUtils.clickColTitle(user, 'Автор')

      expect(props.onChange).toBeCalledTimes(1)
      expect(props.onChange).toBeCalledWith(
        expect.anything(),
        expect.anything(),
        expect.anything(),
        expect.anything(),
      )
    })

    test('Сортировка работает', async () => {
      const { user } = render(<InventorizationTable {...props} />)

      await testUtils.clickColTitle(user, 'Автор')
      let headCell = testUtils.getHeadCell('Автор')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

      await testUtils.clickColTitle(user, 'Автор')
      headCell = testUtils.getHeadCell('Автор')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      await testUtils.clickColTitle(user, 'Автор')
      headCell = testUtils.getHeadCell('Автор')
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      props.dataSource.forEach((item) => {
        const row = testUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })
  })

  describe('Создано', () => {
    test('Отображается', () => {
      render(<InventorizationTable {...props} />)

      const headCell = testUtils.getHeadCell('Создано')
      const title = testUtils.getColTitle('Создано')
      const value = testUtils.getColValue(
        inventorizationListItem.id,
        formatDate(inventorizationListItem.createdAt),
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
      expect(headCell).toHaveClass(columnWithSortingClass)
      expect(headCell).not.toHaveAttribute(ariaSortAttrName)
    })

    test('При клике на заголовок вызывается обработчик', async () => {
      const { user } = render(<InventorizationTable {...props} />)

      await testUtils.clickColTitle(user, 'Создано')

      expect(props.onChange).toBeCalledTimes(1)
      expect(props.onChange).toBeCalledWith(
        expect.anything(),
        expect.anything(),
        expect.anything(),
        expect.anything(),
      )
    })

    test('Сортировка работает', async () => {
      const { user } = render(<InventorizationTable {...props} />)

      await testUtils.clickColTitle(user, 'Создано')
      let headCell = testUtils.getHeadCell('Создано')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

      await testUtils.clickColTitle(user, 'Создано')
      headCell = testUtils.getHeadCell('Создано')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      await testUtils.clickColTitle(user, 'Создано')
      headCell = testUtils.getHeadCell('Создано')
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      props.dataSource.forEach((item) => {
        const row = testUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })
  })

  test('При клике на строку вызывается обработчик', async () => {
    const { user } = render(<InventorizationTable {...props} />)

    const index = 0
    const item = props.dataSource[index]
    await testUtils.clickRow(user, item.id)

    expect(props.onRow).toBeCalled()
    expect(props.onRow).toBeCalledWith(item, index)
  })
})
