import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { TestIdsEnum } from '_tests_/features/warehouse/components/ReturnRelocationTaskToReworkModal/constants'
import { buttonTestUtils } from '_tests_/utils/index'

const getContainer = () => screen.getByTestId(TestIdsEnum.ReturnRelocationTaskReworkModal)
const findContainer = () => screen.findByTestId(TestIdsEnum.ReturnRelocationTaskReworkModal)

// reason field
const getReasonFormItem = () => within(getContainer()).getByTestId(TestIdsEnum.ReasonFormItem)

const getReasonField = () =>
  within(getReasonFormItem()).getByRole('textbox', { name: 'Причина возврата' })

const findReasonError = (error: string) => within(getReasonFormItem()).findByText(error)

const setReason = async (user: UserEvent, value: string) => {
  const field = getReasonField()
  await user.type(field, value)
  return field
}

// submit button
const getSubmitButton = () => buttonTestUtils.getButtonIn(getContainer(), /Вернуть на доработку/)
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

export const returnRelocationTaskToReworkModalTestUtils = {
  getContainer,
  findContainer,

  getReasonFormItem,
  getReasonField,
  findReasonError,
  setReason,

  getSubmitButton,
  clickSubmitButton,

  getCancelButton,
  clickCancelButton,

  expectLoadingFinished: () => buttonTestUtils.expectLoadingFinished(getSubmitButton()),
}
