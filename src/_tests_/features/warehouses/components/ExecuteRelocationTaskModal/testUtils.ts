import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { TestIdsEnum } from '_tests_/features/warehouses/components/ExecuteRelocationTaskModal/constants'
import { buttonTestUtils } from '_tests_/helpers'

const getContainer = () => screen.getByTestId(TestIdsEnum.ExecuteRelocationTaskModal)
const findContainer = () => screen.findByTestId(TestIdsEnum.ExecuteRelocationTaskModal)

// cancel button
const getCancelButton = () => buttonTestUtils.getButtonIn(getContainer(), /Отменить/)

const clickCancelButton = async (user: UserEvent) => {
  const button = getCancelButton()
  await user.click(button)
  return button
}

// submit button
const getSubmitButton = () => buttonTestUtils.getButtonIn(getContainer(), /Выполнить заявку/)

const clickSubmitButton = async (user: UserEvent) => {
  const button = getSubmitButton()
  await user.click(button)
  return button
}

// documents
const getDocumentsFormItem = () => within(getContainer()).getByTestId(TestIdsEnum.DocumentsFormItem)

const getAddDocumentsButton = () =>
  buttonTestUtils.getButtonIn(getDocumentsFormItem(), /Добавить вложение/)

const clickAddDocumentsButton = async (user: UserEvent) => {
  const button = getAddDocumentsButton()
  await user.click(button)
}

const setDocument = async (
  user: UserEvent,
  file: File = new File([], '', { type: 'image/png' }),
) => {
  const formItem = getDocumentsFormItem()
  // eslint-disable-next-line testing-library/no-node-access
  const input = formItem.querySelector('input[type="file"]') as HTMLInputElement
  await user.upload(input, file)
  return { input, file }
}

const getUploadedDocument = (filename: string) =>
  within(getDocumentsFormItem()).getByTitle(filename)

const findDocumentsError = (error: string) => within(getDocumentsFormItem()).findByText(error)

// loading
const expectLoadingStarted = () => buttonTestUtils.expectLoadingStarted(getSubmitButton())
const expectLoadingFinished = () => buttonTestUtils.expectLoadingFinished(getSubmitButton())

export const executeRelocationTaskModalTestUtils = {
  getContainer,
  findContainer,

  getCancelButton,
  clickCancelButton,

  getSubmitButton,
  clickSubmitButton,

  getAddDocumentsButton,
  clickAddDocumentsButton,
  setDocument,
  getUploadedDocument,
  findDocumentsError,

  expectLoadingStarted,
  expectLoadingFinished,
}
