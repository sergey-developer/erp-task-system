import head from 'lodash/head'

import {
  mockCreateTaskCommentBadRequestError,
  mockCreateTaskCommentForbiddenError,
  mockCreateTaskCommentNotFoundError,
  mockCreateTaskCommentServerError,
  mockCreateTaskCommentSuccess,
  mockGetTaskCommentListSuccess,
} from '_tests_/mocks/api'
import {
  generateWord,
  getStoreWithAuth,
  loadingFinishedByButton,
  loadingStartedByButton,
  render,
  setupApiTests,
  setupNotifications,
  validatingFinished,
} from '_tests_/utils'
import { screen, within } from '@testing-library/react'
import * as taskFixtures from 'fixtures/task'
import { CREATE_TASK_COMMENT_ERROR_MSG } from 'modules/task/features/TaskView/constants/messages'
import { UNKNOWN_ERROR_MSG } from 'shared/constants/validation'

import {
  getCommentField,
  getCommentInput,
  getFormContainer,
  getSubmitButton,
} from '../CreateCommentForm/_tests_/utils'
import {
  CreateCommentFormErrors,
  CreateCommentFormFields,
} from '../CreateCommentForm/interfaces'
import CommentListTab from '../index'
import { requiredProps } from './constants'
import testUtils from './utils'

setupApiTests()

describe('Вкладка списка комментариев заявки', () => {
  test('Заголовок отображается корректно', () => {
    render(<CommentListTab {...requiredProps} />)
    expect(testUtils.getChildByText(requiredProps.title)).toBeInTheDocument()
  })

  describe('Кнопка раскрытия всех комментариев"', () => {
    test('Отображается корректно если все условия соблюдены', async () => {
      const commentCount = 4
      mockGetTaskCommentListSuccess(
        requiredProps.taskId,
        taskFixtures.getTaskCommentList(commentCount),
      )

      render(<CommentListTab {...requiredProps} />, {
        store: getStoreWithAuth(),
      })

      await testUtils.loadingFinished()
      const button = testUtils.getExpandButton(commentCount)

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })
  })

  describe('Форма добавления заявки', () => {
    describe('Роль - любая', () => {
      test('Отображается', () => {
        render(<CommentListTab {...requiredProps} />)

        const formContainer = getFormContainer()
        expect(formContainer).toBeInTheDocument()
      })

      describe('При успешном запросе', () => {
        test('Корректно добавляет комментарий в список', async () => {
          const newComment = taskFixtures.getTaskComment()
          mockCreateTaskCommentSuccess(requiredProps.taskId, newComment)
          mockGetTaskCommentListSuccess(
            requiredProps.taskId,
            taskFixtures.getTaskCommentList(),
          )

          const { user } = render(<CommentListTab {...requiredProps} />, {
            store: getStoreWithAuth(),
          })

          const submitButton = getSubmitButton()
          const commentField = getCommentField()
          const commentInput = getCommentInput()

          await user.type(commentInput, newComment.text)
          await validatingFinished(commentField)

          await user.click(submitButton)
          await loadingStartedByButton(submitButton)
          await loadingFinishedByButton(submitButton)

          const firstComment = testUtils.getFirstComment()
          const newCommentText = within(firstComment).getByText(newComment.text)

          expect(newCommentText).toBeInTheDocument()
        })

        test('Сбрасывает значения полей', async () => {
          const newComment = taskFixtures.getTaskComment()
          mockCreateTaskCommentSuccess(requiredProps.taskId, newComment)
          mockGetTaskCommentListSuccess(requiredProps.taskId, [])

          const { user } = render(<CommentListTab {...requiredProps} />, {
            store: getStoreWithAuth(),
          })

          const submitButton = getSubmitButton()
          const commentField = getCommentField()
          const commentInput = getCommentInput()

          await user.type(commentInput, newComment.text)
          await validatingFinished(commentField)

          await user.click(submitButton)
          await loadingStartedByButton(submitButton)
          await loadingFinishedByButton(submitButton)

          expect(getCommentInput()).not.toHaveValue()
        })
      })

      describe('При не успешном запросе', () => {
        setupNotifications()

        test('Корректно обрабатывается ошибка 400', async () => {
          mockGetTaskCommentListSuccess(requiredProps.taskId, [])

          const badRequestErrorResponse: CreateCommentFormErrors = {
            comment: [generateWord()],
          }
          mockCreateTaskCommentBadRequestError<CreateCommentFormFields>(
            requiredProps.taskId,
            badRequestErrorResponse,
          )

          const { user } = render(<CommentListTab {...requiredProps} />, {
            store: getStoreWithAuth(),
          })

          const submitButton = getSubmitButton()
          const commentField = getCommentField()
          const commentInput = getCommentInput()

          await user.type(commentInput, generateWord())
          await validatingFinished(commentField)

          await user.click(submitButton)
          await loadingStartedByButton(submitButton)
          await loadingFinishedByButton(submitButton)

          const errorMsg = await within(commentField).findByText(
            head(badRequestErrorResponse.comment)!,
          )
          expect(errorMsg).toBeInTheDocument()
        })

        test('Корректно обрабатывается ошибка 404', async () => {
          mockGetTaskCommentListSuccess(requiredProps.taskId, [])
          mockCreateTaskCommentNotFoundError(requiredProps.taskId)

          const { user } = render(<CommentListTab {...requiredProps} />, {
            store: getStoreWithAuth(),
          })

          const submitButton = getSubmitButton()
          const commentField = getCommentField()
          const commentInput = getCommentInput()

          await user.type(commentInput, generateWord())
          await validatingFinished(commentField)

          await user.click(submitButton)
          await loadingStartedByButton(submitButton)
          await loadingFinishedByButton(submitButton)

          const errorMsg = await screen.findByText(
            CREATE_TASK_COMMENT_ERROR_MSG,
          )
          expect(errorMsg).toBeInTheDocument()
        })

        test('Корректно обрабатывается ошибка 500', async () => {
          mockGetTaskCommentListSuccess(requiredProps.taskId, [])
          mockCreateTaskCommentServerError(requiredProps.taskId)

          const { user } = render(<CommentListTab {...requiredProps} />, {
            store: getStoreWithAuth(),
          })

          const submitButton = getSubmitButton()
          const commentField = getCommentField()
          const commentInput = getCommentInput()

          await user.type(commentInput, generateWord())
          await validatingFinished(commentField)

          await user.click(submitButton)
          await loadingStartedByButton(submitButton)
          await loadingFinishedByButton(submitButton)

          const errorMsg = await screen.findByText(
            CREATE_TASK_COMMENT_ERROR_MSG,
          )
          expect(errorMsg).toBeInTheDocument()
        })

        test('Корректно обрабатывается неизвестная ошибка', async () => {
          mockGetTaskCommentListSuccess(requiredProps.taskId, [])
          mockCreateTaskCommentForbiddenError(requiredProps.taskId)

          const { user } = render(<CommentListTab {...requiredProps} />, {
            store: getStoreWithAuth(),
          })

          const submitButton = getSubmitButton()
          const commentField = getCommentField()
          const commentInput = getCommentInput()

          await user.type(commentInput, generateWord())
          await validatingFinished(commentField)

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
