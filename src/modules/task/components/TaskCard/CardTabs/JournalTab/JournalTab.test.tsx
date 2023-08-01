import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { commonApiMessages } from 'shared/constants/errors'
import * as downloadLink from 'shared/utils/common/downloadLink'

import taskFixtures from 'fixtures/task'

import {
  mockGetJournalCsvServerError,
  mockGetJournalCsvSuccess,
  mockGetJournalServerError,
  mockGetJournalSuccess,
} from '_tests_/mocks/api'
import {
  findNotification,
  fakeId,
  fakeWord,
  getButtonIn,
  getStoreWithAuth,
  expectLoadingFinishedByButton,
  expectLoadingFinishedBySpinner,
  expectLoadingStartedByButton,
  expectLoadingStartedBySpinner,
  render,
  setupApiTests,
} from '_tests_/utils'

import { testUtils as journalEntryTestUtils } from '../JournalTab/JournalEntry.test'
import { NO_DATA_MSG } from './constants'
import JournalTab, { JournalTabProps } from './index'
import { getJournalCsvFilename } from './utils'

const props: JournalTabProps = {
  taskId: fakeId(),
}

const getContainer = () => screen.getByTestId('task-journal')

// reload button
const getReloadButton = () => getButtonIn(getContainer(), 'sync')

const clickReloadButton = async (user: UserEvent) => {
  const button = getReloadButton()
  await user.click(button)
  return button
}

// download button
const getDownloadButton = () => screen.getByTestId('journal-btn-download')

const clickDownloadButton = async (user: UserEvent): Promise<HTMLElement> => {
  const button = getDownloadButton()
  await user.click(button)
  return button
}

const expectJournalLoadingStarted =
  expectLoadingStartedBySpinner('journal-loading')

const expectJournalLoadingFinished =
  expectLoadingFinishedBySpinner('journal-loading')

const expectJournalCsvLoadingStarted = expectLoadingStartedByButton
const expectJournalCsvLoadingFinished = expectLoadingFinishedByButton

export const testUtils = {
  getContainer,

  getDownloadButton,
  clickDownloadButton,

  getReloadButton,
  clickReloadButton,

  expectJournalLoadingStarted,
  expectJournalLoadingFinished,

  expectJournalCsvLoadingStarted,
  expectJournalCsvLoadingFinished,
}

setupApiTests()

describe('Вкладка журнала задачи', () => {
  describe('Кнопка обновления журнала', () => {
    test('Отображается корректно', () => {
      render(<JournalTab {...props} />)

      const button = testUtils.getReloadButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('При клике отправляется запрос', async () => {
      mockGetJournalSuccess(props.taskId, {
        body: taskFixtures.journal(),
        once: false,
      })

      const { user } = render(<JournalTab {...props} />, {
        store: getStoreWithAuth(),
      })

      await testUtils.expectJournalLoadingFinished()
      await testUtils.clickReloadButton(user)
      await testUtils.expectJournalLoadingStarted()
    })
  })

  describe('При успешном запросе журнала', () => {
    describe('Если есть записи', () => {
      describe('Отображает', () => {
        test('Записи', async () => {
          const taskJournal = taskFixtures.journal()
          mockGetJournalSuccess(props.taskId, {
            body: taskJournal,
          })

          render(<JournalTab {...props} />, {
            store: getStoreWithAuth(),
          })

          await testUtils.expectJournalLoadingStarted()
          await testUtils.expectJournalLoadingFinished()

          const journalEntries = taskJournal.map((entry) =>
            journalEntryTestUtils.getContainer(entry.id),
          )

          expect(journalEntries).toHaveLength(taskJournal.length)
        })

        test('Кнопку экспорта в csv', async () => {
          mockGetJournalSuccess(props.taskId, {
            body: taskFixtures.journal(),
          })

          render(<JournalTab {...props} />, {
            store: getStoreWithAuth(),
          })

          await testUtils.expectJournalLoadingStarted()
          await testUtils.expectJournalLoadingFinished()

          const downloadButton = testUtils.getDownloadButton()

          expect(downloadButton).toBeInTheDocument()

          expect(
            within(downloadButton).getByTestId('journal-icon-download'),
          ).toBeInTheDocument()
        })
      })

      describe('Не отображает', () => {
        test(`Текст "${NO_DATA_MSG}"`, async () => {
          mockGetJournalSuccess(props.taskId, {
            body: taskFixtures.journal(),
          })

          render(<JournalTab {...props} />, {
            store: getStoreWithAuth(),
          })

          await testUtils.expectJournalLoadingStarted()
          await testUtils.expectJournalLoadingFinished()

          expect(screen.queryByText(NO_DATA_MSG)).not.toBeInTheDocument()
        })
      })

      test('Кнопка экспорта в csv активна', async () => {
        mockGetJournalSuccess(props.taskId, {
          body: taskFixtures.journal(),
        })

        render(<JournalTab {...props} />, {
          store: getStoreWithAuth(),
        })

        await testUtils.expectJournalLoadingStarted()
        await testUtils.expectJournalLoadingFinished()

        const downloadButton = testUtils.getDownloadButton()
        expect(downloadButton).toBeEnabled()
      })

      describe('При успешной загрузке csv', () => {
        const clickDownloadLinkSpy = jest.spyOn(
          downloadLink,
          'clickDownloadLink',
        )

        test('Не показывает сообщение об ошибке', async () => {
          mockGetJournalSuccess(props.taskId, {
            body: taskFixtures.journal(),
          })

          const fakeCsv = fakeWord()
          mockGetJournalCsvSuccess(props.taskId, { body: fakeCsv })

          const { user } = render(<JournalTab {...props} />, {
            store: getStoreWithAuth(),
          })

          await testUtils.expectJournalLoadingStarted()
          await testUtils.expectJournalLoadingFinished()

          const downloadButton = await testUtils.clickDownloadButton(user)

          await testUtils.expectJournalCsvLoadingStarted(downloadButton)
          await testUtils.expectJournalCsvLoadingFinished(downloadButton)

          expect(clickDownloadLinkSpy).toBeCalledTimes(1)
          expect(clickDownloadLinkSpy).toBeCalledWith(
            fakeCsv,
            'text/csv',
            getJournalCsvFilename(props.taskId),
          )

          const notification = screen.queryByText(
            commonApiMessages.unknownError,
          )
          expect(notification).not.toBeInTheDocument()
        })
      })

      describe('При не успешной загрузке csv', () => {
        const clickDownloadLinkSpy = jest.spyOn(
          downloadLink,
          'clickDownloadLink',
        )

        test('Показывает сообщение об ошибке', async () => {
          mockGetJournalSuccess(props.taskId, {
            body: taskFixtures.journal(),
          })
          mockGetJournalCsvServerError(props.taskId)

          const { user } = render(<JournalTab {...props} />, {
            store: getStoreWithAuth(),
          })

          await testUtils.expectJournalLoadingStarted()
          await testUtils.expectJournalLoadingFinished()

          const downloadButton = await testUtils.clickDownloadButton(user)

          await testUtils.expectJournalCsvLoadingStarted(downloadButton)
          await testUtils.expectJournalCsvLoadingFinished(downloadButton)

          expect(clickDownloadLinkSpy).not.toBeCalled()

          const notification = await findNotification(
            commonApiMessages.unknownError,
          )
          expect(notification).toBeInTheDocument()
        })
      })
    })

    describe('Если нет записей', () => {
      describe('Отображает', () => {
        test(`Текст "${NO_DATA_MSG}"`, async () => {
          mockGetJournalSuccess(props.taskId, {
            body: taskFixtures.journal(0),
          })

          render(<JournalTab {...props} />, {
            store: getStoreWithAuth(),
          })

          await testUtils.expectJournalLoadingStarted()
          await testUtils.expectJournalLoadingFinished()

          expect(screen.getByText(NO_DATA_MSG)).toBeInTheDocument()
        })
      })

      describe('Не отображает', () => {
        test('Записи', async () => {
          const taskJournal = taskFixtures.journal(0)
          mockGetJournalSuccess(props.taskId, {
            body: taskJournal,
          })

          render(<JournalTab {...props} />, {
            store: getStoreWithAuth(),
          })

          await testUtils.expectJournalLoadingStarted()
          await testUtils.expectJournalLoadingFinished()

          const journalEntries = taskJournal
            .map((entry) => journalEntryTestUtils.queryContainer(entry.id))
            .filter(Boolean)

          expect(journalEntries).toHaveLength(taskJournal.length)
        })

        test('Кнопку экспорта в csv', async () => {
          mockGetJournalSuccess(props.taskId, {
            body: taskFixtures.journal(0),
          })

          render(<JournalTab {...props} />, {
            store: getStoreWithAuth(),
          })

          await testUtils.expectJournalLoadingStarted()
          await testUtils.expectJournalLoadingFinished()

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
      test('Соответствующую ошибку', async () => {
        mockGetJournalServerError(props.taskId)

        render(<JournalTab {...props} />, {
          store: getStoreWithAuth(),
        })

        await testUtils.expectJournalLoadingStarted()
        await testUtils.expectJournalLoadingFinished()

        const notification = await findNotification(
          commonApiMessages.unknownError,
        )
        expect(notification).toBeInTheDocument()
      })

      test('Соответствующий текст', async () => {
        mockGetJournalServerError(props.taskId)

        render(<JournalTab {...props} />, {
          store: getStoreWithAuth(),
        })

        await testUtils.expectJournalLoadingStarted()
        await testUtils.expectJournalLoadingFinished()

        expect(await screen.findByText(NO_DATA_MSG)).toBeInTheDocument()
      })
    })
  })
})
