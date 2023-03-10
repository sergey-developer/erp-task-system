import { screen, waitFor, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { taskExtendedStatusDict } from 'modules/task/constants/dictionary'
import { testUtils as extendedFilterTestUtils } from 'modules/task/features/ExtendedFilter/ExtendedFilter.test'
import {
  searchFieldDict,
  taskAssignedDict,
  taskOverdueDict,
} from 'modules/task/features/ExtendedFilter/constants'
import { testUtils as fastFilterTestUtils } from 'modules/task/features/FastFilter/FastFilter.test'
import { FastFilterEnum } from 'modules/task/features/FastFilter/constants'
import { testUtils as taskCardTestUtils } from 'modules/task/features/TaskCard/Card/Card.test'
import { testUtils as taskTableTestUtils } from 'modules/task/features/TaskTable/TaskTable.test'
import { paginationConfig } from 'modules/task/features/TaskTable/constants/pagination'
import { GetTaskCountersSuccessResponse } from 'modules/task/models'

import { UserRoleEnum } from 'shared/constants/roles'

import taskFixtures from 'fixtures/task'
import workGroupFixtures from 'fixtures/workGroup'

import {
  mockGetTaskCountersSuccess,
  mockGetTaskListSuccess,
  mockGetTaskSuccess,
  mockGetWorkGroupListSuccess,
} from '_tests_/mocks/api'
import {
  generateWord,
  getButtonIn,
  getSelectedOption,
  getStoreWithAuth,
  render,
  setupApiTests,
} from '_tests_/utils'

import { DEFAULT_PAGE_SIZE } from './constants'
import TaskListPage from './index'

setupApiTests()

const getContainer = () => screen.getByTestId('page-task-list')

const getSearchInput = () =>
  within(getContainer()).getByPlaceholderText('Искать заявку по номеру')

const getSearchButton = () => getButtonIn(getContainer(), /search/)

const getSearchClearButton = () => getButtonIn(getContainer(), 'close-circle')

const clickSearchClearButton = async (user: UserEvent) => {
  const button = getSearchClearButton()
  await user.click(button)
  return button
}

const getReloadListButton = () => getButtonIn(getContainer(), /sync/)

const clickReloadListButton = async (user: UserEvent) => {
  const button = getReloadListButton()
  await user.click(button)
  return button
}

const getCreateTaskButton = () => getButtonIn(getContainer(), /создать заявку/i)

const getExtendedFilterButton = () => getButtonIn(getContainer(), /filter/)

const openExtendedFilter = async (user: UserEvent) => {
  const extendedFilterButton = getExtendedFilterButton()
  await user.click(extendedFilterButton)
  return extendedFilterButton
}

const setSearchValue = async (
  user: UserEvent,
  value: string,
  pressEnter: boolean = false,
) => {
  const input = getSearchInput()
  await user.type(input, pressEnter ? value.concat('{enter}') : value)
  return input
}

const clearSearchFieldByBackspace = async (
  user: UserEvent,
  input: HTMLElement,
) => {
  await user.type(input, '{backspace}')
}

const testUtils = {
  getContainer,

  getSearchInput,
  setSearchValue,

  getSearchButton,

  getSearchClearButton,
  clickSearchClearButton,

  clearSearchFieldByBackspace,

  getReloadListButton,
  clickReloadListButton,

  getCreateTaskButton,

  getExtendedFilterButton,
  openExtendedFilter,
}

describe('Страница реестра заявок', () => {
  test('Отображается корректно', () => {
    render(<TaskListPage />)
    expect(testUtils.getContainer()).toBeInTheDocument()
  })

  describe('Быстрый фильтр', () => {
    test('Отображается', () => {
      render(<TaskListPage />)
      expect(fastFilterTestUtils.getContainer()).toBeInTheDocument()
    })

    test('Не активный во время загрузки заявок', async () => {
      mockGetTaskCountersSuccess()
      mockGetTaskListSuccess()

      render(<TaskListPage />, { store: getStoreWithAuth() })

      await fastFilterTestUtils.expectLoadingFinished()
      await taskTableTestUtils.expectLoadingStarted()
      fastFilterTestUtils.expectAllFiltersDisabled()
      await taskTableTestUtils.expectLoadingFinished()
      fastFilterTestUtils.expectAllFiltersNotDisabled()
    })

    test('Количество заявок отображается корректно', async () => {
      const taskCountersResponse = taskFixtures.getTaskCountersResponse()
      mockGetTaskCountersSuccess({ body: taskCountersResponse })
      mockGetTaskListSuccess()

      render(<TaskListPage />, { store: getStoreWithAuth() })

      await fastFilterTestUtils.expectLoadingFinished()

      Object.values(FastFilterEnum).forEach((filter) => {
        const counterName = filter.toLowerCase()
        const taskCount =
          taskCountersResponse[
            counterName as keyof GetTaskCountersSuccessResponse
          ]

        const counter = fastFilterTestUtils.getByTextInCheckableTag(
          filter,
          taskCount,
        )

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
        await fastFilterTestUtils.expectLoadingFinished()

        fastFilterTestUtils.expectFilterChecked(
          fastFilterTestUtils.getCheckableTag(FastFilterEnum.All),
        )
      })

      test(`Роль - ${UserRoleEnum.Engineer}`, async () => {
        mockGetTaskCountersSuccess()
        mockGetTaskListSuccess()

        render(<TaskListPage />, {
          store: getStoreWithAuth({ userRole: UserRoleEnum.Engineer }),
        })

        await taskTableTestUtils.expectLoadingFinished()
        await fastFilterTestUtils.expectLoadingFinished()

        fastFilterTestUtils.expectFilterChecked(
          fastFilterTestUtils.getCheckableTag(FastFilterEnum.Mine),
        )
      })

      test(`Роль - ${UserRoleEnum.SeniorEngineer}`, async () => {
        mockGetTaskCountersSuccess()
        mockGetTaskListSuccess()

        render(<TaskListPage />, {
          store: getStoreWithAuth({ userRole: UserRoleEnum.SeniorEngineer }),
        })

        await taskTableTestUtils.expectLoadingFinished()
        await fastFilterTestUtils.expectLoadingFinished()

        fastFilterTestUtils.expectFilterChecked(
          fastFilterTestUtils.getCheckableTag(FastFilterEnum.All),
        )
      })

      test(`Роль - ${UserRoleEnum.HeadOfDepartment}`, async () => {
        mockGetTaskCountersSuccess()
        mockGetTaskListSuccess()

        render(<TaskListPage />, {
          store: getStoreWithAuth({ userRole: UserRoleEnum.HeadOfDepartment }),
        })

        await taskTableTestUtils.expectLoadingFinished()
        await fastFilterTestUtils.expectLoadingFinished()

        fastFilterTestUtils.expectFilterChecked(
          fastFilterTestUtils.getCheckableTag(FastFilterEnum.All),
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
      await fastFilterTestUtils.expectLoadingFinished()
      await fastFilterTestUtils.changeFilter(user, FastFilterEnum.Free)
      await taskTableTestUtils.expectLoadingStarted()
    })

    test('Сбрасывает расширенный фильтр', async () => {
      const workGroupListItem = workGroupFixtures.getWorkGroup()
      mockGetWorkGroupListSuccess({ body: [workGroupListItem], once: false })
      mockGetTaskCountersSuccess()
      mockGetTaskListSuccess({ once: false })

      const { user } = render(<TaskListPage />, {
        store: getStoreWithAuth({
          userRole: UserRoleEnum.SeniorEngineer,
        }),
      })

      await fastFilterTestUtils.expectLoadingFinished()
      await taskTableTestUtils.expectLoadingFinished()

      await testUtils.openExtendedFilter(user)
      await extendedFilterTestUtils.findContainer()
      await extendedFilterTestUtils.workGroup.expectLoadingFinished()

      await extendedFilterTestUtils.status.setValue(
        user,
        taskExtendedStatusDict.NEW!,
      )

      await extendedFilterTestUtils.assigned.setValue(
        user,
        taskAssignedDict.True,
      )

      await extendedFilterTestUtils.overdue.setValue(
        user,
        taskOverdueDict.False,
      )

      const { startDateValue, endDateValue } =
        await extendedFilterTestUtils.completeAt.setValue(user)

      const { keyword: searchByColumnKeywordValue } =
        await extendedFilterTestUtils.searchByColumn.setKeywordValue(user)

      await extendedFilterTestUtils.searchByColumn.setColumnValue(
        user,
        searchFieldDict.searchByName,
      )

      const workGroupField =
        await extendedFilterTestUtils.workGroup.expectLoadingFinished()
      await extendedFilterTestUtils.workGroup.openField(user, workGroupField)
      await extendedFilterTestUtils.workGroup.setValue(
        user,
        workGroupListItem.name,
      )

      await extendedFilterTestUtils.applyFilter(user)
      await taskTableTestUtils.expectLoadingStarted()
      await taskTableTestUtils.expectLoadingFinished()

      await fastFilterTestUtils.changeFilter(user, FastFilterEnum.Free)
      await taskTableTestUtils.expectLoadingStarted()
      await taskTableTestUtils.expectLoadingFinished()

      await testUtils.openExtendedFilter(user)
      await extendedFilterTestUtils.findContainer()
      await extendedFilterTestUtils.workGroup.expectLoadingFinished()

      await waitFor(() => {
        expect(
          extendedFilterTestUtils.status.getField(taskExtendedStatusDict.NEW!),
        ).not.toBeChecked()
      })

      expect(
        extendedFilterTestUtils.assigned.getField(taskAssignedDict.True),
      ).not.toBeChecked()

      expect(
        extendedFilterTestUtils.overdue.getField(taskOverdueDict.False),
      ).not.toBeChecked()

      expect(
        extendedFilterTestUtils.completeAt.getStartDateField(),
      ).not.toHaveDisplayValue(startDateValue)

      expect(
        extendedFilterTestUtils.completeAt.getEndDateField(),
      ).not.toHaveDisplayValue(endDateValue)

      expect(
        extendedFilterTestUtils.searchByColumn.getKeywordField(),
      ).not.toHaveDisplayValue(searchByColumnKeywordValue)

      expect(
        extendedFilterTestUtils.searchByColumn.getColumnField(
          searchFieldDict.searchByName,
        ),
      ).not.toBeChecked()

      expect(
        getSelectedOption(extendedFilterTestUtils.workGroup.getField()),
      ).not.toBeInTheDocument()
    })

    test('Закрывает карточку заявки', async () => {
      mockGetWorkGroupListSuccess()
      mockGetTaskCountersSuccess()

      const taskListItem = taskFixtures.getTaskListItem()
      mockGetTaskListSuccess({
        once: false,
        body: taskFixtures.getTaskListResponse([taskListItem]),
      })
      mockGetTaskSuccess(taskListItem.id)

      const { user } = render(<TaskListPage />, { store: getStoreWithAuth() })

      await taskTableTestUtils.expectLoadingFinished()
      await taskTableTestUtils.clickRow(user, taskListItem.id)
      const taskCard = await taskCardTestUtils.findContainer()

      await fastFilterTestUtils.changeFilter(user, FastFilterEnum.Free)

      await waitFor(() => {
        expect(taskCard).not.toBeInTheDocument()
      })
    })

    test('Сбрасывает значение поля поиска', async () => {
      mockGetTaskCountersSuccess()
      mockGetTaskListSuccess({ once: false })

      const { user } = render(<TaskListPage />, { store: getStoreWithAuth() })

      await taskTableTestUtils.expectLoadingFinished()
      await fastFilterTestUtils.expectLoadingFinished()

      const searchValue = generateWord()
      const searchInput = await testUtils.setSearchValue(user, searchValue)

      await fastFilterTestUtils.changeFilter(user, FastFilterEnum.Closed)
      await taskTableTestUtils.expectLoadingFinished()

      expect(searchInput).not.toHaveValue()
      expect(searchInput).not.toHaveDisplayValue(searchValue)
    })
  })

  describe('Кнопка расширенных фильтров', () => {
    test('Отображается корректно', () => {
      render(<TaskListPage />)

      const button = testUtils.getExtendedFilterButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Открывает расширенный фильтр', async () => {
      const { user } = render(<TaskListPage />)

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

        const { user } = render(<TaskListPage />, { store: getStoreWithAuth() })

        await taskTableTestUtils.expectLoadingFinished()
        await testUtils.openExtendedFilter(user)
        await extendedFilterTestUtils.findContainer()
        await extendedFilterTestUtils.applyFilter(user)
        await taskTableTestUtils.expectLoadingStarted()
      })

      test('Фильтр закрывается', async () => {
        const { user } = render(<TaskListPage />)

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

        const taskListItem = taskFixtures.getTaskListItem()
        mockGetTaskListSuccess({
          body: taskFixtures.getTaskListResponse([taskListItem]),
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
        const { user } = render(<TaskListPage />)

        const fastFilter = fastFilterTestUtils.getCheckableTag(
          FastFilterEnum.All,
        )
        fastFilterTestUtils.expectFilterChecked(fastFilter)

        await testUtils.openExtendedFilter(user)
        await extendedFilterTestUtils.findContainer()
        await extendedFilterTestUtils.applyFilter(user)

        await waitFor(() => {
          fastFilterTestUtils.expectFilterNotChecked(fastFilter)
        })
      })

      test('Закрывается нажав кнопку закрытия', async () => {
        const { user } = render(<TaskListPage />)

        await testUtils.openExtendedFilter(user)
        const filter = await extendedFilterTestUtils.findContainer()
        await extendedFilterTestUtils.closeFilter(user)

        await waitFor(() => {
          expect(filter).not.toBeInTheDocument()
        })
      })

      test('Закрывается нажав вне фильтра', async () => {
        const { user } = render(<TaskListPage />)

        await testUtils.openExtendedFilter(user)
        const filter = await extendedFilterTestUtils.findContainer()
        await extendedFilterTestUtils.clickOutOfFilter(user)

        await waitFor(() => {
          expect(filter).not.toBeInTheDocument()
        })
      })

      test('Значения сохраняются если другой фильтр не применялся', async () => {
        const workGroupListItem = workGroupFixtures.getWorkGroup()
        mockGetWorkGroupListSuccess({ body: [workGroupListItem], once: false })
        mockGetTaskCountersSuccess()
        mockGetTaskListSuccess({ once: false })

        const { user } = render(<TaskListPage />, {
          store: getStoreWithAuth({ userRole: UserRoleEnum.SeniorEngineer }),
        })

        await taskTableTestUtils.expectLoadingFinished()
        await testUtils.openExtendedFilter(user)
        await extendedFilterTestUtils.findContainer()
        await extendedFilterTestUtils.workGroup.expectLoadingFinished()

        await extendedFilterTestUtils.status.setValue(
          user,
          taskExtendedStatusDict.NEW!,
        )

        await extendedFilterTestUtils.assigned.setValue(
          user,
          taskAssignedDict.True,
        )

        await extendedFilterTestUtils.overdue.setValue(
          user,
          taskOverdueDict.False,
        )

        const { startDateValue, endDateValue } =
          await extendedFilterTestUtils.completeAt.setValue(user)

        const { keyword: searchByColumnKeywordValue } =
          await extendedFilterTestUtils.searchByColumn.setKeywordValue(user)

        await extendedFilterTestUtils.searchByColumn.setColumnValue(
          user,
          searchFieldDict.searchByName,
        )

        const workGroupField =
          await extendedFilterTestUtils.workGroup.expectLoadingFinished()
        await extendedFilterTestUtils.workGroup.openField(user, workGroupField)
        await extendedFilterTestUtils.workGroup.setValue(
          user,
          workGroupListItem.name,
        )

        await extendedFilterTestUtils.applyFilter(user)
        await taskTableTestUtils.expectLoadingStarted()
        await taskTableTestUtils.expectLoadingFinished()
        await testUtils.openExtendedFilter(user)
        await extendedFilterTestUtils.findContainer()
        await extendedFilterTestUtils.workGroup.expectLoadingFinished()

        const statusField = extendedFilterTestUtils.status.getField(
          taskExtendedStatusDict.NEW!,
        )
        await waitFor(() => {
          expect(statusField).toBeChecked()
        })

        expect(
          extendedFilterTestUtils.assigned.getField(taskAssignedDict.True),
        ).toBeChecked()

        expect(
          extendedFilterTestUtils.overdue.getField(taskOverdueDict.False),
        ).toBeChecked()

        const startDateField =
          extendedFilterTestUtils.completeAt.getStartDateField()
        await waitFor(() => {
          expect(startDateField).toHaveDisplayValue(startDateValue)
        })

        expect(
          extendedFilterTestUtils.completeAt.getEndDateField(),
        ).toHaveDisplayValue(endDateValue)

        expect(
          extendedFilterTestUtils.searchByColumn.getKeywordField(),
        ).toHaveDisplayValue(searchByColumnKeywordValue)

        expect(
          extendedFilterTestUtils.searchByColumn.getColumnField(
            searchFieldDict.searchByName,
          ),
        ).toBeChecked()

        expect(
          getSelectedOption(extendedFilterTestUtils.workGroup.getField()),
        ).toHaveTextContent(workGroupListItem.name)
      })
    })

    test('Значения не сохраняются если фильтр не был применён', async () => {
      const workGroupListItem = workGroupFixtures.getWorkGroup()
      mockGetWorkGroupListSuccess({ body: [workGroupListItem] })
      mockGetTaskCountersSuccess()
      mockGetTaskListSuccess()

      const { user } = render(<TaskListPage />, {
        store: getStoreWithAuth({ userRole: UserRoleEnum.SeniorEngineer }),
      })

      await taskTableTestUtils.expectLoadingFinished()
      await testUtils.openExtendedFilter(user)
      const filter = await extendedFilterTestUtils.findContainer()
      await extendedFilterTestUtils.workGroup.expectLoadingFinished()

      await extendedFilterTestUtils.status.setValue(
        user,
        taskExtendedStatusDict.NEW!,
      )

      await extendedFilterTestUtils.assigned.setValue(
        user,
        taskAssignedDict.True,
      )

      await extendedFilterTestUtils.overdue.setValue(
        user,
        taskOverdueDict.False,
      )

      const { startDateValue, endDateValue } =
        await extendedFilterTestUtils.completeAt.setValue(user)

      const { keyword: searchByColumnKeywordValue } =
        await extendedFilterTestUtils.searchByColumn.setKeywordValue(user)

      await extendedFilterTestUtils.searchByColumn.setColumnValue(
        user,
        searchFieldDict.searchByName,
      )

      const workGroupField =
        await extendedFilterTestUtils.workGroup.expectLoadingFinished()
      await extendedFilterTestUtils.workGroup.openField(user, workGroupField)
      await extendedFilterTestUtils.workGroup.setValue(
        user,
        workGroupListItem.name,
      )

      await extendedFilterTestUtils.closeFilter(user)
      await waitFor(() => {
        expect(filter).not.toBeInTheDocument()
      })

      await testUtils.openExtendedFilter(user)
      await extendedFilterTestUtils.findContainer()
      await extendedFilterTestUtils.workGroup.expectLoadingFinished()

      expect(
        extendedFilterTestUtils.status.getField(taskExtendedStatusDict.NEW!),
      ).not.toBeChecked()

      expect(
        extendedFilterTestUtils.assigned.getField(taskAssignedDict.True),
      ).not.toBeChecked()

      expect(
        extendedFilterTestUtils.overdue.getField(taskOverdueDict.False),
      ).not.toBeChecked()

      expect(
        extendedFilterTestUtils.completeAt.getStartDateField(),
      ).not.toHaveDisplayValue(startDateValue)

      expect(
        extendedFilterTestUtils.completeAt.getEndDateField(),
      ).not.toHaveDisplayValue(endDateValue)

      expect(
        extendedFilterTestUtils.searchByColumn.getKeywordField(),
      ).not.toHaveDisplayValue(searchByColumnKeywordValue)

      expect(
        extendedFilterTestUtils.searchByColumn.getColumnField(
          searchFieldDict.searchByName,
        ),
      ).not.toBeChecked()

      expect(
        getSelectedOption(extendedFilterTestUtils.workGroup.getField()),
      ).not.toBeInTheDocument()
    })

    describe('Имеет корректные значения по умолчанию', () => {
      test('Фильтры которые отображаются для любой роли', async () => {
        const { user } = render(<TaskListPage />)

        await testUtils.openExtendedFilter(user)
        await extendedFilterTestUtils.findContainer()

        extendedFilterTestUtils.status.expectHasCorrectInitialValues()
        extendedFilterTestUtils.assigned.expectHasCorrectInitialValues()
        extendedFilterTestUtils.overdue.expectHasCorrectInitialValues()
        extendedFilterTestUtils.completeAt.expectHasCorrectInitialValues()
        extendedFilterTestUtils.searchByColumn.expectHasCorrectInitialValues()
      })

      test('Фильтр по рабочей группе', async () => {
        mockGetTaskListSuccess()
        mockGetTaskCountersSuccess()
        mockGetWorkGroupListSuccess({
          body: workGroupFixtures.getWorkGroupList(),
        })

        const { user } = render(<TaskListPage />, {
          store: getStoreWithAuth({
            userRole: UserRoleEnum.SeniorEngineer,
          }),
        })

        await taskTableTestUtils.expectLoadingFinished()
        await testUtils.openExtendedFilter(user)
        await extendedFilterTestUtils.findContainer()

        const workGroupField =
          await extendedFilterTestUtils.workGroup.expectLoadingFinished()

        const selectedOption = getSelectedOption(workGroupField)

        expect(selectedOption).not.toBeInTheDocument()
      })
    })
  })

  describe('Поиск заявки по номеру', () => {
    test('Поле поиска отображается корректно', () => {
      render(<TaskListPage />)

      const searchInput = testUtils.getSearchInput()

      expect(searchInput).toBeInTheDocument()
      expect(searchInput).toBeEnabled()
      expect(searchInput).not.toHaveValue()
    })

    test('Можно ввести значение', async () => {
      const { user } = render(<TaskListPage />)

      const value = generateWord()
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

        const taskListItem = taskFixtures.getTaskListItem()
        mockGetTaskListSuccess({
          body: taskFixtures.getTaskListResponse([taskListItem]),
          once: false,
        })
        mockGetTaskSuccess(taskListItem.id)

        const { user } = render(<TaskListPage />, {
          store: getStoreWithAuth(),
        })

        await taskTableTestUtils.expectLoadingFinished()
        await taskTableTestUtils.clickRow(user, taskListItem.id)
        const taskCard = await taskCardTestUtils.findContainer()
        await testUtils.setSearchValue(user, generateWord(), true)
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
          await testUtils.setSearchValue(user, generateWord())
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
          await testUtils.setSearchValue(user, generateWord(), true)
          await taskTableTestUtils.expectLoadingStarted()
        })
      })

      test('Кнопка открытия расширенного фильтра недоступна', async () => {
        const { user } = render(<TaskListPage />)

        await testUtils.setSearchValue(user, generateWord(), true)

        const extendedFilterButton = testUtils.getExtendedFilterButton()

        await waitFor(() => {
          expect(extendedFilterButton).toBeDisabled()
        })
      })

      test('Быстрый фильтр перестаёт быть выбранным', async () => {
        const { user } = render(<TaskListPage />)

        const fastFilter = fastFilterTestUtils.getCheckableTag(
          FastFilterEnum.All,
        )
        fastFilterTestUtils.expectFilterChecked(fastFilter)

        await testUtils.setSearchValue(user, generateWord(), true)

        await waitFor(() => {
          fastFilterTestUtils.expectFilterNotChecked(fastFilter)
        })
      })
    })

    describe('Очищение поля через клавиатуру', () => {
      test('Применяет быстрый фильтр если он был применён ранее', async () => {
        const { user } = render(<TaskListPage />)

        const input = await testUtils.setSearchValue(
          user,
          generateWord({ length: 1 }),
          true,
        )

        const fastFilter = fastFilterTestUtils.getCheckableTag(
          FastFilterEnum.All,
        )

        await waitFor(() => {
          fastFilterTestUtils.expectFilterNotChecked(fastFilter)
        })

        await testUtils.clearSearchFieldByBackspace(user, input)

        await waitFor(() => {
          fastFilterTestUtils.expectFilterChecked(fastFilter)
        })
      })

      test('Делает кнопку открытия расширенного фильтра активной', async () => {
        const { user } = render(<TaskListPage />)

        const extendedFilterButton = testUtils.getExtendedFilterButton()
        expect(extendedFilterButton).toBeEnabled()

        const input = await testUtils.setSearchValue(
          user,
          generateWord({ length: 1 }),
          true,
        )
        await waitFor(() => {
          expect(extendedFilterButton).toBeDisabled()
        })

        await testUtils.clearSearchFieldByBackspace(user, input)
        await waitFor(() => {
          expect(extendedFilterButton).toBeEnabled()
        })
      })

      test('Применяет расширенный фильтр если он был применён ранее', async () => {
        const workGroupListItem = workGroupFixtures.getWorkGroup()
        mockGetWorkGroupListSuccess({ body: [workGroupListItem], once: false })
        mockGetTaskCountersSuccess()
        mockGetTaskListSuccess({ once: false })

        const { user } = render(<TaskListPage />, {
          store: getStoreWithAuth({ userRole: UserRoleEnum.SeniorEngineer }),
        })

        await taskTableTestUtils.expectLoadingStarted()
        await taskTableTestUtils.expectLoadingFinished()
        await testUtils.openExtendedFilter(user)
        await extendedFilterTestUtils.findContainer()
        await extendedFilterTestUtils.workGroup.expectLoadingFinished()

        await extendedFilterTestUtils.status.setValue(
          user,
          taskExtendedStatusDict.NEW!,
        )

        await extendedFilterTestUtils.assigned.setValue(
          user,
          taskAssignedDict.True,
        )

        await extendedFilterTestUtils.overdue.setValue(
          user,
          taskOverdueDict.False,
        )

        const { startDateValue, endDateValue } =
          await extendedFilterTestUtils.completeAt.setValue(user)

        const { keyword: searchByColumnKeywordValue } =
          await extendedFilterTestUtils.searchByColumn.setKeywordValue(user)

        await extendedFilterTestUtils.searchByColumn.setColumnValue(
          user,
          searchFieldDict.searchByName,
        )

        const workGroupField =
          await extendedFilterTestUtils.workGroup.expectLoadingFinished()
        await extendedFilterTestUtils.workGroup.openField(user, workGroupField)
        await extendedFilterTestUtils.workGroup.setValue(
          user,
          workGroupListItem.name,
        )

        await extendedFilterTestUtils.applyFilter(user)
        await taskTableTestUtils.expectLoadingStarted()
        await taskTableTestUtils.expectLoadingFinished()

        const searchInput = await testUtils.setSearchValue(
          user,
          generateWord({ length: 1 }),
          true,
        )
        await taskTableTestUtils.expectLoadingStarted()
        await taskTableTestUtils.expectLoadingFinished()
        await testUtils.clearSearchFieldByBackspace(user, searchInput)
        await taskTableTestUtils.expectLoadingStarted()
        await taskTableTestUtils.expectLoadingFinished()

        await testUtils.openExtendedFilter(user)
        await extendedFilterTestUtils.findContainer()
        await extendedFilterTestUtils.workGroup.expectLoadingFinished()

        const statusField = extendedFilterTestUtils.status.getField(
          taskExtendedStatusDict.NEW!,
        )
        await waitFor(() => {
          expect(statusField).toBeChecked()
        })

        expect(
          extendedFilterTestUtils.assigned.getField(taskAssignedDict.True),
        ).toBeChecked()

        expect(
          extendedFilterTestUtils.overdue.getField(taskOverdueDict.False),
        ).toBeChecked()

        const startDateField =
          extendedFilterTestUtils.completeAt.getStartDateField()
        await waitFor(() => {
          expect(startDateField).toHaveDisplayValue(startDateValue)
        })

        expect(
          extendedFilterTestUtils.completeAt.getEndDateField(),
        ).toHaveDisplayValue(endDateValue)

        expect(
          extendedFilterTestUtils.searchByColumn.getKeywordField(),
        ).toHaveDisplayValue(searchByColumnKeywordValue)

        expect(
          extendedFilterTestUtils.searchByColumn.getColumnField(
            searchFieldDict.searchByName,
          ),
        ).toBeChecked()

        expect(
          getSelectedOption(extendedFilterTestUtils.workGroup.getField()),
        ).toHaveTextContent(workGroupListItem.name)
      })
    })

    describe('Сброс значения через кнопку', () => {
      test('Очищает поле ввода', async () => {
        const { user } = render(<TaskListPage />)

        const input = await testUtils.setSearchValue(user, generateWord())
        await testUtils.clickSearchClearButton(user)

        expect(input).not.toHaveValue()
      })

      test('Применяет быстрый фильтр если он был применён ранее', async () => {
        const { user } = render(<TaskListPage />)

        await testUtils.setSearchValue(user, generateWord(), true)
        const fastFilter = fastFilterTestUtils.getCheckableTag(
          FastFilterEnum.All,
        )
        await waitFor(() => {
          fastFilterTestUtils.expectFilterNotChecked(fastFilter)
        })

        await testUtils.clickSearchClearButton(user)
        await waitFor(() => {
          fastFilterTestUtils.expectFilterChecked(fastFilter)
        })
      })

      test('Делает кнопку открытия расширенного фильтра активной', async () => {
        const { user } = render(<TaskListPage />)

        const extendedFilterButton = testUtils.getExtendedFilterButton()
        expect(extendedFilterButton).toBeEnabled()

        await testUtils.setSearchValue(user, generateWord(), true)
        await waitFor(() => {
          expect(extendedFilterButton).toBeDisabled()
        })

        await testUtils.clickSearchClearButton(user)
        await waitFor(() => {
          expect(extendedFilterButton).toBeEnabled()
        })
      })

      test('Применяет расширенный фильтр если он был применён ранее', async () => {
        const workGroupListItem = workGroupFixtures.getWorkGroup()
        mockGetWorkGroupListSuccess({ body: [workGroupListItem], once: false })
        mockGetTaskCountersSuccess()
        mockGetTaskListSuccess({ once: false })

        const { user } = render(<TaskListPage />, {
          store: getStoreWithAuth({ userRole: UserRoleEnum.SeniorEngineer }),
        })

        await taskTableTestUtils.expectLoadingStarted()
        await taskTableTestUtils.expectLoadingFinished()
        await testUtils.openExtendedFilter(user)
        await extendedFilterTestUtils.findContainer()
        await extendedFilterTestUtils.workGroup.expectLoadingFinished()

        await extendedFilterTestUtils.status.setValue(
          user,
          taskExtendedStatusDict.NEW!,
        )

        await extendedFilterTestUtils.assigned.setValue(
          user,
          taskAssignedDict.True,
        )

        await extendedFilterTestUtils.overdue.setValue(
          user,
          taskOverdueDict.False,
        )

        const { startDateValue, endDateValue } =
          await extendedFilterTestUtils.completeAt.setValue(user)

        const { keyword: searchByColumnKeywordValue } =
          await extendedFilterTestUtils.searchByColumn.setKeywordValue(user)

        await extendedFilterTestUtils.searchByColumn.setColumnValue(
          user,
          searchFieldDict.searchByName,
        )

        const workGroupField =
          await extendedFilterTestUtils.workGroup.expectLoadingFinished()

        await extendedFilterTestUtils.workGroup.openField(user, workGroupField)
        await extendedFilterTestUtils.workGroup.setValue(
          user,
          workGroupListItem.name,
        )

        await extendedFilterTestUtils.applyFilter(user)
        await taskTableTestUtils.expectLoadingStarted()
        await taskTableTestUtils.expectLoadingFinished()

        await testUtils.setSearchValue(user, generateWord(), true)
        await taskTableTestUtils.expectLoadingStarted()
        await taskTableTestUtils.expectLoadingFinished()
        await testUtils.clickSearchClearButton(user)
        await taskTableTestUtils.expectLoadingStarted()
        await taskTableTestUtils.expectLoadingFinished()

        await testUtils.openExtendedFilter(user)
        await extendedFilterTestUtils.findContainer()
        await extendedFilterTestUtils.workGroup.expectLoadingFinished()

        const statusField = extendedFilterTestUtils.status.getField(
          taskExtendedStatusDict.NEW!,
        )
        await waitFor(() => {
          expect(statusField).toBeChecked()
        })

        expect(
          extendedFilterTestUtils.assigned.getField(taskAssignedDict.True),
        ).toBeChecked()

        expect(
          extendedFilterTestUtils.overdue.getField(taskOverdueDict.False),
        ).toBeChecked()

        const startDateField =
          extendedFilterTestUtils.completeAt.getStartDateField()
        await waitFor(() => {
          expect(startDateField).toHaveDisplayValue(startDateValue)
        })

        expect(
          extendedFilterTestUtils.completeAt.getEndDateField(),
        ).toHaveDisplayValue(endDateValue)

        expect(
          extendedFilterTestUtils.searchByColumn.getKeywordField(),
        ).toHaveDisplayValue(searchByColumnKeywordValue)

        expect(
          extendedFilterTestUtils.searchByColumn.getColumnField(
            searchFieldDict.searchByName,
          ),
        ).toBeChecked()

        expect(
          getSelectedOption(extendedFilterTestUtils.workGroup.getField()),
        ).toHaveTextContent(workGroupListItem.name)
      })
    })
  })

  describe('Кнопка обновления заявок', () => {
    test('Отображается корректно', () => {
      render(<TaskListPage />)

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
      await fastFilterTestUtils.expectLoadingFinished()
      await testUtils.clickReloadListButton(user)
      await fastFilterTestUtils.expectLoadingStarted()
    })

    test('Закрывает карточку заявки', async () => {
      mockGetWorkGroupListSuccess()
      mockGetTaskCountersSuccess({ once: false })

      const taskListItem = taskFixtures.getTaskListItem()
      mockGetTaskListSuccess({
        body: taskFixtures.getTaskListResponse([taskListItem]),
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
      const taskList = taskFixtures.getTaskList(2)

      mockGetTaskCountersSuccess()
      mockGetTaskListSuccess({
        body: taskFixtures.getTaskListResponse(taskList),
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

        const taskListItem = taskFixtures.getTaskListItem()
        mockGetTaskListSuccess({
          body: taskFixtures.getTaskListResponse([taskListItem]),
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

        const taskListItem = taskFixtures.getTaskListItem()
        mockGetTaskListSuccess({
          body: taskFixtures.getTaskListResponse([taskListItem]),
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

          const taskList = taskFixtures.getTaskList()
          mockGetTaskListSuccess({
            once: false,
            body: taskFixtures.getTaskListResponse(taskList),
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

          const taskList = taskFixtures.getTaskList()
          mockGetTaskListSuccess({
            once: false,
            body: taskFixtures.getTaskListResponse(taskList),
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

          const taskList = taskFixtures.getTaskList()
          mockGetTaskListSuccess({
            once: false,
            body: taskFixtures.getTaskListResponse(taskList),
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

          const taskList = taskFixtures.getTaskList()
          mockGetTaskListSuccess({
            once: false,
            body: taskFixtures.getTaskListResponse(taskList),
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

          const taskList = taskFixtures.getTaskList()
          mockGetTaskListSuccess({
            once: false,
            body: taskFixtures.getTaskListResponse(taskList),
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

            const taskList = taskFixtures.getTaskList()
            mockGetTaskListSuccess({
              once: false,
              body: taskFixtures.getTaskListResponse(taskList),
            })

            render(<TaskListPage />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.FirstLineSupport,
              }),
            })

            await taskTableTestUtils.expectLoadingStarted()
            await taskTableTestUtils.expectLoadingFinished()

            expect(
              taskTableTestUtils.queryColTitle('Рабочая группа'),
            ).not.toBeInTheDocument()
          })
        })

        describe(`Роль - ${UserRoleEnum.Engineer}`, () => {
          test('После сортировки список отображается корректно', async () => {
            mockGetTaskCountersSuccess()

            const taskList = taskFixtures.getTaskList()
            mockGetTaskListSuccess({
              once: false,
              body: taskFixtures.getTaskListResponse(taskList),
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

            const taskList = taskFixtures.getTaskList()
            mockGetTaskListSuccess({
              once: false,
              body: taskFixtures.getTaskListResponse(taskList),
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

            const taskList = taskFixtures.getTaskList()
            mockGetTaskListSuccess({
              once: false,
              body: taskFixtures.getTaskListResponse(taskList),
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

            const taskList = taskFixtures.getTaskList()
            mockGetTaskListSuccess({
              once: false,
              body: taskFixtures.getTaskListResponse(taskList),
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

            const taskList = taskFixtures.getTaskList()
            mockGetTaskListSuccess({
              once: false,
              body: taskFixtures.getTaskListResponse(taskList),
            })

            render(<TaskListPage />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.Engineer,
              }),
            })

            await taskTableTestUtils.expectLoadingStarted()
            await taskTableTestUtils.expectLoadingFinished()

            expect(
              taskTableTestUtils.queryColTitle('Группа поддержки'),
            ).not.toBeInTheDocument()
          })
        })

        describe(`Роль - ${UserRoleEnum.SeniorEngineer}`, () => {
          test('Не отображается', async () => {
            mockGetTaskCountersSuccess()

            const taskList = taskFixtures.getTaskList()
            mockGetTaskListSuccess({
              once: false,
              body: taskFixtures.getTaskListResponse(taskList),
            })

            render(<TaskListPage />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.SeniorEngineer,
              }),
            })

            await taskTableTestUtils.expectLoadingStarted()
            await taskTableTestUtils.expectLoadingFinished()

            expect(
              taskTableTestUtils.queryColTitle('Группа поддержки'),
            ).not.toBeInTheDocument()
          })
        })

        describe(`Роль - ${UserRoleEnum.HeadOfDepartment}`, () => {
          test('Не отображается', async () => {
            mockGetTaskCountersSuccess()

            const taskList = taskFixtures.getTaskList()
            mockGetTaskListSuccess({
              once: false,
              body: taskFixtures.getTaskListResponse(taskList),
            })

            render(<TaskListPage />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.HeadOfDepartment,
              }),
            })

            await taskTableTestUtils.expectLoadingStarted()
            await taskTableTestUtils.expectLoadingFinished()

            expect(
              taskTableTestUtils.queryColTitle('Группа поддержки'),
            ).not.toBeInTheDocument()
          })
        })
      })

      describe('Выполнить до', () => {
        test('После сортировки список отображается корректно', async () => {
          mockGetTaskCountersSuccess()

          const taskList = taskFixtures.getTaskList()
          mockGetTaskListSuccess({
            once: false,
            body: taskFixtures.getTaskListResponse(taskList),
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
        test('После сортировки список отображается корректно', async () => {
          mockGetTaskCountersSuccess()

          const taskList = taskFixtures.getTaskList()
          mockGetTaskListSuccess({
            once: false,
            body: taskFixtures.getTaskListResponse(taskList),
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

          const taskList = taskFixtures.getTaskList()
          mockGetTaskListSuccess({
            once: false,
            body: taskFixtures.getTaskListResponse(taskList),
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

          const taskList = taskFixtures.getTaskList()
          mockGetTaskListSuccess({
            once: false,
            body: taskFixtures.getTaskListResponse(taskList),
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
            body: taskFixtures.getTaskListResponse(
              taskFixtures.getTaskList(DEFAULT_PAGE_SIZE + 1),
            ),
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
            body: taskFixtures.getTaskListResponse(
              taskFixtures.getTaskList(DEFAULT_PAGE_SIZE + 1),
            ),
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
            body: taskFixtures.getTaskListResponse(
              taskFixtures.getTaskList(DEFAULT_PAGE_SIZE + 1),
            ),
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
            body: taskFixtures.getTaskListResponse(
              taskFixtures.getTaskList(DEFAULT_PAGE_SIZE + 1),
            ),
          })

          const { user } = render(<TaskListPage />, {
            store: getStoreWithAuth(),
          })

          await taskTableTestUtils.expectLoadingFinished()
          await taskTableTestUtils.changePageSize(
            user,
            paginationConfig.pageSizeOptions[0],
          )
          await taskTableTestUtils.expectLoadingStarted()
        })
      })
    })
  })
})
