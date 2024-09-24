import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { buttonTestUtils, fakeWord } from '_tests_/utils/index'

import { TestIdsEnum } from './constants'

const getContainer = () => screen.getByTestId(TestIdsEnum.CreateCommentForm)
const queryContainer = () => screen.queryByTestId(TestIdsEnum.CreateCommentForm)
const findChildByText = (text: string) => within(getContainer()).findByText(text)

// comment
const getCommentFormItem = () => within(getContainer()).getByTestId(TestIdsEnum.CommentFormItem)
const findCommentError = (error: string) => within(getCommentFormItem()).findByText(error)

const getCommentField = () =>
  within(getCommentFormItem()).getByPlaceholderText('Дополните информацию о заявке')

const setComment = async (user: UserEvent, comment: string) => {
  const input = getCommentField()
  await user.type(input, comment)
  return input
}

// attachment
const getAttachmentsFormItem = () =>
  within(getContainer()).getByTestId(TestIdsEnum.AttachmentsFormItem)

const getAddAttachmentsButton = () =>
  buttonTestUtils.getButtonIn(getAttachmentsFormItem(), /Добавить вложение/)

const clickAddAttachmentsButton = async (user: UserEvent) => {
  const button = getAddAttachmentsButton()
  await user.click(button)
}

const setAttachment = async (
  user: UserEvent,
  file: File = new File([], fakeWord(), { type: 'image/png' }),
) => {
  const formItem = getAttachmentsFormItem()
  // eslint-disable-next-line testing-library/no-node-access
  const input = formItem.querySelector('input[type="file"]') as HTMLInputElement
  await user.upload(input, file)
  return { input, file }
}

const getUploadedAttachment = (filename: string) =>
  within(getAttachmentsFormItem()).getByTitle(filename)

const queryUploadedAttachment = (filename: string) =>
  within(getAttachmentsFormItem()).queryByTitle(filename)

const findAttachmentsError = (error: string) => within(getAttachmentsFormItem()).findByText(error)

// submit button
const getSubmitButton = () =>
  buttonTestUtils.getButtonIn(getContainer(), /опубликовать комментарий/i)

const clickSubmitButton = async (user: UserEvent) => {
  const button = getSubmitButton()
  await user.click(button)
  return button
}

// loading
const expectLoadingStarted = async () => {
  const submitButton = getSubmitButton()
  await buttonTestUtils.expectLoadingStarted(submitButton)
}

const expectLoadingFinished = async () => {
  const submitButton = getSubmitButton()
  await buttonTestUtils.expectLoadingFinished(submitButton)
}

export const createCommentFormTestUtils = {
  getContainer,
  queryContainer,
  findChildByText,

  getCommentFormItem,
  findCommentError,
  getCommentField,
  setComment,

  getAddAttachmentsButton,
  clickAddAttachmentsButton,
  setAttachment,
  getUploadedAttachment,
  queryUploadedAttachment,
  findAttachmentsError,

  getSubmitButton,
  clickSubmitButton,

  expectLoadingStarted,
  expectLoadingFinished,
}
