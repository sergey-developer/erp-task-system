import { screen, waitFor, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import React from 'react'

import { RouteEnum } from 'configs/routes'

import {
  LOGIN_BAD_REQUEST_ERROR_MSG,
  LOGIN_WRONG_DATA_ERROR_MSG,
} from 'modules/auth/constants/errors'
import LoginPage from 'modules/auth/pages/LoginPage'
import authLocalStorageService from 'modules/auth/services/authLocalStorage.service'

import { setupStore } from 'state/store'

import { commonApiMessages } from 'shared/constants/errors'
import { HttpCodeEnum } from 'shared/constants/http'
import { validationMessages } from 'shared/constants/validation'

import authFixtures from 'fixtures/auth'

import {
  mockLoginBadRequestError,
  mockLoginServerError,
  mockLoginSuccess,
  mockLoginUnauthorizedError,
  mockRefreshTokenSuccess,
} from '_tests_/mocks/api'
import {
  generateEmail,
  generateWord,
  loadingFinishedByButton,
  loadingStartedByButton,
  render,
  renderInRoute,
  setupApiTests,
} from '_tests_/utils'

const getContainer = () => screen.getByTestId('login-card')

const getChildByText = (text: string) => within(getContainer()).getByText(text)

// email field
const getEmailField = () => within(getContainer()).getByTestId('field-email')

const getEmailInput = (): HTMLInputElement =>
  within(getEmailField()).getByTestId('input-email')

const findEmailError = (error: string) =>
  within(getEmailField()).findByText(error)

const setEmail = async (user: UserEvent, value: string) => {
  const input = getEmailInput()
  await user.type(input, value)
  return input
}

// password field
const getPasswordField = () =>
  within(getContainer()).getByTestId('field-password')

const getPasswordInput = (): HTMLInputElement =>
  within(getPasswordField()).getByTestId('input-password')

const findPasswordError = (error: string) =>
  within(getPasswordField()).findByText(error)

const setPassword = async (user: UserEvent, value: string) => {
  const input = getPasswordInput()
  await user.type(input, value)
  return input
}

// submit button
const getSubmitBtn = () => screen.getByTestId('btn-submit')

const clickSubmitButton = async (user: UserEvent): Promise<HTMLElement> => {
  const submitBtn = getSubmitBtn()
  await user.click(submitBtn)
  return submitBtn
}

// loading
const expectLoadingStarted = () => loadingStartedByButton(getSubmitBtn())

const expectLoadingFinished = () => loadingFinishedByButton(getSubmitBtn())

const testUtils = {
  getContainer,
  getChildByText,

  getEmailField,
  getEmailInput,
  findEmailError,
  setEmail,

  getPasswordField,
  getPasswordInput,
  findPasswordError,
  setPassword,

  getSubmitBtn,
  clickSubmitButton,

  expectLoadingStarted,
  expectLoadingFinished,
}

setupApiTests()

describe('Страница авторизации', () => {
  describe('Поле email', () => {
    test('Отображается корректно', () => {
      render(<LoginPage />)

      const input = testUtils.getEmailInput()

      expect(input).toBeInTheDocument()
      expect(input).toBeEnabled()
      expect(input).not.toHaveValue()
    })

    test('Можно установить значение', async () => {
      const { user } = render(<LoginPage />)

      const value = generateEmail()
      const input = await testUtils.setEmail(user, value)

      expect(input).toHaveValue(value)
    })

    describe('Показывается ошибка под полем', () => {
      test('Если ввести некорректный email', async () => {
        const { user } = render(<LoginPage />)

        await testUtils.setEmail(user, generateWord())
        await testUtils.clickSubmitButton(user)

        expect(
          await testUtils.findEmailError(validationMessages.email.incorrect),
        ).toBeInTheDocument()
      })

      test('Если ввести только пробелы', async () => {
        const { user } = render(<LoginPage />)

        await testUtils.setEmail(user, ' ')
        await testUtils.clickSubmitButton(user)

        expect(
          await testUtils.findEmailError(validationMessages.email.incorrect),
        ).toBeInTheDocument()
      })

      test('Если не заполнить поле и нажать кнопку отправки', async () => {
        const { user } = render(<LoginPage />)

        await testUtils.clickSubmitButton(user)

        expect(
          await testUtils.findEmailError(validationMessages.required),
        ).toBeInTheDocument()
      })
    })
  })

  describe('Поле пароля', () => {
    test('Отображается корректно', () => {
      render(<LoginPage />)

      const input = testUtils.getPasswordInput()

      expect(input).toBeInTheDocument()
      expect(input).toBeEnabled()
      expect(input).toHaveAttribute('type', 'password')
      expect(input).not.toHaveValue()
    })

    test('Можно установить значение', async () => {
      const { user } = render(<LoginPage />)

      const value = generateWord()
      const input = await testUtils.setPassword(user, value)

      expect(input).toHaveValue(value)
    })

    describe('Показывается ошибка под полем', () => {
      test('Если не заполнить поле и нажать кнопку отправки', async () => {
        const { user } = render(<LoginPage />)

        await testUtils.clickSubmitButton(user)

        expect(
          await testUtils.findPasswordError(validationMessages.required),
        ).toBeInTheDocument()
      })

      test('Если ввести только пробелы', async () => {
        const { user } = render(<LoginPage />)

        await testUtils.setPassword(user, ' ')
        await testUtils.clickSubmitButton(user)

        expect(
          await testUtils.findPasswordError(validationMessages.canNotBeEmpty),
        ).toBeInTheDocument()
      })
    })
  })

  test('Пользователь остаётся на странице если не заполнить поля и нажать кнопку отправки', async () => {
    const { user, checkRouteChanged } = renderInRoute(
      <LoginPage />,
      RouteEnum.Login,
    )

    await testUtils.clickSubmitButton(user)

    await waitFor(() => {
      expect(checkRouteChanged()).toBe(false)
    })
  })

  describe('При успешном запросе', () => {
    test('Пользователь покидает страницу авторизации', async () => {
      mockLoginSuccess({ body: authFixtures.loginResponseSuccess })

      const { user, checkRouteChanged } = renderInRoute(
        <LoginPage />,
        RouteEnum.Login,
      )

      await testUtils.setEmail(user, generateEmail())
      await testUtils.setPassword(user, generateWord())
      await testUtils.clickSubmitButton(user)
      await testUtils.expectLoadingStarted()
      await testUtils.expectLoadingFinished()

      expect(checkRouteChanged()).toBe(true)
    })

    test('В localStorage сохраняются access/refresh token', async () => {
      mockLoginSuccess({ body: authFixtures.loginResponseSuccess })

      const { user } = render(<LoginPage />)

      await testUtils.setEmail(user, generateEmail())
      await testUtils.setPassword(user, generateWord())
      await testUtils.clickSubmitButton(user)
      await testUtils.expectLoadingStarted()
      await testUtils.expectLoadingFinished()

      expect(authLocalStorageService.getAccessToken()).toBe(
        authFixtures.loginResponseSuccess.access,
      )

      expect(authLocalStorageService.getRefreshToken()).toBe(
        authFixtures.loginResponseSuccess.refresh,
      )
    })

    test('Данные сохраняются в store', async () => {
      mockLoginSuccess({ body: authFixtures.loginResponseSuccess })
      const store = setupStore()

      const { user } = render(<LoginPage />, { store })

      await testUtils.setEmail(user, generateEmail())
      await testUtils.setPassword(user, generateWord())
      await testUtils.clickSubmitButton(user)
      await testUtils.expectLoadingStarted()
      await testUtils.expectLoadingFinished()

      const authState = store.getState().auth

      expect(authState.user).not.toBe(null)
      expect(authState.accessToken).toBe(
        authFixtures.loginResponseSuccess.access,
      )
      expect(authState.refreshToken).toBe(
        authFixtures.loginResponseSuccess.refresh,
      )
      expect(authState.isAuthenticated).toBe(true)
    })
  })

  describe('При не успешном запросе', () => {
    test('Пользователь остаётся на странице авторизации', async () => {
      mockLoginBadRequestError()

      const { user, checkRouteChanged } = renderInRoute(
        <LoginPage />,
        RouteEnum.Login,
      )

      await testUtils.setEmail(user, generateEmail())
      await testUtils.setPassword(user, generateWord())
      await testUtils.clickSubmitButton(user)
      await testUtils.expectLoadingStarted()
      await testUtils.expectLoadingFinished()

      expect(checkRouteChanged()).toBe(false)
    })

    test(`Корректно обрабатывается ошибка ${HttpCodeEnum.BadRequest}`, async () => {
      mockLoginBadRequestError()

      const { user } = render(<LoginPage />)

      await testUtils.setEmail(user, generateEmail())
      await testUtils.setPassword(user, generateWord())
      await testUtils.clickSubmitButton(user)
      await testUtils.expectLoadingStarted()
      await testUtils.expectLoadingFinished()

      expect(
        testUtils.getChildByText(LOGIN_BAD_REQUEST_ERROR_MSG),
      ).toBeInTheDocument()
    })

    test(`Корректно обрабатывается ошибка ${HttpCodeEnum.Unauthorized}`, async () => {
      mockLoginUnauthorizedError()
      mockRefreshTokenSuccess()

      const { user } = render(<LoginPage />)

      await testUtils.setEmail(user, generateEmail())
      await testUtils.setPassword(user, generateWord())
      await testUtils.clickSubmitButton(user)
      await testUtils.expectLoadingStarted()
      await testUtils.expectLoadingFinished()

      expect(
        testUtils.getChildByText(LOGIN_WRONG_DATA_ERROR_MSG),
      ).toBeInTheDocument()
    })

    test(`Корректно обрабатывается ошибка ${HttpCodeEnum.ServerError}`, async () => {
      mockLoginServerError()

      const { user } = render(<LoginPage />)

      await testUtils.setEmail(user, generateEmail())
      await testUtils.setPassword(user, generateWord())
      await testUtils.clickSubmitButton(user)
      await testUtils.expectLoadingStarted()
      await testUtils.expectLoadingFinished()

      expect(
        testUtils.getChildByText(commonApiMessages.unknownError),
      ).toBeInTheDocument()
    })
  })
})
