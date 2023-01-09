import { getButtonIn } from '_tests_/utils'
import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

const getContainer = () => screen.getByTestId('task-card-additional-info')

const getAdditionalInfoContent = () =>
  within(getContainer()).getByTestId('additional-info-content')

const queryAdditionalInfoContent = () =>
  within(getContainer()).queryByTestId('additional-info-content')

const getExpandButton = () =>
  getButtonIn(getContainer(), /дополнительная информация/i)

const userClickExpandButton = async (user: UserEvent) => {
  const button = getExpandButton()
  await user.click(button)
  return button
}

const getAddress = () =>
  within(getAdditionalInfoContent()).getByTestId('additional-info-address')

const getAddressIcon = () =>
  within(getAddress()).getByRole('img', { name: 'environment' })

const utils = {
  getContainer,

  getAdditionalInfoContent,
  queryAdditionalInfoContent,

  getExpandButton,
  userClickExpandButton,

  getAddress,
  getAddressIcon,
}

export default utils
