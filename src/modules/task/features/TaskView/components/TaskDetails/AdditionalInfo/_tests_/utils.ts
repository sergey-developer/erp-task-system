import { screen } from '_tests_/utils'
import { UserEvent } from '@testing-library/user-event/setup/setup'

export const getExpandButton = () => screen.getByTestId('btn-expand')

export const getAdditionalInfoContent = () =>
  screen.getByTestId('additional-info-content')

export const queryAdditionalInfoContent = () =>
  screen.queryByTestId('additional-info-content')

export const userClickExpandButton = async (user: UserEvent) => {
  const button = getExpandButton()
  await user.click(button)
}
