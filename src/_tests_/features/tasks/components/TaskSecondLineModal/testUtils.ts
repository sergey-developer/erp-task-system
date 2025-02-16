import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { TestIdsEnum } from '_tests_/features/tasks/components/TaskSecondLineModal/constants'
import { buttonTestUtils, checkboxTestUtils, selectTestUtils } from '_tests_/helpers'

const getContainer = () => screen.getByTestId(TestIdsEnum.TaskSecondLineModal)
const findContainer = () => screen.findByTestId(TestIdsEnum.TaskSecondLineModal)
const getChildByText = (text: string | RegExp) => within(getContainer()).getByText(text)

// work group field
const getWorkGroupFormItem = () => within(getContainer()).getByTestId(TestIdsEnum.WorkGroupFormItem)
const getWorkGroupField = () => selectTestUtils.getSelect(getWorkGroupFormItem())
const queryWorkGroupField = () => selectTestUtils.querySelect(getWorkGroupFormItem())
const findWorkGroupError = (error: string) => within(getWorkGroupFormItem()).findByText(error)
const getSelectedWorkGroup = () => selectTestUtils.getSelectedOption(getWorkGroupFormItem())
const getSelectedWorkGroupText = selectTestUtils.getSelectedOptionText
const getWorkGroupOption = selectTestUtils.getSelectOptionById
const getWorkGroupOptionText = (option: HTMLElement, text: string) => within(option).getByText(text)

const expectWorkGroupLoadingStarted = () =>
  selectTestUtils.expectLoadingStarted(getWorkGroupFormItem())

const expectWorkGroupLoadingFinished = () =>
  selectTestUtils.expectLoadingFinished(getWorkGroupFormItem())

const openWorkGroupField = async (user: UserEvent) => {
  await selectTestUtils.openSelect(user, getWorkGroupFormItem())
}

const selectWorkGroup = selectTestUtils.clickSelectOption

// mark default group field
const getMarkDefaultGroupFormItem = () =>
  within(getContainer()).getByTestId(TestIdsEnum.MarkDefaultGroupFormItem)

const getMarkDefaultGroupField = () =>
  checkboxTestUtils.getCheckboxIn(getMarkDefaultGroupFormItem())

const setMarkDefaultGroup = async (user: UserEvent) => {
  const field = getMarkDefaultGroupField()
  await user.click(field)
  return field
}

// work type field
const getWorkTypeFormItem = () => within(getContainer()).getByTestId(TestIdsEnum.WorkTypeFormItem)
const getWorkTypeSelectInput = () => selectTestUtils.getSelect(getWorkTypeFormItem())

const openWorkTypeSelect = (user: UserEvent) =>
  selectTestUtils.openSelect(user, getWorkTypeFormItem())

const setWorkType = selectTestUtils.clickSelectOption

const getSelectedWorkType = (title: string) =>
  selectTestUtils.getSelectedOptionByTitle(getWorkTypeFormItem(), title)

const querySelectedWorkType = (title: string) =>
  selectTestUtils.querySelectedOptionByTitle(getWorkTypeFormItem(), title)

const expectWorkTypeLoadingStarted = () =>
  selectTestUtils.expectLoadingStarted(getWorkTypeFormItem())

const expectWorkTypeLoadingFinished = () =>
  selectTestUtils.expectLoadingFinished(getWorkTypeFormItem())

// comment field
const getCommentFormItem = () => within(getContainer()).getByTestId(TestIdsEnum.CommentFormItem)
const getCommentFieldLabel = () => within(getCommentFormItem()).getByText('Комментарий')
const findCommentError = (error: string) => within(getCommentFormItem()).findByText(error)

const getCommentField = () =>
  within(getCommentFormItem()).getByPlaceholderText('Добавьте комментарий')

const setComment = async (user: UserEvent, comment: string) => {
  const input = getCommentField()
  await user.type(input, comment)
  return input
}

// submit button
const getSubmitButton = () => buttonTestUtils.getButtonIn(getContainer(), /перевести заявку/i)

const clickSubmitButton = async (user: UserEvent) => {
  const button = getSubmitButton()
  await user.click(button)
  return button
}

// cancel button
const getCancelButton = () => buttonTestUtils.getButtonIn(getContainer(), /отменить/i)

const clickCancelButton = async (user: UserEvent) => {
  const button = getCancelButton()
  await user.click(button)
  return button
}

// close button
const getCloseButton = () => buttonTestUtils.getButtonIn(getContainer(), /close/i)

const clickCloseButton = async (user: UserEvent) => {
  const button = getCloseButton()
  await user.click(button)
  return button
}

// loading
const expectLoadingStarted = () => buttonTestUtils.expectLoadingStarted(getSubmitButton())

export const taskSecondLineModalTestUtils = {
  getContainer,
  findContainer,
  getChildByText,

  getWorkGroupField,
  queryWorkGroupField,
  findWorkGroupError,
  getSelectedWorkGroup,
  getSelectedWorkGroupText,
  getWorkGroupOption,
  getWorkGroupOptionText,
  openWorkGroupField,
  selectWorkGroup,
  expectWorkGroupLoadingStarted,
  expectWorkGroupLoadingFinished,

  getMarkDefaultGroupFormItem,
  getMarkDefaultGroupField,
  setMarkDefaultGroup,

  getWorkTypeSelectInput,
  openWorkTypeSelect,
  setWorkType,
  getSelectedWorkType,
  querySelectedWorkType,
  expectWorkTypeLoadingStarted,
  expectWorkTypeLoadingFinished,

  getCommentFormItem,
  findCommentError,
  getCommentFieldLabel,
  getCommentField,
  setComment,

  getSubmitButton,
  clickSubmitButton,

  getCancelButton,
  clickCancelButton,

  getCloseButton,
  clickCloseButton,

  expectLoadingStarted,
}
