import { getButton, getButtonIn } from '_tests_/utils'
import { screen } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

export const getFilter = () => screen.getByTestId('filter-extended')

export const findFilter = () => screen.findByTestId('filter-extended')

export const getCloseButton = () => getButtonIn(getFilter(), /close/i)

export const getApplyButton = () => getButtonIn(getFilter(), /применить/i)

export const getResetAllButton = () => getButton(/сбросить все/i)

export const getStatusContainer = () =>
  screen.getByTestId('filter-extended-status')

export const getAssignedContainer = () =>
  screen.getByTestId('filter-extended-is-assigned')

export const getOverdueContainer = () =>
  screen.getByTestId('filter-extended-is-overdue')

export const getSearchByColumnContainer = () =>
  screen.getByTestId('filter-extended-search-by-column')

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
  const button = getButtonIn(container, /сбросить/i)
  await user.click(button)
  return button
}

export const userClickResetAllButton = async (user: UserEvent) => {
  const button = getResetAllButton()
  await user.click(button)
  return button
}

export const userCloseFilter = async (user: UserEvent) => {
  const button = getCloseButton()
  await user.click(button)
  return button
}

export const userApplyFilter = async (user: UserEvent) => {
  const button = getApplyButton()
  await user.click(button)
  return button
}
