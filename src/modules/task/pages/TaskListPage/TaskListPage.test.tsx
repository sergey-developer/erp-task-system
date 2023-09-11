import { screen, waitFor, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { testUtils as extendedFilterTestUtils } from 'modules/task/components/ExtendedFilter/ExtendedFilter.test'
import {
  searchFieldDict,
  taskAssignedDict,
  taskOverdueDict,
} from 'modules/task/components/ExtendedFilter/constants'
import { testUtils as fastFilterListTestUtils } from 'modules/task/components/FastFilterList/FastFilterList.test'
import { FastFilterEnum } from 'modules/task/components/FastFilterList/constants'
import { testUtils as taskCardTestUtils } from 'modules/task/components/TaskCard/Card/Card.test'
import { testUtils as taskTableTestUtils } from 'modules/task/components/TaskTable/TaskTable.test'
import { paginationConfig } from 'modules/task/components/TaskTable/constants/pagination'
import { taskExtendedStatusDict } from 'modules/task/constants'
import { TaskCountersKeys } from 'modules/task/models'
import { UserRoleEnum } from 'modules/user/constants'

import taskFixtures from '_tests_/fixtures/task'
import userFixtures from '_tests_/fixtures/user'
import workGroupFixtures from '_tests_/fixtures/workGroup'

import {
  mockGetTaskCountersSuccess,
  mockGetTaskListSuccess,
  mockGetTaskSuccess,
  mockGetUserListSuccess,
  mockGetWorkGroupListSuccess,
} from '_tests_/mocks/api'
import {
  fakeWord,
  selectTestUtils,
  getStoreWithAuth,
  render,
  setupApiTests,
  buttonTestUtils,
} from '_tests_/utils'

import { DEFAULT_PAGE_SIZE } from './constants'
import TaskListPage from './index'

const getContainer = () => screen.getByTestId('task-list-page')

const getSearchInput = () => within(getContainer()).getByPlaceholderText('Искать заявку по номеру')

const getSearchButton = () => buttonTestUtils.getButtonIn(getContainer(), /search/)

const getSearchClearButton = () => buttonTestUtils.getButtonIn(getContainer(), 'close-circle')

const clickSearchClearButton = async (user: UserEvent) => {
  const button = getSearchClearButton()
  await user.click(button)
  return button
}

const getReloadListButton = () => buttonTestUtils.getButtonIn(getContainer(), /sync/)

const clickReloadListButton = async (user: UserEvent) => {
  const button = getReloadListButton()
  await user.click(button)
  return button
}

const getCreateTaskButton = () => buttonTestUtils.getButtonIn(getContainer(), /создать заявку/i)

const getExtendedFilterButton = () => buttonTestUtils.getButtonIn(getContainer(), /filter/)

const openExtendedFilter = async (user: UserEvent) => {
  const extendedFilterButton = getExtendedFilterButton()
  await user.click(extendedFilterButton)
  return extendedFilterButton
}

const setSearchValue = async (user: UserEvent, value: string, pressEnter: boolean = false) => {
  const input = getSearchInput()
  await user.type(input, pressEnter ? value.concat('{enter}') : value)
  return input
}

export const testUtils = {
  getContainer,

  getSearchInput,
  setSearchValue,

  getSearchButton,

  getSearchClearButton,
  clickSearchClearButton,

  getReloadListButton,
  clickReloadListButton,

  getCreateTaskButton,

  getExtendedFilterButton,
  openExtendedFilter,
}

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

      await fastFilterListTestUtils.expectLoadingFinished()
      await taskTableTestUtils.expectLoadingStarted()
      fastFilterListTestUtils.expectAllFiltersDisabled()
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
        const counterName = filter.toLowerCase()
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

      const userListItem = userFixtures.userListItem()
      mockGetUserListSuccess({ body: [userListItem], once: false })

      const { user } = render(<TaskListPage />, {
        store: getStoreWithAuth({
          userRole: UserRoleEnum.SeniorEngineer,
        }),
      })

      await fastFilterListTestUtils.expectLoadingFinished()
      await taskTableTestUtils.expectLoadingFinished()

      await testUtils.openExtendedFilter(user)
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

      await extendedFilterTestUtils.applyFilter(user)
      await taskTableTestUtils.expectLoadingStarted()
      await taskTableTestUtils.expectLoadingFinished()

      await fastFilterListTestUtils.setFilter(user, FastFilterEnum.Free)
      await taskTableTestUtils.expectLoadingStarted()
      await taskTableTestUtils.expectLoadingFinished()

      await testUtils.openExtendedFilter(user)
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

      await taskTableTestUtils.expectLoadingFinished()
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
      expect(button).toBeEnabled()
    })

    test('Открывает расширенный фильтр', async () => {
      mockGetUserListSuccess()
      mockGetTaskListSuccess()
      mockGetTaskCountersSuccess()
      mockGetWorkGroupListSuccess()

      const { user } = render(<TaskListPage />)

      await taskTableTestUtils.expectLoadingFinished()
      await testUtils.openExtendedFilter(user)
      const filter = await extendedFilterTestUtils.findContainer()

      expect(filter).toBeInTheDocument()
    })

    test('Не активна во время загрузки заявок', async () => {
      mockGetTaskCountersSuccess()
      mockGetTaskListSuccess()

      render(<TaskListPage />, { store: getStoreWithAuth() })

      const button = testUtils.getExtendedFilterButton()
      await taskTableTestUtils.expectLoadingStarted()
      expect(button).toBeDisabled()
      await taskTableTestUtils.expectLoadingFinished()
      expect(button).toBeEnabled()
    })
  })

  describe('Расширенный фильтр', () => {
    describe('После применения', () => {
      test('Отправляется запрос', async () => {
        mockGetTaskListSuccess({ once: false })
        mockGetTaskCountersSuccess()
        mockGetWorkGroupListSuccess()
        mockGetUserListSuccess()

        const { user } = render(<TaskListPage />, { store: getStoreWithAuth() })

        await taskTableTestUtils.expectLoadingFinished()
        await testUtils.openExtendedFilter(user)
        await extendedFilterTestUtils.findContainer()
        await extendedFilterTestUtils.applyFilter(user)
        await taskTableTestUtils.expectLoadingStarted()
      })

      test('Фильтр закрывается', async () => {
        mockGetUserListSuccess()
        mockGetTaskListSuccess()
        mockGetTaskCountersSuccess()
        mockGetWorkGroupListSuccess()

        const { user } = render(<TaskListPage />)

        await taskTableTestUtils.expectLoadingFinished()
        await testUtils.openExtendedFilter(user)
        const filter = await extendedFilterTestUtils.findContainer()
        await extendedFilterTestUtils.applyFilter(user)

        await waitFor(() => {
          expect(filter).not.toBeInTheDocument()
        })
      })

      test('Карточка заявки закрывается', async () => {
        mockGetWorkGroupListSuccess()
        mockGetTaskCountersSuccess()
        mockGetUserListSuccess()

        const taskListItem = taskFixtures.taskListItem()
        mockGetTaskListSuccess({
          body: taskFixtures.taskListResponse([taskListItem]),
          once: false,
        })
        mockGetTaskSuccess(taskListItem.id)

        const { user } = render(<TaskListPage />, { store: getStoreWithAuth() })

        await taskTableTestUtils.expectLoadingFinished()
        await taskTableTestUtils.clickRow(user, taskListItem.id)
        const taskCard = await taskCardTestUtils.findContainer()

        await testUtils.openExtendedFilter(user)
        await extendedFilterTestUtils.findContainer()
        await extendedFilterTestUtils.applyFilter(user)

        await waitFor(() => {
          expect(taskCard).not.toBeInTheDocument()
        })
      })

      test('Быстрый фильтр сбрасывается', async () => {
        mockGetUserListSuccess()
        mockGetTaskListSuccess()
        mockGetTaskCountersSuccess()
        mockGetWorkGroupListSuccess()

        const { user } = render(<TaskListPage />, { store: getStoreWithAuth() })

        await taskTableTestUtils.expectLoadingFinished()
        await fastFilterListTestUtils.expectLoadingFinished()
        const fastFilter = fastFilterListTestUtils.getCheckableTag(FastFilterEnum.FirstLine)
        fastFilterListTestUtils.expectFilterChecked(fastFilter)
        await testUtils.openExtendedFilter(user)
        await extendedFilterTestUtils.findContainer()
        await extendedFilterTestUtils.applyFilter(user)

        await waitFor(() => {
          fastFilterListTestUtils.expectFilterNotChecked(fastFilter)
        })
      })

      test('Закрывается нажав кнопку закрытия', async () => {
        mockGetUserListSuccess()
        mockGetWorkGroupListSuccess()
        mockGetTaskCountersSuccess()
        mockGetTaskListSuccess()

        const { user } = render(<TaskListPage />)

        await taskTableTestUtils.expectLoadingFinished()
        await testUtils.openExtendedFilter(user)
        const filter = await extendedFilterTestUtils.findContainer()
        await extendedFilterTestUtils.closeFilter(user)

        await waitFor(() => {
          expect(filter).not.toBeInTheDocument()
        })
      })

      test('Закрывается нажав вне фильтра', async () => {
        mockGetUserListSuccess()
        mockGetWorkGroupListSuccess()
        mockGetTaskCountersSuccess()
        mockGetTaskListSuccess()

        const { user } = render(<TaskListPage />)

        await taskTableTestUtils.expectLoadingFinished()
        await testUtils.openExtendedFilter(user)
        const filter = await extendedFilterTestUtils.findContainer()
        await extendedFilterTestUtils.clickOutOfFilter(user)

        await waitFor(() => {
          expect(filter).not.toBeInTheDocument()
        })
      })

      test('Значения сохраняются если другой фильтр не применялся', async () => {
        const workGroupListItem = workGroupFixtures.workGroupListItem()
        mockGetWorkGroupListSuccess({ body: [workGroupListItem], once: false })
        mockGetTaskCountersSuccess()
        mockGetTaskListSuccess({ once: false })

        const userListItem = userFixtures.userListItem()
        mockGetUserListSuccess({ body: [userListItem], once: false })

        const { user } = render(<TaskListPage />, {
          store: getStoreWithAuth({ userRole: UserRoleEnum.SeniorEngineer }),
        })

        await taskTableTestUtils.expectLoadingFinished()
        await testUtils.openExtendedFilter(user)
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

        await extendedFilterTestUtils.applyFilter(user)
        await taskTableTestUtils.expectLoadingStarted()
        await taskTableTestUtils.expectLoadingFinished()
        await testUtils.openExtendedFilter(user)
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

    test('Значения не сохраняются если фильтр не был применён', async () => {
      const workGroupListItem = workGroupFixtures.workGroupListItem()
      mockGetWorkGroupListSuccess({ body: [workGroupListItem], once: false })
      mockGetTaskCountersSuccess()
      mockGetTaskListSuccess()

      const userListItem = userFixtures.userListItem()
      mockGetUserListSuccess({ body: [userListItem], once: false })

      const { user } = render(<TaskListPage />, {
        store: getStoreWithAuth({ userRole: UserRoleEnum.SeniorEngineer }),
      })

      await taskTableTestUtils.expectLoadingFinished()
      await testUtils.openExtendedFilter(user)
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

      await testUtils.openExtendedFilter(user)
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

        const { user } = render(<TaskListPage />)

        await taskTableTestUtils.expectLoadingFinished()
        await testUtils.openExtendedFilter(user)
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
        mockGetWorkGroupListSuccess({
          body: workGroupFixtures.workGroupList(),
        })

        const { user } = render(<TaskListPage />, {
          store: getStoreWithAuth({
            userRole: UserRoleEnum.SeniorEngineer,
          }),
        })

        await taskTableTestUtils.expectLoadingFinished()
        await testUtils.openExtendedFilter(user)
        await extendedFilterTestUtils.findContainer()

        const workGroupField = await extendedFilterTestUtils.workGroup.expectLoadingFinished()

        const selectedOption = selectTestUtils.getSelectedOption(workGroupField)

        expect(selectedOption).not.toBeInTheDocument()
      })
    })
  })

  describe('Поиск заявки по номеру', () => {
    test('Поле поиска отображается корректно', async () => {
      mockGetTaskListSuccess()
      mockGetTaskCountersSuccess()

      render(<TaskListPage />)

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

      await taskTableTestUtils.expectLoadingFinished()
      const value = fakeWord()
      const input = await testUtils.setSearchValue(user, value)

      expect(input).toHaveValue(value)
    })

    test('Поле не активно во время загрузки заявок', async () => {
      mockGetTaskCountersSuccess()
      mockGetTaskListSuccess()

      render(<TaskListPage />, { store: getStoreWithAuth() })

      const searchInput = testUtils.getSearchInput()
      await taskTableTestUtils.expectLoadingStarted()
      expect(searchInput).toBeDisabled()
      await taskTableTestUtils.expectLoadingFinished()
      expect(searchInput).toBeEnabled()
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

        await taskTableTestUtils.expectLoadingFinished()
        await taskTableTestUtils.clickRow(user, taskListItem.id)
        const taskCard = await taskCardTestUtils.findContainer()
        await testUtils.setSearchValue(user, fakeWord(), true)
        await waitFor(() => {
          expect(taskCard).not.toBeInTheDocument()
        })
      })

      describe('Отправляется запрос', () => {
        test('При нажатии на кнопку поиска', async () => {
          mockGetTaskCountersSuccess()
          mockGetTaskListSuccess({ once: false })

          const { user } = render(<TaskListPage />, {
            store: getStoreWithAuth(),
          })

          await taskTableTestUtils.expectLoadingFinished()
          await testUtils.setSearchValue(user, fakeWord())
          await user.click(testUtils.getSearchButton())
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
        mockGetTaskListSuccess()
        mockGetTaskCountersSuccess()

        const { user } = render(<TaskListPage />, { store: getStoreWithAuth() })

        await taskTableTestUtils.expectLoadingFinished()
        await fastFilterListTestUtils.expectLoadingFinished()

        const input = await testUtils.setSearchValue(user, fakeWord({ length: 1 }), true)

        const fastFilter = fastFilterListTestUtils.getCheckableTag(FastFilterEnum.FirstLine)

        await waitFor(() => {
          fastFilterListTestUtils.expectFilterNotChecked(fastFilter)
        })

        await user.clear(input)

        await waitFor(() => {
          fastFilterListTestUtils.expectFilterChecked(fastFilter)
        })
      })

      test('Делает кнопку открытия расширенного фильтра активной', async () => {
        mockGetTaskListSuccess()
        mockGetTaskCountersSuccess()

        const { user } = render(<TaskListPage />)

        await taskTableTestUtils.expectLoadingFinished()
        const button = testUtils.getExtendedFilterButton()
        expect(button).toBeEnabled()

        const input = await testUtils.setSearchValue(user, fakeWord(), true)
        await waitFor(() => {
          expect(button).toBeDisabled()
        })

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

        const userListItem = userFixtures.userListItem()
        mockGetUserListSuccess({ body: [userListItem], once: false })

        const { user } = render(<TaskListPage />, {
          store: getStoreWithAuth({ userRole: UserRoleEnum.SeniorEngineer }),
        })

        await taskTableTestUtils.expectLoadingStarted()
        await taskTableTestUtils.expectLoadingFinished()
        await testUtils.openExtendedFilter(user)
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

        await extendedFilterTestUtils.applyFilter(user)
        await taskTableTestUtils.expectLoadingStarted()
        await taskTableTestUtils.expectLoadingFinished()

        const searchInput = await testUtils.setSearchValue(user, fakeWord({ length: 1 }), true)
        await taskTableTestUtils.expectLoadingStarted()
        await taskTableTestUtils.expectLoadingFinished()
        await user.clear(searchInput)
        await taskTableTestUtils.expectLoadingStarted()
        await taskTableTestUtils.expectLoadingFinished()

        await testUtils.openExtendedFilter(user)
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
        mockGetTaskListSuccess()
        mockGetTaskCountersSuccess()

        const { user } = render(<TaskListPage />)

        await taskTableTestUtils.expectLoadingFinished()
        const extendedFilterButton = testUtils.getExtendedFilterButton()
        expect(extendedFilterButton).toBeEnabled()

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

        const userListItem = userFixtures.userListItem()
        mockGetUserListSuccess({ body: [userListItem], once: false })

        const { user } = render(<TaskListPage />, {
          store: getStoreWithAuth({ userRole: UserRoleEnum.SeniorEngineer }),
        })

        await taskTableTestUtils.expectLoadingStarted()
        await taskTableTestUtils.expectLoadingFinished()
        await testUtils.openExtendedFilter(user)
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

        await extendedFilterTestUtils.applyFilter(user)
        await taskTableTestUtils.expectLoadingStarted()
        await taskTableTestUtils.expectLoadingFinished()

        await testUtils.setSearchValue(user, fakeWord(), true)
        await taskTableTestUtils.expectLoadingStarted()
        await taskTableTestUtils.expectLoadingFinished()
        await testUtils.clickSearchClearButton(user)
        await taskTableTestUtils.expectLoadingStarted()
        await taskTableTestUtils.expectLoadingFinished()

        await testUtils.openExtendedFilter(user)
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
  })

  describe('Кнопка обновления заявок', () => {
    test('Отображается корректно', async () => {
      mockGetTaskListSuccess()
      mockGetTaskCountersSuccess()

      render(<TaskListPage />)

      await taskTableTestUtils.expectLoadingFinished()
      const button = testUtils.getReloadListButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Перезагружает заявки', async () => {
      mockGetTaskCountersSuccess({ once: false })
      mockGetTaskListSuccess({ once: false })

      const { user } = render(<TaskListPage />, {
        store: getStoreWithAuth(),
      })

      await taskTableTestUtils.expectLoadingFinished()
      await testUtils.clickReloadListButton(user)
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
      await testUtils.clickReloadListButton(user)
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

      await taskTableTestUtils.expectLoadingFinished()
      await taskTableTestUtils.clickRow(user, taskListItem.id)
      const taskCard = await taskCardTestUtils.findContainer()
      await testUtils.clickReloadListButton(user)

      await waitFor(() => {
        expect(taskCard).not.toBeInTheDocument()
      })
    })

    test('Не активна во время загрузки заявок', async () => {
      mockGetTaskCountersSuccess()
      mockGetTaskListSuccess()

      render(<TaskListPage />, { store: getStoreWithAuth() })

      const button = testUtils.getReloadListButton()
      await taskTableTestUtils.expectLoadingStarted()
      expect(button).toBeDisabled()
      await taskTableTestUtils.expectLoadingFinished()
      expect(button).toBeEnabled()
    })
  })

  describe('Кнопка создания заявки', () => {
    test('Отображается корректно', () => {
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
      })

      describe('Статус', () => {
        test.skip('После сортировки список отображается корректно', async () => {
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
          await taskTableTestUtils.clickColTitle(user, 'Статус')

          taskList.forEach((item) => {
            const row = taskTableTestUtils.getRow(item.id)
            expect(row).toBeInTheDocument()
          })
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

    describe('Пагинация', () => {
      describe('Отправляется запрос', () => {
        test('При клике на кнопку "Вперед"', async () => {
          mockGetTaskCountersSuccess()
          mockGetTaskListSuccess({
            once: false,
            body: taskFixtures.taskListResponse(taskFixtures.taskList(DEFAULT_PAGE_SIZE + 1)),
          })

          const { user } = render(<TaskListPage />, {
            store: getStoreWithAuth(),
          })

          await taskTableTestUtils.expectLoadingFinished()
          await taskTableTestUtils.clickPaginationNextButton(user)
          await taskTableTestUtils.expectLoadingStarted()
        })

        test('При клике на кнопку "Назад"', async () => {
          mockGetTaskCountersSuccess()
          mockGetTaskListSuccess({
            once: false,
            body: taskFixtures.taskListResponse(taskFixtures.taskList(DEFAULT_PAGE_SIZE + 1)),
          })

          const { user } = render(<TaskListPage />, {
            store: getStoreWithAuth(),
          })

          await taskTableTestUtils.expectLoadingFinished()
          await taskTableTestUtils.clickPaginationNextButton(user)
          await taskTableTestUtils.expectLoadingFinished()
          await taskTableTestUtils.clickPaginationPrevButton(user)
          await taskTableTestUtils.expectLoadingStarted()
        })

        test('При переходе на след. страницу', async () => {
          mockGetTaskCountersSuccess()
          mockGetTaskListSuccess({
            once: false,
            body: taskFixtures.taskListResponse(taskFixtures.taskList(DEFAULT_PAGE_SIZE + 1)),
          })

          const { user } = render(<TaskListPage />, {
            store: getStoreWithAuth(),
          })

          await taskTableTestUtils.expectLoadingFinished()
          await taskTableTestUtils.clickPaginationPageButton(user, '2')
          await taskTableTestUtils.expectLoadingStarted()
        })

        test('При смене размера страницы', async () => {
          mockGetTaskCountersSuccess()
          mockGetTaskListSuccess({
            once: false,
            body: taskFixtures.taskListResponse(taskFixtures.taskList(DEFAULT_PAGE_SIZE + 1)),
          })

          const { user } = render(<TaskListPage />, {
            store: getStoreWithAuth(),
          })

          await taskTableTestUtils.expectLoadingFinished()
          await taskTableTestUtils.changePageSize(user, paginationConfig.pageSizeOptions[0])
          await taskTableTestUtils.expectLoadingStarted()
        })
      })
    })
  })
})
