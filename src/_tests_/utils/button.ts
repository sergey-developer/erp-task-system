import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

const getButton = (name: string | RegExp) =>
  screen.getByRole('button', { name })

const findButtonIn = async (container: HTMLElement, name: string | RegExp) =>
  within(container).findByRole('button', { name })

const getButtonIn = (container: HTMLElement, name: string | RegExp) =>
  within(container).getByRole('button', { name })

const queryButtonIn = (container: HTMLElement, name: string | RegExp) =>
  within(container).queryByRole('button', { name })

const getCloseButtonFn = (container: HTMLElement) => () =>
  getButtonIn(container, /close/i)

const getUserClickCloseButtonFn =
  (buttonContainer: HTMLElement) => async (user: UserEvent) => {
    const getButton = getCloseButtonFn(buttonContainer)
    const button = getButton()
    await user.click(button)
    return button
  }

const utils = {
  getButton,

  findButtonIn,
  getButtonIn,
  queryButtonIn,

  getCloseButtonFn,
  getUserClickCloseButtonFn,
}

export default utils
