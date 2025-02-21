import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import { getFullUserName } from 'features/users/helpers'

import { MaybeNull, NumberOrString } from 'shared/types/utils'
import { formatDate } from 'shared/utils/date'

import reportsFixtures from '_tests_/fixtures/api/data/reports'
import { iconTestUtils, render, tableTestUtils } from '_tests_/helpers'

import FiscalAccumulatorTasksReportTable from './index'
import {
  FiscalAccumulatorTasksReportTableItem,
  FiscalAccumulatorTasksReportTableProps,
} from './types'

const fiscalAccumulatorTask = reportsFixtures.fiscalAccumulatorTask()

const props: Readonly<FiscalAccumulatorTasksReportTableProps> = {
  dataSource: [fiscalAccumulatorTask],
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
) => tableTestUtils.clickRowById(getContainer(), user, id)

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
          fiscalAccumulatorTask.olaNextBreachTime,
          fiscalAccumulatorTask.blockingIn!,
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
          fiscalAccumulatorTask.olaNextBreachTime,
          formatDate(fiscalAccumulatorTask.olaNextBreachTime),
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
          fiscalAccumulatorTask.olaNextBreachTime,
          fiscalAccumulatorTask.recordId,
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
          fiscalAccumulatorTask.olaNextBreachTime,
          fiscalAccumulatorTask.sapId,
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
          fiscalAccumulatorTask.olaNextBreachTime,
          fiscalAccumulatorTask.name,
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
          fiscalAccumulatorTask.olaNextBreachTime,
          fiscalAccumulatorTask.address,
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
          fiscalAccumulatorTask.olaNextBreachTime,
          fiscalAccumulatorTask.fiscalAccumulator!.faNumber,
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
          fiscalAccumulatorTask.olaNextBreachTime,
          fiscalAccumulatorTask.deadlineOrTotalFiscalDocs!,
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
          fiscalAccumulatorTask.olaNextBreachTime,
          fiscalAccumulatorTask.supportGroup.macroregion!.title,
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
          fiscalAccumulatorTask.olaNextBreachTime,
          fiscalAccumulatorTask.supportGroup.name,
        )

        expect(title).toBeInTheDocument()
        expect(value).toBeInTheDocument()
      })
    })

    test('Исполнитель отображается', () => {
      render(<FiscalAccumulatorTasksReportTable {...props} />)

      const title = testUtils.getColTitle('Исполнитель')
      const value = testUtils.getColValue(
        fiscalAccumulatorTask.olaNextBreachTime,
        getFullUserName(fiscalAccumulatorTask.assignee!),
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    describe('Категория', () => {
      test('Отображается корректно', () => {
        render(<FiscalAccumulatorTasksReportTable {...props} />)

        const title = testUtils.getColTitle('Категория')
        const value = testUtils.getColValue(
          fiscalAccumulatorTask.olaNextBreachTime,
          fiscalAccumulatorTask.title,
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
          fiscalAccumulatorTask.olaNextBreachTime,
          formatDate(fiscalAccumulatorTask.createdAt),
        )

        expect(title).toBeInTheDocument()
        expect(value).toBeInTheDocument()
      })
    })

    test('Комментарий отображается', () => {
      render(<FiscalAccumulatorTasksReportTable {...props} />)

      const title = testUtils.getColTitle('Комментарий')
      const value = testUtils.getColValue(
        fiscalAccumulatorTask.olaNextBreachTime,
        fiscalAccumulatorTask.comment!.text,
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })
  })
})
