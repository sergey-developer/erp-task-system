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
import { UserRolesEnum } from 'shared/constants/roles'

import { findTaskDetails } from '../../../../TaskView/components/TaskDetails/_tests_/utils'
import { FastFilterEnum } from '../../../constants/common'
import * as extendedFilterUtils from '../../ExtendedFilter/_tests_/utils'
import * as fastFilterConstants from '../../FastFilter/_tests_/constants'
import * as fastFilterUtils from '../../FastFilter/_tests_/utils'
import * as taskTableUtils from '../../TaskTable/_tests_/utils'
import { paginationConfig } from '../../TaskTable/constants/pagination'
import { DEFAULT_PAGE_SIZE } from '../constants'
import TaskListPage from '../index'
import * as utils from './utils'

setupApiTests()

describe('Страница реестра заявок', () => {
  test('Отображается', () => {
    render(<TaskListPage />)

    const page = utils.getTaskListPage()
    expect(page).toBeInTheDocument()
  })

  describe('Быстрый фильтр', () => {
    test('Отображается корректно', () => {
      render(<TaskListPage />)

      const fastFilter = fastFilterUtils.getFastFilter()
      expect(fastFilter).toBeInTheDocument()
    })

    describe('Имеет корректное значение по умолчанию', () => {
      test('Роль - первая линия поддержки', async () => {
        mockGetTaskCountersSuccess()
        mockGetTaskListSuccess()

        render(<TaskListPage />, {
          store: getStoreWithAuth({ userRole: UserRolesEnum.FirstLineSupport }),
        })

        await fastFilterUtils.loadingFinished()

        const tag = fastFilterUtils.getCheckableTag(FastFilterEnum.All)
        expect(tag).toHaveClass(fastFilterConstants.filterCheckedClass)
      })

      test('Роль - инженер', async () => {
        mockGetTaskCountersSuccess()
        mockGetTaskListSuccess()

        render(<TaskListPage />, {
          store: getStoreWithAuth({ userRole: UserRolesEnum.Engineer }),
        })

        await fastFilterUtils.loadingFinished()

        const tag = fastFilterUtils.getCheckableTag(FastFilterEnum.Mine)
        expect(tag).toHaveClass(fastFilterConstants.filterCheckedClass)
      })

      test('Роль - старший инженер', async () => {
        mockGetTaskCountersSuccess()
        mockGetTaskListSuccess()

        render(<TaskListPage />, {
          store: getStoreWithAuth({ userRole: UserRolesEnum.SeniorEngineer }),
        })

        await fastFilterUtils.loadingFinished()

        const tag = fastFilterUtils.getCheckableTag(FastFilterEnum.All)
        expect(tag).toHaveClass(fastFilterConstants.filterCheckedClass)
      })

      test('Роль - глава отдела', async () => {
        mockGetTaskCountersSuccess()
        mockGetTaskListSuccess()

        render(<TaskListPage />, {
          store: getStoreWithAuth({ userRole: UserRolesEnum.HeadOfDepartment }),
        })

        await fastFilterUtils.loadingFinished()

        const tag = fastFilterUtils.getCheckableTag(FastFilterEnum.All)
        expect(tag).toHaveClass(fastFilterConstants.filterCheckedClass)
      })
    })

    test('При смене фильтра отправляется запрос', async () => {
      mockGetTaskCountersSuccess()
      mockGetTaskListSuccess({ once: false })

      const { user } = render(<TaskListPage />, {
        store: getStoreWithAuth(),
      })

      const taskTable = taskTableUtils.getTable()
      await loadingFinishedByIconIn(taskTable)
      await fastFilterUtils.loadingFinished()

      const tag = fastFilterUtils.getCheckableTag(FastFilterEnum.Free)
      await user.click(tag)

      await loadingStartedByIconIn(taskTable)
    })

    // продолжить
    test('После фильтрации количество заявок меняется', async () => {})
  })

  describe('Кнопка расширенных фильтров', () => {
    test('Отображается корректно', () => {
      render(<TaskListPage />)

      const button = utils.getExtendedFilterButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Открывает расширенный фильтр', async () => {
      mockGetWorkGroupListSuccess()

      const { user } = render(<TaskListPage />, { store: getStoreWithAuth() })

      await user.click(utils.getExtendedFilterButton())

      const filter = await extendedFilterUtils.findExtendedFilter()
      expect(filter).toBeInTheDocument()
    })
  })

  describe('Поиск заявки по номеру', () => {
    test('Поле поиска отображается корректно', () => {
      render(<TaskListPage />)

      const searchInput = utils.getSearchInput()

      expect(searchInput).toBeInTheDocument()
      expect(searchInput).toBeEnabled()
      expect(searchInput).not.toHaveValue()
    })

    test('Можно ввести значение', async () => {
      const { user } = render(<TaskListPage />)

      const { searchInput, searchValue } = await utils.userFillSearchInput(user)
      expect(searchInput).toHaveValue(searchValue)
    })

    test('Можно очистить значение', async () => {
      const { user } = render(<TaskListPage />)

      const { searchInput } = await utils.userFillSearchInput(user)
      await user.click(utils.getSearchClearButton())

      expect(searchInput).not.toHaveValue()
    })

    describe('Отправляется запрос', () => {
      test('При нажатии на кнопку поиска', async () => {
        mockGetTaskCountersSuccess()
        mockGetTaskListSuccess({ once: false })

        const { user } = render(<TaskListPage />, {
          store: getStoreWithAuth(),
        })

        const taskTable = taskTableUtils.getTable()

        await utils.userFillSearchInput(user)
        await user.click(utils.getSearchButton())
        await loadingStartedByIconIn(taskTable)
      })

      test('При нажатии клавиши "Enter"', async () => {
        mockGetTaskCountersSuccess()
        mockGetTaskListSuccess({ once: false })

        const { user } = render(<TaskListPage />, {
          store: getStoreWithAuth(),
        })

        const taskTable = taskTableUtils.getTable()
        await utils.userFillSearchInput(user, true)
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

        await utils.userFillSearchInput(user, true)

        await waitFor(() => {
          expect(utils.getExtendedFilterButton()).toBeDisabled()
        })
      })

      test('Недоступен быстрый фильтр', async () => {
        mockGetTaskCountersSuccess()
        mockGetTaskListSuccess({ once: false })

        const { user } = render(<TaskListPage />, {
          store: getStoreWithAuth(),
        })

        await utils.userFillSearchInput(user, true)

        await waitFor(() => {
          Object.values(FastFilterEnum).forEach((filter) => {
            expect(fastFilterUtils.getCheckableTag(filter)).toHaveClass(
              'ant-tag-checkable--disabled',
            )
          })
        })
      })
    })
  })

  describe('Кнопка обновления заявок', () => {
    test('Отображается корректно', () => {
      render(<TaskListPage />)

      const button = utils.getReloadListButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Перезагружает заявки', async () => {
      mockGetTaskCountersSuccess({ once: false })
      mockGetTaskListSuccess({ once: false })

      const { user } = render(<TaskListPage />, {
        store: getStoreWithAuth(),
      })

      const taskTable = taskTableUtils.getTable()
      await loadingFinishedByIconIn(taskTable)
      await utils.userClickReloadListButton(user)

      await loadingStartedByIconIn(taskTable)
    })

    test('Перезагружает количество заявок для быстрых фильтров', async () => {
      mockGetTaskCountersSuccess({ once: false })
      mockGetTaskListSuccess({ once: false })

      const { user } = render(<TaskListPage />, {
        store: getStoreWithAuth(),
      })

      const filterTags = fastFilterUtils.getAllFilterTag()
      for await (const fastFilter of filterTags) {
        await loadingFinishedBySkeletonIn(fastFilter)
      }

      await utils.userClickReloadListButton(user)

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

      const taskTable = taskTableUtils.getTable()
      await loadingFinishedByIconIn(taskTable)

      await taskTableUtils.userClickRow(user, taskListItem.id)

      const taskDetails = await findTaskDetails()
      await utils.userClickReloadListButton(user)

      await waitFor(() => {
        expect(taskDetails).not.toBeInTheDocument()
      })
    })
  })

  describe('Кнопка создания заявки', () => {
    test('Отображается корректно', () => {
      render(<TaskListPage />)

      const button = utils.getCreateTaskButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })
  })

  describe('Таблица заявок', () => {
    test('Отображается корректно', async () => {
      const taskList = getTaskList(2)

      mockGetTaskCountersSuccess()
      mockGetTaskListSuccess({ body: getGetTaskListResponse(taskList) })

      render(<TaskListPage />, { store: getStoreWithAuth() })

      const taskTable = taskTableUtils.getTable()
      await loadingFinishedByIconIn(taskTable)

      expect(taskTable).toBeInTheDocument()
      taskList.forEach((item) => {
        const row = taskTableUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })

    describe('При клике на строку', () => {
      test('Ей добавляется новый класс', async () => {
        mockGetTaskCountersSuccess()
        mockGetWorkGroupListSuccess()

        const taskListItem = getTaskListItem()
        mockGetTaskListSuccess({ body: getGetTaskListResponse([taskListItem]) })
        mockGetTaskSuccess(taskListItem.id)

        const { user } = render(<TaskListPage />, { store: getStoreWithAuth() })

        const taskTable = taskTableUtils.getTable()
        await loadingFinishedByIconIn(taskTable)

        const row = await taskTableUtils.userClickRow(user, taskListItem.id)

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

        const taskTable = taskTableUtils.getTable()
        await loadingFinishedByIconIn(taskTable)

        await taskTableUtils.userClickRow(user, taskListItem.id)

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

          const taskTable = taskTableUtils.getTable()
          await loadingFinishedByIconIn(taskTable)

          await taskTableUtils.userClickHeadCol(user, 'Заявка')
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

          const taskTable = taskTableUtils.getTable()
          await loadingFinishedByIconIn(taskTable)

          await taskTableUtils.userClickHeadCol(user, 'Внеш.номер')
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

          const taskTable = taskTableUtils.getTable()
          await loadingFinishedByIconIn(taskTable)

          await taskTableUtils.userClickHeadCol(user, 'Объект')
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

          const taskTable = taskTableUtils.getTable()
          await loadingFinishedByIconIn(taskTable)

          await taskTableUtils.userClickHeadCol(user, 'Тема')
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

          const taskTable = taskTableUtils.getTable()
          await loadingFinishedByIconIn(taskTable)

          await taskTableUtils.userClickHeadCol(user, 'Исполнитель')
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

          const taskTable = taskTableUtils.getTable()
          await loadingFinishedByIconIn(taskTable)

          await taskTableUtils.userClickHeadCol(user, 'Рабочая группа')
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

          const taskTable = taskTableUtils.getTable()
          await loadingFinishedByIconIn(taskTable)

          await taskTableUtils.userClickHeadCol(user, 'Выполнить до')
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

          const taskTable = taskTableUtils.getTable()
          await loadingFinishedByIconIn(taskTable)

          await taskTableUtils.userClickHeadCol(user, 'Комментарий')
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

          const taskTable = taskTableUtils.getTable()
          await loadingFinishedByIconIn(taskTable)

          await taskTableUtils.userClickHeadCol(user, 'Дата создания')
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

          const taskTable = taskTableUtils.getTable()
          await loadingFinishedByIconIn(taskTable)

          const nextButton = taskTableUtils.getPaginationNextButton()
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

          const taskTable = taskTableUtils.getTable()
          await loadingFinishedByIconIn(taskTable)

          const nextButton = taskTableUtils.getPaginationNextButton()
          await user.click(nextButton)

          await loadingFinishedByIconIn(taskTable)

          const prevButton = taskTableUtils.getPaginationPrevButton()
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

          const taskTable = taskTableUtils.getTable()
          await loadingFinishedByIconIn(taskTable)

          const pageButton = taskTableUtils.getPaginationPageButton('2')
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

          const taskTable = taskTableUtils.getTable()
          await loadingFinishedByIconIn(taskTable)

          await taskTableUtils.userChangePageSize(
            user,
            paginationConfig.pageSizeOptions[0],
          )
          await loadingStartedByIconIn(taskTable)
        })
      })
    })
  })

  describe('Расширенный фильтр', () => {
    test('Можно закрыть', async () => {
      mockGetWorkGroupListSuccess()
      mockGetTaskListSuccess()
      mockGetTaskCountersSuccess()

      const { user } = render(<TaskListPage />, { store: getStoreWithAuth() })

      await user.click(utils.getExtendedFilterButton())

      const extendedFilter = await extendedFilterUtils.findExtendedFilter()
      expect(extendedFilter).toBeInTheDocument()

      await user.click(extendedFilterUtils.getCloseButton())

      await waitFor(() => {
        expect(extendedFilter).not.toBeInTheDocument()
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
  //     const taskTable = taskTableUtils.getTable()
  //     await loadingStartedByIconIn(taskTable)
  //   })
  //
  //   test('Сбрасывается если применён "Расширенный фильтр"', () => {})
  // })
})
