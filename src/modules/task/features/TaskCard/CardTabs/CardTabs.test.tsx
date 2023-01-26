import { generateId, generateIdStr, generateWord, render } from '_tests_/utils'
import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import taskFixtures from 'fixtures/task'
import {
  TaskExtendedStatusEnum,
  TaskStatusEnum,
  TaskTypeEnum,
} from 'modules/task/constants/common'

import { TaskCardTabsEnum, taskCardTabNamesDict } from './constants'
import CardTabs, { CardTabsProps } from './index'

const requiredProps: CardTabsProps = {
  task: {
    id: generateId(),
    type: TaskTypeEnum.Request,
    title: generateWord(),
    description: generateWord(),
    userResolution: generateWord(),
    techResolution: generateWord(),
    status: TaskStatusEnum.New,
    extendedStatus: TaskExtendedStatusEnum.New,
    recordId: generateIdStr(),
    suspendRequest: taskFixtures.getSuspendRequest(),
    assignee: null,
  },
}

const getContainer = () => screen.getByTestId('task-card-tabs')

const queryContainer = () => screen.queryByTestId('task-card-tabs')

const getTabsNav = () => within(getContainer()).getByRole('tablist')

const getNavItem = (tab: TaskCardTabsEnum) =>
  within(getTabsNav()).getByRole('tab', { name: taskCardTabNamesDict[tab] })

const getOpenedTab = (tab: TaskCardTabsEnum) =>
  within(getContainer()).getByRole('tabpanel', {
    name: taskCardTabNamesDict[tab],
  })

const clickTab = async (user: UserEvent, tab: TaskCardTabsEnum) => {
  await user.click(getNavItem(tab))
}

export const testUtils = {
  getContainer,
  queryContainer,

  getNavItem,

  getOpenedTab,

  clickTab,
}

describe('Вкладки карточки заявки', () => {
  test('Все вкладки навигации отображаются', () => {
    render(<CardTabs {...requiredProps} />)

    Object.values(TaskCardTabsEnum).forEach((tab) => {
      expect(testUtils.getNavItem(tab)).toBeInTheDocument()
    })
  })

  test('Установлена корректная вкладка по умолчанию', () => {
    render(<CardTabs {...requiredProps} />)

    expect(
      testUtils.getOpenedTab(TaskCardTabsEnum.Description),
    ).toBeInTheDocument()
  })

  test('Можно открыть любую вкладку', async () => {
    const { user } = render(<CardTabs {...requiredProps} />)

    for await (const tab of Object.values(TaskCardTabsEnum)) {
      await testUtils.clickTab(user, tab)
      expect(testUtils.getOpenedTab(tab)).toBeInTheDocument()
    }
  })
})
