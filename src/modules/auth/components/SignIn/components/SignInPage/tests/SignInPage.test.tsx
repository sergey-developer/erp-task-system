import React from 'react'

import { RoutesEnum } from 'configs/routes'
import SignInPage from 'modules/auth/components/SignIn/components/SignInPage'
import { INCORRECT_EMAIL_MSG } from 'modules/auth/components/SignIn/components/SignInPage/validation'
import { REQUIRED_FIELD_MSG } from 'shared/constants/messages'
import setupApi from 'tests/setupApi'
import { render, renderInRoute, waitFor, within } from 'tests/test-utils'

import { CORRECT_EMAIL, CORRECT_PASSWORD, INCORRECT_EMAIL } from './constants'
import {
  getEmailField,
  getEmailInput,
  getPasswordField,
  getPasswordInput,
  getSubmitBtn,
  mockSuccessLogin,
} from './utils'

setupApi()

describe('Страница авторизации', () => {
  test('Пользователь может ввести email', async () => {
    const { user } = render(<SignInPage />)
    const emailInput = getEmailInput()
    await user.type(emailInput, CORRECT_EMAIL)
    expect(emailInput).toHaveValue(CORRECT_EMAIL)
  })

  test('Пользователь может ввести пароль', async () => {
    const { user } = render(<SignInPage />)
    const passwordInput = getPasswordInput()
    await user.type(passwordInput, CORRECT_PASSWORD)
    expect(passwordInput).toHaveValue(CORRECT_PASSWORD)
  })

  test('Если пользователь вводит некорректный email, то под полем показывается ошибка', async () => {
    const { user } = render(<SignInPage />)

    const emailField = getEmailField()
    const emailInput = getEmailInput()
    const submitBtn = getSubmitBtn()

    await user.type(emailInput, INCORRECT_EMAIL)
    await user.click(submitBtn)

    expect(
      await within(emailField).findByText(INCORRECT_EMAIL_MSG),
    ).toBeInTheDocument()
  })

  describe('Если обязательные поля не заполнены и нажать submit', () => {
    test('Пользователь остаётся на странице авторизации', async () => {
      const { user, checkRouteChanged } = renderInRoute(
        <SignInPage />,
        RoutesEnum.SignIn,
      )

      const validatingStatusClass = 'ant-form-item-is-validating'
      const emailField = getEmailField()
      const passwordField = getPasswordField()
      const submitBtn = getSubmitBtn()

      await user.click(submitBtn)

      await waitFor(() => {
        expect(emailField).toHaveClass(validatingStatusClass)
      })

      await waitFor(() => {
        expect(passwordField).toHaveClass(validatingStatusClass)
      })

      expect(checkRouteChanged()).toBe(false)
    })

    test('Появляются ошибки под обязательными полями', async () => {
      const { user } = render(<SignInPage />)

      const emailField = getEmailField()
      const passwordField = getPasswordField()
      const submitBtn = getSubmitBtn()

      await user.click(submitBtn)

      expect(
        await within(emailField).findByText(REQUIRED_FIELD_MSG),
      ).toBeInTheDocument()

      expect(
        await within(passwordField).findByText(REQUIRED_FIELD_MSG),
      ).toBeInTheDocument()
    })
  })

  describe('Если заполнить поля корректно и нажать кнопку "Войти"', () => {
    mockSuccessLogin()

    test('Пользователь покидает страницу', async () => {
      const { user, checkRouteChanged } = renderInRoute(
        <SignInPage />,
        RoutesEnum.SignIn,
      )

      const emailInput = getEmailInput()
      const passwordInput = getPasswordInput()
      const submitBtn = getSubmitBtn()

      await user.type(emailInput, CORRECT_EMAIL)
      await user.type(passwordInput, CORRECT_PASSWORD)
      await user.click(submitBtn)

      expect(checkRouteChanged()).toBe(true)
    })
  })
})
