import { waitFor, within } from '@testing-library/react'

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

const utils = {
  findButtonIn,
  getButtonIn,
  getAllButtonIn,
  queryButtonIn,
  expectLoadingStarted,
  expectLoadingFinished,
}

export default utils
