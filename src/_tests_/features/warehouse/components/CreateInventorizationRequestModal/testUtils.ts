import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { CREATE_TEXT } from 'shared/constants/common'

import { TestIdsEnum } from '_tests_/features/warehouse/components/CreateInventorizationRequestModal/constants'
import { buttonTestUtils, fakeWord, selectTestUtils } from '_tests_/utils/index'

const getContainer = () => screen.getByTestId(TestIdsEnum.CreateInventorizationRequestModal)

// deadline at field
const getDeadlineAtFormItem = () =>
  within(getContainer()).getByTestId(TestIdsEnum.DeadlineAtFormItem)

const getDeadlineAtDateFormItem = () =>
  within(getDeadlineAtFormItem()).getByTestId(TestIdsEnum.DeadlineAtDateFormItem)

const getDeadlineAtDateField = (): HTMLInputElement =>
  within(getDeadlineAtDateFormItem()).getByPlaceholderText('Выберите дату')

const findDeadlineAtDateError = (text: string) =>
  within(getDeadlineAtDateFormItem()).findByText(text)

const setDeadlineAtDate = async (user: UserEvent, value: string) => {
  const field = getDeadlineAtDateField()
  await user.type(field, value)
  await user.tab()
  return field
}

const getDeadlineAtTimeFormItem = () =>
  within(getDeadlineAtFormItem()).getByTestId(TestIdsEnum.DeadlineAtTimeFormItem)

const getDeadlineAtTimeField = (): HTMLInputElement =>
  within(getDeadlineAtTimeFormItem()).getByPlaceholderText('Время')

const findDeadlineAtTimeError = (text: string) =>
  within(getDeadlineAtTimeFormItem()).findByText(text)

const setDeadlineAtTime = async (user: UserEvent, value: string) => {
  const field = getDeadlineAtTimeField()
  await user.type(field, value)
  await user.tab()
  return field
}

// type field
const getTypeFormItem = () => within(getContainer()).getByTestId(TestIdsEnum.TypeFormItem)
const getTypeSelectInput = () => selectTestUtils.getSelect(getTypeFormItem())
const openTypeSelect = (user: UserEvent) => selectTestUtils.openSelect(user, getTypeFormItem())
const setType = selectTestUtils.clickSelectOption
const getSelectedType = () => selectTestUtils.getSelectedOption(getTypeFormItem())
const findTypeError = async (text: string) => within(getTypeFormItem()).findByText(text)

// description field
const getDescriptionFormItem = () =>
  within(getContainer()).getByTestId(TestIdsEnum.DescriptionFormItem)

const getDescriptionField = () =>
  within(getDescriptionFormItem()).getByPlaceholderText('Укажите описание')

const setDescription = async (user: UserEvent, value: string) => {
  const field = getDescriptionField()
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
  file: File = new File([], fakeWord(), { type: 'image/png' }),
) => {
  const formItem = getAttachmentsFormItem()
  const input = within(formItem).getByLabelText('Вложения') as HTMLInputElement
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

// executor field
const getExecutorFormItem = () => within(getContainer()).getByTestId(TestIdsEnum.ExecutorFormItem)
const getExecutorSelectInput = () => selectTestUtils.getSelect(getExecutorFormItem())
const setExecutor = selectTestUtils.clickSelectOption
const findExecutorError = (text: string) => within(getExecutorFormItem()).findByText(text)

const openExecutorSelect = (user: UserEvent) =>
  selectTestUtils.openSelect(user, getExecutorFormItem())

const getSelectedExecutor = (title: string) =>
  selectTestUtils.getSelectedOptionByTitle(getExecutorFormItem(), title)

const expectExecutorLoadingStarted = () =>
  selectTestUtils.expectLoadingStarted(getExecutorFormItem())

const expectExecutorLoadingFinished = () =>
  selectTestUtils.expectLoadingFinished(getExecutorFormItem())

// nomenclature field
const getNomenclatureFormItem = () =>
  within(getContainer()).getByTestId(TestIdsEnum.NomenclaturesFormItem)

const getNomenclatureSelectInput = () => selectTestUtils.getSelect(getNomenclatureFormItem())
const setNomenclature = selectTestUtils.clickSelectOption

const getSelectedNomenclature = (value: string): HTMLElement =>
  within(getNomenclatureFormItem()).getByTitle(value)

const openNomenclatureSelect = async (user: UserEvent) => {
  await selectTestUtils.openSelect(user, getNomenclatureFormItem())
}

const findNomenclatureError = (error: string): Promise<HTMLElement> =>
  within(getNomenclatureFormItem()).findByText(error)

const expectNomenclatureLoadingStarted = () =>
  selectTestUtils.expectLoadingStarted(getNomenclatureFormItem())

const expectNomenclatureLoadingFinished = () =>
  selectTestUtils.expectLoadingFinished(getNomenclatureFormItem())

// warehouse field
const getWarehouseFormItem = () =>
  within(getContainer()).getByTestId(TestIdsEnum.WarehousesFormItem)
const getWarehouseSelectInput = () => selectTestUtils.getSelect(getWarehouseFormItem())
const setWarehouse = selectTestUtils.clickSelectOption

const getSelectedWarehouse = (value: string): HTMLElement =>
  within(getWarehouseFormItem()).getByTitle(value)

const openWarehouseSelect = async (user: UserEvent) => {
  await selectTestUtils.openSelect(user, getWarehouseFormItem())
}

const findWarehouseError = (error: string): Promise<HTMLElement> =>
  within(getWarehouseFormItem()).findByText(error)

const expectWarehouseLoadingStarted = () =>
  selectTestUtils.expectLoadingStarted(getWarehouseFormItem())

const expectWarehouseLoadingFinished = () =>
  selectTestUtils.expectLoadingFinished(getWarehouseFormItem())

const clickSubmitButton = async (user: UserEvent) =>
  user.click(buttonTestUtils.getButtonIn(getContainer(), CREATE_TEXT))

export const createInventorizationRequestModalTestUtils = {
  getContainer,

  getTypeSelectInput,
  openTypeSelect,
  setType,
  findTypeError,
  getSelectedType,

  getDescriptionField,
  setDescription,

  getAddAttachmentsButton,
  setAttachment,
  getUploadedAttachment,
  queryUploadedAttachment,
  clickDeleteAttachmentButton,

  getNomenclatureFormItem,
  getNomenclatureSelectInput,
  setNomenclature,
  getSelectedNomenclature,
  openNomenclatureSelect,
  findNomenclatureError,
  expectNomenclatureLoadingStarted,
  expectNomenclatureLoadingFinished,

  getWarehouseSelectInput,
  setWarehouse,
  getSelectedWarehouse,
  openWarehouseSelect,
  findWarehouseError,
  expectWarehouseLoadingStarted,
  expectWarehouseLoadingFinished,

  getDeadlineAtDateField,
  findDeadlineAtDateError,
  setDeadlineAtDate,
  getDeadlineAtTimeField,
  findDeadlineAtTimeError,
  setDeadlineAtTime,

  getExecutorSelectInput,
  setExecutor,
  findExecutorError,
  openExecutorSelect,
  getSelectedExecutor,
  expectExecutorLoadingStarted,
  expectExecutorLoadingFinished,

  clickSubmitButton,
}
