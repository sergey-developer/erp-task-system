import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import {
  taskCardTabNamesDict,
  TaskCardTabsEnum,
  TaskExtendedStatusEnum,
  TaskOlaStatusEnum,
  TaskStatusEnum,
  TaskTypeEnum,
} from 'modules/task/constants/task'

import taskFixtures from '_tests_/fixtures/task'
import { getUserMeQueryMock } from '_tests_/mocks/state/user'
import {
  fakeDateString,
  fakeId,
  fakeIdStr,
  fakeWord,
  getStoreWithAuth,
  render,
} from '_tests_/utils'

import CardTabs, { CardTabsProps } from './index'

const props: Readonly<CardTabsProps> = {
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
  },
}

const getContainer = () => screen.getByTestId('task-card-tabs')
const queryContainer = () => screen.queryByTestId('task-card-tabs')
const getTabsNav = () => within(getContainer()).getByRole('tablist')

const getNavItem = (tab: TaskCardTabsEnum) =>
  within(getTabsNav()).getByRole('tab', { name: taskCardTabNamesDict[tab] })

const queryNavItem = (tab: TaskCardTabsEnum) =>
  within(getTabsNav()).queryByRole('tab', { name: taskCardTabNamesDict[tab] })

const getOpenedTab = (tab: TaskCardTabsEnum) =>
  within(getContainer()).getByRole('tabpanel', { name: taskCardTabNamesDict[tab] })

const clickTab = async (user: UserEvent, tab: TaskCardTabsEnum) => {
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

describe('Вкладки карточки заявки', () => {
  test('Доступные вкладки отображаются', () => {
    render(<CardTabs {...props} />)

    expect(testUtils.getNavItem(TaskCardTabsEnum.Description)).toBeInTheDocument()
    expect(testUtils.getNavItem(TaskCardTabsEnum.CommentList)).toBeInTheDocument()
    expect(testUtils.getNavItem(TaskCardTabsEnum.Resolution)).toBeInTheDocument()
    expect(testUtils.getNavItem(TaskCardTabsEnum.Journal)).toBeInTheDocument()
    expect(testUtils.getNavItem(TaskCardTabsEnum.SubTaskList)).toBeInTheDocument()
  })

  test('Установлена корректная вкладка по умолчанию', () => {
    render(<CardTabs {...props} />)
    const defaultTab = testUtils.getOpenedTab(TaskCardTabsEnum.Description)
    expect(defaultTab).toBeInTheDocument()
  })

  test('Можно открыть любую доступную вкладку', async () => {
    const { user } = render(<CardTabs {...props} />)

    await testUtils.clickTab(user, TaskCardTabsEnum.Description)
    expect(testUtils.getOpenedTab(TaskCardTabsEnum.Description)).toBeInTheDocument()

    await testUtils.clickTab(user, TaskCardTabsEnum.CommentList)
    expect(testUtils.getOpenedTab(TaskCardTabsEnum.CommentList)).toBeInTheDocument()

    await testUtils.clickTab(user, TaskCardTabsEnum.Resolution)
    expect(testUtils.getOpenedTab(TaskCardTabsEnum.Resolution)).toBeInTheDocument()

    await testUtils.clickTab(user, TaskCardTabsEnum.Journal)
    expect(testUtils.getOpenedTab(TaskCardTabsEnum.Journal)).toBeInTheDocument()

    await testUtils.clickTab(user, TaskCardTabsEnum.SubTaskList)
    expect(testUtils.getOpenedTab(TaskCardTabsEnum.SubTaskList)).toBeInTheDocument()
  })

  describe('Вкладка "Перемещения"', () => {
    test('Не отображается если условия не соблюдены', () => {
      render(<CardTabs {...props} />)
      const tab = testUtils.queryNavItem(TaskCardTabsEnum.RelocationTaskList)
      expect(tab).not.toBeInTheDocument()
    })

    test('Отображается если условия соблюдены', () => {
      render(<CardTabs {...props} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: {
            ...getUserMeQueryMock({ permissions: ['RELOCATION_TASKS_READ'] }),
          },
        }),
      })

      const tab = testUtils.getNavItem(TaskCardTabsEnum.RelocationTaskList)
      expect(tab).toBeInTheDocument()
    })

    test('Открывается по клику', async () => {
      const { user } = render(<CardTabs {...props} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: {
            ...getUserMeQueryMock({ permissions: ['RELOCATION_TASKS_READ'] }),
          },
        }),
      })

      await testUtils.clickTab(user, TaskCardTabsEnum.RelocationTaskList)
      const tab = testUtils.getOpenedTab(TaskCardTabsEnum.RelocationTaskList)

      expect(tab).toBeInTheDocument()
    })
  })
})
