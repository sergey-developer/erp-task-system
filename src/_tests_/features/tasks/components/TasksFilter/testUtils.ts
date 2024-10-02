import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import {
  searchFieldDict,
  taskAssignedDict,
  taskOverdueDict,
} from 'modules/task/components/TasksFilter/constants'
import { taskExtendedStatusDict } from 'modules/task/constants/task/index'

import {
  buttonTestUtils,
  checkboxTestUtils,
  fakeWord,
  radioButtonTestUtils,
  selectTestUtils,
} from '_tests_/utils/index'

import { TestIdsEnum } from '_tests_/features/tasks/components/TasksFilter/constants'

const getContainer = () => screen.getByTestId(TestIdsEnum.ExtendedFilter)
const findContainer = () => screen.findByTestId(TestIdsEnum.ExtendedFilter)

// reset button
const getResetAllButton = () => buttonTestUtils.getButtonIn(getContainer(), /сбросить все/i)

const clickResetButtonIn = async (user: UserEvent, container: HTMLElement) => {
  const button = buttonTestUtils.getButtonIn(container, /сбросить/i)
  await user.click(button)
  return button
}

const clickResetAllButton = async (user: UserEvent) => {
  const button = getResetAllButton()
  await user.click(button)
  return button
}

// close button
const getCloseButton = () => buttonTestUtils.getButtonIn(getContainer(), /close/i)

const closeFilter = async (user: UserEvent) => {
  const button = getCloseButton()
  await user.click(button)
  return button
}

// apply button
const getApplyButton = () => buttonTestUtils.getButtonIn(getContainer(), /применить/i)

const clickApplyButton = async (user: UserEvent) => {
  const button = getApplyButton()
  await user.click(button)
  return button
}

// support group
const getSupportGroupBlock = () => within(getContainer()).getByTestId(TestIdsEnum.SupportGroupBlock)
// support group. customers
const getCustomersFormItem = () => screen.getByTestId(TestIdsEnum.CustomersFormItem)
const getCustomersSelect = () => selectTestUtils.getSelect(getCustomersFormItem())

const openCustomersSelect = (user: UserEvent) =>
  selectTestUtils.openSelect(user, getCustomersFormItem())

const setCustomer = selectTestUtils.clickSelectOption
const getSelectedCustomer = () => selectTestUtils.getSelectedOption(getCustomersFormItem())

const expectCustomersLoadingStarted = () =>
  selectTestUtils.expectLoadingStarted(getCustomersFormItem())

const expectCustomersLoadingFinished = () =>
  selectTestUtils.expectLoadingFinished(getCustomersFormItem())

// support group. macroregions
const getMacroregionsFormItem = () => screen.getByTestId(TestIdsEnum.MacroregionsFormItem)
const getMacroregionsSelect = () => selectTestUtils.getSelect(getMacroregionsFormItem())

const openMacroregionsSelect = (user: UserEvent) =>
  selectTestUtils.openSelect(user, getMacroregionsFormItem())

const setMacroregion = selectTestUtils.clickSelectOption
const getSelectedMacroregion = () => selectTestUtils.getSelectedOption(getMacroregionsFormItem())

const expectMacroregionsLoadingStarted = () =>
  selectTestUtils.expectLoadingStarted(getMacroregionsFormItem())

const expectMacroregionsLoadingFinished = () =>
  selectTestUtils.expectLoadingFinished(getMacroregionsFormItem())

// support group. supportGroups
const getSupportGroupsFormItem = () => screen.getByTestId(TestIdsEnum.SupportGroupsFormItem)
const getSupportGroupsSelect = () => selectTestUtils.getSelect(getSupportGroupsFormItem())

const openSupportGroupsSelect = (user: UserEvent) =>
  selectTestUtils.openSelect(user, getSupportGroupsFormItem())

const setSupportGroup = selectTestUtils.clickSelectOption
const getSelectedSupportGroup = () => selectTestUtils.getSelectedOption(getSupportGroupsFormItem())

const expectSupportGroupsLoadingStarted = () =>
  selectTestUtils.expectLoadingStarted(getSupportGroupsFormItem())

const expectSupportGroupsLoadingFinished = () =>
  selectTestUtils.expectLoadingFinished(getSupportGroupsFormItem())

// status
const getStatusFieldContainer = () => screen.getByTestId(TestIdsEnum.StatusBlock)

const getStatusField = (label: string) =>
  checkboxTestUtils.getCheckboxIn(getStatusFieldContainer(), new RegExp(label))

const setStatus = async (user: UserEvent, label: string) => {
  const field = getStatusField(label)
  await user.click(field)
  return field
}

const expectStatusHasCorrectInitialValues = () => {
  const container = getStatusFieldContainer()

  Object.entries(taskExtendedStatusDict).forEach(([value, text]) => {
    const checkbox = checkboxTestUtils.getCheckboxIn(container, new RegExp(text))
    expect(checkbox).not.toBeChecked()
    expect(checkbox.value).toBe(value)
  })
}

const status = {
  getContainer: getStatusFieldContainer,
  getField: getStatusField,
  setValue: setStatus,
  expectHasCorrectInitialValues: expectStatusHasCorrectInitialValues,
}

// assigned
const getAssignedFieldContainer = () => screen.getByTestId(TestIdsEnum.AssignedBlock)

const getAssignedField = (label: string) =>
  radioButtonTestUtils.getRadioButtonIn(getAssignedFieldContainer(), label)

const setAssigned = async (user: UserEvent, label: string) => {
  const radioButton = getAssignedField(label)
  await user.click(radioButton)
  return radioButton
}

const expectAssignedHasCorrectInitialValues = () => {
  const container = getAssignedFieldContainer()

  Object.entries(taskAssignedDict).forEach(([value, text]) => {
    const radioButton = radioButtonTestUtils.getRadioButtonIn(container, text)
    expect(radioButton).not.toBeChecked()
    expect(radioButton.value).toBe(value)
  })
}

const assigned = {
  getContainer: getAssignedFieldContainer,
  getField: getAssignedField,
  setValue: setAssigned,
  expectHasCorrectInitialValues: expectAssignedHasCorrectInitialValues,
}

// overdue
const getOverdueFieldContainer = () => screen.getByTestId(TestIdsEnum.OverdueBlock)

const getOverdueField = (label: string) =>
  radioButtonTestUtils.getRadioButtonIn(getOverdueFieldContainer(), label)

const setOverdue = async (user: UserEvent, label: string) => {
  const radioButton = getOverdueField(label)
  await user.click(radioButton)
  return radioButton
}

const expectOverdueHasCorrectInitialValues = () => {
  const container = getOverdueFieldContainer()

  Object.entries(taskOverdueDict).forEach(([value, text]) => {
    const radioButton = radioButtonTestUtils.getRadioButtonIn(container, text)
    expect(radioButton).not.toBeChecked()
    expect(radioButton.value).toBe(value)
  })
}

const overdue = {
  getContainer: getOverdueFieldContainer,
  getField: getOverdueField,
  setValue: setOverdue,
  expectHasCorrectInitialValues: expectOverdueHasCorrectInitialValues,
}

// complete at
const getCompleteAtFieldContainer = () => screen.getByTestId(TestIdsEnum.CompleteAtBlock)

const getStartDateField = (): HTMLInputElement =>
  within(getCompleteAtFieldContainer()).getByPlaceholderText('Начальная дата')

const getEndDateField = (): HTMLInputElement =>
  within(getCompleteAtFieldContainer()).getByPlaceholderText('Конечная дата')

const setCompleteAt = async (user: UserEvent) => {
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
  getContainer: getCompleteAtFieldContainer,
  getStartDateField: getStartDateField,
  getEndDateField: getEndDateField,
  setValue: setCompleteAt,
  expectHasCorrectInitialValues: expectCompleteAtHasCorrectInitialValues,
}

// creation date
const getCreationDateBlock = () => screen.getByTestId(TestIdsEnum.CreationDateBlock)

const getCreationStartDateField = (): HTMLInputElement =>
  within(getCreationDateBlock()).getByPlaceholderText('Начальная дата')

const getCreationEndDateField = (): HTMLInputElement =>
  within(getCreationDateBlock()).getByPlaceholderText('Конечная дата')

const setCreationDate = async (user: UserEvent) => {
  const startDateField = getCreationStartDateField()
  const endDateField = getCreationEndDateField()

  const startDateValue = '2022-09-10'
  const endDateValue = '2022-09-11'

  await user.type(startDateField, startDateValue)
  await user.type(endDateField, endDateValue)
  await user.tab()

  return { startDateField, startDateValue, endDateField, endDateValue }
}

const expectCreationDateHasCorrectInitialValues = () => {
  expect(getCreationStartDateField()).not.toHaveValue()
  expect(getCreationEndDateField()).not.toHaveValue()
}

const creationDate = {
  getContainer: getCreationDateBlock,
  getStartDateField: getCreationStartDateField,
  getEndDateField: getCreationEndDateField,
  setValue: setCreationDate,
  expectHasCorrectInitialValues: expectCreationDateHasCorrectInitialValues,
}

// work group
const getWorkGroupFieldContainer = () => screen.getByTestId(TestIdsEnum.WorkGroupBlock)
const queryWorkGroupFieldContainer = () => screen.queryByTestId(TestIdsEnum.WorkGroupBlock)
const getWorkGroupField = () => screen.getByTestId(TestIdsEnum.WorkGroupSelect)
const queryWorkGroupField = () => screen.queryByTestId(TestIdsEnum.WorkGroupSelect)

const workGroupExpectLoadingFinished = async () => {
  const workGroupField = getWorkGroupField()
  await selectTestUtils.expectLoadingFinished(workGroupField)
  return workGroupField
}

const workGroup = {
  getContainer: getWorkGroupFieldContainer,
  queryContainer: queryWorkGroupFieldContainer,
  getField: getWorkGroupField,
  queryField: queryWorkGroupField,
  openField: selectTestUtils.openSelect,
  setValue: selectTestUtils.clickSelectOption,
  expectLoadingFinished: workGroupExpectLoadingFinished,
}

// manager
const getManagerFilterBlock = () => screen.getByTestId(TestIdsEnum.ManagerBlock)
const getManagerFieldContainer = () => screen.getByTestId(TestIdsEnum.ManagerSelect)
const getManagerField = () => selectTestUtils.getSelect(getManagerFieldContainer())

const openManagerSelect = async (user: UserEvent): Promise<HTMLElement> => {
  const container = getManagerFieldContainer()
  await selectTestUtils.openSelect(user, container)
  return container
}

const getSelectedManager = () => selectTestUtils.getSelectedOption(getManagerFieldContainer())

const expectManagerLoadingFinished = () =>
  selectTestUtils.expectLoadingFinished(getManagerFieldContainer())

const manager = {
  getContainer: getManagerFilterBlock,
  getFieldContainer: getManagerFieldContainer,
  getField: getManagerField,
  getSelected: getSelectedManager,
  openField: openManagerSelect,
  setValue: selectTestUtils.clickSelectOption,
  expectLoadingFinished: expectManagerLoadingFinished,
}

// search by column
const getSearchByColumnFieldContainer = () => screen.getByTestId(TestIdsEnum.SearchByColumnBlock)

const getSearchByColumnKeywordField = (): HTMLInputElement =>
  within(getSearchByColumnFieldContainer()).getByPlaceholderText('Ключевое слово')

const getSearchByColumnColumnField = (label: string) =>
  radioButtonTestUtils.getRadioButtonIn(getSearchByColumnFieldContainer(), label)

const setSearchByColumnKeyword = async (user: UserEvent) => {
  const keywordField = getSearchByColumnKeywordField()
  const keyword = fakeWord()

  await user.type(keywordField, keyword)

  return { keywordField, keyword }
}

const setSearchByColumnField = async (user: UserEvent, label: string) => {
  const radioButton = radioButtonTestUtils.getRadioButtonIn(
    getSearchByColumnFieldContainer(),
    label,
  )
  await user.click(radioButton)
  return radioButton
}

const expectSearchByColumnHasCorrectInitialValues = () => {
  const searchByNameButton = getSearchByColumnColumnField(searchFieldDict.searchByName)
  const searchByTitleButton = getSearchByColumnColumnField(searchFieldDict.searchByTitle)
  const searchByAssigneeButton = getSearchByColumnColumnField(searchFieldDict.searchByAssignee)

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
  getContainer: getSearchByColumnFieldContainer,
  getColumnField: getSearchByColumnColumnField,
  getKeywordField: getSearchByColumnKeywordField,
  setKeywordValue: setSearchByColumnKeyword,
  setColumnValue: setSearchByColumnField,
  expectHasCorrectInitialValues: expectSearchByColumnHasCorrectInitialValues,
}

export const tasksFilterTestUtils = {
  getContainer,
  findContainer,

  getResetAllButton,
  clickResetButtonIn,
  clickResetAllButton,

  getCloseButton,
  closeFilter,

  getApplyButton,
  clickApplyButton,

  getSupportGroupBlock,

  getCustomersSelect,
  openCustomersSelect,
  setCustomer,
  getSelectedCustomer,
  expectCustomersLoadingStarted,
  expectCustomersLoadingFinished,

  getMacroregionsSelect,
  openMacroregionsSelect,
  setMacroregion,
  getSelectedMacroregion,
  expectMacroregionsLoadingStarted,
  expectMacroregionsLoadingFinished,

  getSupportGroupsSelect,
  openSupportGroupsSelect,
  setSupportGroup,
  getSelectedSupportGroup,
  expectSupportGroupsLoadingStarted,
  expectSupportGroupsLoadingFinished,

  searchByColumn,
  status,
  assigned,
  overdue,
  completeAt,
  creationDate,
  workGroup,
  manager,
}
