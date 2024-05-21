import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import {
  taskDetailsTabNameDict,
  TaskDetailsTabsEnum,
  TaskExtendedStatusEnum,
  TaskOlaStatusEnum,
  TaskStatusEnum,
  TaskTypeEnum,
} from 'modules/task/constants/task'
import { UserPermissionsEnum } from 'modules/user/constants'

import taskFixtures from '_tests_/fixtures/task'
import userFixtures from '_tests_/fixtures/user'
import {
  mockGetJournalSuccess,
  mockGetRelocationTaskListSuccess,
  mockGetSubTaskListSuccess,
  mockGetTaskCommentListSuccess,
} from '_tests_/mocks/api'
import { getUserMeQueryMock } from '_tests_/mocks/state/user'
import {
  fakeDateString,
  fakeId,
  fakeIdStr,
  fakeWord,
  getStoreWithAuth,
  render,
  setupApiTests,
} from '_tests_/utils'

import Tabs, { TabsProps } from './index'

const props: Readonly<TabsProps> = {
  task: {
    id: fakeId(),
    type: TaskTypeEnum.Request,
    title: fakeWord(),
    description: fakeWord(),
    userResolution: fakeWord(),
    techResolution: fakeWord(),
    attachments: [taskFixtures.attachment()],
    resolution: {
      attachments: [],
    },
    status: TaskStatusEnum.New,
    extendedStatus: TaskExtendedStatusEnum.New,
    recordId: fakeIdStr(),
    suspendRequest: taskFixtures.suspendRequest(),
    assignee: null,
    olaNextBreachTime: fakeDateString(),
    olaEstimatedTime: Date.now(),
    olaStatus: TaskOlaStatusEnum.NotExpired,
    shop: taskFixtures.task().shop,
    isDescriptionChanged: false,
    previousDescription: fakeWord(),
  },
  userActions: userFixtures.userActions(),
}

const getContainer = () => screen.getByTestId('task-details-tabs')
const queryContainer = () => screen.queryByTestId('task-details-tabs')
const getTabsNav = () => within(getContainer()).getByRole('tablist')

const getNavItem = (tab: TaskDetailsTabsEnum) =>
  within(getTabsNav()).getByRole('tab', { name: taskDetailsTabNameDict[tab] })

const queryNavItem = (tab: TaskDetailsTabsEnum) =>
  within(getTabsNav()).queryByRole('tab', { name: taskDetailsTabNameDict[tab] })

const getOpenedTab = (tab: TaskDetailsTabsEnum) =>
  within(getContainer()).getByRole('tabpanel', { name: taskDetailsTabNameDict[tab] })

const clickTab = async (user: UserEvent, tab: TaskDetailsTabsEnum) => {
  await user.click(getNavItem(tab))
}

export const testUtils = {
  getContainer,
  queryContainer,

  getNavItem,
  queryNavItem,

  getOpenedTab,

  clickTab,
}

setupApiTests()

describe('Вкладки карточки заявки', () => {
  test('Доступные вкладки отображаются', () => {
    render(<Tabs {...props} />, {
      store: getStoreWithAuth(undefined, undefined, undefined, {
        queries: { ...getUserMeQueryMock({ permissions: [] }) },
      }),
    })

    expect(testUtils.getNavItem(TaskDetailsTabsEnum.Description)).toBeInTheDocument()
    expect(testUtils.getNavItem(TaskDetailsTabsEnum.Comments)).toBeInTheDocument()
    expect(testUtils.getNavItem(TaskDetailsTabsEnum.Resolution)).toBeInTheDocument()
    expect(testUtils.getNavItem(TaskDetailsTabsEnum.Journal)).toBeInTheDocument()
    expect(testUtils.getNavItem(TaskDetailsTabsEnum.SubTaskList)).toBeInTheDocument()
  })

  test('Установлена корректная вкладка по умолчанию', () => {
    render(<Tabs {...props} />, {
      store: getStoreWithAuth(undefined, undefined, undefined, {
        queries: { ...getUserMeQueryMock({ permissions: [] }) },
      }),
    })

    const defaultTab = testUtils.getOpenedTab(TaskDetailsTabsEnum.Description)
    expect(defaultTab).toBeInTheDocument()
  })

  test('Можно открыть любую доступную вкладку', async () => {
    mockGetTaskCommentListSuccess(props.task.id)
    mockGetJournalSuccess(props.task.id)
    mockGetSubTaskListSuccess(props.task.id)
    mockGetRelocationTaskListSuccess()

    const { user } = render(<Tabs {...props} />, {
      store: getStoreWithAuth(undefined, undefined, undefined, {
        queries: { ...getUserMeQueryMock({ permissions: [] }) },
      }),
    })

    await testUtils.clickTab(user, TaskDetailsTabsEnum.Description)
    expect(testUtils.getOpenedTab(TaskDetailsTabsEnum.Description)).toBeInTheDocument()

    await testUtils.clickTab(user, TaskDetailsTabsEnum.Comments)
    expect(testUtils.getOpenedTab(TaskDetailsTabsEnum.Comments)).toBeInTheDocument()

    await testUtils.clickTab(user, TaskDetailsTabsEnum.Resolution)
    expect(testUtils.getOpenedTab(TaskDetailsTabsEnum.Resolution)).toBeInTheDocument()

    await testUtils.clickTab(user, TaskDetailsTabsEnum.Journal)
    expect(testUtils.getOpenedTab(TaskDetailsTabsEnum.Journal)).toBeInTheDocument()

    await testUtils.clickTab(user, TaskDetailsTabsEnum.SubTaskList)
    expect(testUtils.getOpenedTab(TaskDetailsTabsEnum.SubTaskList)).toBeInTheDocument()
  })

  describe('Вкладка "Перемещения"', () => {
    test('Не отображается если условия не соблюдены', () => {
      render(<Tabs {...props} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock({ permissions: [] }) },
        }),
      })

      const tab = testUtils.queryNavItem(TaskDetailsTabsEnum.RelocationTasks)
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

      const tab = testUtils.getNavItem(TaskDetailsTabsEnum.RelocationTasks)
      expect(tab).toBeInTheDocument()
    })

    test('Открывается по клику', async () => {
      mockGetRelocationTaskListSuccess()

      const { user } = render(<Tabs {...props} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: {
            ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.RelocationTasksRead] }),
          },
        }),
      })

      await testUtils.clickTab(user, TaskDetailsTabsEnum.RelocationTasks)
      const tab = testUtils.getOpenedTab(TaskDetailsTabsEnum.RelocationTasks)

      expect(tab).toBeInTheDocument()
    })
  })
})
