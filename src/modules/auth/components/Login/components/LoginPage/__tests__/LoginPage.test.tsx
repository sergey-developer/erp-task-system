import React from 'react'

import setupApi from '__tests__/setupApi'
import { render, renderInRoute, screen, waitFor, within } from '__tests__/utils'
import { RoutesEnum } from 'configs/routes'
import LoginPage from 'modules/auth/components/Login/components/LoginPage'
import { INCORRECT_EMAIL_MSG } from 'modules/auth/components/Login/components/LoginPage/validation'
import {
  LOGIN_BAD_REQUEST_ERROR_MSG,
  LOGIN_WRONG_DATA_ERROR_MSG,
} from 'modules/auth/components/Login/constants/messages'
import authLocalStorageService from 'modules/auth/services/authLocalStorage.service'
import { HttpStatusCodeEnum } from 'shared/constants/http'
import { REQUIRED_FIELD_MSG } from 'shared/constants/messages'

import {
  CORRECT_EMAIL,
  CORRECT_PASSWORD,
  INCORRECT_EMAIL,
  successLoginResponse,
} from './constants'
import {
  mockLoginBadRequestError,
  mockLoginSuccess,
  mockLoginUnauthorizedError,
} from './mocks'
import {
  getEmailField,
  getEmailInput,
  getPasswordField,
  getPasswordInput,
  getSubmitBtn,
  userClickSubmitButton,
  userFillFieldsCorrectly,
  userFillFieldsIncorrectly,
  waitFinishLoading,
  waitStartLoading,
} from './utils'

setupApi()

describe('Страница авторизации', () => {
  test('Пользователь может ввести email', async () => {
    const { user } = render(<LoginPage />)
    const emailInput = getEmailInput()
    await user.type(emailInput, CORRECT_EMAIL)
    expect(emailInput).toHaveValue(CORRECT_EMAIL)
  })

  test('Пользователь может ввести пароль', async () => {
    const { user } = render(<LoginPage />)
    const passwordInput = getPasswordInput()
    await user.type(passwordInput, CORRECT_PASSWORD)
    expect(passwordInput).toHaveValue(CORRECT_PASSWORD)
  })

  test('Если пользователь вводит некорректный email, то под полем показывается ошибка', async () => {
    const { user } = render(<LoginPage />)

    const emailField = getEmailField()
    const emailInput = getEmailInput()
    const submitBtn = getSubmitBtn()

    await user.type(emailInput, INCORRECT_EMAIL)
    await user.click(submitBtn)

    expect(
      await within(emailField).findByText(INCORRECT_EMAIL_MSG),
    ).toBeInTheDocument()
  })

  describe('Если обязательные поля не заполнены и нажать кнопку "Войти"', () => {
    test('Пользователь остаётся на странице авторизации', async () => {
      const { user, checkRouteChanged } = renderInRoute(
        <LoginPage />,
        RoutesEnum.Login,
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
      const { user } = render(<LoginPage />)

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

  describe('Если заполнить поля и нажать кнопку "Войти"', () => {
    describe('При успешном запросе', () => {
      afterEach(() => {
        localStorage.clear()
      })

      test('Пользователь покидает страницу авторизации', async () => {
        mockLoginSuccess()

        const { user, checkRouteChanged } = renderInRoute(
          <LoginPage />,
          RoutesEnum.Login,
        )

        await userFillFieldsCorrectly(user)
        const submitBtn = await userClickSubmitButton(user)
        await waitStartLoading(submitBtn)
        await waitFinishLoading(submitBtn)

        expect(checkRouteChanged()).toBe(true)
      })

      test('В localStorage сохраняется access token', async () => {
        mockLoginSuccess()

        const { user } = render(<LoginPage />)

        await userFillFieldsCorrectly(user)
        const submitBtn = await userClickSubmitButton(user)
        await waitStartLoading(submitBtn)
        await waitFinishLoading(submitBtn)

        expect(authLocalStorageService.getAccessToken()).toBe(
          successLoginResponse.access,
        )
      })

      test('В localStorage сохраняется refresh token', async () => {
        mockLoginSuccess()

        const { user } = render(<LoginPage />)

        await userFillFieldsCorrectly(user)
        const submitBtn = await userClickSubmitButton(user)
        await waitStartLoading(submitBtn)
        await waitFinishLoading(submitBtn)

        expect(authLocalStorageService.getRefreshToken()).toBe(
          successLoginResponse.refresh,
        )
      })
    })

    describe('При не успешном запросе', () => {
      test('Пользователь остаётся на странице авторизации', async () => {
        mockLoginBadRequestError()

        const { user, checkRouteChanged } = renderInRoute(
          <LoginPage />,
          RoutesEnum.Login,
        )

        await userFillFieldsIncorrectly(user)
        await userClickSubmitButton(user)

        expect(checkRouteChanged()).toBe(false)
      })

      describe(`Если код ошибки "${HttpStatusCodeEnum.BadRequest}"`, () => {
        test(`Показывается ошибка - ${LOGIN_BAD_REQUEST_ERROR_MSG}`, async () => {
          mockLoginBadRequestError()

          const { user, debug } = render(<LoginPage />)

          await userFillFieldsIncorrectly(user)
          const submitBtn = await userClickSubmitButton(user)

          expect(
            await screen.findByText(LOGIN_BAD_REQUEST_ERROR_MSG),
          ).toBeInTheDocument()

          // await waitFor(() => {
          //   expect(submitBtn).not.toHaveClass('ant-btn-loading')
          // })

          debug()
        })
      })

      describe(`Если код ошибки "${HttpStatusCodeEnum.Unauthorized}"`, () => {
        test(`Показывается ошибка - ${LOGIN_WRONG_DATA_ERROR_MSG}`, async () => {
          mockLoginUnauthorizedError()

          const { user, debug } = render(<LoginPage />)

          await userFillFieldsIncorrectly(user)
          const submitBtn = await userClickSubmitButton(user)

          expect(
            await screen.findByText(LOGIN_WRONG_DATA_ERROR_MSG),
          ).toBeInTheDocument()

          // await waitFor(() => {
          //   expect(submitBtn).not.toHaveClass('ant-btn-loading')
          // })

          debug()
        })
      })
    })
  })
})
