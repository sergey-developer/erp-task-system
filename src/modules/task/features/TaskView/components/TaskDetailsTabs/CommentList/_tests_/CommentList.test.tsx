import { getTaskComment } from '_fixtures_/task'
import {
  generateWord,
  render,
  setupApiTests,
  waitFinishLoadingByButton,
  waitFinishValidating,
  waitFor,
  waitStartLoadingByButton,
  within,
} from '_tests_/utils'
import { getStoreWithAuth } from '_tests_/utils/auth'
import { REQUIRED_FIELD_MSG } from 'shared/constants/validation'

import {
  getCommentField,
  getCommentInput,
  getFormContainer,
  getSubmitButton,
} from '../AddCommentForm/_tests_/utils'
import CommentList from '../index'
import { baseProps } from './constants'
import {
  mockCreateTaskCommentBadRequestError,
  mockCreateTaskCommentSuccess,
  mockGetTaskCommentListSuccess,
} from './mocks'
import { getFirstComment } from './utils'

setupApiTests()

describe('Список комментариев заявки', () => {
  describe('Форма добавления заявки', () => {
    test('Отображается', () => {
      render(<CommentList {...baseProps} />)

      const formContainer = getFormContainer()
      expect(formContainer).toBeInTheDocument()
    })

    describe('При успешном запросе', () => {
      test('Корректно добавляет комментарий в список', async () => {
        const newComment = getTaskComment()
        mockCreateTaskCommentSuccess(newComment)
        mockGetTaskCommentListSuccess([getTaskComment()])

        const store = getStoreWithAuth()

        const { user } = render(<CommentList {...baseProps} />, { store })

        const submitButton = getSubmitButton()
        const commentField = getCommentField()
        const commentInput = getCommentInput()

        await user.type(commentInput, newComment.text)
        await waitFinishValidating(commentField)

        await user.click(submitButton)
        await waitStartLoadingByButton(submitButton)
        await waitFinishLoadingByButton(submitButton)

        const firstComment = getFirstComment()
        const newCommentText = within(firstComment).getByText(newComment.text)

        expect(newCommentText).toBeInTheDocument()
      })

      test('Сбрасывает значения полей', async () => {
        const newComment = getTaskComment()
        mockCreateTaskCommentSuccess(newComment)
        mockGetTaskCommentListSuccess([])

        const store = getStoreWithAuth()

        const { user } = render(<CommentList {...baseProps} />, { store })

        const submitButton = getSubmitButton()
        const commentField = getCommentField()
        const commentInput = getCommentInput()

        await user.type(commentInput, newComment.text)
        await waitFinishValidating(commentField)

        await user.click(submitButton)
        await waitStartLoadingByButton(submitButton)
        await waitFinishLoadingByButton(submitButton)

        expect(getCommentInput()).not.toHaveValue()
      })
    })

    describe('При не успешном запросе', () => {
      test('Корректно обрабатывается ошибка - 400', async () => {
        mockGetTaskCommentListSuccess([])
        mockCreateTaskCommentBadRequestError()

        const store = getStoreWithAuth()
        const { user } = render(<CommentList {...baseProps} />, { store })

        const submitButton = getSubmitButton()
        const commentField = getCommentField()
        const commentInput = getCommentInput()

        await user.type(commentInput, generateWord())
        await waitFinishValidating(commentField)

        await user.click(submitButton)
        await waitStartLoadingByButton(submitButton)
        await waitFinishLoadingByButton(submitButton)

        await waitFor(() => {
          const errorMsg = within(commentField).getByText(REQUIRED_FIELD_MSG)
          expect(errorMsg).toBeInTheDocument()
        })
      })
    })
  })
})
