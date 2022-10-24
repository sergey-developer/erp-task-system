import { screen, within } from '_tests_/utils'

export const getButton = (name: string | RegExp): HTMLButtonElement =>
  screen.getByRole('button', { name })

export const getButtonIn = (
  container: HTMLElement,
  name: string | RegExp,
): HTMLButtonElement => within(container).getByRole('button', { name })
