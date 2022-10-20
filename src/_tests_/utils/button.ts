import { screen } from '_tests_/utils'

export const getButton = (name: string | RegExp): HTMLButtonElement =>
  screen.getByRole('button', { name })
