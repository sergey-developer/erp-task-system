import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import {
  relocationTaskStatusDict,
  relocationTaskTypeDict,
} from 'features/relocationTasks/constants'
import pick from 'lodash/pick'

import { IdType } from 'shared/types/common'
import { MaybeNull, NumberOrString } from 'shared/types/utils'

import {
  ariaSortAttrAscValue,
  ariaSortAttrDescValue,
  ariaSortAttrName,
  columnWithSortingClass,
} from '_tests_/constants/components'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import { render, tableTestUtils } from '_tests_/utils'

import ExecuteInventorizationRelocationTaskTable from './index'
import { ExecuteInventorizationRelocationTaskTableProps } from './types'

const relocationTaskListItem = pick(
  warehouseFixtures.relocationTaskListItem(),
  'id',
  'type',
  'relocateFrom',
  'relocateTo',
  'status',
)

const props: Readonly<ExecuteInventorizationRelocationTaskTableProps> = {
  dataSource: [relocationTaskListItem],
  pagination: {},
  loading: false,
  onChange: jest.fn(),
  onRow: jest.fn(),
}

const getContainer = () => screen.getByTestId('execute-inventorization-relocation-task-table')

const getRow = (id: IdType) => tableTestUtils.getRowById(getContainer(), id)

const clickRow = async (user: UserEvent, id: IdType) =>
  tableTestUtils.clickRowById(getContainer(), user, id)

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
    render(<ExecuteInventorizationRelocationTaskTable {...props} />)

    const table = testUtils.getContainer()

    expect(table).toBeInTheDocument()
    tableTestUtils.expectPaginationEnabledIn(table)

    props.dataSource.forEach((item) => {
      const row = testUtils.getRow(item.id)
      expect(row).toBeInTheDocument()
    })
  })

  test('Пагинация работает', async () => {
    const relocationTasks = warehouseFixtures.relocationTasks(11)

    const { user } = render(
      <ExecuteInventorizationRelocationTaskTable {...props} dataSource={relocationTasks} />,
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
    relocationTasks.slice(-1).forEach((item) => {
      const row = testUtils.getRow(item.id)
      expect(row).toBeInTheDocument()
    })
  })

  test('При клике на строку обработчик вызывается корректно', async () => {
    const { user } = render(<ExecuteInventorizationRelocationTaskTable {...props} />)

    await testUtils.clickRow(user, relocationTaskListItem.id)

    expect(props.onRow).toBeCalled()
    expect(props.onRow).toBeCalledWith(relocationTaskListItem, 0)
  })

  test('Можно установить сортировку по умолчанию', () => {
    render(<ExecuteInventorizationRelocationTaskTable {...props} sort='-relocate_to' />)
    const headCell = testUtils.getHeadCell('Объект прибытия')
    expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)
  })

  describe('Тип заявки', () => {
    test('Отображается корректно', () => {
      render(<ExecuteInventorizationRelocationTaskTable {...props} />)

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
      const { user } = render(<ExecuteInventorizationRelocationTaskTable {...props} />)

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
      const { user } = render(<ExecuteInventorizationRelocationTaskTable {...props} />)

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

  describe('Объект выбытия', () => {
    test('Отображается корректно', () => {
      render(<ExecuteInventorizationRelocationTaskTable {...props} />)

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
      const { user } = render(<ExecuteInventorizationRelocationTaskTable {...props} />)

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
      const { user } = render(<ExecuteInventorizationRelocationTaskTable {...props} />)

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
      render(<ExecuteInventorizationRelocationTaskTable {...props} />)

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
      const { user } = render(<ExecuteInventorizationRelocationTaskTable {...props} />)

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
      const { user } = render(<ExecuteInventorizationRelocationTaskTable {...props} />)

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

  describe('Статус', () => {
    test('Отображается корректно', () => {
      render(<ExecuteInventorizationRelocationTaskTable {...props} />)

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
      const { user } = render(<ExecuteInventorizationRelocationTaskTable {...props} />)

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
      const { user } = render(<ExecuteInventorizationRelocationTaskTable {...props} />)

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
})
