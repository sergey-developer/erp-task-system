import {
  generateWord,
  getButtonIn,
  getCheckboxIn,
  getRadioButtonIn,
  loadingFinishedBySelect,
  userOpenSelect,
} from '_tests_/utils'
import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import { taskExtendedStatusDict } from 'modules/task/constants/dictionary'

import {
  searchFieldDict,
  taskAssignedDict,
  taskOverdueDict,
} from '../constants'

const getFilter = () => screen.getByTestId('filter-extended')
const findFilter = async () => screen.findByTestId('filter-extended')
const getCloseButton = () => getButtonIn(getFilter(), /close/i)
const getApplyButton = () => getButtonIn(getFilter(), /применить/i)
const getResetAllButton = () => getButtonIn(getFilter(), /сбросить все/i)

// actions
const userClickResetButtonIn = async (
  user: UserEvent,
  container: HTMLElement,
) => {
  const button = getButtonIn(container, /сбросить/i)
  await user.click(button)
  return button
}

const userClickResetAllButton = async (user: UserEvent) => {
  const button = getResetAllButton()
  await user.click(button)
  return button
}

const userCloseFilter = async (user: UserEvent) => {
  const button = getCloseButton()
  await user.click(button)
  return button
}

const userApplyFilter = async (user: UserEvent) => {
  const button = getApplyButton()
  await user.click(button)
  return button
}

const userClickOutOfFilter = async (user: UserEvent) => {
  const filter = getFilter()
  const overlay = filter.querySelector('.ant-drawer-mask')
  if (overlay) await user.click(overlay)
}

// status
const getStatusContainer = () => screen.getByTestId('filter-extended-status')

const getStatusField = (label: string) =>
  getCheckboxIn(getStatusContainer(), new RegExp(label))

const userSelectStatus = async (user: UserEvent, label: string) => {
  const checkbox = getStatusField(label)
  await user.click(checkbox)
  return checkbox
}

const expectStatusHasCorrectInitialValues = () => {
  const container = getStatusContainer()

  Object.entries(taskExtendedStatusDict).forEach(([value, text]) => {
    const checkbox = getCheckboxIn(container, new RegExp(text))
    expect(checkbox).not.toBeChecked()
    expect(checkbox.value).toBe(value)
  })
}

const status = {
  getContainer: getStatusContainer,
  getField: getStatusField,
  userSetValue: userSelectStatus,
  expectHasCorrectInitialValues: expectStatusHasCorrectInitialValues,
}

// assigned
const getAssignedContainer = () =>
  screen.getByTestId('filter-extended-is-assigned')

const getAssignedField = (label: string) =>
  getRadioButtonIn(getAssignedContainer(), label)

const userSelectAssigned = async (user: UserEvent, label: string) => {
  const radioButton = getAssignedField(label)
  await user.click(radioButton)
  return radioButton
}

const expectAssignedHasCorrectInitialValues = () => {
  const container = getAssignedContainer()

  Object.entries(taskAssignedDict).forEach(([value, text]) => {
    const radioButton = getRadioButtonIn(container, text)
    expect(radioButton).not.toBeChecked()
    expect(radioButton.value).toBe(value)
  })
}

const assigned = {
  getContainer: getAssignedContainer,
  getField: getAssignedField,
  userSetValue: userSelectAssigned,
  expectHasCorrectInitialValues: expectAssignedHasCorrectInitialValues,
}

// overdue
const getOverdueContainer = () =>
  screen.getByTestId('filter-extended-is-overdue')

const getOverdueField = (label: string) =>
  getRadioButtonIn(getOverdueContainer(), label)

const userSelectOverdue = async (user: UserEvent, label: string) => {
  const radioButton = getOverdueField(label)
  await user.click(radioButton)
  return radioButton
}

const expectOverdueHasCorrectInitialValues = () => {
  const container = getOverdueContainer()

  Object.entries(taskOverdueDict).forEach(([value, text]) => {
    const radioButton = getRadioButtonIn(container, text)
    expect(radioButton).not.toBeChecked()
    expect(radioButton.value).toBe(value)
  })
}

const overdue = {
  getContainer: getOverdueContainer,
  getField: getOverdueField,
  userSetValue: userSelectOverdue,
  expectHasCorrectInitialValues: expectOverdueHasCorrectInitialValues,
}

// complete at
const getCompleteAtContainer = () =>
  screen.getByTestId('filter-extended-complete-at')

const getStartDateField = (): HTMLInputElement =>
  within(getCompleteAtContainer()).getByPlaceholderText('Начальная дата')

const getEndDateField = (): HTMLInputElement =>
  within(getCompleteAtContainer()).getByPlaceholderText('Конечная дата')

const userFillCompleteAtField = async (user: UserEvent) => {
  const startDateField = getStartDateField()
  const endDateField = getEndDateField()

  const startDateValue = '2022-09-10'
  const endDateValue = '2022-09-11'

  await user.type(startDateField, startDateValue)
  await user.type(endDateField, endDateValue)
  await user.tab()

  return { startDateField, startDateValue, endDateField, endDateValue }
}

const expectCompleteAtHasCorrectInitialValues = () => {
  expect(getStartDateField()).not.toHaveValue()
  expect(getEndDateField()).not.toHaveValue()
}

const completeAt = {
  getContainer: getCompleteAtContainer,
  getStartDateField: getStartDateField,
  getEndDateField: getEndDateField,
  userSetValue: userFillCompleteAtField,
  expectHasCorrectInitialValues: expectCompleteAtHasCorrectInitialValues,
}

// work group
const getWorkGroupContainer = () =>
  screen.getByTestId('filter-extended-work-group')

const getWorkGroupField = () =>
  screen.getByTestId('filter-extended-work-group-select')

const queryWorkGroupField = () =>
  screen.queryByTestId('filter-extended-work-group-select')

const workGroupLoadingFinished = async () => {
  const workGroupField = getWorkGroupField()
  await loadingFinishedBySelect(workGroupField)
  return workGroupField
}

const openWorkGroupField = async (
  user: UserEvent,
  workGroupField: HTMLElement,
) => {
  await userOpenSelect(user, workGroupField)
}

const userSelectWorkGroup = async (user: UserEvent, value: string) => {
  const workGroupOption = screen.getByText(value)
  await user.click(workGroupOption)
  return workGroupOption
}

const workGroup = {
  getContainer: getWorkGroupContainer,
  getField: getWorkGroupField,
  queryField: queryWorkGroupField,
  openField: openWorkGroupField,
  userSetValue: userSelectWorkGroup,
  loadingFinished: workGroupLoadingFinished,
}

// search by column
const getSearchByColumnContainer = () =>
  screen.getByTestId('filter-extended-search-by-column')

const getSearchByColumnKeywordField = (): HTMLInputElement =>
  within(getSearchByColumnContainer()).getByPlaceholderText('Ключевое слово')

const getSearchByColumnColumnField = (label: string) =>
  getRadioButtonIn(getSearchByColumnContainer(), label)

const userEntersSearchByColumnKeyword = async (user: UserEvent) => {
  const keywordField = getSearchByColumnKeywordField()
  const keyword = generateWord()

  await user.type(keywordField, keyword)

  return { keywordField, keyword }
}

const userSelectSearchByColumnField = async (
  user: UserEvent,
  label: string,
) => {
  const radioButton = getRadioButtonIn(getSearchByColumnContainer(), label)
  await user.click(radioButton)
  return radioButton
}

const expectSearchByColumnHasCorrectInitialValues = () => {
  const searchByNameButton = getSearchByColumnColumnField(
    searchFieldDict.searchByName,
  )

  const searchByTitleButton = getSearchByColumnColumnField(
    searchFieldDict.searchByTitle,
  )

  const searchByAssigneeButton = getSearchByColumnColumnField(
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

const searchByColumn = {
  getContainer: getSearchByColumnContainer,
  getColumnField: getSearchByColumnColumnField,
  getKeywordField: getSearchByColumnKeywordField,
  userSetKeywordValue: userEntersSearchByColumnKeyword,
  userSetColumnValue: userSelectSearchByColumnField,
  expectHasCorrectInitialValues: expectSearchByColumnHasCorrectInitialValues,
}

const testUtils = {
  getFilter,
  findFilter,
  getCloseButton,
  getApplyButton,
  getResetAllButton,
  userClickResetButtonIn,
  userClickResetAllButton,
  userCloseFilter,
  userApplyFilter,
  userClickOutOfFilter,
  searchByColumn,
  status,
  assigned,
  overdue,
  completeAt,
  workGroup,
}

export default testUtils
