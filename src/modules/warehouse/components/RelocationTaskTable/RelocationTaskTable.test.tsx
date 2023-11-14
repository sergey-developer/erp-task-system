import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import {
  relocationTaskStatusDict,
  relocationTaskTypeDict,
} from 'modules/warehouse/constants/relocationTask'

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

import RelocationTaskTable from './index'
import { RelocationTaskTableProps } from './types'

const relocationTaskListItem = warehouseFixtures.relocationTaskListItem()

const props: Readonly<RelocationTaskTableProps> = {
  dataSource: [relocationTaskListItem],
  pagination: {},
  loading: false,
  onChange: jest.fn(),
  onRow: jest.fn(),
}

const getContainer = () => screen.getByTestId('relocation-task-table')

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
  const onRow = props.onRow as jest.Mock
  const onChange = props.onChange as jest.Mock

  onRow.mockReset()
  onChange.mockReset()
})

describe('Таблица заявок на перемещение оборудования', () => {
  test('Отображается корректно', () => {
    render(<RelocationTaskTable {...props} />)

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

    const { user } = render(<RelocationTaskTable {...props} dataSource={relocationTaskList} />)

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

  test('При клике на строку обработчик вызывается корректно', async () => {
    const { user } = render(<RelocationTaskTable {...props} />)

    await testUtils.clickRow(user, props.dataSource[0].id)

    expect(props.onRow).toBeCalledTimes(1)
    expect(props.onRow).toBeCalledWith(props.dataSource[0], 0)
  })

  test('Можно установить сортировку по умолчанию', () => {
    render(<RelocationTaskTable {...props} sort='-deadline_at' />)
    const headCell = testUtils.getHeadCell('Срок выполнения')
    expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)
  })

  describe('Тип заявки', () => {
    test('Отображается корректно', () => {
      render(<RelocationTaskTable {...props} />)

      const headCell = testUtils.getHeadCell('Тип заявки')
      const title = testUtils.getColTitle('Тип заявки')
      const value = testUtils.getColValue(
        relocationTaskListItem.id,
        relocationTaskTypeDict[relocationTaskListItem.type],
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
      expect(headCell).toHaveClass(columnWithSortingClass)
      expect(headCell).not.toHaveAttribute(ariaSortAttrName)
    })

    test('При клике на заголовок обработчик вызывается корректно', async () => {
      const { user } = render(<RelocationTaskTable {...props} />)

      await testUtils.clickColTitle(user, 'Тип заявки')

      expect(props.onChange).toBeCalledTimes(1)
      expect(props.onChange).toBeCalledWith(
        expect.anything(),
        expect.anything(),
        expect.anything(),
        expect.anything(),
      )
    })

    test('Сортировка работает корректно', async () => {
      const { user } = render(<RelocationTaskTable {...props} />)

      await testUtils.clickColTitle(user, 'Тип заявки')
      const headCell = testUtils.getHeadCell('Тип заявки')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

      await testUtils.clickColTitle(user, 'Тип заявки')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      await testUtils.clickColTitle(user, 'Тип заявки')
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      props.dataSource.forEach((item) => {
        const row = testUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })
  })

  describe('Срок выполнения', () => {
    test('Отображается корректно', () => {
      render(<RelocationTaskTable {...props} />)

      const headCell = testUtils.getHeadCell('Срок выполнения')
      const title = testUtils.getColTitle('Срок выполнения')
      const value = testUtils.getColValue(
        relocationTaskListItem.id,
        formatDate(relocationTaskListItem.deadlineAt),
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
      expect(headCell).toHaveClass(columnWithSortingClass)
      expect(headCell).not.toHaveAttribute(ariaSortAttrName)
    })

    test('При клике на заголовок обработчик вызывается корректно', async () => {
      const { user } = render(<RelocationTaskTable {...props} />)

      await testUtils.clickColTitle(user, 'Срок выполнения')

      expect(props.onChange).toBeCalledTimes(1)
      expect(props.onChange).toBeCalledWith(
        expect.anything(),
        expect.anything(),
        expect.anything(),
        expect.anything(),
      )
    })

    test('Сортировка работает корректно', async () => {
      const { user } = render(<RelocationTaskTable {...props} />)

      await testUtils.clickColTitle(user, 'Срок выполнения')
      const headCell = testUtils.getHeadCell('Срок выполнения')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

      await testUtils.clickColTitle(user, 'Срок выполнения')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      await testUtils.clickColTitle(user, 'Срок выполнения')
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      props.dataSource.forEach((item) => {
        const row = testUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })
  })

  describe('Объект выбытия', () => {
    test('Отображается корректно', () => {
      render(<RelocationTaskTable {...props} />)

      const headCell = testUtils.getHeadCell('Объект выбытия')
      const title = testUtils.getColTitle('Объект выбытия')
      const value = testUtils.getColValue(
        relocationTaskListItem.id,
        relocationTaskListItem.relocateFrom!.title,
      )

      expect(headCell).toHaveClass(columnWithSortingClass)
      expect(headCell).not.toHaveAttribute(ariaSortAttrName)
      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('При клике на заголовок обработчик вызывается корректно', async () => {
      const { user } = render(<RelocationTaskTable {...props} />)

      await testUtils.clickColTitle(user, 'Объект выбытия')

      expect(props.onChange).toBeCalledTimes(1)
      expect(props.onChange).toBeCalledWith(
        expect.anything(),
        expect.anything(),
        expect.anything(),
        expect.anything(),
      )
    })

    test('Сортировка работает корректно', async () => {
      const { user } = render(<RelocationTaskTable {...props} />)

      await testUtils.clickColTitle(user, 'Объект выбытия')
      const headCell = testUtils.getHeadCell('Объект выбытия')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

      await testUtils.clickColTitle(user, 'Объект выбытия')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      await testUtils.clickColTitle(user, 'Объект выбытия')
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      props.dataSource.forEach((item) => {
        const row = testUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })
  })

  describe('Объект прибытия', () => {
    test('Отображается корректно', () => {
      render(<RelocationTaskTable {...props} />)

      const headCell = testUtils.getHeadCell('Объект прибытия')
      const title = testUtils.getColTitle('Объект прибытия')
      const value = testUtils.getColValue(
        relocationTaskListItem.id,
        relocationTaskListItem.relocateTo!.title,
      )

      expect(headCell).toHaveClass(columnWithSortingClass)
      expect(headCell).not.toHaveAttribute(ariaSortAttrName)
      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('При клике на заголовок обработчик вызывается корректно', async () => {
      const { user } = render(<RelocationTaskTable {...props} />)

      await testUtils.clickColTitle(user, 'Объект прибытия')

      expect(props.onChange).toBeCalledTimes(1)
      expect(props.onChange).toBeCalledWith(
        expect.anything(),
        expect.anything(),
        expect.anything(),
        expect.anything(),
      )
    })

    test('Сортировка работает корректно', async () => {
      const { user } = render(<RelocationTaskTable {...props} />)

      await testUtils.clickColTitle(user, 'Объект прибытия')
      const headCell = testUtils.getHeadCell('Объект прибытия')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

      await testUtils.clickColTitle(user, 'Объект прибытия')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      await testUtils.clickColTitle(user, 'Объект прибытия')
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      props.dataSource.forEach((item) => {
        const row = testUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })
  })

  describe('Исполнитель', () => {
    test('Отображается корректно', () => {
      render(<RelocationTaskTable {...props} />)

      const headCell = testUtils.getHeadCell('Исполнитель')
      const title = testUtils.getColTitle('Исполнитель')
      const value = testUtils.getColValue(
        relocationTaskListItem.id,
        relocationTaskListItem.executor!.fullName,
      )

      expect(headCell).toHaveClass(columnWithSortingClass)
      expect(headCell).not.toHaveAttribute(ariaSortAttrName)
      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('При клике на заголовок обработчик вызывается корректно', async () => {
      const { user } = render(<RelocationTaskTable {...props} />)

      await testUtils.clickColTitle(user, 'Исполнитель')

      expect(props.onChange).toBeCalledTimes(1)
      expect(props.onChange).toBeCalledWith(
        expect.anything(),
        expect.anything(),
        expect.anything(),
        expect.anything(),
      )
    })

    test('Сортировка работает корректно', async () => {
      const { user } = render(<RelocationTaskTable {...props} />)

      await testUtils.clickColTitle(user, 'Исполнитель')
      const headCell = testUtils.getHeadCell('Исполнитель')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

      await testUtils.clickColTitle(user, 'Исполнитель')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      await testUtils.clickColTitle(user, 'Исполнитель')
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      props.dataSource.forEach((item) => {
        const row = testUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })
  })

  describe('Статус', () => {
    test('Отображается корректно', () => {
      render(<RelocationTaskTable {...props} />)

      const headCell = testUtils.getHeadCell('Статус')
      const title = testUtils.getColTitle('Статус')
      const value = testUtils.getColValue(
        relocationTaskListItem.id,
        relocationTaskStatusDict[relocationTaskListItem.status],
      )

      expect(headCell).toHaveClass(columnWithSortingClass)
      expect(headCell).not.toHaveAttribute(ariaSortAttrName)
      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('При клике на заголовок обработчик вызывается корректно', async () => {
      const { user } = render(<RelocationTaskTable {...props} />)

      await testUtils.clickColTitle(user, 'Статус')

      expect(props.onChange).toBeCalledTimes(1)
      expect(props.onChange).toBeCalledWith(
        expect.anything(),
        expect.anything(),
        expect.anything(),
        expect.anything(),
      )
    })

    test('Сортировка работает корректно', async () => {
      const { user } = render(<RelocationTaskTable {...props} />)

      await testUtils.clickColTitle(user, 'Статус')
      const headCell = testUtils.getHeadCell('Статус')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

      await testUtils.clickColTitle(user, 'Статус')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      await testUtils.clickColTitle(user, 'Статус')
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      props.dataSource.forEach((item) => {
        const row = testUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })
  })

  describe('Инициатор', () => {
    test('Отображается корректно', () => {
      render(<RelocationTaskTable {...props} />)

      const headCell = testUtils.getHeadCell('Инициатор')
      const title = testUtils.getColTitle('Инициатор')
      const value = testUtils.getColValue(
        relocationTaskListItem.id,
        relocationTaskListItem.createdBy!.fullName,
      )

      expect(headCell).toHaveClass(columnWithSortingClass)
      expect(headCell).not.toHaveAttribute(ariaSortAttrName)
      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('При клике на заголовок обработчик вызывается корректно', async () => {
      const { user } = render(<RelocationTaskTable {...props} />)

      await testUtils.clickColTitle(user, 'Инициатор')

      expect(props.onChange).toBeCalledTimes(1)
      expect(props.onChange).toBeCalledWith(
        expect.anything(),
        expect.anything(),
        expect.anything(),
        expect.anything(),
      )
    })

    test('Сортировка работает корректно', async () => {
      const { user } = render(<RelocationTaskTable {...props} />)

      await testUtils.clickColTitle(user, 'Инициатор')
      const headCell = testUtils.getHeadCell('Инициатор')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

      await testUtils.clickColTitle(user, 'Инициатор')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      await testUtils.clickColTitle(user, 'Инициатор')
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      props.dataSource.forEach((item) => {
        const row = testUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })
  })

  describe('Создано', () => {
    test('Отображается корректно', () => {
      render(<RelocationTaskTable {...props} />)

      const headCell = testUtils.getHeadCell('Создано')
      const title = testUtils.getColTitle('Создано')
      const value = testUtils.getColValue(
        relocationTaskListItem.id,
        formatDate(relocationTaskListItem.createdAt),
      )

      expect(headCell).toHaveClass(columnWithSortingClass)
      expect(headCell).not.toHaveAttribute(ariaSortAttrName)
      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('При клике на заголовок обработчик вызывается корректно', async () => {
      const { user } = render(<RelocationTaskTable {...props} />)

      await testUtils.clickColTitle(user, 'Создано')

      expect(props.onChange).toBeCalledTimes(1)
      expect(props.onChange).toBeCalledWith(
        expect.anything(),
        expect.anything(),
        expect.anything(),
        expect.anything(),
      )
    })

    test('Сортировка работает корректно', async () => {
      const { user } = render(<RelocationTaskTable {...props} />)

      await testUtils.clickColTitle(user, 'Создано')
      const headCell = testUtils.getHeadCell('Создано')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

      await testUtils.clickColTitle(user, 'Создано')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      await testUtils.clickColTitle(user, 'Создано')
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      props.dataSource.forEach((item) => {
        const row = testUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })
  })
})
