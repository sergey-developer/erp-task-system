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

const userOpenExtendedFilter = async (user: UserEvent) => {
  const extendedFilterButton = getExtendedFilterButton()
  await user.click(extendedFilterButton)
  return extendedFilterButton
}

const userFillSearchInput = async (
  user: UserEvent,
  value: string,
  pressEnter: boolean = false,
) => {
  const input = getSearchInput()
  await user.type(input, pressEnter ? value.concat('{enter}') : value)
  return input
}

const userClearSearchFieldByBackspace = async (
  user: UserEvent,
  input: HTMLElement,
) => {
  await user.type(input, '{backspace}')
}

const testUtils = {
  getContainer,

  getSearchInput,
  userFillSearchInput,

  getSearchButton,

  getSearchClearButton,
  clickSearchClearButton,

  userClearSearchFieldByBackspace,

  getReloadListButton,
  clickReloadListButton,

  getCreateTaskButton,

  getExtendedFilterButton,
  userOpenExtendedFilter,
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

      await fastFilterTestUtils.loadingFinished()
      await taskTableTestUtils.loadingStarted()
      fastFilterTestUtils.expectAllFiltersDisabled()
      await taskTableTestUtils.loadingFinished()
      fastFilterTestUtils.expectAllFiltersNotDisabled()
    })

    test('Количество заявок отображается корректно', async () => {
      const taskCountersResponse = taskFixtures.getTaskCountersResponse()
      mockGetTaskCountersSuccess({ body: taskCountersResponse })
      mockGetTaskListSuccess()

      render(<TaskListPage />, { store: getStoreWithAuth() })

      await fastFilterTestUtils.loadingFinished()

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

        await taskTableTestUtils.loadingFinished()
        await fastFilterTestUtils.loadingFinished()

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

        await taskTableTestUtils.loadingFinished()
        await fastFilterTestUtils.loadingFinished()

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

        await taskTableTestUtils.loadingFinished()
        await fastFilterTestUtils.loadingFinished()

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

        await taskTableTestUtils.loadingFinished()
        await fastFilterTestUtils.loadingFinished()

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

      await taskTableTestUtils.loadingFinished()
      await fastFilterTestUtils.loadingFinished()
      await fastFilterTestUtils.userChangeFilter(user, FastFilterEnum.Free)
      await taskTableTestUtils.loadingStarted()
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

      await fastFilterTestUtils.loadingFinished()
      await taskTableTestUtils.loadingFinished()

      await testUtils.userOpenExtendedFilter(user)
      await extendedFilterTestUtils.findFilter()
      await extendedFilterTestUtils.workGroup.loadingFinished()

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
        await extendedFilterTestUtils.workGroup.loadingFinished()
      await extendedFilterTestUtils.workGroup.openField(user, workGroupField)
      await extendedFilterTestUtils.workGroup.setValue(
        user,
        workGroupListItem.name,
      )

      await extendedFilterTestUtils.userApplyFilter(user)
      await taskTableTestUtils.loadingStarted()
      await taskTableTestUtils.loadingFinished()

      await fastFilterTestUtils.userChangeFilter(user, FastFilterEnum.Free)
      await taskTableTestUtils.loadingStarted()
      await taskTableTestUtils.loadingFinished()

      await testUtils.userOpenExtendedFilter(user)
      await extendedFilterTestUtils.findFilter()
      await extendedFilterTestUtils.workGroup.loadingFinished()

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

      await taskTableTestUtils.loadingFinished()
      await taskTableTestUtils.clickRow(user, taskListItem.id)
      const taskCard = await taskCardTestUtils.findContainer()

      await fastFilterTestUtils.userChangeFilter(user, FastFilterEnum.Free)

      await waitFor(() => {
        expect(taskCard).not.toBeInTheDocument()
      })
    })

    test('Сбрасывает значение поля поиска', async () => {
      mockGetTaskCountersSuccess()
      mockGetTaskListSuccess({ once: false })

      const { user } = render(<TaskListPage />, { store: getStoreWithAuth() })

      await taskTableTestUtils.loadingFinished()
      await fastFilterTestUtils.loadingFinished()

      const searchValue = generateWord()
      const searchInput = await testUtils.userFillSearchInput(user, searchValue)

      await fastFilterTestUtils.userChangeFilter(user, FastFilterEnum.Closed)
      await taskTableTestUtils.loadingFinished()

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

      await testUtils.userOpenExtendedFilter(user)
      const filter = await extendedFilterTestUtils.findFilter()
      expect(filter).toBeInTheDocument()
    })

    test('Не активна во время загрузки заявок', async () => {
      mockGetTaskCountersSuccess()
      mockGetTaskListSuccess()

      render(<TaskListPage />, { store: getStoreWithAuth() })

      const button = testUtils.getExtendedFilterButton()
      await taskTableTestUtils.loadingStarted()
      expect(button).toBeDisabled()
      await taskTableTestUtils.loadingFinished()
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

        await taskTableTestUtils.loadingFinished()
        await testUtils.userOpenExtendedFilter(user)
        await extendedFilterTestUtils.findFilter()
        await extendedFilterTestUtils.userApplyFilter(user)
        await taskTableTestUtils.loadingStarted()
      })

      test('Фильтр закрывается', async () => {
        const { user } = render(<TaskListPage />)

        await testUtils.userOpenExtendedFilter(user)
        const filter = await extendedFilterTestUtils.findFilter()
        await extendedFilterTestUtils.userApplyFilter(user)

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

        await taskTableTestUtils.loadingFinished()
        await taskTableTestUtils.clickRow(user, taskListItem.id)
        const taskCard = await taskCardTestUtils.findContainer()

        await testUtils.userOpenExtendedFilter(user)
        await extendedFilterTestUtils.findFilter()
        await extendedFilterTestUtils.userApplyFilter(user)

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

        await testUtils.userOpenExtendedFilter(user)
        await extendedFilterTestUtils.findFilter()
        await extendedFilterTestUtils.userApplyFilter(user)

        await waitFor(() => {
          fastFilterTestUtils.expectFilterNotChecked(fastFilter)
        })
      })

      test('Закрывается нажав кнопку закрытия', async () => {
        const { user } = render(<TaskListPage />)

        await testUtils.userOpenExtendedFilter(user)
        const filter = await extendedFilterTestUtils.findFilter()
        await extendedFilterTestUtils.closeFilter(user)

        await waitFor(() => {
          expect(filter).not.toBeInTheDocument()
        })
      })

      test('Закрывается нажав вне фильтра', async () => {
        const { user } = render(<TaskListPage />)

        await testUtils.userOpenExtendedFilter(user)
        const filter = await extendedFilterTestUtils.findFilter()
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

        await taskTableTestUtils.loadingFinished()
        await testUtils.userOpenExtendedFilter(user)
        await extendedFilterTestUtils.findFilter()
        await extendedFilterTestUtils.workGroup.loadingFinished()

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
          await extendedFilterTestUtils.workGroup.loadingFinished()
        await extendedFilterTestUtils.workGroup.openField(user, workGroupField)
        await extendedFilterTestUtils.workGroup.setValue(
          user,
          workGroupListItem.name,
        )

        await extendedFilterTestUtils.userApplyFilter(user)
        await taskTableTestUtils.loadingStarted()
        await taskTableTestUtils.loadingFinished()
        await testUtils.userOpenExtendedFilter(user)
        await extendedFilterTestUtils.findFilter()
        await extendedFilterTestUtils.workGroup.loadingFinished()

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

      await taskTableTestUtils.loadingFinished()
      await testUtils.userOpenExtendedFilter(user)
      const filter = await extendedFilterTestUtils.findFilter()
      await extendedFilterTestUtils.workGroup.loadingFinished()

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
        await extendedFilterTestUtils.workGroup.loadingFinished()
      await extendedFilterTestUtils.workGroup.openField(user, workGroupField)
      await extendedFilterTestUtils.workGroup.setValue(
        user,
        workGroupListItem.name,
      )

      await extendedFilterTestUtils.closeFilter(user)
      await waitFor(() => {
        expect(filter).not.toBeInTheDocument()
      })

      await testUtils.userOpenExtendedFilter(user)
      await extendedFilterTestUtils.findFilter()
      await extendedFilterTestUtils.workGroup.loadingFinished()

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

        await testUtils.userOpenExtendedFilter(user)
        await extendedFilterTestUtils.findFilter()

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

        await taskTableTestUtils.loadingFinished()
        await testUtils.userOpenExtendedFilter(user)
        await extendedFilterTestUtils.findFilter()

        const workGroupField =
          await extendedFilterTestUtils.workGroup.loadingFinished()

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
      const input = await testUtils.userFillSearchInput(user, value)

      expect(input).toHaveValue(value)
    })

    test('Поле не активно во время загрузки заявок', async () => {
      mockGetTaskCountersSuccess()
      mockGetTaskListSuccess()

      render(<TaskListPage />, { store: getStoreWithAuth() })

      const searchInput = testUtils.getSearchInput()
      await taskTableTestUtils.loadingStarted()
      expect(searchInput).toBeDisabled()
      await taskTableTestUtils.loadingFinished()
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

        await taskTableTestUtils.loadingFinished()
        await taskTableTestUtils.clickRow(user, taskListItem.id)
        const taskCard = await taskCardTestUtils.findContainer()
        await testUtils.userFillSearchInput(user, generateWord(), true)
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

          await taskTableTestUtils.loadingFinished()
          await testUtils.userFillSearchInput(user, generateWord())
          await user.click(testUtils.getSearchButton())
          await taskTableTestUtils.loadingStarted()
        })

        test('При нажатии клавиши "Enter"', async () => {
          mockGetTaskCountersSuccess()
          mockGetTaskListSuccess({ once: false })

          const { user } = render(<TaskListPage />, {
            store: getStoreWithAuth(),
          })

          await taskTableTestUtils.loadingFinished()
          await testUtils.userFillSearchInput(user, generateWord(), true)
          await taskTableTestUtils.loadingStarted()
        })
      })

      test('Кнопка открытия расширенного фильтра недоступна', async () => {
        const { user } = render(<TaskListPage />)

        await testUtils.userFillSearchInput(user, generateWord(), true)

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

        await testUtils.userFillSearchInput(user, generateWord(), true)

        await waitFor(() => {
          fastFilterTestUtils.expectFilterNotChecked(fastFilter)
        })
      })
    })

    describe('Очищение поля через клавиатуру', () => {
      test('Применяет быстрый фильтр если он был применён ранее', async () => {
        const { user } = render(<TaskListPage />)

        const input = await testUtils.userFillSearchInput(
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

        await testUtils.userClearSearchFieldByBackspace(user, input)

        await waitFor(() => {
          fastFilterTestUtils.expectFilterChecked(fastFilter)
        })
      })

      test('Делает кнопку открытия расширенного фильтра активной', async () => {
        const { user } = render(<TaskListPage />)

        const extendedFilterButton = testUtils.getExtendedFilterButton()
        expect(extendedFilterButton).toBeEnabled()

        const input = await testUtils.userFillSearchInput(
          user,
          generateWord({ length: 1 }),
          true,
        )
        await waitFor(() => {
          expect(extendedFilterButton).toBeDisabled()
        })

        await testUtils.userClearSearchFieldByBackspace(user, input)
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

        await taskTableTestUtils.loadingStarted()
        await taskTableTestUtils.loadingFinished()
        await testUtils.userOpenExtendedFilter(user)
        await extendedFilterTestUtils.findFilter()
        await extendedFilterTestUtils.workGroup.loadingFinished()

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
          await extendedFilterTestUtils.workGroup.loadingFinished()
        await extendedFilterTestUtils.workGroup.openField(user, workGroupField)
        await extendedFilterTestUtils.workGroup.setValue(
          user,
          workGroupListItem.name,
        )

        await extendedFilterTestUtils.userApplyFilter(user)
        await taskTableTestUtils.loadingStarted()
        await taskTableTestUtils.loadingFinished()

        const searchInput = await testUtils.userFillSearchInput(
          user,
          generateWord({ length: 1 }),
          true,
        )
        await taskTableTestUtils.loadingStarted()
        await taskTableTestUtils.loadingFinished()
        await testUtils.userClearSearchFieldByBackspace(user, searchInput)
        await taskTableTestUtils.loadingStarted()
        await taskTableTestUtils.loadingFinished()

        await testUtils.userOpenExtendedFilter(user)
        await extendedFilterTestUtils.findFilter()
        await extendedFilterTestUtils.workGroup.loadingFinished()

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

        const input = await testUtils.userFillSearchInput(user, generateWord())
        await testUtils.clickSearchClearButton(user)

        expect(input).not.toHaveValue()
      })

      test('Применяет быстрый фильтр если он был применён ранее', async () => {
        const { user } = render(<TaskListPage />)

        await testUtils.userFillSearchInput(user, generateWord(), true)
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

        await testUtils.userFillSearchInput(user, generateWord(), true)
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

        await taskTableTestUtils.loadingStarted()
        await taskTableTestUtils.loadingFinished()
        await testUtils.userOpenExtendedFilter(user)
        await extendedFilterTestUtils.findFilter()
        await extendedFilterTestUtils.workGroup.loadingFinished()

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
          await extendedFilterTestUtils.workGroup.loadingFinished()

        await extendedFilterTestUtils.workGroup.openField(user, workGroupField)
        await extendedFilterTestUtils.workGroup.setValue(
          user,
          workGroupListItem.name,
        )

        await extendedFilterTestUtils.userApplyFilter(user)
        await taskTableTestUtils.loadingStarted()
        await taskTableTestUtils.loadingFinished()

        await testUtils.userFillSearchInput(user, generateWord(), true)
        await taskTableTestUtils.loadingStarted()
        await taskTableTestUtils.loadingFinished()
        await testUtils.clickSearchClearButton(user)
        await taskTableTestUtils.loadingStarted()
        await taskTableTestUtils.loadingFinished()

        await testUtils.userOpenExtendedFilter(user)
        await extendedFilterTestUtils.findFilter()
        await extendedFilterTestUtils.workGroup.loadingFinished()

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

      await taskTableTestUtils.loadingFinished()
      await testUtils.clickReloadListButton(user)
      await taskTableTestUtils.loadingStarted()
    })

    test('Перезагружает количество заявок для быстрых фильтров', async () => {
      mockGetTaskCountersSuccess({ once: false })
      mockGetTaskListSuccess({ once: false })

      const { user } = render(<TaskListPage />, {
        store: getStoreWithAuth(),
      })

      await taskTableTestUtils.loadingFinished()
      await fastFilterTestUtils.loadingFinished()
      await testUtils.clickReloadListButton(user)
      await fastFilterTestUtils.loadingStarted()
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

      await taskTableTestUtils.loadingFinished()
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
      await taskTableTestUtils.loadingStarted()
      expect(button).toBeDisabled()
      await taskTableTestUtils.loadingFinished()
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

      const taskTable = await taskTableTestUtils.loadingFinished()

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

        await taskTableTestUtils.loadingFinished()
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

        await taskTableTestUtils.loadingFinished()
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

          await taskTableTestUtils.loadingStarted()
          await taskTableTestUtils.loadingFinished()
          await taskTableTestUtils.userClickColTitle(user, 'Заявка')
          await taskTableTestUtils.loadingStarted()
          await taskTableTestUtils.loadingFinished()

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

          await taskTableTestUtils.loadingStarted()
          await taskTableTestUtils.loadingFinished()
          await taskTableTestUtils.userClickColTitle(user, 'Внеш.номер')
          await taskTableTestUtils.loadingStarted()
          await taskTableTestUtils.loadingFinished()

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

          await taskTableTestUtils.loadingStarted()
          await taskTableTestUtils.loadingFinished()
          await taskTableTestUtils.userClickColTitle(user, 'Объект')
          await taskTableTestUtils.loadingStarted()
          await taskTableTestUtils.loadingFinished()

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

          await taskTableTestUtils.loadingStarted()
          await taskTableTestUtils.loadingFinished()
          await taskTableTestUtils.userClickColTitle(user, 'Тема')
          await taskTableTestUtils.loadingStarted()
          await taskTableTestUtils.loadingFinished()

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

          await taskTableTestUtils.loadingStarted()
          await taskTableTestUtils.loadingFinished()
          await taskTableTestUtils.userClickColTitle(user, 'Исполнитель')
          await taskTableTestUtils.loadingStarted()
          await taskTableTestUtils.loadingFinished()

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

            await taskTableTestUtils.loadingStarted()
            await taskTableTestUtils.loadingFinished()

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

            await taskTableTestUtils.loadingStarted()
            await taskTableTestUtils.loadingFinished()
            await taskTableTestUtils.userClickColTitle(user, 'Рабочая группа')
            await taskTableTestUtils.loadingStarted()
            await taskTableTestUtils.loadingFinished()

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

            await taskTableTestUtils.loadingStarted()
            await taskTableTestUtils.loadingFinished()
            await taskTableTestUtils.userClickColTitle(user, 'Рабочая группа')
            await taskTableTestUtils.loadingStarted()
            await taskTableTestUtils.loadingFinished()

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

            await taskTableTestUtils.loadingStarted()
            await taskTableTestUtils.loadingFinished()
            await taskTableTestUtils.userClickColTitle(user, 'Рабочая группа')
            await taskTableTestUtils.loadingStarted()
            await taskTableTestUtils.loadingFinished()

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

            await taskTableTestUtils.loadingStarted()
            await taskTableTestUtils.loadingFinished()
            await taskTableTestUtils.userClickColTitle(user, 'Группа поддержки')
            await taskTableTestUtils.loadingStarted()
            await taskTableTestUtils.loadingFinished()

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

            await taskTableTestUtils.loadingStarted()
            await taskTableTestUtils.loadingFinished()

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

            await taskTableTestUtils.loadingStarted()
            await taskTableTestUtils.loadingFinished()

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

            await taskTableTestUtils.loadingStarted()
            await taskTableTestUtils.loadingFinished()

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

          await taskTableTestUtils.loadingStarted()
          await taskTableTestUtils.loadingFinished()
          await taskTableTestUtils.userClickColTitle(user, 'Выполнить до')
          await taskTableTestUtils.loadingStarted()
          await taskTableTestUtils.loadingFinished()

          taskList.forEach((item) => {
            const row = taskTableTestUtils.getRow(item.id)
            expect(row).toBeInTheDocument()
          })
        })
      })

      describe('Статус', () => {
        test.skip('После сортировки список отображается корректно', async () => {
          mockGetTaskCountersSuccess()

          const taskList = taskFixtures.getTaskList()
          mockGetTaskListSuccess({
            once: false,
            body: taskFixtures.getTaskListResponse(taskList),
          })

          const { user } = render(<TaskListPage />, {
            store: getStoreWithAuth(),
          })

          await taskTableTestUtils.loadingStarted()
          await taskTableTestUtils.loadingFinished()
          await taskTableTestUtils.userClickColTitle(user, 'Статус')

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

          await taskTableTestUtils.loadingStarted()
          await taskTableTestUtils.loadingFinished()
          await taskTableTestUtils.userClickColTitle(user, 'Комментарий')
          await taskTableTestUtils.loadingStarted()
          await taskTableTestUtils.loadingFinished()

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

          await taskTableTestUtils.loadingStarted()
          await taskTableTestUtils.loadingFinished()
          await taskTableTestUtils.userClickColTitle(user, 'Дата создания')
          await taskTableTestUtils.loadingStarted()
          await taskTableTestUtils.loadingFinished()

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

          await taskTableTestUtils.loadingFinished()
          await taskTableTestUtils.userClickPaginationNextButton(user)
          await taskTableTestUtils.loadingStarted()
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

          await taskTableTestUtils.loadingFinished()
          await taskTableTestUtils.userClickPaginationNextButton(user)
          await taskTableTestUtils.loadingFinished()
          await taskTableTestUtils.userClickPaginationPrevButton(user)
          await taskTableTestUtils.loadingStarted()
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

          await taskTableTestUtils.loadingFinished()
          await taskTableTestUtils.userClickPaginationPageButton(user, '2')
          await taskTableTestUtils.loadingStarted()
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

          await taskTableTestUtils.loadingFinished()
          await taskTableTestUtils.userChangePageSize(
            user,
            paginationConfig.pageSizeOptions[0],
          )
          await taskTableTestUtils.loadingStarted()
        })
      })
    })
  })
})
