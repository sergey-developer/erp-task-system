import { screen } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { testUtils as fiscalAccumulatorTaskTableTestUtils } from 'modules/fiscalAccumulator/components/FiscalAccumulatorTable/FiscalAccumulatorTable.test'
import { getFiscalAccumulatorsErrorMsg } from 'modules/fiscalAccumulator/constants'

import { testUtils as updateTasksButtonTestUtils } from 'components/Buttons/UpdateTasksButton/UpdateTasksButton.test'

import fiscalAccumulatorFixtures from '_tests_/fixtures/fiscalAccumulator'
import {
  mockGetFiscalAccumulatorsServerError,
  mockGetFiscalAccumulatorsSuccess,
} from '_tests_/mocks/api'
import { notificationTestUtils, render, setupApiTests } from '_tests_/utils'

import FiscalAccumulatorsPage from './index'

const getContainer = () => screen.getByTestId('fiscal-accumulators-page')

const getUpdateTasksButton = () => updateTasksButtonTestUtils.getUpdateTasksButton(getContainer())
const clickUpdateTasksButton = async (user: UserEvent) => {
  const button = getUpdateTasksButton()
  await user.click(button)
}

export const testUtils = {
  getUpdateTasksButton,
  clickUpdateTasksButton,
}

setupApiTests()
notificationTestUtils.setupNotifications()

describe('Страница заявок фискальных накопителей', () => {
  describe('При успешном запросе', () => {
    test('Таблица отображается корректно', async () => {
      const fiscalAccumulators = [fiscalAccumulatorFixtures.fiscalAccumulatorListItem()]
      mockGetFiscalAccumulatorsSuccess({ body: fiscalAccumulators })

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

  describe('Кнопка обновления заявок', () => {
    test('Отображается', async () => {
      mockGetFiscalAccumulatorsSuccess()

      render(<FiscalAccumulatorsPage />)

      await fiscalAccumulatorTaskTableTestUtils.expectLoadingFinished()
      const button = testUtils.getUpdateTasksButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Перезагружает заявки', async () => {
      mockGetFiscalAccumulatorsSuccess({ once: false })

      const { user } = render(<FiscalAccumulatorsPage />)

      await fiscalAccumulatorTaskTableTestUtils.expectLoadingFinished()
      await testUtils.clickUpdateTasksButton(user)
      await fiscalAccumulatorTaskTableTestUtils.expectLoadingStarted()
    })

    test('Не активна во время загрузки заявок', async () => {
      mockGetFiscalAccumulatorsSuccess()

      render(<FiscalAccumulatorsPage />)

      const button = testUtils.getUpdateTasksButton()
      await fiscalAccumulatorTaskTableTestUtils.expectLoadingStarted()
      expect(button).toBeDisabled()
      await fiscalAccumulatorTaskTableTestUtils.expectLoadingFinished()
      expect(button).toBeEnabled()
    })
  })
})
