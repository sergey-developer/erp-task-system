import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import {
  getTaskJournalCsvErrMsg,
  getTaskJournalErrMsg,
  TaskJournalSourceEnum,
} from 'modules/task/constants/taskJournal'

import { commonApiMessages } from 'shared/constants/common'
import { MimetypeEnum } from 'shared/constants/mimetype'
import * as downloadLink from 'shared/utils/file/downloadFile'

import taskFixtures from '_tests_/fixtures/task'
import {
  mockGetJournalCsvServerError,
  mockGetJournalCsvSuccess,
  mockGetJournalServerError,
  mockGetJournalSuccess,
} from '_tests_/mocks/api'
import {
  buttonTestUtils,
  fakeId,
  fakeWord,
  getStoreWithAuth,
  notificationTestUtils,
  radioButtonTestUtils,
  render,
  selectTestUtils,
  setupApiTests,
  spinnerTestUtils,
} from '_tests_/utils'

import { testUtils as journalEntryTestUtils } from './JournalEntry.test'
import { NO_DATA_MSG } from './constants'
import JournalTab, { JournalTabProps } from './index'
import { getJournalCsvFilename } from './utils'

const props: Readonly<JournalTabProps> = {
  taskId: fakeId(),
}

const getContainer = () => screen.getByTestId('task-journal')

// filters
const getSourceFilter = (type: TaskJournalSourceEnum) =>
  radioButtonTestUtils.getRadioButtonIn(getContainer(), type)
const clickSourceFilter = async (user: UserEvent, type: TaskJournalSourceEnum) => {
  const filter = getSourceFilter(type)
  await user.click(filter)
}

const getTypeFilterSelect = () => within(getContainer()).getByTestId('type-filter-select')
const getTypeFilterSelectInput = () => selectTestUtils.getSelect(getTypeFilterSelect())
const openTypeFilter = (user: UserEvent) => selectTestUtils.openSelect(user, getTypeFilterSelect())
const setTypeFilter = selectTestUtils.clickSelectOption

// reload button
const getReloadButton = () => buttonTestUtils.getButtonIn(getContainer(), 'sync')
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

const expectJournalLoadingStarted = spinnerTestUtils.expectLoadingStarted('task-journal-loading')
const expectJournalLoadingFinished = spinnerTestUtils.expectLoadingFinished('task-journal-loading')

const expectJournalCsvLoadingStarted = buttonTestUtils.expectLoadingStarted
const expectJournalCsvLoadingFinished = buttonTestUtils.expectLoadingFinished

export const testUtils = {
  getContainer,

  getSourceFilter,
  clickSourceFilter,

  getTypeFilterSelect,
  getTypeFilterSelectInput,
  openTypeFilter,
  setTypeFilter,

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
notificationTestUtils.setupNotifications()

describe('Вкладка журнала задачи', () => {
  describe('Фильтр по источнику', () => {
    test('Отображается', async () => {
      mockGetJournalSuccess(props.taskId)
      render(<JournalTab {...props} />)

      await testUtils.expectJournalLoadingFinished()

      Object.values(TaskJournalSourceEnum).forEach((value) => {
        const filter = getSourceFilter(value)
        expect(filter).toBeInTheDocument()
      })
    })

    test('При клике отправляется запрос', async () => {
      mockGetJournalSuccess(props.taskId, { once: false })
      const { user } = render(<JournalTab {...props} />)

      await testUtils.expectJournalLoadingFinished()
      await testUtils.clickSourceFilter(user, TaskJournalSourceEnum.X5)
      await testUtils.expectJournalLoadingStarted()
      await testUtils.expectJournalLoadingFinished()
    })
  })

  describe('Фильтр по типу', () => {
    test('Отображается', async () => {
      mockGetJournalSuccess(props.taskId)
      render(<JournalTab {...props} />)

      await testUtils.expectJournalLoadingFinished()
      const select = testUtils.getTypeFilterSelect()

      expect(select).toBeInTheDocument()
    })

    test('При выборе всех типов отправляется запрос', async () => {
      mockGetJournalSuccess(props.taskId, { once: false })
      const { user } = render(<JournalTab {...props} />)

      await testUtils.expectJournalLoadingFinished()
      await testUtils.openTypeFilter(user)
      await testUtils.setTypeFilter(user, 'Выбрать все')
      await testUtils.expectJournalLoadingStarted()
      await testUtils.expectJournalLoadingFinished()
    })
  })

  describe('Кнопка обновления журнала', () => {
    test('Отображается корректно', async () => {
      mockGetJournalSuccess(props.taskId)
      render(<JournalTab {...props} />)

      await testUtils.expectJournalLoadingFinished()
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

  describe('Экспорт в csv', () => {
    test('Кнопка отображается при успешном запросе журнала', async () => {
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

      await testUtils.expectJournalLoadingStarted()
      await testUtils.expectJournalLoadingFinished()

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

        await testUtils.expectJournalLoadingStarted()
        await testUtils.expectJournalLoadingFinished()

        const downloadButton = await testUtils.clickDownloadButton(user)

        await testUtils.expectJournalCsvLoadingStarted(downloadButton)
        await testUtils.expectJournalCsvLoadingFinished(downloadButton)

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

        await testUtils.expectJournalLoadingStarted()
        await testUtils.expectJournalLoadingFinished()

        const downloadButton = await testUtils.clickDownloadButton(user)

        await testUtils.expectJournalCsvLoadingStarted(downloadButton)
        await testUtils.expectJournalCsvLoadingFinished(downloadButton)

        expect(downloadFileSpy).not.toBeCalled()

        const notification = await notificationTestUtils.findNotification(getTaskJournalCsvErrMsg)
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

      await testUtils.expectJournalLoadingStarted()
      await testUtils.expectJournalLoadingFinished()

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

      await testUtils.expectJournalLoadingStarted()
      await testUtils.expectJournalLoadingFinished()

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

        await testUtils.expectJournalLoadingStarted()
        await testUtils.expectJournalLoadingFinished()

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

        await testUtils.expectJournalLoadingStarted()
        await testUtils.expectJournalLoadingFinished()

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

        await testUtils.expectJournalLoadingStarted()
        await testUtils.expectJournalLoadingFinished()

        const notification = await notificationTestUtils.findNotification(getTaskJournalErrMsg)
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
