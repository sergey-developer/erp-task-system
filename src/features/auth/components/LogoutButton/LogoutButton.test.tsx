import { screen } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { render } from '_tests_/helpers'

import LogoutButton from './index'

const getButton = () => screen.getByTestId('btn-logout')
const findButton = () => screen.findByTestId('btn-logout')

const clickButton = async (user: UserEvent) => {
  const button = getButton()
  await user.click(button)
}

export const testUtils = {
  getButton,
  findButton,
  clickButton,
}

test('Отображается', () => {
  render(<LogoutButton />)

  const button = getButton()

  expect(button).toBeInTheDocument()
  expect(button).toBeEnabled()
})
