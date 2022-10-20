import { getButton, screen } from '_tests_/utils'

export const getComment = () =>
  screen.getByPlaceholderText('Дополните информацию о заявке')

export const getSubmitButton = () => getButton(/Опубликовать комментарий/)
