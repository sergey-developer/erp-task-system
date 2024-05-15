import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { SEND_TEXT } from 'shared/constants/common'
import { validationMessages } from 'shared/constants/validation'

import { buttonTestUtils, fakeEmail, fakeWord, render, selectTestUtils } from '_tests_/utils'

import catalogsFixtures from '../../../../_tests_/fixtures/catalogs'
import CreateRegistrationFNRequestModal from './index'
import { CreateRegistrationFNRequestModalProps } from './types'

const props: CreateRegistrationFNRequestModalProps = {
  open: true,
  confirmLoading: false,
  values: {},
  onSubmit: jest.fn(),
  onCancel: jest.fn(),

  email: [],
  emailAsCopy: [],
  recipientsIsLoading: false,

  changeTypes: [],
  changeTypesIsLoading: false,

  onCreateAttachment: jest.fn(),
}

const getContainer = () => screen.getByTestId('create-registration-fn-request-modal')
const findContainer = () => screen.findByTestId('create-registration-fn-request-modal')

// change type field
const getChangeTypeFormItem = () => within(getContainer()).getByTestId('change-type-form-item')
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
const getAttachmentsFormItem = () => within(getContainer()).getByTestId('attachments-form-item')

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

export const testUtils = {
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

describe('Модалка создания запроса на регистрацию ФН', () => {
  test('Заголовок и описание отображаются', async () => {
    render(<CreateRegistrationFNRequestModal {...props} />)

    const container = testUtils.getContainer()
    const title = within(container).getByText('Отправка запроса на регистрацию ФН')
    const description = within(container).getByText(
      /Для регистрации фискального накопителя система автоматически направит письмо с прикрепленными файлами. Результат обработки запроса будет отображен в журнале заявки/,
    )

    expect(title).toBeInTheDocument()
    expect(description).toBeInTheDocument()
  })

  test('Получатели и получатели копии отображаются', async () => {
    render(
      <CreateRegistrationFNRequestModal
        {...props}
        email={[fakeEmail(), fakeEmail()]}
        emailAsCopy={[fakeEmail(), fakeEmail()]}
      />,
    )

    const container = testUtils.getContainer()

    const emailContainer = within(container).getByTestId('email')
    const emailAsCopyContainer = within(container).getByTestId('email-as-copy')

    props.email.forEach((e) => {
      const text = within(emailContainer).getByText(e)
      expect(text).toBeInTheDocument()
    })

    props.emailAsCopy.forEach((e) => {
      const text = within(emailAsCopyContainer).getByText(e)
      expect(text).toBeInTheDocument()
    })
  })

  describe('Тип замены ФН', () => {
    test('Можно выбрать значение', async () => {
      const changeType = catalogsFixtures.faChangeTypeListItem()

      const { user } = render(
        <CreateRegistrationFNRequestModal {...props} changeTypes={[changeType]} />,
      )

      await testUtils.openChangeTypeSelect(user)
      await testUtils.setChangeType(user, changeType.title)
      const option = testUtils.getSelectedChangeType()

      expect(option).toBeInTheDocument()
    })

    test('Обязательное поле', async () => {
      const { user } = render(<CreateRegistrationFNRequestModal {...props} />)

      await testUtils.clickSubmitButton(user)
      const error = await testUtils.findChangeTypeError(validationMessages.required)

      expect(error).toBeInTheDocument()
    })
  })

  describe('Вложения', () => {
    test('Загрузка работает', async () => {
      const { user } = render(<CreateRegistrationFNRequestModal {...props} />)

      const { input, file } = await testUtils.setAttachment(user)
      const uploadedFile = testUtils.getUploadedAttachment(file.name)

      expect(input.files!.item(0)).toBe(file)
      expect(input.files).toHaveLength(1)
      expect(uploadedFile).toBeInTheDocument()
      // expect(props.onCreateAttachment).toBeCalledTimes(1)
      // expect(props.onCreateAttachment).toBeCalledWith(expect.anything())
    })

    test('Удаление работает', async () => {
      const { user } = render(<CreateRegistrationFNRequestModal {...props} />)

      const { file } = await testUtils.setAttachment(user)
      await testUtils.clickDeleteAttachmentButton(user)
      const uploadedFile = testUtils.queryUploadedAttachment(file.name)

      expect(uploadedFile).not.toBeInTheDocument()
    })
  })
})
