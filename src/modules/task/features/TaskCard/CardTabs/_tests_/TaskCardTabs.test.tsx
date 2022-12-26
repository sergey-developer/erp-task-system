import { render } from '_tests_/utils'

import { TaskCardTabsEnum } from '../constants'
import TaskCardTabs from '../index'
import { requiredProps } from './constants'
import testUtils from './utils'

describe('Вкладки карточки заявки', () => {
  test('Все вкладки навигации отображаются', () => {
    render(<TaskCardTabs {...requiredProps} />)

    Object.values(TaskCardTabsEnum).forEach((tab) => {
      expect(testUtils.getNavItem(tab)).toBeInTheDocument()
    })
  })

  test('Установлена корректная вкладка по умолчанию', () => {
    render(<TaskCardTabs {...requiredProps} />)

    expect(
      testUtils.getOpenedTab(TaskCardTabsEnum.Description),
    ).toBeInTheDocument()
  })

  test('Можно открыть любую вкладку', async () => {
    const { user } = render(<TaskCardTabs {...requiredProps} />)

    for await (const tab of Object.values(TaskCardTabsEnum)) {
      await testUtils.userClickTab(user, tab)
      expect(testUtils.getOpenedTab(tab)).toBeInTheDocument()
    }
  })
})
