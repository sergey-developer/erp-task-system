import {
  getButtonIn,
  loadingFinishedByButton,
  loadingStartedByButton,
  validatingFinished,
} from '_tests_/utils'
import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

const getContainer = () => screen.getByTestId('create-comment-form')

const findChildByText = (text: string) =>
  within(getContainer()).findByText(text)

const getCommentField = () =>
  within(getContainer()).getByTestId('field-comment')

const findCommentFieldError = (error: string) =>
  within(getCommentField()).findByText(error)

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

const loadingStarted = async () => {
  const submitButton = getSubmitButton()
  await loadingStartedByButton(submitButton)
}

const loadingFinished = async () => {
  const submitButton = getSubmitButton()
  await loadingFinishedByButton(submitButton)
}

const utils = {
  getContainer,
  findChildByText,

  getCommentField,
  findCommentFieldError,
  getCommentInput,
  userEntersComment,
  commentValidatingFinished,

  getSubmitButton,
  userClickSubmitButton,

  loadingStarted,
  loadingFinished,
}

export default utils
