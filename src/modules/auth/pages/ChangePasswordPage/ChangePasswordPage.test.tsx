import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { INCORRECT_PASSWORD_ERROR_MSG } from 'modules/auth/constants'

import { validationMessages } from 'shared/constants/validation'

import { CORRECT_PASSWORD } from '_tests_/constants/auth'
import { fakeWord, getButtonIn, render } from '_tests_/utils'

import ChangePasswordPage from './index'

const getContainer = () => screen.getByTestId('change-password-card')

const getChildByText = (text: string) => within(getContainer()).getByText(text)

// new password
const getNewPasswordFormItem = () =>
  within(getContainer()).getByTestId('new-password')

const getNewPasswordInput = (): HTMLInputElement =>
  within(getNewPasswordFormItem()).getByPlaceholderText('••••••••')

const findNewPasswordError = (error: string) =>
  within(getNewPasswordFormItem()).findByText(error)

const queryNewPasswordError = (error: string) =>
  within(getNewPasswordFormItem()).queryByText(error)

const setNewPassword = async (user: UserEvent, value: string) => {
  const field = getNewPasswordInput()
  await user.type(field, value)
  return field
}

// confirm password
const getConfirmPasswordFormItem = () =>
  within(getContainer()).getByTestId('confirm-password')

const getConfirmPasswordInput = (): HTMLInputElement =>
  within(getConfirmPasswordFormItem()).getByPlaceholderText('••••••••')

const findConfirmPasswordError = (error: string) =>
  within(getConfirmPasswordFormItem()).findByText(error)

const setConfirmPassword = async (user: UserEvent, value: string) => {
  const field = getConfirmPasswordInput()
  await user.type(field, value)
  return field
}

// submit button
const getSaveButton = () => getButtonIn(getContainer(), 'Сохранить')

const clickSaveButton = async (user: UserEvent) => {
  const submitBtn = getSaveButton()
  await user.click(submitBtn)
}

const testUtils = {
  getContainer,
  getChildByText,

  getNewPasswordFormItem,
  getNewPasswordInput,
  findNewPasswordError,
  queryNewPasswordError,
  setNewPassword,

  getConfirmPasswordFormItem,
  getConfirmPasswordInput,
  findConfirmPasswordError,
  setConfirmPassword,

  getSaveButton,
  clickSaveButton,
}

describe('Страница смены пароля', () => {
  test('Заголовок отображается', () => {
    render(<ChangePasswordPage />)
    const title = testUtils.getChildByText('Создание нового пароля')
    expect(title).toBeInTheDocument()
  })

  describe('Поле нового пароля', () => {
    test('Отображается корректно', () => {
      render(<ChangePasswordPage />)

      const input = testUtils.getNewPasswordInput()

      expect(input).toBeInTheDocument()
      expect(input).toBeEnabled()
      expect(input).toHaveAttribute('type', 'password')
      expect(input).not.toHaveValue()
    })

    test('Можно установить значение', async () => {
      const { user } = render(<ChangePasswordPage />)

      const value = fakeWord()
      const input = await testUtils.setNewPassword(user, value)

      expect(input).toHaveValue(value)
    })

    test('Ошибка не показывается если установить корректное значение', async () => {
      const { user } = render(<ChangePasswordPage />)

      await testUtils.setNewPassword(user, CORRECT_PASSWORD)
      const error = testUtils.queryNewPasswordError(
        INCORRECT_PASSWORD_ERROR_MSG,
      )

      expect(error).not.toBeInTheDocument()
    })

    describe('Показывается ошибка под полем', () => {
      test('Если не заполнить поле и нажать кнопку отправки', async () => {
        const { user } = render(<ChangePasswordPage />)

        await testUtils.clickSaveButton(user)

        const error = await testUtils.findNewPasswordError(
          validationMessages.required,
        )

        expect(error).toBeInTheDocument()
      })

      test('Если пароль не соответствует требованиям', async () => {
        const { user } = render(<ChangePasswordPage />)

        await testUtils.setNewPassword(user, fakeWord())
        const error = await testUtils.findNewPasswordError(
          INCORRECT_PASSWORD_ERROR_MSG,
        )

        expect(error).toBeInTheDocument()
      })
    })
  })

  describe('Поле подтверждения пароля', () => {
    test('Отображается корректно', () => {
      render(<ChangePasswordPage />)

      const input = testUtils.getConfirmPasswordInput()

      expect(input).toBeInTheDocument()
      expect(input).toBeEnabled()
      expect(input).toHaveAttribute('type', 'password')
      expect(input).not.toHaveValue()
    })

    test('Можно установить значение', async () => {
      const { user } = render(<ChangePasswordPage />)

      const value = fakeWord()
      const input = await testUtils.setConfirmPassword(user, value)

      expect(input).toHaveValue(value)
    })

    describe('Показывается ошибка под полем', () => {
      test('Если не заполнить поле и нажать кнопку отправки', async () => {
        const { user } = render(<ChangePasswordPage />)

        await testUtils.clickSaveButton(user)

        const error = await testUtils.findConfirmPasswordError(
          validationMessages.required,
        )

        expect(error).toBeInTheDocument()
      })

      test('Если значение не совпадает с новым паролем', async () => {
        const { user } = render(<ChangePasswordPage />)

        await testUtils.setNewPassword(user, fakeWord())
        await testUtils.setConfirmPassword(user, fakeWord())

        const error = await testUtils.findConfirmPasswordError(
          'Пароли не совпадают',
        )

        expect(error).toBeInTheDocument()
      })
    })
  })
})
