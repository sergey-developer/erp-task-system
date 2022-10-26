import head from 'lodash/head'

import {
  generateWord,
  loadingFinishedByButton,
  loadingStartedByButton,
  render,
  setupApiTests,
  setupNotifications,
  waitFinishValidating,
} from '_tests_/utils'
import { getStoreWithAuth } from '_tests_/utils/auth'
import { screen, within } from '@testing-library/react'
import { getTaskComment } from 'fixtures/task'
import { CREATE_TASK_COMMENT_ERROR_MSG } from 'modules/task/features/TaskView/constants/messages'
import { UNKNOWN_ERROR_MSG } from 'shared/constants/validation'

import {
  getCommentField,
  getCommentInput,
  getFormContainer,
  getSubmitButton,
} from '../CreateCommentForm/_tests_/utils'
import CommentListTab from '../index'
import { baseProps } from './constants'
import {
  mockCreateTaskCommentBadRequestError,
  mockCreateTaskCommentForbiddenError,
  mockCreateTaskCommentNotFoundError,
  mockCreateTaskCommentServerError,
  mockCreateTaskCommentSuccess,
  mockGetTaskCommentListSuccess,
} from './mocks'
import { getFirstComment } from './utils'

setupApiTests()

describe('Вкладка списка комментариев заявки', () => {
  describe('Форма добавления заявки', () => {
    describe('Роль - любая', () => {
      test('Отображается', () => {
        render(<CommentListTab {...baseProps} />)

        const formContainer = getFormContainer()
        expect(formContainer).toBeInTheDocument()
      })

      describe('При успешном запросе', () => {
        test('Корректно добавляет комментарий в список', async () => {
          const newComment = getTaskComment()
          mockCreateTaskCommentSuccess(newComment)
          mockGetTaskCommentListSuccess([getTaskComment()])

          const { user } = render(<CommentListTab {...baseProps} />, {
            store: getStoreWithAuth(),
          })

          const submitButton = getSubmitButton()
          const commentField = getCommentField()
          const commentInput = getCommentInput()

          await user.type(commentInput, newComment.text)
          await waitFinishValidating(commentField)

          await user.click(submitButton)
          await loadingStartedByButton(submitButton)
          await loadingFinishedByButton(submitButton)

          const firstComment = getFirstComment()
          const newCommentText = within(firstComment).getByText(newComment.text)

          expect(newCommentText).toBeInTheDocument()
        })

        test('Сбрасывает значения полей', async () => {
          const newComment = getTaskComment()
          mockCreateTaskCommentSuccess(newComment)
          mockGetTaskCommentListSuccess([])

          const { user } = render(<CommentListTab {...baseProps} />, {
            store: getStoreWithAuth(),
          })

          const submitButton = getSubmitButton()
          const commentField = getCommentField()
          const commentInput = getCommentInput()

          await user.type(commentInput, newComment.text)
          await waitFinishValidating(commentField)

          await user.click(submitButton)
          await loadingStartedByButton(submitButton)
          await loadingFinishedByButton(submitButton)

          expect(getCommentInput()).not.toHaveValue()
        })
      })

      describe('При не успешном запросе', () => {
        setupNotifications()

        test('Корректно обрабатывается ошибка 400', async () => {
          const badRequestErrorResponse = { comment: [generateWord()] }
          mockCreateTaskCommentBadRequestError(badRequestErrorResponse)
          mockGetTaskCommentListSuccess([])

          const { user } = render(<CommentListTab {...baseProps} />, {
            store: getStoreWithAuth(),
          })

          const submitButton = getSubmitButton()
          const commentField = getCommentField()
          const commentInput = getCommentInput()

          await user.type(commentInput, generateWord())
          await waitFinishValidating(commentField)

          await user.click(submitButton)
          await loadingStartedByButton(submitButton)
          await loadingFinishedByButton(submitButton)

          const errorMsg = await within(commentField).findByText(
            head(badRequestErrorResponse.comment)!,
          )
          expect(errorMsg).toBeInTheDocument()
        })

        test('Корректно обрабатывается ошибка 404', async () => {
          mockGetTaskCommentListSuccess([])
          mockCreateTaskCommentNotFoundError()

          const { user } = render(<CommentListTab {...baseProps} />, {
            store: getStoreWithAuth(),
          })

          const submitButton = getSubmitButton()
          const commentField = getCommentField()
          const commentInput = getCommentInput()

          await user.type(commentInput, generateWord())
          await waitFinishValidating(commentField)

          await user.click(submitButton)
          await loadingStartedByButton(submitButton)
          await loadingFinishedByButton(submitButton)

          const errorMsg = await screen.findByText(
            CREATE_TASK_COMMENT_ERROR_MSG,
          )
          expect(errorMsg).toBeInTheDocument()
        })

        test('Корректно обрабатывается ошибка 500', async () => {
          mockGetTaskCommentListSuccess([])
          mockCreateTaskCommentServerError()

          const { user } = render(<CommentListTab {...baseProps} />, {
            store: getStoreWithAuth(),
          })

          const submitButton = getSubmitButton()
          const commentField = getCommentField()
          const commentInput = getCommentInput()

          await user.type(commentInput, generateWord())
          await waitFinishValidating(commentField)

          await user.click(submitButton)
          await loadingStartedByButton(submitButton)
          await loadingFinishedByButton(submitButton)

          const errorMsg = await screen.findByText(
            CREATE_TASK_COMMENT_ERROR_MSG,
          )
          expect(errorMsg).toBeInTheDocument()
        })

        test('Корректно обрабатывается неизвестная ошибка', async () => {
          mockGetTaskCommentListSuccess([])
          mockCreateTaskCommentForbiddenError()

          const { user } = render(<CommentListTab {...baseProps} />, {
            store: getStoreWithAuth(),
          })

          const submitButton = getSubmitButton()
          const commentField = getCommentField()
          const commentInput = getCommentInput()

          await user.type(commentInput, generateWord())
          await waitFinishValidating(commentField)

          await user.click(submitButton)
          await loadingStartedByButton(submitButton)
          await loadingFinishedByButton(submitButton)

          const errorMsg = await screen.findByText(UNKNOWN_ERROR_MSG)
          expect(errorMsg).toBeInTheDocument()
        })
      })
    })
  })
})
