import { screen, within } from '@testing-library/react'
import {
  getTaskJournalCsvErrorMessage,
  getTaskJournalErrorMessage,
  TaskJournalSourceEnum,
} from 'features/tasks/api/constants'

import { commonApiMessages } from 'shared/constants/common'
import { MimetypeEnum } from 'shared/constants/mimetype'
import * as downloadLink from 'shared/utils/file/downloadFile'

import { journalEntryTestUtils } from '_tests_/features/tasks/components/TaskDetails/Tabs/JournalTab/JournalEntry/testUtils'
import { props } from '_tests_/features/tasks/components/TaskDetails/Tabs/JournalTab/constants'
import { journalTabTestUtils } from '_tests_/features/tasks/components/TaskDetails/Tabs/JournalTab/testUtils'
import taskFixtures from '_tests_/fixtures/tasks'
import {
  mockGetJournalCsvServerError,
  mockGetJournalCsvSuccess,
  mockGetJournalServerError,
  mockGetJournalSuccess,
} from '_tests_/mocks/api'
import {
  fakeWord,
  getStoreWithAuth,
  notificationTestUtils,
  render,
  setupApiTests,
} from '_tests_/utils'

import { NO_DATA_MSG } from './constants'
import JournalTab from './index'
import { getJournalCsvFilename } from './utils'

setupApiTests()
notificationTestUtils.setupNotifications()

describe('Вкладка журнала задачи', () => {
  describe('Фильтр по источнику', () => {
    test('Отображается', async () => {
      mockGetJournalSuccess(props.taskId)
      render(<JournalTab {...props} />)

      await journalTabTestUtils.expectJournalLoadingFinished()

      Object.values(TaskJournalSourceEnum).forEach((value) => {
        const filter = journalTabTestUtils.getSourceFilter(value)
        expect(filter).toBeInTheDocument()
      })
    })

    test('При клике отправляется запрос', async () => {
      mockGetJournalSuccess(props.taskId, { once: false })
      const { user } = render(<JournalTab {...props} />)

      await journalTabTestUtils.expectJournalLoadingFinished()
      await journalTabTestUtils.clickSourceFilter(user, TaskJournalSourceEnum.X5)
      await journalTabTestUtils.expectJournalLoadingStarted()
      await journalTabTestUtils.expectJournalLoadingFinished()
    })
  })

  describe('Фильтр по типу', () => {
    test('Отображается', async () => {
      mockGetJournalSuccess(props.taskId)
      render(<JournalTab {...props} />)

      await journalTabTestUtils.expectJournalLoadingFinished()
      const select = journalTabTestUtils.getTypeFilterSelect()

      expect(select).toBeInTheDocument()
    })

    test('При выборе всех типов отправляется запрос', async () => {
      mockGetJournalSuccess(props.taskId, { once: false })
      const { user } = render(<JournalTab {...props} />)

      await journalTabTestUtils.expectJournalLoadingFinished()
      await journalTabTestUtils.openTypeFilter(user)
      await journalTabTestUtils.setTypeFilter(user, 'Выбрать все')
      await journalTabTestUtils.expectJournalLoadingStarted()
      await journalTabTestUtils.expectJournalLoadingFinished()
    })
  })

  describe('Кнопка обновления журнала', () => {
    test('Отображается корректно', async () => {
      mockGetJournalSuccess(props.taskId)
      render(<JournalTab {...props} />)

      await journalTabTestUtils.expectJournalLoadingFinished()
      const button = journalTabTestUtils.getReloadButton()

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

      await journalTabTestUtils.expectJournalLoadingFinished()
      await journalTabTestUtils.clickReloadButton(user)
      await journalTabTestUtils.expectJournalLoadingStarted()
    })
  })

  describe('Экспорт в csv', () => {
    test('Кнопка отображается при успешном запросе журнала', async () => {
      mockGetJournalSuccess(props.taskId, {
        body: taskFixtures.journal(),
      })

      render(<JournalTab {...props} />, {
        store: getStoreWithAuth(),
      })

      await journalTabTestUtils.expectJournalLoadingStarted()
      await journalTabTestUtils.expectJournalLoadingFinished()
      const downloadButton = journalTabTestUtils.getDownloadButton()

      expect(downloadButton).toBeInTheDocument()
      expect(downloadButton).toBeEnabled()
      expect(within(downloadButton).getByTestId('journal-icon-download')).toBeInTheDocument()
    })

    test('Кнопка не отображается если нет записей', async () => {
      mockGetJournalSuccess(props.taskId, {
        body: taskFixtures.journal(0),
      })

      render(<JournalTab {...props} />, {
        store: getStoreWithAuth(),
      })

      await journalTabTestUtils.expectJournalLoadingStarted()
      await journalTabTestUtils.expectJournalLoadingFinished()

      expect(screen.queryByTestId('journal-btn-download')).not.toBeInTheDocument()
      expect(screen.queryByTestId('journal-icon-download')).not.toBeInTheDocument()
    })

    describe('При успешной загрузке csv', () => {
      const downloadFileSpy = jest.spyOn(downloadLink, 'downloadFile')

      test('Не показывает сообщение об ошибке', async () => {
        mockGetJournalSuccess(props.taskId, {
          body: taskFixtures.journal(),
        })

        const fakeCsv = fakeWord()
        mockGetJournalCsvSuccess(props.taskId, { body: fakeCsv })

        const { user } = render(<JournalTab {...props} />, {
          store: getStoreWithAuth(),
        })

        await journalTabTestUtils.expectJournalLoadingStarted()
        await journalTabTestUtils.expectJournalLoadingFinished()

        const downloadButton = await journalTabTestUtils.clickDownloadButton(user)

        await journalTabTestUtils.expectJournalCsvLoadingStarted(downloadButton)
        await journalTabTestUtils.expectJournalCsvLoadingFinished(downloadButton)

        expect(downloadFileSpy).toBeCalledTimes(1)
        expect(downloadFileSpy).toBeCalledWith(
          fakeCsv,
          MimetypeEnum.Csv,
          getJournalCsvFilename(props.taskId),
        )

        const notification = screen.queryByText(commonApiMessages.unknownError)
        expect(notification).not.toBeInTheDocument()
      })
    })

    describe('При не успешной загрузке csv', () => {
      const downloadFileSpy = jest.spyOn(downloadLink, 'downloadFile')

      test('Показывает сообщение об ошибке', async () => {
        mockGetJournalSuccess(props.taskId, {
          body: taskFixtures.journal(),
        })
        mockGetJournalCsvServerError(props.taskId)

        const { user } = render(<JournalTab {...props} />, {
          store: getStoreWithAuth(),
        })

        await journalTabTestUtils.expectJournalLoadingStarted()
        await journalTabTestUtils.expectJournalLoadingFinished()

        const downloadButton = await journalTabTestUtils.clickDownloadButton(user)

        await journalTabTestUtils.expectJournalCsvLoadingStarted(downloadButton)
        await journalTabTestUtils.expectJournalCsvLoadingFinished(downloadButton)

        expect(downloadFileSpy).not.toBeCalled()

        const notification = await notificationTestUtils.findNotification(
          getTaskJournalCsvErrorMessage,
        )
        expect(notification).toBeInTheDocument()
      })
    })
  })

  describe('При успешном запросе журнала', () => {
    test('Отображает записи', async () => {
      const taskJournal = taskFixtures.journal()
      mockGetJournalSuccess(props.taskId, { body: taskJournal })

      render(<JournalTab {...props} />, {
        store: getStoreWithAuth(),
      })

      await journalTabTestUtils.expectJournalLoadingStarted()
      await journalTabTestUtils.expectJournalLoadingFinished()

      const journalEntries = taskJournal.map((entry) =>
        journalEntryTestUtils.getContainer(entry.id),
      )

      expect(journalEntries).toHaveLength(taskJournal.length)
    })

    test(`Если есть записи, не отображает текст "${NO_DATA_MSG}"`, async () => {
      mockGetJournalSuccess(props.taskId, {
        body: taskFixtures.journal(),
      })

      render(<JournalTab {...props} />, {
        store: getStoreWithAuth(),
      })

      await journalTabTestUtils.expectJournalLoadingStarted()
      await journalTabTestUtils.expectJournalLoadingFinished()

      expect(screen.queryByText(NO_DATA_MSG)).not.toBeInTheDocument()
    })

    describe('Если нет записей', () => {
      test(`Отображает текст "${NO_DATA_MSG}"`, async () => {
        mockGetJournalSuccess(props.taskId, {
          body: taskFixtures.journal(0),
        })

        render(<JournalTab {...props} />, {
          store: getStoreWithAuth(),
        })

        await journalTabTestUtils.expectJournalLoadingStarted()
        await journalTabTestUtils.expectJournalLoadingFinished()

        expect(screen.getByText(NO_DATA_MSG)).toBeInTheDocument()
      })

      test('Не отображает записи', async () => {
        const taskJournal = taskFixtures.journal(0)
        mockGetJournalSuccess(props.taskId, {
          body: taskJournal,
        })

        render(<JournalTab {...props} />, {
          store: getStoreWithAuth(),
        })

        await journalTabTestUtils.expectJournalLoadingStarted()
        await journalTabTestUtils.expectJournalLoadingFinished()

        const journalEntries = taskJournal
          .map((entry) => journalEntryTestUtils.queryContainer(entry.id))
          .filter(Boolean)

        expect(journalEntries).toHaveLength(taskJournal.length)
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

        await journalTabTestUtils.expectJournalLoadingStarted()
        await journalTabTestUtils.expectJournalLoadingFinished()

        const notification = await notificationTestUtils.findNotification(
          getTaskJournalErrorMessage,
        )
        expect(notification).toBeInTheDocument()
      })

      test('Соответствующий текст', async () => {
        mockGetJournalServerError(props.taskId)

        render(<JournalTab {...props} />, {
          store: getStoreWithAuth(),
        })

        await journalTabTestUtils.expectJournalLoadingStarted()
        await journalTabTestUtils.expectJournalLoadingFinished()

        expect(await screen.findByText(NO_DATA_MSG)).toBeInTheDocument()
      })
    })
  })
})
