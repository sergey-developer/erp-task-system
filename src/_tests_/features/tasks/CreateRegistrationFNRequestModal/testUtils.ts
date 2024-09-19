import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'


import { buttonTestUtils, fakeWord, selectTestUtils } from '../../../utils'
import { SEND_TEXT } from '../../../../shared/constants/common'
import { TestIdsEnum } from './constants'

const getContainer = () => screen.getByTestId(TestIdsEnum.CreateRegistrationFNRequestModal)
const findContainer = () => screen.findByTestId(TestIdsEnum.CreateRegistrationFNRequestModal)

// change type field
const getChangeTypeFormItem = () => within(getContainer()).getByTestId(TestIdsEnum.ChangeTypeFormItem)
const openChangeTypeSelect = (user: UserEvent) =>
  selectTestUtils.openSelect(user, getChangeTypeFormItem())

const setChangeType = selectTestUtils.clickSelectOption
const getSelectedChangeType = () => selectTestUtils.getSelectedOption(getChangeTypeFormItem())
const findChangeTypeError = (error: string) => within(getChangeTypeFormItem()).findByText(error)

const expectChangeTypesLoadingStarted = () =>
  selectTestUtils.expectLoadingStarted(getChangeTypeFormItem())

const expectChangeTypesLoadingFinished = () =>
  selectTestUtils.expectLoadingFinished(getChangeTypeFormItem())

// attachments
const getAttachmentsFormItem = () => within(getContainer()).getByTestId(TestIdsEnum.AttachmentsFormItem)

const getAddAttachmentsButton = () =>
  buttonTestUtils.getButtonIn(getAttachmentsFormItem(), /Добавить вложение/)

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

const clickDeleteAttachmentButton = async (user: UserEvent) => {
  const button = buttonTestUtils.getButtonIn(getAttachmentsFormItem(), 'delete')
  await user.click(button)
}

const findAttachmentsError = (error: string) => within(getAttachmentsFormItem()).findByText(error)

// submit button
const getSubmitButton = () => buttonTestUtils.getButtonIn(getContainer(), new RegExp(SEND_TEXT))
const clickSubmitButton = async (user: UserEvent) => {
  const button = getSubmitButton()
  await user.click(button)
}

export const createRegistrationFNRequestModalTestUtils = {
  getContainer,
  findContainer,

  openChangeTypeSelect,
  setChangeType,
  getSelectedChangeType,
  findChangeTypeError,
  expectChangeTypesLoadingStarted,
  expectChangeTypesLoadingFinished,

  getAddAttachmentsButton,
  queryUploadedAttachment,
  setAttachment,
  getUploadedAttachment,
  clickDeleteAttachmentButton,
  findAttachmentsError,

  clickSubmitButton,
}
