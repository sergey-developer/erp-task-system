import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { buttonTestUtils, selectTestUtils } from '_tests_/utils'

import { TestIdsEnum } from './constants'

const getContainer = () => screen.getByTestId(TestIdsEnum.ExecuteTaskModal)
const findContainer = () => screen.findByTestId(TestIdsEnum.ExecuteTaskModal)
const getChildByText = (text: string) => within(getContainer()).getByText(text)

// close button
const getCloseButton = () => buttonTestUtils.getButtonIn(getContainer(), /close/i)
const clickCloseButton = async (user: UserEvent) => {
  const button = getCloseButton()
  await user.click(button)
  return button
}

// cancel button
const getCancelButton = () => buttonTestUtils.getButtonIn(getContainer(), /Отменить/)
const clickCancelButton = async (user: UserEvent) => {
  const button = getCancelButton()
  await user.click(button)
  return button
}

// get act button
const getGetActButton = () => buttonTestUtils.getButtonIn(getContainer(), /Сформировать акт/)
const clickGetActButton = async (user: UserEvent) => {
  const button = getGetActButton()
  await user.click(button)
}

const expectGetActLoadingStarted = () => buttonTestUtils.expectLoadingStarted(getGetActButton())
const expectGetActLoadingFinished = () => buttonTestUtils.expectLoadingFinished(getGetActButton())

// submit button
const getSubmitButton = () => buttonTestUtils.getButtonIn(getContainer(), /Выполнить заявку/)
const clickSubmitButton = async (user: UserEvent) => {
  const button = getSubmitButton()
  await user.click(button)
}

// resolutionClassifier1
const getResolutionClassificationFormItem = () =>
  screen.getByTestId(TestIdsEnum.ResolutionClassificationFormItem)
const queryResolutionClassificationFormItem = () =>
  screen.queryByTestId(TestIdsEnum.ResolutionClassificationFormItem)

const getResolutionClassificationLabel = () =>
  within(getResolutionClassificationFormItem()).getByLabelText('Категория решения')

const getResolutionClassificationSelectInput = () =>
  selectTestUtils.getSelect(getResolutionClassificationFormItem())

const openResolutionClassificationSelect = (user: UserEvent) =>
  selectTestUtils.openSelect(user, getResolutionClassificationFormItem())

const setResolutionClassification = selectTestUtils.clickSelectOption

const getSelectedResolutionClassification = (text: string) =>
  selectTestUtils.getSelectedOptionByTitle(getResolutionClassificationFormItem(), text)

const querySelectedResolutionClassification = (title: string) =>
  selectTestUtils.querySelectedOptionByTitle(getResolutionClassificationFormItem(), title)

const findResolutionClassificationError = (text: string) =>
  within(getResolutionClassificationFormItem()).findByText(text)

const expectResolutionClassificationLoadingFinished = () =>
  selectTestUtils.expectLoadingFinished(getResolutionClassificationFormItem())

// tech resolution
const getTechResolutionBlock = () => within(getContainer()).getByTestId(TestIdsEnum.TechResolution)

const getTechResolutionTitle = () =>
  within(getTechResolutionBlock()).getByTitle('Техническое решение')

const getTechResolutionField = () =>
  within(getContainer()).getByPlaceholderText('Расскажите о работах на объекте')

const findTechResolutionError = (text: string) => within(getTechResolutionBlock()).findByText(text)

const setTechResolution = async (user: UserEvent, value: string) => {
  const field = getTechResolutionField()
  await user.type(field, value)
  return field
}

// user resolution
const getUserResolutionBlock = () => within(getContainer()).getByTestId(TestIdsEnum.UserResolution)

const getUserResolutionTitle = () =>
  within(getUserResolutionBlock()).getByTitle('Решение для пользователя')

const getUserResolutionField = () =>
  within(getUserResolutionBlock()).getByPlaceholderText('Расскажите заявителю о решении')

const queryUserResolutionField = () =>
  within(getContainer()).queryByRole('textbox', {
    name: 'Решение для пользователя',
  })

const findUserResolutionError = (text: string) => within(getUserResolutionBlock()).findByText(text)

const setUserResolution = async (user: UserEvent, value: string) => {
  const field = getUserResolutionField()
  await user.type(field, value)
  return field
}

// attachments
const getAttachmentsFormItem = () =>
  within(getContainer()).getByTestId(TestIdsEnum.AttachmentsFormItem)

const getAddAttachmentsButton = () =>
  buttonTestUtils.getButtonIn(getAttachmentsFormItem(), /Добавить вложение/)

const setAttachment = async (
  user: UserEvent,
  file: File = new File([], '', { type: 'image/png' }),
) => {
  const formItem = getAttachmentsFormItem()
  // eslint-disable-next-line testing-library/no-node-access
  const input = formItem.querySelector('input[type="file"]') as HTMLInputElement
  await user.upload(input, file)
  return { input, file }
}

const getUploadedAttachment = (filename: string) =>
  within(getAttachmentsFormItem()).getByTitle(filename)

const findAttachmentsError = (error: string) => within(getAttachmentsFormItem()).findByText(error)

// loading
const expectLoadingStarted = () => buttonTestUtils.expectLoadingStarted(getSubmitButton())
const expectLoadingFinished = () => buttonTestUtils.expectLoadingFinished(getSubmitButton())

export const executeTaskModalTestUtils = {
  getContainer,
  findContainer,
  getChildByText,

  getCloseButton,
  clickCloseButton,

  getCancelButton,
  clickCancelButton,

  getSubmitButton,
  clickSubmitButton,

  getGetActButton,
  clickGetActButton,
  expectGetActLoadingStarted,
  expectGetActLoadingFinished,

  queryResolutionClassificationFormItem,
  getResolutionClassificationLabel,
  getResolutionClassificationSelectInput,
  openResolutionClassificationSelect,
  setResolutionClassification,
  getSelectedResolutionClassification,
  querySelectedResolutionClassification,
  findResolutionClassificationError,
  expectResolutionClassificationLoadingFinished,

  getTechResolutionBlock,
  getTechResolutionTitle,
  getTechResolutionField,
  findTechResolutionError,
  setTechResolution,

  getUserResolutionBlock,
  getUserResolutionTitle,
  getUserResolutionField,
  queryUserResolutionField,
  findUserResolutionError,
  setUserResolution,

  getAddAttachmentsButton,
  setAttachment,
  getUploadedAttachment,
  findAttachmentsError,

  expectLoadingStarted,
  expectLoadingFinished,
}
