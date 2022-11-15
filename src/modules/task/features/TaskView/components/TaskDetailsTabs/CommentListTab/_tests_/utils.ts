import { getButtonIn, queryButtonIn } from '_tests_/utils'
import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

const getContainer = () => screen.getByTestId('task-comment-list-tab')

const getChildByText = (text: string) => within(getContainer()).getByText(text)

const getExpandButton = (commentCount?: number) =>
  getButtonIn(
    getContainer(),
    commentCount
      ? `Отобразить все комментарии: ${commentCount}`
      : /Отобразить все комментарии/,
  )

const queryExpandButton = (commentCount?: number) =>
  queryButtonIn(
    getContainer(),
    commentCount
      ? `Отобразить все комментарии: ${commentCount}`
      : /Отобразить все комментарии/,
  )

const userClickExpandButton = async (user: UserEvent) => {
  const button = getExpandButton()
  await user.click(button)
  return button
}

const getCollapseButton = () =>
  getButtonIn(getContainer(), /скрыть комментарии/i)

const userClickCollapseButton = async (user: UserEvent) => {
  const button = getCollapseButton()
  await user.click(button)
  return button
}

const utils = {
  getContainer,
  getChildByText,

  getExpandButton,
  queryExpandButton,
  userClickExpandButton,

  getCollapseButton,
  userClickCollapseButton,
}

export default utils
