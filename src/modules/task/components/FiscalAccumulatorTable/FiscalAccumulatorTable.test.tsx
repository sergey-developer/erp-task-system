import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { MaybeNull, NumberOrString } from 'shared/types/utils'
import { formatDate } from 'shared/utils/date'

import taskFixtures from '_tests_/fixtures/task'
import { iconTestUtils, render } from '_tests_/utils'

import FiscalAccumulatorTaskTable from './index'
import { FiscalAccumulatorTableItem, FiscalAccumulatorTableProps } from './types'

const fakeFiscalAccumulatorListItem = taskFixtures.fiscalAccumulatorListItem()

const props: Readonly<FiscalAccumulatorTableProps> = {
  dataSource: [fakeFiscalAccumulatorListItem],
  loading: false,
}

const getContainer = () => screen.getByTestId('fiscal-accumulator-table')

const getChildByText = (text: string) => within(getContainer()).getByText(text)

const queryChildByText = (text: string) => within(getContainer()).queryByText(text)

const getRow = (id: FiscalAccumulatorTableItem['olaNextBreachTime']): MaybeNull<HTMLElement> =>
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
  id: FiscalAccumulatorTableItem['olaNextBreachTime'],
  value: NumberOrString,
): MaybeNull<HTMLElement> => {
  const row = getRow(id)
  return row ? within(row).getByText(value) : null
}

const expectLoadingStarted = () => iconTestUtils.expectLoadingStartedIn(getContainer())

const expectLoadingFinished = () => iconTestUtils.expectLoadingFinishedIn(getContainer())

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
          fakeFiscalAccumulatorListItem.olaNextBreachTime,
          fakeFiscalAccumulatorListItem.blockingIn!,
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
          fakeFiscalAccumulatorListItem.olaNextBreachTime,
          formatDate(fakeFiscalAccumulatorListItem.olaNextBreachTime),
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
          fakeFiscalAccumulatorListItem.olaNextBreachTime,
          fakeFiscalAccumulatorListItem.recordId,
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
          fakeFiscalAccumulatorListItem.olaNextBreachTime,
          fakeFiscalAccumulatorListItem.sapId,
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
          fakeFiscalAccumulatorListItem.olaNextBreachTime,
          fakeFiscalAccumulatorListItem.name,
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
          fakeFiscalAccumulatorListItem.olaNextBreachTime,
          fakeFiscalAccumulatorListItem.address,
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
          fakeFiscalAccumulatorListItem.olaNextBreachTime,
          fakeFiscalAccumulatorListItem.fiscalAccumulator!.faNumber,
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
          fakeFiscalAccumulatorListItem.olaNextBreachTime,
          fakeFiscalAccumulatorListItem.deadlineOrTotalFiscalDocs!,
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
          fakeFiscalAccumulatorListItem.olaNextBreachTime,
          fakeFiscalAccumulatorListItem.supportGroup.macroregion!.title,
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
          fakeFiscalAccumulatorListItem.olaNextBreachTime,
          fakeFiscalAccumulatorListItem.supportGroup.name,
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
          fakeFiscalAccumulatorListItem.olaNextBreachTime,
          fakeFiscalAccumulatorListItem.title,
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
          fakeFiscalAccumulatorListItem.olaNextBreachTime,
          formatDate(fakeFiscalAccumulatorListItem.createdAt),
        )

        expect(title).toBeInTheDocument()
        expect(value).toBeInTheDocument()
      })
    })
  })
})
