import { infrastructureStatusDict } from 'features/infrastructures/constants'
import { getFullUserName } from 'features/user/utils'

import { formatDate } from 'shared/utils/date'

import {
  props,
  tableRow,
} from '_tests_/features/infrastructure/components/InfrastructureStatusHistoryTable/constants'
import { infrastructureStatusHistoryTableTestUtils } from '_tests_/features/infrastructure/components/InfrastructureStatusHistoryTable/testUtils'
import { render, tableTestUtils } from '_tests_/utils'

import InfrastructureStatusHistoryTable from './index'

describe('Таблица оборудования', () => {
  test('Отображает строки и пагинацию', () => {
    render(<InfrastructureStatusHistoryTable {...props} />)

    const table = infrastructureStatusHistoryTableTestUtils.getContainer()

    expect(table).toBeInTheDocument()
    tableTestUtils.expectPaginationEnabledIn(table)

    props.dataSource.forEach((item) => {
      const row = infrastructureStatusHistoryTableTestUtils.getRow(item.id)
      expect(row).toBeInTheDocument()
    })
  })

  describe('Колонка Статус', () => {
    test('Отображается', () => {
      render(<InfrastructureStatusHistoryTable {...props} />)

      const title = infrastructureStatusHistoryTableTestUtils.getColTitle('Статус')
      const value = infrastructureStatusHistoryTableTestUtils.getColValue(
        tableRow.id,
        infrastructureStatusDict[tableRow.status],
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })
  })

  describe('Колонка Изменен', () => {
    test('Отображается', () => {
      render(<InfrastructureStatusHistoryTable {...props} />)

      const title = infrastructureStatusHistoryTableTestUtils.getColTitle('Изменен')
      const value = infrastructureStatusHistoryTableTestUtils.getColValue(
        tableRow.id,
        formatDate(tableRow.createdAt),
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })
  })

  describe('Колонка Кем изменен', () => {
    test('Отображается', () => {
      render(<InfrastructureStatusHistoryTable {...props} />)

      const title = infrastructureStatusHistoryTableTestUtils.getColTitle('Кем изменен')
      const value = infrastructureStatusHistoryTableTestUtils.getColValue(
        tableRow.id,
        getFullUserName(tableRow.createdBy),
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })
  })
})
