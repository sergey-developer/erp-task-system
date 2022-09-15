import {
  getEmptyJournalResponseSuccess,
  getJournalResponseSuccess,
} from '_fixtures_/task'
import { render, screen, setupApiTests, within } from '_tests_/utils'
import { UNKNOWN_ERROR_MSG } from 'shared/constants/messages'

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

jest.mock('shared/utils/common/downloadLink')

describe('Страница отображения журнала', () => {
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
        test('Не показывает сообщение об ошибке', async () => {
          mockGetJournalSuccess(getJournalResponseSuccess)
          mockGetJournalCsvSuccess()

          const { user } = render(<Journal taskId={FAKE_TASK_ID} />)

          await waitStartLoadingJournal()
          await waitFinishLoadingJournal()

          const downloadButton = await userClickDownloadButton(user)

          await waitStartLoadingJournalCsv(downloadButton)
          await waitFinishLoadingJournalCsv(downloadButton)

          const notification = screen.queryByText(UNKNOWN_ERROR_MSG)
          expect(notification).not.toBeInTheDocument()
        })
      })

      describe('При не успешной загрузке csv', () => {
        test('Показывает сообщение об ошибке', async () => {
          mockGetJournalSuccess(getJournalResponseSuccess)
          mockGetJournalCsvServerError()

          const { user } = render(<Journal taskId={FAKE_TASK_ID} />)

          await waitStartLoadingJournal()
          await waitFinishLoadingJournal()

          const downloadButton = await userClickDownloadButton(user)

          await waitStartLoadingJournalCsv(downloadButton)
          await waitFinishLoadingJournalCsv(downloadButton)

          const notification = screen.getByText(UNKNOWN_ERROR_MSG)
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

        expect(await screen.findByText(UNKNOWN_ERROR_MSG)).toBeInTheDocument()
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
