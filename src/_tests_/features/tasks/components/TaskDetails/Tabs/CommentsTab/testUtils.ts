import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { buttonTestUtils } from '_tests_/utils/index'

import { TestIdsEnum } from './constants'

const getContainer = () => screen.getByTestId(TestIdsEnum.TaskCommentsTab)
const getChildByText = (text: string) => within(getContainer()).getByText(text)

const getExpandButton = (commentCount?: number) =>
  buttonTestUtils.getButtonIn(
    getContainer(),
    commentCount ? `Отобразить все комментарии: ${commentCount}` : /Отобразить все комментарии/,
  )

const queryExpandButton = (commentCount?: number) =>
  buttonTestUtils.queryButtonIn(
    getContainer(),
    commentCount ? `Отобразить все комментарии: ${commentCount}` : /Отобразить все комментарии/,
  )

const clickExpandButton = async (user: UserEvent) => {
  const button = getExpandButton()
  await user.click(button)
  return button
}

const getCollapseButton = () => buttonTestUtils.getButtonIn(getContainer(), /скрыть комментарии/i)

const clickCollapseButton = async (user: UserEvent) => {
  const button = getCollapseButton()
  await user.click(button)
  return button
}

export const commentsTabTestUtils = {
  getContainer,
  getChildByText,

  getExpandButton,
  queryExpandButton,
  clickExpandButton,

  getCollapseButton,
  clickCollapseButton,
}
