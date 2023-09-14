import { testUtils as fiscalAccumulatorTaskTableTestUtils } from 'modules/task/components/FiscalAccumulatorTable/FiscalAccumulatorTable.test'
import { getFiscalAccumulatorListMessages } from 'modules/task/constants/fiscalAccumulator'

import taskFixtures from '_tests_/fixtures/task'
import {
  mockGetFiscalAccumulatorListServerError,
  mockGetFiscalAccumulatorListSuccess,
} from '_tests_/mocks/api'
import { notificationTestUtils, render, setupApiTests } from '_tests_/utils'

import FiscalAccumulatorListPage from './index'

setupApiTests()
notificationTestUtils.setupNotifications()

describe('Страница заявок фискальных накопителей', () => {
  describe('При успешном запросе', () => {
    test('Таблица отображается корректно', async () => {
      const fakeFiscalAccumulatorList = [taskFixtures.fiscalAccumulatorListItem()]
      mockGetFiscalAccumulatorListSuccess({
        body: fakeFiscalAccumulatorList,
      })

      render(<FiscalAccumulatorListPage />)

      await fiscalAccumulatorTaskTableTestUtils.expectLoadingStarted()
      await fiscalAccumulatorTaskTableTestUtils.expectLoadingFinished()

      fakeFiscalAccumulatorList.forEach((item) => {
        const row = fiscalAccumulatorTaskTableTestUtils.getRow(item.olaNextBreachTime)
        expect(row).toBeInTheDocument()
      })
    })
  })

  describe('При не успешном запроса', () => {
    test('Обрабатывается ошибка 500', async () => {
      mockGetFiscalAccumulatorListServerError()

      render(<FiscalAccumulatorListPage />)

      await fiscalAccumulatorTaskTableTestUtils.expectLoadingStarted()
      await fiscalAccumulatorTaskTableTestUtils.expectLoadingFinished()

      const notification = await notificationTestUtils.findNotification(
        getFiscalAccumulatorListMessages.commonError,
      )

      expect(notification).toBeInTheDocument()
    })
  })
})
