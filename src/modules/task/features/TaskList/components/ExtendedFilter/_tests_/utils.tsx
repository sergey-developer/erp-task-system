import { screen, within } from '_tests_/utils'

export const getCloseButton = (): HTMLButtonElement =>
  screen.getByRole('button', { name: 'Close' })

export const getCheckbox = (name: RegExp): HTMLInputElement =>
  screen.getByRole('checkbox', { name })

export const getFilterBlockLabel = (containerTestId: string, label: string) => {
  const filterBlockLabel = screen.getByTestId(containerTestId)

  const title = within(filterBlockLabel).getByRole('heading', {
    name: label,
  })

  const resetButton = within(filterBlockLabel).getByRole('button', {
    name: 'Сбросить',
  })

  return { title, resetButton }
}
