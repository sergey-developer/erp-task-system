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
  mockGetJournalServerError,
  mockGetJournalSuccess,
} from './mocks'
import { getDownloadButton, waitFinishLoading, waitStartLoading } from './utils'

setupApiTests()

describe('Страница отображения журнала', () => {
  describe('При успешном запросе журнала', () => {
    describe('Если есть записи', () => {
      describe('Отображает', () => {
        test('Записи', async () => {
          mockGetJournalSuccess(getJournalResponseSuccess)

          render(<Journal taskId={FAKE_TASK_ID} />)
          await waitStartLoading()
          await waitFinishLoading()

          expect(screen.getAllByTestId('journalEntry')).toHaveLength(
            getJournalResponseSuccess.length,
          )
        })

        test('Кнопку экспорта в csv', async () => {
          mockGetJournalSuccess(getJournalResponseSuccess)

          render(<Journal taskId={FAKE_TASK_ID} />)
          await waitStartLoading()
          await waitFinishLoading()

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
          await waitStartLoading()
          await waitFinishLoading()

          expect(screen.queryByText(NO_DATA_MSG)).not.toBeInTheDocument()
        })
      })

      describe('Кнопка экспорта в csv', () => {
        // window.URL.createObjectURL = jest.fn()
        // window.URL.revokeObjectURL = jest.fn()

        // const createObjectURL = window.URL.createObjectURL as jest.Mock
        // const revokeObjectURL = window.URL.revokeObjectURL as jest.Mock

        // afterEach(() => {
        //   URL.createObjectURL.mockReset()
        //   URL.revokeObjectURL.mockReset()
        // })

        test('Активна', async () => {
          mockGetJournalSuccess(getJournalResponseSuccess)

          render(<Journal taskId={FAKE_TASK_ID} />)

          await waitStartLoading()
          await waitFinishLoading()

          const downloadButton = getDownloadButton()
          expect(downloadButton).toBeEnabled()
        })

        // test('Вызывает обработчик при клике', async () => {
        //   mockGetJournalSuccess(getJournalResponseSuccess)
        //   mockGetJournalCsvSuccess()
        //
        //   const { user } = render(<Journal taskId={FAKE_TASK_ID} />)
        //
        //   await waitStartLoading()
        //   await waitFinishLoading()
        //
        //   const downloadButton = getDownloadButton()
        //   const downloadButtonSpy = jest.spyOn(downloadButton, 'click')
        //
        //   await user.click(downloadButton)
        //
        //   await waitFor(() => {
        //     expect(downloadButtonSpy).toBeCalled()
        //   })
        // })
      })

      // describe('Если нажать на кнопку экспорта в csv', () => {
      //   describe('При успешном запросе', () => {
      //     mockGetJournalCsvSuccess()
      //
      //     // test('')
      //   })
      // })
    })

    describe('Если нет записей', () => {
      describe('Отображает', () => {
        test(`Текст "${NO_DATA_MSG}"`, async () => {
          mockGetJournalSuccess(getEmptyJournalResponseSuccess)

          render(<Journal taskId={FAKE_TASK_ID} />)
          await waitStartLoading()
          await waitFinishLoading()

          expect(screen.getByText(NO_DATA_MSG)).toBeInTheDocument()
        })
      })

      describe('Не отображает', () => {
        test('Записи', async () => {
          mockGetJournalSuccess(getEmptyJournalResponseSuccess)

          render(<Journal taskId={FAKE_TASK_ID} />)
          await waitStartLoading()
          await waitFinishLoading()

          expect(screen.queryAllByTestId('journalEntry')).toHaveLength(
            getEmptyJournalResponseSuccess.length,
          )
        })

        test('Кнопку экспорта в csv', async () => {
          mockGetJournalSuccess(getEmptyJournalResponseSuccess)

          render(<Journal taskId={FAKE_TASK_ID} />)
          await waitStartLoading()
          await waitFinishLoading()

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
        await waitStartLoading()
        await waitFinishLoading()

        expect(await screen.findByText(UNKNOWN_ERROR_MSG)).toBeInTheDocument()
      })

      test(`Текст "${NO_DATA_MSG}"`, async () => {
        mockGetJournalServerError()

        render(<Journal taskId={FAKE_TASK_ID} />)
        await waitStartLoading()
        await waitFinishLoading()

        expect(await screen.findByText(NO_DATA_MSG)).toBeInTheDocument()
      })
    })
  })
})
