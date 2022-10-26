import {
  CORRECT_EMAIL,
  CORRECT_PASSWORD,
  INCORRECT_EMAIL,
  NOT_EXISTING_EMAIL,
  WRONG_PASSWORD,
} from '_tests_/constants/auth'
import {
  waitFinishValidating as baseWaitFinishValidating,
  waitStartValidating as baseWaitStartValidating,
  screen,
} from '_tests_/utils'
import { UserEvent } from '@testing-library/user-event/setup/setup'

export const getEmailField = () => screen.getByTestId('field-email')
export const getEmailInput = () => screen.getByTestId('input-email')

export const getPasswordField = () => screen.getByTestId('field-password')
export const getPasswordInput = () => screen.getByTestId('input-password')

export const getSubmitBtn = () => screen.getByTestId('btn-submit')

const userEntersEmail = async (
  user: UserEvent,
  email: string,
): Promise<HTMLElement> => {
  const emailInput = getEmailInput()
  await user.type(emailInput, email)
  return emailInput
}

export const userEntersCorrectEmail = async (
  user: UserEvent,
): Promise<HTMLElement> => {
  return userEntersEmail(user, CORRECT_EMAIL)
}

export const userEntersIncorrectEmail = async (
  user: UserEvent,
): Promise<HTMLElement> => {
  return userEntersEmail(user, INCORRECT_EMAIL)
}

export const userEntersNotExistingEmail = async (
  user: UserEvent,
): Promise<HTMLElement> => {
  return userEntersEmail(user, NOT_EXISTING_EMAIL)
}

const userEntersPassword = async (
  user: UserEvent,
  password: string,
): Promise<HTMLElement> => {
  const passwordInput = getPasswordInput()
  await user.type(passwordInput, password)
  return passwordInput
}

export const userEntersCorrectPassword = async (
  user: UserEvent,
): Promise<HTMLElement> => {
  return userEntersPassword(user, CORRECT_PASSWORD)
}

export const userEntersWrongPassword = async (
  user: UserEvent,
): Promise<HTMLElement> => {
  return userEntersPassword(user, WRONG_PASSWORD)
}

export const waitStartValidating = async (
  emailField: HTMLElement,
  passwordField: HTMLElement,
) => {
  await baseWaitStartValidating(emailField)
  await baseWaitStartValidating(passwordField)
}

export const waitFinishValidating = async (
  emailField: HTMLElement,
  passwordField: HTMLElement,
) => {
  await baseWaitFinishValidating(emailField)
  await baseWaitFinishValidating(passwordField)
}

export const userClickSubmitButton = async (
  user: UserEvent,
): Promise<HTMLElement> => {
  const submitBtn = getSubmitBtn()
  await user.click(submitBtn)
  return submitBtn
}
