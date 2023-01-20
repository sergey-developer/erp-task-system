import React from 'react'

import {
  CORRECT_EMAIL,
  CORRECT_PASSWORD,
  INCORRECT_EMAIL,
  NOT_EXISTING_EMAIL,
  WRONG_PASSWORD,
} from '_tests_/constants/auth'
import {
  mockLoginBadRequestError,
  mockLoginServerError,
  mockLoginSuccess,
  mockLoginUnauthorizedError,
  mockRefreshTokenSuccess,
} from '_tests_/mocks/api'
import {
  validatingFinished as baseValidatingFinished,
  validatingStarted as baseValidatingStarted,
  loadingFinishedByButton,
  loadingStartedByButton,
  render,
  renderInRoute,
  setupApiTests,
} from '_tests_/utils'
import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import { RoutesEnum } from 'configs/routes'
import authFixtures from 'fixtures/auth'
import {
  LOGIN_BAD_REQUEST_ERROR_MSG,
  LOGIN_WRONG_DATA_ERROR_MSG,
} from 'modules/auth/constants/errors'
import LoginPage from 'modules/auth/pages/LoginPage'
import authLocalStorageService from 'modules/auth/services/authLocalStorage.service'
import { HttpCodeEnum } from 'shared/constants/http'
import { validationMessages } from 'shared/constants/validation'
import { setupStore } from 'state/store'

setupApiTests()

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

const testUtils = {
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

describe('Страница авторизации', () => {
  test('Пользователь может ввести email', async () => {
    const { user } = render(<LoginPage />)
    const emailInput = await testUtils.userEntersCorrectEmail(user)
    expect(emailInput).toHaveValue(CORRECT_EMAIL)
  })

  test('Пользователь может ввести пароль', async () => {
    const { user } = render(<LoginPage />)
    const passwordInput = await testUtils.userEntersCorrectPassword(user)
    expect(passwordInput).toHaveValue(CORRECT_PASSWORD)
  })

  test('Если пользователь вводит некорректный email, то под полем показывается ошибка', async () => {
    const { user } = render(<LoginPage />)

    const emailField = testUtils.getEmailField()
    await testUtils.userEntersIncorrectEmail(user)
    await testUtils.userClickSubmitButton(user)

    expect(
      await within(emailField).findByText(validationMessages.email.incorrect),
    ).toBeInTheDocument()
  })

  describe('Если обязательные поля не заполнены и нажать кнопку "Войти"', () => {
    test('Пользователь остаётся на странице авторизации', async () => {
      const { user, checkRouteChanged } = renderInRoute(
        <LoginPage />,
        RoutesEnum.Login,
      )

      const emailField = testUtils.getEmailField()
      const passwordField = testUtils.getPasswordField()

      await testUtils.userClickSubmitButton(user)
      await testUtils.validatingStarted(emailField, passwordField)
      await testUtils.validatingFinished(emailField, passwordField)

      expect(checkRouteChanged()).toBe(false)
    })

    test('Появляются ошибки под обязательными полями', async () => {
      const { user } = render(<LoginPage />)

      const emailField = testUtils.getEmailField()
      const passwordField = testUtils.getPasswordField()

      await testUtils.userClickSubmitButton(user)

      expect(
        await within(emailField).findByText(validationMessages.required),
      ).toBeInTheDocument()

      expect(
        await within(passwordField).findByText(validationMessages.required),
      ).toBeInTheDocument()
    })
  })

  describe('Если заполнить поля и нажать кнопку "Войти"', () => {
    describe('При успешном запросе', () => {
      test('Пользователь покидает страницу авторизации', async () => {
        mockLoginSuccess({ body: authFixtures.loginResponseSuccess })

        const { user, checkRouteChanged } = renderInRoute(
          <LoginPage />,
          RoutesEnum.Login,
        )

        await testUtils.userEntersCorrectEmail(user)
        await testUtils.userEntersCorrectPassword(user)
        const submitBtn = await testUtils.userClickSubmitButton(user)
        await loadingStartedByButton(submitBtn)
        await loadingFinishedByButton(submitBtn)

        expect(checkRouteChanged()).toBe(true)
      })

      describe('В localStorage сохраняется', () => {
        afterEach(() => {
          localStorage.clear()
        })

        test('access token', async () => {
          mockLoginSuccess({ body: authFixtures.loginResponseSuccess })

          const { user } = render(<LoginPage />)

          await testUtils.userEntersCorrectEmail(user)
          await testUtils.userEntersCorrectPassword(user)
          const submitBtn = await testUtils.userClickSubmitButton(user)
          await loadingStartedByButton(submitBtn)
          await loadingFinishedByButton(submitBtn)

          expect(authLocalStorageService.getAccessToken()).toBe(
            authFixtures.loginResponseSuccess.access,
          )
        })

        test('refresh token', async () => {
          mockLoginSuccess({ body: authFixtures.loginResponseSuccess })

          const { user } = render(<LoginPage />)

          await testUtils.userEntersCorrectEmail(user)
          await testUtils.userEntersCorrectPassword(user)
          const submitBtn = await testUtils.userClickSubmitButton(user)
          await loadingStartedByButton(submitBtn)
          await loadingFinishedByButton(submitBtn)

          expect(authLocalStorageService.getRefreshToken()).toBe(
            authFixtures.loginResponseSuccess.refresh,
          )
        })
      })

      test('данные сохраняются в store', async () => {
        mockLoginSuccess({ body: authFixtures.loginResponseSuccess })
        const store = setupStore()

        const { user } = render(<LoginPage />, { store })

        await testUtils.userEntersCorrectEmail(user)
        await testUtils.userEntersCorrectPassword(user)
        const submitBtn = await testUtils.userClickSubmitButton(user)
        await loadingStartedByButton(submitBtn)
        await loadingFinishedByButton(submitBtn)

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
          RoutesEnum.Login,
        )

        await testUtils.userEntersNotExistingEmail(user)
        await testUtils.userEntersWrongPassword(user)
        const submitBtn = await testUtils.userClickSubmitButton(user)
        await loadingStartedByButton(submitBtn)
        await loadingFinishedByButton(submitBtn)

        expect(checkRouteChanged()).toBe(false)
      })

      describe(`Если код ошибки "${HttpCodeEnum.BadRequest}"`, () => {
        test(`В форме показывается ошибка - ${LOGIN_BAD_REQUEST_ERROR_MSG}`, async () => {
          mockLoginBadRequestError()

          const { user } = render(<LoginPage />)

          await testUtils.userEntersNotExistingEmail(user)
          await testUtils.userEntersWrongPassword(user)
          const submitBtn = await testUtils.userClickSubmitButton(user)
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
          mockRefreshTokenSuccess()

          const { user } = render(<LoginPage />)

          await testUtils.userEntersNotExistingEmail(user)
          await testUtils.userEntersWrongPassword(user)
          const submitBtn = await testUtils.userClickSubmitButton(user)
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

          await testUtils.userEntersNotExistingEmail(user)
          await testUtils.userEntersWrongPassword(user)
          const submitBtn = await testUtils.userClickSubmitButton(user)
          await loadingStartedByButton(submitBtn)
          await loadingFinishedByButton(submitBtn)

          expect(await screen.findByTestId('login-error')).toBeInTheDocument()
        })
      })
    })
  })
})
