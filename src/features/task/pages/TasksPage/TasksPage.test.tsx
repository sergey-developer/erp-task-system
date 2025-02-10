import { waitFor } from '@testing-library/react'
import {
  fastFilterByLinesOptions,
  fastFilterOptions,
} from 'features/task/components/FastFilters/options'
import {
  searchFieldDict,
  taskAssignedDict,
  taskOverdueDict,
} from 'features/task/components/TasksFilter/constants'
import {
  TaskActionsPermissionsEnum,
  taskExtendedStatusDict,
  TaskOlaStatusEnum,
  TasksFastFilterEnum,
} from 'features/task/constants/task'
import { TaskCountersKeys } from 'features/task/models'
import {
  taskLocalStorageService,
  TasksFiltersStorageType,
} from 'features/task/services/taskLocalStorageService/taskLocalStorage.service'
import { UserPermissionsEnum } from 'features/user/api/constants'
import { getFullUserName } from 'features/user/utils'
import { camelize } from 'humps'
import moment from 'moment-timezone'

import { executeTaskModalTestUtils } from '_tests_/features/tasks/components/ExecuteTaskModal/testUtils'
import { fastFilterOptionTestUtils } from '_tests_/features/tasks/components/FastFilters/FastFilterOption/testUtils'
import {
  activeAssignOnMeButtonProps,
  canSelectAssigneeProps,
} from '_tests_/features/tasks/components/TaskDetails/AssigneeBlock/constants'
import { assigneeBlockTestUtils } from '_tests_/features/tasks/components/TaskDetails/AssigneeBlock/testUtils'
import { taskDetailsTitleTestUtils } from '_tests_/features/tasks/components/TaskDetails/TaskDetailsTitle/testUtils'
import {
  showFirstLineButtonProps,
  showSecondLineButtonProps,
} from '_tests_/features/tasks/components/TaskDetails/WorkGroupBlock/constants'
import { workGroupBlockTestUtils } from '_tests_/features/tasks/components/TaskDetails/WorkGroupBlock/testUtils'
import { taskDetailsTestUtils } from '_tests_/features/tasks/components/TaskDetails/testUtils'
import { taskFirstLineModalTestUtils } from '_tests_/features/tasks/components/TaskFirstLineModal/testUtils'
import { taskSecondLineModalTestUtils } from '_tests_/features/tasks/components/TaskSecondLineModal/testUtils'
import { taskTableTestUtils } from '_tests_/features/tasks/components/TaskTable/testUtils'
import { tasksFilterTestUtils } from '_tests_/features/tasks/components/TasksFilter/testUtils'
import { tasksFiltersStorageTestUtils } from '_tests_/features/tasks/components/TasksFiltersStorage/testUtils'
import { updateTasksButtonTestUtils } from '_tests_/features/tasks/components/UpdateTasksButton/testUtils'
import { tasksPageTestUtils } from '_tests_/features/tasks/pages/TasksPage/testUtils'
import commonFixtures from '_tests_/fixtures/common/index'
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
  mockGetUsersSuccess,
  mockGetWorkGroupsSuccess,
  mockResolveTaskSuccess,
  mockTakeTaskSuccess,
  mockUpdateTaskAssigneeSuccess,
  mockUpdateTaskWorkGroupSuccess,
} from '_tests_/mocks/api'
import { getUserMeQueryMock } from '_tests_/mocks/state/user'
import {
  fakeId,
  fakeWord,
  getStoreWithAuth,
  render,
  selectTestUtils,
  setupApiTests,
} from '_tests_/utils'

import { DEFAULT_PAGE_SIZE, tableItemBoundaryStyles } from './constants'
import TasksPage from './index'

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

describe('Страница реестра заявок', () => {
  describe('Быстрые фильтры', () => {
    describe('По линиям', () => {
      test(`Отображаются если есть права ${UserPermissionsEnum.FirstLineTasksRead} и ${UserPermissionsEnum.SecondLineTasksRead}`, async () => {
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

        await fastFilterOptionTestUtils.expectLoadingFinished()
        expect(tasksPageTestUtils.getFastFilterByLines()).toBeInTheDocument()
      })

      test(`Отображаются если есть права ${UserPermissionsEnum.FirstLineTasksRead} и ${UserPermissionsEnum.WorkGroupTasksRead}`, async () => {
        mockGetTaskCountersSuccess()
        mockGetTasksSuccess()

        render(<TasksPage />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock(
                userFixtures.user({
                  permissions: [
                    UserPermissionsEnum.FirstLineTasksRead,
                    UserPermissionsEnum.WorkGroupTasksRead,
                  ],
                }),
              ),
            },
          }),
        })

        await fastFilterOptionTestUtils.expectLoadingFinished()
        expect(tasksPageTestUtils.getFastFilterByLines()).toBeInTheDocument()
      })

      test(`Не отображаются если есть права ${UserPermissionsEnum.FirstLineTasksRead} но нет ${UserPermissionsEnum.SecondLineTasksRead} и ${UserPermissionsEnum.WorkGroupTasksRead}`, async () => {
        mockGetTaskCountersSuccess()
        mockGetTasksSuccess()

        render(<TasksPage />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock(
                userFixtures.user({ permissions: [UserPermissionsEnum.FirstLineTasksRead] }),
              ),
            },
          }),
        })

        await fastFilterOptionTestUtils.expectLoadingFinished()
        expect(tasksPageTestUtils.queryFastFilterByLines()).not.toBeInTheDocument()
      })

      test(`Не отображаются если есть права ${UserPermissionsEnum.SecondLineTasksRead} но нет ${UserPermissionsEnum.FirstLineTasksRead}`, async () => {
        mockGetTaskCountersSuccess()
        mockGetTasksSuccess()

        render(<TasksPage />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock(
                userFixtures.user({ permissions: [UserPermissionsEnum.SecondLineTasksRead] }),
              ),
            },
          }),
        })

        await fastFilterOptionTestUtils.expectLoadingFinished()
        expect(tasksPageTestUtils.queryFastFilterByLines()).not.toBeInTheDocument()
      })

      test(`Не отображаются если есть права ${UserPermissionsEnum.WorkGroupTasksRead} но нет ${UserPermissionsEnum.FirstLineTasksRead}`, async () => {
        mockGetTaskCountersSuccess()
        mockGetTasksSuccess()

        render(<TasksPage />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock(
                userFixtures.user({ permissions: [UserPermissionsEnum.WorkGroupTasksRead] }),
              ),
            },
          }),
        })

        await fastFilterOptionTestUtils.expectLoadingFinished()
        expect(tasksPageTestUtils.queryFastFilterByLines()).not.toBeInTheDocument()
      })

      test('Количество заявок отображается', async () => {
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

        await taskTableTestUtils.expectLoadingFinished()
        await fastFilterOptionTestUtils.expectLoadingFinished()

        fastFilterByLinesOptions.forEach(({ value }) => {
          const counterName = camelize(value.toLowerCase())
          const counter = taskCounters[counterName as TaskCountersKeys]
          const counterEl = fastFilterOptionTestUtils.getByTextInCheckableTag(value, counter)
          expect(counterEl).toBeInTheDocument()
        })
      })

      test('Имеют верное значение по умолчанию', async () => {
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
        await fastFilterOptionTestUtils.expectLoadingFinished()

        fastFilterOptionTestUtils.expectFilterChecked(
          fastFilterOptionTestUtils.getCheckableTag(TasksFastFilterEnum.AllLines),
        )
      })

      test('При смене фильтра отправляется запрос', async () => {
        mockGetTaskCountersSuccess({ once: false })
        mockGetTasksSuccess({ once: false })

        const { user } = render(<TasksPage />, {
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
        await fastFilterOptionTestUtils.expectLoadingFinished()
        await fastFilterOptionTestUtils.setFilter(user, TasksFastFilterEnum.SecondLine)
        await fastFilterOptionTestUtils.expectLoadingStarted()
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
                userFixtures.user({
                  permissions: [
                    UserPermissionsEnum.SelfWorkGroupsRead,
                    UserPermissionsEnum.FirstLineTasksRead,
                    UserPermissionsEnum.SecondLineTasksRead,
                  ],
                }),
              ),
            },
          }),
        })

        await fastFilterOptionTestUtils.expectLoadingFinished()
        await taskTableTestUtils.expectLoadingFinished()

        await tasksPageTestUtils.clickTasksFilterButton(user)
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

        await fastFilterOptionTestUtils.expectLoadingFinished()
        await fastFilterOptionTestUtils.setFilter(user, TasksFastFilterEnum.FirstLine)
        await taskTableTestUtils.expectLoadingStarted()
        await taskTableTestUtils.expectLoadingFinished()

        await tasksPageTestUtils.clickTasksFilterButton(user)
        await tasksFilterTestUtils.findContainer()
        await tasksFilterTestUtils.workGroup.expectLoadingFinished()
        await tasksFilterTestUtils.manager.expectLoadingFinished()

        await waitFor(() => {
          expect(
            tasksFilterTestUtils.status.getField(taskExtendedStatusDict.NEW!),
          ).not.toBeChecked()
        })

        expect(tasksFilterTestUtils.assigned.getField(taskAssignedDict.True)).not.toBeChecked()

        expect(tasksFilterTestUtils.overdue.getField(taskOverdueDict.False)).not.toBeChecked()

        expect(tasksFilterTestUtils.completeAt.getStartDateField()).not.toHaveDisplayValue(
          startDateValue,
        )

        expect(tasksFilterTestUtils.completeAt.getEndDateField()).not.toHaveDisplayValue(
          endDateValue,
        )

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

      // todo: не проходит на CI
      test.skip('Закрывает карточку заявки', async () => {
        mockGetWorkGroupsSuccess()
        mockGetTaskCountersSuccess({ once: false })

        const taskListItem = taskFixtures.taskListItem()
        mockGetTasksSuccess({
          once: false,
          body: taskFixtures.getTasksResponse([taskListItem]),
        })
        mockGetTaskSuccess(taskListItem.id)

        const currentUser = userFixtures.user({
          permissions: [
            UserPermissionsEnum.FirstLineTasksRead,
            UserPermissionsEnum.SecondLineTasksRead,
          ],
        })
        mockGetUserActionsSuccess(currentUser.id)

        const { user } = render(<TasksPage />, {
          store: getStoreWithAuth(currentUser, undefined, undefined, {
            queries: { ...getUserMeQueryMock(currentUser) },
          }),
        })

        await taskTableTestUtils.expectLoadingStarted()
        await taskTableTestUtils.expectLoadingFinished()
        await fastFilterOptionTestUtils.expectLoadingFinished()
        await taskTableTestUtils.clickRow(user, taskListItem.id)
        const taskCard = await taskDetailsTestUtils.findContainer()
        await fastFilterOptionTestUtils.setFilter(user, TasksFastFilterEnum.SecondLine)
        await waitFor(() => expect(taskCard).not.toBeInTheDocument())
      })

      test('Сбрасывает значение поля поиска', async () => {
        mockGetTaskCountersSuccess()
        mockGetTasksSuccess({ once: false })

        const { user } = render(<TasksPage />, {
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
        await fastFilterOptionTestUtils.expectLoadingFinished()

        const searchValue = fakeWord()
        const searchInput = await tasksPageTestUtils.setSearchValue(user, searchValue)

        await fastFilterOptionTestUtils.setFilter(user, TasksFastFilterEnum.SecondLine)
        await taskTableTestUtils.expectLoadingFinished()

        expect(searchInput).not.toHaveValue()
        expect(searchInput).not.toHaveDisplayValue(searchValue)
      })
    })

    describe('Базовые', () => {
      test('Отображаются', async () => {
        mockGetTaskCountersSuccess()
        mockGetTasksSuccess()

        render(<TasksPage />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        })

        await fastFilterOptionTestUtils.expectLoadingFinished()
        expect(tasksPageTestUtils.getFastFilter()).toBeInTheDocument()
      })

      test('Количество заявок отображается', async () => {
        const taskCounters = taskFixtures.taskCounters()
        mockGetTaskCountersSuccess({ body: taskCounters })
        mockGetTasksSuccess()

        render(<TasksPage />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        })

        await taskTableTestUtils.expectLoadingFinished()
        await fastFilterOptionTestUtils.expectLoadingFinished()

        fastFilterOptions.forEach(({ value }) => {
          const counterName = camelize(value.toLowerCase())
          const counter = taskCounters[counterName as TaskCountersKeys]
          const counterEl = fastFilterOptionTestUtils.getByTextInCheckableTag(value, counter)
          expect(counterEl).toBeInTheDocument()
        })
      })

      test('Имеют верное значение по умолчанию', async () => {
        mockGetTaskCountersSuccess()
        mockGetTasksSuccess()

        render(<TasksPage />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        })

        await taskTableTestUtils.expectLoadingFinished()
        await fastFilterOptionTestUtils.expectLoadingFinished()

        fastFilterOptionTestUtils.expectFilterChecked(
          fastFilterOptionTestUtils.getCheckableTag(TasksFastFilterEnum.AllLines),
        )
      })

      test('При смене фильтра отправляется запрос', async () => {
        mockGetTaskCountersSuccess({ once: false })
        mockGetTasksSuccess({ once: false })

        const { user } = render(<TasksPage />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        })

        await taskTableTestUtils.expectLoadingFinished()
        await fastFilterOptionTestUtils.expectLoadingFinished()
        await fastFilterOptionTestUtils.setFilter(user, TasksFastFilterEnum.Free)
        await fastFilterOptionTestUtils.expectLoadingStarted()
        await taskTableTestUtils.expectLoadingStarted()
      })

      test.skip('Сбрасывает расширенный фильтр', async () => {
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

        await fastFilterOptionTestUtils.expectLoadingFinished()
        await taskTableTestUtils.expectLoadingFinished()

        await tasksPageTestUtils.clickTasksFilterButton(user)
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

        await fastFilterOptionTestUtils.expectLoadingFinished()
        await fastFilterOptionTestUtils.setFilter(user, TasksFastFilterEnum.Free)
        await taskTableTestUtils.expectLoadingStarted()
        await taskTableTestUtils.expectLoadingFinished()

        await tasksPageTestUtils.clickTasksFilterButton(user)
        await tasksFilterTestUtils.findContainer()
        await tasksFilterTestUtils.workGroup.expectLoadingFinished()
        await tasksFilterTestUtils.manager.expectLoadingFinished()

        await waitFor(() => {
          expect(
            tasksFilterTestUtils.status.getField(taskExtendedStatusDict.NEW!),
          ).not.toBeChecked()
        })

        expect(tasksFilterTestUtils.assigned.getField(taskAssignedDict.True)).not.toBeChecked()

        expect(tasksFilterTestUtils.overdue.getField(taskOverdueDict.False)).not.toBeChecked()

        expect(tasksFilterTestUtils.completeAt.getStartDateField()).not.toHaveDisplayValue(
          startDateValue,
        )

        expect(tasksFilterTestUtils.completeAt.getEndDateField()).not.toHaveDisplayValue(
          endDateValue,
        )

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

      // todo: не проходит на CI
      test.skip('Закрывает карточку заявки', async () => {
        mockGetWorkGroupsSuccess()
        mockGetTaskCountersSuccess({ once: false })

        const taskListItem = taskFixtures.taskListItem()
        mockGetTasksSuccess({
          once: false,
          body: taskFixtures.getTasksResponse([taskListItem]),
        })
        mockGetTaskSuccess(taskListItem.id)

        const currentUser = userFixtures.user()
        mockGetUserActionsSuccess(currentUser.id)

        const { user } = render(<TasksPage />, {
          store: getStoreWithAuth(currentUser, undefined, undefined, {
            queries: { ...getUserMeQueryMock(currentUser) },
          }),
        })

        await taskTableTestUtils.expectLoadingStarted()
        await taskTableTestUtils.expectLoadingFinished()
        await fastFilterOptionTestUtils.expectLoadingFinished()
        await taskTableTestUtils.clickRow(user, taskListItem.id)
        const taskCard = await taskDetailsTestUtils.findContainer()
        await fastFilterOptionTestUtils.setFilter(user, TasksFastFilterEnum.Free)
        await waitFor(() => expect(taskCard).not.toBeInTheDocument())
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
        await fastFilterOptionTestUtils.expectLoadingFinished()

        const searchValue = fakeWord()
        const searchInput = await tasksPageTestUtils.setSearchValue(user, searchValue)

        await fastFilterOptionTestUtils.setFilter(user, TasksFastFilterEnum.Free)
        await taskTableTestUtils.expectLoadingFinished()

        expect(searchInput).not.toHaveValue()
        expect(searchInput).not.toHaveDisplayValue(searchValue)
      })
    })

    test.skip('Перезапрашивается при выполнении заявки', async () => {
      mockGetTaskCountersSuccess({ once: false })

      const taskListItem = taskFixtures.taskListItem()
      mockGetTasksSuccess({
        body: commonFixtures.paginatedListResponse([taskListItem]),
        once: false,
      })

      const task = taskFixtures.task({ id: taskListItem.id, hasRelocationTasks: true })
      mockGetTaskSuccess(task.id, { body: task })
      mockResolveTaskSuccess(task.id)

      const currentUser = userFixtures.user()
      mockGetUserActionsSuccess(currentUser.id, {
        body: userFixtures.userActions({
          tasks: {
            ...userFixtures.taskActionsPermissions,
            [TaskActionsPermissionsEnum.CanResolve]: [task.id],
          },
        }),
      })

      const { user } = render(<TasksPage />, {
        store: getStoreWithAuth(currentUser, undefined, undefined, {
          queries: { ...getUserMeQueryMock(currentUser) },
        }),
      })

      await taskTableTestUtils.expectLoadingFinished()
      await fastFilterOptionTestUtils.expectLoadingFinished()
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
      await fastFilterOptionTestUtils.expectLoadingStarted()
      await fastFilterOptionTestUtils.expectLoadingFinished()
    })

    test.skip('Перезапрашивается при переводе на 1-ю линию', async () => {
      mockGetTaskCountersSuccess({ once: false })

      const taskListItem = taskFixtures.taskListItem()
      mockGetTasksSuccess({
        body: commonFixtures.paginatedListResponse([taskListItem]),
        once: false,
      })

      const task = taskFixtures.task({
        id: taskListItem.id,
        ...showFirstLineButtonProps,
      })
      mockGetTaskSuccess(task.id, { body: task })
      mockDeleteTaskWorkGroupSuccess(task.id)

      const currentUser = userFixtures.user()
      mockGetUserActionsSuccess(currentUser.id, {
        body: userFixtures.userActions({
          tasks: {
            ...userFixtures.taskActionsPermissions,
            [TaskActionsPermissionsEnum.CanPutOnFirstLine]: [task.id],
          },
        }),
      })

      const { user } = render(<TasksPage />, {
        store: getStoreWithAuth({ id: currentUser.id }, undefined, undefined, {
          queries: { ...getUserMeQueryMock(currentUser) },
        }),
      })

      await taskTableTestUtils.expectLoadingFinished()
      await fastFilterOptionTestUtils.expectLoadingFinished()
      await taskTableTestUtils.clickRow(user, task.id)
      await taskDetailsTestUtils.findContainer()
      await taskDetailsTestUtils.expectTaskLoadingFinished()

      await workGroupBlockTestUtils.clickFirstLineButton(user)
      await taskFirstLineModalTestUtils.findContainer()
      await taskFirstLineModalTestUtils.setDescription(user, fakeWord())
      await taskFirstLineModalTestUtils.clickSubmitButton(user)

      await fastFilterOptionTestUtils.expectLoadingStarted()
      await fastFilterOptionTestUtils.expectLoadingFinished()
    })

    // todo: не проходит на CI
    test.skip('Перезапрашивается при переводе на 2-ю линию', async () => {
      mockGetTaskCountersSuccess({ once: false })

      const taskListItem = taskFixtures.taskListItem()
      mockGetTasksSuccess({
        body: commonFixtures.paginatedListResponse([taskListItem]),
        once: false,
      })

      const task = taskFixtures.task({
        id: taskListItem.id,
        ...showSecondLineButtonProps,
      })
      mockGetTaskSuccess(task.id, { body: task })

      const workGroup = workGroupFixtures.workGroupListItem()
      mockGetWorkGroupsSuccess({ body: [workGroup], once: false })

      mockUpdateTaskWorkGroupSuccess(task.id)

      const currentUser = userFixtures.user({
        permissions: [UserPermissionsEnum.PutFirstLineTasksOnSecondLine],
      })
      mockGetUserActionsSuccess(currentUser.id, {
        body: userFixtures.userActions({
          tasks: {
            ...userFixtures.taskActionsPermissions,
            [TaskActionsPermissionsEnum.CanPutOnSecondLine]: [task.id],
          },
        }),
      })

      const { user } = render(<TasksPage />, {
        store: getStoreWithAuth({ id: currentUser.id }, undefined, undefined, {
          queries: { ...getUserMeQueryMock(currentUser) },
        }),
      })

      await taskTableTestUtils.expectLoadingFinished()
      await fastFilterOptionTestUtils.expectLoadingFinished()
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

      await fastFilterOptionTestUtils.expectLoadingStarted()
      await fastFilterOptionTestUtils.expectLoadingFinished()
    })

    test.skip('Перезапрашивается при взятии в работу', async () => {
      mockGetTaskCountersSuccess({ once: false })

      const taskListItem = taskFixtures.taskListItem()
      mockGetTasksSuccess({
        body: commonFixtures.paginatedListResponse([taskListItem]),
        once: false,
      })

      const task = taskFixtures.task({ id: taskListItem.id })
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
      await fastFilterOptionTestUtils.expectLoadingFinished()
      await taskTableTestUtils.clickRow(user, task.id)
      await taskDetailsTestUtils.findContainer()
      await taskDetailsTestUtils.expectTaskLoadingFinished()

      await assigneeBlockTestUtils.clickTakeTaskButton(user)

      await fastFilterOptionTestUtils.expectLoadingStarted()
      await fastFilterOptionTestUtils.expectLoadingFinished()
    })

    test.skip('Перезапрашивается при назначении заявки на себя', async () => {
      mockGetTaskCountersSuccess({ once: false })

      const taskListItem = taskFixtures.taskListItem()
      mockGetTasksSuccess({
        body: commonFixtures.paginatedListResponse([taskListItem]),
        once: false,
      })

      const task = taskFixtures.task({ id: taskListItem.id })
      mockGetTaskSuccess(task.id, { body: task, once: false })
      mockUpdateTaskAssigneeSuccess(task.id)

      const currentUser = userFixtures.user({
        permissions: activeAssignOnMeButtonProps.permissions,
      })

      mockGetUserActionsSuccess(currentUser.id, {
        body: userFixtures.userActions({
          tasks: {
            ...userFixtures.taskActionsPermissions,
            [TaskActionsPermissionsEnum.CanAssignee]: [task.id],
          },
        }),
        once: false,
      })

      const { user } = render(<TasksPage />, {
        store: getStoreWithAuth(currentUser, undefined, undefined, {
          queries: { ...getUserMeQueryMock(currentUser) },
        }),
      })

      await taskTableTestUtils.expectLoadingFinished()
      await fastFilterOptionTestUtils.expectLoadingFinished()
      await taskTableTestUtils.clickRow(user, task.id)
      await taskDetailsTestUtils.findContainer()
      await taskDetailsTestUtils.expectTaskLoadingFinished()

      await assigneeBlockTestUtils.clickAssignOnMeButton(user)

      await fastFilterOptionTestUtils.expectLoadingStarted()
      await fastFilterOptionTestUtils.expectLoadingFinished()
    })

    test.skip('Перезапрашивается при назначении исполнителя', async () => {
      mockGetTaskCountersSuccess({ once: false })

      const taskListItem = taskFixtures.taskListItem()
      mockGetTasksSuccess({
        body: commonFixtures.paginatedListResponse([taskListItem]),
        once: false,
      })

      const task = taskFixtures.task({ id: taskListItem.id })
      mockGetTaskSuccess(task.id, { body: task, once: false })
      mockUpdateTaskAssigneeSuccess(task.id)

      const currentUser = userFixtures.user({ permissions: canSelectAssigneeProps.permissions })

      mockGetUserActionsSuccess(currentUser.id, {
        body: userFixtures.userActions({
          tasks: {
            ...userFixtures.taskActionsPermissions,
            [TaskActionsPermissionsEnum.CanAssignee]: [task.id],
          },
        }),
        once: false,
      })

      const { user } = render(<TasksPage />, {
        store: getStoreWithAuth(currentUser, undefined, undefined, {
          queries: { ...getUserMeQueryMock(currentUser) },
        }),
      })

      await taskTableTestUtils.expectLoadingFinished()
      await fastFilterOptionTestUtils.expectLoadingFinished()
      await taskTableTestUtils.clickRow(user, task.id)
      await taskDetailsTestUtils.findContainer()
      await taskDetailsTestUtils.expectTaskLoadingFinished()

      await assigneeBlockTestUtils.findAssigneeSelect()
      await assigneeBlockTestUtils.openAssigneeSelect(user)
      await assigneeBlockTestUtils.setAssignee(user, getFullUserName(task.workGroup!.members[0]))
      await assigneeBlockTestUtils.clickAssignButton(user)

      await fastFilterOptionTestUtils.expectLoadingStarted()
      await fastFilterOptionTestUtils.expectLoadingFinished()
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
      const button = tasksPageTestUtils.getTasksFilterButton()

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
      await tasksPageTestUtils.clickTasksFilterButton(user)
      const filter = await tasksFilterTestUtils.findContainer()

      expect(filter).toBeInTheDocument()
    })

    // todo: не проходит на CI
    test.skip('Не активна во время загрузки заявок', async () => {
      mockGetTaskCountersSuccess()
      mockGetTasksSuccess()

      render(<TasksPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      await waitFor(() => expect(tasksPageTestUtils.getTasksFilterButton()).toBeDisabled())
      await taskTableTestUtils.expectLoadingFinished()
      await waitFor(() => expect(tasksPageTestUtils.getTasksFilterButton()).toBeEnabled())
    })
  })

  describe.skip('Расширенный фильтр', () => {
    describe('После применения', () => {
      // todo: не работает по какой-то причине, поправить
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
        await tasksPageTestUtils.clickTasksFilterButton(user)
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
        await tasksPageTestUtils.clickTasksFilterButton(user)
        const filter = await tasksFilterTestUtils.findContainer()
        await tasksFilterTestUtils.clickApplyButton(user)

        await waitFor(() => expect(filter).not.toBeInTheDocument())
      })

      // todo: не проходит на CI
      test.skip('Карточка заявки закрывается', async () => {
        mockGetUsersSuccess()
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

        await tasksPageTestUtils.clickTasksFilterButton(user)
        await tasksFilterTestUtils.findContainer()
        await tasksFilterTestUtils.clickApplyButton(user)

        await waitFor(() => expect(taskCard).not.toBeInTheDocument())
      })

      test('Быстрый фильтр счетчиков сбрасывается', async () => {
        mockGetTasksSuccess({ once: false })
        mockGetTaskCountersSuccess({ once: false })
        mockGetWorkGroupsSuccess()
        mockGetUsersSuccess()
        mockGetCustomerListSuccess()
        mockGetMacroregionsSuccess()
        mockGetSupportGroupListSuccess()

        const { user } = render(<TasksPage />, {
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
        await fastFilterOptionTestUtils.expectLoadingFinished()
        const fastFilter = fastFilterOptionTestUtils.getCheckableTag(TasksFastFilterEnum.AllLines)
        fastFilterOptionTestUtils.expectFilterChecked(fastFilter)
        await tasksPageTestUtils.clickTasksFilterButton(user)
        await tasksFilterTestUtils.findContainer()
        await tasksFilterTestUtils.clickApplyButton(user)

        await waitFor(() =>
          fastFilterOptionTestUtils.expectFilterNotChecked(
            fastFilterOptionTestUtils.getCheckableTag(TasksFastFilterEnum.AllLines),
          ),
        )
      })

      test('Быстрый фильтр заявок сбрасывается', async () => {
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
        await fastFilterOptionTestUtils.expectLoadingFinished()
        const fastFilter = fastFilterOptionTestUtils.getCheckableTag(TasksFastFilterEnum.AllLines)
        fastFilterOptionTestUtils.expectFilterChecked(fastFilter)
        await tasksPageTestUtils.clickTasksFilterButton(user)
        await tasksFilterTestUtils.findContainer()
        await tasksFilterTestUtils.clickApplyButton(user)

        await waitFor(() =>
          fastFilterOptionTestUtils.expectFilterNotChecked(
            fastFilterOptionTestUtils.getCheckableTag(TasksFastFilterEnum.AllLines),
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
        await tasksPageTestUtils.clickTasksFilterButton(user)
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
        await tasksPageTestUtils.clickTasksFilterButton(user)
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
        await tasksPageTestUtils.clickTasksFilterButton(user)
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

      // todo: не проходит на CI
      test.skip('Сохраняется фильтр групп поддержки', async () => {
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
        const button = tasksPageTestUtils.getTasksFilterButton()
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
      await tasksPageTestUtils.clickTasksFilterButton(user)
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

      await tasksPageTestUtils.clickTasksFilterButton(user)
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
        await tasksPageTestUtils.clickTasksFilterButton(user)
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
          body: workGroupFixtures.workGroups(),
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
        await tasksPageTestUtils.clickTasksFilterButton(user)
        await tasksFilterTestUtils.findContainer()
        const workGroupField = await tasksFilterTestUtils.workGroup.expectLoadingFinished()
        const selectedOption = selectTestUtils.getSelectedOption(workGroupField)

        expect(selectedOption).not.toBeInTheDocument()
      })
    })
  })

  describe('Сохраненные фильтры', () => {
    beforeEach(() => {
      taskLocalStorageService.clearTasksFilters()
    })

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

      await fastFilterOptionTestUtils.expectLoadingFinished()
      await taskTableTestUtils.expectLoadingFinished()

      const filter = tasksFiltersStorageTestUtils.getFilter('customers')
      expect(filter).toBeInTheDocument()

      await tasksFiltersStorageTestUtils.removeFilter(user, 'customers')
      expect(filter).not.toBeInTheDocument()

      await fastFilterOptionTestUtils.expectLoadingStarted()
      await taskTableTestUtils.expectLoadingStarted()
      await fastFilterOptionTestUtils.expectLoadingFinished()
      await taskTableTestUtils.expectLoadingFinished()
    })
  })

  describe.skip('Поиск заявки по номеру', () => {
    // todo: не проходит на CI
    test.skip('Поле поиска отображается корректно', async () => {
      mockGetTasksSuccess()
      mockGetTaskCountersSuccess()

      render(<TasksPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      await taskTableTestUtils.expectLoadingStarted()
      await taskTableTestUtils.expectLoadingFinished()
      const searchInput = tasksPageTestUtils.getSearchInput()

      expect(searchInput).toBeInTheDocument()
      expect(searchInput).toBeEnabled()
      expect(searchInput).not.toHaveValue()
    })

    // todo: не проходит на CI
    test.skip('Можно ввести значение', async () => {
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
      const input = await tasksPageTestUtils.setSearchValue(user, value)

      expect(input).toHaveValue(value)
    })

    // todo: не проходит на CI
    test.skip('Поле не активно во время загрузки заявок', async () => {
      mockGetTaskCountersSuccess()
      mockGetTasksSuccess()

      render(<TasksPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      await waitFor(() => expect(tasksPageTestUtils.getSearchInput()).toBeDisabled())
      await taskTableTestUtils.expectLoadingFinished()
      await waitFor(() => expect(tasksPageTestUtils.getSearchInput()).toBeEnabled())
    })

    describe('После применения', () => {
      // todo: не проходит на CI
      test.skip('Карточка заявки закрывается', async () => {
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
        await tasksPageTestUtils.setSearchValue(user, fakeWord(), true)
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
          await tasksPageTestUtils.setSearchValue(user, fakeWord())
          const button = tasksPageTestUtils.getSearchButton()
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
          await tasksPageTestUtils.setSearchValue(user, fakeWord(), true)
          await taskTableTestUtils.expectLoadingStarted()
        })
      })

      test('Кнопка открытия расширенного фильтра недоступна', async () => {
        const { user } = render(<TasksPage />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        })

        await tasksPageTestUtils.setSearchValue(user, fakeWord(), true)
        const extendedFilterButton = tasksPageTestUtils.getTasksFilterButton()
        await waitFor(() => expect(extendedFilterButton).toBeDisabled())
      })

      test('Быстрый фильтр счетчиков перестаёт быть выбранным', async () => {
        mockGetTasksSuccess()
        mockGetTaskCountersSuccess()

        const { user } = render(<TasksPage />, {
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
        await fastFilterOptionTestUtils.expectLoadingFinished()
        const fastFilter = fastFilterOptionTestUtils.getCheckableTag(TasksFastFilterEnum.AllLines)
        fastFilterOptionTestUtils.expectFilterChecked(fastFilter)
        await tasksPageTestUtils.setSearchValue(user, fakeWord(), true)

        await waitFor(() => fastFilterOptionTestUtils.expectFilterNotChecked(fastFilter))
      })

      test('Быстрый фильтр заявок перестаёт быть выбранным', async () => {
        mockGetTasksSuccess()
        mockGetTaskCountersSuccess()

        const { user } = render(<TasksPage />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        })

        await taskTableTestUtils.expectLoadingFinished()
        await fastFilterOptionTestUtils.expectLoadingFinished()
        const fastFilter = fastFilterOptionTestUtils.getCheckableTag(TasksFastFilterEnum.AllLines)
        fastFilterOptionTestUtils.expectFilterChecked(fastFilter)
        await tasksPageTestUtils.setSearchValue(user, fakeWord(), true)

        await waitFor(() => fastFilterOptionTestUtils.expectFilterNotChecked(fastFilter))
      })
    })

    describe('Очищение поля через клавиатуру', () => {
      // todo: не проходит на CI
      test.skip('Применяет быстрый фильтр счетчиков если он был применён ранее', async () => {
        mockGetTasksSuccess({ once: false })
        mockGetTaskCountersSuccess()

        const { user } = render(<TasksPage />, {
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
        await fastFilterOptionTestUtils.expectLoadingFinished()

        const input = await tasksPageTestUtils.setSearchValue(user, fakeWord({ length: 1 }), true)

        const fastFilter = fastFilterOptionTestUtils.getCheckableTag(TasksFastFilterEnum.SecondLine)

        await waitFor(() => fastFilterOptionTestUtils.expectFilterNotChecked(fastFilter))
        await waitFor(() => expect(input).toBeEnabled())
        await user.clear(input)
        await taskTableTestUtils.expectLoadingStarted()
        await taskTableTestUtils.expectLoadingFinished()
        await waitFor(() => fastFilterOptionTestUtils.expectFilterChecked(fastFilter))
      })

      test.skip('Применяет быстрый фильтр заявок если он был применён ранее', async () => {
        mockGetTasksSuccess({ once: false })
        mockGetTaskCountersSuccess()

        const { user } = render(<TasksPage />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        })

        await taskTableTestUtils.expectLoadingFinished()
        await fastFilterOptionTestUtils.expectLoadingFinished()

        const input = await tasksPageTestUtils.setSearchValue(user, fakeWord({ length: 1 }), true)

        const fastFilter = fastFilterOptionTestUtils.getCheckableTag(TasksFastFilterEnum.Free)

        await waitFor(() => fastFilterOptionTestUtils.expectFilterNotChecked(fastFilter))
        await waitFor(() => expect(input).toBeEnabled())
        await user.clear(input)
        await taskTableTestUtils.expectLoadingStarted()
        await taskTableTestUtils.expectLoadingFinished()
        await waitFor(() => fastFilterOptionTestUtils.expectFilterChecked(fastFilter))
      })

      // todo: не проходит на CI
      test.skip('Делает кнопку открытия расширенного фильтра активной', async () => {
        mockGetTasksSuccess({ once: false })
        mockGetTaskCountersSuccess()

        const { user } = render(<TasksPage />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        })

        await taskTableTestUtils.expectLoadingStarted()
        await taskTableTestUtils.expectLoadingFinished()
        const button = tasksPageTestUtils.getTasksFilterButton()
        expect(button).toBeEnabled()

        const input = await tasksPageTestUtils.setSearchValue(user, fakeWord(), true)
        await waitFor(() => expect(button).toBeDisabled())
        await waitFor(() => expect(input).toBeEnabled())
        await user.clear(input)
        await waitFor(() => expect(button).toBeEnabled())
      })

      // todo: не проходит на CI
      test.skip('Применяет расширенный фильтр если он был применён ранее', async () => {
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
        await tasksPageTestUtils.clickTasksFilterButton(user)
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

        const searchInput = await tasksPageTestUtils.setSearchValue(
          user,
          fakeWord({ length: 1 }),
          true,
        )
        await taskTableTestUtils.expectLoadingFinished()
        await user.clear(searchInput)
        await taskTableTestUtils.expectLoadingFinished()

        await tasksPageTestUtils.clickTasksFilterButton(user)
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

        const input = await tasksPageTestUtils.setSearchValue(user, fakeWord())
        await tasksPageTestUtils.clickSearchClearButton(user)

        expect(input).not.toHaveValue()
      })

      // todo: не проходит на CI
      test.skip('Применяет быстрый фильтр счетчиков если он был применён ранее', async () => {
        mockGetTasksSuccess({ once: false })
        mockGetTaskCountersSuccess({ body: taskFixtures.taskCounters() })

        const { user } = render(<TasksPage />, {
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

        await taskTableTestUtils.expectLoadingStarted()
        await taskTableTestUtils.expectLoadingFinished()
        await fastFilterOptionTestUtils.expectLoadingFinished()
        await tasksPageTestUtils.setSearchValue(user, fakeWord(), true)
        const fastFilter = fastFilterOptionTestUtils.getCheckableTag(TasksFastFilterEnum.FirstLine)
        await waitFor(() => fastFilterOptionTestUtils.expectFilterNotChecked(fastFilter))
        await tasksPageTestUtils.clickSearchClearButton(user)
        await taskTableTestUtils.expectLoadingStarted()
        await taskTableTestUtils.expectLoadingFinished()
        await waitFor(() => fastFilterOptionTestUtils.expectFilterChecked(fastFilter))
      })

      // todo: не проходит на CI
      test.skip('Применяет быстрый фильтр заявок если он был применён ранее', async () => {
        mockGetTasksSuccess({ once: false })
        mockGetTaskCountersSuccess({ body: taskFixtures.taskCounters() })

        const { user } = render(<TasksPage />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        })

        await taskTableTestUtils.expectLoadingStarted()
        await taskTableTestUtils.expectLoadingFinished()
        await fastFilterOptionTestUtils.expectLoadingFinished()
        await tasksPageTestUtils.setSearchValue(user, fakeWord(), true)
        const fastFilter = fastFilterOptionTestUtils.getCheckableTag(TasksFastFilterEnum.Free)
        await waitFor(() => fastFilterOptionTestUtils.expectFilterNotChecked(fastFilter))
        await tasksPageTestUtils.clickSearchClearButton(user)
        await taskTableTestUtils.expectLoadingStarted()
        await taskTableTestUtils.expectLoadingFinished()
        await waitFor(() => fastFilterOptionTestUtils.expectFilterChecked(fastFilter))
      })

      // todo: не проходит на CI
      test.skip('Делает кнопку открытия расширенного фильтра активной', async () => {
        mockGetTasksSuccess({ once: false })
        mockGetTaskCountersSuccess()

        const { user } = render(<TasksPage />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        })

        await taskTableTestUtils.expectLoadingStarted()
        await taskTableTestUtils.expectLoadingFinished()
        const extendedFilterButton = tasksPageTestUtils.getTasksFilterButton()
        await waitFor(() => expect(extendedFilterButton).toBeEnabled())
        await tasksPageTestUtils.setSearchValue(user, fakeWord(), true)
        await waitFor(() => expect(extendedFilterButton).toBeDisabled())
        await tasksPageTestUtils.clickSearchClearButton(user)
        await taskTableTestUtils.expectLoadingStarted()
        await taskTableTestUtils.expectLoadingFinished()
        await waitFor(() => expect(extendedFilterButton).toBeEnabled())
      })

      // todo: не проходит на CI
      test.skip('Применяет расширенный фильтр если он был применён ранее', async () => {
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
        await tasksPageTestUtils.clickTasksFilterButton(user)
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

        await tasksPageTestUtils.setSearchValue(user, fakeWord(), true)
        await taskTableTestUtils.expectLoadingFinished()
        await tasksPageTestUtils.clickSearchClearButton(user)
        await taskTableTestUtils.expectLoadingStarted()
        await taskTableTestUtils.expectLoadingFinished()

        await waitFor(() => expect(tasksPageTestUtils.getTasksFilterButton()).toBeEnabled())
        await tasksPageTestUtils.clickTasksFilterButton(user)
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

  describe.skip('Кнопка обновления заявок', () => {
    test('Отображается корректно', async () => {
      mockGetTasksSuccess()
      mockGetTaskCountersSuccess()

      render(<TasksPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      await taskTableTestUtils.expectLoadingFinished()
      const button = tasksPageTestUtils.getUpdateTasksButton()

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
      await tasksPageTestUtils.clickUpdateTasksButton(user)
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
      await fastFilterOptionTestUtils.expectLoadingFinished()
      await tasksPageTestUtils.clickUpdateTasksButton(user)
      await fastFilterOptionTestUtils.expectLoadingStarted()
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
      await tasksPageTestUtils.clickUpdateTasksButton(user)
      await waitFor(() => expect(taskCard).not.toBeInTheDocument())
    })

    // todo: не проходит на CI
    test.skip('Не активна во время загрузки заявок', async () => {
      mockGetTaskCountersSuccess()
      mockGetTasksSuccess()

      render(<TasksPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      await waitFor(() => expect(tasksPageTestUtils.getUpdateTasksButton()).toBeDisabled())
      await taskTableTestUtils.expectLoadingFinished()
      await waitFor(() => expect(tasksPageTestUtils.getUpdateTasksButton()).toBeEnabled())
    })

    // todo: не проходит на CI
    test.skip('Автообновление работает', async () => {
      mockGetTaskCountersSuccess({ once: false })
      mockGetTasksSuccess({ once: false })

      const { user } = render(<TasksPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      await fastFilterOptionTestUtils.expectLoadingFinished()
      await taskTableTestUtils.expectLoadingFinished()
      await updateTasksButtonTestUtils.openDropdown(user, taskTableTestUtils.getContainer())
      await updateTasksButtonTestUtils.clickAutoUpdateItem(user)
      await taskTableTestUtils.expectLoadingStarted()
      await fastFilterOptionTestUtils.expectLoadingStarted()
    })
  })

  describe.skip('Кнопка создания заявки', () => {
    test('Отображается корректно', () => {
      mockGetTaskCountersSuccess()
      mockGetTasksSuccess()

      render(<TasksPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      const button = tasksPageTestUtils.getCreateTaskButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })
  })

  describe.skip('Таблица заявок', () => {
    // todo: не проходит на CI
    test.skip('Отображается корректно', async () => {
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
      // todo: не проходит на CI
      test.skip('Ей добавляется новый класс', async () => {
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

      // todo: не проходит на CI
      test.skip('Открывается карточка заявки', async () => {
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

    // todo: не проходит на CI
    test.skip('Колонка - заявка. После сортировки список отображается корректно', async () => {
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

    // todo: не проходит на CI
    test.skip('Колонка - внешний номер. После сортировки список отображается корректно', async () => {
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

    // todo: не проходит на CI
    test.skip('Колонка - дата создания. После сортировки список отображается корректно', async () => {
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
