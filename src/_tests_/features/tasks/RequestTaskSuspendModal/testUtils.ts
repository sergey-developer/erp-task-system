import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { suspendReasonDict, SuspendReasonEnum } from 'modules/task/constants/taskSuspendRequest'
import { buttonTestUtils, radioButtonTestUtils, selectTestUtils } from '../../../utils'
import { TestIdsEnum } from './constants'

const getContainer = () => screen.getByTestId(TestIdsEnum.RequestTaskSuspendModal)
const findContainer = () => screen.findByTestId(TestIdsEnum.RequestTaskSuspendModal)

// cancel button
const getCancelButton = () => buttonTestUtils.getButtonIn(getContainer(), /отменить/i)
const clickCancelButton = async (user: UserEvent) => {
  const button = getCancelButton()
  await user.click(button)
}

// submit button
const getSubmitButton = () => buttonTestUtils.getButtonIn(getContainer(), /перевести в ожидание/i)
const clickSubmitButton = async (user: UserEvent) => {
  const button = getSubmitButton()
  await user.click(button)
}

// reason field
const getReasonFormItem = () => within(getContainer()).getByTestId(TestIdsEnum.ReasonFormItem)
const getReasonField = (reason: SuspendReasonEnum): HTMLInputElement =>
  radioButtonTestUtils.getRadioButtonIn(getReasonFormItem(), suspendReasonDict[reason])

const findReasonError = (text: string) => within(getReasonFormItem()).findByText(text)

const setReason = async (user: UserEvent, reason: SuspendReasonEnum) => {
  const field = getReasonField(reason)
  await user.click(field)
  return field
}

// task link field
const getTaskLinkFormItem = () => within(getContainer()).getByTestId(TestIdsEnum.TaskLinkFormItem)
const queryTaskLinkFormItem = () => within(getContainer()).queryByTestId(TestIdsEnum.TaskLinkFormItem)
const getTaskLinkField = () =>
  within(getTaskLinkFormItem()).getByPlaceholderText('Ссылка на задачу во внешней системе')
const findTaskLinkError = (text: string) => within(getTaskLinkFormItem()).findByText(text)

const setTaskLink = async (user: UserEvent, value: string) => {
  const field = getTaskLinkField()
  await user.type(field, value)
  return field
}

// organization field
const getOrganizationFormItem = () => within(getContainer()).getByTestId(TestIdsEnum.OrganizationFormItem)
const queryOrganizationFormItem = () =>
  within(getContainer()).queryByTestId(TestIdsEnum.OrganizationFormItem)

const getOrganizationSelectInput = () =>
  selectTestUtils.getSelect(getOrganizationFormItem(), { name: 'Организация' })

const setOrganization = selectTestUtils.clickSelectOption

const getSelectedOrganization = (value: string): HTMLElement =>
  within(getOrganizationFormItem()).getByTitle(value)

const openOrganizationSelect = async (user: UserEvent) => {
  await selectTestUtils.openSelect(user, getOrganizationFormItem())
}

const findOrganizationError = (error: string): Promise<HTMLElement> =>
  within(getOrganizationFormItem()).findByText(error)

// return time field
const getReturnTimeFormItem = () => within(getContainer()).getByTestId(TestIdsEnum.ReturnTimeFormItem)
const getReturnTimeTitle = () => within(getReturnTimeFormItem()).getByTitle('Время возврата')
const getEndDateFormItem = () => within(getReturnTimeFormItem()).getByTestId(TestIdsEnum.EndDateFormItem)

const getEndDateField = (): HTMLInputElement =>
  within(getEndDateFormItem()).getByPlaceholderText('Выберите дату')

const findEndDateError = (text: string) => within(getEndDateFormItem()).findByText(text)

const setEndDate = async (user: UserEvent, value: string) => {
  const field = getEndDateField()
  await user.type(field, value)
  await user.tab()
  return field
}

const resetEndDate = async (user: UserEvent) => {
  const formItem = getEndDateFormItem()
  const clearButton = buttonTestUtils.getButtonIn(formItem, 'close-circle')
  await user.click(clearButton)
}

const getEndTimeFormItem = () => within(getReturnTimeFormItem()).getByTestId(TestIdsEnum.EndTimeFormItem)

const getEndTimeField = (): HTMLInputElement =>
  within(getEndTimeFormItem()).getByPlaceholderText('Выберите время')

const findEndTimeError = (text: string) => within(getEndTimeFormItem()).findByText(text)

const setEndTime = async (user: UserEvent, value: string) => {
  const field = getEndTimeField()
  await user.type(field, value)
  await user.tab()
  return field
}

// comment field
const getCommentFormItem = () => within(getContainer()).getByTestId(TestIdsEnum.CommentFormItem)
const getCommentField = () => within(getCommentFormItem()).getByPlaceholderText('Опишите ситуацию')
const findCommentError = (text: string) => within(getCommentFormItem()).findByText(text)

const setComment = async (user: UserEvent, value: string) => {
  const field = getCommentField()
  await user.type(field, value)
  return field
}

// loading
const expectSubmittingStarted = () => buttonTestUtils.expectLoadingStarted(getSubmitButton())
const expectSubmittingFinished = () => buttonTestUtils.expectLoadingFinished(getSubmitButton())

export const requestTaskSuspendModalTestUtils = {
  getContainer,
  findContainer,

  getCancelButton,
  clickCancelButton,

  getSubmitButton,
  clickSubmitButton,

  getReasonFormItem,
  getReasonField,
  findReasonError,
  setReason,

  getTaskLinkFormItem,
  queryTaskLinkFormItem,
  getTaskLinkField,
  findTaskLinkError,
  setTaskLink,

  getOrganizationFormItem,
  queryOrganizationFormItem,
  getOrganizationSelectInput,
  setOrganization,
  getSelectedOrganization,
  openOrganizationSelect,
  findOrganizationError,

  getReturnTimeFormItem,
  getReturnTimeTitle,
  getEndDateFormItem,
  getEndDateField,
  findEndDateError,
  setEndDate,
  resetEndDate,
  getEndTimeFormItem,
  getEndTimeField,
  findEndTimeError,
  setEndTime,

  getCommentFormItem,
  getCommentField,
  findCommentError,
  setComment,

  expectSubmittingStarted,
  expectSubmittingFinished,
}
