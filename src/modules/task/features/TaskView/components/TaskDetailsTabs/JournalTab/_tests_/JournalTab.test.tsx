import {
  mockGetJournalCsvServerError,
  mockGetJournalCsvSuccess,
  mockGetJournalServerError,
  mockGetJournalSuccess,
} from '_tests_/mocks/api'
import {
  findNotification,
  generateId,
  generateWord,
  getStoreWithAuth,
  render,
  setupApiTests,
} from '_tests_/utils'
import { screen, within } from '@testing-library/react'
import { taskFixtures } from 'fixtures/task'
import { UNKNOWN_ERROR_MSG } from 'shared/constants/validation'
import * as downloadLink from 'shared/utils/common/downloadLink'

import { NO_DATA_MSG } from '../constants'
import JournalTab, { JournalTabProps } from '../index'
import testUtils from './utils'

setupApiTests()

const requiredProps: JournalTabProps = {
  taskId: generateId(),
}

describe('Вкладка журнала задачи', () => {
  describe('Кнопка обновления журнала', () => {
    test('Отображается корректно', () => {
      render(<JournalTab {...requiredProps} />)

      const button = testUtils.getReloadButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('При клике отправляется запрос', async () => {
      mockGetJournalSuccess(requiredProps.taskId, {
        body: taskFixtures.getTaskJournal(),
        once: false,
      })

      const { user } = render(<JournalTab {...requiredProps} />, {
        store: getStoreWithAuth(),
      })

      await testUtils.journalLoadingFinished()
      await testUtils.userClickReloadButton(user)
      await testUtils.journalLoadingStarted()
    })
  })

  describe('При успешном запросе журнала', () => {
    describe('Если есть записи', () => {
      describe('Отображает', () => {
        test('Записи', async () => {
          const taskJournal = taskFixtures.getTaskJournal()
          mockGetJournalSuccess(requiredProps.taskId, {
            body: taskJournal,
          })

          render(<JournalTab {...requiredProps} />, {
            store: getStoreWithAuth(),
          })

          await testUtils.journalLoadingStarted()
          await testUtils.journalLoadingFinished()

          expect(screen.getAllByTestId('journalEntry')).toHaveLength(
            taskJournal.length,
          )
        })

        test('Кнопку экспорта в csv', async () => {
          mockGetJournalSuccess(requiredProps.taskId, {
            body: taskFixtures.getTaskJournal(),
          })

          render(<JournalTab {...requiredProps} />, {
            store: getStoreWithAuth(),
          })

          await testUtils.journalLoadingStarted()
          await testUtils.journalLoadingFinished()

          const downloadButton = testUtils.getDownloadButton()

          expect(downloadButton).toBeInTheDocument()

          expect(
            within(downloadButton).getByTestId('journal-icon-download'),
          ).toBeInTheDocument()
        })
      })

      describe('Не отображает', () => {
        test(`Текст "${NO_DATA_MSG}"`, async () => {
          mockGetJournalSuccess(requiredProps.taskId, {
            body: taskFixtures.getTaskJournal(),
          })

          render(<JournalTab {...requiredProps} />, {
            store: getStoreWithAuth(),
          })

          await testUtils.journalLoadingStarted()
          await testUtils.journalLoadingFinished()

          expect(screen.queryByText(NO_DATA_MSG)).not.toBeInTheDocument()
        })
      })

      test('Кнопка экспорта в csv активна', async () => {
        mockGetJournalSuccess(requiredProps.taskId, {
          body: taskFixtures.getTaskJournal(),
        })

        render(<JournalTab {...requiredProps} />, {
          store: getStoreWithAuth(),
        })

        await testUtils.journalLoadingStarted()
        await testUtils.journalLoadingFinished()

        const downloadButton = testUtils.getDownloadButton()
        expect(downloadButton).toBeEnabled()
      })

      describe('При успешной загрузке csv', () => {
        const makeDownloadLinkSpy = jest.spyOn(downloadLink, 'makeDownloadLink')
        const clickDownloadLinkSpy = jest.spyOn(
          downloadLink,
          'clickDownloadLink',
        )

        test('Не показывает сообщение об ошибке', async () => {
          mockGetJournalSuccess(requiredProps.taskId, {
            body: taskFixtures.getTaskJournal(),
          })
          mockGetJournalCsvSuccess(requiredProps.taskId, {
            body: generateWord(),
          })

          const { user } = render(<JournalTab {...requiredProps} />, {
            store: getStoreWithAuth(),
          })

          await testUtils.journalLoadingStarted()
          await testUtils.journalLoadingFinished()

          const downloadButton = await testUtils.userClickDownloadButton(user)

          await testUtils.journalCsvLoadingStarted(downloadButton)
          await testUtils.journalCsvLoadingFinished(downloadButton)

          expect(makeDownloadLinkSpy).toBeCalledTimes(1)
          expect(clickDownloadLinkSpy).toBeCalledTimes(1)

          const notification = screen.queryByText(UNKNOWN_ERROR_MSG)
          expect(notification).not.toBeInTheDocument()
        })
      })

      describe('При не успешной загрузке csv', () => {
        const makeDownloadLinkSpy = jest.spyOn(downloadLink, 'makeDownloadLink')
        const clickDownloadLinkSpy = jest.spyOn(
          downloadLink,
          'clickDownloadLink',
        )

        test('Показывает сообщение об ошибке', async () => {
          mockGetJournalSuccess(requiredProps.taskId, {
            body: taskFixtures.getTaskJournal(),
          })
          mockGetJournalCsvServerError(requiredProps.taskId)

          const { user } = render(<JournalTab {...requiredProps} />, {
            store: getStoreWithAuth(),
          })

          await testUtils.journalLoadingStarted()
          await testUtils.journalLoadingFinished()

          const downloadButton = await testUtils.userClickDownloadButton(user)

          await testUtils.journalCsvLoadingStarted(downloadButton)
          await testUtils.journalCsvLoadingFinished(downloadButton)

          expect(makeDownloadLinkSpy).not.toBeCalled()
          expect(clickDownloadLinkSpy).not.toBeCalled()

          const notification = await findNotification(UNKNOWN_ERROR_MSG)
          expect(notification).toBeInTheDocument()
        })
      })
    })

    describe('Если нет записей', () => {
      describe('Отображает', () => {
        test(`Текст "${NO_DATA_MSG}"`, async () => {
          mockGetJournalSuccess(requiredProps.taskId, {
            body: taskFixtures.getTaskJournal(0),
          })

          render(<JournalTab {...requiredProps} />, {
            store: getStoreWithAuth(),
          })

          await testUtils.journalLoadingStarted()
          await testUtils.journalLoadingFinished()

          expect(screen.getByText(NO_DATA_MSG)).toBeInTheDocument()
        })
      })

      describe('Не отображает', () => {
        test('Записи', async () => {
          const taskJournal = taskFixtures.getTaskJournal(0)
          mockGetJournalSuccess(requiredProps.taskId, {
            body: taskJournal,
          })

          render(<JournalTab {...requiredProps} />, {
            store: getStoreWithAuth(),
          })

          await testUtils.journalLoadingStarted()
          await testUtils.journalLoadingFinished()

          expect(screen.queryAllByTestId('journalEntry')).toHaveLength(
            taskJournal.length,
          )
        })

        test('Кнопку экспорта в csv', async () => {
          mockGetJournalSuccess(requiredProps.taskId, {
            body: taskFixtures.getTaskJournal(0),
          })

          render(<JournalTab {...requiredProps} />, {
            store: getStoreWithAuth(),
          })

          await testUtils.journalLoadingStarted()
          await testUtils.journalLoadingFinished()

          expect(
            screen.queryByTestId('journal-btn-download'),
          ).not.toBeInTheDocument()

          expect(
            screen.queryByTestId('journal-icon-download'),
          ).not.toBeInTheDocument()
        })
      })
    })
  })

  describe('При не успешном запросе журнала', () => {
    describe('Отображает', () => {
      test(`Ошибку "${UNKNOWN_ERROR_MSG}"`, async () => {
        mockGetJournalServerError(requiredProps.taskId)

        render(<JournalTab {...requiredProps} />, {
          store: getStoreWithAuth(),
        })

        await testUtils.journalLoadingStarted()
        await testUtils.journalLoadingFinished()

        const notification = await findNotification(UNKNOWN_ERROR_MSG)
        expect(notification).toBeInTheDocument()
      })

      test(`Текст "${NO_DATA_MSG}"`, async () => {
        mockGetJournalServerError(requiredProps.taskId)

        render(<JournalTab {...requiredProps} />, {
          store: getStoreWithAuth(),
        })

        await testUtils.journalLoadingStarted()
        await testUtils.journalLoadingFinished()

        expect(await screen.findByText(NO_DATA_MSG)).toBeInTheDocument()
      })
    })
  })
})
