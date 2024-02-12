import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { relocationTaskStatusDict } from 'modules/warehouse/constants/relocationTask'

import { IdType } from 'shared/types/common'
import { MaybeNull, NumberOrString } from 'shared/types/utils'
import { formatDate } from 'shared/utils/date'

import reportsFixtures from '_tests_/fixtures/reports'
import { render, tableTestUtils } from '_tests_/utils'

import EmployeesActionsReportTable from './index'
import HistoryNomenclatureOperationsReportTable from './index'
import { HistoryNomenclatureOperationsReportTableProps } from './types'

const reportListItem = reportsFixtures.historyNomenclatureOperationsReportListItem()

const props: Readonly<HistoryNomenclatureOperationsReportTableProps> = {
  dataSource: [reportListItem],
  pagination: {},
  loading: false,
  onChange: jest.fn(),
  onClickEquipment: jest.fn(),
  onClickRelocationTask: jest.fn(),
}

const getContainer = () => screen.getByTestId('history-nomenclature-operations-report-table')

const getRow = (id: IdType) => tableTestUtils.getRowIn(getContainer(), id)
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

describe('Таблица отчета истории операций по номенклатуре', () => {
  test('Отображается корректно', () => {
    render(<HistoryNomenclatureOperationsReportTable {...props} />)

    const table = testUtils.getContainer()

    expect(table).toBeInTheDocument()
    tableTestUtils.expectPaginationEnabledIn(table)

    props.dataSource.forEach((item) => {
      const row = testUtils.getRow(item.id)
      expect(row).toBeInTheDocument()
    })
  })

  test('Пагинация работает', async () => {
    const report = reportsFixtures.historyNomenclatureOperationsReport(11)

    const { user } = render(
      <HistoryNomenclatureOperationsReportTable {...props} dataSource={report} />,
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
    report.slice(-1).forEach((item) => {
      const row = testUtils.getRow(item.id)
      expect(row).toBeInTheDocument()
    })
  })

  describe('Колонка оборудование', () => {
    test('Отображается', () => {
      render(<HistoryNomenclatureOperationsReportTable {...props} />)

      const title = testUtils.getColTitle('Оборудование')
      const value = testUtils.getColValue(reportListItem.id, reportListItem.equipment.title)

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('При клике на значение вызывается обработчик', async () => {
      const { user } = render(<HistoryNomenclatureOperationsReportTable {...props} />)

      await testUtils.clickColValue(user, reportListItem.id, reportListItem.equipment.title)

      expect(props.onClickEquipment).toBeCalledTimes(1)
      expect(props.onClickEquipment).toBeCalledWith(reportListItem.equipment.id)
    })
  })

  describe('Колонка перемещение', () => {
    test('Отображается', () => {
      render(<EmployeesActionsReportTable {...props} />)

      const title = testUtils.getColTitle('Перемещение')
      const value = testUtils.getColValue(
        reportListItem.id,
        `№${reportListItem.relocationTask.id} от ${formatDate(
          reportListItem.relocationTask.createdAt,
        )} (${relocationTaskStatusDict[reportListItem.relocationTask.status]})`,
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('При клике на значение вызывается обработчик', async () => {
      const { user } = render(<EmployeesActionsReportTable {...props} />)

      await testUtils.clickColValue(
        user,
        reportListItem.id,
        `№${reportListItem.relocationTask.id} от ${formatDate(
          reportListItem.relocationTask.createdAt,
        )} (${relocationTaskStatusDict[reportListItem.relocationTask.status]})`,
      )

      expect(props.onClickRelocationTask).toBeCalledTimes(1)
      expect(props.onClickRelocationTask).toBeCalledWith(reportListItem.relocationTask.id)
    })
  })

  test('Колонка объект выбытия отображается', () => {
    render(<HistoryNomenclatureOperationsReportTable {...props} />)

    const title = testUtils.getColTitle('Объект выбытия')
    const value = testUtils.getColValue(
      reportListItem.id,
      reportListItem.relocationTask.relocateFrom!.title,
    )

    expect(title).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  test('Колонка объект прибытия отображается', () => {
    render(<HistoryNomenclatureOperationsReportTable {...props} />)

    const title = testUtils.getColTitle('Объект прибытия')
    const value = testUtils.getColValue(
      reportListItem.id,
      reportListItem.relocationTask.relocateTo!.title,
    )

    expect(title).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  test('Колонка количество отображается', () => {
    render(<HistoryNomenclatureOperationsReportTable {...props} />)

    const title = testUtils.getColTitle('Количество')
    const value = testUtils.getColValue(reportListItem.id, reportListItem.quantity)

    expect(title).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })
})
