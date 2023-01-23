import {
  generateWord,
  getButtonIn,
  loadingFinishedByButton,
  loadingStartedByButton,
  render,
  validatingFinished,
} from '_tests_/utils'
import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import {
  validationMessages,
  validationSizes,
} from 'shared/constants/validation'

import CreateCommentForm from './index'
import { CreateCommentFormProps } from './interfaces'

const requiredProps: Readonly<CreateCommentFormProps> = {
  isLoading: false,
  onSubmit: jest.fn(),
}

const getContainer = () => screen.getByTestId('create-comment-form')

const findChildByText = (text: string) =>
  within(getContainer()).findByText(text)

const getCommentField = () =>
  within(getContainer()).getByTestId('field-comment')

const findCommentFieldError = (error: string) =>
  within(getCommentField()).findByText(error)

const getCommentInput = () =>
  within(getCommentField()).getByPlaceholderText(
    'Дополните информацию о заявке',
  )

const userEntersComment = async (user: UserEvent, comment: string) => {
  const input = getCommentInput()
  await user.type(input, comment)
  return input
}

const commentValidatingFinished = async () => {
  const commentField = getCommentField()
  await validatingFinished(commentField)
  return commentField
}

const getSubmitButton = () =>
  getButtonIn(getContainer(), /опубликовать комментарий/i)

const userClickSubmitButton = async (user: UserEvent) => {
  const button = getSubmitButton()
  await user.click(button)
  return button
}

const loadingStarted = async () => {
  const submitButton = getSubmitButton()
  await loadingStartedByButton(submitButton)
}

const loadingFinished = async () => {
  const submitButton = getSubmitButton()
  await loadingFinishedByButton(submitButton)
}

export const testUtils = {
  getContainer,
  findChildByText,

  getCommentField,
  findCommentFieldError,
  getCommentInput,
  userEntersComment,
  commentValidatingFinished,

  getSubmitButton,
  userClickSubmitButton,

  loadingStarted,
  loadingFinished,
}

describe('Форма добавления комментария', () => {
  describe('Поле ввода комментария', () => {
    test('Отображается корректно', () => {
      render(<CreateCommentForm {...requiredProps} />)

      const commentInput = testUtils.getCommentInput()

      expect(commentInput).toBeInTheDocument()
      expect(commentInput).not.toHaveValue()
      expect(commentInput).toBeEnabled()
    })

    test('Не активно при загрузке', () => {
      render(<CreateCommentForm {...requiredProps} isLoading />)

      const commentInput = testUtils.getCommentInput()
      expect(commentInput).toBeDisabled()
    })

    test('Можно ввести значение', async () => {
      const { user } = render(<CreateCommentForm {...requiredProps} />)

      const commentText = generateWord()
      const commentInput = await testUtils.userEntersComment(user, commentText)

      expect(commentInput).toHaveValue(commentText)
    })

    describe('Отображает ошибку', () => {
      test('Если превысить лимит символов', async () => {
        const { user } = render(<CreateCommentForm {...requiredProps} />)

        await testUtils.userEntersComment(
          user,
          generateWord({ length: validationSizes.string.long + 1 }),
        )

        expect(
          await testUtils.findCommentFieldError(
            validationMessages.string.max.long,
          ),
        ).toBeInTheDocument()
      })

      test('Если ввести только пробелы', async () => {
        const { user } = render(<CreateCommentForm {...requiredProps} />)

        await testUtils.userEntersComment(user, ' ')
        const error = await testUtils.findCommentFieldError(
          validationMessages.canNotBeEmpty,
        )

        expect(error).toBeInTheDocument()
      })

      test('Если не заполнить поле и нажать кнопку отправки', async () => {
        const { user } = render(<CreateCommentForm {...requiredProps} />)

        await testUtils.userClickSubmitButton(user)
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
      await testUtils.loadingStarted()
    })

    test('Обработчик вызывается корректно', async () => {
      const { user } = render(<CreateCommentForm {...requiredProps} />)

      await testUtils.userEntersComment(user, generateWord())
      await testUtils.userClickSubmitButton(user)

      expect(requiredProps.onSubmit).toBeCalledTimes(1)
    })
  })
})
