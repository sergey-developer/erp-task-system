import { getTaskComment } from '_fixtures_/task'
import {
  generateWord,
  render,
  screen,
  setupApiTests,
  waitFinishLoadingByButton,
  waitFinishValidating,
  waitFor,
  waitStartLoadingByButton,
  within,
} from '_tests_/utils'
import { getStoreWithAuth } from '_tests_/utils/auth'
import { CREATE_TASK_COMMENT_ERROR_MSG } from 'modules/task/features/TaskView/constants/messages'
import {
  REQUIRED_FIELD_MSG,
  UNKNOWN_ERROR_MSG,
} from 'shared/constants/validation'

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
  mockCreateTaskCommentSuccess,
  mockGetTaskCommentListSuccess,
} from './mocks'
import { getFirstComment } from './utils'

setupApiTests()

describe('Вкладка списка комментариев заявки', () => {
  describe('Форма добавления заявки', () => {
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

        const { user } = render(<CommentListTab {...baseProps} />, {
          store: getStoreWithAuth(),
        })

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
      test('Корректно обрабатывается ошибка 400', async () => {
        mockGetTaskCommentListSuccess([])
        mockCreateTaskCommentBadRequestError()

        const { user } = render(<CommentListTab {...baseProps} />, {
          store: getStoreWithAuth(),
        })

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
        await waitStartLoadingByButton(submitButton)
        await waitFinishLoadingByButton(submitButton)

        const errorMsg = screen.getByText(CREATE_TASK_COMMENT_ERROR_MSG)
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
        await waitStartLoadingByButton(submitButton)
        await waitFinishLoadingByButton(submitButton)

        const errorMsg = screen.getByText(UNKNOWN_ERROR_MSG)
        expect(errorMsg).toBeInTheDocument()
      })
    })
  })
})
