import {
  inventorizationStatusDict,
  inventorizationTypeDict,
} from 'features/inventorizations/constants'

import { formatDate } from 'shared/utils/date'

import {
  ariaSortAttrAscValue,
  ariaSortAttrDescValue,
  ariaSortAttrName,
  columnWithSortingClass,
} from '_tests_/constants/components'
import {
  inventorizationListItem,
  props,
} from '_tests_/features/warehouse/components/InventorizationTable/constants'
import { inventorizationTableTestUtils } from '_tests_/features/warehouse/components/InventorizationTable/testUtils'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import { render, tableTestUtils } from '_tests_/utils'

import InventorizationTable from './index'

afterEach(() => {
  const onChange = props.onChange as jest.Mock
  const onRow = props.onRow as jest.Mock

  onChange.mockReset()
  onRow.mockReset()
})

describe.skip('Таблица инвентаризаций', () => {
  test('Отображается', () => {
    render(<InventorizationTable {...props} />)

    const table = inventorizationTableTestUtils.getContainer()

    expect(table).toBeInTheDocument()
    tableTestUtils.expectPaginationEnabledIn(table)

    props.dataSource.forEach((item) => {
      const row = inventorizationTableTestUtils.getRow(item.id)
      expect(row).toBeInTheDocument()
    })
  })

  test('Пагинация работает', async () => {
    const inventorizations = warehouseFixtures.inventorizations(11)

    const { user } = render(<InventorizationTable {...props} dataSource={inventorizations} />)

    const table = inventorizationTableTestUtils.getContainer()
    await tableTestUtils.clickPaginationNextButtonIn(user, table)

    expect(props.onChange).toBeCalledTimes(1)
    expect(props.onChange).toBeCalledWith(
      expect.anything(),
      expect.anything(),
      expect.anything(),
      expect.anything(),
    )
    inventorizations.slice(-1).forEach((item) => {
      const row = inventorizationTableTestUtils.getRow(item.id)
      expect(row).toBeInTheDocument()
    })
  })

  test('Можно установить сортировку по умолчанию', () => {
    render(<InventorizationTable {...props} sort='-deadline_at' />)
    const headCell = inventorizationTableTestUtils.getHeadCell('Срок выполнения')
    expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)
  })

  describe('Тип', () => {
    test('Отображается', () => {
      render(<InventorizationTable {...props} />)

      const headCell = inventorizationTableTestUtils.getHeadCell('Тип')
      const title = inventorizationTableTestUtils.getColTitle('Тип')
      const value = inventorizationTableTestUtils.getColValue(
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

      await inventorizationTableTestUtils.clickColTitle(user, 'Тип')

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

      await inventorizationTableTestUtils.clickColTitle(user, 'Тип')
      const headCell = inventorizationTableTestUtils.getHeadCell('Тип')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

      await inventorizationTableTestUtils.clickColTitle(user, 'Тип')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      await inventorizationTableTestUtils.clickColTitle(user, 'Тип')
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      props.dataSource.forEach((item) => {
        const row = inventorizationTableTestUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })
  })

  describe('Склады', () => {
    test('Отображается', () => {
      render(<InventorizationTable {...props} />)

      const headCell = inventorizationTableTestUtils.getHeadCell('Склады')
      const title = inventorizationTableTestUtils.getColTitle('Склады')

      expect(title).toBeInTheDocument()
      expect(headCell).not.toHaveClass(columnWithSortingClass)
      expect(headCell).not.toHaveAttribute(ariaSortAttrName)
      props.dataSource.forEach((item) => {
        const row = inventorizationTableTestUtils.getRow(item.id)
        const warehousesValue = item.warehouses.map((warehouse) => warehouse.title).join(', ')
        expect(row).toHaveTextContent(warehousesValue)
      })
    })
  })

  describe('Срок выполнения', () => {
    test('Отображается', () => {
      render(<InventorizationTable {...props} />)

      const headCell = inventorizationTableTestUtils.getHeadCell('Срок выполнения')
      const title = inventorizationTableTestUtils.getColTitle('Срок выполнения')
      const value = inventorizationTableTestUtils.getColValue(
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

      await inventorizationTableTestUtils.clickColTitle(user, 'Срок выполнения')

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

      await inventorizationTableTestUtils.clickColTitle(user, 'Срок выполнения')
      let headCell = inventorizationTableTestUtils.getHeadCell('Срок выполнения')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

      await inventorizationTableTestUtils.clickColTitle(user, 'Срок выполнения')
      headCell = inventorizationTableTestUtils.getHeadCell('Срок выполнения')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      await inventorizationTableTestUtils.clickColTitle(user, 'Срок выполнения')
      headCell = inventorizationTableTestUtils.getHeadCell('Срок выполнения')
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      props.dataSource.forEach((item) => {
        const row = inventorizationTableTestUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })
  })

  describe('Исполнитель', () => {
    test('Отображается', () => {
      render(<InventorizationTable {...props} />)

      const headCell = inventorizationTableTestUtils.getHeadCell('Исполнитель')
      const title = inventorizationTableTestUtils.getColTitle('Исполнитель')
      const value = inventorizationTableTestUtils.getColValue(
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

      await inventorizationTableTestUtils.clickColTitle(user, 'Исполнитель')

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

      await inventorizationTableTestUtils.clickColTitle(user, 'Исполнитель')
      let headCell = inventorizationTableTestUtils.getHeadCell('Исполнитель')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

      await inventorizationTableTestUtils.clickColTitle(user, 'Исполнитель')
      headCell = inventorizationTableTestUtils.getHeadCell('Исполнитель')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      await inventorizationTableTestUtils.clickColTitle(user, 'Исполнитель')
      headCell = inventorizationTableTestUtils.getHeadCell('Исполнитель')
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      props.dataSource.forEach((item) => {
        const row = inventorizationTableTestUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })
  })

  describe('Статус', () => {
    test('Отображается', () => {
      render(<InventorizationTable {...props} />)

      const headCell = inventorizationTableTestUtils.getHeadCell('Статус')
      const title = inventorizationTableTestUtils.getColTitle('Статус')
      const value = inventorizationTableTestUtils.getColValue(
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

      await inventorizationTableTestUtils.clickColTitle(user, 'Статус')

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

      await inventorizationTableTestUtils.clickColTitle(user, 'Статус')
      let headCell = inventorizationTableTestUtils.getHeadCell('Статус')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

      await inventorizationTableTestUtils.clickColTitle(user, 'Статус')
      headCell = inventorizationTableTestUtils.getHeadCell('Статус')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      await inventorizationTableTestUtils.clickColTitle(user, 'Статус')
      headCell = inventorizationTableTestUtils.getHeadCell('Статус')
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      props.dataSource.forEach((item) => {
        const row = inventorizationTableTestUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })
  })

  describe('Автор', () => {
    test('Отображается', () => {
      render(<InventorizationTable {...props} />)

      const headCell = inventorizationTableTestUtils.getHeadCell('Автор')
      const title = inventorizationTableTestUtils.getColTitle('Автор')
      const value = inventorizationTableTestUtils.getColValue(
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

      await inventorizationTableTestUtils.clickColTitle(user, 'Автор')

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

      await inventorizationTableTestUtils.clickColTitle(user, 'Автор')
      let headCell = inventorizationTableTestUtils.getHeadCell('Автор')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

      await inventorizationTableTestUtils.clickColTitle(user, 'Автор')
      headCell = inventorizationTableTestUtils.getHeadCell('Автор')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      await inventorizationTableTestUtils.clickColTitle(user, 'Автор')
      headCell = inventorizationTableTestUtils.getHeadCell('Автор')
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      props.dataSource.forEach((item) => {
        const row = inventorizationTableTestUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })
  })

  describe('Создано', () => {
    test('Отображается', () => {
      render(<InventorizationTable {...props} />)

      const headCell = inventorizationTableTestUtils.getHeadCell('Создано')
      const title = inventorizationTableTestUtils.getColTitle('Создано')
      const value = inventorizationTableTestUtils.getColValue(
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

      await inventorizationTableTestUtils.clickColTitle(user, 'Создано')

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

      await inventorizationTableTestUtils.clickColTitle(user, 'Создано')
      let headCell = inventorizationTableTestUtils.getHeadCell('Создано')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

      await inventorizationTableTestUtils.clickColTitle(user, 'Создано')
      headCell = inventorizationTableTestUtils.getHeadCell('Создано')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      await inventorizationTableTestUtils.clickColTitle(user, 'Создано')
      headCell = inventorizationTableTestUtils.getHeadCell('Создано')
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      props.dataSource.forEach((item) => {
        const row = inventorizationTableTestUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })
  })

  test('При клике на строку вызывается обработчик', async () => {
    const { user } = render(<InventorizationTable {...props} />)

    const index = 0
    const item = props.dataSource[index]
    await inventorizationTableTestUtils.clickRow(user, item.id)

    expect(props.onRow).toBeCalled()
    expect(props.onRow).toBeCalledWith(item, index)
  })
})
