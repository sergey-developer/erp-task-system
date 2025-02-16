import { screen, waitFor, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import {
  loginBadRequestErrorMessage,
  loginWrongDataErrorMessage,
} from 'features/auth/api/constants'
import ProtectedRoute from 'features/auth/components/ProtectedRoute'
import LoginPage from 'features/auth/pages/LoginPage'
import { AuthRoutesEnum } from 'features/auth/routes/routes'
import { authLocalStorageService } from 'features/auth/services/authLocalStorage.service'
import TasksPage from 'features/tasks/pages/TasksPage'
import React from 'react'

import { CommonRoutesEnum } from 'configs/routes'

import { setupStore } from 'state/store'

import { commonApiMessages } from 'shared/constants/common'
import { validationMessages } from 'shared/constants/validation'

import { tasksPageTestUtils } from '_tests_/features/tasks/pages/TasksPage/testUtils'
import authFixtures from '_tests_/fixtures/auth'
import userFixtures from '_tests_/fixtures/users'
import {
  buttonTestUtils,
  fakeEmail,
  fakeWord,
  getStoreWithAuth,
  render,
  renderInRoute,
  renderWithRouter,
  setupApiTests,
} from '_tests_/helpers'
import {
  mockGetTaskCountersSuccess,
  mockGetTasksSuccess,
  mockLoginBadRequestError,
  mockLoginServerError,
  mockLoginSuccess,
  mockLoginUnauthorizedError,
  mockRefreshTokenSuccess,
} from '_tests_/mocks/api'
import { getUserMeQueryMock } from '_tests_/mocks/store/users'

const getContainer = () => screen.getByTestId('login-card')
const queryContainer = () => screen.queryByTestId('login-card')
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
const getSubmitBtn = () => within(getContainer()).getByTestId('btn-submit')

const clickSubmitButton = async (user: UserEvent) => {
  const submitBtn = getSubmitBtn()
  await user.click(submitBtn)
}

// other
const expectLoadingStarted = () => buttonTestUtils.expectLoadingStarted(getSubmitBtn())
const expectLoadingFinished = () => buttonTestUtils.expectLoadingFinished(getSubmitBtn())

export const testUtils = {
  getContainer,
  queryContainer,
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
    const { user, checkRouteChanged } = renderInRoute(<LoginPage />, AuthRoutesEnum.Login)

    await testUtils.clickSubmitButton(user)

    await waitFor(() => {
      expect(checkRouteChanged()).toBe(false)
    })
  })

  describe('При успешном запросе', () => {
    test('Пользователь покидает страницу авторизации', async () => {
      mockLoginSuccess({ body: authFixtures.loginResponse })
      mockGetTasksSuccess()
      mockGetTaskCountersSuccess()

      const { user } = renderWithRouter(
        [
          {
            path: AuthRoutesEnum.Login,
            element: <ProtectedRoute component={<LoginPage />} onlyGuest />,
          },
          {
            path: CommonRoutesEnum.Home,
            element: <ProtectedRoute component={<TasksPage />} />,
          },
        ],
        { initialEntries: [AuthRoutesEnum.Login], initialIndex: 0 },
        {
          store: getStoreWithAuth(undefined, null, null, {
            queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
          }),
        },
      )

      await testUtils.setEmail(user, fakeEmail())
      await testUtils.setPassword(user, fakeWord())
      await testUtils.clickSubmitButton(user)
      const tasksPage = await tasksPageTestUtils.findContainer()

      expect(tasksPage).toBeInTheDocument()
    })

    test('В localStorage сохраняются access/refresh token', async () => {
      mockLoginSuccess({ body: authFixtures.loginResponse })

      const { user } = render(<LoginPage />)

      await testUtils.setEmail(user, fakeEmail())
      await testUtils.setPassword(user, fakeWord())
      await testUtils.clickSubmitButton(user)
      await testUtils.expectLoadingStarted()
      await testUtils.expectLoadingFinished()

      expect(authLocalStorageService.getAccessToken()).toBe(authFixtures.loginResponse.access)

      expect(authLocalStorageService.getRefreshToken()).toBe(authFixtures.loginResponse.refresh)
    })

    test('Данные сохраняются в store', async () => {
      mockLoginSuccess({ body: authFixtures.loginResponse })
      const store = setupStore()

      const { user } = render(<LoginPage />, { store })

      await testUtils.setEmail(user, fakeEmail())
      await testUtils.setPassword(user, fakeWord())
      await testUtils.clickSubmitButton(user)
      await testUtils.expectLoadingStarted()
      await testUtils.expectLoadingFinished()

      const authState = store.getState().auth

      expect(authState.user).not.toBeNull()
      expect(authState.accessToken).toBe(authFixtures.loginResponse.access)
      expect(authState.refreshToken).toBe(authFixtures.loginResponse.refresh)
      expect(authState.isLoggedIn).toBe(true)
    })
  })

  describe('При не успешном запросе', () => {
    test('Пользователь остаётся на странице авторизации', async () => {
      mockLoginBadRequestError()

      const { user, checkRouteChanged } = renderInRoute(<LoginPage />, AuthRoutesEnum.Login)

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

      expect(testUtils.getChildByText(loginBadRequestErrorMessage)).toBeInTheDocument()
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

      expect(testUtils.getChildByText(loginWrongDataErrorMessage)).toBeInTheDocument()
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
