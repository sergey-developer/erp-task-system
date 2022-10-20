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
import { asyncNoop } from 'shared/utils/common/noop'

import AddCommentForm from '../index'
import { AddCommentFormProps } from '../interfaces'
import { getComment, getSubmitButton } from './utils'

const baseProps: Readonly<AddCommentFormProps> = {
  isLoading: false,
  onSubmit: asyncNoop,
}

jest.setTimeout(10000)

describe('Форма добавления комментария', () => {
  describe('Поле ввода комментария', () => {
    test('Отображается корректно', () => {
      render(<AddCommentForm {...baseProps} />)

      const comment = getComment()

      expect(comment).toBeInTheDocument()
      expect(comment).not.toHaveValue()
      expect(comment).toBeEnabled()
    })

    test('Не активно в процессе загрузки', () => {
      render(<AddCommentForm {...baseProps} isLoading />)

      const comment = getComment()
      expect(comment).toBeDisabled()
    })

    test('Можно ввести комментарий', async () => {
      const { user } = render(<AddCommentForm {...baseProps} />)

      const comment = getComment()
      const commentText = generateWord()
      await user.type(comment, commentText)

      expect(comment).toHaveValue(commentText)
    })

    describe('Отображает ошибку', () => {
      test('Если превысить лимит символов', async () => {
        const { user } = render(<AddCommentForm {...baseProps} />)

        const comment = getComment()
        const commentText = generateWord({ length: 501 })
        await user.type(comment, commentText)

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

        const comment = getComment()
        await user.type(comment, ' ')

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

    test('Не активна в процессе загрузки', async () => {
      render(<AddCommentForm {...baseProps} isLoading />)

      const submitButton = getSubmitButton()
      await waitStartLoadingByButton(submitButton)
    })
  })
})
