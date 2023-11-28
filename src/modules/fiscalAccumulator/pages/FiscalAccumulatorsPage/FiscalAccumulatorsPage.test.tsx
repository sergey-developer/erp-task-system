import { testUtils as fiscalAccumulatorTaskTableTestUtils } from 'modules/fiscalAccumulator/components/FiscalAccumulatorTable/FiscalAccumulatorTable.test'
import { getFiscalAccumulatorsErrorMsg } from 'modules/fiscalAccumulator/constants'

import fiscalAccumulatorFixtures from '_tests_/fixtures/fiscalAccumulator'
import {
  mockGetFiscalAccumulatorsServerError,
  mockGetFiscalAccumulatorsSuccess,
} from '_tests_/mocks/api'
import { notificationTestUtils, render, setupApiTests } from '_tests_/utils'

import FiscalAccumulatorsPage from './index'

setupApiTests()
notificationTestUtils.setupNotifications()

describe('Страница заявок фискальных накопителей', () => {
  describe('При успешном запросе', () => {
    test('Таблица отображается корректно', async () => {
      const fiscalAccumulators = [fiscalAccumulatorFixtures.fiscalAccumulatorListItem()]
      mockGetFiscalAccumulatorsSuccess({
        body: fiscalAccumulators,
      })

      render(<FiscalAccumulatorsPage />)

      await fiscalAccumulatorTaskTableTestUtils.expectLoadingStarted()
      await fiscalAccumulatorTaskTableTestUtils.expectLoadingFinished()

      fiscalAccumulators.forEach((item) => {
        const row = fiscalAccumulatorTaskTableTestUtils.getRow(item.olaNextBreachTime)
        expect(row).toBeInTheDocument()
      })
    })
  })

  describe('При не успешном запроса', () => {
    test('Обрабатывается ошибка 500', async () => {
      mockGetFiscalAccumulatorsServerError()

      render(<FiscalAccumulatorsPage />)

      await fiscalAccumulatorTaskTableTestUtils.expectLoadingStarted()
      await fiscalAccumulatorTaskTableTestUtils.expectLoadingFinished()

      const notification = await notificationTestUtils.findNotification(
        getFiscalAccumulatorsErrorMsg,
      )

      expect(notification).toBeInTheDocument()
    })
  })
})
