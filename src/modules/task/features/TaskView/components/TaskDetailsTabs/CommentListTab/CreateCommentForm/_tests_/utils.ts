import { getButtonIn } from '_tests_/utils'
import { screen, within } from '@testing-library/react'

export const getFormContainer = () => screen.getByTestId('form-create-comment')

export const getCommentField = () =>
  within(getFormContainer()).getByTestId('field-comment')

export const getCommentInput = () =>
  within(getCommentField()).getByPlaceholderText(
    'Дополните информацию о заявке',
  )

export const getSubmitButton = () =>
  getButtonIn(getFormContainer(), /Опубликовать комментарий/i)
