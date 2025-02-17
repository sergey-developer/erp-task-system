import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import { equipmentConditionDict } from 'features/equipments/constants'
import { getRelocationTaskReportTableColValue } from 'features/reports/helpers'

import { DATE_FORMAT } from 'shared/constants/dateTime'
import { IdType } from 'shared/types/common'
import { MaybeNull, NumberOrString } from 'shared/types/utils'
import { getYesNoWord } from 'shared/utils/common'
import { formatDate } from 'shared/utils/date'

import reportsFixtures from '_tests_/fixtures/api/data/reports'
import { render, tableTestUtils } from '_tests_/helpers'

import HistoryNomenclatureOperationsReportTable from './index'
import { HistoryNomenclatureOperationsReportTableProps } from './types'

const reportListItem = reportsFixtures.historyNomenclatureOperationsReportItem()

const props: Readonly<HistoryNomenclatureOperationsReportTableProps> = {
  dataSource: [reportListItem],
  pagination: {},
  loading: false,
  onChange: jest.fn(),
  onClickEquipment: jest.fn(),
  onClickRelocationTask: jest.fn(),
}

const getContainer = () => screen.getByTestId('history-nomenclature-operations-report-table')

const getRow = (id: IdType) => tableTestUtils.getRowById(getContainer(), id)
const clickRow = async (user: UserEvent, id: IdType) =>
  tableTestUtils.clickRowById(getContainer(), user, id)

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
      const value = testUtils.getColValue(reportListItem.id, reportListItem.title)

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('При клике на значение вызывается обработчик', async () => {
      const { user } = render(<HistoryNomenclatureOperationsReportTable {...props} />)

      await testUtils.clickColValue(user, reportListItem.id, reportListItem.title)

      expect(props.onClickEquipment).toBeCalledTimes(1)
      expect(props.onClickEquipment).toBeCalledWith(reportListItem.id)
    })
  })

  test('Колонка серийный № отображается', () => {
    render(<HistoryNomenclatureOperationsReportTable {...props} />)

    const title = testUtils.getColTitle('Серийный №')
    const value = testUtils.getColValue(reportListItem.id, reportListItem.serialNumber!)

    expect(title).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  test('Колонка инвентарный № отображается', () => {
    render(<HistoryNomenclatureOperationsReportTable {...props} />)

    const title = testUtils.getColTitle('Инвентарный №')
    const value = testUtils.getColValue(reportListItem.id, reportListItem.inventoryNumber!)

    expect(title).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  test('Колонка состояние', () => {
    render(<HistoryNomenclatureOperationsReportTable {...props} />)

    const title = testUtils.getColTitle('Состояние')
    const value = testUtils.getColValue(
      reportListItem.id,
      equipmentConditionDict[reportListItem.condition],
    )

    expect(title).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  test('Колонка новое', () => {
    const reportListItem = reportsFixtures.historyNomenclatureOperationsReportItem({
      isNew: true,
    })
    render(<HistoryNomenclatureOperationsReportTable {...props} dataSource={[reportListItem]} />)

    const title = testUtils.getColTitle('Новое')
    const value = testUtils.getColValue(reportListItem.id, getYesNoWord(reportListItem.isNew))

    expect(title).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  test('Колонка на гарантии', () => {
    const reportListItem = reportsFixtures.historyNomenclatureOperationsReportItem({
      isWarranty: true,
    })
    render(<HistoryNomenclatureOperationsReportTable {...props} dataSource={[reportListItem]} />)

    const title = testUtils.getColTitle('На гарантии')
    const value = testUtils.getColValue(reportListItem.id, getYesNoWord(reportListItem.isWarranty))

    expect(title).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  test('Колонка отремонтированное', () => {
    const reportListItem = reportsFixtures.historyNomenclatureOperationsReportItem({
      isRepaired: true,
    })
    render(<HistoryNomenclatureOperationsReportTable {...props} dataSource={[reportListItem]} />)

    const title = testUtils.getColTitle('Отремонтированное')
    const value = testUtils.getColValue(reportListItem.id, getYesNoWord(reportListItem.isRepaired))

    expect(title).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  test('Колонка дата оприходования', () => {
    render(<HistoryNomenclatureOperationsReportTable {...props} />)

    const title = testUtils.getColTitle('Дата оприходования')
    const value = testUtils.getColValue(
      reportListItem.id,
      formatDate(reportListItem.creditedAt, DATE_FORMAT),
    )

    expect(title).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  describe('Колонка последнее перемещение', () => {
    test('Отображается', () => {
      render(<HistoryNomenclatureOperationsReportTable {...props} />)

      const title = testUtils.getColTitle('Последнее перемещение')
      const value = testUtils.getColValue(
        reportListItem.id,
        getRelocationTaskReportTableColValue(reportListItem.lastRelocationTask),
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('При клике на значение вызывается обработчик', async () => {
      const { user } = render(<HistoryNomenclatureOperationsReportTable {...props} />)

      await testUtils.clickColValue(
        user,
        reportListItem.id,
        getRelocationTaskReportTableColValue(reportListItem.lastRelocationTask),
      )

      expect(props.onClickRelocationTask).toBeCalledTimes(1)
      expect(props.onClickRelocationTask).toBeCalledWith(reportListItem.lastRelocationTask.id)
    })
  })

  test('Колонка фактическое местонахождение отображается', () => {
    render(<HistoryNomenclatureOperationsReportTable {...props} />)

    const title = testUtils.getColTitle('Фактическое местонахождение')
    const value = testUtils.getColValue(reportListItem.id, reportListItem.location!.title)

    expect(title).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })
})
