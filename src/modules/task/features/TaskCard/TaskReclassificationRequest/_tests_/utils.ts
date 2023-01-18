import { getButtonIn, getIconByNameIn } from '_tests_/utils'
import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

const getContainer = () =>
  screen.getByTestId('task-card-reclassification-request')

const findContainer = () =>
  screen.findByTestId('task-card-reclassification-request')

const queryContainer = () =>
  screen.queryByTestId('task-card-reclassification-request')

const getChildByText = (text: string | RegExp) =>
  within(getContainer()).getByText(text)

const getIcon = () => getIconByNameIn(getContainer(), 'question-circle')

const getCancelButton = () => getButtonIn(getContainer(), /отменить запрос/i)

const userClickCancelButton = async (user: UserEvent) => {
  const button = getCancelButton()
  await user.click(button)
  return button
}

const utils = {
  getContainer,
  findContainer,
  queryContainer,

  getChildByText,
  getIcon,

  getCancelButton,
  userClickCancelButton,
}

export default utils
