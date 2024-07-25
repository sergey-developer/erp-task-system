import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { buttonTestUtils, fakeWord, render, selectTestUtils } from '_tests_/utils'

import CreateInventorizationRequestModal from './index'
import { CreateInventorizationRequestModalProps } from './types'

const props: CreateInventorizationRequestModalProps = {
  open: true,
  confirmLoading: false,
  onCancel: jest.fn(),
  onSubmit: jest.fn(),

  warehouses: [],
  warehousesIsLoading: false,
  onChangeWarehouses: jest.fn(),

  executors: [],
  executorsIsLoading: false,

  nomenclatures: [],
  nomenclaturesIsLoading: false,

  onCreateAttachment: jest.fn(),
  attachmentIsCreating: false,
  onDeleteAttachment: jest.fn(),
  attachmentIsDeleting: false,
}

const getContainer = () => screen.getByTestId('create-inventorization-request-modal')

// deadline at field
const getDeadlineAtFormItem = () => within(getContainer()).getByTestId('deadline-at-form-item')

const getDeadlineAtDateFormItem = () =>
  within(getDeadlineAtFormItem()).getByTestId('deadline-at-date-form-item')

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
  within(getDeadlineAtFormItem()).getByTestId('deadline-at-time-form-item')

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
const getTypeFormItem = () => within(getContainer()).getByTestId('type-form-item')
const getTypeSelectInput = () => selectTestUtils.getSelect(getTypeFormItem())
const openTypeSelect = (user: UserEvent) => selectTestUtils.openSelect(user, getTypeFormItem())
const setType = selectTestUtils.clickSelectOption
const getSelectedType = () => selectTestUtils.getSelectedOption(getTypeFormItem())
const findTypeError = async (text: string) => within(getTypeFormItem()).findByText(text)

// description field
const getDescriptionFormItem = () => within(getContainer()).getByTestId('description-form-item')

const getDescriptionField = () =>
  within(getDescriptionFormItem()).getByPlaceholderText('Укажите описание')

const setDescription = async (user: UserEvent, value: string) => {
  const field = getDescriptionField()
  await user.type(field, value)
  return field
}

// attachments
const getAttachmentsFormItem = () => within(getContainer()).getByTestId('attachments-form-item')

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
const getExecutorFormItem = () => within(getContainer()).getByTestId('executor-form-item')
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
const getNomenclatureFormItem = () => within(getContainer()).getByTestId('nomenclatures-form-item')
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
const getWarehouseFormItem = () => within(getContainer()).getByTestId('warehouses-form-item')
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

export const testUtils = {
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
}

// todo: добавить тесты по другим полям

describe('Модалка создания запроса на инвентаризацию', () => {
  describe('Поле описания', () => {
    test('Отображается', () => {
      render(<CreateInventorizationRequestModal {...props} />)
      const field = testUtils.getDescriptionField()
      expect(field).toBeInTheDocument()
      expect(field).toBeEnabled()
    })

    test('Можно установить значение', async () => {
      const { user } = render(<CreateInventorizationRequestModal {...props} />)
      const value = fakeWord()
      const field = await testUtils.setDescription(user, value)
      expect(field).toHaveDisplayValue(value)
    })
  })

  describe('Вложения', () => {
    test('Кнопка отображается и активна', () => {
      render(<CreateInventorizationRequestModal {...props} />)

      const button = testUtils.getAddAttachmentsButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Загрузка работает', async () => {
      const { user } = render(<CreateInventorizationRequestModal {...props} />)

      const { input, file } = await testUtils.setAttachment(user)
      const uploadedFile = testUtils.getUploadedAttachment(file.name)

      expect(input.files!.item(0)).toBe(file)
      expect(input.files).toHaveLength(1)
      expect(uploadedFile).toBeInTheDocument()
      expect(props.onCreateAttachment).toBeCalledTimes(1)
      expect(props.onCreateAttachment).toBeCalledWith(expect.anything())
    })

    test('Удаление работает', async () => {
      const { user } = render(<CreateInventorizationRequestModal {...props} />)

      const { file } = await testUtils.setAttachment(user)
      await testUtils.clickDeleteAttachmentButton(user)
      const uploadedFile = testUtils.queryUploadedAttachment(file.name)

      expect(uploadedFile).not.toBeInTheDocument()
      expect(props.onDeleteAttachment).toBeCalledTimes(1)
      expect(props.onDeleteAttachment).toBeCalledWith(expect.anything())
    })
  })
})
