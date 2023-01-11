import { getButtonIn, getIconByNameIn } from '_tests_/utils'
import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

const getContainer = () =>
  screen.getByTestId('task-card-reclassification-request')

const findContainer = () =>
  screen.findByTestId('task-card-reclassification-request')

const queryContainer = () =>
  screen.queryByTestId('task-card-reclassification-request')

const getIcon = () => getIconByNameIn(getContainer(), 'question-circle')

const getText = (text: string) => within(getContainer()).getByText(text)

const getButton = (label: string) => getButtonIn(getContainer(), label)

const userClickButton = async (user: UserEvent, btnLabel: string) => {
  const button = getButton(btnLabel)
  await user.click(button)
  return button
}

const utils = {
  getContainer,
  findContainer,
  queryContainer,

  getIcon,
  getText,

  getButton,
  userClickButton,
}

export default utils
