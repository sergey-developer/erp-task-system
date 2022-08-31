import { FAKE_ID } from '__tests__/constants'
import { render, screen, setupApiTests } from '__tests__/utils'
import { UNKNOWN_ERROR_MSG } from 'shared/constants/messages'

import { NO_DATA_MSG } from '../constants'
import Journal from '../index'
import {
  getEmptyJournalResponseSuccess,
  getJournalResponseSuccess,
} from './constants'
import { mockGetJournalServerError, mockGetJournalSuccess } from './mocks'
import { waitFinishLoading, waitStartLoading } from './utils'

setupApiTests()

describe('Страница отображения журнала', () => {
  describe('При успешном запросе журнала', () => {
    describe('Если есть записи', () => {
      describe('Отображает', () => {
        test('Записи', async () => {
          mockGetJournalSuccess(getJournalResponseSuccess)

          render(<Journal taskId={FAKE_ID} />)
          await waitStartLoading()
          await waitFinishLoading()

          expect(screen.getAllByTestId('journalEntry')).toHaveLength(
            getJournalResponseSuccess.length,
          )
        })

        test('Кнопку экспорта', async () => {
          mockGetJournalSuccess(getJournalResponseSuccess)

          render(<Journal taskId={FAKE_ID} />)
          await waitStartLoading()
          await waitFinishLoading()

          expect(
            screen.getByTestId('journal-icon-download'),
          ).toBeInTheDocument()
        })
      })

      describe('Не отображает', () => {
        test(`Текст "${NO_DATA_MSG}"`, async () => {
          mockGetJournalSuccess(getJournalResponseSuccess)

          render(<Journal taskId={FAKE_ID} />)
          await waitStartLoading()
          await waitFinishLoading()

          expect(screen.queryByText(NO_DATA_MSG)).not.toBeInTheDocument()
        })
      })
    })

    describe('Если нет записей', () => {
      describe('Отображает', () => {
        test(`Текст "${NO_DATA_MSG}"`, async () => {
          mockGetJournalSuccess(getEmptyJournalResponseSuccess)

          render(<Journal taskId={FAKE_ID} />)
          await waitStartLoading()
          await waitFinishLoading()

          expect(screen.getByText(NO_DATA_MSG)).toBeInTheDocument()
        })
      })

      describe('Не отображает', () => {
        test('Записи', async () => {
          mockGetJournalSuccess(getEmptyJournalResponseSuccess)

          render(<Journal taskId={FAKE_ID} />)
          await waitStartLoading()
          await waitFinishLoading()

          expect(screen.queryAllByTestId('journalEntry')).toHaveLength(
            getEmptyJournalResponseSuccess.length,
          )
        })

        test('Кнопку экспорта', async () => {
          mockGetJournalSuccess(getEmptyJournalResponseSuccess)

          render(<Journal taskId={FAKE_ID} />)
          await waitStartLoading()
          await waitFinishLoading()

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

        render(<Journal taskId={FAKE_ID} />)
        await waitStartLoading()
        await waitFinishLoading()

        expect(await screen.findByText(UNKNOWN_ERROR_MSG)).toBeInTheDocument()
      })

      test(`Текст "${NO_DATA_MSG}"`, async () => {
        mockGetJournalServerError()

        render(<Journal taskId={FAKE_ID} />)
        await waitStartLoading()
        await waitFinishLoading()

        expect(await screen.findByText(NO_DATA_MSG)).toBeInTheDocument()
      })
    })
  })
})
