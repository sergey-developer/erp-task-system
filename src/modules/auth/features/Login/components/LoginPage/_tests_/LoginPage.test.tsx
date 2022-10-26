import React from 'react'

import { CORRECT_EMAIL, CORRECT_PASSWORD } from '_tests_/constants/auth'
import {
  mockLoginBadRequestError,
  mockLoginServerError,
  mockLoginSuccess,
  mockLoginUnauthorizedError,
} from '_tests_/mocks/api'
import {
  loadingFinishedByButton,
  loadingStartedByButton,
  render,
  renderInRoute,
  setupApiTests,
} from '_tests_/utils'
import { screen, within } from '@testing-library/react'
import { RoutesEnum } from 'configs/routes'
import { loginResponseSuccess } from 'fixtures/auth'
import LoginPage from 'modules/auth/features/Login/components/LoginPage'
import {
  LOGIN_BAD_REQUEST_ERROR_MSG,
  LOGIN_WRONG_DATA_ERROR_MSG,
} from 'modules/auth/features/Login/constants/messages'
import authLocalStorageService from 'modules/auth/services/authLocalStorage.service'
import { HttpCodeEnum } from 'shared/constants/http'
import {
  INCORRECT_EMAIL_MSG,
  REQUIRED_FIELD_MSG,
} from 'shared/constants/validation'
import { setupStore } from 'state/store'

import {
  getEmailField,
  getPasswordField,
  userClickSubmitButton,
  userEntersCorrectEmail,
  userEntersCorrectPassword,
  userEntersIncorrectEmail,
  userEntersNotExistingEmail,
  userEntersWrongPassword,
  waitFinishValidating,
  waitStartValidating,
} from './utils'

setupApiTests()

describe('Страница авторизации', () => {
  test('Пользователь может ввести email', async () => {
    const { user } = render(<LoginPage />)
    const emailInput = await userEntersCorrectEmail(user)
    expect(emailInput).toHaveValue(CORRECT_EMAIL)
  })

  test('Пользователь может ввести пароль', async () => {
    const { user } = render(<LoginPage />)
    const passwordInput = await userEntersCorrectPassword(user)
    expect(passwordInput).toHaveValue(CORRECT_PASSWORD)
  })

  test('Если пользователь вводит некорректный email, то под полем показывается ошибка', async () => {
    const { user } = render(<LoginPage />)

    const emailField = getEmailField()
    await userEntersIncorrectEmail(user)
    await userClickSubmitButton(user)

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

      const emailField = getEmailField()
      const passwordField = getPasswordField()

      await userClickSubmitButton(user)
      await waitStartValidating(emailField, passwordField)
      await waitFinishValidating(emailField, passwordField)

      expect(checkRouteChanged()).toBe(false)
    })

    test('Появляются ошибки под обязательными полями', async () => {
      const { user } = render(<LoginPage />)

      const emailField = getEmailField()
      const passwordField = getPasswordField()

      await userClickSubmitButton(user)

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
      test('Пользователь покидает страницу авторизации', async () => {
        mockLoginSuccess(loginResponseSuccess)

        const { user, checkRouteChanged } = renderInRoute(
          <LoginPage />,
          RoutesEnum.Login,
        )

        await userEntersCorrectEmail(user)
        await userEntersCorrectPassword(user)
        const submitBtn = await userClickSubmitButton(user)
        await loadingStartedByButton(submitBtn)
        await loadingFinishedByButton(submitBtn)

        expect(checkRouteChanged()).toBe(true)
      })

      describe('В localStorage сохраняется', () => {
        afterEach(() => {
          localStorage.clear()
        })

        test('access token', async () => {
          mockLoginSuccess(loginResponseSuccess)

          const { user } = render(<LoginPage />)

          await userEntersCorrectEmail(user)
          await userEntersCorrectPassword(user)
          const submitBtn = await userClickSubmitButton(user)
          await loadingStartedByButton(submitBtn)
          await loadingFinishedByButton(submitBtn)

          expect(authLocalStorageService.getAccessToken()).toBe(
            loginResponseSuccess.access,
          )
        })

        test('refresh token', async () => {
          mockLoginSuccess(loginResponseSuccess)

          const { user } = render(<LoginPage />)

          await userEntersCorrectEmail(user)
          await userEntersCorrectPassword(user)
          const submitBtn = await userClickSubmitButton(user)
          await loadingStartedByButton(submitBtn)
          await loadingFinishedByButton(submitBtn)

          expect(authLocalStorageService.getRefreshToken()).toBe(
            loginResponseSuccess.refresh,
          )
        })
      })

      test('данные сохраняются в store', async () => {
        mockLoginSuccess(loginResponseSuccess)
        const store = setupStore()

        const { user } = render(<LoginPage />, { store })

        await userEntersCorrectEmail(user)
        await userEntersCorrectPassword(user)
        const submitBtn = await userClickSubmitButton(user)
        await loadingStartedByButton(submitBtn)
        await loadingFinishedByButton(submitBtn)

        const authState = store.getState().auth

        expect(authState.user).not.toBe(null)
        expect(authState.accessToken).toBe(loginResponseSuccess.access)
        expect(authState.refreshToken).toBe(loginResponseSuccess.refresh)
        expect(authState.isAuthenticated).toBe(true)
      })
    })

    describe('При не успешном запросе', () => {
      test('Пользователь остаётся на странице авторизации', async () => {
        mockLoginBadRequestError()

        const { user, checkRouteChanged } = renderInRoute(
          <LoginPage />,
          RoutesEnum.Login,
        )

        await userEntersNotExistingEmail(user)
        await userEntersWrongPassword(user)
        const submitBtn = await userClickSubmitButton(user)
        await loadingStartedByButton(submitBtn)
        await loadingFinishedByButton(submitBtn)

        expect(checkRouteChanged()).toBe(false)
      })

      describe(`Если код ошибки "${HttpCodeEnum.BadRequest}"`, () => {
        test(`В форме показывается ошибка - ${LOGIN_BAD_REQUEST_ERROR_MSG}`, async () => {
          mockLoginBadRequestError()

          const { user } = render(<LoginPage />)

          await userEntersNotExistingEmail(user)
          await userEntersWrongPassword(user)
          const submitBtn = await userClickSubmitButton(user)
          await loadingStartedByButton(submitBtn)
          await loadingFinishedByButton(submitBtn)

          expect(
            await screen.findByText(LOGIN_BAD_REQUEST_ERROR_MSG),
          ).toBeInTheDocument()
        })
      })

      describe(`Если код ошибки "${HttpCodeEnum.Unauthorized}"`, () => {
        test(`В форме показывается ошибка - ${LOGIN_WRONG_DATA_ERROR_MSG}`, async () => {
          mockLoginUnauthorizedError()

          const { user } = render(<LoginPage />)

          await userEntersNotExistingEmail(user)
          await userEntersWrongPassword(user)
          const submitBtn = await userClickSubmitButton(user)
          await loadingStartedByButton(submitBtn)
          await loadingFinishedByButton(submitBtn)

          expect(
            await screen.findByText(LOGIN_WRONG_DATA_ERROR_MSG),
          ).toBeInTheDocument()
        })
      })

      describe('Если любой другой код ошибки', () => {
        test('В форме показывается ошибка', async () => {
          mockLoginServerError()

          const { user } = render(<LoginPage />)

          await userEntersNotExistingEmail(user)
          await userEntersWrongPassword(user)
          const submitBtn = await userClickSubmitButton(user)
          await loadingStartedByButton(submitBtn)
          await loadingFinishedByButton(submitBtn)

          expect(await screen.findByTestId('login-error')).toBeInTheDocument()
        })
      })
    })
  })
})
