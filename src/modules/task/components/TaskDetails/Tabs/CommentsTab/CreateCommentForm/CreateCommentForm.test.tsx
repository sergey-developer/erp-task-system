import { validationMessages } from 'shared/constants/validation'

import { props } from '_tests_/features/tasks/TaskDetails/Tabs/CommentsTab/CreateCommentForm/constants'
import { createCommentFormTestUtils } from '_tests_/features/tasks/TaskDetails/Tabs/CommentsTab/CreateCommentForm/testUtils'
import { fakeWord, render } from '_tests_/utils'

import CreateCommentForm from './index'

describe('Форма добавления комментария заявки', () => {
  describe('Поле ввода комментария', () => {
    test('Отображается корректно', () => {
      render(<CreateCommentForm {...props} />)

      const commentInput = createCommentFormTestUtils.getCommentField()

      expect(commentInput).toBeInTheDocument()
      expect(commentInput).not.toHaveValue()
      expect(commentInput).toBeEnabled()
    })

    test('Не активно при загрузке', () => {
      render(<CreateCommentForm {...props} isLoading />)

      const commentInput = createCommentFormTestUtils.getCommentField()
      expect(commentInput).toBeDisabled()
    })

    test('Можно ввести значение', async () => {
      const { user } = render(<CreateCommentForm {...props} />)

      const commentText = fakeWord()
      const commentInput = await createCommentFormTestUtils.setComment(user, commentText)

      expect(commentInput).toHaveValue(commentText)
    })

    describe('Отображает ошибку', () => {
      test('Если ввести только пробелы', async () => {
        const { user } = render(<CreateCommentForm {...props} />)

        await createCommentFormTestUtils.setComment(user, ' ')
        const error = await createCommentFormTestUtils.findCommentError(
          validationMessages.canNotBeEmpty,
        )

        expect(error).toBeInTheDocument()
      })

      test('Если не заполнить поле и нажать кнопку отправки', async () => {
        const { user } = render(<CreateCommentForm {...props} />)

        await createCommentFormTestUtils.clickSubmitButton(user)
        const error = await createCommentFormTestUtils.findCommentError(validationMessages.required)

        expect(error).toBeInTheDocument()
      })
    })
  })

  describe('Поле добавления вложения', () => {
    test('Кнопка отображается корректно', () => {
      render(<CreateCommentForm {...props} />)

      const button = createCommentFormTestUtils.getAddAttachmentsButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Загрузка вложения работает корректно', async () => {
      const { user } = render(<CreateCommentForm {...props} />)

      const { input, file } = await createCommentFormTestUtils.setAttachment(user)
      const uploadedAttachment = createCommentFormTestUtils.getUploadedAttachment(file.name)

      expect(input.files!.item(0)).toBe(file)
      expect(input.files).toHaveLength(1)
      expect(uploadedAttachment).toBeInTheDocument()
    })

    test('Кнопка не активна во время загрузки', () => {
      render(<CreateCommentForm {...props} isLoading />)
      const button = createCommentFormTestUtils.getAddAttachmentsButton()
      expect(button).toBeDisabled()
    })
  })

  describe('Кнопка отправки', () => {
    test('Отображается корректно', () => {
      render(<CreateCommentForm {...props} />)

      const button = createCommentFormTestUtils.getSubmitButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Отображает процесс загрузки', async () => {
      render(<CreateCommentForm {...props} isLoading />)
      await createCommentFormTestUtils.expectLoadingStarted()
    })

    test('Обработчик вызывается корректно', async () => {
      const { user } = render(<CreateCommentForm {...props} />)

      await createCommentFormTestUtils.setComment(user, fakeWord())
      await createCommentFormTestUtils.setAttachment(user)
      await createCommentFormTestUtils.clickSubmitButton(user)

      expect(props.onSubmit).toBeCalledTimes(1)
      expect(props.onSubmit).toBeCalledWith(expect.anything(), expect.anything())
    })
  })
})
