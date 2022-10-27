import {
  mockGetTaskCountersSuccess,
  mockGetTaskListSuccess,
  mockGetTaskSuccess,
  mockGetWorkGroupListSuccess,
} from '_tests_/mocks/api'
import {
  loadingFinishedByIconIn,
  loadingStartedByIconIn,
  render,
  setupApiTests,
} from '_tests_/utils'
import { getStoreWithAuth } from '_tests_/utils/auth'
import { waitFor } from '@testing-library/react'
import {
  getGetTaskListResponse,
  getTaskList,
  getTaskListItem,
} from 'fixtures/task'

import { findTaskDetails } from '../../../../TaskView/components/TaskDetails/_tests_/utils'
import {
  getPaginationNextButton as getTablePaginationNextButton,
  getPaginationPrevButton as getTablePaginationPrevButton,
  getTable as getTaskTable,
  userClickHeadCol as userClickTableHeadCol,
  userClickRow as userClickTableRow,
} from '../../TaskTable/_tests_/utils'
import { DEFAULT_PAGE_SIZE } from '../constants'
import TaskListPage from '../index'

setupApiTests()

describe('Страница реестра заявок', () => {
  describe('Таблица заявок', () => {
    test('Отображается', async () => {
      mockGetTaskCountersSuccess()
      mockGetTaskListSuccess()

      render(<TaskListPage />, { store: getStoreWithAuth() })

      const taskTable = getTaskTable()
      await loadingFinishedByIconIn(taskTable)

      expect(taskTable).toBeInTheDocument()
    })

    describe('При клике на строку', () => {
      test('Ей добавляется новый класс', async () => {
        mockGetTaskCountersSuccess()
        mockGetWorkGroupListSuccess()

        const taskListItem = getTaskListItem()
        mockGetTaskListSuccess({ body: getGetTaskListResponse([taskListItem]) })
        mockGetTaskSuccess(taskListItem.id)

        const { user } = render(<TaskListPage />, { store: getStoreWithAuth() })

        const taskTable = getTaskTable()
        await loadingFinishedByIconIn(taskTable)

        const row = await userClickTableRow(user, taskListItem.id)

        await waitFor(() => {
          expect(row).toHaveClass('table-row--selected')
        })
      })

      test('Открывается карточка заявки', async () => {
        mockGetTaskCountersSuccess()
        mockGetWorkGroupListSuccess()

        const taskListItem = getTaskListItem()
        mockGetTaskListSuccess({ body: getGetTaskListResponse([taskListItem]) })
        mockGetTaskSuccess(taskListItem.id)

        const { user } = render(<TaskListPage />, { store: getStoreWithAuth() })

        const taskTable = getTaskTable()
        await loadingFinishedByIconIn(taskTable)

        await userClickTableRow(user, taskListItem.id)

        const taskDetails = await findTaskDetails()
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

          const taskTable = getTaskTable()
          await loadingFinishedByIconIn(taskTable)

          await userClickTableHeadCol(user, 'Заявка')
          await loadingStartedByIconIn(taskTable)
        })
      })

      describe('Внешний номер', () => {
        test('Сортировка / При клике на заголовок отправляется запрос', async () => {
          mockGetTaskCountersSuccess()
          mockGetTaskListSuccess({ once: false })

          const { user } = render(<TaskListPage />, {
            store: getStoreWithAuth(),
          })

          const taskTable = getTaskTable()
          await loadingFinishedByIconIn(taskTable)

          await userClickTableHeadCol(user, 'Внеш.номер')
          await loadingStartedByIconIn(taskTable)
        })
      })

      describe('Объект', () => {
        test('Сортировка / При клике на заголовок отправляется запрос', async () => {
          mockGetTaskCountersSuccess()
          mockGetTaskListSuccess({ once: false })

          const { user } = render(<TaskListPage />, {
            store: getStoreWithAuth(),
          })

          const taskTable = getTaskTable()
          await loadingFinishedByIconIn(taskTable)

          await userClickTableHeadCol(user, 'Объект')
          await loadingStartedByIconIn(taskTable)
        })
      })

      describe('Тема', () => {
        test('Сортировка / При клике на заголовок отправляется запрос', async () => {
          mockGetTaskCountersSuccess()
          mockGetTaskListSuccess({ once: false })

          const { user } = render(<TaskListPage />, {
            store: getStoreWithAuth(),
          })

          const taskTable = getTaskTable()
          await loadingFinishedByIconIn(taskTable)

          await userClickTableHeadCol(user, 'Тема')
          await loadingStartedByIconIn(taskTable)
        })
      })

      describe('Исполнитель', () => {
        test('Сортировка / При клике на заголовок отправляется запрос', async () => {
          mockGetTaskCountersSuccess()
          mockGetTaskListSuccess({ once: false })

          const { user } = render(<TaskListPage />, {
            store: getStoreWithAuth(),
          })

          const taskTable = getTaskTable()
          await loadingFinishedByIconIn(taskTable)

          await userClickTableHeadCol(user, 'Исполнитель')
          await loadingStartedByIconIn(taskTable)
        })
      })

      describe('Рабочая группа', () => {
        test('Сортировка / При клике на заголовок отправляется запрос', async () => {
          mockGetTaskCountersSuccess()
          mockGetTaskListSuccess({ once: false })

          const { user } = render(<TaskListPage />, {
            store: getStoreWithAuth(),
          })

          const taskTable = getTaskTable()
          await loadingFinishedByIconIn(taskTable)

          await userClickTableHeadCol(user, 'Рабочая группа')
          await loadingStartedByIconIn(taskTable)
        })
      })

      describe('Выполнить до', () => {
        test('Сортировка / При клике на заголовок отправляется запрос', async () => {
          mockGetTaskCountersSuccess()
          mockGetTaskListSuccess({ once: false })

          const { user } = render(<TaskListPage />, {
            store: getStoreWithAuth(),
          })

          const taskTable = getTaskTable()
          await loadingFinishedByIconIn(taskTable)

          await userClickTableHeadCol(user, 'Выполнить до')
          await loadingStartedByIconIn(taskTable)
        })
      })

      describe('Комментарий', () => {
        test('Сортировка / При клике на заголовок отправляется запрос', async () => {
          mockGetTaskCountersSuccess()
          mockGetTaskListSuccess({ once: false })

          const { user } = render(<TaskListPage />, {
            store: getStoreWithAuth(),
          })

          const taskTable = getTaskTable()
          await loadingFinishedByIconIn(taskTable)

          await userClickTableHeadCol(user, 'Комментарий')
          await loadingStartedByIconIn(taskTable)
        })
      })

      describe('Дата создания', () => {
        test('Сортировка / При клике на заголовок отправляется запрос', async () => {
          mockGetTaskCountersSuccess()
          mockGetTaskListSuccess({ once: false })

          const { user } = render(<TaskListPage />, {
            store: getStoreWithAuth(),
          })

          const taskTable = getTaskTable()
          await loadingFinishedByIconIn(taskTable)

          await userClickTableHeadCol(user, 'Дата создания')
          await loadingStartedByIconIn(taskTable)
        })
      })
    })

    describe('Пагинация', () => {
      test('При клике на кнопку "Вперед" отправляется запрос', async () => {
        mockGetTaskCountersSuccess()
        mockGetTaskListSuccess({
          once: false,
          body: getGetTaskListResponse(getTaskList(DEFAULT_PAGE_SIZE + 1)),
        })

        const { user } = render(<TaskListPage />, {
          store: getStoreWithAuth(),
        })

        const taskTable = getTaskTable()
        await loadingFinishedByIconIn(taskTable)

        const nextButton = getTablePaginationNextButton()
        await user.click(nextButton)

        await loadingStartedByIconIn(taskTable)
      })

      test('При клике на кнопку "Назад" отправляется запрос', async () => {
        mockGetTaskCountersSuccess()
        mockGetTaskListSuccess({
          once: false,
          body: getGetTaskListResponse(getTaskList(DEFAULT_PAGE_SIZE + 1)),
        })

        const { user } = render(<TaskListPage />, {
          store: getStoreWithAuth(),
        })

        const taskTable = getTaskTable()
        await loadingFinishedByIconIn(taskTable)

        const nextButton = getTablePaginationNextButton()
        await user.click(nextButton)

        await loadingFinishedByIconIn(taskTable)

        const prevButton = getTablePaginationPrevButton()
        await user.click(prevButton)

        await loadingStartedByIconIn(taskTable)
      })
    })
  })

  // describe('Быстрый фильтр', () => {
  //   test('Отображается', async () => {
  //     mockGetTaskListSuccess()
  //     mockGetTaskCountersSuccess()
  //
  //     const store = getStoreWithAuth({
  //       userId: generateId(),
  //       userRole: UserRolesEnum.FirstLineSupport,
  //     })
  //
  //     render(<TaskListPage />, { store })
  //
  //     const fastFilter = getFilterContainer()
  //     expect(fastFilter).toBeInTheDocument()
  //   })
  //
  //   test('При смене фильтра заявки запрашиваются снова', async () => {
  //     mockGetTaskListSuccess()
  //     mockGetTaskCountersSuccess()
  //
  //     const store = getStoreWithAuth({
  //       userId: generateId(),
  //       userRole: UserRolesEnum.FirstLineSupport,
  //     })
  //
  //     const { user } = render(<TaskListPage />, { store })
  //
  //     const filterTagContainer = getFirstFilterTagContainer()
  //     await waitStartFilterLoading(filterTagContainer)
  //     await waitFinishFilterLoading(filterTagContainer)
  //
  //     const filterTag = getFilterTagByTextIn(
  //       getFilterContainer(),
  //       fastFilterNamesDict[FastFilterEnum.Free],
  //     )
  //
  //     await user.click(filterTag)
  //
  //     const taskTable = getTaskTable()
  //     await loadingStartedByIconIn(taskTable)
  //   })
  //
  //   test('Сбрасывается если применён "Расширенный фильтр"', () => {})
  // })
})
