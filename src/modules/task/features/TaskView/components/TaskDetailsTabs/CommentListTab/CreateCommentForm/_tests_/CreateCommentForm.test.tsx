import { generateWord, render } from '_tests_/utils'
import {
  DEFAULT_LONG_TEXT_LENGTH,
  DEFAULT_LONG_TEXT_MAX_LENGTH_MSG,
  FIELD_CAN_NOT_BE_EMPTY_MSG,
  REQUIRED_FIELD_MSG,
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

      const commentText = generateWord()
      const commentInput = await testUtils.userEntersComment(user, commentText)

      expect(commentInput).toHaveValue(commentText)
    })

    describe('Отображает ошибку', () => {
      test('Если превысить лимит символов', async () => {
        const { user } = render(<CreateCommentForm {...requiredProps} />)

        await testUtils.userEntersComment(
          user,
          generateWord({ length: DEFAULT_LONG_TEXT_LENGTH + 1 }),
        )

        expect(
          await testUtils.findCommentFieldError(
            DEFAULT_LONG_TEXT_MAX_LENGTH_MSG,
          ),
        ).toBeInTheDocument()
      })

      test('Если ввести только пробелы', async () => {
        const { user } = render(<CreateCommentForm {...requiredProps} />)

        await testUtils.userEntersComment(user, ' ')
        const error = await testUtils.findCommentFieldError(
          FIELD_CAN_NOT_BE_EMPTY_MSG,
        )

        expect(error).toBeInTheDocument()
      })

      test('Если не заполнить поле и нажать кнопку отправки', async () => {
        const { user } = render(<CreateCommentForm {...requiredProps} />)

        await testUtils.userClickSubmitButton(user)
        const error = await testUtils.findCommentFieldError(REQUIRED_FIELD_MSG)

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
