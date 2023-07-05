import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import { TableAction } from 'antd/es/table/interface'

import { MaybeNull } from 'shared/interfaces/utils'
import { formatDate } from 'shared/utils/date'

import taskFixtures from 'fixtures/task'

import {
  ariaSortAttrAscValue,
  ariaSortAttrDescValue,
  ariaSortAttrName,
  columnWithSortingClass,
} from '_tests_/constants/components'
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

const getColValue = (id: number, value: string): MaybeNull<HTMLElement> => {
  const row = getRow(id)
  return row ? within(row).getByText(value) : null
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
  getColValue,
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
        const value = testUtils.getColValue(
          fakeFiscalAccumulatorTaskListItem.id,
          String(fakeFiscalAccumulatorTaskListItem.blockingIn),
        )
        const headCell = testUtils.getHeadCell('Блокировка через')

        expect(title).toBeInTheDocument()
        expect(value).toBeInTheDocument()
        expect(headCell).toHaveClass(columnWithSortingClass)
        expect(headCell).not.toHaveAttribute(ariaSortAttrName)
      })

      test('При клике на заголовок обработчик вызывается корректно', async () => {
        const { user } = render(<FiscalAccumulatorTaskTable {...props} />)

        await testUtils.clickColTitle(user, 'Блокировка через')

        expect(props.onChange).toBeCalledTimes(1)
        expect(props.onChange).toBeCalledWith(
          expect.anything(),
          expect.anything(),
          expect.anything(),
          expect.anything(),
        )
      })

      test('Сортировка работает корректно', async () => {
        const { user } = render(<FiscalAccumulatorTaskTable {...props} />)

        await testUtils.clickColTitle(user, 'Блокировка через')
        const headCell = testUtils.getHeadCell('Блокировка через')
        expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

        await testUtils.clickColTitle(user, 'Блокировка через')
        expect(headCell).toHaveAttribute(
          ariaSortAttrName,
          ariaSortAttrDescValue,
        )
      })
    })

    describe('Крайний срок', () => {
      test('Отображается корректно', () => {
        render(<FiscalAccumulatorTaskTable {...props} />)

        const title = testUtils.getColTitle('Крайний срок')
        const value = testUtils.getColValue(
          fakeFiscalAccumulatorTaskListItem.id,
          formatDate(fakeFiscalAccumulatorTaskListItem.olaNextBreachTime),
        )
        const headCell = testUtils.getHeadCell('Крайний срок')

        expect(title).toBeInTheDocument()
        expect(value).toBeInTheDocument()
        expect(headCell).toHaveClass(columnWithSortingClass)
        expect(headCell).not.toHaveAttribute(ariaSortAttrName)
      })

      test('При клике на заголовок обработчик вызывается корректно', async () => {
        const { user } = render(<FiscalAccumulatorTaskTable {...props} />)

        await testUtils.clickColTitle(user, 'Крайний срок')

        expect(props.onChange).toBeCalledTimes(1)
        expect(props.onChange).toBeCalledWith(
          expect.anything(),
          expect.anything(),
          expect.anything(),
          expect.anything(),
        )
      })

      test('Сортировка работает корректно', async () => {
        const { user } = render(<FiscalAccumulatorTaskTable {...props} />)

        await testUtils.clickColTitle(user, 'Крайний срок')
        const headCell = testUtils.getHeadCell('Крайний срок')
        expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

        await testUtils.clickColTitle(user, 'Крайний срок')
        expect(headCell).toHaveAttribute(
          ariaSortAttrName,
          ariaSortAttrDescValue,
        )
      })
    })

    describe('ИНЦ', () => {
      test('Отображается корректно', () => {
        render(<FiscalAccumulatorTaskTable {...props} />)

        const title = testUtils.getColTitle('ИНЦ')
        const value = testUtils.getColValue(
          fakeFiscalAccumulatorTaskListItem.id,
          fakeFiscalAccumulatorTaskListItem.recordId,
        )
        const headCell = testUtils.getHeadCell('ИНЦ')

        expect(title).toBeInTheDocument()
        expect(value).toBeInTheDocument()
        expect(headCell).toHaveClass(columnWithSortingClass)
        expect(headCell).not.toHaveAttribute(ariaSortAttrName)
      })

      test('При клике на заголовок обработчик вызывается корректно', async () => {
        const { user } = render(<FiscalAccumulatorTaskTable {...props} />)

        await testUtils.clickColTitle(user, 'ИНЦ')

        expect(props.onChange).toBeCalledTimes(1)
        expect(props.onChange).toBeCalledWith(
          expect.anything(),
          expect.anything(),
          expect.anything(),
          expect.anything(),
        )
      })

      test('Сортировка работает корректно', async () => {
        const { user } = render(<FiscalAccumulatorTaskTable {...props} />)

        await testUtils.clickColTitle(user, 'ИНЦ')
        const headCell = testUtils.getHeadCell('ИНЦ')
        expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

        await testUtils.clickColTitle(user, 'ИНЦ')
        expect(headCell).toHaveAttribute(
          ariaSortAttrName,
          ariaSortAttrDescValue,
        )
      })
    })

    describe('SAP ID', () => {
      test('Отображается корректно', () => {
        render(<FiscalAccumulatorTaskTable {...props} />)

        const title = testUtils.getColTitle('SAP ID')
        const value = testUtils.getColValue(
          fakeFiscalAccumulatorTaskListItem.id,
          fakeFiscalAccumulatorTaskListItem.sapId,
        )
        const headCell = testUtils.getHeadCell('SAP ID')

        expect(title).toBeInTheDocument()
        expect(value).toBeInTheDocument()
        expect(headCell).toHaveClass(columnWithSortingClass)
        expect(headCell).not.toHaveAttribute(ariaSortAttrName)
      })

      test('При клике на заголовок обработчик вызывается корректно', async () => {
        const { user } = render(<FiscalAccumulatorTaskTable {...props} />)

        await testUtils.clickColTitle(user, 'SAP ID')

        expect(props.onChange).toBeCalledTimes(1)
        expect(props.onChange).toBeCalledWith(
          expect.anything(),
          expect.anything(),
          expect.anything(),
          expect.anything(),
        )
      })

      test('Сортировка работает корректно', async () => {
        const { user } = render(<FiscalAccumulatorTaskTable {...props} />)

        await testUtils.clickColTitle(user, 'SAP ID')
        const headCell = testUtils.getHeadCell('SAP ID')
        expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

        await testUtils.clickColTitle(user, 'SAP ID')
        expect(headCell).toHaveAttribute(
          ariaSortAttrName,
          ariaSortAttrDescValue,
        )
      })
    })

    describe('Клиент', () => {
      test('Отображается корректно', () => {
        render(<FiscalAccumulatorTaskTable {...props} />)

        const title = testUtils.getColTitle('Клиент')
        const value = testUtils.getColValue(
          fakeFiscalAccumulatorTaskListItem.id,
          fakeFiscalAccumulatorTaskListItem.name,
        )
        const headCell = testUtils.getHeadCell('Клиент')

        expect(title).toBeInTheDocument()
        expect(value).toBeInTheDocument()
        expect(headCell).toHaveClass(columnWithSortingClass)
        expect(headCell).not.toHaveAttribute(ariaSortAttrName)
      })

      test('При клике на заголовок обработчик вызывается корректно', async () => {
        const { user } = render(<FiscalAccumulatorTaskTable {...props} />)

        await testUtils.clickColTitle(user, 'Клиент')

        expect(props.onChange).toBeCalledTimes(1)
        expect(props.onChange).toBeCalledWith(
          expect.anything(),
          expect.anything(),
          expect.anything(),
          expect.anything(),
        )
      })

      test('Сортировка работает корректно', async () => {
        const { user } = render(<FiscalAccumulatorTaskTable {...props} />)

        await testUtils.clickColTitle(user, 'Клиент')
        const headCell = testUtils.getHeadCell('Клиент')
        expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

        await testUtils.clickColTitle(user, 'Клиент')
        expect(headCell).toHaveAttribute(
          ariaSortAttrName,
          ariaSortAttrDescValue,
        )
      })
    })

    describe('Адрес', () => {
      test('Отображается корректно', () => {
        render(<FiscalAccumulatorTaskTable {...props} />)

        const title = testUtils.getColTitle('Адрес')
        const value = testUtils.getColValue(
          fakeFiscalAccumulatorTaskListItem.id,
          fakeFiscalAccumulatorTaskListItem.address,
        )
        const headCell = testUtils.getHeadCell('Адрес')

        expect(title).toBeInTheDocument()
        expect(value).toBeInTheDocument()
        expect(headCell).toHaveClass(columnWithSortingClass)
        expect(headCell).not.toHaveAttribute(ariaSortAttrName)
      })

      test('При клике на заголовок обработчик вызывается корректно', async () => {
        const { user } = render(<FiscalAccumulatorTaskTable {...props} />)

        await testUtils.clickColTitle(user, 'Адрес')

        expect(props.onChange).toBeCalledTimes(1)
        expect(props.onChange).toBeCalledWith(
          expect.anything(),
          expect.anything(),
          expect.anything(),
          expect.anything(),
        )
      })

      test('Сортировка работает корректно', async () => {
        const { user } = render(<FiscalAccumulatorTaskTable {...props} />)

        await testUtils.clickColTitle(user, 'Адрес')
        const headCell = testUtils.getHeadCell('Адрес')
        expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

        await testUtils.clickColTitle(user, 'Адрес')
        expect(headCell).toHaveAttribute(
          ariaSortAttrName,
          ariaSortAttrDescValue,
        )
      })
    })

    describe('ФН', () => {
      test('Отображается корректно', () => {
        render(<FiscalAccumulatorTaskTable {...props} />)

        const title = testUtils.getColTitle('ФН')
        const value = testUtils.getColValue(
          fakeFiscalAccumulatorTaskListItem.id,
          String(fakeFiscalAccumulatorTaskListItem.fiscalAccumulator.faNumber),
        )
        const headCell = testUtils.getHeadCell('ФН')

        expect(title).toBeInTheDocument()
        expect(value).toBeInTheDocument()
        expect(headCell).toHaveClass(columnWithSortingClass)
        expect(headCell).not.toHaveAttribute(ariaSortAttrName)
      })

      test('При клике на заголовок обработчик вызывается корректно', async () => {
        const { user } = render(<FiscalAccumulatorTaskTable {...props} />)

        await testUtils.clickColTitle(user, 'ФН')

        expect(props.onChange).toBeCalledTimes(1)
        expect(props.onChange).toBeCalledWith(
          expect.anything(),
          expect.anything(),
          expect.anything(),
          expect.anything(),
        )
      })

      test('Сортировка работает корректно', async () => {
        const { user } = render(<FiscalAccumulatorTaskTable {...props} />)

        await testUtils.clickColTitle(user, 'ФН')
        const headCell = testUtils.getHeadCell('ФН')
        expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

        await testUtils.clickColTitle(user, 'ФН')
        expect(headCell).toHaveAttribute(
          ariaSortAttrName,
          ariaSortAttrDescValue,
        )
      })
    })

    describe('Срок / Всего ФД', () => {
      test('Отображается корректно', () => {
        render(<FiscalAccumulatorTaskTable {...props} />)

        const title = testUtils.getColTitle('Срок / Всего ФД')
        const value = testUtils.getColValue(
          fakeFiscalAccumulatorTaskListItem.id,
          String(fakeFiscalAccumulatorTaskListItem.deadlineOrTotalFiscalDocs),
        )
        const headCell = testUtils.getHeadCell('Срок / Всего ФД')

        expect(title).toBeInTheDocument()
        expect(value).toBeInTheDocument()
        expect(headCell).toHaveClass(columnWithSortingClass)
        expect(headCell).not.toHaveAttribute(ariaSortAttrName)
      })

      test('При клике на заголовок обработчик вызывается корректно', async () => {
        const { user } = render(<FiscalAccumulatorTaskTable {...props} />)

        await testUtils.clickColTitle(user, 'Срок / Всего ФД')

        expect(props.onChange).toBeCalledTimes(1)
        expect(props.onChange).toBeCalledWith(
          expect.anything(),
          expect.anything(),
          expect.anything(),
          expect.anything(),
        )
      })

      test('Сортировка работает корректно', async () => {
        const { user } = render(<FiscalAccumulatorTaskTable {...props} />)

        await testUtils.clickColTitle(user, 'Срок / Всего ФД')
        const headCell = testUtils.getHeadCell('Срок / Всего ФД')
        expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

        await testUtils.clickColTitle(user, 'Срок / Всего ФД')
        expect(headCell).toHaveAttribute(
          ariaSortAttrName,
          ariaSortAttrDescValue,
        )
      })
    })

    describe('МР', () => {
      test('Отображается корректно', () => {
        render(<FiscalAccumulatorTaskTable {...props} />)

        const title = testUtils.getColTitle('МР')
        const value = testUtils.getColValue(
          fakeFiscalAccumulatorTaskListItem.id,
          String(
            fakeFiscalAccumulatorTaskListItem.supportGroup.macroregion.title,
          ),
        )
        const headCell = testUtils.getHeadCell('МР')

        expect(title).toBeInTheDocument()
        expect(value).toBeInTheDocument()
        expect(headCell).toHaveClass(columnWithSortingClass)
        expect(headCell).not.toHaveAttribute(ariaSortAttrName)
      })

      test('При клике на заголовок обработчик вызывается корректно', async () => {
        const { user } = render(<FiscalAccumulatorTaskTable {...props} />)

        await testUtils.clickColTitle(user, 'МР')

        expect(props.onChange).toBeCalledTimes(1)
        expect(props.onChange).toBeCalledWith(
          expect.anything(),
          expect.anything(),
          expect.anything(),
          expect.anything(),
        )
      })

      test('Сортировка работает корректно', async () => {
        const { user } = render(<FiscalAccumulatorTaskTable {...props} />)

        await testUtils.clickColTitle(user, 'МР')
        const headCell = testUtils.getHeadCell('МР')
        expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

        await testUtils.clickColTitle(user, 'МР')
        expect(headCell).toHaveAttribute(
          ariaSortAttrName,
          ariaSortAttrDescValue,
        )
      })
    })

    describe('Группа поддержки', () => {
      test('Отображается корректно', () => {
        render(<FiscalAccumulatorTaskTable {...props} />)

        const title = testUtils.getColTitle('Группа поддержки')
        const value = testUtils.getColValue(
          fakeFiscalAccumulatorTaskListItem.id,
          String(fakeFiscalAccumulatorTaskListItem.supportGroup.name),
        )
        const headCell = testUtils.getHeadCell('Группа поддержки')

        expect(title).toBeInTheDocument()
        expect(value).toBeInTheDocument()
        expect(headCell).toHaveClass(columnWithSortingClass)
        expect(headCell).not.toHaveAttribute(ariaSortAttrName)
      })

      test('При клике на заголовок обработчик вызывается корректно', async () => {
        const { user } = render(<FiscalAccumulatorTaskTable {...props} />)

        await testUtils.clickColTitle(user, 'Группа поддержки')

        expect(props.onChange).toBeCalledTimes(1)
        expect(props.onChange).toBeCalledWith(
          expect.anything(),
          expect.anything(),
          expect.anything(),
          expect.anything(),
        )
      })

      test('Сортировка работает корректно', async () => {
        const { user } = render(<FiscalAccumulatorTaskTable {...props} />)

        await testUtils.clickColTitle(user, 'Группа поддержки')
        const headCell = testUtils.getHeadCell('Группа поддержки')
        expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

        await testUtils.clickColTitle(user, 'Группа поддержки')
        expect(headCell).toHaveAttribute(
          ariaSortAttrName,
          ariaSortAttrDescValue,
        )
      })
    })

    describe('Категория', () => {
      test('Отображается корректно', () => {
        render(<FiscalAccumulatorTaskTable {...props} />)

        const title = testUtils.getColTitle('Категория')
        const value = testUtils.getColValue(
          fakeFiscalAccumulatorTaskListItem.id,
          String(fakeFiscalAccumulatorTaskListItem.title),
        )
        const headCell = testUtils.getHeadCell('Категория')

        expect(title).toBeInTheDocument()
        expect(value).toBeInTheDocument()
        expect(headCell).toHaveClass(columnWithSortingClass)
        expect(headCell).not.toHaveAttribute(ariaSortAttrName)
      })

      test('При клике на заголовок обработчик вызывается корректно', async () => {
        const { user } = render(<FiscalAccumulatorTaskTable {...props} />)

        await testUtils.clickColTitle(user, 'Категория')

        expect(props.onChange).toBeCalledTimes(1)
        expect(props.onChange).toBeCalledWith(
          expect.anything(),
          expect.anything(),
          expect.anything(),
          expect.anything(),
        )
      })

      test('Сортировка работает корректно', async () => {
        const { user } = render(<FiscalAccumulatorTaskTable {...props} />)

        await testUtils.clickColTitle(user, 'Категория')
        const headCell = testUtils.getHeadCell('Категория')
        expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

        await testUtils.clickColTitle(user, 'Категория')
        expect(headCell).toHaveAttribute(
          ariaSortAttrName,
          ariaSortAttrDescValue,
        )
      })
    })

    describe('Дата создания заявки', () => {
      test('Отображается корректно', () => {
        render(<FiscalAccumulatorTaskTable {...props} />)

        const title = testUtils.getColTitle('Дата создания заявки')
        const value = testUtils.getColValue(
          fakeFiscalAccumulatorTaskListItem.id,
          formatDate(fakeFiscalAccumulatorTaskListItem.createdAt),
        )
        const headCell = testUtils.getHeadCell('Дата создания заявки')

        expect(title).toBeInTheDocument()
        expect(value).toBeInTheDocument()
        expect(headCell).toHaveClass(columnWithSortingClass)
        expect(headCell).not.toHaveAttribute(ariaSortAttrName)
      })

      test('При клике на заголовок обработчик вызывается корректно', async () => {
        const { user } = render(<FiscalAccumulatorTaskTable {...props} />)

        await testUtils.clickColTitle(user, 'Дата создания заявки')

        expect(props.onChange).toBeCalledTimes(1)
        expect(props.onChange).toBeCalledWith(
          expect.anything(),
          expect.anything(),
          expect.anything(),
          expect.anything(),
        )
      })

      test('Сортировка работает корректно', async () => {
        const { user } = render(<FiscalAccumulatorTaskTable {...props} />)

        await testUtils.clickColTitle(user, 'Дата создания заявки')
        const headCell = testUtils.getHeadCell('Дата создания заявки')
        expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

        await testUtils.clickColTitle(user, 'Дата создания заявки')
        expect(headCell).toHaveAttribute(
          ariaSortAttrName,
          ariaSortAttrDescValue,
        )
      })
    })
  })
})
