import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { validationMessages } from 'shared/constants/validation'

import { buttonTestUtils, render } from '_tests_/utils'

import ExecuteRelocationTaskModal from './index'
import { ExecuteRelocationTaskModalProps } from './types'

const props: Readonly<ExecuteRelocationTaskModalProps> = {
  open: true,
  isLoading: false,
  onSubmit: jest.fn(),
  onCancel: jest.fn(),
}

const getContainer = () => screen.getByTestId('execute-relocation-task-modal')
const findContainer = () => screen.findByTestId('execute-relocation-task-modal')

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
const getDocumentsFormItem = () => within(getContainer()).getByTestId('documents-form-item')

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

export const testUtils = {
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

describe('Модалка выполнения заявки на перемещение', () => {
  test('Заголовок отображается', () => {
    render(<ExecuteRelocationTaskModal {...props} />)
    const title = within(getContainer()).getByText('Решение по заявке')
    expect(title).toBeInTheDocument()
  })

  describe('Кнопка отмены', () => {
    test('Отображается корректно', () => {
      render(<ExecuteRelocationTaskModal {...props} />)

      const button = testUtils.getCancelButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Обработчик вызывается корректно', async () => {
      const { user } = render(<ExecuteRelocationTaskModal {...props} />)

      await testUtils.clickCancelButton(user)
      expect(props.onCancel).toBeCalledTimes(1)
    })
  })

  describe('Кнопка отправки', () => {
    test('Отображается корректно', () => {
      render(<ExecuteRelocationTaskModal {...props} />)

      const button = testUtils.getSubmitButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Обработчик вызывается если обязательные поля заполнены', async () => {
      const { user } = render(<ExecuteRelocationTaskModal {...props} />)

      await testUtils.setDocument(user)
      await testUtils.clickSubmitButton(user)

      expect(props.onSubmit).toBeCalledTimes(1)
      expect(props.onSubmit).toBeCalledWith(expect.anything(), expect.anything())
    })
  })

  describe('Поле добавления документов', () => {
    test('Кнопка отображается корректно', () => {
      render(<ExecuteRelocationTaskModal {...props} />)

      const button = testUtils.getAddDocumentsButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Можно загрузить документ', async () => {
      const { user } = render(<ExecuteRelocationTaskModal {...props} />)

      const { input, file } = await testUtils.setDocument(user)

      expect(input.files!.item(0)).toBe(file)
      expect(input.files).toHaveLength(1)
    })

    test('После загрузки документ отображается', async () => {
      const { user } = render(<ExecuteRelocationTaskModal {...props} />)

      const { file } = await testUtils.setDocument(user)

      const uploadedDocument = testUtils.getUploadedDocument(file.name)
      expect(uploadedDocument).toBeInTheDocument()
    })

    test('Отображается ошибка если не заполнить поле', async () => {
      const { user } = render(<ExecuteRelocationTaskModal {...props} />)

      await testUtils.clickSubmitButton(user)

      const error = await testUtils.findDocumentsError(validationMessages.required)
      expect(error).toBeInTheDocument()
    })
  })
})
