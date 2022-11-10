import { generateWord, loadingStartedByButton, render } from '_tests_/utils'
import { screen } from '@testing-library/react'
import {
  DEFAULT_LONG_TEXT_LENGTH,
  FIELD_CAN_NOT_BE_EMPTY_MSG,
  REQUIRED_FIELD_MSG,
  TEXT_MAX_LENGTH_MSG,
} from 'shared/constants/validation'

import CreateCommentForm from '../index'
import { requiredProps } from './constants'
import testUtils from './utils'

jest.setTimeout(10000)

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

      const commentInput = testUtils.getCommentInput()
      const commentText = generateWord()
      await user.type(commentInput, commentText)

      expect(commentInput).toHaveValue(commentText)
    })

    describe('Отображает ошибку', () => {
      test('Если превысить лимит символов', async () => {
        const { user } = render(<CreateCommentForm {...requiredProps} />)

        const commentInput = testUtils.getCommentInput()
        const commentText = generateWord({
          length: DEFAULT_LONG_TEXT_LENGTH + 1,
        })
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
        const { user } = render(<CreateCommentForm {...requiredProps} />)

        const commentInput = testUtils.getCommentInput()
        await user.type(commentInput, ' ')

        const errorMessage = await screen.findByText(FIELD_CAN_NOT_BE_EMPTY_MSG)
        expect(errorMessage).toBeInTheDocument()
      })

      test('Если не заполнить поле и нажать кнопку отправки', async () => {
        const { user } = render(<CreateCommentForm {...requiredProps} />)

        const submitButton = testUtils.getSubmitButton()
        await user.click(submitButton)

        const errorMessage = await screen.findByText(REQUIRED_FIELD_MSG)
        expect(errorMessage).toBeInTheDocument()
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

      const submitButton = testUtils.getSubmitButton()
      await loadingStartedByButton(submitButton)
    })

    test('Обработчик вызывается корректно', async () => {
      const { user } = render(<CreateCommentForm {...requiredProps} />)

      const commentInput = testUtils.getCommentInput()
      const submitButton = testUtils.getSubmitButton()

      await user.type(commentInput, generateWord())
      await user.click(submitButton)

      expect(requiredProps.onSubmit).toBeCalledTimes(1)
    })
  })
})
