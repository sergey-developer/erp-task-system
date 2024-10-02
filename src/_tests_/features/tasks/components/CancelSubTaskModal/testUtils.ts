import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { buttonTestUtils } from '_tests_/utils/index'

import { TestIdsEnum } from '_tests_/features/tasks/components/CancelSubTaskModal/constants'

const getContainer = () => screen.getByTestId(TestIdsEnum.CancelSubTaskModal)

const findContainer = () => screen.findByTestId(TestIdsEnum.CancelSubTaskModal)

const getChildByText = (text: string | RegExp) => within(getContainer()).getByText(text)

// cancel reason
const getCancelReasonFieldContainer = () =>
  within(getContainer()).getByTestId(TestIdsEnum.CancelReason)

const getCancelReasonField = () =>
  within(getCancelReasonFieldContainer()).getByPlaceholderText(/опишите причину отмены/i)

const setCancelReason = async (user: UserEvent, value: string) => {
  const field = getCancelReasonField()
  await user.type(field, value)
  return field
}

const findCancelReasonFieldError = async (error: string) =>
  within(getCancelReasonFieldContainer()).findByText(error)

// submit button
const getSubmitButton = () => buttonTestUtils.getButtonIn(getContainer(), /сохранить/i)

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

// loading
const expectLoadingStarted = () => buttonTestUtils.expectLoadingStarted(getSubmitButton())

const expectLoadingFinished = () => buttonTestUtils.expectLoadingFinished(getSubmitButton())

export const cancelSubTaskModalTestUtils = {
  getContainer,
  findContainer,
  getChildByText,

  getCancelReasonFieldContainer,
  getCancelReasonField,
  setCancelReason,
  findCancelReasonFieldError,

  getSubmitButton,
  clickSubmitButton,

  getCancelButton,
  clickCancelButton,

  expectLoadingStarted,
  expectLoadingFinished,
}
