import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import {
  validationMessages,
  validationSizes,
} from 'shared/constants/validation'

import {
  fakeWord,
  getButtonIn,
  expectLoadingFinishedByButton,
  expectLoadingStartedByButton,
  render,
} from '_tests_/utils'

import CreateCommentForm from './index'
import { CreateCommentFormProps } from './interfaces'

const requiredProps: Readonly<CreateCommentFormProps> = {
  isLoading: false,
  onSubmit: jest.fn(),
}

const getContainer = () => screen.getByTestId('create-comment-form')

const findChildByText = (text: string) =>
  within(getContainer()).findByText(text)

const getCommentFieldContainer = () =>
  within(getContainer()).getByTestId('field-comment')

const findCommentFieldError = (error: string) =>
  within(getCommentFieldContainer()).findByText(error)

const getCommentField = () =>
  within(getCommentFieldContainer()).getByPlaceholderText(
    'Дополните информацию о заявке',
  )

const setComment = async (user: UserEvent, comment: string) => {
  const input = getCommentField()
  await user.type(input, comment)
  return input
}

const getSubmitButton = () =>
  getButtonIn(getContainer(), /опубликовать комментарий/i)

const clickSubmitButton = async (user: UserEvent) => {
  const button = getSubmitButton()
  await user.click(button)
  return button
}

const expectLoadingStarted = async () => {
  const submitButton = getSubmitButton()
  await expectLoadingStartedByButton(submitButton)
}

const expectLoadingFinished = async () => {
  const submitButton = getSubmitButton()
  await expectLoadingFinishedByButton(submitButton)
}

export const testUtils = {
  getContainer,
  findChildByText,

  getCommentFieldContainer,
  findCommentFieldError,
  getCommentField,
  setComment,

  getSubmitButton,
  clickSubmitButton,

  expectLoadingStarted,
  expectLoadingFinished,
}

describe('Форма добавления комментария', () => {
  describe('Поле ввода комментария', () => {
    test('Отображается корректно', () => {
      render(<CreateCommentForm {...requiredProps} />)

      const commentInput = testUtils.getCommentField()

      expect(commentInput).toBeInTheDocument()
      expect(commentInput).not.toHaveValue()
      expect(commentInput).toBeEnabled()
    })

    test('Не активно при загрузке', () => {
      render(<CreateCommentForm {...requiredProps} isLoading />)

      const commentInput = testUtils.getCommentField()
      expect(commentInput).toBeDisabled()
    })

    test('Можно ввести значение', async () => {
      const { user } = render(<CreateCommentForm {...requiredProps} />)

      const commentText = fakeWord()
      const commentInput = await testUtils.setComment(user, commentText)

      expect(commentInput).toHaveValue(commentText)
    })

    describe('Отображает ошибку', () => {
      test('Если превысить лимит символов', async () => {
        const { user } = render(<CreateCommentForm {...requiredProps} />)

        await testUtils.setComment(
          user,
          fakeWord({ length: validationSizes.string.long + 1 }),
        )

        expect(
          await testUtils.findCommentFieldError(
            validationMessages.string.max.long,
          ),
        ).toBeInTheDocument()
      })

      test('Если ввести только пробелы', async () => {
        const { user } = render(<CreateCommentForm {...requiredProps} />)

        await testUtils.setComment(user, ' ')
        const error = await testUtils.findCommentFieldError(
          validationMessages.canNotBeEmpty,
        )

        expect(error).toBeInTheDocument()
      })

      test('Если не заполнить поле и нажать кнопку отправки', async () => {
        const { user } = render(<CreateCommentForm {...requiredProps} />)

        await testUtils.clickSubmitButton(user)
        const error = await testUtils.findCommentFieldError(
          validationMessages.required,
        )

        expect(error).toBeInTheDocument()
      })
    })
  })

  describe('Кнопка отправки', () => {
    test('Отображается корректно', () => {
      render(<CreateCommentForm {...requiredProps} />)

      const submitButton = testUtils.getSubmitButton()

      expect(submitButton).toBeInTheDocument()
      expect(submitButton).toBeEnabled()
    })

    test('Отображает процесс загрузки', async () => {
      render(<CreateCommentForm {...requiredProps} isLoading />)
      await testUtils.expectLoadingStarted()
    })

    test('Обработчик вызывается корректно', async () => {
      const { user } = render(<CreateCommentForm {...requiredProps} />)

      await testUtils.setComment(user, fakeWord())
      await testUtils.clickSubmitButton(user)

      expect(requiredProps.onSubmit).toBeCalledTimes(1)
    })
  })
})
