import { screen } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { testUtils as fiscalAccumulatorTaskTableTestUtils } from 'modules/fiscalAccumulator/components/FiscalAccumulatorTaskTable/FiscalAccumulatorTaskTable.test'
import { getFiscalAccumulatorTasksErrorMsg } from 'modules/fiscalAccumulator/constants'
import { testUtils as tasksFiltersStorageTestUtils } from 'modules/task/components/TasksFiltersStorage/TasksFiltersStorage.test'
import { testUtils as updateTasksButtonTestUtils } from 'modules/task/components/UpdateTasksButton/UpdateTasksButton.test'
import {
  taskLocalStorageService,
  TasksFiltersStorageType,
} from 'modules/task/services/taskLocalStorageService/taskLocalStorage.service'

import fiscalAccumulatorFixtures from '_tests_/fixtures/fiscalAccumulator'
import {
  mockGetFiscalAccumulatorTasksServerError,
  mockGetFiscalAccumulatorTasksSuccess,
} from '_tests_/mocks/api'
import { fakeId, notificationTestUtils, render, setupApiTests } from '_tests_/utils'

import FiscalAccumulatorTasksPage from './index'

const getContainer = () => screen.getByTestId('fiscal-accumulator-tasks-page')

const getUpdateTasksButton = () => updateTasksButtonTestUtils.getUpdateTasksButton(getContainer())
const clickUpdateTasksButton = async (user: UserEvent) => {
  const button = getUpdateTasksButton()
  await user.click(button)
}

export const testUtils = {
  getUpdateTasksButton,
  clickUpdateTasksButton,
}

jest.mock('modules/task/constants/task/tasksUpdateVariants', () => {
  const actualModule = jest.requireActual('modules/task/constants/task/tasksUpdateVariants')

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
  describe('При успешном запросе', () => {
    test('Таблица отображается корректно', async () => {
      const fiscalAccumulatorTasks = [fiscalAccumulatorFixtures.fiscalAccumulatorTaskListItem()]
      mockGetFiscalAccumulatorTasksSuccess({ body: fiscalAccumulatorTasks })

      render(<FiscalAccumulatorTasksPage />)

      await fiscalAccumulatorTaskTableTestUtils.expectLoadingStarted()
      await fiscalAccumulatorTaskTableTestUtils.expectLoadingFinished()

      fiscalAccumulatorTasks.forEach((item) => {
        const row = fiscalAccumulatorTaskTableTestUtils.getRow(item.olaNextBreachTime)
        expect(row).toBeInTheDocument()
      })
    })
  })

  describe('При не успешном запроса', () => {
    test('Обрабатывается ошибка 500', async () => {
      mockGetFiscalAccumulatorTasksServerError()

      render(<FiscalAccumulatorTasksPage />)

      await fiscalAccumulatorTaskTableTestUtils.expectLoadingStarted()
      await fiscalAccumulatorTaskTableTestUtils.expectLoadingFinished()

      const notification = await notificationTestUtils.findNotification(
        getFiscalAccumulatorTasksErrorMsg,
      )

      expect(notification).toBeInTheDocument()
    })
  })

  describe('Кнопка обновления заявок', () => {
    test('Отображается', async () => {
      mockGetFiscalAccumulatorTasksSuccess()

      render(<FiscalAccumulatorTasksPage />)

      await fiscalAccumulatorTaskTableTestUtils.expectLoadingFinished()
      const button = testUtils.getUpdateTasksButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Перезагружает заявки', async () => {
      mockGetFiscalAccumulatorTasksSuccess({ once: false })

      const { user } = render(<FiscalAccumulatorTasksPage />)

      await fiscalAccumulatorTaskTableTestUtils.expectLoadingFinished()
      await testUtils.clickUpdateTasksButton(user)
      await fiscalAccumulatorTaskTableTestUtils.expectLoadingStarted()
    })

    test('Не активна во время загрузки заявок', async () => {
      mockGetFiscalAccumulatorTasksSuccess()

      render(<FiscalAccumulatorTasksPage />)

      const button = testUtils.getUpdateTasksButton()
      await fiscalAccumulatorTaskTableTestUtils.expectLoadingStarted()
      expect(button).toBeDisabled()
      await fiscalAccumulatorTaskTableTestUtils.expectLoadingFinished()
      expect(button).toBeEnabled()
    })

    test('Автообновление работает', async () => {
      mockGetFiscalAccumulatorTasksSuccess({ once: false })

      const { user } = render(<FiscalAccumulatorTasksPage />)

      await fiscalAccumulatorTaskTableTestUtils.expectLoadingFinished()
      await updateTasksButtonTestUtils.openDropdown(user, getContainer())
      await updateTasksButtonTestUtils.clickAutoUpdateItem(user)
      await fiscalAccumulatorTaskTableTestUtils.expectLoadingStarted()
    })
  })

  describe('Сохраненные фильтры', () => {
    test('Не отображаются если их нет', () => {
      mockGetFiscalAccumulatorTasksSuccess()

      render(<FiscalAccumulatorTasksPage />)

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

      render(<FiscalAccumulatorTasksPage />)

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

      const { user } = render(<FiscalAccumulatorTasksPage />)

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
