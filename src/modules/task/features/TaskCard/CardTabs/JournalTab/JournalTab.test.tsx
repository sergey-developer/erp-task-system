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
  generateId,
  generateWord,
  getButtonIn,
  getStoreWithAuth,
  expectLoadingFinishedByButton,
  expectLoadingFinishedBySpinner,
  expectLoadingStartedByButton,
  expectLoadingStartedBySpinner,
  render,
  setupApiTests,
} from '_tests_/utils'

import { NO_DATA_MSG } from './constants'
import JournalTab, { JournalTabProps } from './index'

const requiredProps: JournalTabProps = {
  taskId: generateId(),
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
  expectLoadingStartedBySpinner('journal-spinner')

const expectJournalLoadingFinished =
  expectLoadingFinishedBySpinner('journal-spinner')

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
      render(<JournalTab {...requiredProps} />)

      const button = testUtils.getReloadButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('При клике отправляется запрос', async () => {
      mockGetJournalSuccess(requiredProps.taskId, {
        body: taskFixtures.getJournal(),
        once: false,
      })

      const { user } = render(<JournalTab {...requiredProps} />, {
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
          const taskJournal = taskFixtures.getJournal()
          mockGetJournalSuccess(requiredProps.taskId, {
            body: taskJournal,
          })

          render(<JournalTab {...requiredProps} />, {
            store: getStoreWithAuth(),
          })

          await testUtils.expectJournalLoadingStarted()
          await testUtils.expectJournalLoadingFinished()

          expect(screen.getAllByTestId('journalEntry')).toHaveLength(
            taskJournal.length,
          )
        })

        test('Кнопку экспорта в csv', async () => {
          mockGetJournalSuccess(requiredProps.taskId, {
            body: taskFixtures.getJournal(),
          })

          render(<JournalTab {...requiredProps} />, {
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
          mockGetJournalSuccess(requiredProps.taskId, {
            body: taskFixtures.getJournal(),
          })

          render(<JournalTab {...requiredProps} />, {
            store: getStoreWithAuth(),
          })

          await testUtils.expectJournalLoadingStarted()
          await testUtils.expectJournalLoadingFinished()

          expect(screen.queryByText(NO_DATA_MSG)).not.toBeInTheDocument()
        })
      })

      test('Кнопка экспорта в csv активна', async () => {
        mockGetJournalSuccess(requiredProps.taskId, {
          body: taskFixtures.getJournal(),
        })

        render(<JournalTab {...requiredProps} />, {
          store: getStoreWithAuth(),
        })

        await testUtils.expectJournalLoadingStarted()
        await testUtils.expectJournalLoadingFinished()

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
            body: taskFixtures.getJournal(),
          })
          mockGetJournalCsvSuccess(requiredProps.taskId, {
            body: generateWord(),
          })

          const { user } = render(<JournalTab {...requiredProps} />, {
            store: getStoreWithAuth(),
          })

          await testUtils.expectJournalLoadingStarted()
          await testUtils.expectJournalLoadingFinished()

          const downloadButton = await testUtils.clickDownloadButton(user)

          await testUtils.expectJournalCsvLoadingStarted(downloadButton)
          await testUtils.expectJournalCsvLoadingFinished(downloadButton)

          expect(makeDownloadLinkSpy).toBeCalledTimes(1)
          expect(clickDownloadLinkSpy).toBeCalledTimes(1)

          const notification = screen.queryByText(
            commonApiMessages.unknownError,
          )
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
            body: taskFixtures.getJournal(),
          })
          mockGetJournalCsvServerError(requiredProps.taskId)

          const { user } = render(<JournalTab {...requiredProps} />, {
            store: getStoreWithAuth(),
          })

          await testUtils.expectJournalLoadingStarted()
          await testUtils.expectJournalLoadingFinished()

          const downloadButton = await testUtils.clickDownloadButton(user)

          await testUtils.expectJournalCsvLoadingStarted(downloadButton)
          await testUtils.expectJournalCsvLoadingFinished(downloadButton)

          expect(makeDownloadLinkSpy).not.toBeCalled()
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
          mockGetJournalSuccess(requiredProps.taskId, {
            body: taskFixtures.getJournal(0),
          })

          render(<JournalTab {...requiredProps} />, {
            store: getStoreWithAuth(),
          })

          await testUtils.expectJournalLoadingStarted()
          await testUtils.expectJournalLoadingFinished()

          expect(screen.getByText(NO_DATA_MSG)).toBeInTheDocument()
        })
      })

      describe('Не отображает', () => {
        test('Записи', async () => {
          const taskJournal = taskFixtures.getJournal(0)
          mockGetJournalSuccess(requiredProps.taskId, {
            body: taskJournal,
          })

          render(<JournalTab {...requiredProps} />, {
            store: getStoreWithAuth(),
          })

          await testUtils.expectJournalLoadingStarted()
          await testUtils.expectJournalLoadingFinished()

          expect(screen.queryAllByTestId('journalEntry')).toHaveLength(
            taskJournal.length,
          )
        })

        test('Кнопку экспорта в csv', async () => {
          mockGetJournalSuccess(requiredProps.taskId, {
            body: taskFixtures.getJournal(0),
          })

          render(<JournalTab {...requiredProps} />, {
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
        mockGetJournalServerError(requiredProps.taskId)

        render(<JournalTab {...requiredProps} />, {
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
        mockGetJournalServerError(requiredProps.taskId)

        render(<JournalTab {...requiredProps} />, {
          store: getStoreWithAuth(),
        })

        await testUtils.expectJournalLoadingStarted()
        await testUtils.expectJournalLoadingFinished()

        expect(await screen.findByText(NO_DATA_MSG)).toBeInTheDocument()
      })
    })
  })
})
