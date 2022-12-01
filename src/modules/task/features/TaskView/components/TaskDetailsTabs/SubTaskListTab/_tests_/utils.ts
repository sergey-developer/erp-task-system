import { getButtonIn } from '_tests_/utils'
import { screen } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

const getContainer = () => screen.getByTestId('subtask-list-tab')

const getCreateSubTaskButton = () =>
  getButtonIn(getContainer(), /создать новое задание/i)

const userClickCreateSubTaskButton = async (user: UserEvent) => {
  const button = getCreateSubTaskButton()
  await user.click(button)
  return button
}

const utils = {
  getContainer,

  getCreateSubTaskButton,
  openCreateSubTaskModal: userClickCreateSubTaskButton,
}

export default utils
