import { screen } from '_tests_/utils'

export const getCloseButton = (): HTMLButtonElement =>
  screen.getByRole('button', { name: 'Close' })

export const getApplyButton = (): HTMLButtonElement =>
  screen.getByRole('button', { name: 'Применить' })

export const getResetAllButton = (): HTMLButtonElement =>
  screen.getByRole('button', {
    name: 'Сбросить все',
  })

export const getCheckbox = (name: RegExp): HTMLInputElement =>
  screen.getByRole('checkbox', { name })

export const getRadioButton = (name: string): HTMLInputElement =>
  screen.getByRole('radio', { name })

export const getStartDateField = (): HTMLInputElement =>
  screen.getByPlaceholderText('Начальная дата')

export const getEndDateField = (): HTMLInputElement =>
  screen.getByPlaceholderText('Конечная дата')

export const getKeywordField = (): HTMLInputElement =>
  screen.getByPlaceholderText('Ключевое слово')

export const getWorkGroupField = () =>
  screen.getByTestId('filter-extended-select-work-group')

export const queryWorkGroupField = () =>
  screen.queryByTestId('filter-extended-select-work-group')
