import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { MaybeNull } from 'shared/interfaces/utils'
import { formatDate } from 'shared/utils/date'

import taskFixtures from 'fixtures/task'

import {
  expectLoadingFinishedByIconIn,
  expectLoadingStartedByIconIn,
  render,
} from '_tests_/utils'

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
}

const getContainer = () => screen.getByTestId('fiscal-accumulator-task-table')

const getChildByText = (text: string) => within(getContainer()).getByText(text)

const queryChildByText = (text: string) =>
  within(getContainer()).queryByText(text)

const getRow = (
  id: FiscalAccumulatorTaskTableItem['olaNextBreachTime'],
): MaybeNull<HTMLElement> =>
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

const getColValue = (
  id: FiscalAccumulatorTaskTableItem['olaNextBreachTime'],
  value: string,
): MaybeNull<HTMLElement> => {
  const row = getRow(id)
  return row ? within(row).getByText(value) : null
}

const expectLoadingStarted = () => expectLoadingStartedByIconIn(getContainer())

const expectLoadingFinished = () =>
  expectLoadingFinishedByIconIn(getContainer())

export const testUtils = {
  getContainer,
  getRow,
  getChildByText,
  queryChildByText,
  getHeadCell,
  getColTitle,
  getColValue,
  queryColTitle,
  clickColTitle,

  expectLoadingStarted,
  expectLoadingFinished,
}

describe('Таблица заявок фискальных накопителей', () => {
  test('Отображается корректно', () => {
    render(<FiscalAccumulatorTaskTable {...props} />)

    const table = testUtils.getContainer()

    expect(table).toBeInTheDocument()

    props.dataSource.forEach((item) => {
      const row = testUtils.getRow(item.olaNextBreachTime)
      expect(row).toBeInTheDocument()
    })
  })

  describe('Колонка', () => {
    describe('Блокировка через', () => {
      test('Отображается корректно', () => {
        render(<FiscalAccumulatorTaskTable {...props} />)

        const title = testUtils.getColTitle('Блокировка через')
        const value = testUtils.getColValue(
          fakeFiscalAccumulatorTaskListItem.olaNextBreachTime,
          String(fakeFiscalAccumulatorTaskListItem.blockingIn),
        )

        expect(title).toBeInTheDocument()
        expect(value).toBeInTheDocument()
      })
    })

    describe('Крайний срок', () => {
      test('Отображается корректно', () => {
        render(<FiscalAccumulatorTaskTable {...props} />)

        const title = testUtils.getColTitle('Крайний срок')
        const value = testUtils.getColValue(
          fakeFiscalAccumulatorTaskListItem.olaNextBreachTime,
          formatDate(fakeFiscalAccumulatorTaskListItem.olaNextBreachTime),
        )

        expect(title).toBeInTheDocument()
        expect(value).toBeInTheDocument()
      })
    })

    describe('ИНЦ', () => {
      test('Отображается корректно', () => {
        render(<FiscalAccumulatorTaskTable {...props} />)

        const title = testUtils.getColTitle('ИНЦ')
        const value = testUtils.getColValue(
          fakeFiscalAccumulatorTaskListItem.olaNextBreachTime,
          fakeFiscalAccumulatorTaskListItem.recordId,
        )

        expect(title).toBeInTheDocument()
        expect(value).toBeInTheDocument()
      })
    })

    describe('SAP ID', () => {
      test('Отображается корректно', () => {
        render(<FiscalAccumulatorTaskTable {...props} />)

        const title = testUtils.getColTitle('SAP ID')
        const value = testUtils.getColValue(
          fakeFiscalAccumulatorTaskListItem.olaNextBreachTime,
          fakeFiscalAccumulatorTaskListItem.sapId,
        )

        expect(title).toBeInTheDocument()
        expect(value).toBeInTheDocument()
      })
    })

    describe('Клиент', () => {
      test('Отображается корректно', () => {
        render(<FiscalAccumulatorTaskTable {...props} />)

        const title = testUtils.getColTitle('Клиент')
        const value = testUtils.getColValue(
          fakeFiscalAccumulatorTaskListItem.olaNextBreachTime,
          fakeFiscalAccumulatorTaskListItem.name,
        )

        expect(title).toBeInTheDocument()
        expect(value).toBeInTheDocument()
      })
    })

    describe('Адрес', () => {
      test('Отображается корректно', () => {
        render(<FiscalAccumulatorTaskTable {...props} />)

        const title = testUtils.getColTitle('Адрес')
        const value = testUtils.getColValue(
          fakeFiscalAccumulatorTaskListItem.olaNextBreachTime,
          fakeFiscalAccumulatorTaskListItem.address,
        )

        expect(title).toBeInTheDocument()
        expect(value).toBeInTheDocument()
      })
    })

    describe('ФН', () => {
      test('Отображается корректно', () => {
        render(<FiscalAccumulatorTaskTable {...props} />)

        const title = testUtils.getColTitle('ФН')
        const value = testUtils.getColValue(
          fakeFiscalAccumulatorTaskListItem.olaNextBreachTime,
          String(fakeFiscalAccumulatorTaskListItem.fiscalAccumulator!.faNumber),
        )

        expect(title).toBeInTheDocument()
        expect(value).toBeInTheDocument()
      })
    })

    describe('Срок / Всего ФД', () => {
      test('Отображается корректно', () => {
        render(<FiscalAccumulatorTaskTable {...props} />)

        const title = testUtils.getColTitle('Срок / Всего ФД')
        const value = testUtils.getColValue(
          fakeFiscalAccumulatorTaskListItem.olaNextBreachTime,
          String(fakeFiscalAccumulatorTaskListItem.deadlineOrTotalFiscalDocs),
        )

        expect(title).toBeInTheDocument()
        expect(value).toBeInTheDocument()
      })
    })

    describe('МР', () => {
      test('Отображается корректно', () => {
        render(<FiscalAccumulatorTaskTable {...props} />)

        const title = testUtils.getColTitle('МР')
        const value = testUtils.getColValue(
          fakeFiscalAccumulatorTaskListItem.olaNextBreachTime,
          String(
            fakeFiscalAccumulatorTaskListItem.supportGroup.macroregion!.title,
          ),
        )

        expect(title).toBeInTheDocument()
        expect(value).toBeInTheDocument()
      })
    })

    describe('Группа поддержки', () => {
      test('Отображается корректно', () => {
        render(<FiscalAccumulatorTaskTable {...props} />)

        const title = testUtils.getColTitle('Группа поддержки')
        const value = testUtils.getColValue(
          fakeFiscalAccumulatorTaskListItem.olaNextBreachTime,
          String(fakeFiscalAccumulatorTaskListItem.supportGroup.name),
        )

        expect(title).toBeInTheDocument()
        expect(value).toBeInTheDocument()
      })
    })

    describe('Категория', () => {
      test('Отображается корректно', () => {
        render(<FiscalAccumulatorTaskTable {...props} />)

        const title = testUtils.getColTitle('Категория')
        const value = testUtils.getColValue(
          fakeFiscalAccumulatorTaskListItem.olaNextBreachTime,
          String(fakeFiscalAccumulatorTaskListItem.title),
        )

        expect(title).toBeInTheDocument()
        expect(value).toBeInTheDocument()
      })
    })

    describe('Дата создания заявки', () => {
      test('Отображается корректно', () => {
        render(<FiscalAccumulatorTaskTable {...props} />)

        const title = testUtils.getColTitle('Дата создания заявки')
        const value = testUtils.getColValue(
          fakeFiscalAccumulatorTaskListItem.olaNextBreachTime,
          formatDate(fakeFiscalAccumulatorTaskListItem.createdAt),
        )

        expect(title).toBeInTheDocument()
        expect(value).toBeInTheDocument()
      })
    })
  })
})
