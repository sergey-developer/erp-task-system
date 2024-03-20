import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { IdType } from 'shared/types/common'
import { MaybeNull, NumberOrString } from 'shared/types/utils'

import {
  ariaSortAttrAscValue,
  ariaSortAttrDescValue,
  ariaSortAttrName,
  columnWithSortingClass,
} from '_tests_/constants/components'
import reportsFixtures from '_tests_/fixtures/reports'
import { render, tableTestUtils } from '_tests_/utils'

import MtsrReportTable from './index'
import { MtsrReportTableProps } from './types'

const mtsrReportItem = reportsFixtures.getMtsrReportItem()

const props: Readonly<MtsrReportTableProps> = {
  dataSource: [mtsrReportItem],
  loading: false,
  onChange: jest.fn(),
  onSelect: jest.fn(),
  selectedRowKeys: [],
}

const getContainer = () => screen.getByTestId('mtsr-report-table')

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

const selectRow = async (user: UserEvent, id: IdType) => {
  const row = getRow(id)
  const checkbox = within(row).getByRole('checkbox')
  await user.click(checkbox)
  return row
}

// loading
const expectLoadingStarted = () => tableTestUtils.expectLoadingStarted(getContainer())
const expectLoadingFinished = () => tableTestUtils.expectLoadingFinished(getContainer())

export const testUtils = {
  getContainer,
  getRow,
  clickRow,
  getHeadCell,
  getColTitle,
  getColValue,
  clickColTitle,
  selectRow,

  expectLoadingStarted,
  expectLoadingFinished,
}

afterEach(() => {
  const onChange = props.onChange as jest.Mock
  const onSelect = props.onSelect as jest.Mock
  onChange.mockReset()
  onSelect.mockReset()
})

describe('Таблица заявок на перемещение оборудования', () => {
  test('Отображается', () => {
    render(<MtsrReportTable {...props} />)

    const table = testUtils.getContainer()
    expect(table).toBeInTheDocument()

    props.dataSource.forEach((item) => {
      const row = testUtils.getRow(item.id)
      expect(row).toBeInTheDocument()
    })
  })

  test('Можно установить сортировку по умолчанию', () => {
    render(<MtsrReportTable {...props} sort='-average_execution_time' />)
    const headCell = testUtils.getHeadCell('MTSR')
    expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)
  })

  test('При выборе строки вызывается обработчик', async () => {
    const { user } = render(<MtsrReportTable {...props} />)

    const row = await testUtils.selectRow(user, mtsrReportItem.id)

    expect(row).toHaveClass('ant-table-row-selected')
    expect(props.onSelect).toBeCalledTimes(1)
    expect(props.onSelect).toBeCalledWith([mtsrReportItem.id], [mtsrReportItem], { type: 'single' })
  })

  test('Можно передать выбранные строки', async () => {
    const mtsrReportItem1 = reportsFixtures.getMtsrReportItem()
    const mtsrReportItem2 = reportsFixtures.getMtsrReportItem()

    const { user } = render(
      <MtsrReportTable
        {...props}
        dataSource={[mtsrReportItem1, mtsrReportItem2]}
        selectedRowKeys={[mtsrReportItem2.id]}
      />,
    )

    const row1 = await testUtils.selectRow(user, mtsrReportItem2.id)
    const row2 = testUtils.getRow(mtsrReportItem1.id)

    expect(row1).toHaveClass('ant-table-row-selected')
    expect(row2).not.toHaveClass('ant-table-row-selected')
  })

  describe('Наименование', () => {
    test('Отображается', () => {
      render(<MtsrReportTable {...props} />)

      const headCell = testUtils.getHeadCell('Наименование')
      const title = testUtils.getColTitle('Наименование')
      const value = testUtils.getColValue(mtsrReportItem.id, mtsrReportItem.title)

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
      expect(headCell).toHaveClass(columnWithSortingClass)
      expect(headCell).not.toHaveAttribute(ariaSortAttrName)
    })

    test('При клике на заголовок обработчик вызывается', async () => {
      const { user } = render(<MtsrReportTable {...props} />)

      await testUtils.clickColTitle(user, 'Наименование')

      expect(props.onChange).toBeCalledTimes(1)
      expect(props.onChange).toBeCalledWith(
        expect.anything(),
        expect.anything(),
        expect.anything(),
        expect.anything(),
      )
    })

    test('Сортировка работает', async () => {
      const { user } = render(<MtsrReportTable {...props} />)

      await testUtils.clickColTitle(user, 'Наименование')
      const headCell = testUtils.getHeadCell('Наименование')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

      await testUtils.clickColTitle(user, 'Наименование')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      await testUtils.clickColTitle(user, 'Наименование')
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      props.dataSource.forEach((item) => {
        const row = testUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })
  })

  describe('MTSR', () => {
    test('Отображается', () => {
      render(<MtsrReportTable {...props} />)

      const headCell = testUtils.getHeadCell('MTSR')
      const title = testUtils.getColTitle('MTSR')
      const value = testUtils.getColValue(mtsrReportItem.id, mtsrReportItem.averageExecutionTime)

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
      expect(headCell).toHaveClass(columnWithSortingClass)
      expect(headCell).not.toHaveAttribute(ariaSortAttrName)
    })

    test('При клике на заголовок обработчик вызывается', async () => {
      const { user } = render(<MtsrReportTable {...props} />)

      await testUtils.clickColTitle(user, 'MTSR')

      expect(props.onChange).toBeCalledTimes(1)
      expect(props.onChange).toBeCalledWith(
        expect.anything(),
        expect.anything(),
        expect.anything(),
        expect.anything(),
      )
    })

    test('Сортировка работает', async () => {
      const { user } = render(<MtsrReportTable {...props} />)

      await testUtils.clickColTitle(user, 'MTSR')
      const headCell = testUtils.getHeadCell('MTSR')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

      await testUtils.clickColTitle(user, 'MTSR')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      await testUtils.clickColTitle(user, 'MTSR')
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      props.dataSource.forEach((item) => {
        const row = testUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })
  })

  describe('Возврат в работу', () => {
    test('Отображается', () => {
      render(<MtsrReportTable {...props} />)

      const headCell = testUtils.getHeadCell('Возврат в работу')
      const title = testUtils.getColTitle('Возврат в работу')
      const value = testUtils.getColValue(mtsrReportItem.id, mtsrReportItem.returnedAmount)

      expect(headCell).toHaveClass(columnWithSortingClass)
      expect(headCell).not.toHaveAttribute(ariaSortAttrName)
      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('При клике на заголовок обработчик вызывается', async () => {
      const { user } = render(<MtsrReportTable {...props} />)

      await testUtils.clickColTitle(user, 'Возврат в работу')

      expect(props.onChange).toBeCalledTimes(1)
      expect(props.onChange).toBeCalledWith(
        expect.anything(),
        expect.anything(),
        expect.anything(),
        expect.anything(),
      )
    })

    test('Сортировка работает', async () => {
      const { user } = render(<MtsrReportTable {...props} />)

      await testUtils.clickColTitle(user, 'Возврат в работу')
      const headCell = testUtils.getHeadCell('Возврат в работу')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

      await testUtils.clickColTitle(user, 'Возврат в работу')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      await testUtils.clickColTitle(user, 'Возврат в работу')
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      props.dataSource.forEach((item) => {
        const row = testUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })
  })

  describe('Заявок всего', () => {
    test('Отображается', () => {
      render(<MtsrReportTable {...props} />)

      const headCell = testUtils.getHeadCell('Заявок всего')
      const title = testUtils.getColTitle('Заявок всего')
      const value = testUtils.getColValue(mtsrReportItem.id, mtsrReportItem.allTasks)

      expect(headCell).toHaveClass(columnWithSortingClass)
      expect(headCell).not.toHaveAttribute(ariaSortAttrName)
      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('При клике на заголовок обработчик вызывается', async () => {
      const { user } = render(<MtsrReportTable {...props} />)

      await testUtils.clickColTitle(user, 'Заявок всего')

      expect(props.onChange).toBeCalledTimes(1)
      expect(props.onChange).toBeCalledWith(
        expect.anything(),
        expect.anything(),
        expect.anything(),
        expect.anything(),
      )
    })

    test('Сортировка работает', async () => {
      const { user } = render(<MtsrReportTable {...props} />)

      await testUtils.clickColTitle(user, 'Заявок всего')
      const headCell = testUtils.getHeadCell('Заявок всего')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

      await testUtils.clickColTitle(user, 'Заявок всего')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      await testUtils.clickColTitle(user, 'Заявок всего')
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      props.dataSource.forEach((item) => {
        const row = testUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })
  })

  describe('Решено заявок', () => {
    test('Отображается', () => {
      render(<MtsrReportTable {...props} />)

      const headCell = testUtils.getHeadCell('Решено заявок')
      const title = testUtils.getColTitle('Решено заявок')
      const value = testUtils.getColValue(mtsrReportItem.id, mtsrReportItem.completedTasks)

      expect(headCell).toHaveClass(columnWithSortingClass)
      expect(headCell).not.toHaveAttribute(ariaSortAttrName)
      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('При клике на заголовок обработчик вызывается', async () => {
      const { user } = render(<MtsrReportTable {...props} />)

      await testUtils.clickColTitle(user, 'Решено заявок')

      expect(props.onChange).toBeCalledTimes(1)
      expect(props.onChange).toBeCalledWith(
        expect.anything(),
        expect.anything(),
        expect.anything(),
        expect.anything(),
      )
    })

    test('Сортировка работает', async () => {
      const { user } = render(<MtsrReportTable {...props} />)

      await testUtils.clickColTitle(user, 'Решено заявок')
      const headCell = testUtils.getHeadCell('Решено заявок')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

      await testUtils.clickColTitle(user, 'Решено заявок')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      await testUtils.clickColTitle(user, 'Решено заявок')
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      props.dataSource.forEach((item) => {
        const row = testUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })
  })

  describe('Просроченных заявок', () => {
    test('Отображается', () => {
      render(<MtsrReportTable {...props} />)

      const headCell = testUtils.getHeadCell('Просроченных заявок')
      const title = testUtils.getColTitle('Просроченных заявок')
      const value = testUtils.getColValue(mtsrReportItem.id, mtsrReportItem.overdueTasks)

      expect(headCell).toHaveClass(columnWithSortingClass)
      expect(headCell).not.toHaveAttribute(ariaSortAttrName)
      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('При клике на заголовок обработчик вызывается', async () => {
      const { user } = render(<MtsrReportTable {...props} />)

      await testUtils.clickColTitle(user, 'Просроченных заявок')

      expect(props.onChange).toBeCalledTimes(1)
      expect(props.onChange).toBeCalledWith(
        expect.anything(),
        expect.anything(),
        expect.anything(),
        expect.anything(),
      )
    })

    test('Сортировка работает', async () => {
      const { user } = render(<MtsrReportTable {...props} />)

      await testUtils.clickColTitle(user, 'Просроченных заявок')
      const headCell = testUtils.getHeadCell('Просроченных заявок')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

      await testUtils.clickColTitle(user, 'Просроченных заявок')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      await testUtils.clickColTitle(user, 'Просроченных заявок')
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      props.dataSource.forEach((item) => {
        const row = testUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })
  })
})
