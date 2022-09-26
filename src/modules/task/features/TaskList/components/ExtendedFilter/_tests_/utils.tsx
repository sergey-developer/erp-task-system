import { screen, within } from '_tests_/utils'
import { UserEvent } from '@testing-library/user-event/setup/setup'

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

export const userFillExecuteBeforeField = async (user: UserEvent) => {
  const startDateField = getStartDateField()
  const endDateField = getEndDateField()

  const startDateValue = '2022-09-10'
  const endDateValue = '2022-09-11'

  await user.type(startDateField, startDateValue)
  await user.type(endDateField, endDateValue)
  await user.tab()

  return { startDateField, startDateValue, endDateField, endDateValue }
}

export const getKeywordField = (): HTMLInputElement =>
  screen.getByPlaceholderText('Ключевое слово')

export const getWorkGroupField = () =>
  screen.getByTestId('filter-extended-work-group-select')

export const queryWorkGroupField = () =>
  screen.queryByTestId('filter-extended-work-group-select')

export const getResetButton = (containerTestId: string) => {
  const container = screen.getByTestId(containerTestId)
  return within(container).getByRole('button', { name: 'Сбросить' })
}

export const userClickResetButton = async (
  user: UserEvent,
  containerTestId: string,
) => {
  const button = getResetButton(containerTestId)
  await user.click(button)
}

export const userClickResetAllButton = async (user: UserEvent) => {
  const button = getResetAllButton()
  await user.click(button)
}
