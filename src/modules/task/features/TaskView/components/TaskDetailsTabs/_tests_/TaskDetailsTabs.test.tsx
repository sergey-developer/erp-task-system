import { render } from '_tests_/utils'

import { TaskDetailsTabsEnum } from '../constants'
import TaskDetailsTabs from '../index'
import { requiredProps } from './constants'
import testUtils from './utils'

describe('Вкладки карточки заявки', () => {
  test('Все вкладки навигации отображаются', () => {
    render(<TaskDetailsTabs {...requiredProps} />)

    Object.values(TaskDetailsTabsEnum).forEach((tab) => {
      expect(testUtils.getNavItem(tab)).toBeInTheDocument()
    })
  })

  test('Установлена корректная вкладка по умолчанию', () => {
    render(<TaskDetailsTabs {...requiredProps} />)

    expect(
      testUtils.getOpenedTab(TaskDetailsTabsEnum.Description),
    ).toBeInTheDocument()
  })

  test('Можно открыть любую вкладку', async () => {
    const { user } = render(<TaskDetailsTabs {...requiredProps} />)

    for await (const tab of Object.values(TaskDetailsTabsEnum)) {
      await testUtils.userClickTab(user, tab)
      expect(testUtils.getOpenedTab(tab)).toBeInTheDocument()
    }
  })
})
