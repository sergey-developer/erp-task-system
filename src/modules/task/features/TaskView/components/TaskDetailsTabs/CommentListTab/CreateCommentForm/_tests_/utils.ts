import { getButtonIn, screen, within } from '_tests_/utils'

export const getFormContainer = () => screen.getByTestId('form-create-comment')

export const getCommentField = () =>
  within(getFormContainer()).getByTestId('field-comment')

export const getCommentInput = () =>
  within(getCommentField()).getByPlaceholderText(
    'Дополните информацию о заявке',
  )

export const getSubmitButton = () =>
  getButtonIn(getFormContainer(), /Опубликовать комментарий/i)
