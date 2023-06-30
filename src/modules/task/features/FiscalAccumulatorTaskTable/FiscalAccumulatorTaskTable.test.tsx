import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import { TableAction } from 'antd/es/table/interface'

import { MaybeNull } from 'shared/interfaces/utils'
import { formatDate } from 'shared/utils/date'

import taskFixtures from 'fixtures/task'

import { columnWithSortingClass } from '_tests_/constants/components'
import { render } from '_tests_/utils'

import FiscalAccumulatorTaskTable from './index'
import {
  FiscalAccumulatorTaskTableItem,
  FiscalAccumulatorTaskTableProps,
} from './interfaces'

const fakeFiscalAccumulatorTaskListItem =
  taskFixtures.fakeFiscalAccumulatorTaskListItem()

const props: Readonly<FiscalAccumulatorTaskTableProps> = {
  dataSource: [fakeFiscalAccumulatorTaskListItem],
  loading: false,
  onChange: jest.fn(),
}

const getContainer = () => screen.getByTestId('fiscal-accumulator-task-table')

const getChildByText = (text: string) => within(getContainer()).getByText(text)

const queryChildByText = (text: string) =>
  within(getContainer()).queryByText(text)

const getRow = (id: number): MaybeNull<HTMLElement> =>
  // eslint-disable-next-line testing-library/no-node-access
  getContainer().querySelector(`[data-row-key='${id}']`)

const getHeadCell = (text: string) => {
  // eslint-disable-next-line testing-library/no-node-access
  return getChildByText(text).parentElement?.parentElement!
}

const getColTitle = getChildByText
const queryColTitle = queryChildByText

const clickColTitle = async (user: UserEvent, title: string) => {
  const col = getColTitle(title)
  await user.click(col)
}

// todo: использовать в тестах
const getColValue = (id: number, value: string) => {
  const row = getRow(id)
  return within(row!).getByText(value)
}

const onChangeTableArgs = {
  extra: (
    action: TableAction,
    dataSource: Readonly<Array<FiscalAccumulatorTaskTableItem>>,
  ) => ({
    action,
    currentDataSource: dataSource,
  }),
}

export const testUtils = {
  getContainer,
  getRow,
  getChildByText,
  queryChildByText,
  getHeadCell,
  getColTitle,
  queryColTitle,
  clickColTitle,

  onChangeTableArgs,
}

describe('Таблица заявок фискальных накопителей', () => {
  test('Отображается корректно', () => {
    render(<FiscalAccumulatorTaskTable {...props} />)

    const table = testUtils.getContainer()

    expect(table).toBeInTheDocument()

    props.dataSource.forEach((item) => {
      const row = testUtils.getRow(item.id)
      expect(row).toBeInTheDocument()
    })
  })

  describe('Колонка', () => {
    describe('Блокировка через', () => {
      test('Отображается корректно', () => {
        render(<FiscalAccumulatorTaskTable {...props} />)

        const title = testUtils.getColTitle('Блокировка через')
        const value = testUtils.getChildByText(
          String(fakeFiscalAccumulatorTaskListItem.blockingIn),
        )
        const headCell = testUtils.getHeadCell('Блокировка через')

        expect(title).toBeInTheDocument()
        expect(value).toBeInTheDocument()
        expect(headCell).toHaveClass(columnWithSortingClass)
        expect(headCell).not.toHaveAttribute('aria-sort')
      })

      test.todo('При клике на заголовок обработчик вызывается корректно')
      test.todo('Сортировка работает корректно')
    })

    describe('Крайний срок', () => {
      test('Отображается корректно', () => {
        render(<FiscalAccumulatorTaskTable {...props} />)

        const title = testUtils.getColTitle('Крайний срок')
        const value = testUtils.getChildByText(
          formatDate(fakeFiscalAccumulatorTaskListItem.olaNextBreachTime),
        )
        const headCell = testUtils.getHeadCell('Крайний срок')

        expect(title).toBeInTheDocument()
        expect(value).toBeInTheDocument()
        expect(headCell).toHaveClass(columnWithSortingClass)
        expect(headCell).not.toHaveAttribute('aria-sort')
      })
    })

    describe('ИНЦ', () => {
      test('Отображается корректно', () => {
        render(<FiscalAccumulatorTaskTable {...props} />)

        const title = testUtils.getColTitle('ИНЦ')
        const value = testUtils.getChildByText(
          fakeFiscalAccumulatorTaskListItem.recordId,
        )
        const headCell = testUtils.getHeadCell('ИНЦ')

        expect(title).toBeInTheDocument()
        expect(value).toBeInTheDocument()
        expect(headCell).toHaveClass(columnWithSortingClass)
        expect(headCell).not.toHaveAttribute('aria-sort')
      })
    })

    describe('SAP ID', () => {
      test('Отображается корректно', () => {
        render(<FiscalAccumulatorTaskTable {...props} />)

        const title = testUtils.getColTitle('SAP ID')
        const value = testUtils.getChildByText(
          fakeFiscalAccumulatorTaskListItem.sapId,
        )
        const headCell = testUtils.getHeadCell('SAP ID')

        expect(title).toBeInTheDocument()
        expect(value).toBeInTheDocument()
        expect(headCell).toHaveClass(columnWithSortingClass)
        expect(headCell).not.toHaveAttribute('aria-sort')
      })
    })

    describe('Клиент', () => {
      test('Отображается корректно', () => {
        render(<FiscalAccumulatorTaskTable {...props} />)

        const title = testUtils.getColTitle('Клиент')
        const value = testUtils.getChildByText(
          fakeFiscalAccumulatorTaskListItem.name,
        )
        const headCell = testUtils.getHeadCell('Клиент')

        expect(title).toBeInTheDocument()
        expect(value).toBeInTheDocument()
        expect(headCell).toHaveClass(columnWithSortingClass)
        expect(headCell).not.toHaveAttribute('aria-sort')
      })
    })

    describe('Адрес', () => {
      test('Отображается корректно', () => {
        render(<FiscalAccumulatorTaskTable {...props} />)

        const title = testUtils.getColTitle('Адрес')
        const value = testUtils.getChildByText(
          fakeFiscalAccumulatorTaskListItem.address,
        )
        const headCell = testUtils.getHeadCell('Адрес')

        expect(title).toBeInTheDocument()
        expect(value).toBeInTheDocument()
        expect(headCell).toHaveClass(columnWithSortingClass)
        expect(headCell).not.toHaveAttribute('aria-sort')
      })
    })

    describe('ФН', () => {
      test('Отображается корректно', () => {
        render(<FiscalAccumulatorTaskTable {...props} />)

        const title = testUtils.getColTitle('ФН')
        const value = testUtils.getChildByText(
          String(fakeFiscalAccumulatorTaskListItem.fiscalAccumulator.faNumber),
        )
        const headCell = testUtils.getHeadCell('ФН')

        expect(title).toBeInTheDocument()
        expect(value).toBeInTheDocument()
        expect(headCell).toHaveClass(columnWithSortingClass)
        expect(headCell).not.toHaveAttribute('aria-sort')
      })
    })

    describe('Срок / Всего ФД', () => {
      test('Отображается корректно', () => {
        render(<FiscalAccumulatorTaskTable {...props} />)

        const title = testUtils.getColTitle('Срок / Всего ФД')
        const value = testUtils.getChildByText(
          String(fakeFiscalAccumulatorTaskListItem.deadlineOrTotalFiscalDocs),
        )
        const headCell = testUtils.getHeadCell('Срок / Всего ФД')

        expect(title).toBeInTheDocument()
        expect(value).toBeInTheDocument()
        expect(headCell).toHaveClass(columnWithSortingClass)
        expect(headCell).not.toHaveAttribute('aria-sort')
      })
    })

    describe('МР', () => {
      test('Отображается корректно', () => {
        render(<FiscalAccumulatorTaskTable {...props} />)

        const title = testUtils.getColTitle('МР')
        const value = testUtils.getChildByText(
          String(
            fakeFiscalAccumulatorTaskListItem.supportGroup.macroregion.title,
          ),
        )
        const headCell = testUtils.getHeadCell('МР')

        expect(title).toBeInTheDocument()
        expect(value).toBeInTheDocument()
        expect(headCell).toHaveClass(columnWithSortingClass)
        expect(headCell).not.toHaveAttribute('aria-sort')
      })
    })

    describe('Группа поддержки', () => {
      test('Отображается корректно', () => {
        render(<FiscalAccumulatorTaskTable {...props} />)

        const title = testUtils.getColTitle('Группа поддержки')
        const value = testUtils.getChildByText(
          String(fakeFiscalAccumulatorTaskListItem.supportGroup.name),
        )
        const headCell = testUtils.getHeadCell('Группа поддержки')

        expect(title).toBeInTheDocument()
        expect(value).toBeInTheDocument()
        expect(headCell).toHaveClass(columnWithSortingClass)
        expect(headCell).not.toHaveAttribute('aria-sort')
      })
    })

    describe('Категория', () => {
      test('Отображается корректно', () => {
        render(<FiscalAccumulatorTaskTable {...props} />)

        const title = testUtils.getColTitle('Категория')
        const value = testUtils.getChildByText(
          String(fakeFiscalAccumulatorTaskListItem.title),
        )
        const headCell = testUtils.getHeadCell('Категория')

        expect(title).toBeInTheDocument()
        expect(value).toBeInTheDocument()
        expect(headCell).toHaveClass(columnWithSortingClass)
        expect(headCell).not.toHaveAttribute('aria-sort')
      })
    })

    describe('Дата создания заявки', () => {
      test('Отображается корректно', () => {
        render(<FiscalAccumulatorTaskTable {...props} />)

        const title = testUtils.getColTitle('Дата создания заявки')
        const value = testUtils.getChildByText(
          formatDate(fakeFiscalAccumulatorTaskListItem.createdAt),
        )
        const headCell = testUtils.getHeadCell('Дата создания заявки')

        expect(title).toBeInTheDocument()
        expect(value).toBeInTheDocument()
        expect(headCell).toHaveClass(columnWithSortingClass)
        expect(headCell).not.toHaveAttribute('aria-sort')
      })
    })
  })
})
