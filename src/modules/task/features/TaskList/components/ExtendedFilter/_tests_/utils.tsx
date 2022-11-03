import {
  generateWord,
  getButtonIn,
  getCheckboxIn,
  getRadioButtonIn,
} from '_tests_/utils'
import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import { taskExtendedStatusDict } from 'modules/task/constants/dictionary'

import {
  searchFieldDict,
  taskAssignedDict,
  taskOverdueDict,
} from '../constants'

export const getFilter = () => screen.getByTestId('filter-extended')

export const findFilter = async () => screen.findByTestId('filter-extended')

export const getCloseButton = () => getButtonIn(getFilter(), /close/i)

export const getApplyButton = () => getButtonIn(getFilter(), /применить/i)

export const getResetAllButton = () => getButtonIn(getFilter(), /сбросить все/i)

export const getStatusContainer = () =>
  screen.getByTestId('filter-extended-status')

export const getAssignedContainer = () =>
  screen.getByTestId('filter-extended-is-assigned')

export const getOverdueContainer = () =>
  screen.getByTestId('filter-extended-is-overdue')

export const getSearchByColumnContainer = () =>
  screen.getByTestId('filter-extended-search-by-column')

export const getCompleteAtContainer = () =>
  screen.getByTestId('filter-extended-complete-at')

export const getStartDateField = (): HTMLInputElement =>
  within(getCompleteAtContainer()).getByPlaceholderText('Начальная дата')

export const getEndDateField = (): HTMLInputElement =>
  within(getCompleteAtContainer()).getByPlaceholderText('Конечная дата')

export const getSearchByColumnKeywordField = (): HTMLInputElement =>
  within(getSearchByColumnContainer()).getByPlaceholderText('Ключевое слово')

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

export const userClickOutOfFilter = async (user: UserEvent) => {
  const filter = getFilter()
  const overlay = filter.querySelector('.ant-drawer-mask')
  if (overlay) await user.click(overlay)
}

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

export const userSelectStatus = async (user: UserEvent, label: string) => {
  const checkbox = getCheckboxIn(getStatusContainer(), new RegExp(label))
  await user.click(checkbox)
  return checkbox
}

export const userSelectAssigned = async (user: UserEvent, label: string) => {
  const radioButton = getRadioButtonIn(getAssignedContainer(), label)
  await user.click(radioButton)
  return radioButton
}

export const userSelectOverdue = async (user: UserEvent, label: string) => {
  const radioButton = getRadioButtonIn(getOverdueContainer(), label)
  await user.click(radioButton)
  return radioButton
}

export const userEntersSearchByColumnKeyword = async (user: UserEvent) => {
  const keywordField = getSearchByColumnKeywordField()
  const keyword = generateWord()

  await user.type(keywordField, keyword)

  return { keywordField, keyword }
}

export const userSelectSearchByColumnField = async (
  user: UserEvent,
  label: string,
) => {
  const radioButton = getRadioButtonIn(getSearchByColumnContainer(), label)
  await user.click(radioButton)
  return radioButton
}

export const expectStatusHasCorrectInitialValues = () => {
  const container = getStatusContainer()

  Object.entries(taskExtendedStatusDict).forEach(([value, text]) => {
    const checkbox = getCheckboxIn(container, new RegExp(text))
    expect(checkbox).not.toBeChecked()
    expect(checkbox.value).toBe(value)
  })
}

export const expectAssignedHasCorrectInitialValues = () => {
  const container = getAssignedContainer()

  Object.entries(taskAssignedDict).forEach(([value, text]) => {
    const radioButton = getRadioButtonIn(container, text)
    expect(radioButton).not.toBeChecked()
    expect(radioButton.value).toBe(value)
  })
}

export const expectOverdueHasCorrectInitialValues = () => {
  const container = getOverdueContainer()

  Object.entries(taskOverdueDict).forEach(([value, text]) => {
    const radioButton = getRadioButtonIn(container, text)
    expect(radioButton).not.toBeChecked()
    expect(radioButton.value).toBe(value)
  })
}

export const expectCompleteAtHasCorrectInitialValues = () => {
  expect(getStartDateField()).not.toHaveValue()
  expect(getEndDateField()).not.toHaveValue()
}

export const expectSearchByColumnHasCorrectInitialValues = () => {
  const container = getSearchByColumnContainer()

  const searchByNameButton = getRadioButtonIn(
    container,
    searchFieldDict.searchByName,
  )

  const searchByTitleButton = getRadioButtonIn(
    container,
    searchFieldDict.searchByTitle,
  )

  const searchByAssigneeButton = getRadioButtonIn(
    container,
    searchFieldDict.searchByAssignee,
  )

  expect(searchByNameButton.value).toBe('searchByName')
  expect(searchByTitleButton.value).toBe('searchByTitle')
  expect(searchByAssigneeButton.value).toBe('searchByAssignee')

  expect(searchByNameButton).not.toBeChecked()
  expect(searchByTitleButton).toBeChecked()
  expect(searchByAssigneeButton).not.toBeChecked()

  const keywordField = getSearchByColumnKeywordField()
  expect(keywordField).not.toHaveValue()
}
