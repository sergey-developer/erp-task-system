import { screen, waitFor, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import React from 'react'

import { LOGIN_BAD_REQUEST_ERROR_MSG, LOGIN_WRONG_DATA_ERROR_MSG } from 'modules/auth/constants'
import { AuthRouteEnum } from 'modules/auth/constants/routes'
import LoginPage from 'modules/auth/pages/LoginPage'
import { authLocalStorageService } from 'modules/auth/services/authLocalStorage.service'

import { setupStore } from 'state/store'

import { commonApiMessages } from 'shared/constants/common'
import { validationMessages } from 'shared/constants/validation'

import authFixtures from '_tests_/fixtures/auth'
import {
  mockLoginBadRequestError,
  mockLoginServerError,
  mockLoginSuccess,
  mockLoginUnauthorizedError,
  mockRefreshTokenSuccess,
} from '_tests_/mocks/api'
import {
  buttonTestUtils,
  fakeEmail,
  fakeWord,
  render,
  renderInRoute,
  setupApiTests,
} from '_tests_/utils'

const getContainer = () => screen.getByTestId('login-card')
const findContainer = () => screen.findByTestId('login-card')

const getChildByText = (text: string) => within(getContainer()).getByText(text)

// email field
const getEmailFieldContainer = () => within(getContainer()).getByTestId('field-email')

const getEmailField = (): HTMLInputElement =>
  within(getEmailFieldContainer()).getByPlaceholderText('ober@obermeister.ru')

const findEmailFieldError = (error: string) => within(getEmailFieldContainer()).findByText(error)

const setEmail = async (user: UserEvent, value: string) => {
  const field = getEmailField()
  await user.type(field, value)
  return field
}

// password field
const getPasswordFieldContainer = () => within(getContainer()).getByTestId('field-password')

const getPasswordField = (): HTMLInputElement =>
  within(getPasswordFieldContainer()).getByPlaceholderText('••••••••')

const findPasswordFieldError = (error: string) =>
  within(getPasswordFieldContainer()).findByText(error)

const setPassword = async (user: UserEvent, value: string) => {
  const field = getPasswordField()
  await user.type(field, value)
  return field
}

// submit button
const getSubmitBtn = () => screen.getByTestId('btn-submit')

const clickSubmitButton = async (user: UserEvent): Promise<HTMLElement> => {
  const submitBtn = getSubmitBtn()
  await user.click(submitBtn)
  return submitBtn
}

// other
const expectLoadingStarted = () => buttonTestUtils.expectLoadingStarted(getSubmitBtn())
const expectLoadingFinished = () => buttonTestUtils.expectLoadingFinished(getSubmitBtn())

export const testUtils = {
  getContainer,
  findContainer,
  getChildByText,

  getEmailFieldContainer,
  getEmailField,
  findEmailFieldError,
  setEmail,

  getPasswordFieldContainer,
  getPasswordField,
  findPasswordFieldError,
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

      const field = testUtils.getEmailField()

      expect(field).toBeInTheDocument()
      expect(field).toBeEnabled()
      expect(field).not.toHaveValue()
    })

    test('Можно установить значение', async () => {
      const { user } = render(<LoginPage />)

      const value = fakeEmail()
      const field = await testUtils.setEmail(user, value)

      expect(field).toHaveValue(value)
    })

    describe('Показывается ошибка под полем', () => {
      test('Если ввести некорректный email', async () => {
        const { user } = render(<LoginPage />)

        await testUtils.setEmail(user, fakeWord())
        await testUtils.clickSubmitButton(user)

        expect(
          await testUtils.findEmailFieldError(validationMessages.email.incorrect),
        ).toBeInTheDocument()
      })

      test('Если ввести только пробелы', async () => {
        const { user } = render(<LoginPage />)

        await testUtils.setEmail(user, ' ')
        await testUtils.clickSubmitButton(user)

        expect(
          await testUtils.findEmailFieldError(validationMessages.email.incorrect),
        ).toBeInTheDocument()
      })

      test('Если не заполнить поле и нажать кнопку отправки', async () => {
        const { user } = render(<LoginPage />)

        await testUtils.clickSubmitButton(user)

        expect(await testUtils.findEmailFieldError(validationMessages.required)).toBeInTheDocument()
      })
    })
  })

  describe('Поле пароля', () => {
    test('Отображается корректно', () => {
      render(<LoginPage />)

      const field = testUtils.getPasswordField()

      expect(field).toBeInTheDocument()
      expect(field).toBeEnabled()
      expect(field).toHaveAttribute('type', 'password')
      expect(field).not.toHaveValue()
    })

    test('Можно установить значение', async () => {
      const { user } = render(<LoginPage />)

      const value = fakeWord()
      const field = await testUtils.setPassword(user, value)

      expect(field).toHaveValue(value)
    })

    describe('Показывается ошибка под полем', () => {
      test('Если не заполнить поле и нажать кнопку отправки', async () => {
        const { user } = render(<LoginPage />)

        await testUtils.clickSubmitButton(user)

        expect(
          await testUtils.findPasswordFieldError(validationMessages.required),
        ).toBeInTheDocument()
      })

      test('Если ввести только пробелы', async () => {
        const { user } = render(<LoginPage />)

        await testUtils.setPassword(user, ' ')
        await testUtils.clickSubmitButton(user)

        expect(
          await testUtils.findPasswordFieldError(validationMessages.canNotBeEmpty),
        ).toBeInTheDocument()
      })
    })
  })

  test('Пользователь остаётся на странице если не заполнить поля и нажать кнопку отправки', async () => {
    const { user, checkRouteChanged } = renderInRoute(<LoginPage />, AuthRouteEnum.Login)

    await testUtils.clickSubmitButton(user)

    await waitFor(() => {
      expect(checkRouteChanged()).toBe(false)
    })
  })

  describe('При успешном запросе', () => {
    test('Пользователь покидает страницу авторизации', async () => {
      mockLoginSuccess({ body: authFixtures.loginSuccessResponse })

      const { user, checkRouteChanged } = renderInRoute(<LoginPage />, AuthRouteEnum.Login)

      await testUtils.setEmail(user, fakeEmail())
      await testUtils.setPassword(user, fakeWord())
      await testUtils.clickSubmitButton(user)
      await testUtils.expectLoadingStarted()
      await testUtils.expectLoadingFinished()

      expect(checkRouteChanged()).toBe(true)
    })

    test('В localStorage сохраняются access/refresh token', async () => {
      mockLoginSuccess({ body: authFixtures.loginSuccessResponse })

      const { user } = render(<LoginPage />)

      await testUtils.setEmail(user, fakeEmail())
      await testUtils.setPassword(user, fakeWord())
      await testUtils.clickSubmitButton(user)
      await testUtils.expectLoadingStarted()
      await testUtils.expectLoadingFinished()

      expect(authLocalStorageService.getAccessToken()).toBe(
        authFixtures.loginSuccessResponse.access,
      )

      expect(authLocalStorageService.getRefreshToken()).toBe(
        authFixtures.loginSuccessResponse.refresh,
      )
    })

    test('Данные сохраняются в store', async () => {
      mockLoginSuccess({ body: authFixtures.loginSuccessResponse })
      const store = setupStore()

      const { user } = render(<LoginPage />, { store })

      await testUtils.setEmail(user, fakeEmail())
      await testUtils.setPassword(user, fakeWord())
      await testUtils.clickSubmitButton(user)
      await testUtils.expectLoadingStarted()
      await testUtils.expectLoadingFinished()

      const authState = store.getState().auth

      expect(authState.user).not.toBeNull()
      expect(authState.accessToken).toBe(authFixtures.loginSuccessResponse.access)
      expect(authState.refreshToken).toBe(authFixtures.loginSuccessResponse.refresh)
      expect(authState.isLoggedIn).toBe(true)
    })
  })

  describe('При не успешном запросе', () => {
    test('Пользователь остаётся на странице авторизации', async () => {
      mockLoginBadRequestError()

      const { user, checkRouteChanged } = renderInRoute(<LoginPage />, AuthRouteEnum.Login)

      await testUtils.setEmail(user, fakeEmail())
      await testUtils.setPassword(user, fakeWord())
      await testUtils.clickSubmitButton(user)
      await testUtils.expectLoadingStarted()
      await testUtils.expectLoadingFinished()

      expect(checkRouteChanged()).toBe(false)
    })

    test('Обрабатывается ошибка 400', async () => {
      mockLoginBadRequestError()

      const { user } = render(<LoginPage />)

      await testUtils.setEmail(user, fakeEmail())
      await testUtils.setPassword(user, fakeWord())
      await testUtils.clickSubmitButton(user)
      await testUtils.expectLoadingStarted()
      await testUtils.expectLoadingFinished()

      expect(testUtils.getChildByText(LOGIN_BAD_REQUEST_ERROR_MSG)).toBeInTheDocument()
    })

    test('Обрабатывается ошибка 401', async () => {
      mockLoginUnauthorizedError()
      mockRefreshTokenSuccess()

      const { user } = render(<LoginPage />)

      await testUtils.setEmail(user, fakeEmail())
      await testUtils.setPassword(user, fakeWord())
      await testUtils.clickSubmitButton(user)
      await testUtils.expectLoadingStarted()
      await testUtils.expectLoadingFinished()

      expect(testUtils.getChildByText(LOGIN_WRONG_DATA_ERROR_MSG)).toBeInTheDocument()
    })

    test('Обрабатывается ошибка 500', async () => {
      mockLoginServerError()

      const { user } = render(<LoginPage />)

      await testUtils.setEmail(user, fakeEmail())
      await testUtils.setPassword(user, fakeWord())
      await testUtils.clickSubmitButton(user)
      await testUtils.expectLoadingStarted()
      await testUtils.expectLoadingFinished()

      expect(testUtils.getChildByText(commonApiMessages.unknownError)).toBeInTheDocument()
    })
  })
})
