import { TaskDetailsTabsEnum } from 'features/task/constants/task'
import { UserPermissionsEnum } from 'features/user/api/constants'

import { props } from '_tests_/features/tasks/components/TaskDetails/Tabs/constants'
import { tabsTestUtils } from '_tests_/features/tasks/components/TaskDetails/Tabs/testUtils'
import {
  mockGetJournalSuccess,
  mockGetRelocationTasksSuccess,
  mockGetSubTaskListSuccess,
  mockGetTaskCommentListSuccess,
} from '_tests_/mocks/api'
import { getUserMeQueryMock } from '_tests_/mocks/state/user'
import { getStoreWithAuth, render, setupApiTests } from '_tests_/utils'

import Tabs from './index'

setupApiTests()

describe('Вкладки карточки заявки', () => {
  test('Доступные вкладки отображаются', () => {
    render(<Tabs {...props} />, {
      store: getStoreWithAuth(undefined, undefined, undefined, {
        queries: { ...getUserMeQueryMock({ permissions: [] }) },
      }),
    })

    expect(tabsTestUtils.getNavItem(TaskDetailsTabsEnum.Description)).toBeInTheDocument()
    expect(tabsTestUtils.getNavItem(TaskDetailsTabsEnum.Comments)).toBeInTheDocument()
    expect(tabsTestUtils.getNavItem(TaskDetailsTabsEnum.Resolution)).toBeInTheDocument()
    expect(tabsTestUtils.getNavItem(TaskDetailsTabsEnum.Journal)).toBeInTheDocument()
    expect(tabsTestUtils.getNavItem(TaskDetailsTabsEnum.SubTaskList)).toBeInTheDocument()
  })

  test('Установлена корректная вкладка по умолчанию', () => {
    render(<Tabs {...props} />, {
      store: getStoreWithAuth(undefined, undefined, undefined, {
        queries: { ...getUserMeQueryMock({ permissions: [] }) },
      }),
    })

    const defaultTab = tabsTestUtils.getOpenedTab(TaskDetailsTabsEnum.Description)
    expect(defaultTab).toBeInTheDocument()
  })

  test('Можно открыть любую доступную вкладку', async () => {
    mockGetTaskCommentListSuccess(props.task.id)
    mockGetJournalSuccess(props.task.id)
    mockGetSubTaskListSuccess(props.task.id)
    mockGetRelocationTasksSuccess()

    const { user } = render(<Tabs {...props} />, {
      store: getStoreWithAuth(undefined, undefined, undefined, {
        queries: { ...getUserMeQueryMock({ permissions: [] }) },
      }),
    })

    await tabsTestUtils.clickTab(user, TaskDetailsTabsEnum.Description)
    expect(tabsTestUtils.getOpenedTab(TaskDetailsTabsEnum.Description)).toBeInTheDocument()

    await tabsTestUtils.clickTab(user, TaskDetailsTabsEnum.Comments)
    expect(tabsTestUtils.getOpenedTab(TaskDetailsTabsEnum.Comments)).toBeInTheDocument()

    await tabsTestUtils.clickTab(user, TaskDetailsTabsEnum.Resolution)
    expect(tabsTestUtils.getOpenedTab(TaskDetailsTabsEnum.Resolution)).toBeInTheDocument()

    await tabsTestUtils.clickTab(user, TaskDetailsTabsEnum.Journal)
    expect(tabsTestUtils.getOpenedTab(TaskDetailsTabsEnum.Journal)).toBeInTheDocument()

    await tabsTestUtils.clickTab(user, TaskDetailsTabsEnum.SubTaskList)
    expect(tabsTestUtils.getOpenedTab(TaskDetailsTabsEnum.SubTaskList)).toBeInTheDocument()
  })

  describe('Вкладка "Перемещения"', () => {
    test('Не отображается если условия не соблюдены', () => {
      render(<Tabs {...props} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock({ permissions: [] }) },
        }),
      })

      const tab = tabsTestUtils.queryNavItem(TaskDetailsTabsEnum.RelocationTasks)
      expect(tab).not.toBeInTheDocument()
    })

    test('Отображается если условия соблюдены', () => {
      render(<Tabs {...props} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: {
            ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.RelocationTasksRead] }),
          },
        }),
      })

      const tab = tabsTestUtils.getNavItem(TaskDetailsTabsEnum.RelocationTasks)
      expect(tab).toBeInTheDocument()
    })

    test('Открывается по клику', async () => {
      mockGetRelocationTasksSuccess()

      const { user } = render(<Tabs {...props} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: {
            ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.RelocationTasksRead] }),
          },
        }),
      })

      await tabsTestUtils.clickTab(user, TaskDetailsTabsEnum.RelocationTasks)
      const tab = tabsTestUtils.getOpenedTab(TaskDetailsTabsEnum.RelocationTasks)

      expect(tab).toBeInTheDocument()
    })
  })
})
