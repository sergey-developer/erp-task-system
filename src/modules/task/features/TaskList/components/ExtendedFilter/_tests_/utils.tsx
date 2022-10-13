import { screen, within } from '_tests_/utils'
import { ByRoleOptions } from '@testing-library/dom/types/queries'
import { UserEvent } from '@testing-library/user-event/setup/setup'

export const getCloseButton = (): HTMLButtonElement =>
  screen.getByRole('button', { name: 'Close' })

export const getApplyButton = (): HTMLButtonElement =>
  screen.getByRole('button', { name: 'Применить' })

export const getResetAllButton = (): HTMLButtonElement =>
  screen.getByRole('button', {
    name: 'Сбросить все',
  })

export const getStatusContainer = () =>
  screen.getByTestId('filter-extended-status')

export const getAssignedContainer = () =>
  screen.getByTestId('filter-extended-is-assigned')

export const getOverdueContainer = () =>
  screen.getByTestId('filter-extended-is-overdue')

export const getSearchByColumnContainer = () =>
  screen.getByTestId('filter-extended-search-by-column')

export const getCheckboxIn = (
  container: HTMLElement,
  options: ByRoleOptions,
): HTMLInputElement => within(container).getByRole('checkbox', options)

export const getRadioButtonIn = (
  container: HTMLElement,
  options: ByRoleOptions,
): HTMLInputElement => within(container).getByRole('radio', options)

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

export const userClickResetButtonIn = async (
  user: UserEvent,
  container: HTMLElement,
) => {
  const button = within(container).getByRole('button', { name: 'Сбросить' })
  await user.click(button)
}

export const userClickResetAllButton = async (user: UserEvent) => {
  const button = getResetAllButton()
  await user.click(button)
}
