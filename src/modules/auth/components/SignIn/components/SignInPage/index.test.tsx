import React from 'react'

import { RoutesEnum } from 'configs/routes'
import { REQUIRED_FIELD_MSG } from 'shared/constants/messages'
import {
  render,
  renderInRoute,
  screen,
  waitFor,
  within,
} from 'tests/test-utils'

import SignInPage from './index'

describe('Страница авторизации', () => {
  describe('Если не заполнить обязательные поля и нажать кнопку submit', () => {
    test('Пользователь остаётся на странице авторизации', async () => {
      const { user } = renderInRoute(<SignInPage />, RoutesEnum.SignIn)

      const checkHasValidatingClass = (className: string): boolean =>
        className.includes('ant-form-item-is-validating')

      const emailField = screen.getByTestId('field-email')
      const passwordField = screen.getByTestId('field-password')
      const submitBtn = screen.getByTestId('btn-submit')

      await user.click(submitBtn)

      await waitFor(() => {
        expect(checkHasValidatingClass(emailField.className)).toBe(false)
      })

      await waitFor(() => {
        expect(checkHasValidatingClass(passwordField.className)).toBe(false)
      })

      expect(window.location.pathname).toBe(RoutesEnum.SignIn)
    })

    test('Появляются ошибки обязательных полей', async () => {
      const { user } = render(<SignInPage />)

      const emailField = screen.getByTestId('field-email')
      const passwordField = screen.getByTestId('field-password')
      const submitBtn = screen.getByTestId('btn-submit')

      await user.click(submitBtn)

      expect(
        await within(emailField).findByText(REQUIRED_FIELD_MSG),
      ).toBeInTheDocument()

      expect(
        await within(passwordField).findByText(REQUIRED_FIELD_MSG),
      ).toBeInTheDocument()
    })
  })
})
