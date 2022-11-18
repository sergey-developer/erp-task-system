import { buttonTestUtils, getIconByNameIn } from '_tests_/utils'
import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

const getTaskReclassificationRequest = () =>
  screen.getByTestId('task-reclassification-request')

const getIcon = () =>
  getIconByNameIn(getTaskReclassificationRequest(), 'question-circle')

const getText = (text: string) =>
  within(getTaskReclassificationRequest()).getByText(text)

const getButton = (label: string) =>
  buttonTestUtils.getButtonIn(getTaskReclassificationRequest(), label)

const userClickButton = async (user: UserEvent, btnLabel: string) => {
  const button = getButton(btnLabel)
  await user.click(button)
  return button
}

const utils = {
  getContainer: getTaskReclassificationRequest,
  getIcon,
  getText,
  getButton,
  userClickButton,
}

export default utils
