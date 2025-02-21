import { screen } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import { getFiscalAccumulatorTasksReportErrorMessage } from 'features/reports/api/constants'
import { testUtils as fiscalAccumulatorTaskTableTestUtils } from 'features/reports/components/FiscalAccumulatorTasksReportTable/FiscalAccumulatorTasksReportTable.test'
import {
  taskLocalStorageService,
  TasksFiltersStorageType,
} from 'features/tasks/services/taskLocalStorageService/taskLocalStorage.service'

import { taskDetailsTestUtils } from '_tests_/features/tasks/components/TaskDetails/testUtils'
import { tasksFiltersStorageTestUtils } from '_tests_/features/tasks/components/TasksFiltersStorage/testUtils'
import { updateTasksButtonTestUtils } from '_tests_/features/tasks/components/UpdateTasksButton/testUtils'
import reportsFixtures from '_tests_/fixtures/api/data/reports'
import {
  mockGetFiscalAccumulatorTasksServerError,
  mockGetFiscalAccumulatorTasksSuccess,
  mockGetTaskSuccess,
} from '_tests_/mocks/api'
import { fakeId, notificationTestUtils, render, setupApiTests } from '_tests_/helpers'

import FiscalAccumulatorTasksReportPage from './index'

const getContainer = () => screen.getByTestId('fiscal-accumulator-tasks-report-page')

const getUpdateTasksButton = () => updateTasksButtonTestUtils.getUpdateTasksButton(getContainer())
const clickUpdateTasksButton = async (user: UserEvent) => {
  const button = getUpdateTasksButton()
  await user.click(button)
}

export const testUtils = {
  getContainer,

  getUpdateTasksButton,
  clickUpdateTasksButton,
}

jest.mock('features/task/constants/task/tasksUpdateVariants', () => {
  const actualModule = jest.requireActual('features/task/constants/task/tasksUpdateVariants')

  return {
    __esModule: true,
    ...actualModule,
    tasksUpdateVariantsIntervals: {
      [actualModule.TasksUpdateVariantsEnum.AutoUpdate1M]: 500,
    },
  }
})

setupApiTests()
notificationTestUtils.setupNotifications()

describe('Страница заявок фискальных накопителей', () => {
  test('При успешном запросе таблица отображается корректно', async () => {
    const fiscalAccumulatorTasks = [reportsFixtures.fiscalAccumulatorTask()]
    mockGetFiscalAccumulatorTasksSuccess({ body: fiscalAccumulatorTasks })

    render(<FiscalAccumulatorTasksReportPage />)

    await fiscalAccumulatorTaskTableTestUtils.expectLoadingStarted()
    await fiscalAccumulatorTaskTableTestUtils.expectLoadingFinished()

    fiscalAccumulatorTasks.forEach((item) => {
      const row = fiscalAccumulatorTaskTableTestUtils.getRow(item.olaNextBreachTime)
      expect(row).toBeInTheDocument()
    })
  })

  describe('При не успешном запросе', () => {
    test('Обрабатывается ошибка 500', async () => {
      mockGetFiscalAccumulatorTasksServerError()

      render(<FiscalAccumulatorTasksReportPage />)

      await fiscalAccumulatorTaskTableTestUtils.expectLoadingStarted()
      await fiscalAccumulatorTaskTableTestUtils.expectLoadingFinished()

      const notification = await notificationTestUtils.findNotification(
        getFiscalAccumulatorTasksReportErrorMessage,
      )

      expect(notification).toBeInTheDocument()
    })
  })

  test.skip('При клике на заявку открывается карточка заявки', async () => {
    const fiscalAccumulatorTask = reportsFixtures.fiscalAccumulatorTask()
    mockGetFiscalAccumulatorTasksSuccess({ body: [fiscalAccumulatorTask] })
    mockGetTaskSuccess(fiscalAccumulatorTask.id)

    const { user } = render(<FiscalAccumulatorTasksReportPage />)

    await fiscalAccumulatorTaskTableTestUtils.expectLoadingStarted()
    await fiscalAccumulatorTaskTableTestUtils.expectLoadingFinished()
    await fiscalAccumulatorTaskTableTestUtils.clickRow(
      user,
      fiscalAccumulatorTask.olaNextBreachTime,
    )
    const task = await taskDetailsTestUtils.findContainer()

    expect(task).toBeInTheDocument()
  })

  describe('Кнопка обновления заявок', () => {
    test('Отображается', async () => {
      mockGetFiscalAccumulatorTasksSuccess()

      render(<FiscalAccumulatorTasksReportPage />)

      await fiscalAccumulatorTaskTableTestUtils.expectLoadingFinished()
      const button = testUtils.getUpdateTasksButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Перезагружает заявки', async () => {
      mockGetFiscalAccumulatorTasksSuccess({ once: false })

      const { user } = render(<FiscalAccumulatorTasksReportPage />)

      await fiscalAccumulatorTaskTableTestUtils.expectLoadingFinished()
      await testUtils.clickUpdateTasksButton(user)
      await fiscalAccumulatorTaskTableTestUtils.expectLoadingStarted()
    })

    test('Не активна во время загрузки заявок', async () => {
      mockGetFiscalAccumulatorTasksSuccess()

      render(<FiscalAccumulatorTasksReportPage />)

      const button = testUtils.getUpdateTasksButton()
      await fiscalAccumulatorTaskTableTestUtils.expectLoadingStarted()
      expect(button).toBeDisabled()
      await fiscalAccumulatorTaskTableTestUtils.expectLoadingFinished()
      expect(button).toBeEnabled()
    })

    test.skip('Автообновление работает', async () => {
      mockGetFiscalAccumulatorTasksSuccess({ once: false })

      const { user } = render(<FiscalAccumulatorTasksReportPage />)

      await fiscalAccumulatorTaskTableTestUtils.expectLoadingFinished()
      await updateTasksButtonTestUtils.openDropdown(user, getContainer())
      await updateTasksButtonTestUtils.clickAutoUpdateItem(user)
      await fiscalAccumulatorTaskTableTestUtils.expectLoadingStarted()
    })
  })

  describe('Сохраненные фильтры', () => {
    test('Не отображаются если их нет', () => {
      mockGetFiscalAccumulatorTasksSuccess()

      render(<FiscalAccumulatorTasksReportPage />)

      const filters = tasksFiltersStorageTestUtils.queryContainer()
      expect(filters).not.toBeInTheDocument()
    })

    test('Отображаются если есть', async () => {
      mockGetFiscalAccumulatorTasksSuccess()

      const savedTasksFilters: TasksFiltersStorageType = {
        customers: [fakeId()],
        macroregions: [fakeId()],
        supportGroups: [fakeId()],
      }
      taskLocalStorageService.setTasksFilters(savedTasksFilters)

      render(<FiscalAccumulatorTasksReportPage />)

      Object.keys(savedTasksFilters).forEach((filterName) => {
        const customersFilter = tasksFiltersStorageTestUtils.getFilter(
          filterName as keyof typeof savedTasksFilters,
        )
        expect(customersFilter).toBeInTheDocument()
      })
    })

    test('После удаления перезапрашиваются заявки', async () => {
      mockGetFiscalAccumulatorTasksSuccess({ once: false })

      taskLocalStorageService.setTasksFilters({ customers: [fakeId()] })

      const { user } = render(<FiscalAccumulatorTasksReportPage />)

      await fiscalAccumulatorTaskTableTestUtils.expectLoadingFinished()

      const filter = tasksFiltersStorageTestUtils.getFilter('customers')
      expect(filter).toBeInTheDocument()

      await tasksFiltersStorageTestUtils.removeFilter(user, 'customers')
      expect(filter).not.toBeInTheDocument()

      await fiscalAccumulatorTaskTableTestUtils.expectLoadingStarted()
      await fiscalAccumulatorTaskTableTestUtils.expectLoadingFinished()
    })
  })
})
