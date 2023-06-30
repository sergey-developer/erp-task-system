import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { RouteEnum } from 'configs/routes'

import {
  INCORRECT_PASSWORD_ERROR_MSG,
  UPDATE_PASSWORD_SUCCESS_MSG,
  updatePasswordErrorMessages,
} from 'modules/auth/constants'

import { validationMessages } from 'shared/constants/validation'

import { CORRECT_PASSWORD } from '_tests_/constants/auth'
import {
  mockUpdatePasswordBadRequestError,
  mockUpdatePasswordNotFoundError,
  mockUpdatePasswordServerError,
  mockUpdatePasswordSuccess,
  mockUpdatePasswordUnauthorizedError,
} from '_tests_/mocks/api'
import {
  expectLoadingFinishedByButton,
  expectLoadingStartedByButton,
  fakeWord,
  findNotification,
  getButtonIn,
  queryNotification,
  render,
  renderInRoute,
  setupApiTests,
  setupNotifications,
} from '_tests_/utils'

import ChangePasswordPage from './index'

const getContainer = () => screen.getByTestId('change-password-card')

const getChildByText = (text: string) => within(getContainer()).getByText(text)

// new password
const getNewPasswordFormItem = () =>
  within(getContainer()).getByTestId('password')

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
const getSaveButton = () => getButtonIn(getContainer(), /Сохранить/)

const clickSaveButton = async (user: UserEvent) => {
  const submitBtn = getSaveButton()
  await user.click(submitBtn)
}

// other utils
const expectLoadingStarted = () => expectLoadingStartedByButton(getSaveButton())

const expectLoadingFinished = () =>
  expectLoadingFinishedByButton(getSaveButton())

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

  expectLoadingStarted,
  expectLoadingFinished,
}

setupApiTests()
setupNotifications()

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
        await testUtils.clickSaveButton(user)
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
        await testUtils.clickSaveButton(user)

        const error = await testUtils.findConfirmPasswordError(
          'Пароли не совпадают',
        )

        expect(error).toBeInTheDocument()
      })
    })
  })

  describe('При успешном изменении пароля', () => {
    test('Показывается уведомление и происходит редирект на страницу заявок', async () => {
      mockUpdatePasswordSuccess()

      const { user, getCurrentRoute, checkRouteChanged } = renderInRoute(
        <ChangePasswordPage />,
        RouteEnum.ChangePassword,
      )

      await testUtils.setNewPassword(user, CORRECT_PASSWORD)
      await testUtils.setConfirmPassword(user, CORRECT_PASSWORD)
      await testUtils.clickSaveButton(user)
      await testUtils.expectLoadingFinished()

      const successNotification = await findNotification(
        UPDATE_PASSWORD_SUCCESS_MSG,
      )

      expect(successNotification).toBeInTheDocument()
      expect(checkRouteChanged()).toBe(true)
      expect(getCurrentRoute()).toBe(RouteEnum.TaskList)
    })
  })

  describe('При не успешном изменении пароля', () => {
    test('Обрабатывается ошибка 400', async () => {
      const badRequestErrorMessage = fakeWord()
      const passwordFieldErrorMessage = fakeWord()
      mockUpdatePasswordBadRequestError({
        body: {
          detail: [badRequestErrorMessage],
          password: [passwordFieldErrorMessage],
        },
      })

      const { user, getCurrentRoute, checkRouteChanged } = renderInRoute(
        <ChangePasswordPage />,
        RouteEnum.ChangePassword,
      )

      await testUtils.setNewPassword(user, CORRECT_PASSWORD)
      await testUtils.setConfirmPassword(user, CORRECT_PASSWORD)
      await testUtils.clickSaveButton(user)
      await testUtils.expectLoadingStarted()
      await testUtils.expectLoadingFinished()

      const successNotification = queryNotification(UPDATE_PASSWORD_SUCCESS_MSG)
      const commonErrorMessage = testUtils.getChildByText(
        badRequestErrorMessage,
      )
      const passwordErrorMessage = await testUtils.findNewPasswordError(
        passwordFieldErrorMessage,
      )

      expect(successNotification).not.toBeInTheDocument()
      expect(commonErrorMessage).toBeInTheDocument()
      expect(passwordErrorMessage).toBeInTheDocument()
      expect(checkRouteChanged()).toBe(false)
      expect(getCurrentRoute()).toBe(RouteEnum.ChangePassword)
    })

    test('Обрабатывается ошибка 404', async () => {
      const notFoundErrorMessage = fakeWord()
      mockUpdatePasswordNotFoundError({
        body: { detail: [notFoundErrorMessage] },
      })

      const { user, getCurrentRoute, checkRouteChanged } = renderInRoute(
        <ChangePasswordPage />,
        RouteEnum.ChangePassword,
      )

      await testUtils.setNewPassword(user, CORRECT_PASSWORD)
      await testUtils.setConfirmPassword(user, CORRECT_PASSWORD)
      await testUtils.clickSaveButton(user)
      await testUtils.expectLoadingStarted()
      await testUtils.expectLoadingFinished()

      const successNotification = queryNotification(UPDATE_PASSWORD_SUCCESS_MSG)
      const errorMessage = testUtils.getChildByText(notFoundErrorMessage)

      expect(successNotification).not.toBeInTheDocument()
      expect(errorMessage).toBeInTheDocument()
      expect(checkRouteChanged()).toBe(false)
      expect(getCurrentRoute()).toBe(RouteEnum.ChangePassword)
    })

    test('Обрабатывается ошибка 401', async () => {
      const unauthorizedErrorMessage = fakeWord()
      mockUpdatePasswordUnauthorizedError({
        body: { detail: [unauthorizedErrorMessage] },
      })

      const { user, getCurrentRoute, checkRouteChanged } = renderInRoute(
        <ChangePasswordPage />,
        RouteEnum.ChangePassword,
      )

      await testUtils.setNewPassword(user, CORRECT_PASSWORD)
      await testUtils.setConfirmPassword(user, CORRECT_PASSWORD)
      await testUtils.clickSaveButton(user)
      await testUtils.expectLoadingStarted()
      await testUtils.expectLoadingFinished()

      const successNotification = queryNotification(UPDATE_PASSWORD_SUCCESS_MSG)
      const errorMessage = testUtils.getChildByText(unauthorizedErrorMessage)

      expect(successNotification).not.toBeInTheDocument()
      expect(errorMessage).toBeInTheDocument()
      expect(checkRouteChanged()).toBe(false)
      expect(getCurrentRoute()).toBe(RouteEnum.ChangePassword)
    })

    test('Обрабатывается ошибка 500', async () => {
      mockUpdatePasswordServerError()

      const { user, getCurrentRoute, checkRouteChanged } = renderInRoute(
        <ChangePasswordPage />,
        RouteEnum.ChangePassword,
      )

      await testUtils.setNewPassword(user, CORRECT_PASSWORD)
      await testUtils.setConfirmPassword(user, CORRECT_PASSWORD)
      await testUtils.clickSaveButton(user)
      await testUtils.expectLoadingStarted()
      await testUtils.expectLoadingFinished()

      const successNotification = queryNotification(UPDATE_PASSWORD_SUCCESS_MSG)
      const errorMessage = testUtils.getChildByText(
        updatePasswordErrorMessages.commonError,
      )

      expect(successNotification).not.toBeInTheDocument()
      expect(errorMessage).toBeInTheDocument()
      expect(checkRouteChanged()).toBe(false)
      expect(getCurrentRoute()).toBe(RouteEnum.ChangePassword)
    })
  })
})
