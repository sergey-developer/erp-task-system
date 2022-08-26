import { screen, waitFor } from '__tests__/utils'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { LoginFormFields } from '../interfaces'
import {
  CORRECT_EMAIL,
  CORRECT_PASSWORD,
  NOT_EXISTING_EMAIL,
  WRONG_PASSWORD,
  btnLoadingClass,
} from './constants'

export const getEmailField = () => screen.getByTestId('field-email')
export const getEmailInput = () => screen.getByTestId('input-email')

export const getPasswordField = () => screen.getByTestId('field-password')
export const getPasswordInput = () => screen.getByTestId('input-password')

export const getSubmitBtn = () => screen.getByTestId('btn-submit')

export const waitStartLoading = async (submitBtn: HTMLElement) => {
  await waitFor(() => {
    expect(submitBtn).toHaveClass(btnLoadingClass)
  })
}

export const waitFinishLoading = async (submitBtn: HTMLElement) => {
  await waitFor(() => {
    expect(submitBtn).not.toHaveClass(btnLoadingClass)
  })
}

export const userFillFields = async (
  user: UserEvent,
  { email, password }: LoginFormFields,
) => {
  const emailInput = getEmailInput()
  const passwordInput = getPasswordInput()

  await user.type(emailInput, email)
  await user.type(passwordInput, password)
}

export const userFillFieldsCorrectly = async (user: UserEvent) => {
  await userFillFields(user, {
    email: CORRECT_EMAIL,
    password: CORRECT_PASSWORD,
  })
}

export const userFillFieldsIncorrectly = async (user: UserEvent) => {
  await userFillFields(user, {
    email: NOT_EXISTING_EMAIL,
    password: WRONG_PASSWORD,
  })
}

export const userClickSubmitButton = async (
  user: UserEvent,
): Promise<HTMLElement> => {
  const submitBtn = getSubmitBtn()
  await user.click(submitBtn)
  return submitBtn
}
