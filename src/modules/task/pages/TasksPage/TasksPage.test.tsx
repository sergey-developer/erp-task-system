import { screen, waitFor, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import { camelize } from 'humps'
import moment from 'moment-timezone'

import { testUtils as executeTaskModalTestUtils } from 'modules/task/components/ExecuteTaskModal/ExecuteTaskModal.test'
import { testUtils as fastFilterListTestUtils } from 'modules/task/components/FastFilters/FastFilters.test'
import {
  activeAssignButtonProps,
  activeTakeTaskButtonProps,
  canSelectAssigneeProps,
  testUtils as assigneeBlockTestUtils,
} from 'modules/task/components/TaskDetails/AssigneeBlock/AssigneeBlock.test'
import { testUtils as taskDetailsTestUtils } from 'modules/task/components/TaskDetails/TaskDetails.test'
import {
  canExecuteTaskProps,
  testUtils as taskDetailsTitleTestUtils,
} from 'modules/task/components/TaskDetails/TaskDetailsTitle/TaskDetailsTitle.test'
import {
  activeFirstLineButtonProps,
  activeSecondLineButtonProps,
  showFirstLineButtonProps,
  showSecondLineButtonProps,
  testUtils as workGroupBlockTestUtils,
} from 'modules/task/components/TaskDetails/WorkGroupBlock/WorkGroupBlock.test'
import { testUtils as taskFirstLineModalTestUtils } from 'modules/task/components/TaskFirstLineModal/TaskFirstLineModal.test'
import { testUtils as taskSecondLineModalTestUtils } from 'modules/task/components/TaskSecondLineModal/TaskSecondLineModal.test'
import { testUtils as taskTableTestUtils } from 'modules/task/components/TaskTable/TaskTable.test'
import { testUtils as tasksFilterTestUtils } from 'modules/task/components/TasksFilter/TasksFilter.test'
import {
  searchFieldDict,
  taskAssignedDict,
  taskOverdueDict,
} from 'modules/task/components/TasksFilter/constants'
import { testUtils as tasksFiltersStorageTestUtils } from 'modules/task/components/TasksFiltersStorage/TasksFiltersStorage.test'
import { testUtils as updateTasksButtonTestUtils } from 'modules/task/components/UpdateTasksButton/UpdateTasksButton.test'
import {
  FastFilterEnum,
  TaskActionsPermissionsEnum,
  taskExtendedStatusDict,
  TaskOlaStatusEnum,
} from 'modules/task/constants/task'
import { TaskCountersKeys } from 'modules/task/models'
import {
  taskLocalStorageService,
  TasksFiltersStorageType,
} from 'modules/task/services/taskLocalStorageService/taskLocalStorage.service'
import { UserPermissionsEnum } from 'modules/user/constants'
import { getFullUserName } from 'modules/user/utils'

import commonFixtures from '_tests_/fixtures/common'
import macroregionFixtures from '_tests_/fixtures/macroregion'
import supportGroupFixtures from '_tests_/fixtures/supportGroup'
import taskFixtures from '_tests_/fixtures/task'
import userFixtures from '_tests_/fixtures/user'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import workGroupFixtures from '_tests_/fixtures/workGroup'
import {
  mockDeleteTaskWorkGroupSuccess,
  mockGetCustomerListSuccess,
  mockGetMacroregionsSuccess,
  mockGetSupportGroupListSuccess,
  mockGetTaskCountersSuccess,
  mockGetTasksSuccess,
  mockGetTaskSuccess,
  mockGetUserActionsSuccess,
  mockGetWorkGroupsSuccess,
  mockGetUsersSuccess,
  mockResolveTaskSuccess,
  mockTakeTaskSuccess,
  mockUpdateTaskAssigneeSuccess,
  mockUpdateTaskWorkGroupSuccess,
} from '_tests_/mocks/api'
import { getUserMeQueryMock } from '_tests_/mocks/state/user'
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
import TasksPage from './index'

const getContainer = () => screen.getByTestId('task-list-page')
const findContainer = () => screen.findByTestId('task-list-page')

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
  findContainer,

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
  describe('Быстрый фильтр', () => {
    test('Отображается', async () => {
      mockGetTaskCountersSuccess()
      mockGetTasksSuccess()

      render(<TasksPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      await fastFilterListTestUtils.expectLoadingFinished()
      expect(fastFilterListTestUtils.getContainer()).toBeInTheDocument()
    })

    test('Не активный во время загрузки заявок', async () => {
      mockGetTaskCountersSuccess()
      mockGetTasksSuccess()

      render(<TasksPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      await waitFor(() => fastFilterListTestUtils.expectAllFiltersDisabled())
      await taskTableTestUtils.expectLoadingFinished()
      fastFilterListTestUtils.expectAllFiltersNotDisabled()
    })

    test('Количество заявок отображается корректно', async () => {
      const taskCounters = taskFixtures.taskCounters()
      mockGetTaskCountersSuccess({ body: taskCounters })
      mockGetTasksSuccess()

      render(<TasksPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: {
            ...getUserMeQueryMock(
              userFixtures.user({
                permissions: [
                  UserPermissionsEnum.FirstLineTasksRead,
                  UserPermissionsEnum.SecondLineTasksRead,
                ],
              }),
            ),
          },
        }),
      })

      await fastFilterListTestUtils.expectLoadingFinished()

      Object.values(FastFilterEnum).forEach((filter) => {
        const counterName = camelize(filter.toLowerCase())
        const taskCount = taskCounters[counterName as TaskCountersKeys]

        const counter = fastFilterListTestUtils.getByTextInCheckableTag(filter, taskCount)
        expect(counter).toBeInTheDocument()
      })
    })

    test('Имеет корректное значение по умолчанию', async () => {
      mockGetTaskCountersSuccess()
      mockGetTasksSuccess()

      render(<TasksPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: {
            ...getUserMeQueryMock(
              userFixtures.user({
                permissions: [
                  UserPermissionsEnum.FirstLineTasksRead,
                  UserPermissionsEnum.SecondLineTasksRead,
                ],
              }),
            ),
          },
        }),
      })

      await taskTableTestUtils.expectLoadingFinished()
      await fastFilterListTestUtils.expectLoadingFinished()

      fastFilterListTestUtils.expectFilterChecked(
        fastFilterListTestUtils.getCheckableTag(FastFilterEnum.All),
      )
    })

    test('При смене фильтра отправляется запрос', async () => {
      mockGetTaskCountersSuccess()
      mockGetTasksSuccess({ once: false })

      const { user } = render(<TasksPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      await taskTableTestUtils.expectLoadingFinished()
      await fastFilterListTestUtils.expectLoadingFinished()
      await fastFilterListTestUtils.setFilter(user, FastFilterEnum.Free)
      await taskTableTestUtils.expectLoadingStarted()
    })

    test('Сбрасывает расширенный фильтр', async () => {
      const workGroupListItem = workGroupFixtures.workGroupListItem()
      mockGetWorkGroupsSuccess({ body: [workGroupListItem], once: false })
      mockGetTaskCountersSuccess({ once: false })
      mockGetTasksSuccess({ once: false })
      mockGetCustomerListSuccess({ once: false })
      mockGetSupportGroupListSuccess({ once: false })
      mockGetMacroregionsSuccess({ once: false })

      const userListItem = userFixtures.userListItem()
      mockGetUsersSuccess({ body: [userListItem], once: false })

      const { user } = render(<TasksPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: {
            ...getUserMeQueryMock(
              userFixtures.user({ permissions: [UserPermissionsEnum.SelfWorkGroupsRead] }),
            ),
          },
        }),
      })

      await fastFilterListTestUtils.expectLoadingFinished()
      await taskTableTestUtils.expectLoadingFinished()

      await testUtils.clickExtendedFilterButton(user)
      await tasksFilterTestUtils.findContainer()
      await tasksFilterTestUtils.workGroup.expectLoadingFinished()
      await tasksFilterTestUtils.manager.expectLoadingFinished()

      await tasksFilterTestUtils.status.setValue(user, taskExtendedStatusDict.NEW!)
      await tasksFilterTestUtils.assigned.setValue(user, taskAssignedDict.True)
      await tasksFilterTestUtils.overdue.setValue(user, taskOverdueDict.False)

      const { startDateValue, endDateValue } = await tasksFilterTestUtils.completeAt.setValue(user)

      const { keyword: searchByColumnKeywordValue } =
        await tasksFilterTestUtils.searchByColumn.setKeywordValue(user)

      await tasksFilterTestUtils.searchByColumn.setColumnValue(user, searchFieldDict.searchByName)

      const workGroupField = await tasksFilterTestUtils.workGroup.expectLoadingFinished()
      await tasksFilterTestUtils.workGroup.openField(user, workGroupField)
      await tasksFilterTestUtils.workGroup.setValue(user, workGroupListItem.name)

      await tasksFilterTestUtils.manager.openField(user)
      await tasksFilterTestUtils.manager.setValue(user, userListItem.fullName)

      await tasksFilterTestUtils.clickApplyButton(user)
      await taskTableTestUtils.expectLoadingFinished()

      await fastFilterListTestUtils.expectLoadingFinished()
      await fastFilterListTestUtils.setFilter(user, FastFilterEnum.Free)
      await taskTableTestUtils.expectLoadingStarted()
      await taskTableTestUtils.expectLoadingFinished()

      await testUtils.clickExtendedFilterButton(user)
      await tasksFilterTestUtils.findContainer()
      await tasksFilterTestUtils.workGroup.expectLoadingFinished()
      await tasksFilterTestUtils.manager.expectLoadingFinished()

      await waitFor(() => {
        expect(tasksFilterTestUtils.status.getField(taskExtendedStatusDict.NEW!)).not.toBeChecked()
      })

      expect(tasksFilterTestUtils.assigned.getField(taskAssignedDict.True)).not.toBeChecked()

      expect(tasksFilterTestUtils.overdue.getField(taskOverdueDict.False)).not.toBeChecked()

      expect(tasksFilterTestUtils.completeAt.getStartDateField()).not.toHaveDisplayValue(
        startDateValue,
      )

      expect(tasksFilterTestUtils.completeAt.getEndDateField()).not.toHaveDisplayValue(endDateValue)

      expect(tasksFilterTestUtils.searchByColumn.getKeywordField()).not.toHaveDisplayValue(
        searchByColumnKeywordValue,
      )

      expect(
        tasksFilterTestUtils.searchByColumn.getColumnField(searchFieldDict.searchByName),
      ).not.toBeChecked()

      expect(
        selectTestUtils.getSelectedOption(tasksFilterTestUtils.workGroup.getField()),
      ).not.toBeInTheDocument()

      expect(tasksFilterTestUtils.manager.getSelected()).not.toBeInTheDocument()
    })

    test('Закрывает карточку заявки', async () => {
      mockGetWorkGroupsSuccess()
      mockGetTaskCountersSuccess()

      const taskListItem = taskFixtures.taskListItem()
      mockGetTasksSuccess({
        once: false,
        body: taskFixtures.getTasksResponse([taskListItem]),
      })
      mockGetTaskSuccess(taskListItem.id)

      const { user } = render(<TasksPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      await taskTableTestUtils.expectLoadingStarted()
      await taskTableTestUtils.expectLoadingFinished()
      await fastFilterListTestUtils.expectLoadingFinished()
      await taskTableTestUtils.clickRow(user, taskListItem.id)
      const taskCard = await taskDetailsTestUtils.findContainer()

      await fastFilterListTestUtils.setFilter(user, FastFilterEnum.Free)

      await waitFor(() => {
        expect(taskCard).not.toBeInTheDocument()
      })
    })

    test('Сбрасывает значение поля поиска', async () => {
      mockGetTaskCountersSuccess()
      mockGetTasksSuccess({ once: false })

      const { user } = render(<TasksPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      await taskTableTestUtils.expectLoadingFinished()
      await fastFilterListTestUtils.expectLoadingFinished()

      const searchValue = fakeWord()
      const searchInput = await testUtils.setSearchValue(user, searchValue)

      await fastFilterListTestUtils.setFilter(user, FastFilterEnum.Free)
      await taskTableTestUtils.expectLoadingFinished()

      expect(searchInput).not.toHaveValue()
      expect(searchInput).not.toHaveDisplayValue(searchValue)
    })

    test('Перезапрашивается при выполнении заявки', async () => {
      mockGetTaskCountersSuccess({ once: false })
      mockGetUserActionsSuccess(canExecuteTaskProps.assignee!.id, {
        body: userFixtures.userActions(),
      })

      const taskListItem = taskFixtures.taskListItem()
      mockGetTasksSuccess({
        body: commonFixtures.paginatedListResponse([taskListItem]),
        once: false,
      })

      const task = taskFixtures.task({
        id: taskListItem.id,
        hasRelocationTasks: true,
        ...canExecuteTaskProps,
      })
      mockGetTaskSuccess(task.id, { body: task })
      mockResolveTaskSuccess(task.id)

      const { user } = render(<TasksPage />, {
        store: getStoreWithAuth({ id: canExecuteTaskProps.assignee!.id }, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      await taskTableTestUtils.expectLoadingFinished()
      await fastFilterListTestUtils.expectLoadingFinished()
      await taskTableTestUtils.clickRow(user, task.id)
      await taskDetailsTestUtils.findContainer()
      await taskDetailsTestUtils.expectTaskLoadingFinished()
      await taskDetailsTitleTestUtils.openMenu(user)
      await taskDetailsTitleTestUtils.clickExecuteTaskMenuItem(user)
      await executeTaskModalTestUtils.findContainer()
      await executeTaskModalTestUtils.setUserResolution(user, fakeWord())
      await executeTaskModalTestUtils.setTechResolution(user, fakeWord())
      await executeTaskModalTestUtils.clickSubmitButton(user)
      await executeTaskModalTestUtils.expectLoadingFinished()
      await fastFilterListTestUtils.expectLoadingStarted()
      await fastFilterListTestUtils.expectLoadingFinished()
    })

    test('Перезапрашивается при переводе на 1-ю линию', async () => {
      mockGetTaskCountersSuccess({ once: false })

      const taskListItem = taskFixtures.taskListItem()
      mockGetTasksSuccess({
        body: commonFixtures.paginatedListResponse([taskListItem]),
        once: false,
      })

      const task = taskFixtures.task({
        id: taskListItem.id,
        ...showFirstLineButtonProps,
        ...activeFirstLineButtonProps,
      })
      mockGetTaskSuccess(task.id, { body: task })
      mockDeleteTaskWorkGroupSuccess(task.id)

      const currentUser = userFixtures.user()
      mockGetUserActionsSuccess(currentUser.id, { body: userFixtures.userActions() })

      const { user } = render(<TasksPage />, {
        store: getStoreWithAuth({ id: currentUser.id }, undefined, undefined, {
          queries: { ...getUserMeQueryMock(currentUser) },
        }),
      })

      await taskTableTestUtils.expectLoadingFinished()
      await fastFilterListTestUtils.expectLoadingFinished()
      await taskTableTestUtils.clickRow(user, task.id)
      await taskDetailsTestUtils.findContainer()
      await taskDetailsTestUtils.expectTaskLoadingFinished()

      await workGroupBlockTestUtils.clickFirstLineButton(user)
      await taskFirstLineModalTestUtils.findContainer()
      await taskFirstLineModalTestUtils.setDescription(user, fakeWord())
      await taskFirstLineModalTestUtils.clickSubmitButton(user)

      await fastFilterListTestUtils.expectLoadingStarted()
      await fastFilterListTestUtils.expectLoadingFinished()
    })

    test('Перезапрашивается при переводе на 2-ю линию', async () => {
      mockGetTaskCountersSuccess({ once: false })

      const taskListItem = taskFixtures.taskListItem()
      mockGetTasksSuccess({
        body: commonFixtures.paginatedListResponse([taskListItem]),
        once: false,
      })

      const task = taskFixtures.task({
        id: taskListItem.id,
        ...showSecondLineButtonProps,
        ...activeSecondLineButtonProps,
      })
      mockGetTaskSuccess(task.id, { body: task })

      const workGroup = workGroupFixtures.workGroupListItem()
      mockGetWorkGroupsSuccess({ body: [workGroup], once: false })

      mockUpdateTaskWorkGroupSuccess(task.id)

      const currentUser = userFixtures.user({
        permissions: [UserPermissionsEnum.PutFirstLineTasksOnSecondLine],
      })
      mockGetUserActionsSuccess(currentUser.id, { body: userFixtures.userActions() })

      const { user } = render(<TasksPage />, {
        store: getStoreWithAuth({ id: currentUser.id }, undefined, undefined, {
          queries: { ...getUserMeQueryMock(currentUser) },
        }),
      })

      await taskTableTestUtils.expectLoadingFinished()
      await fastFilterListTestUtils.expectLoadingFinished()
      await taskTableTestUtils.clickRow(user, task.id)
      await taskDetailsTestUtils.findContainer()
      await taskDetailsTestUtils.expectTaskLoadingFinished()

      await workGroupBlockTestUtils.clickSecondLineButton(user)
      await taskSecondLineModalTestUtils.findContainer()
      await taskSecondLineModalTestUtils.expectWorkGroupLoadingFinished()
      await taskSecondLineModalTestUtils.openWorkGroupField(user)
      await taskSecondLineModalTestUtils.selectWorkGroup(user, workGroup.name)
      await taskSecondLineModalTestUtils.setComment(user, fakeWord())
      await taskSecondLineModalTestUtils.clickSubmitButton(user)

      await fastFilterListTestUtils.expectLoadingStarted()
      await fastFilterListTestUtils.expectLoadingFinished()
    })

    test('Перезапрашивается при взятии в работу', async () => {
      mockGetTaskCountersSuccess({ once: false })

      const taskListItem = taskFixtures.taskListItem()
      mockGetTasksSuccess({
        body: commonFixtures.paginatedListResponse([taskListItem]),
        once: false,
      })

      const task = taskFixtures.task({ id: taskListItem.id, ...activeTakeTaskButtonProps })
      mockGetTaskSuccess(task.id, { body: task, once: false })
      mockTakeTaskSuccess(task.id)

      const currentUser = userFixtures.user()
      mockGetUserActionsSuccess(currentUser.id, {
        body: userFixtures.userActions({
          tasks: {
            ...userFixtures.taskActionsPermissions,
            [TaskActionsPermissionsEnum.CanExecute]: [task.id],
          },
        }),
      })

      const { user } = render(<TasksPage />, {
        store: getStoreWithAuth({ id: currentUser.id }, undefined, undefined, {
          queries: { ...getUserMeQueryMock(currentUser) },
        }),
      })

      await taskTableTestUtils.expectLoadingFinished()
      await fastFilterListTestUtils.expectLoadingFinished()
      await taskTableTestUtils.clickRow(user, task.id)
      await taskDetailsTestUtils.findContainer()
      await taskDetailsTestUtils.expectTaskLoadingFinished()

      await assigneeBlockTestUtils.clickTakeTaskButton(user)

      await fastFilterListTestUtils.expectLoadingStarted()
      await fastFilterListTestUtils.expectLoadingFinished()
    })

    test('Перезапрашивается при назначении заявки на себя', async () => {
      mockGetTaskCountersSuccess({ once: false })

      const taskListItem = taskFixtures.taskListItem()
      mockGetTasksSuccess({
        body: commonFixtures.paginatedListResponse([taskListItem]),
        once: false,
      })

      const currentUser = userFixtures.user({
        id: canSelectAssigneeProps.workGroup.seniorEngineer.id,
        permissions: [UserPermissionsEnum.SelfAssigneeTasksUpdate],
      })

      const task = taskFixtures.task({
        id: taskListItem.id,
        status: canSelectAssigneeProps.status,
        extendedStatus: activeAssignButtonProps.extendedStatus,
        assignee: activeAssignButtonProps.assignee,
        workGroup: taskFixtures.workGroup({ id: canSelectAssigneeProps.workGroup.id }),
      })
      mockGetTaskSuccess(task.id, { body: task, once: false })
      mockUpdateTaskAssigneeSuccess(task.id)

      mockGetUserActionsSuccess(currentUser.id, { body: userFixtures.userActions(), once: false })

      const { user } = render(<TasksPage />, {
        store: getStoreWithAuth(currentUser, undefined, undefined, {
          queries: { ...getUserMeQueryMock(currentUser) },
        }),
      })

      await taskTableTestUtils.expectLoadingFinished()
      await fastFilterListTestUtils.expectLoadingFinished()
      await taskTableTestUtils.clickRow(user, task.id)
      await taskDetailsTestUtils.findContainer()
      await taskDetailsTestUtils.expectTaskLoadingFinished()

      await assigneeBlockTestUtils.clickAssignOnMeButton(user)

      await fastFilterListTestUtils.expectLoadingStarted()
      await fastFilterListTestUtils.expectLoadingFinished()
    })

    test('Перезапрашивается при назначении исполнителя', async () => {
      mockGetTaskCountersSuccess({ once: false })

      const taskListItem = taskFixtures.taskListItem()
      mockGetTasksSuccess({
        body: commonFixtures.paginatedListResponse([taskListItem]),
        once: false,
      })

      const task = taskFixtures.task({
        id: taskListItem.id,
        status: canSelectAssigneeProps.status,
        extendedStatus: activeAssignButtonProps.extendedStatus,
        assignee: activeAssignButtonProps.assignee,
        workGroup: canSelectAssigneeProps.workGroup,
      })
      mockGetTaskSuccess(task.id, { body: task, once: false })
      mockUpdateTaskAssigneeSuccess(task.id)

      const currentUser = userFixtures.user({
        id: canSelectAssigneeProps.workGroup.seniorEngineer.id,
        permissions: [UserPermissionsEnum.AnyAssigneeTasksUpdate],
      })

      mockGetUserActionsSuccess(currentUser.id, { body: userFixtures.userActions(), once: false })

      const { user } = render(<TasksPage />, {
        store: getStoreWithAuth(currentUser, undefined, undefined, {
          queries: { ...getUserMeQueryMock(currentUser) },
        }),
      })

      await taskTableTestUtils.expectLoadingFinished()
      await fastFilterListTestUtils.expectLoadingFinished()
      await taskTableTestUtils.clickRow(user, task.id)
      await taskDetailsTestUtils.findContainer()
      await taskDetailsTestUtils.expectTaskLoadingFinished()

      await assigneeBlockTestUtils.findAssigneeSelect()
      await assigneeBlockTestUtils.openAssigneeSelect(user)
      await assigneeBlockTestUtils.selectAssignee(
        user,
        getFullUserName(canSelectAssigneeProps.workGroup.members[0]),
      )
      await assigneeBlockTestUtils.clickAssignButton(user)

      await fastFilterListTestUtils.expectLoadingStarted()
      await fastFilterListTestUtils.expectLoadingFinished()
    })
  })

  describe('Кнопка расширенных фильтров', () => {
    test('Отображается корректно', async () => {
      mockGetTasksSuccess()
      mockGetTaskCountersSuccess()

      render(<TasksPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      await taskTableTestUtils.expectLoadingFinished()
      const button = testUtils.getExtendedFilterButton()

      expect(button).toBeInTheDocument()
      await waitFor(() => expect(button).toBeEnabled())
    })

    test('Открывает расширенный фильтр', async () => {
      mockGetUsersSuccess()
      mockGetTasksSuccess()
      mockGetTaskCountersSuccess()
      mockGetWorkGroupsSuccess()
      mockGetCustomerListSuccess()
      mockGetSupportGroupListSuccess()
      mockGetMacroregionsSuccess()

      const { user } = render(<TasksPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      await taskTableTestUtils.expectLoadingFinished()
      await testUtils.clickExtendedFilterButton(user)
      const filter = await tasksFilterTestUtils.findContainer()

      expect(filter).toBeInTheDocument()
    })

    test('Не активна во время загрузки заявок', async () => {
      mockGetTaskCountersSuccess()
      mockGetTasksSuccess()

      render(<TasksPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      await waitFor(() => expect(testUtils.getExtendedFilterButton()).toBeDisabled())
      await taskTableTestUtils.expectLoadingFinished()
      await waitFor(() => expect(testUtils.getExtendedFilterButton()).toBeEnabled())
    })
  })

  describe('Расширенный фильтр', () => {
    describe('После применения', () => {
      /* не работает по какой-то причине */
      test.skip('Отправляется запрос', async () => {
        mockGetTasksSuccess({ once: false })
        mockGetTaskCountersSuccess()
        mockGetWorkGroupsSuccess()
        mockGetUsersSuccess()
        mockGetCustomerListSuccess()
        mockGetMacroregionsSuccess()
        mockGetSupportGroupListSuccess()

        const { user } = render(<TasksPage />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        })

        await taskTableTestUtils.expectLoadingFinished()
        await testUtils.clickExtendedFilterButton(user)
        await tasksFilterTestUtils.findContainer()
        await tasksFilterTestUtils.clickApplyButton(user)
        await taskTableTestUtils.expectLoadingStarted()
      })

      test('Фильтр закрывается', async () => {
        mockGetTasksSuccess({ once: false })
        mockGetTaskCountersSuccess({ once: false })
        mockGetWorkGroupsSuccess()
        mockGetUsersSuccess()
        mockGetCustomerListSuccess()
        mockGetMacroregionsSuccess()
        mockGetSupportGroupListSuccess()

        const { user } = render(<TasksPage />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        })

        await taskTableTestUtils.expectLoadingFinished()
        await testUtils.clickExtendedFilterButton(user)
        const filter = await tasksFilterTestUtils.findContainer()
        await tasksFilterTestUtils.clickApplyButton(user)

        await waitFor(() => expect(filter).not.toBeInTheDocument())
      })

      test('Карточка заявки закрывается', async () => {
        mockGetWorkGroupsSuccess()
        mockGetTaskCountersSuccess({ once: false })
        mockGetUsersSuccess()
        mockGetCustomerListSuccess()
        mockGetMacroregionsSuccess()
        mockGetSupportGroupListSuccess()

        const currentUser = userFixtures.user()
        mockGetUserActionsSuccess(currentUser.id)

        const taskListItem = taskFixtures.taskListItem()
        mockGetTasksSuccess({
          body: taskFixtures.getTasksResponse([taskListItem]),
          once: false,
        })
        mockGetTaskSuccess(taskListItem.id)

        const { user } = render(<TasksPage />, {
          store: getStoreWithAuth({ id: currentUser.id }, undefined, undefined, {
            queries: { ...getUserMeQueryMock(currentUser) },
          }),
        })

        await taskTableTestUtils.expectLoadingStarted()
        await taskTableTestUtils.expectLoadingFinished()
        await taskTableTestUtils.clickRow(user, taskListItem.id)
        const taskCard = await taskDetailsTestUtils.findContainer()

        await testUtils.clickExtendedFilterButton(user)
        await tasksFilterTestUtils.findContainer()
        await tasksFilterTestUtils.clickApplyButton(user)

        await waitFor(() => expect(taskCard).not.toBeInTheDocument())
      })

      test('Быстрый фильтр сбрасывается', async () => {
        mockGetTasksSuccess({ once: false })
        mockGetTaskCountersSuccess({ once: false })
        mockGetWorkGroupsSuccess()
        mockGetUsersSuccess()
        mockGetCustomerListSuccess()
        mockGetMacroregionsSuccess()
        mockGetSupportGroupListSuccess()

        const { user } = render(<TasksPage />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        })

        await taskTableTestUtils.expectLoadingFinished()
        await fastFilterListTestUtils.expectLoadingFinished()
        const fastFilter = fastFilterListTestUtils.getCheckableTag(FastFilterEnum.All)
        fastFilterListTestUtils.expectFilterChecked(fastFilter)
        await testUtils.clickExtendedFilterButton(user)
        await tasksFilterTestUtils.findContainer()
        await tasksFilterTestUtils.clickApplyButton(user)

        await waitFor(() =>
          fastFilterListTestUtils.expectFilterNotChecked(
            fastFilterListTestUtils.getCheckableTag(FastFilterEnum.All),
          ),
        )
      })

      test('Закрывается нажав кнопку закрытия', async () => {
        mockGetWorkGroupsSuccess()
        mockGetUsersSuccess()
        mockGetTaskCountersSuccess()
        mockGetTasksSuccess()
        mockGetCustomerListSuccess()
        mockGetMacroregionsSuccess()
        mockGetSupportGroupListSuccess()

        const { user } = render(<TasksPage />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        })

        await taskTableTestUtils.expectLoadingFinished()
        await testUtils.clickExtendedFilterButton(user)
        const filter = await tasksFilterTestUtils.findContainer()
        await tasksFilterTestUtils.closeFilter(user)

        await waitFor(() => expect(filter).not.toBeInTheDocument())
      })

      test('Значения сохраняются если другой фильтр не применялся', async () => {
        const workGroupListItem = workGroupFixtures.workGroupListItem()
        mockGetWorkGroupsSuccess({ body: [workGroupListItem], once: false })
        mockGetTaskCountersSuccess({ once: false })
        mockGetTasksSuccess({ once: false })
        mockGetCustomerListSuccess({ once: false })
        mockGetMacroregionsSuccess({ once: false })
        mockGetSupportGroupListSuccess({ once: false })

        const userListItem = userFixtures.userListItem()
        mockGetUsersSuccess({ body: [userListItem], once: false })

        const { user } = render(<TasksPage />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock(
                userFixtures.user({ permissions: [UserPermissionsEnum.SelfWorkGroupsRead] }),
              ),
            },
          }),
        })

        await taskTableTestUtils.expectLoadingFinished()
        await testUtils.clickExtendedFilterButton(user)
        await tasksFilterTestUtils.findContainer()
        await tasksFilterTestUtils.workGroup.expectLoadingFinished()
        await tasksFilterTestUtils.manager.expectLoadingFinished()

        await tasksFilterTestUtils.status.setValue(user, taskExtendedStatusDict.NEW!)
        await tasksFilterTestUtils.assigned.setValue(user, taskAssignedDict.True)
        await tasksFilterTestUtils.overdue.setValue(user, taskOverdueDict.False)

        const { startDateValue, endDateValue } = await tasksFilterTestUtils.completeAt.setValue(
          user,
        )

        const { keyword: searchByColumnKeywordValue } =
          await tasksFilterTestUtils.searchByColumn.setKeywordValue(user)

        await tasksFilterTestUtils.searchByColumn.setColumnValue(user, searchFieldDict.searchByName)

        const workGroupField = await tasksFilterTestUtils.workGroup.expectLoadingFinished()
        await tasksFilterTestUtils.workGroup.openField(user, workGroupField)
        await tasksFilterTestUtils.workGroup.setValue(user, workGroupListItem.name)

        await tasksFilterTestUtils.manager.openField(user)
        await tasksFilterTestUtils.manager.setValue(user, userListItem.fullName)

        await tasksFilterTestUtils.clickApplyButton(user)
        // await taskTableTestUtils.expectLoadingStarted()
        await taskTableTestUtils.expectLoadingFinished()
        await testUtils.clickExtendedFilterButton(user)
        await tasksFilterTestUtils.findContainer()
        await tasksFilterTestUtils.workGroup.expectLoadingFinished()
        await tasksFilterTestUtils.manager.expectLoadingFinished()

        const statusField = tasksFilterTestUtils.status.getField(taskExtendedStatusDict.NEW!)
        await waitFor(() => {
          expect(statusField).toBeChecked()
        })

        expect(tasksFilterTestUtils.assigned.getField(taskAssignedDict.True)).toBeChecked()

        expect(tasksFilterTestUtils.overdue.getField(taskOverdueDict.False)).toBeChecked()

        const startDateField = tasksFilterTestUtils.completeAt.getStartDateField()
        await waitFor(() => {
          expect(startDateField).toHaveDisplayValue(startDateValue)
        })

        expect(tasksFilterTestUtils.completeAt.getEndDateField()).toHaveDisplayValue(endDateValue)

        expect(tasksFilterTestUtils.searchByColumn.getKeywordField()).toHaveDisplayValue(
          searchByColumnKeywordValue,
        )

        expect(
          tasksFilterTestUtils.searchByColumn.getColumnField(searchFieldDict.searchByName),
        ).toBeChecked()

        expect(
          selectTestUtils.getSelectedOption(tasksFilterTestUtils.workGroup.getField()),
        ).toHaveTextContent(workGroupListItem.name)

        expect(tasksFilterTestUtils.manager.getSelected()).toHaveTextContent(userListItem.fullName)
      })

      test('Сохраняется фильтр групп поддержки', async () => {
        const customerListItem = warehouseFixtures.customerListItem()
        mockGetCustomerListSuccess({ body: [customerListItem], once: false })

        const macroregionListItem = macroregionFixtures.macroregionListItem()
        mockGetMacroregionsSuccess({ body: [macroregionListItem], once: false })

        const supportGroupListItem = supportGroupFixtures.supportGroupListItem()
        mockGetSupportGroupListSuccess({ body: [supportGroupListItem], once: false })

        mockGetWorkGroupsSuccess()
        mockGetTaskCountersSuccess({ once: false })
        mockGetUsersSuccess()
        mockGetTasksSuccess({
          body: commonFixtures.paginatedListResponse(taskFixtures.tasks()),
          once: false,
        })

        const { user } = render(<TasksPage />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        })

        await taskTableTestUtils.expectLoadingStarted()
        await taskTableTestUtils.expectLoadingFinished()
        const button = testUtils.getExtendedFilterButton()
        await waitFor(() => expect(button).toBeEnabled())
        await user.click(button)

        const filter = await tasksFilterTestUtils.findContainer()
        await tasksFilterTestUtils.expectCustomersLoadingFinished()
        await tasksFilterTestUtils.expectMacroregionsLoadingFinished()
        await tasksFilterTestUtils.expectSupportGroupsLoadingFinished()

        await tasksFilterTestUtils.openCustomersSelect(user)
        await tasksFilterTestUtils.setCustomer(user, customerListItem.title)

        await tasksFilterTestUtils.openMacroregionsSelect(user)
        await tasksFilterTestUtils.setMacroregion(user, macroregionListItem.title)

        await tasksFilterTestUtils.openSupportGroupsSelect(user)
        await tasksFilterTestUtils.setSupportGroup(user, supportGroupListItem.name)
        await tasksFilterTestUtils.clickApplyButton(user)

        await waitFor(() => expect(filter).not.toBeInTheDocument())

        const filters = taskLocalStorageService.getTasksFilters()!
        expect(filters.customers).toEqual(expect.arrayContaining([customerListItem.id]))
        expect(filters.macroregions).toEqual(expect.arrayContaining([macroregionListItem.id]))
        expect(filters.supportGroups).toEqual(expect.arrayContaining([supportGroupListItem.id]))
      })
    })

    test('Значения не сохраняются если фильтр не был применён', async () => {
      const workGroupListItem = workGroupFixtures.workGroupListItem()
      mockGetWorkGroupsSuccess({ body: [workGroupListItem], once: false })
      mockGetTaskCountersSuccess()
      mockGetTasksSuccess()
      mockGetCustomerListSuccess({ once: false })
      mockGetMacroregionsSuccess({ once: false })
      mockGetSupportGroupListSuccess({ once: false })

      const userListItem = userFixtures.userListItem()
      mockGetUsersSuccess({ body: [userListItem], once: false })

      const { user } = render(<TasksPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: {
            ...getUserMeQueryMock(
              userFixtures.user({ permissions: [UserPermissionsEnum.SelfWorkGroupsRead] }),
            ),
          },
        }),
      })

      await taskTableTestUtils.expectLoadingFinished()
      await testUtils.clickExtendedFilterButton(user)
      const filter = await tasksFilterTestUtils.findContainer()
      await tasksFilterTestUtils.workGroup.expectLoadingFinished()
      await tasksFilterTestUtils.manager.expectLoadingFinished()

      await tasksFilterTestUtils.status.setValue(user, taskExtendedStatusDict.NEW!)
      await tasksFilterTestUtils.assigned.setValue(user, taskAssignedDict.True)
      await tasksFilterTestUtils.overdue.setValue(user, taskOverdueDict.False)

      const { startDateValue, endDateValue } = await tasksFilterTestUtils.completeAt.setValue(user)

      const { keyword: searchByColumnKeywordValue } =
        await tasksFilterTestUtils.searchByColumn.setKeywordValue(user)

      await tasksFilterTestUtils.searchByColumn.setColumnValue(user, searchFieldDict.searchByName)

      const workGroupField = await tasksFilterTestUtils.workGroup.expectLoadingFinished()
      await tasksFilterTestUtils.workGroup.openField(user, workGroupField)
      await tasksFilterTestUtils.workGroup.setValue(user, workGroupListItem.name)

      await tasksFilterTestUtils.manager.openField(user)
      await tasksFilterTestUtils.manager.setValue(user, userListItem.fullName)

      await tasksFilterTestUtils.closeFilter(user)
      await waitFor(() => {
        expect(filter).not.toBeInTheDocument()
      })

      await testUtils.clickExtendedFilterButton(user)
      await tasksFilterTestUtils.findContainer()
      await tasksFilterTestUtils.workGroup.expectLoadingFinished()
      await tasksFilterTestUtils.manager.expectLoadingFinished()

      expect(tasksFilterTestUtils.status.getField(taskExtendedStatusDict.NEW!)).not.toBeChecked()
      expect(tasksFilterTestUtils.assigned.getField(taskAssignedDict.True)).not.toBeChecked()
      expect(tasksFilterTestUtils.overdue.getField(taskOverdueDict.False)).not.toBeChecked()

      expect(tasksFilterTestUtils.completeAt.getStartDateField()).not.toHaveDisplayValue(
        startDateValue,
      )

      expect(tasksFilterTestUtils.completeAt.getEndDateField()).not.toHaveDisplayValue(endDateValue)

      expect(tasksFilterTestUtils.searchByColumn.getKeywordField()).not.toHaveDisplayValue(
        searchByColumnKeywordValue,
      )

      expect(
        tasksFilterTestUtils.searchByColumn.getColumnField(searchFieldDict.searchByName),
      ).not.toBeChecked()

      expect(
        selectTestUtils.getSelectedOption(tasksFilterTestUtils.workGroup.getField()),
      ).not.toBeInTheDocument()

      expect(tasksFilterTestUtils.manager.getSelected()).not.toBeInTheDocument()
    })

    describe('Имеет корректные значения по умолчанию', () => {
      test('Для отображения не нужны права', async () => {
        mockGetUsersSuccess()
        mockGetWorkGroupsSuccess()
        mockGetTaskCountersSuccess()
        mockGetTasksSuccess()
        mockGetCustomerListSuccess()
        mockGetMacroregionsSuccess()
        mockGetSupportGroupListSuccess()

        const { user } = render(<TasksPage />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        })

        await taskTableTestUtils.expectLoadingFinished()
        await testUtils.clickExtendedFilterButton(user)
        await tasksFilterTestUtils.findContainer()

        tasksFilterTestUtils.status.expectHasCorrectInitialValues()
        tasksFilterTestUtils.assigned.expectHasCorrectInitialValues()
        tasksFilterTestUtils.overdue.expectHasCorrectInitialValues()
        tasksFilterTestUtils.completeAt.expectHasCorrectInitialValues()
        tasksFilterTestUtils.searchByColumn.expectHasCorrectInitialValues()
        expect(tasksFilterTestUtils.manager.getSelected()).not.toBeInTheDocument()
      })

      test('Фильтр по рабочей группе', async () => {
        mockGetUsersSuccess()
        mockGetTasksSuccess()
        mockGetTaskCountersSuccess()
        mockGetCustomerListSuccess()
        mockGetMacroregionsSuccess()
        mockGetSupportGroupListSuccess()
        mockGetWorkGroupsSuccess({
          body: workGroupFixtures.workGroupList(),
        })

        const { user } = render(<TasksPage />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock(
                userFixtures.user({ permissions: [UserPermissionsEnum.SelfWorkGroupsRead] }),
              ),
            },
          }),
        })

        await taskTableTestUtils.expectLoadingFinished()
        await testUtils.clickExtendedFilterButton(user)
        await tasksFilterTestUtils.findContainer()
        const workGroupField = await tasksFilterTestUtils.workGroup.expectLoadingFinished()
        const selectedOption = selectTestUtils.getSelectedOption(workGroupField)

        expect(selectedOption).not.toBeInTheDocument()
      })
    })
  })

  describe('Сохраненные фильтры', () => {
    test('Не отображаются если их нет', () => {
      mockGetTasksSuccess()
      mockGetTaskCountersSuccess()

      render(<TasksPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      const filters = tasksFiltersStorageTestUtils.queryContainer()
      expect(filters).not.toBeInTheDocument()
    })

    test('Отображаются если есть', async () => {
      mockGetTasksSuccess()
      mockGetTaskCountersSuccess()

      const savedTasksFilters: TasksFiltersStorageType = {
        customers: [fakeId()],
        macroregions: [fakeId()],
        supportGroups: [fakeId()],
      }
      taskLocalStorageService.setTasksFilters(savedTasksFilters)

      render(<TasksPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      Object.keys(savedTasksFilters).forEach((filterName) => {
        const customersFilter = tasksFiltersStorageTestUtils.getFilter(
          filterName as keyof typeof savedTasksFilters,
        )
        expect(customersFilter).toBeInTheDocument()
      })
    })

    test('После удаления перезапрашиваются заявки и счетчик заявок', async () => {
      mockGetTasksSuccess({ once: false })
      mockGetTaskCountersSuccess({ once: false })

      taskLocalStorageService.setTasksFilters({ customers: [fakeId()] })

      const { user } = render(<TasksPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

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
      mockGetTasksSuccess()
      mockGetTaskCountersSuccess()

      render(<TasksPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      await taskTableTestUtils.expectLoadingStarted()
      await taskTableTestUtils.expectLoadingFinished()
      const searchInput = testUtils.getSearchInput()

      expect(searchInput).toBeInTheDocument()
      expect(searchInput).toBeEnabled()
      expect(searchInput).not.toHaveValue()
    })

    test('Можно ввести значение', async () => {
      mockGetTasksSuccess()
      mockGetTaskCountersSuccess()

      const { user } = render(<TasksPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      await taskTableTestUtils.expectLoadingStarted()
      await taskTableTestUtils.expectLoadingFinished()
      const value = fakeWord()
      const input = await testUtils.setSearchValue(user, value)

      expect(input).toHaveValue(value)
    })

    test('Поле не активно во время загрузки заявок', async () => {
      mockGetTaskCountersSuccess()
      mockGetTasksSuccess()

      render(<TasksPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      await waitFor(() => expect(testUtils.getSearchInput()).toBeDisabled())
      await taskTableTestUtils.expectLoadingFinished()
      await waitFor(() => expect(testUtils.getSearchInput()).toBeEnabled())
    })

    describe('После применения', () => {
      test('Карточка заявки закрывается', async () => {
        mockGetWorkGroupsSuccess()
        mockGetTaskCountersSuccess()

        const taskListItem = taskFixtures.taskListItem()
        mockGetTasksSuccess({
          body: taskFixtures.getTasksResponse([taskListItem]),
          once: false,
        })
        mockGetTaskSuccess(taskListItem.id)

        const { user } = render(<TasksPage />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        })

        await taskTableTestUtils.expectLoadingStarted()
        await taskTableTestUtils.expectLoadingFinished()
        await taskTableTestUtils.clickRow(user, taskListItem.id)
        const taskCard = await taskDetailsTestUtils.findContainer()
        await testUtils.setSearchValue(user, fakeWord(), true)
        await waitFor(() => {
          expect(taskCard).not.toBeInTheDocument()
        })
      })

      describe('Отправляется запрос', () => {
        /* не работает по какой-то причине */
        test.skip('При нажатии на кнопку поиска', async () => {
          mockGetTaskCountersSuccess()
          mockGetTasksSuccess({ once: false })

          const { user } = render(<TasksPage />, {
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: { ...getUserMeQueryMock(userFixtures.user()) },
            }),
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
          mockGetTasksSuccess({ once: false })

          const { user } = render(<TasksPage />, {
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: { ...getUserMeQueryMock(userFixtures.user()) },
            }),
          })

          await taskTableTestUtils.expectLoadingFinished()
          await testUtils.setSearchValue(user, fakeWord(), true)
          await taskTableTestUtils.expectLoadingStarted()
        })
      })

      test('Кнопка открытия расширенного фильтра недоступна', async () => {
        const { user } = render(<TasksPage />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        })

        await testUtils.setSearchValue(user, fakeWord(), true)
        const extendedFilterButton = testUtils.getExtendedFilterButton()
        await waitFor(() => expect(extendedFilterButton).toBeDisabled())
      })

      test('Быстрый фильтр перестаёт быть выбранным', async () => {
        mockGetTasksSuccess()
        mockGetTaskCountersSuccess()

        const { user } = render(<TasksPage />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        })

        await taskTableTestUtils.expectLoadingFinished()
        await fastFilterListTestUtils.expectLoadingFinished()
        const fastFilter = fastFilterListTestUtils.getCheckableTag(FastFilterEnum.All)
        fastFilterListTestUtils.expectFilterChecked(fastFilter)
        await testUtils.setSearchValue(user, fakeWord(), true)

        await waitFor(() => {
          fastFilterListTestUtils.expectFilterNotChecked(fastFilter)
        })
      })
    })

    describe('Очищение поля через клавиатуру', () => {
      test('Применяет быстрый фильтр если он был применён ранее', async () => {
        mockGetTasksSuccess({ once: false })
        mockGetTaskCountersSuccess()

        const { user } = render(<TasksPage />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        })

        await taskTableTestUtils.expectLoadingFinished()
        await fastFilterListTestUtils.expectLoadingFinished()

        const input = await testUtils.setSearchValue(user, fakeWord({ length: 1 }), true)

        const fastFilter = fastFilterListTestUtils.getCheckableTag(FastFilterEnum.All)

        await waitFor(() => fastFilterListTestUtils.expectFilterNotChecked(fastFilter))
        await waitFor(() => expect(input).toBeEnabled())
        await user.clear(input)
        await taskTableTestUtils.expectLoadingStarted()
        await taskTableTestUtils.expectLoadingFinished()
        await waitFor(() => fastFilterListTestUtils.expectFilterChecked(fastFilter))
      })

      test('Делает кнопку открытия расширенного фильтра активной', async () => {
        mockGetTasksSuccess({ once: false })
        mockGetTaskCountersSuccess()

        const { user } = render(<TasksPage />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        })

        await taskTableTestUtils.expectLoadingStarted()
        await taskTableTestUtils.expectLoadingFinished()
        const button = testUtils.getExtendedFilterButton()
        expect(button).toBeEnabled()

        const input = await testUtils.setSearchValue(user, fakeWord(), true)
        await waitFor(() => expect(button).toBeDisabled())
        await waitFor(() => expect(input).toBeEnabled())
        await user.clear(input)
        await waitFor(() => expect(button).toBeEnabled())
      })

      test('Применяет расширенный фильтр если он был применён ранее', async () => {
        const workGroupListItem = workGroupFixtures.workGroupListItem()
        mockGetWorkGroupsSuccess({ body: [workGroupListItem], once: false })
        mockGetTaskCountersSuccess({ once: false })
        mockGetTasksSuccess({ once: false })
        mockGetCustomerListSuccess({ once: false })
        mockGetSupportGroupListSuccess({ once: false })
        mockGetMacroregionsSuccess({ once: false })

        const userListItem = userFixtures.userListItem()
        mockGetUsersSuccess({ body: [userListItem], once: false })

        const { user } = render(<TasksPage />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock(
                userFixtures.user({ permissions: [UserPermissionsEnum.SelfWorkGroupsRead] }),
              ),
            },
          }),
        })

        await taskTableTestUtils.expectLoadingStarted()
        await taskTableTestUtils.expectLoadingFinished()
        await testUtils.clickExtendedFilterButton(user)
        await tasksFilterTestUtils.findContainer()
        await tasksFilterTestUtils.workGroup.expectLoadingFinished()
        await tasksFilterTestUtils.manager.expectLoadingFinished()
        await tasksFilterTestUtils.status.setValue(user, taskExtendedStatusDict.NEW!)
        await tasksFilterTestUtils.assigned.setValue(user, taskAssignedDict.True)
        await tasksFilterTestUtils.overdue.setValue(user, taskOverdueDict.False)

        const { startDateValue, endDateValue } = await tasksFilterTestUtils.completeAt.setValue(
          user,
        )

        const { keyword: searchByColumnKeywordValue } =
          await tasksFilterTestUtils.searchByColumn.setKeywordValue(user)

        await tasksFilterTestUtils.searchByColumn.setColumnValue(user, searchFieldDict.searchByName)

        const workGroupField = await tasksFilterTestUtils.workGroup.expectLoadingFinished()
        await tasksFilterTestUtils.workGroup.openField(user, workGroupField)
        await tasksFilterTestUtils.workGroup.setValue(user, workGroupListItem.name)

        await tasksFilterTestUtils.manager.openField(user)
        await tasksFilterTestUtils.manager.setValue(user, userListItem.fullName)

        await tasksFilterTestUtils.clickApplyButton(user)
        await taskTableTestUtils.expectLoadingFinished()

        const searchInput = await testUtils.setSearchValue(user, fakeWord({ length: 1 }), true)
        await taskTableTestUtils.expectLoadingFinished()
        await user.clear(searchInput)
        await taskTableTestUtils.expectLoadingFinished()

        await testUtils.clickExtendedFilterButton(user)
        await tasksFilterTestUtils.findContainer()
        await tasksFilterTestUtils.workGroup.expectLoadingFinished()
        await tasksFilterTestUtils.manager.expectLoadingFinished()

        const statusField = tasksFilterTestUtils.status.getField(taskExtendedStatusDict.NEW!)
        await waitFor(() => expect(statusField).toBeChecked())

        expect(tasksFilterTestUtils.assigned.getField(taskAssignedDict.True)).toBeChecked()
        expect(tasksFilterTestUtils.overdue.getField(taskOverdueDict.False)).toBeChecked()

        const startDateField = tasksFilterTestUtils.completeAt.getStartDateField()
        await waitFor(() => expect(startDateField).toHaveDisplayValue(startDateValue))

        expect(tasksFilterTestUtils.completeAt.getEndDateField()).toHaveDisplayValue(endDateValue)

        expect(tasksFilterTestUtils.searchByColumn.getKeywordField()).toHaveDisplayValue(
          searchByColumnKeywordValue,
        )

        expect(
          tasksFilterTestUtils.searchByColumn.getColumnField(searchFieldDict.searchByName),
        ).toBeChecked()

        expect(
          selectTestUtils.getSelectedOption(tasksFilterTestUtils.workGroup.getField()),
        ).toHaveTextContent(workGroupListItem.name)

        expect(tasksFilterTestUtils.manager.getSelected()).toHaveTextContent(userListItem.fullName)
      })
    })

    describe('Сброс значения через кнопку', () => {
      test('Очищает поле ввода', async () => {
        const { user } = render(<TasksPage />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        })

        const input = await testUtils.setSearchValue(user, fakeWord())
        await testUtils.clickSearchClearButton(user)

        expect(input).not.toHaveValue()
      })

      test('Применяет быстрый фильтр если он был применён ранее', async () => {
        mockGetTasksSuccess({ once: false })
        mockGetTaskCountersSuccess({ body: taskFixtures.taskCounters() })

        const { user } = render(<TasksPage />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        })

        await taskTableTestUtils.expectLoadingStarted()
        await taskTableTestUtils.expectLoadingFinished()
        await fastFilterListTestUtils.expectLoadingFinished()
        await testUtils.setSearchValue(user, fakeWord(), true)
        const fastFilter = fastFilterListTestUtils.getCheckableTag(FastFilterEnum.All)
        await waitFor(() => fastFilterListTestUtils.expectFilterNotChecked(fastFilter))
        await testUtils.clickSearchClearButton(user)
        await taskTableTestUtils.expectLoadingStarted()
        await taskTableTestUtils.expectLoadingFinished()
        await waitFor(() => fastFilterListTestUtils.expectFilterChecked(fastFilter))
      })

      test('Делает кнопку открытия расширенного фильтра активной', async () => {
        mockGetTasksSuccess({ once: false })
        mockGetTaskCountersSuccess()

        const { user } = render(<TasksPage />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        })

        await taskTableTestUtils.expectLoadingStarted()
        await taskTableTestUtils.expectLoadingFinished()
        const extendedFilterButton = testUtils.getExtendedFilterButton()
        await waitFor(() => expect(extendedFilterButton).toBeEnabled())
        await testUtils.setSearchValue(user, fakeWord(), true)
        await waitFor(() => expect(extendedFilterButton).toBeDisabled())
        await testUtils.clickSearchClearButton(user)
        await taskTableTestUtils.expectLoadingStarted()
        await taskTableTestUtils.expectLoadingFinished()
        await waitFor(() => expect(extendedFilterButton).toBeEnabled())
      })

      test('Применяет расширенный фильтр если он был применён ранее', async () => {
        const workGroupListItem = workGroupFixtures.workGroupListItem()
        mockGetWorkGroupsSuccess({ body: [workGroupListItem], once: false })
        mockGetTaskCountersSuccess({ once: false })
        mockGetTasksSuccess({ once: false })
        mockGetCustomerListSuccess({ once: false })
        mockGetMacroregionsSuccess({ once: false })
        mockGetSupportGroupListSuccess({ once: false })

        const userListItem = userFixtures.userListItem()
        mockGetUsersSuccess({ body: [userListItem], once: false })

        const { user } = render(<TasksPage />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock(
                userFixtures.user({ permissions: [UserPermissionsEnum.SelfWorkGroupsRead] }),
              ),
            },
          }),
        })

        await taskTableTestUtils.expectLoadingStarted()
        await taskTableTestUtils.expectLoadingFinished()
        await testUtils.clickExtendedFilterButton(user)
        await tasksFilterTestUtils.findContainer()
        await tasksFilterTestUtils.workGroup.expectLoadingFinished()
        await tasksFilterTestUtils.manager.expectLoadingFinished()
        await tasksFilterTestUtils.status.setValue(user, taskExtendedStatusDict.NEW!)
        await tasksFilterTestUtils.assigned.setValue(user, taskAssignedDict.True)
        await tasksFilterTestUtils.overdue.setValue(user, taskOverdueDict.False)

        const { startDateValue, endDateValue } = await tasksFilterTestUtils.completeAt.setValue(
          user,
        )

        const { keyword: searchByColumnKeywordValue } =
          await tasksFilterTestUtils.searchByColumn.setKeywordValue(user)

        await tasksFilterTestUtils.searchByColumn.setColumnValue(user, searchFieldDict.searchByName)

        const workGroupField = await tasksFilterTestUtils.workGroup.expectLoadingFinished()

        await tasksFilterTestUtils.workGroup.openField(user, workGroupField)
        await tasksFilterTestUtils.workGroup.setValue(user, workGroupListItem.name)

        await tasksFilterTestUtils.manager.openField(user)
        await tasksFilterTestUtils.manager.setValue(user, userListItem.fullName)

        await tasksFilterTestUtils.clickApplyButton(user)
        await taskTableTestUtils.expectLoadingFinished()

        await testUtils.setSearchValue(user, fakeWord(), true)
        await taskTableTestUtils.expectLoadingFinished()
        await testUtils.clickSearchClearButton(user)
        await taskTableTestUtils.expectLoadingStarted()
        await taskTableTestUtils.expectLoadingFinished()

        expect(testUtils.getExtendedFilterButton()).toBeEnabled()
        await testUtils.clickExtendedFilterButton(user)
        await tasksFilterTestUtils.findContainer()
        await tasksFilterTestUtils.workGroup.expectLoadingFinished()
        await tasksFilterTestUtils.manager.expectLoadingFinished()

        const statusField = tasksFilterTestUtils.status.getField(taskExtendedStatusDict.NEW!)
        await waitFor(() => expect(statusField).toBeChecked())

        expect(tasksFilterTestUtils.assigned.getField(taskAssignedDict.True)).toBeChecked()

        expect(tasksFilterTestUtils.overdue.getField(taskOverdueDict.False)).toBeChecked()

        const startDateField = tasksFilterTestUtils.completeAt.getStartDateField()
        await waitFor(() => expect(startDateField).toHaveDisplayValue(startDateValue))

        expect(tasksFilterTestUtils.completeAt.getEndDateField()).toHaveDisplayValue(endDateValue)

        expect(tasksFilterTestUtils.searchByColumn.getKeywordField()).toHaveDisplayValue(
          searchByColumnKeywordValue,
        )

        expect(
          tasksFilterTestUtils.searchByColumn.getColumnField(searchFieldDict.searchByName),
        ).toBeChecked()

        expect(
          selectTestUtils.getSelectedOption(tasksFilterTestUtils.workGroup.getField()),
        ).toHaveTextContent(workGroupListItem.name)

        expect(tasksFilterTestUtils.manager.getSelected()).toHaveTextContent(userListItem.fullName)
      })
    })
  })

  describe('Кнопка обновления заявок', () => {
    test('Отображается корректно', async () => {
      mockGetTasksSuccess()
      mockGetTaskCountersSuccess()

      render(<TasksPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      await taskTableTestUtils.expectLoadingFinished()
      const button = testUtils.getUpdateTasksButton()

      expect(button).toBeInTheDocument()
      await waitFor(() => expect(button).toBeEnabled())
    })

    test('Перезагружает заявки', async () => {
      mockGetTaskCountersSuccess({ once: false })
      mockGetTasksSuccess({ once: false })

      const { user } = render(<TasksPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      await taskTableTestUtils.expectLoadingFinished()
      await testUtils.clickUpdateTasksButton(user)
      await taskTableTestUtils.expectLoadingStarted()
    })

    test('Перезагружает количество заявок для быстрых фильтров', async () => {
      mockGetTaskCountersSuccess({ once: false })
      mockGetTasksSuccess({ once: false })

      const { user } = render(<TasksPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      await taskTableTestUtils.expectLoadingFinished()
      await fastFilterListTestUtils.expectLoadingFinished()
      await testUtils.clickUpdateTasksButton(user)
      await fastFilterListTestUtils.expectLoadingStarted()
    })

    test('Закрывает карточку заявки', async () => {
      mockGetWorkGroupsSuccess()
      mockGetTaskCountersSuccess({ once: false })

      const currentUser = userFixtures.user()
      mockGetUserActionsSuccess(currentUser.id)

      const taskListItem = taskFixtures.taskListItem()
      mockGetTasksSuccess({
        body: taskFixtures.getTasksResponse([taskListItem]),
        once: false,
      })
      mockGetTaskSuccess(taskListItem.id)

      const { user } = render(<TasksPage />, {
        store: getStoreWithAuth({ id: currentUser.id }, undefined, undefined, {
          queries: { ...getUserMeQueryMock(currentUser) },
        }),
      })

      await taskTableTestUtils.expectLoadingStarted()
      await taskTableTestUtils.expectLoadingFinished()
      await taskTableTestUtils.clickRow(user, taskListItem.id)
      const taskCard = await taskDetailsTestUtils.findContainer()
      await testUtils.clickUpdateTasksButton(user)

      await waitFor(() => expect(taskCard).not.toBeInTheDocument())
    })

    test('Не активна во время загрузки заявок', async () => {
      mockGetTaskCountersSuccess()
      mockGetTasksSuccess()

      render(<TasksPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      await waitFor(() => expect(testUtils.getUpdateTasksButton()).toBeDisabled())
      await taskTableTestUtils.expectLoadingFinished()
      await waitFor(() => expect(testUtils.getUpdateTasksButton()).toBeEnabled())
    })

    test('Автообновление работает', async () => {
      mockGetTaskCountersSuccess({ once: false })
      mockGetTasksSuccess({ once: false })

      const { user } = render(<TasksPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      await fastFilterListTestUtils.expectLoadingFinished()
      await taskTableTestUtils.expectLoadingFinished()
      await updateTasksButtonTestUtils.openDropdown(user, testUtils.getContainer())
      await updateTasksButtonTestUtils.clickAutoUpdateItem(user)
      await taskTableTestUtils.expectLoadingStarted()
      await fastFilterListTestUtils.expectLoadingStarted()
    })
  })

  describe('Кнопка создания заявки', () => {
    test('Отображается корректно', () => {
      mockGetTaskCountersSuccess()
      mockGetTasksSuccess()

      render(<TasksPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      const button = testUtils.getCreateTaskButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })
  })

  describe('Таблица заявок', () => {
    test('Отображается корректно', async () => {
      const taskList = taskFixtures.tasks(2)

      mockGetTaskCountersSuccess()
      mockGetTasksSuccess({
        body: taskFixtures.getTasksResponse(taskList),
      })

      render(<TasksPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

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
        mockGetWorkGroupsSuccess()

        const taskListItem = taskFixtures.taskListItem()
        mockGetTasksSuccess({
          body: taskFixtures.getTasksResponse([taskListItem]),
        })
        mockGetTaskSuccess(taskListItem.id)

        const { user } = render(<TasksPage />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        })

        await taskTableTestUtils.expectLoadingStarted()
        await taskTableTestUtils.expectLoadingFinished()
        const row = await taskTableTestUtils.clickRow(user, taskListItem.id)
        await waitFor(() => expect(row).toHaveClass('ant-table-row-selected'))
      })

      test('Открывается карточка заявки', async () => {
        mockGetTaskCountersSuccess()
        mockGetWorkGroupsSuccess()

        const currentUser = userFixtures.user()
        mockGetUserActionsSuccess(currentUser.id)

        const taskListItem = taskFixtures.taskListItem()
        mockGetTasksSuccess({
          body: taskFixtures.getTasksResponse([taskListItem]),
        })
        mockGetTaskSuccess(taskListItem.id)

        const { user } = render(<TasksPage />, {
          store: getStoreWithAuth({ id: currentUser.id }, undefined, undefined, {
            queries: { ...getUserMeQueryMock(currentUser) },
          }),
        })

        await taskTableTestUtils.expectLoadingStarted()
        await taskTableTestUtils.expectLoadingFinished()
        await taskTableTestUtils.clickRow(user, taskListItem.id)

        const taskCard = await taskDetailsTestUtils.findContainer()
        expect(taskCard).toBeInTheDocument()
      })
    })

    test('Колонка - заявка. После сортировки список отображается корректно', async () => {
      mockGetTaskCountersSuccess()

      const taskList = taskFixtures.tasks()
      mockGetTasksSuccess({
        once: false,
        body: taskFixtures.getTasksResponse(taskList),
      })

      const { user } = render(<TasksPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
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

    test('Колонка - внешний номер. После сортировки список отображается корректно', async () => {
      mockGetTaskCountersSuccess()

      const taskList = taskFixtures.tasks()
      mockGetTasksSuccess({
        once: false,
        body: taskFixtures.getTasksResponse(taskList),
      })

      const { user } = render(<TasksPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
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

    test('Колонка - объект. После сортировки список отображается корректно', async () => {
      mockGetTaskCountersSuccess()

      const taskList = taskFixtures.tasks()
      mockGetTasksSuccess({
        once: false,
        body: taskFixtures.getTasksResponse(taskList),
      })

      const { user } = render(<TasksPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
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

    test('Колонка - тема. После сортировки список отображается корректно', async () => {
      mockGetTaskCountersSuccess()

      const taskList = taskFixtures.tasks()
      mockGetTasksSuccess({
        once: false,
        body: taskFixtures.getTasksResponse(taskList),
      })

      const { user } = render(<TasksPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
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

    test('Колонка - исполнитель. После сортировки список отображается корректно', async () => {
      mockGetTaskCountersSuccess()

      const taskList = taskFixtures.tasks()
      mockGetTasksSuccess({
        once: false,
        body: taskFixtures.getTasksResponse(taskList),
      })

      const { user } = render(<TasksPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
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

    test('Колонка - рабочая группа. После сортировки список отображается корректно', async () => {
      mockGetTaskCountersSuccess()

      const taskList = taskFixtures.tasks()
      mockGetTasksSuccess({
        once: false,
        body: taskFixtures.getTasksResponse(taskList),
      })

      const { user } = render(<TasksPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
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

    test('Колонка - группа поддержки. После сортировки список отображается корректно', async () => {
      mockGetTaskCountersSuccess()

      const taskList = taskFixtures.tasks()
      mockGetTasksSuccess({
        once: false,
        body: taskFixtures.getTasksResponse(taskList),
      })

      const { user } = render(<TasksPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
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

    describe('Колонка - выполнить до', () => {
      test('После сортировки список отображается корректно', async () => {
        mockGetTaskCountersSuccess()

        const taskList = taskFixtures.tasks()
        mockGetTasksSuccess({
          once: false,
          body: taskFixtures.getTasksResponse(taskList),
        })

        const { user } = render(<TasksPage />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
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
        const item1 = taskFixtures.taskListItem({ olaStatus: TaskOlaStatusEnum.Expired })
        const item2 = taskFixtures.taskListItem({ olaNextBreachTime: moment().toISOString() })
        const item3 = taskFixtures.taskListItem({
          olaNextBreachTime: moment().add(1, 'day').toISOString(),
        })
        mockGetTasksSuccess({
          once: false,
          body: taskFixtures.getTasksResponse([item1, item2, item3]),
        })

        render(<TasksPage />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        })

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
        mockGetTasksSuccess({
          once: false,
          body: taskFixtures.getTasksResponse([item1, item2, item3]),
        })

        const { user } = render(<TasksPage />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        })

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

    test('Колонка - комментарий. После сортировки список отображается корректно', async () => {
      mockGetTaskCountersSuccess()

      const taskList = taskFixtures.tasks()
      mockGetTasksSuccess({
        once: false,
        body: taskFixtures.getTasksResponse(taskList),
      })

      const { user } = render(<TasksPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
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

    test('Колонка - дата создания. После сортировки список отображается корректно', async () => {
      mockGetTaskCountersSuccess()

      const taskList = taskFixtures.tasks()
      mockGetTasksSuccess({
        once: false,
        body: taskFixtures.getTasksResponse(taskList),
      })

      const { user } = render(<TasksPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
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

    test('Пагинация работает', async () => {
      mockGetTaskCountersSuccess()

      const taskList = taskFixtures.tasks(DEFAULT_PAGE_SIZE + 1)
      mockGetTasksSuccess({
        once: false,
        body: taskFixtures.getTasksResponse(taskList),
      })

      const { user } = render(<TasksPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      await taskTableTestUtils.expectLoadingStarted()
      await taskTableTestUtils.expectLoadingFinished()
      await taskTableTestUtils.clickPaginationNextButton(user)
      await taskTableTestUtils.expectLoadingStarted()
      await taskTableTestUtils.expectLoadingFinished()
    })
  })
})
