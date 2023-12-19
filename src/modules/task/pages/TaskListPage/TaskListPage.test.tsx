import { screen, waitFor, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import { camelize } from 'humps'
import moment from 'moment-timezone'

import { testUtils as extendedFilterTestUtils } from 'modules/task/components/ExtendedFilter/ExtendedFilter.test'
import {
  searchFieldDict,
  taskAssignedDict,
  taskOverdueDict,
} from 'modules/task/components/ExtendedFilter/constants'
import { testUtils as fastFilterListTestUtils } from 'modules/task/components/FastFilterList/FastFilterList.test'
import { testUtils as taskCardTestUtils } from 'modules/task/components/TaskDetails/Card_old/Card.test'
import { testUtils as taskTableTestUtils } from 'modules/task/components/TaskTable/TaskTable.test'
import { testUtils as tasksFiltersStorageTestUtils } from 'modules/task/components/TasksFiltersStorage/TasksFiltersStorage.test'
import { testUtils as updateTasksButtonTestUtils } from 'modules/task/components/UpdateTasksButton/UpdateTasksButton.test'
import { FastFilterEnum, taskExtendedStatusDict } from 'modules/task/constants/task'
import { TaskCountersKeys } from 'modules/task/models'
import {
  taskLocalStorageService,
  TasksFiltersStorageType,
} from 'modules/task/services/taskLocalStorageService/taskLocalStorage.service'
import { UserRoleEnum } from 'modules/user/constants'

import commonFixtures from '_tests_/fixtures/common'
import macroregionFixtures from '_tests_/fixtures/macroregion'
import supportGroupFixtures from '_tests_/fixtures/supportGroup'
import taskFixtures from '_tests_/fixtures/task'
import userFixtures from '_tests_/fixtures/user'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import workGroupFixtures from '_tests_/fixtures/workGroup'
import {
  mockGetCustomerListSuccess,
  mockGetMacroregionListSuccess,
  mockGetSupportGroupListSuccess,
  mockGetTaskCountersSuccess,
  mockGetTaskListSuccess,
  mockGetTaskSuccess,
  mockGetUserListSuccess,
  mockGetWorkGroupListSuccess,
} from '_tests_/mocks/api'
import {
  buttonTestUtils,
  fakeId,
  fakeWord,
  getStoreWithAuth,
  render,
  selectTestUtils,
  setupApiTests,
} from '_tests_/utils'

import { DEFAULT_PAGE_SIZE, tableItemBoundaryStyles } from './constants'
import TaskListPage from './index'

const getContainer = () => screen.getByTestId('task-list-page')

// search input
const getSearchInput = () => within(getContainer()).getByPlaceholderText('Искать заявку по номеру')
const getSearchButton = () => buttonTestUtils.getButtonIn(getContainer(), /search/)
const setSearchValue = async (user: UserEvent, value: string, pressEnter: boolean = false) => {
  const input = getSearchInput()
  await user.type(input, pressEnter ? value.concat('{enter}') : value)
  return input
}
const getSearchClearButton = () => buttonTestUtils.getButtonIn(getContainer(), 'close-circle')
const clickSearchClearButton = async (user: UserEvent) => {
  const button = getSearchClearButton()
  await user.click(button)
  return button
}

// update tasks button
const getUpdateTasksButton = () => updateTasksButtonTestUtils.getUpdateTasksButton(getContainer())
const clickUpdateTasksButton = async (user: UserEvent) => {
  const button = getUpdateTasksButton()
  await user.click(button)
}

// create task button
const getCreateTaskButton = () => buttonTestUtils.getButtonIn(getContainer(), /создать заявку/i)

// extended filter button
const getExtendedFilterButton = () => buttonTestUtils.getButtonIn(getContainer(), /filter/)
const clickExtendedFilterButton = async (user: UserEvent) => {
  const button = getExtendedFilterButton()
  await user.click(button)
  return button
}

export const testUtils = {
  getContainer,

  getSearchInput,
  setSearchValue,

  getSearchButton,

  getSearchClearButton,
  clickSearchClearButton,

  getUpdateTasksButton,
  clickUpdateTasksButton,

  getCreateTaskButton,

  getExtendedFilterButton,
  clickExtendedFilterButton,
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

describe('Страница реестра заявок', () => {
  test('Отображается корректно', () => {
    mockGetTaskCountersSuccess()
    mockGetTaskListSuccess()

    render(<TaskListPage />)

    expect(testUtils.getContainer()).toBeInTheDocument()
  })

  describe('Быстрый фильтр', () => {
    test('Отображается', async () => {
      mockGetTaskCountersSuccess()
      mockGetTaskListSuccess()

      render(<TaskListPage />, { store: getStoreWithAuth() })

      await fastFilterListTestUtils.expectLoadingFinished()

      expect(fastFilterListTestUtils.getContainer()).toBeInTheDocument()
    })

    test('Не активный во время загрузки заявок', async () => {
      mockGetTaskCountersSuccess()
      mockGetTaskListSuccess()

      render(<TaskListPage />, { store: getStoreWithAuth() })

      await waitFor(() => fastFilterListTestUtils.expectAllFiltersDisabled())
      await taskTableTestUtils.expectLoadingFinished()
      fastFilterListTestUtils.expectAllFiltersNotDisabled()
    })

    test('Количество заявок отображается корректно', async () => {
      const taskCounters = taskFixtures.taskCounters()
      mockGetTaskCountersSuccess({ body: taskCounters })
      mockGetTaskListSuccess()

      render(<TaskListPage />, { store: getStoreWithAuth() })

      await fastFilterListTestUtils.expectLoadingFinished()

      Object.values(FastFilterEnum).forEach((filter) => {
        const counterName = camelize(filter.toLowerCase())
        const taskCount = taskCounters[counterName as TaskCountersKeys]

        const counter = fastFilterListTestUtils.getByTextInCheckableTag(filter, taskCount)
        expect(counter).toBeInTheDocument()
      })
    })

    describe('Имеет корректное значение по умолчанию', () => {
      test(`Роль - ${UserRoleEnum.FirstLineSupport}`, async () => {
        mockGetTaskCountersSuccess()
        mockGetTaskListSuccess()

        render(<TaskListPage />, {
          store: getStoreWithAuth({ userRole: UserRoleEnum.FirstLineSupport }),
        })

        await taskTableTestUtils.expectLoadingFinished()
        await fastFilterListTestUtils.expectLoadingFinished()

        fastFilterListTestUtils.expectFilterChecked(
          fastFilterListTestUtils.getCheckableTag(FastFilterEnum.FirstLine),
        )
      })

      test(`Роль - ${UserRoleEnum.Engineer}`, async () => {
        mockGetTaskCountersSuccess()
        mockGetTaskListSuccess()

        render(<TaskListPage />, {
          store: getStoreWithAuth({ userRole: UserRoleEnum.Engineer }),
        })

        await taskTableTestUtils.expectLoadingFinished()
        await fastFilterListTestUtils.expectLoadingFinished()

        fastFilterListTestUtils.expectFilterChecked(
          fastFilterListTestUtils.getCheckableTag(FastFilterEnum.Mine),
        )
      })

      test(`Роль - ${UserRoleEnum.SeniorEngineer}`, async () => {
        mockGetTaskCountersSuccess()
        mockGetTaskListSuccess()

        render(<TaskListPage />, {
          store: getStoreWithAuth({ userRole: UserRoleEnum.SeniorEngineer }),
        })

        await taskTableTestUtils.expectLoadingFinished()
        await fastFilterListTestUtils.expectLoadingFinished()

        fastFilterListTestUtils.expectFilterChecked(
          fastFilterListTestUtils.getCheckableTag(FastFilterEnum.All),
        )
      })

      test(`Роль - ${UserRoleEnum.HeadOfDepartment}`, async () => {
        mockGetTaskCountersSuccess()
        mockGetTaskListSuccess()

        render(<TaskListPage />, {
          store: getStoreWithAuth({ userRole: UserRoleEnum.HeadOfDepartment }),
        })

        await taskTableTestUtils.expectLoadingFinished()
        await fastFilterListTestUtils.expectLoadingFinished()

        fastFilterListTestUtils.expectFilterChecked(
          fastFilterListTestUtils.getCheckableTag(FastFilterEnum.All),
        )
      })
    })

    test('При смене фильтра отправляется запрос', async () => {
      mockGetTaskCountersSuccess()
      mockGetTaskListSuccess({ once: false })

      const { user } = render(<TaskListPage />, {
        store: getStoreWithAuth(),
      })

      await taskTableTestUtils.expectLoadingFinished()
      await fastFilterListTestUtils.expectLoadingFinished()
      await fastFilterListTestUtils.setFilter(user, FastFilterEnum.Free)
      await taskTableTestUtils.expectLoadingStarted()
    })

    test('Сбрасывает расширенный фильтр', async () => {
      const workGroupListItem = workGroupFixtures.workGroupListItem()
      mockGetWorkGroupListSuccess({ body: [workGroupListItem], once: false })
      mockGetTaskCountersSuccess()
      mockGetTaskListSuccess({ once: false })
      mockGetCustomerListSuccess({ once: false })
      mockGetSupportGroupListSuccess({ once: false })
      mockGetMacroregionListSuccess({ once: false })

      const userListItem = userFixtures.userListItem()
      mockGetUserListSuccess({ body: [userListItem], once: false })

      const { user } = render(<TaskListPage />, {
        store: getStoreWithAuth({
          userRole: UserRoleEnum.SeniorEngineer,
        }),
      })

      await fastFilterListTestUtils.expectLoadingFinished()
      await taskTableTestUtils.expectLoadingFinished()

      await testUtils.clickExtendedFilterButton(user)
      await extendedFilterTestUtils.findContainer()
      await extendedFilterTestUtils.workGroup.expectLoadingFinished()
      await extendedFilterTestUtils.manager.expectLoadingFinished()

      await extendedFilterTestUtils.status.setValue(user, taskExtendedStatusDict.NEW!)

      await extendedFilterTestUtils.assigned.setValue(user, taskAssignedDict.True)

      await extendedFilterTestUtils.overdue.setValue(user, taskOverdueDict.False)

      const { startDateValue, endDateValue } = await extendedFilterTestUtils.completeAt.setValue(
        user,
      )

      const { keyword: searchByColumnKeywordValue } =
        await extendedFilterTestUtils.searchByColumn.setKeywordValue(user)

      await extendedFilterTestUtils.searchByColumn.setColumnValue(
        user,
        searchFieldDict.searchByName,
      )

      const workGroupField = await extendedFilterTestUtils.workGroup.expectLoadingFinished()
      await extendedFilterTestUtils.workGroup.openField(user, workGroupField)
      await extendedFilterTestUtils.workGroup.setValue(user, workGroupListItem.name)

      await extendedFilterTestUtils.manager.openField(user)
      await extendedFilterTestUtils.manager.setValue(user, userListItem.fullName)

      await extendedFilterTestUtils.clickApplyButton(user)
      await taskTableTestUtils.expectLoadingFinished()

      await fastFilterListTestUtils.setFilter(user, FastFilterEnum.Free)
      await taskTableTestUtils.expectLoadingStarted()
      await taskTableTestUtils.expectLoadingFinished()

      await testUtils.clickExtendedFilterButton(user)
      await extendedFilterTestUtils.findContainer()
      await extendedFilterTestUtils.workGroup.expectLoadingFinished()
      await extendedFilterTestUtils.manager.expectLoadingFinished()

      await waitFor(() => {
        expect(
          extendedFilterTestUtils.status.getField(taskExtendedStatusDict.NEW!),
        ).not.toBeChecked()
      })

      expect(extendedFilterTestUtils.assigned.getField(taskAssignedDict.True)).not.toBeChecked()

      expect(extendedFilterTestUtils.overdue.getField(taskOverdueDict.False)).not.toBeChecked()

      expect(extendedFilterTestUtils.completeAt.getStartDateField()).not.toHaveDisplayValue(
        startDateValue,
      )

      expect(extendedFilterTestUtils.completeAt.getEndDateField()).not.toHaveDisplayValue(
        endDateValue,
      )

      expect(extendedFilterTestUtils.searchByColumn.getKeywordField()).not.toHaveDisplayValue(
        searchByColumnKeywordValue,
      )

      expect(
        extendedFilterTestUtils.searchByColumn.getColumnField(searchFieldDict.searchByName),
      ).not.toBeChecked()

      expect(
        selectTestUtils.getSelectedOption(extendedFilterTestUtils.workGroup.getField()),
      ).not.toBeInTheDocument()

      expect(extendedFilterTestUtils.manager.getSelected()).not.toBeInTheDocument()
    })

    test('Закрывает карточку заявки', async () => {
      mockGetWorkGroupListSuccess()
      mockGetTaskCountersSuccess()

      const taskListItem = taskFixtures.taskListItem()
      mockGetTaskListSuccess({
        once: false,
        body: taskFixtures.taskListResponse([taskListItem]),
      })
      mockGetTaskSuccess(taskListItem.id)

      const { user } = render(<TaskListPage />, { store: getStoreWithAuth() })

      await taskTableTestUtils.expectLoadingStarted()
      await taskTableTestUtils.expectLoadingFinished()
      await fastFilterListTestUtils.expectLoadingFinished()
      await taskTableTestUtils.clickRow(user, taskListItem.id)
      const taskCard = await taskCardTestUtils.findContainer()

      await fastFilterListTestUtils.setFilter(user, FastFilterEnum.Free)

      await waitFor(() => {
        expect(taskCard).not.toBeInTheDocument()
      })
    })

    test('Сбрасывает значение поля поиска', async () => {
      mockGetTaskCountersSuccess()
      mockGetTaskListSuccess({ once: false })

      const { user } = render(<TaskListPage />, { store: getStoreWithAuth() })

      await taskTableTestUtils.expectLoadingFinished()
      await fastFilterListTestUtils.expectLoadingFinished()

      const searchValue = fakeWord()
      const searchInput = await testUtils.setSearchValue(user, searchValue)

      await fastFilterListTestUtils.setFilter(user, FastFilterEnum.Free)
      await taskTableTestUtils.expectLoadingFinished()

      expect(searchInput).not.toHaveValue()
      expect(searchInput).not.toHaveDisplayValue(searchValue)
    })
  })

  describe('Кнопка расширенных фильтров', () => {
    test('Отображается корректно', async () => {
      mockGetTaskListSuccess()
      mockGetTaskCountersSuccess()

      render(<TaskListPage />)

      await taskTableTestUtils.expectLoadingFinished()
      const button = testUtils.getExtendedFilterButton()

      expect(button).toBeInTheDocument()
      await waitFor(() => expect(button).toBeEnabled())
    })

    test('Открывает расширенный фильтр', async () => {
      mockGetUserListSuccess()
      mockGetTaskListSuccess()
      mockGetTaskCountersSuccess()
      mockGetWorkGroupListSuccess()

      const { user } = render(<TaskListPage />)

      await taskTableTestUtils.expectLoadingFinished()
      await testUtils.clickExtendedFilterButton(user)
      const filter = await extendedFilterTestUtils.findContainer()

      expect(filter).toBeInTheDocument()
    })

    test('Не активна во время загрузки заявок', async () => {
      mockGetTaskCountersSuccess()
      mockGetTaskListSuccess()

      render(<TaskListPage />, { store: getStoreWithAuth() })

      await waitFor(() => expect(testUtils.getExtendedFilterButton()).toBeDisabled())
      await taskTableTestUtils.expectLoadingFinished()
      await waitFor(() => expect(testUtils.getExtendedFilterButton()).toBeEnabled())
    })
  })

  describe('Расширенный фильтр', () => {
    describe('После применения', () => {
      /* не работает по какой-то причине */
      test.skip('Отправляется запрос', async () => {
        mockGetTaskListSuccess({ once: false })
        mockGetTaskCountersSuccess()
        mockGetWorkGroupListSuccess()
        mockGetUserListSuccess()
        mockGetCustomerListSuccess()
        mockGetMacroregionListSuccess()
        mockGetSupportGroupListSuccess()

        const { user } = render(<TaskListPage />, { store: getStoreWithAuth() })

        await taskTableTestUtils.expectLoadingFinished()
        await testUtils.clickExtendedFilterButton(user)
        await extendedFilterTestUtils.findContainer()
        await extendedFilterTestUtils.clickApplyButton(user)
        await taskTableTestUtils.expectLoadingStarted()
      })

      test('Фильтр закрывается', async () => {
        mockGetUserListSuccess()
        mockGetTaskListSuccess({ once: false })
        mockGetTaskCountersSuccess()
        mockGetWorkGroupListSuccess()
        mockGetCustomerListSuccess()
        mockGetMacroregionListSuccess()
        mockGetSupportGroupListSuccess()

        const { user } = render(<TaskListPage />)

        await taskTableTestUtils.expectLoadingFinished()
        await testUtils.clickExtendedFilterButton(user)
        const filter = await extendedFilterTestUtils.findContainer()
        await extendedFilterTestUtils.clickApplyButton(user)

        await waitFor(() => {
          expect(filter).not.toBeInTheDocument()
        })
      })

      test('Карточка заявки закрывается', async () => {
        mockGetWorkGroupListSuccess()
        mockGetTaskCountersSuccess()
        mockGetUserListSuccess()
        mockGetCustomerListSuccess()
        mockGetMacroregionListSuccess()
        mockGetSupportGroupListSuccess()

        const taskListItem = taskFixtures.taskListItem()
        mockGetTaskListSuccess({
          body: taskFixtures.taskListResponse([taskListItem]),
          once: false,
        })
        mockGetTaskSuccess(taskListItem.id)

        const { user } = render(<TaskListPage />, { store: getStoreWithAuth() })

        await taskTableTestUtils.expectLoadingStarted()
        await taskTableTestUtils.expectLoadingFinished()
        await taskTableTestUtils.clickRow(user, taskListItem.id)
        const taskCard = await taskCardTestUtils.findContainer()

        await testUtils.clickExtendedFilterButton(user)
        await extendedFilterTestUtils.findContainer()
        await extendedFilterTestUtils.clickApplyButton(user)

        await waitFor(() => {
          expect(taskCard).not.toBeInTheDocument()
        })
      })

      test('Быстрый фильтр сбрасывается', async () => {
        mockGetUserListSuccess()
        mockGetTaskListSuccess({ once: false })
        mockGetTaskCountersSuccess()
        mockGetWorkGroupListSuccess()
        mockGetCustomerListSuccess()
        mockGetMacroregionListSuccess()
        mockGetSupportGroupListSuccess()

        const { user } = render(<TaskListPage />, { store: getStoreWithAuth() })

        await taskTableTestUtils.expectLoadingFinished()
        await fastFilterListTestUtils.expectLoadingFinished()
        const fastFilter = fastFilterListTestUtils.getCheckableTag(FastFilterEnum.FirstLine)
        fastFilterListTestUtils.expectFilterChecked(fastFilter)
        await testUtils.clickExtendedFilterButton(user)
        await extendedFilterTestUtils.findContainer()
        await extendedFilterTestUtils.clickApplyButton(user)

        await waitFor(() => {
          fastFilterListTestUtils.expectFilterNotChecked(fastFilter)
        })
      })

      test('Закрывается нажав кнопку закрытия', async () => {
        mockGetUserListSuccess()
        mockGetWorkGroupListSuccess()
        mockGetTaskCountersSuccess()
        mockGetTaskListSuccess()
        mockGetCustomerListSuccess()
        mockGetMacroregionListSuccess()
        mockGetSupportGroupListSuccess()

        const { user } = render(<TaskListPage />)

        await taskTableTestUtils.expectLoadingFinished()
        await testUtils.clickExtendedFilterButton(user)
        const filter = await extendedFilterTestUtils.findContainer()
        await extendedFilterTestUtils.closeFilter(user)

        await waitFor(() => {
          expect(filter).not.toBeInTheDocument()
        })
      })

      test('Значения сохраняются если другой фильтр не применялся', async () => {
        const workGroupListItem = workGroupFixtures.workGroupListItem()
        mockGetWorkGroupListSuccess({ body: [workGroupListItem], once: false })
        mockGetTaskCountersSuccess()
        mockGetTaskListSuccess({ once: false })
        mockGetCustomerListSuccess({ once: false })
        mockGetMacroregionListSuccess({ once: false })
        mockGetSupportGroupListSuccess({ once: false })

        const userListItem = userFixtures.userListItem()
        mockGetUserListSuccess({ body: [userListItem], once: false })

        const { user } = render(<TaskListPage />, {
          store: getStoreWithAuth({ userRole: UserRoleEnum.SeniorEngineer }),
        })

        await taskTableTestUtils.expectLoadingFinished()
        await testUtils.clickExtendedFilterButton(user)
        await extendedFilterTestUtils.findContainer()
        await extendedFilterTestUtils.workGroup.expectLoadingFinished()
        await extendedFilterTestUtils.manager.expectLoadingFinished()

        await extendedFilterTestUtils.status.setValue(user, taskExtendedStatusDict.NEW!)

        await extendedFilterTestUtils.assigned.setValue(user, taskAssignedDict.True)

        await extendedFilterTestUtils.overdue.setValue(user, taskOverdueDict.False)

        const { startDateValue, endDateValue } = await extendedFilterTestUtils.completeAt.setValue(
          user,
        )

        const { keyword: searchByColumnKeywordValue } =
          await extendedFilterTestUtils.searchByColumn.setKeywordValue(user)

        await extendedFilterTestUtils.searchByColumn.setColumnValue(
          user,
          searchFieldDict.searchByName,
        )

        const workGroupField = await extendedFilterTestUtils.workGroup.expectLoadingFinished()
        await extendedFilterTestUtils.workGroup.openField(user, workGroupField)
        await extendedFilterTestUtils.workGroup.setValue(user, workGroupListItem.name)

        await extendedFilterTestUtils.manager.openField(user)
        await extendedFilterTestUtils.manager.setValue(user, userListItem.fullName)

        await extendedFilterTestUtils.clickApplyButton(user)
        // await taskTableTestUtils.expectLoadingStarted()
        await taskTableTestUtils.expectLoadingFinished()
        await testUtils.clickExtendedFilterButton(user)
        await extendedFilterTestUtils.findContainer()
        await extendedFilterTestUtils.workGroup.expectLoadingFinished()
        await extendedFilterTestUtils.manager.expectLoadingFinished()

        const statusField = extendedFilterTestUtils.status.getField(taskExtendedStatusDict.NEW!)
        await waitFor(() => {
          expect(statusField).toBeChecked()
        })

        expect(extendedFilterTestUtils.assigned.getField(taskAssignedDict.True)).toBeChecked()

        expect(extendedFilterTestUtils.overdue.getField(taskOverdueDict.False)).toBeChecked()

        const startDateField = extendedFilterTestUtils.completeAt.getStartDateField()
        await waitFor(() => {
          expect(startDateField).toHaveDisplayValue(startDateValue)
        })

        expect(extendedFilterTestUtils.completeAt.getEndDateField()).toHaveDisplayValue(
          endDateValue,
        )

        expect(extendedFilterTestUtils.searchByColumn.getKeywordField()).toHaveDisplayValue(
          searchByColumnKeywordValue,
        )

        expect(
          extendedFilterTestUtils.searchByColumn.getColumnField(searchFieldDict.searchByName),
        ).toBeChecked()

        expect(
          selectTestUtils.getSelectedOption(extendedFilterTestUtils.workGroup.getField()),
        ).toHaveTextContent(workGroupListItem.name)

        expect(extendedFilterTestUtils.manager.getSelected()).toHaveTextContent(
          userListItem.fullName,
        )
      })

      test('Сохраняется фильтр групп поддержки', async () => {
        const customerListItem = warehouseFixtures.customerListItem()
        mockGetCustomerListSuccess({ body: [customerListItem], once: false })

        const macroregionListItem = macroregionFixtures.macroregionListItem()
        mockGetMacroregionListSuccess({ body: [macroregionListItem], once: false })

        const supportGroupListItem = supportGroupFixtures.supportGroupListItem()
        mockGetSupportGroupListSuccess({ body: [supportGroupListItem], once: false })

        mockGetWorkGroupListSuccess()
        mockGetTaskCountersSuccess()
        mockGetUserListSuccess()
        mockGetTaskListSuccess({
          body: commonFixtures.paginatedListResponse(taskFixtures.taskList()),
          once: false,
        })

        const { user } = render(<TaskListPage />, { store: getStoreWithAuth() })

        await taskTableTestUtils.expectLoadingStarted()
        await taskTableTestUtils.expectLoadingFinished()
        const button = testUtils.getExtendedFilterButton()
        await waitFor(() => expect(button).toBeEnabled())
        await user.click(button)

        const filter = await extendedFilterTestUtils.findContainer()
        await extendedFilterTestUtils.expectCustomersLoadingFinished()
        await extendedFilterTestUtils.expectMacroregionsLoadingFinished()
        await extendedFilterTestUtils.expectSupportGroupsLoadingFinished()

        await extendedFilterTestUtils.openCustomersSelect(user)
        await extendedFilterTestUtils.setCustomer(user, customerListItem.title)

        await extendedFilterTestUtils.openMacroregionsSelect(user)
        await extendedFilterTestUtils.setMacroregion(user, macroregionListItem.title)

        await extendedFilterTestUtils.openSupportGroupsSelect(user)
        await extendedFilterTestUtils.setSupportGroup(user, supportGroupListItem.name)
        await extendedFilterTestUtils.clickApplyButton(user)

        await waitFor(() => {
          expect(filter).not.toBeInTheDocument()
        })

        const filters = taskLocalStorageService.getTasksFilters()!
        expect(filters.customers).toEqual(expect.arrayContaining([customerListItem.id]))
        expect(filters.macroregions).toEqual(expect.arrayContaining([macroregionListItem.id]))
        expect(filters.supportGroups).toEqual(expect.arrayContaining([supportGroupListItem.id]))
      })
    })

    test('Значения не сохраняются если фильтр не был применён', async () => {
      const workGroupListItem = workGroupFixtures.workGroupListItem()
      mockGetWorkGroupListSuccess({ body: [workGroupListItem], once: false })
      mockGetTaskCountersSuccess()
      mockGetTaskListSuccess()
      mockGetCustomerListSuccess({ once: false })
      mockGetMacroregionListSuccess({ once: false })
      mockGetSupportGroupListSuccess({ once: false })

      const userListItem = userFixtures.userListItem()
      mockGetUserListSuccess({ body: [userListItem], once: false })

      const { user } = render(<TaskListPage />, {
        store: getStoreWithAuth({ userRole: UserRoleEnum.SeniorEngineer }),
      })

      await taskTableTestUtils.expectLoadingFinished()
      await testUtils.clickExtendedFilterButton(user)
      const filter = await extendedFilterTestUtils.findContainer()
      await extendedFilterTestUtils.workGroup.expectLoadingFinished()
      await extendedFilterTestUtils.manager.expectLoadingFinished()

      await extendedFilterTestUtils.status.setValue(user, taskExtendedStatusDict.NEW!)

      await extendedFilterTestUtils.assigned.setValue(user, taskAssignedDict.True)

      await extendedFilterTestUtils.overdue.setValue(user, taskOverdueDict.False)

      const { startDateValue, endDateValue } = await extendedFilterTestUtils.completeAt.setValue(
        user,
      )

      const { keyword: searchByColumnKeywordValue } =
        await extendedFilterTestUtils.searchByColumn.setKeywordValue(user)

      await extendedFilterTestUtils.searchByColumn.setColumnValue(
        user,
        searchFieldDict.searchByName,
      )

      const workGroupField = await extendedFilterTestUtils.workGroup.expectLoadingFinished()
      await extendedFilterTestUtils.workGroup.openField(user, workGroupField)
      await extendedFilterTestUtils.workGroup.setValue(user, workGroupListItem.name)

      await extendedFilterTestUtils.manager.openField(user)
      await extendedFilterTestUtils.manager.setValue(user, userListItem.fullName)

      await extendedFilterTestUtils.closeFilter(user)
      await waitFor(() => {
        expect(filter).not.toBeInTheDocument()
      })

      await testUtils.clickExtendedFilterButton(user)
      await extendedFilterTestUtils.findContainer()
      await extendedFilterTestUtils.workGroup.expectLoadingFinished()
      await extendedFilterTestUtils.manager.expectLoadingFinished()

      expect(extendedFilterTestUtils.status.getField(taskExtendedStatusDict.NEW!)).not.toBeChecked()

      expect(extendedFilterTestUtils.assigned.getField(taskAssignedDict.True)).not.toBeChecked()

      expect(extendedFilterTestUtils.overdue.getField(taskOverdueDict.False)).not.toBeChecked()

      expect(extendedFilterTestUtils.completeAt.getStartDateField()).not.toHaveDisplayValue(
        startDateValue,
      )

      expect(extendedFilterTestUtils.completeAt.getEndDateField()).not.toHaveDisplayValue(
        endDateValue,
      )

      expect(extendedFilterTestUtils.searchByColumn.getKeywordField()).not.toHaveDisplayValue(
        searchByColumnKeywordValue,
      )

      expect(
        extendedFilterTestUtils.searchByColumn.getColumnField(searchFieldDict.searchByName),
      ).not.toBeChecked()

      expect(
        selectTestUtils.getSelectedOption(extendedFilterTestUtils.workGroup.getField()),
      ).not.toBeInTheDocument()

      expect(extendedFilterTestUtils.manager.getSelected()).not.toBeInTheDocument()
    })

    describe('Имеет корректные значения по умолчанию', () => {
      test('Фильтры которые отображаются для любой роли', async () => {
        mockGetUserListSuccess()
        mockGetWorkGroupListSuccess()
        mockGetTaskCountersSuccess()
        mockGetTaskListSuccess()
        mockGetCustomerListSuccess()
        mockGetMacroregionListSuccess()
        mockGetSupportGroupListSuccess()

        const { user } = render(<TaskListPage />)

        await taskTableTestUtils.expectLoadingFinished()
        await testUtils.clickExtendedFilterButton(user)
        await extendedFilterTestUtils.findContainer()

        extendedFilterTestUtils.status.expectHasCorrectInitialValues()
        extendedFilterTestUtils.assigned.expectHasCorrectInitialValues()
        extendedFilterTestUtils.overdue.expectHasCorrectInitialValues()
        extendedFilterTestUtils.completeAt.expectHasCorrectInitialValues()
        extendedFilterTestUtils.searchByColumn.expectHasCorrectInitialValues()
        expect(extendedFilterTestUtils.manager.getSelected()).not.toBeInTheDocument()
      })

      test('Фильтр по рабочей группе', async () => {
        mockGetUserListSuccess()
        mockGetTaskListSuccess()
        mockGetTaskCountersSuccess()
        mockGetCustomerListSuccess()
        mockGetMacroregionListSuccess()
        mockGetSupportGroupListSuccess()
        mockGetWorkGroupListSuccess({
          body: workGroupFixtures.workGroupList(),
        })

        const { user } = render(<TaskListPage />, {
          store: getStoreWithAuth({
            userRole: UserRoleEnum.SeniorEngineer,
          }),
        })

        await taskTableTestUtils.expectLoadingFinished()
        await testUtils.clickExtendedFilterButton(user)
        await extendedFilterTestUtils.findContainer()

        const workGroupField = await extendedFilterTestUtils.workGroup.expectLoadingFinished()

        const selectedOption = selectTestUtils.getSelectedOption(workGroupField)

        expect(selectedOption).not.toBeInTheDocument()
      })
    })
  })

  describe('Сохраненные фильтры', () => {
    test('Не отображаются если их нет', () => {
      mockGetTaskListSuccess()
      mockGetTaskCountersSuccess()

      render(<TaskListPage />)

      const filters = tasksFiltersStorageTestUtils.queryContainer()
      expect(filters).not.toBeInTheDocument()
    })

    test('Отображаются если есть', async () => {
      mockGetTaskListSuccess()
      mockGetTaskCountersSuccess()

      const savedTasksFilters: TasksFiltersStorageType = {
        customers: [fakeId()],
        macroregions: [fakeId()],
        supportGroups: [fakeId()],
      }
      taskLocalStorageService.setTasksFilters(savedTasksFilters)

      render(<TaskListPage />)

      Object.keys(savedTasksFilters).forEach((filterName) => {
        const customersFilter = tasksFiltersStorageTestUtils.getFilter(
          filterName as keyof typeof savedTasksFilters,
        )
        expect(customersFilter).toBeInTheDocument()
      })
    })

    test('После удаления перезапрашиваются заявки и счетчик заявок', async () => {
      mockGetTaskListSuccess({ once: false })
      mockGetTaskCountersSuccess({ once: false })

      taskLocalStorageService.setTasksFilters({ customers: [fakeId()] })

      const { user } = render(<TaskListPage />, { store: getStoreWithAuth() })

      await fastFilterListTestUtils.expectLoadingFinished()
      await taskTableTestUtils.expectLoadingFinished()

      const filter = tasksFiltersStorageTestUtils.getFilter('customers')
      expect(filter).toBeInTheDocument()

      await tasksFiltersStorageTestUtils.removeFilter(user, 'customers')
      expect(filter).not.toBeInTheDocument()

      await fastFilterListTestUtils.expectLoadingStarted()
      await taskTableTestUtils.expectLoadingStarted()
      await fastFilterListTestUtils.expectLoadingFinished()
      await taskTableTestUtils.expectLoadingFinished()
    })
  })

  describe('Поиск заявки по номеру', () => {
    test('Поле поиска отображается корректно', async () => {
      mockGetTaskListSuccess()
      mockGetTaskCountersSuccess()

      render(<TaskListPage />)

      await taskTableTestUtils.expectLoadingStarted()
      await taskTableTestUtils.expectLoadingFinished()
      const searchInput = testUtils.getSearchInput()

      expect(searchInput).toBeInTheDocument()
      expect(searchInput).toBeEnabled()
      expect(searchInput).not.toHaveValue()
    })

    test('Можно ввести значение', async () => {
      mockGetTaskListSuccess()
      mockGetTaskCountersSuccess()

      const { user } = render(<TaskListPage />)

      await taskTableTestUtils.expectLoadingStarted()
      await taskTableTestUtils.expectLoadingFinished()
      const value = fakeWord()
      const input = await testUtils.setSearchValue(user, value)

      expect(input).toHaveValue(value)
    })

    test('Поле не активно во время загрузки заявок', async () => {
      mockGetTaskCountersSuccess()
      mockGetTaskListSuccess()

      render(<TaskListPage />, { store: getStoreWithAuth() })

      await waitFor(() => expect(testUtils.getSearchInput()).toBeDisabled())
      await taskTableTestUtils.expectLoadingFinished()
      await waitFor(() => expect(testUtils.getSearchInput()).toBeEnabled())
    })

    describe('После применения', () => {
      test('Карточка заявки закрывается', async () => {
        mockGetWorkGroupListSuccess()
        mockGetTaskCountersSuccess()

        const taskListItem = taskFixtures.taskListItem()
        mockGetTaskListSuccess({
          body: taskFixtures.taskListResponse([taskListItem]),
          once: false,
        })
        mockGetTaskSuccess(taskListItem.id)

        const { user } = render(<TaskListPage />, {
          store: getStoreWithAuth(),
        })

        await taskTableTestUtils.expectLoadingStarted()
        await taskTableTestUtils.expectLoadingFinished()
        await taskTableTestUtils.clickRow(user, taskListItem.id)
        const taskCard = await taskCardTestUtils.findContainer()
        await testUtils.setSearchValue(user, fakeWord(), true)
        await waitFor(() => {
          expect(taskCard).not.toBeInTheDocument()
        })
      })

      describe('Отправляется запрос', () => {
        /* не работает по какой-то причине */
        test.skip('При нажатии на кнопку поиска', async () => {
          mockGetTaskCountersSuccess()
          mockGetTaskListSuccess({ once: false })

          const { user } = render(<TaskListPage />, {
            store: getStoreWithAuth(),
          })

          await taskTableTestUtils.expectLoadingStarted()
          await taskTableTestUtils.expectLoadingFinished()
          await testUtils.setSearchValue(user, fakeWord())
          const button = testUtils.getSearchButton()
          expect(button).toBeEnabled()
          await user.click(button)
          await taskTableTestUtils.expectLoadingStarted()
        })

        test('При нажатии клавиши "Enter"', async () => {
          mockGetTaskCountersSuccess()
          mockGetTaskListSuccess({ once: false })

          const { user } = render(<TaskListPage />, {
            store: getStoreWithAuth(),
          })

          await taskTableTestUtils.expectLoadingFinished()
          await testUtils.setSearchValue(user, fakeWord(), true)
          await taskTableTestUtils.expectLoadingStarted()
        })
      })

      test('Кнопка открытия расширенного фильтра недоступна', async () => {
        const { user } = render(<TaskListPage />)

        await testUtils.setSearchValue(user, fakeWord(), true)

        const extendedFilterButton = testUtils.getExtendedFilterButton()

        await waitFor(() => {
          expect(extendedFilterButton).toBeDisabled()
        })
      })

      test('Быстрый фильтр перестаёт быть выбранным', async () => {
        mockGetTaskListSuccess()
        mockGetTaskCountersSuccess()

        const { user } = render(<TaskListPage />, { store: getStoreWithAuth() })

        await taskTableTestUtils.expectLoadingFinished()
        await fastFilterListTestUtils.expectLoadingFinished()
        const fastFilter = fastFilterListTestUtils.getCheckableTag(FastFilterEnum.FirstLine)
        fastFilterListTestUtils.expectFilterChecked(fastFilter)
        await testUtils.setSearchValue(user, fakeWord(), true)

        await waitFor(() => {
          fastFilterListTestUtils.expectFilterNotChecked(fastFilter)
        })
      })
    })

    describe('Очищение поля через клавиатуру', () => {
      test('Применяет быстрый фильтр если он был применён ранее', async () => {
        mockGetTaskListSuccess({ once: false })
        mockGetTaskCountersSuccess()

        const { user } = render(<TaskListPage />, { store: getStoreWithAuth() })

        await taskTableTestUtils.expectLoadingFinished()
        await fastFilterListTestUtils.expectLoadingFinished()

        const input = await testUtils.setSearchValue(user, fakeWord({ length: 1 }), true)

        const fastFilter = fastFilterListTestUtils.getCheckableTag(FastFilterEnum.FirstLine)

        await waitFor(() => fastFilterListTestUtils.expectFilterNotChecked(fastFilter))
        await waitFor(() => expect(input).toBeEnabled())
        await user.clear(input)

        await waitFor(() => {
          fastFilterListTestUtils.expectFilterChecked(fastFilter)
        })
      })

      test('Делает кнопку открытия расширенного фильтра активной', async () => {
        mockGetTaskListSuccess({ once: false })
        mockGetTaskCountersSuccess()

        const { user } = render(<TaskListPage />)

        await taskTableTestUtils.expectLoadingStarted()
        await taskTableTestUtils.expectLoadingFinished()
        const button = testUtils.getExtendedFilterButton()
        expect(button).toBeEnabled()

        const input = await testUtils.setSearchValue(user, fakeWord(), true)
        await waitFor(() => expect(button).toBeDisabled())
        await waitFor(() => expect(input).toBeEnabled())

        await user.clear(input)

        await waitFor(() => {
          expect(button).toBeEnabled()
        })
      })

      test('Применяет расширенный фильтр если он был применён ранее', async () => {
        const workGroupListItem = workGroupFixtures.workGroupListItem()
        mockGetWorkGroupListSuccess({ body: [workGroupListItem], once: false })
        mockGetTaskCountersSuccess()
        mockGetTaskListSuccess({ once: false })
        mockGetCustomerListSuccess({ once: false })
        mockGetSupportGroupListSuccess({ once: false })
        mockGetMacroregionListSuccess({ once: false })

        const userListItem = userFixtures.userListItem()
        mockGetUserListSuccess({ body: [userListItem], once: false })

        const { user } = render(<TaskListPage />, {
          store: getStoreWithAuth({ userRole: UserRoleEnum.SeniorEngineer }),
        })

        await taskTableTestUtils.expectLoadingStarted()
        await taskTableTestUtils.expectLoadingFinished()
        await testUtils.clickExtendedFilterButton(user)
        await extendedFilterTestUtils.findContainer()
        await extendedFilterTestUtils.workGroup.expectLoadingFinished()
        await extendedFilterTestUtils.manager.expectLoadingFinished()

        await extendedFilterTestUtils.status.setValue(user, taskExtendedStatusDict.NEW!)

        await extendedFilterTestUtils.assigned.setValue(user, taskAssignedDict.True)

        await extendedFilterTestUtils.overdue.setValue(user, taskOverdueDict.False)

        const { startDateValue, endDateValue } = await extendedFilterTestUtils.completeAt.setValue(
          user,
        )

        const { keyword: searchByColumnKeywordValue } =
          await extendedFilterTestUtils.searchByColumn.setKeywordValue(user)

        await extendedFilterTestUtils.searchByColumn.setColumnValue(
          user,
          searchFieldDict.searchByName,
        )

        const workGroupField = await extendedFilterTestUtils.workGroup.expectLoadingFinished()
        await extendedFilterTestUtils.workGroup.openField(user, workGroupField)
        await extendedFilterTestUtils.workGroup.setValue(user, workGroupListItem.name)

        await extendedFilterTestUtils.manager.openField(user)
        await extendedFilterTestUtils.manager.setValue(user, userListItem.fullName)

        await extendedFilterTestUtils.clickApplyButton(user)
        await taskTableTestUtils.expectLoadingFinished()

        const searchInput = await testUtils.setSearchValue(user, fakeWord({ length: 1 }), true)
        await taskTableTestUtils.expectLoadingFinished()
        await user.clear(searchInput)
        await taskTableTestUtils.expectLoadingFinished()

        await testUtils.clickExtendedFilterButton(user)
        await extendedFilterTestUtils.findContainer()
        await extendedFilterTestUtils.workGroup.expectLoadingFinished()
        await extendedFilterTestUtils.manager.expectLoadingFinished()

        const statusField = extendedFilterTestUtils.status.getField(taskExtendedStatusDict.NEW!)
        await waitFor(() => {
          expect(statusField).toBeChecked()
        })

        expect(extendedFilterTestUtils.assigned.getField(taskAssignedDict.True)).toBeChecked()

        expect(extendedFilterTestUtils.overdue.getField(taskOverdueDict.False)).toBeChecked()

        const startDateField = extendedFilterTestUtils.completeAt.getStartDateField()
        await waitFor(() => {
          expect(startDateField).toHaveDisplayValue(startDateValue)
        })

        expect(extendedFilterTestUtils.completeAt.getEndDateField()).toHaveDisplayValue(
          endDateValue,
        )

        expect(extendedFilterTestUtils.searchByColumn.getKeywordField()).toHaveDisplayValue(
          searchByColumnKeywordValue,
        )

        expect(
          extendedFilterTestUtils.searchByColumn.getColumnField(searchFieldDict.searchByName),
        ).toBeChecked()

        expect(
          selectTestUtils.getSelectedOption(extendedFilterTestUtils.workGroup.getField()),
        ).toHaveTextContent(workGroupListItem.name)

        expect(extendedFilterTestUtils.manager.getSelected()).toHaveTextContent(
          userListItem.fullName,
        )
      })
    })

    describe('Сброс значения через кнопку', () => {
      test('Очищает поле ввода', async () => {
        const { user } = render(<TaskListPage />)

        const input = await testUtils.setSearchValue(user, fakeWord())
        await testUtils.clickSearchClearButton(user)

        expect(input).not.toHaveValue()
      })

      test('Применяет быстрый фильтр если он был применён ранее', async () => {
        mockGetTaskListSuccess()
        mockGetTaskCountersSuccess({ body: taskFixtures.taskCounters() })

        const { user } = render(<TaskListPage />, { store: getStoreWithAuth() })

        await taskTableTestUtils.expectLoadingFinished()
        await fastFilterListTestUtils.expectLoadingFinished()
        await testUtils.setSearchValue(user, fakeWord(), true)
        const fastFilter = fastFilterListTestUtils.getCheckableTag(FastFilterEnum.FirstLine)
        await waitFor(() => {
          fastFilterListTestUtils.expectFilterNotChecked(fastFilter)
        })

        await testUtils.clickSearchClearButton(user)
        await waitFor(() => {
          fastFilterListTestUtils.expectFilterChecked(fastFilter)
        })
      })

      test('Делает кнопку открытия расширенного фильтра активной', async () => {
        mockGetTaskListSuccess({ once: false })
        mockGetTaskCountersSuccess()

        const { user } = render(<TaskListPage />)

        await taskTableTestUtils.expectLoadingFinished()
        const extendedFilterButton = testUtils.getExtendedFilterButton()
        await waitFor(() => expect(extendedFilterButton).toBeEnabled())

        await testUtils.setSearchValue(user, fakeWord(), true)
        await waitFor(() => {
          expect(extendedFilterButton).toBeDisabled()
        })

        await testUtils.clickSearchClearButton(user)
        await waitFor(() => {
          expect(extendedFilterButton).toBeEnabled()
        })
      })

      test('Применяет расширенный фильтр если он был применён ранее', async () => {
        const workGroupListItem = workGroupFixtures.workGroupListItem()
        mockGetWorkGroupListSuccess({ body: [workGroupListItem], once: false })
        mockGetTaskCountersSuccess()
        mockGetTaskListSuccess({ once: false })
        mockGetCustomerListSuccess({ once: false })
        mockGetMacroregionListSuccess({ once: false })
        mockGetSupportGroupListSuccess({ once: false })

        const userListItem = userFixtures.userListItem()
        mockGetUserListSuccess({ body: [userListItem], once: false })

        const { user } = render(<TaskListPage />, {
          store: getStoreWithAuth({ userRole: UserRoleEnum.SeniorEngineer }),
        })

        await taskTableTestUtils.expectLoadingStarted()
        await taskTableTestUtils.expectLoadingFinished()
        await testUtils.clickExtendedFilterButton(user)
        await extendedFilterTestUtils.findContainer()
        await extendedFilterTestUtils.workGroup.expectLoadingFinished()
        await extendedFilterTestUtils.manager.expectLoadingFinished()

        await extendedFilterTestUtils.status.setValue(user, taskExtendedStatusDict.NEW!)

        await extendedFilterTestUtils.assigned.setValue(user, taskAssignedDict.True)

        await extendedFilterTestUtils.overdue.setValue(user, taskOverdueDict.False)

        const { startDateValue, endDateValue } = await extendedFilterTestUtils.completeAt.setValue(
          user,
        )

        const { keyword: searchByColumnKeywordValue } =
          await extendedFilterTestUtils.searchByColumn.setKeywordValue(user)

        await extendedFilterTestUtils.searchByColumn.setColumnValue(
          user,
          searchFieldDict.searchByName,
        )

        const workGroupField = await extendedFilterTestUtils.workGroup.expectLoadingFinished()

        await extendedFilterTestUtils.workGroup.openField(user, workGroupField)
        await extendedFilterTestUtils.workGroup.setValue(user, workGroupListItem.name)

        await extendedFilterTestUtils.manager.openField(user)
        await extendedFilterTestUtils.manager.setValue(user, userListItem.fullName)

        await extendedFilterTestUtils.clickApplyButton(user)
        await taskTableTestUtils.expectLoadingFinished()

        await testUtils.setSearchValue(user, fakeWord(), true)
        await taskTableTestUtils.expectLoadingFinished()
        await testUtils.clickSearchClearButton(user)
        await taskTableTestUtils.expectLoadingFinished()

        expect(testUtils.getExtendedFilterButton()).toBeEnabled()
        /* по какой-то причине тест проходит только с двойным кликом */
        await testUtils.clickExtendedFilterButton(user)
        await testUtils.clickExtendedFilterButton(user)
        await extendedFilterTestUtils.findContainer()
        await extendedFilterTestUtils.workGroup.expectLoadingFinished()
        await extendedFilterTestUtils.manager.expectLoadingFinished()

        const statusField = extendedFilterTestUtils.status.getField(taskExtendedStatusDict.NEW!)
        await waitFor(() => expect(statusField).toBeChecked())

        expect(extendedFilterTestUtils.assigned.getField(taskAssignedDict.True)).toBeChecked()

        expect(extendedFilterTestUtils.overdue.getField(taskOverdueDict.False)).toBeChecked()

        const startDateField = extendedFilterTestUtils.completeAt.getStartDateField()
        await waitFor(() => expect(startDateField).toHaveDisplayValue(startDateValue))

        expect(extendedFilterTestUtils.completeAt.getEndDateField()).toHaveDisplayValue(
          endDateValue,
        )

        expect(extendedFilterTestUtils.searchByColumn.getKeywordField()).toHaveDisplayValue(
          searchByColumnKeywordValue,
        )

        expect(
          extendedFilterTestUtils.searchByColumn.getColumnField(searchFieldDict.searchByName),
        ).toBeChecked()

        expect(
          selectTestUtils.getSelectedOption(extendedFilterTestUtils.workGroup.getField()),
        ).toHaveTextContent(workGroupListItem.name)

        expect(extendedFilterTestUtils.manager.getSelected()).toHaveTextContent(
          userListItem.fullName,
        )
      })
    })
  })

  describe('Кнопка обновления заявок', () => {
    test('Отображается корректно', async () => {
      mockGetTaskListSuccess()
      mockGetTaskCountersSuccess()

      render(<TaskListPage />)

      await taskTableTestUtils.expectLoadingFinished()
      const button = testUtils.getUpdateTasksButton()

      expect(button).toBeInTheDocument()
      await waitFor(() => expect(button).toBeEnabled())
    })

    test('Перезагружает заявки', async () => {
      mockGetTaskCountersSuccess({ once: false })
      mockGetTaskListSuccess({ once: false })

      const { user } = render(<TaskListPage />, {
        store: getStoreWithAuth(),
      })

      await taskTableTestUtils.expectLoadingFinished()
      await testUtils.clickUpdateTasksButton(user)
      await taskTableTestUtils.expectLoadingStarted()
    })

    test('Перезагружает количество заявок для быстрых фильтров', async () => {
      mockGetTaskCountersSuccess({ once: false })
      mockGetTaskListSuccess({ once: false })

      const { user } = render(<TaskListPage />, {
        store: getStoreWithAuth(),
      })

      await taskTableTestUtils.expectLoadingFinished()
      await fastFilterListTestUtils.expectLoadingFinished()
      await testUtils.clickUpdateTasksButton(user)
      await fastFilterListTestUtils.expectLoadingStarted()
    })

    test('Закрывает карточку заявки', async () => {
      mockGetWorkGroupListSuccess()
      mockGetTaskCountersSuccess({ once: false })

      const taskListItem = taskFixtures.taskListItem()
      mockGetTaskListSuccess({
        body: taskFixtures.taskListResponse([taskListItem]),
        once: false,
      })
      mockGetTaskSuccess(taskListItem.id)

      const { user } = render(<TaskListPage />, { store: getStoreWithAuth() })

      await taskTableTestUtils.expectLoadingStarted()
      await taskTableTestUtils.expectLoadingFinished()
      await taskTableTestUtils.clickRow(user, taskListItem.id)
      const taskCard = await taskCardTestUtils.findContainer()
      await testUtils.clickUpdateTasksButton(user)

      await waitFor(() => expect(taskCard).not.toBeInTheDocument())
    })

    test('Не активна во время загрузки заявок', async () => {
      mockGetTaskCountersSuccess()
      mockGetTaskListSuccess()

      render(<TaskListPage />, { store: getStoreWithAuth() })

      await waitFor(() => expect(testUtils.getUpdateTasksButton()).toBeDisabled())
      await taskTableTestUtils.expectLoadingFinished()
      await waitFor(() => expect(testUtils.getUpdateTasksButton()).toBeEnabled())
    })

    test('Автообновление работает', async () => {
      mockGetTaskCountersSuccess({ once: false })
      mockGetTaskListSuccess({ once: false })

      const { user } = render(<TaskListPage />, { store: getStoreWithAuth() })

      await fastFilterListTestUtils.expectLoadingFinished()
      await taskTableTestUtils.expectLoadingFinished()
      await updateTasksButtonTestUtils.openDropdown(user, testUtils.getContainer())
      await updateTasksButtonTestUtils.clickAutoUpdateItem(user)
      await fastFilterListTestUtils.expectLoadingStarted()
      await taskTableTestUtils.expectLoadingStarted()
    })
  })

  describe('Кнопка создания заявки', () => {
    test('Отображается корректно', () => {
      mockGetTaskCountersSuccess()
      mockGetTaskListSuccess()

      render(<TaskListPage />)

      const button = testUtils.getCreateTaskButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })
  })

  describe('Таблица заявок', () => {
    test('Отображается корректно', async () => {
      const taskList = taskFixtures.taskList(2)

      mockGetTaskCountersSuccess()
      mockGetTaskListSuccess({
        body: taskFixtures.taskListResponse(taskList),
      })

      render(<TaskListPage />, { store: getStoreWithAuth() })

      await taskTableTestUtils.expectLoadingStarted()
      const taskTable = await taskTableTestUtils.expectLoadingFinished()

      expect(taskTable).toBeInTheDocument()
      taskList.forEach((item) => {
        const row = taskTableTestUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })

    describe('При клике на строку', () => {
      test('Ей добавляется новый класс', async () => {
        mockGetTaskCountersSuccess()
        mockGetWorkGroupListSuccess()

        const taskListItem = taskFixtures.taskListItem()
        mockGetTaskListSuccess({
          body: taskFixtures.taskListResponse([taskListItem]),
        })
        mockGetTaskSuccess(taskListItem.id)

        const { user } = render(<TaskListPage />, { store: getStoreWithAuth() })

        await taskTableTestUtils.expectLoadingStarted()
        await taskTableTestUtils.expectLoadingFinished()
        const row = await taskTableTestUtils.clickRow(user, taskListItem.id)

        await waitFor(() => {
          expect(row).toHaveClass('table-row--selected')
        })
      })

      test('Открывается карточка заявки', async () => {
        mockGetTaskCountersSuccess()
        mockGetWorkGroupListSuccess()

        const taskListItem = taskFixtures.taskListItem()
        mockGetTaskListSuccess({
          body: taskFixtures.taskListResponse([taskListItem]),
        })
        mockGetTaskSuccess(taskListItem.id)

        const { user } = render(<TaskListPage />, { store: getStoreWithAuth() })

        await taskTableTestUtils.expectLoadingStarted()
        await taskTableTestUtils.expectLoadingFinished()
        await taskTableTestUtils.clickRow(user, taskListItem.id)

        const taskCard = await taskCardTestUtils.findContainer()
        expect(taskCard).toBeInTheDocument()
      })
    })

    describe('Колонка', () => {
      describe('Заявка', () => {
        test('После сортировки список отображается корректно', async () => {
          mockGetTaskCountersSuccess()

          const taskList = taskFixtures.taskList()
          mockGetTaskListSuccess({
            once: false,
            body: taskFixtures.taskListResponse(taskList),
          })

          const { user } = render(<TaskListPage />, {
            store: getStoreWithAuth(),
          })

          await taskTableTestUtils.expectLoadingStarted()
          await taskTableTestUtils.expectLoadingFinished()
          await taskTableTestUtils.clickColTitle(user, 'Заявка')
          await taskTableTestUtils.expectLoadingStarted()
          await taskTableTestUtils.expectLoadingFinished()

          taskList.forEach((item) => {
            const row = taskTableTestUtils.getRow(item.id)
            expect(row).toBeInTheDocument()
          })
        })
      })

      describe('Внешний номер', () => {
        test('После сортировки список отображается корректно', async () => {
          mockGetTaskCountersSuccess()

          const taskList = taskFixtures.taskList()
          mockGetTaskListSuccess({
            once: false,
            body: taskFixtures.taskListResponse(taskList),
          })

          const { user } = render(<TaskListPage />, {
            store: getStoreWithAuth(),
          })

          await taskTableTestUtils.expectLoadingStarted()
          await taskTableTestUtils.expectLoadingFinished()
          await taskTableTestUtils.clickColTitle(user, 'Внеш.номер')
          await taskTableTestUtils.expectLoadingStarted()
          await taskTableTestUtils.expectLoadingFinished()

          taskList.forEach((item) => {
            const row = taskTableTestUtils.getRow(item.id)
            expect(row).toBeInTheDocument()
          })
        })
      })

      describe('Объект', () => {
        test('После сортировки список отображается корректно', async () => {
          mockGetTaskCountersSuccess()

          const taskList = taskFixtures.taskList()
          mockGetTaskListSuccess({
            once: false,
            body: taskFixtures.taskListResponse(taskList),
          })

          const { user } = render(<TaskListPage />, {
            store: getStoreWithAuth(),
          })

          await taskTableTestUtils.expectLoadingStarted()
          await taskTableTestUtils.expectLoadingFinished()
          await taskTableTestUtils.clickColTitle(user, 'Объект')
          await taskTableTestUtils.expectLoadingStarted()
          await taskTableTestUtils.expectLoadingFinished()

          taskList.forEach((item) => {
            const row = taskTableTestUtils.getRow(item.id)
            expect(row).toBeInTheDocument()
          })
        })
      })

      describe('Тема', () => {
        test('После сортировки список отображается корректно', async () => {
          mockGetTaskCountersSuccess()

          const taskList = taskFixtures.taskList()
          mockGetTaskListSuccess({
            once: false,
            body: taskFixtures.taskListResponse(taskList),
          })

          const { user } = render(<TaskListPage />, {
            store: getStoreWithAuth(),
          })

          await taskTableTestUtils.expectLoadingStarted()
          await taskTableTestUtils.expectLoadingFinished()
          await taskTableTestUtils.clickColTitle(user, 'Тема')
          await taskTableTestUtils.expectLoadingStarted()
          await taskTableTestUtils.expectLoadingFinished()

          taskList.forEach((item) => {
            const row = taskTableTestUtils.getRow(item.id)
            expect(row).toBeInTheDocument()
          })
        })
      })

      describe('Исполнитель', () => {
        test('После сортировки список отображается корректно', async () => {
          mockGetTaskCountersSuccess()

          const taskList = taskFixtures.taskList()
          mockGetTaskListSuccess({
            once: false,
            body: taskFixtures.taskListResponse(taskList),
          })

          const { user } = render(<TaskListPage />, {
            store: getStoreWithAuth(),
          })

          await taskTableTestUtils.expectLoadingStarted()
          await taskTableTestUtils.expectLoadingFinished()
          await taskTableTestUtils.clickColTitle(user, 'Исполнитель')
          await taskTableTestUtils.expectLoadingStarted()
          await taskTableTestUtils.expectLoadingFinished()

          taskList.forEach((item) => {
            const row = taskTableTestUtils.getRow(item.id)
            expect(row).toBeInTheDocument()
          })
        })
      })

      describe('Рабочая группа', () => {
        describe(`Роль - ${UserRoleEnum.FirstLineSupport}`, () => {
          test('Не отображается', async () => {
            mockGetTaskCountersSuccess()

            const taskList = taskFixtures.taskList()
            mockGetTaskListSuccess({
              once: false,
              body: taskFixtures.taskListResponse(taskList),
            })

            render(<TaskListPage />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.FirstLineSupport,
              }),
            })

            await taskTableTestUtils.expectLoadingStarted()
            await taskTableTestUtils.expectLoadingFinished()

            expect(taskTableTestUtils.queryColTitle('Рабочая группа')).not.toBeInTheDocument()
          })
        })

        describe(`Роль - ${UserRoleEnum.Engineer}`, () => {
          test('После сортировки список отображается корректно', async () => {
            mockGetTaskCountersSuccess()

            const taskList = taskFixtures.taskList()
            mockGetTaskListSuccess({
              once: false,
              body: taskFixtures.taskListResponse(taskList),
            })

            const { user } = render(<TaskListPage />, {
              store: getStoreWithAuth({ userRole: UserRoleEnum.Engineer }),
            })

            await taskTableTestUtils.expectLoadingStarted()
            await taskTableTestUtils.expectLoadingFinished()
            await taskTableTestUtils.clickColTitle(user, 'Рабочая группа')
            await taskTableTestUtils.expectLoadingStarted()
            await taskTableTestUtils.expectLoadingFinished()

            taskList.forEach((item) => {
              const row = taskTableTestUtils.getRow(item.id)
              expect(row).toBeInTheDocument()
            })
          })
        })

        describe(`Роль - ${UserRoleEnum.SeniorEngineer}`, () => {
          test('После сортировки список отображается корректно', async () => {
            mockGetTaskCountersSuccess()

            const taskList = taskFixtures.taskList()
            mockGetTaskListSuccess({
              once: false,
              body: taskFixtures.taskListResponse(taskList),
            })

            const { user } = render(<TaskListPage />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.SeniorEngineer,
              }),
            })

            await taskTableTestUtils.expectLoadingStarted()
            await taskTableTestUtils.expectLoadingFinished()
            await taskTableTestUtils.clickColTitle(user, 'Рабочая группа')
            await taskTableTestUtils.expectLoadingStarted()
            await taskTableTestUtils.expectLoadingFinished()

            taskList.forEach((item) => {
              const row = taskTableTestUtils.getRow(item.id)
              expect(row).toBeInTheDocument()
            })
          })
        })

        describe(`Роль - ${UserRoleEnum.HeadOfDepartment}`, () => {
          test('После сортировки список отображается корректно', async () => {
            mockGetTaskCountersSuccess()

            const taskList = taskFixtures.taskList()
            mockGetTaskListSuccess({
              once: false,
              body: taskFixtures.taskListResponse(taskList),
            })

            const { user } = render(<TaskListPage />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.HeadOfDepartment,
              }),
            })

            await taskTableTestUtils.expectLoadingStarted()
            await taskTableTestUtils.expectLoadingFinished()
            await taskTableTestUtils.clickColTitle(user, 'Рабочая группа')
            await taskTableTestUtils.expectLoadingStarted()
            await taskTableTestUtils.expectLoadingFinished()

            taskList.forEach((item) => {
              const row = taskTableTestUtils.getRow(item.id)
              expect(row).toBeInTheDocument()
            })
          })
        })
      })

      describe('Группа поддержки', () => {
        describe(`Роль - ${UserRoleEnum.FirstLineSupport}`, () => {
          test('После сортировки список отображается корректно', async () => {
            mockGetTaskCountersSuccess()

            const taskList = taskFixtures.taskList()
            mockGetTaskListSuccess({
              once: false,
              body: taskFixtures.taskListResponse(taskList),
            })

            const { user } = render(<TaskListPage />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.FirstLineSupport,
              }),
            })

            await taskTableTestUtils.expectLoadingStarted()
            await taskTableTestUtils.expectLoadingFinished()
            await taskTableTestUtils.clickColTitle(user, 'Группа поддержки')
            await taskTableTestUtils.expectLoadingStarted()
            await taskTableTestUtils.expectLoadingFinished()

            taskList.forEach((item) => {
              const row = taskTableTestUtils.getRow(item.id)
              expect(row).toBeInTheDocument()
            })
          })
        })

        describe(`Роль - ${UserRoleEnum.Engineer}`, () => {
          test('Не отображается', async () => {
            mockGetTaskCountersSuccess()

            const taskList = taskFixtures.taskList()
            mockGetTaskListSuccess({
              once: false,
              body: taskFixtures.taskListResponse(taskList),
            })

            render(<TaskListPage />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.Engineer,
              }),
            })

            await taskTableTestUtils.expectLoadingStarted()
            await taskTableTestUtils.expectLoadingFinished()

            expect(taskTableTestUtils.queryColTitle('Группа поддержки')).not.toBeInTheDocument()
          })
        })

        describe(`Роль - ${UserRoleEnum.SeniorEngineer}`, () => {
          test('Не отображается', async () => {
            mockGetTaskCountersSuccess()

            const taskList = taskFixtures.taskList()
            mockGetTaskListSuccess({
              once: false,
              body: taskFixtures.taskListResponse(taskList),
            })

            render(<TaskListPage />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.SeniorEngineer,
              }),
            })

            await taskTableTestUtils.expectLoadingStarted()
            await taskTableTestUtils.expectLoadingFinished()

            expect(taskTableTestUtils.queryColTitle('Группа поддержки')).not.toBeInTheDocument()
          })
        })

        describe(`Роль - ${UserRoleEnum.HeadOfDepartment}`, () => {
          test('Не отображается', async () => {
            mockGetTaskCountersSuccess()

            const taskList = taskFixtures.taskList()
            mockGetTaskListSuccess({
              once: false,
              body: taskFixtures.taskListResponse(taskList),
            })

            render(<TaskListPage />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.HeadOfDepartment,
              }),
            })

            await taskTableTestUtils.expectLoadingStarted()
            await taskTableTestUtils.expectLoadingFinished()

            expect(taskTableTestUtils.queryColTitle('Группа поддержки')).not.toBeInTheDocument()
          })
        })
      })

      describe('Выполнить до', () => {
        test('После сортировки список отображается корректно', async () => {
          mockGetTaskCountersSuccess()

          const taskList = taskFixtures.taskList()
          mockGetTaskListSuccess({
            once: false,
            body: taskFixtures.taskListResponse(taskList),
          })

          const { user } = render(<TaskListPage />, {
            store: getStoreWithAuth(),
          })

          await taskTableTestUtils.expectLoadingStarted()
          await taskTableTestUtils.expectLoadingFinished()
          await taskTableTestUtils.clickColTitle(user, 'Выполнить до')
          await taskTableTestUtils.expectLoadingStarted()
          await taskTableTestUtils.expectLoadingFinished()

          taskList.forEach((item) => {
            const row = taskTableTestUtils.getRow(item.id)
            expect(row).toBeInTheDocument()
          })
        })

        test('Разделение списка отображается при сортировке по полю', async () => {
          mockGetTaskCountersSuccess()
          const item1 = taskFixtures.taskListItem({
            olaNextBreachTime: moment().subtract(1, 'day').toISOString(),
          })
          const item2 = taskFixtures.taskListItem({ olaNextBreachTime: moment().toISOString() })
          const item3 = taskFixtures.taskListItem({
            olaNextBreachTime: moment().add(1, 'day').toISOString(),
          })
          mockGetTaskListSuccess({
            once: false,
            body: taskFixtures.taskListResponse([item1, item2, item3]),
          })

          render(<TaskListPage />)

          await taskTableTestUtils.expectLoadingFinished()
          const row1 = taskTableTestUtils.getRow(item1.id)
          const row2 = taskTableTestUtils.getRow(item2.id)
          const row3 = taskTableTestUtils.getRow(item3.id)

          expect(row1).toHaveStyle(tableItemBoundaryStyles)
          expect(row2).toHaveStyle(tableItemBoundaryStyles)
          expect(row3).not.toHaveStyle(tableItemBoundaryStyles)
        })

        test('Разделение списка не отображается без сортировки по полю', async () => {
          mockGetTaskCountersSuccess()
          const item1 = taskFixtures.taskListItem({
            olaNextBreachTime: moment().subtract(1, 'day').toISOString(),
          })
          const item2 = taskFixtures.taskListItem({ olaNextBreachTime: moment().toISOString() })
          const item3 = taskFixtures.taskListItem({
            olaNextBreachTime: moment().add(1, 'day').toISOString(),
          })
          mockGetTaskListSuccess({
            once: false,
            body: taskFixtures.taskListResponse([item1, item2, item3]),
          })

          const { user } = render(<TaskListPage />)

          await taskTableTestUtils.expectLoadingFinished()
          await taskTableTestUtils.clickColTitle(user, 'Комментарий')
          await taskTableTestUtils.expectLoadingStarted()
          await taskTableTestUtils.expectLoadingFinished()
          const row1 = taskTableTestUtils.getRow(item1.id)
          const row2 = taskTableTestUtils.getRow(item2.id)
          const row3 = taskTableTestUtils.getRow(item3.id)

          expect(row1).not.toHaveStyle(tableItemBoundaryStyles)
          expect(row2).not.toHaveStyle(tableItemBoundaryStyles)
          expect(row3).not.toHaveStyle(tableItemBoundaryStyles)
        })
      })

      describe('Комментарий', () => {
        test('После сортировки список отображается корректно', async () => {
          mockGetTaskCountersSuccess()

          const taskList = taskFixtures.taskList()
          mockGetTaskListSuccess({
            once: false,
            body: taskFixtures.taskListResponse(taskList),
          })

          const { user } = render(<TaskListPage />, {
            store: getStoreWithAuth(),
          })

          await taskTableTestUtils.expectLoadingStarted()
          await taskTableTestUtils.expectLoadingFinished()
          await taskTableTestUtils.clickColTitle(user, 'Комментарий')
          await taskTableTestUtils.expectLoadingStarted()
          await taskTableTestUtils.expectLoadingFinished()

          taskList.forEach((item) => {
            const row = taskTableTestUtils.getRow(item.id)
            expect(row).toBeInTheDocument()
          })
        })
      })

      describe('Дата создания', () => {
        test('После сортировки список отображается корректно', async () => {
          mockGetTaskCountersSuccess()

          const taskList = taskFixtures.taskList()
          mockGetTaskListSuccess({
            once: false,
            body: taskFixtures.taskListResponse(taskList),
          })

          const { user } = render(<TaskListPage />, {
            store: getStoreWithAuth(),
          })

          await taskTableTestUtils.expectLoadingStarted()
          await taskTableTestUtils.expectLoadingFinished()
          await taskTableTestUtils.clickColTitle(user, 'Дата создания')
          await taskTableTestUtils.expectLoadingStarted()
          await taskTableTestUtils.expectLoadingFinished()

          taskList.forEach((item) => {
            const row = taskTableTestUtils.getRow(item.id)
            expect(row).toBeInTheDocument()
          })
        })
      })
    })

    test('Пагинация работает', async () => {
      mockGetTaskCountersSuccess()

      const taskList = taskFixtures.taskList(DEFAULT_PAGE_SIZE + 1)
      mockGetTaskListSuccess({
        once: false,
        body: taskFixtures.taskListResponse(taskList),
      })

      const { user } = render(<TaskListPage />, {
        store: getStoreWithAuth(),
      })

      await taskTableTestUtils.expectLoadingStarted()
      await taskTableTestUtils.expectLoadingFinished()
      await taskTableTestUtils.clickPaginationNextButton(user)
      await taskTableTestUtils.expectLoadingStarted()
      await taskTableTestUtils.expectLoadingFinished()
    })
  })
})
