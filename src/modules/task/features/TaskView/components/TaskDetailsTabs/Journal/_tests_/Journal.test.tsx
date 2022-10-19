import {
  getEmptyJournalResponseSuccess,
  getJournalResponseSuccess,
} from '_fixtures_/task'
import { render, screen, setupApiTests, within } from '_tests_/utils'
import { UNKNOWN_ERROR_MSG } from 'shared/constants/validation'
import * as downloadLink from 'shared/utils/common/downloadLink'

import { NO_DATA_MSG } from '../constants'
import Journal from '../index'
import {
  FAKE_TASK_ID,
  mockGetJournalCsvServerError,
  mockGetJournalCsvSuccess,
  mockGetJournalServerError,
  mockGetJournalSuccess,
} from './mocks'
import {
  getDownloadButton,
  userClickDownloadButton,
  waitFinishLoadingJournal,
  waitFinishLoadingJournalCsv,
  waitStartLoadingJournal,
  waitStartLoadingJournalCsv,
} from './utils'

setupApiTests()

describe('Журнал задачи', () => {
  describe('При успешном запросе журнала', () => {
    describe('Если есть записи', () => {
      describe('Отображает', () => {
        test('Записи', async () => {
          mockGetJournalSuccess(getJournalResponseSuccess)

          render(<Journal taskId={FAKE_TASK_ID} />)
          await waitStartLoadingJournal()
          await waitFinishLoadingJournal()

          expect(screen.getAllByTestId('journalEntry')).toHaveLength(
            getJournalResponseSuccess.length,
          )
        })

        test('Кнопку экспорта в csv', async () => {
          mockGetJournalSuccess(getJournalResponseSuccess)

          render(<Journal taskId={FAKE_TASK_ID} />)
          await waitStartLoadingJournal()
          await waitFinishLoadingJournal()

          const downloadButton = getDownloadButton()

          expect(downloadButton).toBeInTheDocument()

          expect(
            within(downloadButton).getByTestId('journal-icon-download'),
          ).toBeInTheDocument()
        })
      })

      describe('Не отображает', () => {
        test(`Текст "${NO_DATA_MSG}"`, async () => {
          mockGetJournalSuccess(getJournalResponseSuccess)

          render(<Journal taskId={FAKE_TASK_ID} />)
          await waitStartLoadingJournal()
          await waitFinishLoadingJournal()

          expect(screen.queryByText(NO_DATA_MSG)).not.toBeInTheDocument()
        })
      })

      test('Кнопка экспорта в csv активна', async () => {
        mockGetJournalSuccess(getJournalResponseSuccess)

        render(<Journal taskId={FAKE_TASK_ID} />)

        await waitStartLoadingJournal()
        await waitFinishLoadingJournal()

        const downloadButton = getDownloadButton()
        expect(downloadButton).toBeEnabled()
      })

      describe('При успешной загрузке csv', () => {
        const makeDownloadLinkSpy = jest.spyOn(downloadLink, 'makeDownloadLink')
        const clickDownloadLinkSpy = jest.spyOn(
          downloadLink,
          'clickDownloadLink',
        )

        test('Не показывает сообщение об ошибке', async () => {
          mockGetJournalSuccess(getJournalResponseSuccess)
          mockGetJournalCsvSuccess()

          const { user } = render(<Journal taskId={FAKE_TASK_ID} />)

          await waitStartLoadingJournal()
          await waitFinishLoadingJournal()

          const downloadButton = await userClickDownloadButton(user)

          await waitStartLoadingJournalCsv(downloadButton)
          await waitFinishLoadingJournalCsv(downloadButton)

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
          mockGetJournalSuccess(getJournalResponseSuccess)
          mockGetJournalCsvServerError()

          const { user } = render(<Journal taskId={FAKE_TASK_ID} />)

          await waitStartLoadingJournal()
          await waitFinishLoadingJournal()

          const downloadButton = await userClickDownloadButton(user)

          await waitStartLoadingJournalCsv(downloadButton)
          await waitFinishLoadingJournalCsv(downloadButton)

          expect(makeDownloadLinkSpy).not.toBeCalled()
          expect(clickDownloadLinkSpy).not.toBeCalled()

          const notification = await screen.findByText(UNKNOWN_ERROR_MSG)
          expect(notification).toBeInTheDocument()
        })
      })
    })

    describe('Если нет записей', () => {
      describe('Отображает', () => {
        test(`Текст "${NO_DATA_MSG}"`, async () => {
          mockGetJournalSuccess(getEmptyJournalResponseSuccess)

          render(<Journal taskId={FAKE_TASK_ID} />)
          await waitStartLoadingJournal()
          await waitFinishLoadingJournal()

          expect(screen.getByText(NO_DATA_MSG)).toBeInTheDocument()
        })
      })

      describe('Не отображает', () => {
        test('Записи', async () => {
          mockGetJournalSuccess(getEmptyJournalResponseSuccess)

          render(<Journal taskId={FAKE_TASK_ID} />)
          await waitStartLoadingJournal()
          await waitFinishLoadingJournal()

          expect(screen.queryAllByTestId('journalEntry')).toHaveLength(
            getEmptyJournalResponseSuccess.length,
          )
        })

        test('Кнопку экспорта в csv', async () => {
          mockGetJournalSuccess(getEmptyJournalResponseSuccess)

          render(<Journal taskId={FAKE_TASK_ID} />)
          await waitStartLoadingJournal()
          await waitFinishLoadingJournal()

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
        mockGetJournalServerError()

        render(<Journal taskId={FAKE_TASK_ID} />)
        await waitStartLoadingJournal()
        await waitFinishLoadingJournal()

        const notification = await screen.findByText(UNKNOWN_ERROR_MSG)
        expect(notification).toBeInTheDocument()
      })

      test(`Текст "${NO_DATA_MSG}"`, async () => {
        mockGetJournalServerError()

        render(<Journal taskId={FAKE_TASK_ID} />)
        await waitStartLoadingJournal()
        await waitFinishLoadingJournal()

        expect(await screen.findByText(NO_DATA_MSG)).toBeInTheDocument()
      })
    })
  })
})
