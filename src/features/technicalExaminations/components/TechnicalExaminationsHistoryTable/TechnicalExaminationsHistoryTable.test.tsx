import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import { getFullUserName } from 'features/users/helpers'

import { IdType } from 'shared/types/common'
import { MaybeNull, NumberOrString } from 'shared/types/utils'
import { formatDate } from 'shared/utils/date'

import technicalExaminationsFixtures from '_tests_/fixtures/technicalExaminations'
import { render, tableTestUtils } from '_tests_/utils'

import TechnicalExaminationsHistoryTable from './index'
import { TechnicalExaminationsHistoryTableProps } from './types'

const technicalExaminationListItem = technicalExaminationsFixtures.technicalExaminationListItem()

const props: Readonly<TechnicalExaminationsHistoryTableProps> = {
  dataSource: [technicalExaminationListItem],
  loading: false,
}

const getContainer = () => screen.getByTestId('technical-examinations-history-table')

const getRow = (id: IdType) => tableTestUtils.getRowById(getContainer(), id)

const clickRow = async (user: UserEvent, id: IdType) =>
  tableTestUtils.clickRowById(getContainer(), user, id)

const getColTitle = (text: string) => within(getContainer()).getByText(text)
const getColValue = (id: IdType, value: NumberOrString): MaybeNull<HTMLElement> => {
  const row = getRow(id)
  return row ? within(row).getByText(value) : null
}

// loading
const expectLoadingStarted = () => tableTestUtils.expectLoadingStarted(getContainer())
const expectLoadingFinished = () => tableTestUtils.expectLoadingFinished(getContainer())

export const testUtils = {
  getContainer,

  getRow,
  clickRow,
  getColTitle,
  getColValue,

  expectLoadingStarted,
  expectLoadingFinished,
}

describe('Таблица истории технической экспертизы', () => {
  test('Отображается', () => {
    render(<TechnicalExaminationsHistoryTable {...props} />)

    const table = testUtils.getContainer()

    expect(table).toBeInTheDocument()
    props.dataSource.forEach((item) => {
      const row = testUtils.getRow(item.id)
      expect(row).toBeInTheDocument()
    })
  })

  describe('Исполнитель', () => {
    test('Отображается', () => {
      render(<TechnicalExaminationsHistoryTable {...props} />)

      const title = testUtils.getColTitle('Исполнитель')
      const value = testUtils.getColValue(
        technicalExaminationListItem.id,
        getFullUserName(technicalExaminationListItem.createdBy!),
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })
  })

  describe('Сформировано', () => {
    test('Отображается', () => {
      render(<TechnicalExaminationsHistoryTable {...props} />)

      const title = testUtils.getColTitle('Сформировано')
      const value = testUtils.getColValue(
        technicalExaminationListItem.id,
        formatDate(technicalExaminationListItem.createdAt),
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })
  })

  describe('Причина неисправности', () => {
    test('Отображается', () => {
      render(<TechnicalExaminationsHistoryTable {...props} />)

      const title = testUtils.getColTitle('Причина неисправности')
      const value = testUtils.getColValue(
        technicalExaminationListItem.id,
        technicalExaminationListItem.malfunction,
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })
  })

  describe('Имеются следы мех. повреждения', () => {
    test('Отображается - Да', () => {
      const technicalExaminationListItem =
        technicalExaminationsFixtures.technicalExaminationListItem({ hasMechanicalDamage: true })

      render(
        <TechnicalExaminationsHistoryTable
          {...props}
          dataSource={[technicalExaminationListItem]}
        />,
      )

      const title = testUtils.getColTitle('Имеются следы мех. повреждения')
      const value = testUtils.getColValue(technicalExaminationListItem.id, 'Да')

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('Отображается - Нет', () => {
      const technicalExaminationListItem =
        technicalExaminationsFixtures.technicalExaminationListItem({ hasMechanicalDamage: false })

      render(
        <TechnicalExaminationsHistoryTable
          {...props}
          dataSource={[technicalExaminationListItem]}
        />,
      )

      const title = testUtils.getColTitle('Имеются следы мех. повреждения')
      const value = testUtils.getColValue(technicalExaminationListItem.id, 'Нет')

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })
  })

  describe('Для устранения неисправности необходимо', () => {
    test('Отображается', () => {
      render(<TechnicalExaminationsHistoryTable {...props} />)

      const title = testUtils.getColTitle('Для устранения неисправности необходимо')
      const value = testUtils.getColValue(
        technicalExaminationListItem.id,
        technicalExaminationListItem.restorationAction,
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })
  })

  describe('Стоимость восстановления', () => {
    test('Отображается', () => {
      render(<TechnicalExaminationsHistoryTable {...props} />)

      const title = testUtils.getColTitle('Стоимость восстановления')
      const value = testUtils.getColValue(
        technicalExaminationListItem.id,
        technicalExaminationListItem.restorationCost,
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })
  })

  describe('Заключение комиссии', () => {
    test('Отображается', () => {
      render(<TechnicalExaminationsHistoryTable {...props} />)

      const title = testUtils.getColTitle('Заключение комиссии')
      const value = testUtils.getColValue(
        technicalExaminationListItem.id,
        technicalExaminationListItem.conclusion!,
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })
  })
})
