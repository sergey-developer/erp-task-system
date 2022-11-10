import { getButtonIn, validatingFinished } from '_tests_/utils'
import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

const getContainer = () => screen.getByTestId('form-create-comment')

const getCommentField = () =>
  within(getContainer()).getByTestId('field-comment')

const getCommentInput = () =>
  within(getCommentField()).getByPlaceholderText(
    'Дополните информацию о заявке',
  )

const userEntersComment = async (user: UserEvent, comment: string) => {
  const input = getCommentInput()
  await user.type(input, comment)
  return input
}

const commentValidatingFinished = async () => {
  const commentField = getCommentField()
  await validatingFinished(commentField)
  return commentField
}

const getSubmitButton = () =>
  getButtonIn(getContainer(), /опубликовать комментарий/i)

const userClickSubmitButton = async (user: UserEvent) => {
  const button = getSubmitButton()
  await user.click(button)
  return button
}

const utils = {
  getContainer,

  getCommentField,
  getCommentInput,
  userEntersComment,
  commentValidatingFinished,

  getSubmitButton,
  userClickSubmitButton,
}

export default utils
