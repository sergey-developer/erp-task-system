import {
  generateWord,
  render,
  screen,
  waitStartLoadingByButton,
} from '_tests_/utils'
import {
  DEFAULT_LONG_TEXT_LENGTH,
  FIELD_CAN_NOT_BE_EMPTY_MSG,
  REQUIRED_FIELD_MSG,
  TEXT_MAX_LENGTH_MSG,
} from 'shared/constants/validation'

import AddCommentForm from '../index'
import { baseProps } from './constants'
import { getCommentInput, getSubmitButton } from './utils'

jest.setTimeout(10000)

describe('Форма добавления комментария', () => {
  describe('Поле ввода комментария', () => {
    test('Отображается корректно', () => {
      render(<AddCommentForm {...baseProps} />)

      const commentInput = getCommentInput()

      expect(commentInput).toBeInTheDocument()
      expect(commentInput).not.toHaveValue()
      expect(commentInput).toBeEnabled()
    })

    test('Не активно в процессе загрузки', () => {
      render(<AddCommentForm {...baseProps} isLoading />)

      const commentInput = getCommentInput()
      expect(commentInput).toBeDisabled()
    })

    test('Можно ввести комментарий', async () => {
      const { user } = render(<AddCommentForm {...baseProps} />)

      const commentInput = getCommentInput()
      const commentText = generateWord()
      await user.type(commentInput, commentText)

      expect(commentInput).toHaveValue(commentText)
    })

    describe('Отображает ошибку', () => {
      test('Если превысить лимит символов', async () => {
        const { user } = render(<AddCommentForm {...baseProps} />)

        const commentInput = getCommentInput()
        const commentText = generateWord({ length: 501 })
        await user.type(commentInput, commentText)

        const errorMessage = await screen.findByText(
          TEXT_MAX_LENGTH_MSG.replace(
            // eslint-disable-next-line no-template-curly-in-string
            '${max}',
            String(DEFAULT_LONG_TEXT_LENGTH),
          ),
        )

        expect(errorMessage).toBeInTheDocument()
      })

      test('Если ввести только пробелы', async () => {
        const { user } = render(<AddCommentForm {...baseProps} />)

        const commentInput = getCommentInput()
        await user.type(commentInput, ' ')

        const errorMessage = await screen.findByText(FIELD_CAN_NOT_BE_EMPTY_MSG)
        expect(errorMessage).toBeInTheDocument()
      })

      test('Если не заполнить поле и нажать кнопку отправки', async () => {
        const { user } = render(<AddCommentForm {...baseProps} />)

        const submitButton = getSubmitButton()
        await user.click(submitButton)

        const errorMessage = await screen.findByText(REQUIRED_FIELD_MSG)
        expect(errorMessage).toBeInTheDocument()
      })
    })
  })

  describe('Кнопка отправки комментария', () => {
    test('Отображается корректно', () => {
      render(<AddCommentForm {...baseProps} />)

      const submitButton = getSubmitButton()

      expect(submitButton).toBeInTheDocument()
      expect(submitButton).toBeEnabled()
    })

    test('Отображает процесс загрузки', async () => {
      render(<AddCommentForm {...baseProps} isLoading />)

      const submitButton = getSubmitButton()
      await waitStartLoadingByButton(submitButton)
    })
  })

  test('Обработчик отправки формы вызывается корректно', async () => {
    const { user } = render(<AddCommentForm {...baseProps} />)

    const commentInput = getCommentInput()
    const submitButton = getSubmitButton()

    await user.type(commentInput, generateWord())
    await user.click(submitButton)

    expect(baseProps.onSubmit).toHaveBeenCalledTimes(1)
  })
})
