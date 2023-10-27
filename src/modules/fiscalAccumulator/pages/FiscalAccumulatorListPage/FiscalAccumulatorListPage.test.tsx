import { testUtils as fiscalAccumulatorTaskTableTestUtils } from 'modules/fiscalAccumulator/components/FiscalAccumulatorTable/FiscalAccumulatorTable.test'
import { getFiscalAccumulatorListMessages } from 'modules/fiscalAccumulator/constants'

import {
  mockGetFiscalAccumulatorListServerError,
  mockGetFiscalAccumulatorListSuccess,
} from '_tests_/mocks/api'
import { notificationTestUtils, render, setupApiTests } from '_tests_/utils'

import FiscalAccumulatorListPage from './index'
import fiscalAccumulatorFixtures from "_tests_/fixtures/fiscalAccumulator";

setupApiTests()
notificationTestUtils.setupNotifications()

describe('Страница заявок фискальных накопителей', () => {
  describe('При успешном запросе', () => {
    test('Таблица отображается корректно', async () => {
      const fakeFiscalAccumulatorList = [fiscalAccumulatorFixtures.fiscalAccumulatorListItem()]
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
