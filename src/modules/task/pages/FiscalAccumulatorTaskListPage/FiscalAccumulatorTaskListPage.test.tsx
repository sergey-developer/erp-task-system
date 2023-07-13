import { getFiscalAccumulatorTaskListMessages } from 'modules/task/constants'
import { testUtils as fiscalAccumulatorTaskTableTestUtils } from 'modules/task/features/FiscalAccumulatorTaskTable/FiscalAccumulatorTaskTable.test'

import taskFixtures from 'fixtures/task'

import {
  mockGetFiscalAccumulatorTaskListServerError,
  mockGetFiscalAccumulatorTaskListSuccess,
} from '_tests_/mocks/api'
import {
  findNotification,
  render,
  setupApiTests,
  setupNotifications,
} from '_tests_/utils'

import FiscalAccumulatorTaskListPage from './index'

setupApiTests()
setupNotifications()

describe('Страница заявок фискальных накопителей', () => {
  describe('При успешном запросе', () => {
    test('Таблица отображается корректно', async () => {
      const fakeFiscalAccumulatorTaskLists = [
        taskFixtures.fakeFiscalAccumulatorTaskListItem(),
      ]
      mockGetFiscalAccumulatorTaskListSuccess({
        body: fakeFiscalAccumulatorTaskLists,
      })

      render(<FiscalAccumulatorTaskListPage />)

      await fiscalAccumulatorTaskTableTestUtils.expectLoadingStarted()
      await fiscalAccumulatorTaskTableTestUtils.expectLoadingFinished()

      fakeFiscalAccumulatorTaskLists.forEach((item) => {
        const row = fiscalAccumulatorTaskTableTestUtils.getRow(
          item.olaNextBreachTime,
        )
        expect(row).toBeInTheDocument()
      })
    })
  })

  describe('При не успешном запроса', () => {
    test('Обрабатывается ошибка 500', async () => {
      mockGetFiscalAccumulatorTaskListServerError()

      render(<FiscalAccumulatorTaskListPage />)

      await fiscalAccumulatorTaskTableTestUtils.expectLoadingStarted()
      await fiscalAccumulatorTaskTableTestUtils.expectLoadingFinished()

      const error = await findNotification(
        getFiscalAccumulatorTaskListMessages.commonError,
      )

      expect(error).toBeInTheDocument()
    })
  })
})
