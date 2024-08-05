import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { getRelocationColValue } from 'modules/reports/utils'

import { IdType } from 'shared/types/common'
import { MaybeNull, NumberOrString } from 'shared/types/utils'

import reportsFixtures from '_tests_/fixtures/reports'
import { render, tableTestUtils } from '_tests_/utils'

import AmountEquipmentSpentReportTable from './index'
import { AmountEquipmentSpentReportTableProps } from './types'

const reportListItem = reportsFixtures.amountEquipmentSpentReportListItem()

const props: Readonly<AmountEquipmentSpentReportTableProps> = {
  dataSource: [reportListItem],
  pagination: {},
  loading: false,
  onChange: jest.fn(),
  onClickEquipment: jest.fn(),
  onClickRelocationTask: jest.fn(),
}

const getContainer = () => screen.getByTestId('amount-equipment-spent-report-table')

const getRow = (id: IdType) => tableTestUtils.getRowById(getContainer(), id)
const clickRow = async (user: UserEvent, id: IdType) =>
  tableTestUtils.clickRowIn(getContainer(), user, id)

const getHeadCell = (text: string) => tableTestUtils.getHeadCell(getContainer(), text)
const getColTitle = (text: string) => within(getContainer()).getByText(text)
const getColValue = (id: IdType, value: NumberOrString): MaybeNull<HTMLElement> => {
  const row = getRow(id)
  return row ? within(row).getByText(value) : null
}
const clickColValue = async (user: UserEvent, id: IdType, value: NumberOrString) => {
  const colValue = getColValue(id, value)
  await user.click(colValue!)
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
  clickColValue,

  expectLoadingStarted,
  expectLoadingFinished,
}

describe('Таблица отчета количества потраченного оборудования', () => {
  test('Отображается корректно', () => {
    render(<AmountEquipmentSpentReportTable {...props} />)

    const table = testUtils.getContainer()

    expect(table).toBeInTheDocument()
    tableTestUtils.expectPaginationEnabledIn(table)

    props.dataSource.forEach((item) => {
      const row = testUtils.getRow(item.id)
      expect(row).toBeInTheDocument()
    })
  })

  test('Пагинация работает', async () => {
    const report = reportsFixtures.amountEquipmentSpentReport(11)

    const { user } = render(<AmountEquipmentSpentReportTable {...props} dataSource={report} />)

    const table = testUtils.getContainer()
    await tableTestUtils.clickPaginationNextButtonIn(user, table)

    expect(props.onChange).toBeCalledTimes(1)
    expect(props.onChange).toBeCalledWith(
      expect.anything(),
      expect.anything(),
      expect.anything(),
      expect.anything(),
    )
    report.slice(-1).forEach((item) => {
      const row = testUtils.getRow(item.id)
      expect(row).toBeInTheDocument()
    })
  })

  describe('Колонка оборудование', () => {
    test('Отображается', () => {
      render(<AmountEquipmentSpentReportTable {...props} />)

      const title = testUtils.getColTitle('Оборудование')
      const value = testUtils.getColValue(reportListItem.id, reportListItem.equipment.title)

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('При клике на значение вызывается обработчик', async () => {
      const { user } = render(<AmountEquipmentSpentReportTable {...props} />)

      await testUtils.clickColValue(user, reportListItem.id, reportListItem.equipment.title)

      expect(props.onClickEquipment).toBeCalledTimes(1)
      expect(props.onClickEquipment).toBeCalledWith(reportListItem.equipment.id)
    })
  })

  describe('Колонка перемещение', () => {
    test('Отображается', () => {
      render(<AmountEquipmentSpentReportTable {...props} />)

      const title = testUtils.getColTitle('Перемещение')
      const value = testUtils.getColValue(
        reportListItem.id,
        getRelocationColValue(reportListItem.relocationTask),
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('При клике на значение вызывается обработчик', async () => {
      const { user } = render(<AmountEquipmentSpentReportTable {...props} />)

      await testUtils.clickColValue(
        user,
        reportListItem.id,
        getRelocationColValue(reportListItem.relocationTask),
      )

      expect(props.onClickRelocationTask).toBeCalledTimes(1)
      expect(props.onClickRelocationTask).toBeCalledWith(reportListItem.relocationTask.id)
    })
  })

  test('Колонка объект выбытия отображается', () => {
    render(<AmountEquipmentSpentReportTable {...props} />)

    const title = testUtils.getColTitle('Объект выбытия')
    const value = testUtils.getColValue(
      reportListItem.id,
      reportListItem.relocationTask.relocateFrom!.title,
    )

    expect(title).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  test('Колонка объект прибытия отображается', () => {
    render(<AmountEquipmentSpentReportTable {...props} />)

    const title = testUtils.getColTitle('Объект прибытия')
    const value = testUtils.getColValue(
      reportListItem.id,
      reportListItem.relocationTask.relocateTo!.title,
    )

    expect(title).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  test('Колонка количество отображается', () => {
    render(<AmountEquipmentSpentReportTable {...props} />)

    const title = testUtils.getColTitle('Количество')
    const value = testUtils.getColValue(reportListItem.id, reportListItem.quantity)

    expect(title).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })
})
