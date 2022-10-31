import {
  mockGetTaskCountersSuccess,
  mockGetTaskListSuccess,
  mockGetTaskSuccess,
  mockGetWorkGroupListSuccess,
} from '_tests_/mocks/api'
import {
  loadingFinishedByIconIn,
  loadingFinishedBySkeletonIn,
  loadingStartedByIconIn,
  loadingStartedBySkeletonIn,
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
  getAllCheckableTag,
  getAllFilterTag,
} from '../../FastFilter/_tests_/utils'
import {
  getPaginationPageButton,
  getPaginationNextButton as getTablePaginationNextButton,
  getPaginationPrevButton as getTablePaginationPrevButton,
  getTable as getTaskTable,
  userChangePageSize,
  userClickHeadCol as userClickTableHeadCol,
  userClickRow as userClickTableRow,
} from '../../TaskTable/_tests_/utils'
import { paginationConfig } from '../../TaskTable/constants/pagination'
import { DEFAULT_PAGE_SIZE } from '../constants'
import TaskListPage from '../index'
import {
  getCreateTaskButton,
  getExtendedFilterButton,
  getReloadListButton,
  getSearchButton,
  getSearchClearButton,
  getSearchInput,
  getTaskListPage,
  userClickReloadListButton,
  userFillSearchInput,
} from './utils'

setupApiTests()

describe('Страница реестра заявок', () => {
  test('Отображается', () => {
    render(<TaskListPage />)

    const page = getTaskListPage()
    expect(page).toBeInTheDocument()
  })

  test('Отображает быстрые фильтры', () => {})

  describe('Кнопка расширенных фильтров', () => {
    test('Отображается корректно', () => {
      render(<TaskListPage />)

      const button = getExtendedFilterButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })
  })

  describe('Поиск заявки по номеру', () => {
    test('Поле поиска отображается корректно', () => {
      render(<TaskListPage />)

      const searchInput = getSearchInput()

      expect(searchInput).toBeInTheDocument()
      expect(searchInput).toBeEnabled()
      expect(searchInput).not.toHaveValue()
    })

    test('Можно ввести значение', async () => {
      const { user } = render(<TaskListPage />)

      const { searchInput, searchValue } = await userFillSearchInput(user)
      expect(searchInput).toHaveValue(searchValue)
    })

    test('Можно очистить значение', async () => {
      const { user } = render(<TaskListPage />)

      const { searchInput } = await userFillSearchInput(user)
      await user.click(getSearchClearButton())

      expect(searchInput).not.toHaveValue()
    })

    describe('Отправляется запрос', () => {
      test('При нажатии на кнопку поиска', async () => {
        mockGetTaskCountersSuccess()
        mockGetTaskListSuccess({ once: false })

        const { user } = render(<TaskListPage />, {
          store: getStoreWithAuth(),
        })

        const taskTable = getTaskTable()

        await userFillSearchInput(user)
        await user.click(getSearchButton())
        await loadingStartedByIconIn(taskTable)
      })

      test('При нажатии клавиши "Enter"', async () => {
        mockGetTaskCountersSuccess()
        mockGetTaskListSuccess({ once: false })

        const { user } = render(<TaskListPage />, {
          store: getStoreWithAuth(),
        })

        const taskTable = getTaskTable()
        await userFillSearchInput(user, true)
        await loadingStartedByIconIn(taskTable)
      })
    })

    describe('После применения', () => {
      test('Недоступен расширенный фильтр', async () => {
        mockGetTaskCountersSuccess()
        mockGetTaskListSuccess({ once: false })

        const { user } = render(<TaskListPage />, {
          store: getStoreWithAuth(),
        })

        await userFillSearchInput(user, true)

        await waitFor(() => {
          expect(getExtendedFilterButton()).toBeDisabled()
        })
      })

      test('Недоступен быстрый фильтр', async () => {
        mockGetTaskCountersSuccess()
        mockGetTaskListSuccess({ once: false })

        const { user } = render(<TaskListPage />, {
          store: getStoreWithAuth(),
        })

        await userFillSearchInput(user, true)

        await waitFor(() => {
          getAllCheckableTag().forEach((tag) => {
            expect(tag).toHaveClass('ant-tag-checkable--disabled')
          })
        })
      })
    })
  })

  describe('Кнопка обновления заявок', () => {
    test('Отображается корректно', () => {
      render(<TaskListPage />)

      const button = getReloadListButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Перезагружает заявки', async () => {
      mockGetTaskCountersSuccess({ once: false })
      mockGetTaskListSuccess({ once: false })

      const { user } = render(<TaskListPage />, {
        store: getStoreWithAuth(),
      })

      const taskTable = getTaskTable()
      await loadingFinishedByIconIn(taskTable)
      await userClickReloadListButton(user)

      await loadingStartedByIconIn(taskTable)
    })

    test('Перезагружает количество заявок для быстрых фильтров', async () => {
      mockGetTaskCountersSuccess({ once: false })
      mockGetTaskListSuccess({ once: false })

      const { user } = render(<TaskListPage />, {
        store: getStoreWithAuth(),
      })

      const filterTags = getAllFilterTag()
      for await (const fastFilter of filterTags) {
        await loadingFinishedBySkeletonIn(fastFilter)
      }

      await userClickReloadListButton(user)

      for await (const fastFilter of filterTags) {
        await loadingStartedBySkeletonIn(fastFilter)
      }
    })

    test('Закрывает карточку заявки', async () => {
      mockGetWorkGroupListSuccess()
      mockGetTaskCountersSuccess({ once: false })

      const taskListItem = getTaskListItem()
      mockGetTaskListSuccess({
        body: getGetTaskListResponse([taskListItem]),
        once: false,
      })
      mockGetTaskSuccess(taskListItem.id)

      const { user } = render(<TaskListPage />, { store: getStoreWithAuth() })

      const taskTable = getTaskTable()
      await loadingFinishedByIconIn(taskTable)

      await userClickTableRow(user, taskListItem.id)

      const taskDetails = await findTaskDetails()
      await userClickReloadListButton(user)

      await waitFor(() => {
        expect(taskDetails).not.toBeInTheDocument()
      })
    })
  })

  describe('Кнопка создания заявки', () => {
    test('Отображается корректно', () => {
      render(<TaskListPage />)

      const button = getCreateTaskButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })
  })

  describe('Таблица заявок', () => {
    test('Отображается', async () => {
      render(<TaskListPage />)

      const taskTable = getTaskTable()
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
      describe('Отправляется запрос', () => {
        test('При клике на кнопку "Вперед"', async () => {
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

        test('При клике на кнопку "Назад"', async () => {
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

        test('При переходе на след. страницу', async () => {
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

          const pageButton = getPaginationPageButton('2')
          await user.click(pageButton)

          await loadingStartedByIconIn(taskTable)
        })

        test('При смене размера страницы', async () => {
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

          await userChangePageSize(user, paginationConfig.pageSizeOptions[0])
          await loadingStartedByIconIn(taskTable)
        })
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
