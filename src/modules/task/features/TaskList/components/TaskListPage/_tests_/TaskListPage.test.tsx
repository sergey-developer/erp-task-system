import {
  mockGetTaskCountersSuccess,
  mockGetTaskListSuccess,
  mockGetTaskSuccess,
  mockGetWorkGroupListSuccess,
} from '_tests_/mocks/api'
import { getCheckboxIn, render, setupApiTests } from '_tests_/utils'
import { getStoreWithAuth } from '_tests_/utils/auth'
import { waitFor } from '@testing-library/react'
import * as taskFixtures from 'fixtures/task'
import { getGetTaskListResponse, getTaskListItem } from 'fixtures/task'
import { taskExtendedStatusDict } from 'modules/task/constants/dictionary'
import { UserRolesEnum } from 'shared/constants/roles'

import * as taskDetailsTestUtils from '../../../../TaskView/components/TaskDetails/_tests_/utils'
import { FastFilterEnum } from '../../../constants/common'
import { GetTaskCountersResponseModel } from '../../../models'
import * as extendedFilterTestUtils from '../../ExtendedFilter/_tests_/utils'
import * as fastFilterTestUtils from '../../FastFilter/_tests_/utils'
import * as taskTableTestUtils from '../../TaskTable/_tests_/utils'
import { paginationConfig } from '../../TaskTable/constants/pagination'
import { DEFAULT_PAGE_SIZE } from '../constants'
import TaskListPage from '../index'
import * as taskListPageTestUtils from './utils'

setupApiTests()
jest.setTimeout(7000)

describe('Страница реестра заявок', () => {
  test('Отображается корректно', () => {
    render(<TaskListPage />)

    const page = taskListPageTestUtils.getTaskListPage()
    expect(page).toBeInTheDocument()
  })

  describe('Быстрый фильтр', () => {
    test('Отображается', async () => {
      render(<TaskListPage />)

      const fastFilter = fastFilterTestUtils.getFastFilter()
      expect(fastFilter).toBeInTheDocument()
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

    // test('Если нажать уже на выбранный фильтр, то запрос не отправляется', async () => {
    //   mockGetTaskCountersSuccess()
    //   mockGetTaskListSuccess()
    //
    //   const { user } = render(<TaskListPage />, { store: getStoreWithAuth() })
    //
    //   await taskTableTestUtils.loadingFinished()
    //   await fastFilterTestUtils.loadingFinished()
    //   await fastFilterTestUtils.userChangeFilter(user, FastFilterEnum.All)
    // })

    test('Сбрасывает расширенный фильтр', async () => {
      mockGetWorkGroupListSuccess()
      mockGetTaskCountersSuccess()
      mockGetTaskListSuccess({ once: false })

      const { user } = render(<TaskListPage />, { store: getStoreWithAuth() })

      await fastFilterTestUtils.loadingFinished()
      await taskTableTestUtils.loadingFinished()

      await taskListPageTestUtils.userOpenExtendedFilter(user)
      await extendedFilterTestUtils.findFilter()
      const statusCheckbox1 = await extendedFilterTestUtils.userSelectStatus(
        user,
        taskExtendedStatusDict.NEW!,
      )
      expect(statusCheckbox1).toBeChecked()

      await extendedFilterTestUtils.userApplyFilter(user)
      await taskTableTestUtils.loadingFinished()

      await fastFilterTestUtils.userChangeFilter(user, FastFilterEnum.Free)
      await taskTableTestUtils.loadingFinished()

      await taskListPageTestUtils.userOpenExtendedFilter(user)
      await extendedFilterTestUtils.findFilter()
      const statusCheckbox2 = getCheckboxIn(
        extendedFilterTestUtils.getStatusContainer(),
        taskExtendedStatusDict.NEW,
      )
      expect(statusCheckbox2).not.toBeChecked()
    })

    test('Закрывает карточку заявки', async () => {
      mockGetWorkGroupListSuccess()
      mockGetTaskCountersSuccess()

      const taskListItem = getTaskListItem()
      mockGetTaskListSuccess({
        once: false,
        body: getGetTaskListResponse([taskListItem]),
      })
      mockGetTaskSuccess(taskListItem.id)

      const { user } = render(<TaskListPage />, { store: getStoreWithAuth() })

      await taskTableTestUtils.loadingFinished()
      await taskTableTestUtils.userClickRow(user, taskListItem.id)
      const taskDetails = await taskDetailsTestUtils.findTaskDetails()

      await fastFilterTestUtils.userChangeFilter(user, FastFilterEnum.Free)
      await taskTableTestUtils.loadingFinished()
      await waitFor(() => {
        expect(taskDetails).not.toBeInTheDocument()
      })
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
  })

  describe('Расширенный фильтр', () => {
    describe('После применения', () => {
      test('Закрывается', async () => {
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
        const taskDetails = await taskDetailsTestUtils.findTaskDetails()

        await taskListPageTestUtils.userOpenExtendedFilter(user)
        await extendedFilterTestUtils.findFilter()
        await extendedFilterTestUtils.userSelectStatus(
          user,
          taskExtendedStatusDict.NEW!,
        )
        await extendedFilterTestUtils.userApplyFilter(user)

        await waitFor(() => {
          expect(taskDetails).not.toBeInTheDocument()
        })
      })

      test('Быстрый фильтр сбрасывается', async () => {
        mockGetWorkGroupListSuccess()
        mockGetTaskCountersSuccess()
        mockGetTaskListSuccess({ once: false })

        const { user } = render(<TaskListPage />, { store: getStoreWithAuth() })

        await fastFilterTestUtils.loadingFinished()
        await taskTableTestUtils.loadingFinished()

        const fastFilter = await fastFilterTestUtils.userChangeFilter(
          user,
          FastFilterEnum.Free,
        )
        fastFilterTestUtils.expectFilterChecked(fastFilter)
        await taskTableTestUtils.loadingFinished()

        await taskListPageTestUtils.userOpenExtendedFilter(user)
        await extendedFilterTestUtils.findFilter()
        await extendedFilterTestUtils.userSelectStatus(
          user,
          taskExtendedStatusDict.NEW!,
        )
        await extendedFilterTestUtils.userApplyFilter(user)

        await waitFor(() => {
          fastFilterTestUtils.expectFilterNotChecked(fastFilter)
        })
      })

      test('Если другой фильтр не применялся, имеет значения установленные ранее', () => {})
    })

    test('Закрывается нажав кнопку закрытия', async () => {
      const { user } = render(<TaskListPage />)

      await taskListPageTestUtils.userOpenExtendedFilter(user)
      const extendedFilter = await extendedFilterTestUtils.findFilter()

      await extendedFilterTestUtils.userCloseFilter(user)

      await waitFor(() => {
        expect(extendedFilter).not.toBeInTheDocument()
      })
    })

    test('Закрывается нажав вне фильтра', async () => {})

    test('При открытии имеет корректные значения по умолчанию', () => {})
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

      const { searchInput, searchValue } =
        await taskListPageTestUtils.userFillSearchInput(user)

      expect(searchInput).toHaveValue(searchValue)
    })

    describe('Отправляется запрос', () => {
      test('При нажатии на кнопку поиска', async () => {
        mockGetTaskCountersSuccess()
        mockGetTaskListSuccess({ once: false })

        const { user } = render(<TaskListPage />, {
          store: getStoreWithAuth(),
        })

        await taskListPageTestUtils.userFillSearchInput(user)
        await user.click(taskListPageTestUtils.getSearchButton())
        await taskTableTestUtils.loadingStarted()
      })

      test('При нажатии клавиши "Enter"', async () => {
        mockGetTaskCountersSuccess()
        mockGetTaskListSuccess({ once: false })

        const { user } = render(<TaskListPage />, {
          store: getStoreWithAuth(),
        })

        await taskListPageTestUtils.userFillSearchInput(user, true)
        await taskTableTestUtils.loadingStarted()
      })
    })

    describe('После применения', () => {
      test('Кнопка открытия расширенного фильтра недоступна', async () => {
        mockGetTaskCountersSuccess()
        mockGetTaskListSuccess({ once: false })

        const { user } = render(<TaskListPage />, {
          store: getStoreWithAuth(),
        })

        await taskListPageTestUtils.userFillSearchInput(user, true)

        const extendedFilterButton =
          taskListPageTestUtils.getExtendedFilterButton()

        await waitFor(() => {
          expect(extendedFilterButton).toBeDisabled()
        })
      })

      test('Быстрый фильтр не активен и не выделен', async () => {
        mockGetTaskCountersSuccess()
        mockGetTaskListSuccess({ once: false })

        const { user } = render(<TaskListPage />, {
          store: getStoreWithAuth(),
        })

        await fastFilterTestUtils.loadingFinished()
        const fastFilter = await fastFilterTestUtils.userChangeFilter(
          user,
          FastFilterEnum.Free,
        )
        fastFilterTestUtils.expectFilterChecked(fastFilter)
        await taskTableTestUtils.loadingFinished()

        await taskListPageTestUtils.userFillSearchInput(user, true)
        await taskTableTestUtils.loadingFinished()

        await waitFor(() => {
          fastFilterTestUtils.expectFilterNotChecked(fastFilter)
        })

        await waitFor(() => {
          fastFilterTestUtils.expectFilterDisabled(fastFilter)
        })
      })
    })

    describe('Сброс значения', () => {
      test('Очищает поле ввода', async () => {
        const { user } = render(<TaskListPage />)

        const { searchInput } = await taskListPageTestUtils.userFillSearchInput(
          user,
        )
        await taskListPageTestUtils.userClickSearchClearButton(user)

        expect(searchInput).not.toHaveValue()
      })

      test('Делает быстрый фильтр активным', async () => {
        mockGetTaskCountersSuccess()
        mockGetTaskListSuccess({ once: false })

        const { user } = render(<TaskListPage />, {
          store: getStoreWithAuth(),
        })

        await fastFilterTestUtils.loadingFinished()

        const fastFilter = fastFilterTestUtils.getCheckableTag(
          FastFilterEnum.Free,
        )
        fastFilterTestUtils.expectFilterNotDisabled(fastFilter)

        await taskListPageTestUtils.userFillSearchInput(user, true)
        await taskTableTestUtils.loadingFinished()
        await waitFor(() => {
          fastFilterTestUtils.expectFilterDisabled(fastFilter)
        })

        await taskListPageTestUtils.userClickSearchClearButton(user)
        await taskTableTestUtils.loadingFinished()
        await waitFor(() => {
          fastFilterTestUtils.expectFilterNotDisabled(fastFilter)
        })
      })

      test('Применяет быстрый фильтр если он был применён ранее', async () => {
        mockGetTaskCountersSuccess()
        mockGetTaskListSuccess({ once: false })

        const { user } = render(<TaskListPage />, {
          store: getStoreWithAuth(),
        })

        await fastFilterTestUtils.loadingFinished()

        const fastFilter = await fastFilterTestUtils.userChangeFilter(
          user,
          FastFilterEnum.Free,
        )
        fastFilterTestUtils.expectFilterChecked(fastFilter)
        await taskTableTestUtils.loadingFinished()

        await taskListPageTestUtils.userFillSearchInput(user, true)
        await waitFor(() => {
          fastFilterTestUtils.expectFilterNotChecked(fastFilter)
        })
        await taskTableTestUtils.loadingFinished()

        await taskListPageTestUtils.userClickSearchClearButton(user)
        await waitFor(() => {
          fastFilterTestUtils.expectFilterChecked(fastFilter)
        })
      })

      test('Делает кнопку открытия расширенного фильтра активной', async () => {
        mockGetTaskCountersSuccess()
        mockGetTaskListSuccess({ once: false })

        const { user } = render(<TaskListPage />, {
          store: getStoreWithAuth(),
        })

        const extendedFilterButton =
          taskListPageTestUtils.getExtendedFilterButton()

        expect(extendedFilterButton).toBeEnabled()

        await taskListPageTestUtils.userFillSearchInput(user, true)

        await waitFor(() => {
          expect(extendedFilterButton).toBeDisabled()
        })

        await taskListPageTestUtils.userClickSearchClearButton(user)

        await waitFor(() => {
          expect(extendedFilterButton).toBeEnabled()
        })
      })

      test('Применяет расширенный фильтр если он был применён ранее', async () => {
        mockGetTaskCountersSuccess()
        mockGetWorkGroupListSuccess()
        mockGetTaskListSuccess({ once: false })

        const { user } = render(<TaskListPage />, {
          store: getStoreWithAuth(),
        })

        await taskListPageTestUtils.userOpenExtendedFilter(user)
        await extendedFilterTestUtils.findFilter()
        const statusCheckbox = await extendedFilterTestUtils.userSelectStatus(
          user,
          taskExtendedStatusDict.NEW!,
        )

        await extendedFilterTestUtils.userApplyFilter(user)
        await taskTableTestUtils.loadingFinished()

        await taskListPageTestUtils.userFillSearchInput(user, true)
        await taskTableTestUtils.loadingFinished()
        await taskListPageTestUtils.userClickSearchClearButton(user)
        await taskTableTestUtils.loadingFinished()

        await taskListPageTestUtils.userOpenExtendedFilter(user)
        await extendedFilterTestUtils.findFilter()

        expect(statusCheckbox).toBeChecked()
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
      const taskDetails = await taskDetailsTestUtils.findTaskDetails()
      await taskListPageTestUtils.userClickReloadListButton(user)

      await waitFor(() => {
        expect(taskDetails).not.toBeInTheDocument()
      })
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

        const taskDetails = await taskDetailsTestUtils.findTaskDetails()
        expect(taskDetails).toBeInTheDocument()
      })
    })

    describe('Колонка', () => {
      describe('Заявка', () => {
        test('Сортировка / При клике на заголовок отправляется запрос', async () => {
          mockGetTaskCountersSuccess()
          mockGetTaskListSuccess({ once: false })

          const { user } = render(<TaskListPage />, {
            store: getStoreWithAuth(),
          })

          await taskTableTestUtils.loadingFinished()
          await taskTableTestUtils.userClickHeadCol(user, 'Заявка')
          await taskTableTestUtils.loadingStarted()
        })
      })

      describe('Внешний номер', () => {
        test('Сортировка / При клике на заголовок отправляется запрос', async () => {
          mockGetTaskCountersSuccess()
          mockGetTaskListSuccess({ once: false })

          const { user } = render(<TaskListPage />, {
            store: getStoreWithAuth(),
          })

          await taskTableTestUtils.loadingFinished()
          await taskTableTestUtils.userClickHeadCol(user, 'Внеш.номер')
          await taskTableTestUtils.loadingStarted()
        })
      })

      describe('Объект', () => {
        test('Сортировка / При клике на заголовок отправляется запрос', async () => {
          mockGetTaskCountersSuccess()
          mockGetTaskListSuccess({ once: false })

          const { user } = render(<TaskListPage />, {
            store: getStoreWithAuth(),
          })

          await taskTableTestUtils.loadingFinished()
          await taskTableTestUtils.userClickHeadCol(user, 'Объект')
          await taskTableTestUtils.loadingStarted()
        })
      })

      describe('Тема', () => {
        test('Сортировка / При клике на заголовок отправляется запрос', async () => {
          mockGetTaskCountersSuccess()
          mockGetTaskListSuccess({ once: false })

          const { user } = render(<TaskListPage />, {
            store: getStoreWithAuth(),
          })

          await taskTableTestUtils.loadingFinished()
          await taskTableTestUtils.userClickHeadCol(user, 'Тема')
          await taskTableTestUtils.loadingStarted()
        })
      })

      describe('Исполнитель', () => {
        test('Сортировка / При клике на заголовок отправляется запрос', async () => {
          mockGetTaskCountersSuccess()
          mockGetTaskListSuccess({ once: false })

          const { user } = render(<TaskListPage />, {
            store: getStoreWithAuth(),
          })

          await taskTableTestUtils.loadingFinished()
          await taskTableTestUtils.userClickHeadCol(user, 'Исполнитель')
          await taskTableTestUtils.loadingStarted()
        })
      })

      describe('Рабочая группа', () => {
        test('Сортировка / При клике на заголовок отправляется запрос', async () => {
          mockGetTaskCountersSuccess()
          mockGetTaskListSuccess({ once: false })

          const { user } = render(<TaskListPage />, {
            store: getStoreWithAuth(),
          })

          await taskTableTestUtils.loadingFinished()
          await taskTableTestUtils.userClickHeadCol(user, 'Рабочая группа')
          await taskTableTestUtils.loadingStarted()
        })
      })

      describe('Выполнить до', () => {
        test('Сортировка / При клике на заголовок отправляется запрос', async () => {
          mockGetTaskCountersSuccess()
          mockGetTaskListSuccess({ once: false })

          const { user } = render(<TaskListPage />, {
            store: getStoreWithAuth(),
          })

          await taskTableTestUtils.loadingFinished()
          await taskTableTestUtils.userClickHeadCol(user, 'Выполнить до')
          await taskTableTestUtils.loadingStarted()
        })
      })

      describe('Комментарий', () => {
        test('Сортировка / При клике на заголовок отправляется запрос', async () => {
          mockGetTaskCountersSuccess()
          mockGetTaskListSuccess({ once: false })

          const { user } = render(<TaskListPage />, {
            store: getStoreWithAuth(),
          })

          await taskTableTestUtils.loadingFinished()
          await taskTableTestUtils.userClickHeadCol(user, 'Комментарий')
          await taskTableTestUtils.loadingStarted()
        })
      })

      describe('Дата создания', () => {
        test('Сортировка / При клике на заголовок отправляется запрос', async () => {
          mockGetTaskCountersSuccess()
          mockGetTaskListSuccess({ once: false })

          const { user } = render(<TaskListPage />, {
            store: getStoreWithAuth(),
          })

          await taskTableTestUtils.loadingFinished()
          await taskTableTestUtils.userClickHeadCol(user, 'Дата создания')
          await taskTableTestUtils.loadingStarted()
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

          const nextButton = taskTableTestUtils.getPaginationNextButton()
          await user.click(nextButton)

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

          const nextButton = taskTableTestUtils.getPaginationNextButton()
          await user.click(nextButton)

          await taskTableTestUtils.loadingFinished()

          const prevButton = taskTableTestUtils.getPaginationPrevButton()
          await user.click(prevButton)

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

          const pageButton = taskTableTestUtils.getPaginationPageButton('2')
          await user.click(pageButton)

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
