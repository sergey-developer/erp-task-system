import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { validationMessages } from 'shared/constants/validation'

import { buttonTestUtils, fakeWord, render } from '_tests_/utils'

import CreateCommentForm from './index'
import { CreateCommentFormProps } from './types'

const props: Readonly<CreateCommentFormProps> = {
  isLoading: false,
  onSubmit: jest.fn(),
}

const getContainer = () => screen.getByTestId('create-comment-form')

const findChildByText = (text: string) => within(getContainer()).findByText(text)

// comment
const getCommentFormItem = () => within(getContainer()).getByTestId('comment-form-item')

const findCommentError = (error: string) => within(getCommentFormItem()).findByText(error)

const getCommentField = () =>
  within(getCommentFormItem()).getByPlaceholderText('Дополните информацию о заявке')

const setComment = async (user: UserEvent, comment: string) => {
  const input = getCommentField()
  await user.type(input, comment)
  return input
}

// attachment
const getAttachmentsFormItem = () => within(getContainer()).getByTestId('attachments-form-item')

const getAddAttachmentsButton = () =>
  buttonTestUtils.getAllButtonIn(getAttachmentsFormItem(), /Добавить вложение/)[1]

const getAddAttachmentsZoneButton = () =>
  buttonTestUtils.getAllButtonIn(getAttachmentsFormItem(), /Добавить вложение/)[0]

const clickAddAttachmentsButton = async (user: UserEvent) => {
  const button = getAddAttachmentsButton()
  await user.click(button)
}

const setAttachment = async (
  user: UserEvent,
  file: File = new File([], fakeWord(), { type: 'image/png' }),
) => {
  const button = getAddAttachmentsZoneButton()
  // eslint-disable-next-line testing-library/no-node-access
  const input = button.querySelector('input[type="file"]') as HTMLInputElement
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

export const testUtils = {
  getContainer,
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

describe('Форма добавления комментария', () => {
  describe('Поле ввода комментария', () => {
    test('Отображается корректно', () => {
      render(<CreateCommentForm {...props} />)

      const commentInput = testUtils.getCommentField()

      expect(commentInput).toBeInTheDocument()
      expect(commentInput).not.toHaveValue()
      expect(commentInput).toBeEnabled()
    })

    test('Не активно при загрузке', () => {
      render(<CreateCommentForm {...props} isLoading />)

      const commentInput = testUtils.getCommentField()
      expect(commentInput).toBeDisabled()
    })

    test('Можно ввести значение', async () => {
      const { user } = render(<CreateCommentForm {...props} />)

      const commentText = fakeWord()
      const commentInput = await testUtils.setComment(user, commentText)

      expect(commentInput).toHaveValue(commentText)
    })

    describe('Отображает ошибку', () => {
      test('Если ввести только пробелы', async () => {
        const { user } = render(<CreateCommentForm {...props} />)

        await testUtils.setComment(user, ' ')
        const error = await testUtils.findCommentError(validationMessages.canNotBeEmpty)

        expect(error).toBeInTheDocument()
      })

      test('Если не заполнить поле и нажать кнопку отправки', async () => {
        const { user } = render(<CreateCommentForm {...props} />)

        await testUtils.clickSubmitButton(user)
        const error = await testUtils.findCommentError(validationMessages.required)

        expect(error).toBeInTheDocument()
      })
    })
  })

  describe('Поле добавления вложения', () => {
    test('Кнопка отображается корректно', () => {
      render(<CreateCommentForm {...props} />)

      const button = testUtils.getAddAttachmentsButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Загрузка вложения работает корректно', async () => {
      const { user } = render(<CreateCommentForm {...props} />)

      const { input, file } = await testUtils.setAttachment(user)
      const uploadedAttachment = testUtils.getUploadedAttachment(file.name)

      expect(input.files!.item(0)).toBe(file)
      expect(input.files).toHaveLength(1)
      expect(uploadedAttachment).toBeInTheDocument()
    })

    test('Кнопка не активна во время загрузки', () => {
      render(<CreateCommentForm {...props} isLoading />)
      const button = testUtils.getAddAttachmentsButton()
      expect(button).toBeDisabled()
    })
  })

  describe('Кнопка отправки', () => {
    test('Отображается корректно', () => {
      render(<CreateCommentForm {...props} />)

      const button = testUtils.getSubmitButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Отображает процесс загрузки', async () => {
      render(<CreateCommentForm {...props} isLoading />)
      await testUtils.expectLoadingStarted()
    })

    test('Обработчик вызывается корректно', async () => {
      const { user } = render(<CreateCommentForm {...props} />)

      await testUtils.setComment(user, fakeWord())
      await testUtils.setAttachment(user)
      await testUtils.clickSubmitButton(user)

      expect(props.onSubmit).toBeCalledTimes(1)
      expect(props.onSubmit).toBeCalledWith(expect.anything(), expect.anything())
    })
  })
})
