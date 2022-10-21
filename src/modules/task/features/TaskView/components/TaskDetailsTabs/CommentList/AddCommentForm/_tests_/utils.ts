import { getButtonIn, screen, within } from '_tests_/utils'

export const getFormContainer = () => screen.getByTestId('form-add-comment')

export const getCommentInput = () =>
  within(getFormContainer()).getByPlaceholderText(
    'Дополните информацию о заявке',
  )

export const getSubmitButton = () =>
  getButtonIn(getFormContainer(), /Опубликовать комментарий/)
