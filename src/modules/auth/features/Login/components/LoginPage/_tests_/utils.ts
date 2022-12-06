import {
  CORRECT_EMAIL,
  CORRECT_PASSWORD,
  INCORRECT_EMAIL,
  NOT_EXISTING_EMAIL,
  WRONG_PASSWORD,
} from '_tests_/constants/auth'
import {
  validatingFinished as baseValidatingFinished,
  validatingStarted as baseValidatingStarted,
} from '_tests_/utils'
import { screen } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

const getEmailField = () => screen.getByTestId('field-email')
const getEmailInput = () => screen.getByTestId('input-email')

const getPasswordField = () => screen.getByTestId('field-password')
const getPasswordInput = () => screen.getByTestId('input-password')

const getSubmitBtn = () => screen.getByTestId('btn-submit')

const userEntersEmail = async (
  user: UserEvent,
  email: string,
): Promise<HTMLElement> => {
  const emailInput = getEmailInput()
  await user.type(emailInput, email)
  return emailInput
}

const userEntersCorrectEmail = async (
  user: UserEvent,
): Promise<HTMLElement> => {
  return userEntersEmail(user, CORRECT_EMAIL)
}

const userEntersIncorrectEmail = async (
  user: UserEvent,
): Promise<HTMLElement> => {
  return userEntersEmail(user, INCORRECT_EMAIL)
}

const userEntersNotExistingEmail = async (
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

const userEntersCorrectPassword = async (
  user: UserEvent,
): Promise<HTMLElement> => {
  return userEntersPassword(user, CORRECT_PASSWORD)
}

const userEntersWrongPassword = async (
  user: UserEvent,
): Promise<HTMLElement> => {
  return userEntersPassword(user, WRONG_PASSWORD)
}

const validatingStarted = async (
  emailField: HTMLElement,
  passwordField: HTMLElement,
) => {
  await baseValidatingStarted(emailField)
  await baseValidatingStarted(passwordField)
}

const validatingFinished = async (
  emailField: HTMLElement,
  passwordField: HTMLElement,
) => {
  await baseValidatingFinished(emailField)
  await baseValidatingFinished(passwordField)
}

const userClickSubmitButton = async (user: UserEvent): Promise<HTMLElement> => {
  const submitBtn = getSubmitBtn()
  await user.click(submitBtn)
  return submitBtn
}

const utils = {
  getEmailField,
  getEmailInput,
  getPasswordField,
  getPasswordInput,
  getSubmitBtn,
  userEntersEmail,
  userEntersCorrectEmail,
  userEntersIncorrectEmail,
  userEntersNotExistingEmail,
  userEntersPassword,
  userEntersCorrectPassword,
  userEntersWrongPassword,
  validatingStarted,
  validatingFinished,
  userClickSubmitButton,
}

export default utils
