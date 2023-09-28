import { waitFor, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

const btnLoadingClass = 'ant-btn-loading'

const findButtonIn = async (container: HTMLElement, name: string | RegExp) =>
  within(container).findByRole('button', { name })

const getButtonIn = (container: HTMLElement, name: string | RegExp) =>
  within(container).getByRole('button', { name })

const getAllButtonIn = (container: HTMLElement, name: string | RegExp) =>
  within(container).getAllByRole('button', { name })

const queryButtonIn = (container: HTMLElement, name: string | RegExp) =>
  within(container).queryByRole('button', { name })

const expectLoadingStarted = async (button: HTMLElement) => {
  await waitFor(() => {
    expect(button).toHaveClass(btnLoadingClass)
  })
}

const expectLoadingFinished = async (button: HTMLElement) => {
  await waitFor(() => {
    expect(button).not.toHaveClass(btnLoadingClass)
  })
}

// menu button
const getMenuButtonIn = (container: HTMLElement) => getButtonIn(container, 'menu')

const clickMenuButtonIn = async (container: HTMLElement, user: UserEvent) => {
  const button = getMenuButtonIn(container)
  await user.click(button)
}

// close button
const getCloseButtonIn = (container: HTMLElement) => getButtonIn(container, 'Close')

const clickCloseButtonIn = async (container: HTMLElement, user: UserEvent) => {
  const button = getCloseButtonIn(container)
  await user.click(button)
  return button
}

// filter button
const getFilterButtonIn = (container: HTMLElement) => getButtonIn(container, /filter/)

const clickFilterButtonIn = async (container: HTMLElement, user: UserEvent) => {
  const button = getFilterButtonIn(container)
  await user.click(button)
}

const utils = {
  findButtonIn,
  getButtonIn,
  getAllButtonIn,
  queryButtonIn,
  expectLoadingStarted,
  expectLoadingFinished,

  getMenuButtonIn,
  clickMenuButtonIn,

  getCloseButtonIn,
  clickCloseButtonIn,

  getFilterButtonIn,
  clickFilterButtonIn,
}

export default utils
