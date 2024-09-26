import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { buttonTestUtils } from '_tests_/utils/index'

import { TestIdsEnum } from '_tests_/features/tasks/components/ReworkSubTaskModal/constants'

const getContainer = () => screen.getByTestId(TestIdsEnum.ReworkSubTaskModal)

const findContainer = () => screen.findByTestId(TestIdsEnum.ReworkSubTaskModal)

const getChildByText = (text: string | RegExp) => within(getContainer()).getByText(text)

// return reason
const getReturnReasonFieldContainer = () =>
  within(getContainer()).getByTestId(TestIdsEnum.ReturnReason)

const getReturnReasonField = () =>
  within(getReturnReasonFieldContainer()).getByPlaceholderText(/опишите причину возврата/i)

const setReturnReason = async (user: UserEvent, value: string) => {
  const field = getReturnReasonField()
  await user.type(field, value)
  return field
}

const findReturnReasonFieldError = async (error: string) =>
  within(getReturnReasonFieldContainer()).findByText(error)

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

// other
const expectLoadingStarted = () => buttonTestUtils.expectLoadingStarted(getSubmitButton())
const expectLoadingFinished = () => buttonTestUtils.expectLoadingFinished(getSubmitButton())

export const reworkSubTaskModalTestUtils = {
  getContainer,
  findContainer,
  getChildByText,

  getReturnReasonFieldContainer,
  getReturnReasonField,
  setReturnReason,
  findReturnReasonFieldError,

  getSubmitButton,
  clickSubmitButton,

  getCancelButton,
  clickCancelButton,

  expectLoadingStarted,
  expectLoadingFinished,
}
