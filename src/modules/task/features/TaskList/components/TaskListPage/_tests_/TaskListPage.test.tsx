import {
  mockGetTaskCountersSuccess,
  mockGetTaskListSuccess,
  mockGetTaskSuccess,
  mockGetWorkGroupListSuccess,
} from '_tests_/mocks/api'
import {
  generateWord,
  getSelectedOption,
  getStoreWithAuth,
  render,
  setupApiTests,
} from '_tests_/utils'
import { waitFor } from '@testing-library/react'
import taskFixtures from 'fixtures/task'
import workGroupFixtures from 'fixtures/workGroup'
import { taskExtendedStatusDict } from 'modules/task/constants/dictionary'
import taskDetailsTestUtils from 'modules/task/features/TaskView/components/TaskDetails/_tests_/utils'
import { UserRolesEnum } from 'shared/constants/roles'

import { FastFilterEnum } from '../../../constants/common'
import { GetTaskCountersResponseModel } from '../../../models'
import extendedFilterTestUtils from '../../ExtendedFilter/_tests_/utils'
import {
  searchFieldDict,
  taskAssignedDict,
  taskOverdueDict,
} from '../../ExtendedFilter/constants'
import fastFilterTestUtils from '../../FastFilter/_tests_/utils'
import taskTableTestUtils from '../../TaskTable/_tests_/utils'
import { paginationConfig } from '../../TaskTable/constants/pagination'
import { DEFAULT_PAGE_SIZE } from '../constants'
import TaskListPage from '../index'
import taskListPageTestUtils from './utils'

setupApiTests()

describe('Страница реестра заявок', () => {
  test('Отображается корректно', () => {
    render(<TaskListPage />)
    expect(taskListPageTestUtils.getContainer()).toBeInTheDocument()
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
      const taskCountersResponse = taskFixtures.getGetTaskCountersResponse()
      mockGetTaskCountersSuccess({ body: taskCountersResponse })
      mockGetTaskListSuccess()

      render(<TaskListPage />, { store: getStoreWithAuth() })

      await fastFilterTestUtils.loadingFinished()

      Object.values(FastFilterEnum).forEach((filter) => {
        const counterName = filter.toLowerCase()
        const taskCount =
          taskCountersResponse[
            counterName as keyof GetTaskCountersResponseModel
          ]

        const counter = fastFilterTestUtils.getByTextInCheckableTag(
          filter,
          taskCount,
        )

        expect(counter).toBeInTheDocument()
      })
    })

    describe('Имеет корректное значение по умолчанию', () => {
      test('Роль - первая линия поддержки', async () => {
        mockGetTaskCountersSuccess()
        mockGetTaskListSuccess()

        render(<TaskListPage />, {
          store: getStoreWithAuth({ userRole: UserRolesEnum.FirstLineSupport }),
        })

        await taskTableTestUtils.loadingFinished()
        await fastFilterTestUtils.loadingFinished()

        fastFilterTestUtils.expectFilterChecked(
          fastFilterTestUtils.getCheckableTag(FastFilterEnum.All),
        )
      })

      test('Роль - инженер', async () => {
        mockGetTaskCountersSuccess()
        mockGetTaskListSuccess()

        render(<TaskListPage />, {
          store: getStoreWithAuth({ userRole: UserRolesEnum.Engineer }),
        })

        await taskTableTestUtils.loadingFinished()
        await fastFilterTestUtils.loadingFinished()

        fastFilterTestUtils.expectFilterChecked(
          fastFilterTestUtils.getCheckableTag(FastFilterEnum.Mine),
        )
      })

      test('Роль - старший инженер', async () => {
        mockGetTaskCountersSuccess()
        mockGetTaskListSuccess()

        render(<TaskListPage />, {
          store: getStoreWithAuth({ userRole: UserRolesEnum.SeniorEngineer }),
        })

        await taskTableTestUtils.loadingFinished()
        await fastFilterTestUtils.loadingFinished()

        fastFilterTestUtils.expectFilterChecked(
          fastFilterTestUtils.getCheckableTag(FastFilterEnum.All),
        )
      })

      test('Роль - глава отдела', async () => {
        mockGetTaskCountersSuccess()
        mockGetTaskListSuccess()

        render(<TaskListPage />, {
          store: getStoreWithAuth({ userRole: UserRolesEnum.HeadOfDepartment }),
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
      mockGetWorkGroupListSuccess({ body: [workGroupListItem] })
      mockGetTaskCountersSuccess()
      mockGetTaskListSuccess({ once: false })

      const { user } = render(<TaskListPage />, {
        store: getStoreWithAuth({
          userRole: UserRolesEnum.SeniorEngineer,
        }),
      })

      await fastFilterTestUtils.loadingFinished()
      await taskTableTestUtils.loadingFinished()

      await taskListPageTestUtils.userOpenExtendedFilter(user)
      await extendedFilterTestUtils.findFilter()

      await extendedFilterTestUtils.status.userSetValue(
        user,
        taskExtendedStatusDict.NEW!,
      )

      await extendedFilterTestUtils.assigned.userSetValue(
        user,
        taskAssignedDict.True,
      )

      await extendedFilterTestUtils.overdue.userSetValue(
        user,
        taskOverdueDict.False,
      )

      const { startDateValue, endDateValue } =
        await extendedFilterTestUtils.completeAt.userSetValue(user)

      const { keyword: searchByColumnKeywordValue } =
        await extendedFilterTestUtils.searchByColumn.userSetKeywordValue(user)

      await extendedFilterTestUtils.searchByColumn.userSetColumnValue(
        user,
        searchFieldDict.searchByName,
      )

      const workGroupField =
        await extendedFilterTestUtils.workGroup.loadingFinished()
      await extendedFilterTestUtils.workGroup.openField(user, workGroupField)
      await extendedFilterTestUtils.workGroup.userSetValue(
        user,
        workGroupListItem.name,
      )

      await extendedFilterTestUtils.userApplyFilter(user)
      await taskTableTestUtils.loadingFinished()

      await fastFilterTestUtils.userChangeFilter(user, FastFilterEnum.Free)
      await taskTableTestUtils.loadingFinished()

      await taskListPageTestUtils.userOpenExtendedFilter(user)
      await extendedFilterTestUtils.findFilter()

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

    test('Закрывает карточку заявки', async () => {
      mockGetWorkGroupListSuccess()
      mockGetTaskCountersSuccess()

      const taskListItem = taskFixtures.getTaskListItem()
      mockGetTaskListSuccess({
        once: false,
        body: taskFixtures.getGetTaskListResponse([taskListItem]),
      })
      mockGetTaskSuccess(taskListItem.id)

      const { user } = render(<TaskListPage />, { store: getStoreWithAuth() })

      await taskTableTestUtils.loadingFinished()
      await taskTableTestUtils.userClickRow(user, taskListItem.id)
      const taskDetails = await taskDetailsTestUtils.findContainer()

      await fastFilterTestUtils.userChangeFilter(user, FastFilterEnum.Free)

      await waitFor(() => {
        expect(taskDetails).not.toBeInTheDocument()
      })
    })

    test('Сбрасывает значение поля поиска', async () => {
      mockGetTaskCountersSuccess()
      mockGetTaskListSuccess({ once: false })

      const { user } = render(<TaskListPage />, { store: getStoreWithAuth() })

      await taskTableTestUtils.loadingFinished()
      await fastFilterTestUtils.loadingFinished()

      const searchValue = generateWord()
      const searchInput = await taskListPageTestUtils.userFillSearchInput(
        user,
        searchValue,
      )

      await fastFilterTestUtils.userChangeFilter(user, FastFilterEnum.Closed)
      await taskTableTestUtils.loadingFinished()

      expect(searchInput).not.toHaveValue()
      expect(searchInput).not.toHaveDisplayValue(searchValue)
    })
  })

  describe('Кнопка расширенных фильтров', () => {
    test('Отображается корректно', () => {
      render(<TaskListPage />)

      const button = taskListPageTestUtils.getExtendedFilterButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Открывает расширенный фильтр', async () => {
      const { user } = render(<TaskListPage />)

      await taskListPageTestUtils.userOpenExtendedFilter(user)
      const filter = await extendedFilterTestUtils.findFilter()
      expect(filter).toBeInTheDocument()
    })

    test('Не активна во время загрузки заявок', async () => {
      mockGetTaskCountersSuccess()
      mockGetTaskListSuccess()

      render(<TaskListPage />, { store: getStoreWithAuth() })

      const button = taskListPageTestUtils.getExtendedFilterButton()
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
        await taskListPageTestUtils.userOpenExtendedFilter(user)
        await extendedFilterTestUtils.findFilter()
        await extendedFilterTestUtils.userApplyFilter(user)
        await taskTableTestUtils.loadingStarted()
      })

      test('Фильтр закрывается', async () => {
        const { user } = render(<TaskListPage />)

        await taskListPageTestUtils.userOpenExtendedFilter(user)
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
          body: taskFixtures.getGetTaskListResponse([taskListItem]),
          once: false,
        })
        mockGetTaskSuccess(taskListItem.id)

        const { user } = render(<TaskListPage />, { store: getStoreWithAuth() })

        await taskTableTestUtils.loadingFinished()
        await taskTableTestUtils.userClickRow(user, taskListItem.id)
        const taskDetails = await taskDetailsTestUtils.findContainer()

        await taskListPageTestUtils.userOpenExtendedFilter(user)
        await extendedFilterTestUtils.findFilter()
        await extendedFilterTestUtils.userApplyFilter(user)

        await waitFor(() => {
          expect(taskDetails).not.toBeInTheDocument()
        })
      })

      test('Быстрый фильтр сбрасывается', async () => {
        const { user } = render(<TaskListPage />)

        const fastFilter = fastFilterTestUtils.getCheckableTag(
          FastFilterEnum.All,
        )
        fastFilterTestUtils.expectFilterChecked(fastFilter)

        await taskListPageTestUtils.userOpenExtendedFilter(user)
        await extendedFilterTestUtils.findFilter()
        await extendedFilterTestUtils.userApplyFilter(user)

        await waitFor(() => {
          fastFilterTestUtils.expectFilterNotChecked(fastFilter)
        })
      })

      test('Закрывается нажав кнопку закрытия', async () => {
        const { user } = render(<TaskListPage />)

        await taskListPageTestUtils.userOpenExtendedFilter(user)
        const filter = await extendedFilterTestUtils.findFilter()
        await extendedFilterTestUtils.userCloseFilter(user)

        await waitFor(() => {
          expect(filter).not.toBeInTheDocument()
        })
      })

      test('Закрывается нажав вне фильтра', async () => {
        const { user } = render(<TaskListPage />)

        await taskListPageTestUtils.userOpenExtendedFilter(user)
        const filter = await extendedFilterTestUtils.findFilter()
        await extendedFilterTestUtils.userClickOutOfFilter(user)

        await waitFor(() => {
          expect(filter).not.toBeInTheDocument()
        })
      })

      test('Значения сохраняются если другой фильтр не применялся', async () => {
        const workGroupListItem = workGroupFixtures.getWorkGroup()
        mockGetWorkGroupListSuccess({ body: [workGroupListItem] })
        mockGetTaskCountersSuccess()
        mockGetTaskListSuccess({ once: false })

        const { user } = render(<TaskListPage />, {
          store: getStoreWithAuth({ userRole: UserRolesEnum.SeniorEngineer }),
        })

        await taskTableTestUtils.loadingFinished()
        await taskListPageTestUtils.userOpenExtendedFilter(user)
        await extendedFilterTestUtils.findFilter()

        await extendedFilterTestUtils.status.userSetValue(
          user,
          taskExtendedStatusDict.NEW!,
        )

        await extendedFilterTestUtils.assigned.userSetValue(
          user,
          taskAssignedDict.True,
        )

        await extendedFilterTestUtils.overdue.userSetValue(
          user,
          taskOverdueDict.False,
        )

        const { startDateValue, endDateValue } =
          await extendedFilterTestUtils.completeAt.userSetValue(user)

        const { keyword: searchByColumnKeywordValue } =
          await extendedFilterTestUtils.searchByColumn.userSetKeywordValue(user)

        await extendedFilterTestUtils.searchByColumn.userSetColumnValue(
          user,
          searchFieldDict.searchByName,
        )

        const workGroupField =
          await extendedFilterTestUtils.workGroup.loadingFinished()
        await extendedFilterTestUtils.workGroup.openField(user, workGroupField)
        await extendedFilterTestUtils.workGroup.userSetValue(
          user,
          workGroupListItem.name,
        )

        await extendedFilterTestUtils.userApplyFilter(user)
        await taskTableTestUtils.loadingStarted()
        await taskTableTestUtils.loadingFinished()
        await taskListPageTestUtils.userOpenExtendedFilter(user)
        await extendedFilterTestUtils.findFilter()

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
        store: getStoreWithAuth({ userRole: UserRolesEnum.SeniorEngineer }),
      })

      await taskTableTestUtils.loadingFinished()
      await taskListPageTestUtils.userOpenExtendedFilter(user)
      const filter = await extendedFilterTestUtils.findFilter()

      await extendedFilterTestUtils.status.userSetValue(
        user,
        taskExtendedStatusDict.NEW!,
      )

      await extendedFilterTestUtils.assigned.userSetValue(
        user,
        taskAssignedDict.True,
      )

      await extendedFilterTestUtils.overdue.userSetValue(
        user,
        taskOverdueDict.False,
      )

      const { startDateValue, endDateValue } =
        await extendedFilterTestUtils.completeAt.userSetValue(user)

      const { keyword: searchByColumnKeywordValue } =
        await extendedFilterTestUtils.searchByColumn.userSetKeywordValue(user)

      await extendedFilterTestUtils.searchByColumn.userSetColumnValue(
        user,
        searchFieldDict.searchByName,
      )

      const workGroupField =
        await extendedFilterTestUtils.workGroup.loadingFinished()
      await extendedFilterTestUtils.workGroup.openField(user, workGroupField)
      await extendedFilterTestUtils.workGroup.userSetValue(
        user,
        workGroupListItem.name,
      )

      await extendedFilterTestUtils.userCloseFilter(user)
      await waitFor(() => {
        expect(filter).not.toBeInTheDocument()
      })

      await taskListPageTestUtils.userOpenExtendedFilter(user)
      await extendedFilterTestUtils.findFilter()

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

        await taskListPageTestUtils.userOpenExtendedFilter(user)
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
            userRole: UserRolesEnum.SeniorEngineer,
          }),
        })

        await taskTableTestUtils.loadingFinished()
        await taskListPageTestUtils.userOpenExtendedFilter(user)
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

      const searchInput = taskListPageTestUtils.getSearchInput()

      expect(searchInput).toBeInTheDocument()
      expect(searchInput).toBeEnabled()
      expect(searchInput).not.toHaveValue()
    })

    test('Можно ввести значение', async () => {
      const { user } = render(<TaskListPage />)

      const value = generateWord()
      const input = await taskListPageTestUtils.userFillSearchInput(user, value)

      expect(input).toHaveValue(value)
    })

    test('Поле не активно во время загрузки заявок', async () => {
      mockGetTaskCountersSuccess()
      mockGetTaskListSuccess()

      render(<TaskListPage />, { store: getStoreWithAuth() })

      const searchInput = taskListPageTestUtils.getSearchInput()
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
          body: taskFixtures.getGetTaskListResponse([taskListItem]),
          once: false,
        })
        mockGetTaskSuccess(taskListItem.id)

        const { user } = render(<TaskListPage />, {
          store: getStoreWithAuth(),
        })

        await taskTableTestUtils.loadingFinished()
        await taskTableTestUtils.userClickRow(user, taskListItem.id)
        const taskDetails = await taskDetailsTestUtils.findContainer()
        await taskListPageTestUtils.userFillSearchInput(
          user,
          generateWord(),
          true,
        )
        await waitFor(() => {
          expect(taskDetails).not.toBeInTheDocument()
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
          await taskListPageTestUtils.userFillSearchInput(user, generateWord())
          await user.click(taskListPageTestUtils.getSearchButton())
          await taskTableTestUtils.loadingStarted()
        })

        test('При нажатии клавиши "Enter"', async () => {
          mockGetTaskCountersSuccess()
          mockGetTaskListSuccess({ once: false })

          const { user } = render(<TaskListPage />, {
            store: getStoreWithAuth(),
          })

          await taskTableTestUtils.loadingFinished()
          await taskListPageTestUtils.userFillSearchInput(
            user,
            generateWord(),
            true,
          )
          await taskTableTestUtils.loadingStarted()
        })
      })

      test('Кнопка открытия расширенного фильтра недоступна', async () => {
        const { user } = render(<TaskListPage />)

        await taskListPageTestUtils.userFillSearchInput(
          user,
          generateWord(),
          true,
        )

        const extendedFilterButton =
          taskListPageTestUtils.getExtendedFilterButton()

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

        await taskListPageTestUtils.userFillSearchInput(
          user,
          generateWord(),
          true,
        )

        await waitFor(() => {
          fastFilterTestUtils.expectFilterNotChecked(fastFilter)
        })
      })
    })

    describe('Очищение поля через клавиатуру', () => {
      test('Применяет быстрый фильтр если он был применён ранее', async () => {
        const { user } = render(<TaskListPage />)

        const input = await taskListPageTestUtils.userFillSearchInput(
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

        await taskListPageTestUtils.userClearSearchFieldByBackspace(user, input)
        await waitFor(() => {
          fastFilterTestUtils.expectFilterChecked(fastFilter)
        })
      })

      test('Делает кнопку открытия расширенного фильтра активной', async () => {
        const { user } = render(<TaskListPage />)

        const extendedFilterButton =
          taskListPageTestUtils.getExtendedFilterButton()
        expect(extendedFilterButton).toBeEnabled()

        const input = await taskListPageTestUtils.userFillSearchInput(
          user,
          generateWord({ length: 1 }),
          true,
        )
        await waitFor(() => {
          expect(extendedFilterButton).toBeDisabled()
        })

        await taskListPageTestUtils.userClearSearchFieldByBackspace(user, input)
        await waitFor(() => {
          expect(extendedFilterButton).toBeEnabled()
        })
      })

      test('Применяет расширенный фильтр если он был применён ранее', async () => {
        const workGroupListItem = workGroupFixtures.getWorkGroup()
        mockGetWorkGroupListSuccess({ body: [workGroupListItem] })
        mockGetTaskCountersSuccess()
        mockGetTaskListSuccess({ once: false })

        const { user } = render(<TaskListPage />, {
          store: getStoreWithAuth({ userRole: UserRolesEnum.SeniorEngineer }),
        })

        await taskTableTestUtils.loadingStarted()
        await taskTableTestUtils.loadingFinished()
        await taskListPageTestUtils.userOpenExtendedFilter(user)
        await extendedFilterTestUtils.findFilter()

        await extendedFilterTestUtils.status.userSetValue(
          user,
          taskExtendedStatusDict.NEW!,
        )

        await extendedFilterTestUtils.assigned.userSetValue(
          user,
          taskAssignedDict.True,
        )

        await extendedFilterTestUtils.overdue.userSetValue(
          user,
          taskOverdueDict.False,
        )

        const { startDateValue, endDateValue } =
          await extendedFilterTestUtils.completeAt.userSetValue(user)

        const { keyword: searchByColumnKeywordValue } =
          await extendedFilterTestUtils.searchByColumn.userSetKeywordValue(user)

        await extendedFilterTestUtils.searchByColumn.userSetColumnValue(
          user,
          searchFieldDict.searchByName,
        )

        const workGroupField =
          await extendedFilterTestUtils.workGroup.loadingFinished()
        await extendedFilterTestUtils.workGroup.openField(user, workGroupField)
        await extendedFilterTestUtils.workGroup.userSetValue(
          user,
          workGroupListItem.name,
        )

        await extendedFilterTestUtils.userApplyFilter(user)
        await taskTableTestUtils.loadingStarted()
        await taskTableTestUtils.loadingFinished()

        const searchInput = await taskListPageTestUtils.userFillSearchInput(
          user,
          generateWord({ length: 1 }),
          true,
        )
        await taskTableTestUtils.loadingStarted()
        await taskTableTestUtils.loadingFinished()
        await taskListPageTestUtils.userClearSearchFieldByBackspace(
          user,
          searchInput,
        )
        await taskTableTestUtils.loadingStarted()
        await taskTableTestUtils.loadingFinished()

        await taskListPageTestUtils.userOpenExtendedFilter(user)
        await extendedFilterTestUtils.findFilter()

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

        const input = await taskListPageTestUtils.userFillSearchInput(
          user,
          generateWord(),
        )
        await taskListPageTestUtils.userClickSearchClearButton(user)

        expect(input).not.toHaveValue()
      })

      test('Применяет быстрый фильтр если он был применён ранее', async () => {
        const { user } = render(<TaskListPage />)

        await taskListPageTestUtils.userFillSearchInput(
          user,
          generateWord(),
          true,
        )
        const fastFilter = fastFilterTestUtils.getCheckableTag(
          FastFilterEnum.All,
        )
        await waitFor(() => {
          fastFilterTestUtils.expectFilterNotChecked(fastFilter)
        })

        await taskListPageTestUtils.userClickSearchClearButton(user)
        await waitFor(() => {
          fastFilterTestUtils.expectFilterChecked(fastFilter)
        })
      })

      test('Делает кнопку открытия расширенного фильтра активной', async () => {
        const { user } = render(<TaskListPage />)

        const extendedFilterButton =
          taskListPageTestUtils.getExtendedFilterButton()
        expect(extendedFilterButton).toBeEnabled()

        await taskListPageTestUtils.userFillSearchInput(
          user,
          generateWord(),
          true,
        )
        await waitFor(() => {
          expect(extendedFilterButton).toBeDisabled()
        })

        await taskListPageTestUtils.userClickSearchClearButton(user)
        await waitFor(() => {
          expect(extendedFilterButton).toBeEnabled()
        })
      })

      test('Применяет расширенный фильтр если он был применён ранее', async () => {
        const workGroupListItem = workGroupFixtures.getWorkGroup()
        mockGetWorkGroupListSuccess({ body: [workGroupListItem] })
        mockGetTaskCountersSuccess()
        mockGetTaskListSuccess({ once: false })

        const { user } = render(<TaskListPage />, {
          store: getStoreWithAuth({ userRole: UserRolesEnum.SeniorEngineer }),
        })

        await taskTableTestUtils.loadingStarted()
        await taskTableTestUtils.loadingFinished()
        await taskListPageTestUtils.userOpenExtendedFilter(user)
        await extendedFilterTestUtils.findFilter()

        await extendedFilterTestUtils.status.userSetValue(
          user,
          taskExtendedStatusDict.NEW!,
        )

        await extendedFilterTestUtils.assigned.userSetValue(
          user,
          taskAssignedDict.True,
        )

        await extendedFilterTestUtils.overdue.userSetValue(
          user,
          taskOverdueDict.False,
        )

        const { startDateValue, endDateValue } =
          await extendedFilterTestUtils.completeAt.userSetValue(user)

        const { keyword: searchByColumnKeywordValue } =
          await extendedFilterTestUtils.searchByColumn.userSetKeywordValue(user)

        await extendedFilterTestUtils.searchByColumn.userSetColumnValue(
          user,
          searchFieldDict.searchByName,
        )

        const workGroupField =
          await extendedFilterTestUtils.workGroup.loadingFinished()
        await extendedFilterTestUtils.workGroup.openField(user, workGroupField)
        await extendedFilterTestUtils.workGroup.userSetValue(
          user,
          workGroupListItem.name,
        )

        await extendedFilterTestUtils.userApplyFilter(user)
        await taskTableTestUtils.loadingStarted()
        await taskTableTestUtils.loadingFinished()

        await taskListPageTestUtils.userFillSearchInput(
          user,
          generateWord(),
          true,
        )
        await taskTableTestUtils.loadingStarted()
        await taskTableTestUtils.loadingFinished()
        await taskListPageTestUtils.userClickSearchClearButton(user)
        await taskTableTestUtils.loadingStarted()
        await taskTableTestUtils.loadingFinished()

        await taskListPageTestUtils.userOpenExtendedFilter(user)
        await extendedFilterTestUtils.findFilter()

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

      const button = taskListPageTestUtils.getReloadListButton()

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
      await taskListPageTestUtils.userClickReloadListButton(user)
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
      await taskListPageTestUtils.userClickReloadListButton(user)
      await fastFilterTestUtils.loadingStarted()
    })

    test('Закрывает карточку заявки', async () => {
      mockGetWorkGroupListSuccess()
      mockGetTaskCountersSuccess({ once: false })

      const taskListItem = taskFixtures.getTaskListItem()
      mockGetTaskListSuccess({
        body: taskFixtures.getGetTaskListResponse([taskListItem]),
        once: false,
      })
      mockGetTaskSuccess(taskListItem.id)

      const { user } = render(<TaskListPage />, { store: getStoreWithAuth() })

      await taskTableTestUtils.loadingFinished()
      await taskTableTestUtils.userClickRow(user, taskListItem.id)
      const taskDetails = await taskDetailsTestUtils.findContainer()
      await taskListPageTestUtils.userClickReloadListButton(user)

      await waitFor(() => {
        expect(taskDetails).not.toBeInTheDocument()
      })
    })

    test('Не активна во время загрузки заявок', async () => {
      mockGetTaskCountersSuccess()
      mockGetTaskListSuccess()

      render(<TaskListPage />, { store: getStoreWithAuth() })

      const button = taskListPageTestUtils.getReloadListButton()
      await taskTableTestUtils.loadingStarted()
      expect(button).toBeDisabled()
      await taskTableTestUtils.loadingFinished()
      expect(button).toBeEnabled()
    })
  })

  describe('Кнопка создания заявки', () => {
    test('Отображается корректно', () => {
      render(<TaskListPage />)

      const button = taskListPageTestUtils.getCreateTaskButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })
  })

  describe('Таблица заявок', () => {
    test('Отображается корректно', async () => {
      const taskList = taskFixtures.getTaskList(2)

      mockGetTaskCountersSuccess()
      mockGetTaskListSuccess({
        body: taskFixtures.getGetTaskListResponse(taskList),
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
          body: taskFixtures.getGetTaskListResponse([taskListItem]),
        })
        mockGetTaskSuccess(taskListItem.id)

        const { user } = render(<TaskListPage />, { store: getStoreWithAuth() })

        await taskTableTestUtils.loadingFinished()
        const row = await taskTableTestUtils.userClickRow(user, taskListItem.id)

        await waitFor(() => {
          expect(row).toHaveClass('table-row--selected')
        })
      })

      test('Открывается карточка заявки', async () => {
        mockGetTaskCountersSuccess()
        mockGetWorkGroupListSuccess()

        const taskListItem = taskFixtures.getTaskListItem()
        mockGetTaskListSuccess({
          body: taskFixtures.getGetTaskListResponse([taskListItem]),
        })
        mockGetTaskSuccess(taskListItem.id)

        const { user } = render(<TaskListPage />, { store: getStoreWithAuth() })

        await taskTableTestUtils.loadingFinished()
        await taskTableTestUtils.userClickRow(user, taskListItem.id)

        const taskDetails = await taskDetailsTestUtils.findContainer()
        expect(taskDetails).toBeInTheDocument()
      })
    })

    describe('Колонка', () => {
      describe('Заявка', () => {
        test('Сортировка / При клике на заголовок отправляется запрос', async () => {
          mockGetTaskCountersSuccess()

          const taskList = taskFixtures.getTaskList()
          mockGetTaskListSuccess({
            once: false,
            body: taskFixtures.getGetTaskListResponse(taskList),
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
        test('Сортировка / При клике на заголовок отправляется запрос', async () => {
          mockGetTaskCountersSuccess()

          const taskList = taskFixtures.getTaskList()
          mockGetTaskListSuccess({
            once: false,
            body: taskFixtures.getGetTaskListResponse(taskList),
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
        test('Сортировка / При клике на заголовок отправляется запрос', async () => {
          mockGetTaskCountersSuccess()

          const taskList = taskFixtures.getTaskList()
          mockGetTaskListSuccess({
            once: false,
            body: taskFixtures.getGetTaskListResponse(taskList),
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
        test('Сортировка / При клике на заголовок отправляется запрос', async () => {
          mockGetTaskCountersSuccess()

          const taskList = taskFixtures.getTaskList()
          mockGetTaskListSuccess({
            once: false,
            body: taskFixtures.getGetTaskListResponse(taskList),
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
        test('Сортировка / При клике на заголовок отправляется запрос', async () => {
          mockGetTaskCountersSuccess()

          const taskList = taskFixtures.getTaskList()
          mockGetTaskListSuccess({
            once: false,
            body: taskFixtures.getGetTaskListResponse(taskList),
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
        test('Сортировка / При клике на заголовок отправляется запрос', async () => {
          mockGetTaskCountersSuccess()

          const taskList = taskFixtures.getTaskList()
          mockGetTaskListSuccess({
            once: false,
            body: taskFixtures.getGetTaskListResponse(taskList),
          })

          const { user } = render(<TaskListPage />, {
            store: getStoreWithAuth(),
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

      describe('Выполнить до', () => {
        test('Сортировка / При клике на заголовок отправляется запрос', async () => {
          mockGetTaskCountersSuccess()

          const taskList = taskFixtures.getTaskList()
          mockGetTaskListSuccess({
            once: false,
            body: taskFixtures.getGetTaskListResponse(taskList),
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
        test('При сортировке список отображается корректно', async () => {
          mockGetTaskCountersSuccess()

          const taskList = taskFixtures.getTaskList()
          mockGetTaskListSuccess({
            once: false,
            body: taskFixtures.getGetTaskListResponse(taskList),
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
        test('Сортировка / При клике на заголовок отправляется запрос', async () => {
          mockGetTaskCountersSuccess()

          const taskList = taskFixtures.getTaskList()
          mockGetTaskListSuccess({
            once: false,
            body: taskFixtures.getGetTaskListResponse(taskList),
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
        test('Сортировка / При клике на заголовок отправляется запрос', async () => {
          mockGetTaskCountersSuccess()

          const taskList = taskFixtures.getTaskList()
          mockGetTaskListSuccess({
            once: false,
            body: taskFixtures.getGetTaskListResponse(taskList),
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
            body: taskFixtures.getGetTaskListResponse(
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
            body: taskFixtures.getGetTaskListResponse(
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
            body: taskFixtures.getGetTaskListResponse(
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
            body: taskFixtures.getGetTaskListResponse(
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
