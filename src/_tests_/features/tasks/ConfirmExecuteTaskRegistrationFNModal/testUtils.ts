import { screen } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { CANCEL_TEXT, CONFIRM_TEXT } from 'shared/constants/common'

import { buttonTestUtils } from '_tests_/utils'

import { TestIdsEnum } from './constants'

const getContainer = () => screen.getByTestId(TestIdsEnum.ConfirmExecuteTaskRegistrationFNModal)
const findContainer = () => screen.findByTestId(TestIdsEnum.ConfirmExecuteTaskRegistrationFNModal)

// cancel button
const getCancelButton = () => buttonTestUtils.getButtonIn(getContainer(), CANCEL_TEXT)
const clickCancelButton = async (user: UserEvent) => {
  const button = getCancelButton()
  await user.click(button)
  return button
}

// submit button
const getConfirmButton = () => buttonTestUtils.getButtonIn(getContainer(), CONFIRM_TEXT)
const clickConfirmButton = async (user: UserEvent) => {
  const button = getConfirmButton()
  await user.click(button)
  return button
}

export const confirmExecuteTaskRegistrationFNModalTestUtils = {
  getContainer,
  findContainer,

  getCancelButton,
  clickCancelButton,

  getConfirmButton,
  clickConfirmButton,
}
