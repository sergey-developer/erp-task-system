import { testUtils as fiscalAccumulatorTaskTableTestUtils } from 'modules/task/features/FiscalAccumulatorTaskTable/FiscalAccumulatorTaskTable.test'

import { render } from '_tests_/utils'

import FiscalAccumulatorTaskListPage from './index'

describe('Страница заявок фискальных накопителей', () => {
  test('Отображает таблицу фискальных накопителей', () => {
    render(<FiscalAccumulatorTaskListPage />)
    const table = fiscalAccumulatorTaskTableTestUtils.getContainer()
    expect(table).toBeInTheDocument()
  })
})
