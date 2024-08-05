import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { getFullUserName } from 'modules/user/utils'

import { MaybeNull, NumberOrString } from 'shared/types/utils'
import { formatDate } from 'shared/utils/date'

import reportsFixtures from '_tests_/fixtures/reports'
import { iconTestUtils, render, tableTestUtils } from '_tests_/utils'

import FiscalAccumulatorTasksReportTable from './index'
import {
  FiscalAccumulatorTasksReportTableItem,
  FiscalAccumulatorTasksReportTableProps,
} from './types'

const fiscalAccumulatorTaskListItem = reportsFixtures.fiscalAccumulatorTaskListItem()

const props: Readonly<FiscalAccumulatorTasksReportTableProps> = {
  dataSource: [fiscalAccumulatorTaskListItem],
  loading: false,
  onRow: jest.fn(),
}

const getContainer = () => screen.getByTestId('fiscal-accumulator-tasks-report-table')
const getChildByText = (text: string) => within(getContainer()).getByText(text)
const queryChildByText = (text: string) => within(getContainer()).queryByText(text)

const getRow = (id: FiscalAccumulatorTasksReportTableItem['olaNextBreachTime']) =>
  tableTestUtils.getRowById(getContainer(), id)

const clickRow = async (
  user: UserEvent,
  id: FiscalAccumulatorTasksReportTableItem['olaNextBreachTime'],
) => tableTestUtils.clickRowIn(getContainer(), user, id)

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
  id: FiscalAccumulatorTasksReportTableItem['olaNextBreachTime'],
  value: NumberOrString,
): MaybeNull<HTMLElement> => {
  const row = getRow(id)
  return row ? within(row).getByText(value) : null
}

const expectLoadingStarted = () => iconTestUtils.expectLoadingStartedIn(getContainer())
const expectLoadingFinished = () => iconTestUtils.expectLoadingFinishedIn(getContainer())

export const testUtils = {
  getContainer,
  getChildByText,
  queryChildByText,
  getRow,
  clickRow,
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
    render(<FiscalAccumulatorTasksReportTable {...props} />)

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
        render(<FiscalAccumulatorTasksReportTable {...props} />)

        const title = testUtils.getColTitle('Блокировка через')
        const value = testUtils.getColValue(
          fiscalAccumulatorTaskListItem.olaNextBreachTime,
          fiscalAccumulatorTaskListItem.blockingIn!,
        )

        expect(title).toBeInTheDocument()
        expect(value).toBeInTheDocument()
      })
    })

    describe('Крайний срок', () => {
      test('Отображается корректно', () => {
        render(<FiscalAccumulatorTasksReportTable {...props} />)

        const title = testUtils.getColTitle('Крайний срок')
        const value = testUtils.getColValue(
          fiscalAccumulatorTaskListItem.olaNextBreachTime,
          formatDate(fiscalAccumulatorTaskListItem.olaNextBreachTime),
        )

        expect(title).toBeInTheDocument()
        expect(value).toBeInTheDocument()
      })
    })

    describe('ИНЦ', () => {
      test('Отображается корректно', () => {
        render(<FiscalAccumulatorTasksReportTable {...props} />)

        const title = testUtils.getColTitle('ИНЦ')
        const value = testUtils.getColValue(
          fiscalAccumulatorTaskListItem.olaNextBreachTime,
          fiscalAccumulatorTaskListItem.recordId,
        )

        expect(title).toBeInTheDocument()
        expect(value).toBeInTheDocument()
      })
    })

    describe('SAP ID', () => {
      test('Отображается корректно', () => {
        render(<FiscalAccumulatorTasksReportTable {...props} />)

        const title = testUtils.getColTitle('SAP ID')
        const value = testUtils.getColValue(
          fiscalAccumulatorTaskListItem.olaNextBreachTime,
          fiscalAccumulatorTaskListItem.sapId,
        )

        expect(title).toBeInTheDocument()
        expect(value).toBeInTheDocument()
      })
    })

    describe('Клиент', () => {
      test('Отображается корректно', () => {
        render(<FiscalAccumulatorTasksReportTable {...props} />)

        const title = testUtils.getColTitle('Клиент')
        const value = testUtils.getColValue(
          fiscalAccumulatorTaskListItem.olaNextBreachTime,
          fiscalAccumulatorTaskListItem.name,
        )

        expect(title).toBeInTheDocument()
        expect(value).toBeInTheDocument()
      })
    })

    describe('Адрес', () => {
      test('Отображается корректно', () => {
        render(<FiscalAccumulatorTasksReportTable {...props} />)

        const title = testUtils.getColTitle('Адрес')
        const value = testUtils.getColValue(
          fiscalAccumulatorTaskListItem.olaNextBreachTime,
          fiscalAccumulatorTaskListItem.address,
        )

        expect(title).toBeInTheDocument()
        expect(value).toBeInTheDocument()
      })
    })

    describe('ФН', () => {
      test('Отображается корректно', () => {
        render(<FiscalAccumulatorTasksReportTable {...props} />)

        const title = testUtils.getColTitle('ФН')
        const value = testUtils.getColValue(
          fiscalAccumulatorTaskListItem.olaNextBreachTime,
          fiscalAccumulatorTaskListItem.fiscalAccumulator!.faNumber,
        )

        expect(title).toBeInTheDocument()
        expect(value).toBeInTheDocument()
      })
    })

    describe('Срок / Всего ФД', () => {
      test('Отображается корректно', () => {
        render(<FiscalAccumulatorTasksReportTable {...props} />)

        const title = testUtils.getColTitle('Срок / Всего ФД')
        const value = testUtils.getColValue(
          fiscalAccumulatorTaskListItem.olaNextBreachTime,
          fiscalAccumulatorTaskListItem.deadlineOrTotalFiscalDocs!,
        )

        expect(title).toBeInTheDocument()
        expect(value).toBeInTheDocument()
      })
    })

    describe('МР', () => {
      test('Отображается корректно', () => {
        render(<FiscalAccumulatorTasksReportTable {...props} />)

        const title = testUtils.getColTitle('МР')
        const value = testUtils.getColValue(
          fiscalAccumulatorTaskListItem.olaNextBreachTime,
          fiscalAccumulatorTaskListItem.supportGroup.macroregion!.title,
        )

        expect(title).toBeInTheDocument()
        expect(value).toBeInTheDocument()
      })
    })

    describe('Группа поддержки', () => {
      test('Отображается корректно', () => {
        render(<FiscalAccumulatorTasksReportTable {...props} />)

        const title = testUtils.getColTitle('Группа поддержки')
        const value = testUtils.getColValue(
          fiscalAccumulatorTaskListItem.olaNextBreachTime,
          fiscalAccumulatorTaskListItem.supportGroup.name,
        )

        expect(title).toBeInTheDocument()
        expect(value).toBeInTheDocument()
      })
    })

    test('Исполнитель отображается', () => {
      render(<FiscalAccumulatorTasksReportTable {...props} />)

      const title = testUtils.getColTitle('Исполнитель')
      const value = testUtils.getColValue(
        fiscalAccumulatorTaskListItem.olaNextBreachTime,
        getFullUserName(fiscalAccumulatorTaskListItem.assignee!),
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    describe('Категория', () => {
      test('Отображается корректно', () => {
        render(<FiscalAccumulatorTasksReportTable {...props} />)

        const title = testUtils.getColTitle('Категория')
        const value = testUtils.getColValue(
          fiscalAccumulatorTaskListItem.olaNextBreachTime,
          fiscalAccumulatorTaskListItem.title,
        )

        expect(title).toBeInTheDocument()
        expect(value).toBeInTheDocument()
      })
    })

    describe('Дата создания заявки', () => {
      test('Отображается корректно', () => {
        render(<FiscalAccumulatorTasksReportTable {...props} />)

        const title = testUtils.getColTitle('Дата создания заявки')
        const value = testUtils.getColValue(
          fiscalAccumulatorTaskListItem.olaNextBreachTime,
          formatDate(fiscalAccumulatorTaskListItem.createdAt),
        )

        expect(title).toBeInTheDocument()
        expect(value).toBeInTheDocument()
      })
    })

    test('Комментарий отображается', () => {
      render(<FiscalAccumulatorTasksReportTable {...props} />)

      const title = testUtils.getColTitle('Комментарий')
      const value = testUtils.getColValue(
        fiscalAccumulatorTaskListItem.olaNextBreachTime,
        fiscalAccumulatorTaskListItem.comment!.text,
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })
  })
})
