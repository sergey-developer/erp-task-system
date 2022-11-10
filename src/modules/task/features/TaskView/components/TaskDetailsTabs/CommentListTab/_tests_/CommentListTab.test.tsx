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

import commentListTestUtils from '../CommentList/_tests_/utils'
import createCommentFormTestUtils from '../CreateCommentForm/_tests_/utils'
import {
  CreateCommentFormErrors,
  CreateCommentFormFields,
} from '../CreateCommentForm/interfaces'
import CommentListTab, { DEFAULT_DISPLAYABLE_COUNT } from '../index'
import { requiredProps } from './constants'
import commentListTabTestUtils from './utils'

setupApiTests()

describe('Вкладка списка комментариев заявки', () => {
  test('Заголовок отображается корректно', () => {
    render(<CommentListTab {...requiredProps} />)
    expect(
      commentListTabTestUtils.getChildByText(requiredProps.title),
    ).toBeInTheDocument()
  })

  describe('Кнопка раскрытия/скрытия комментариев', () => {
    describe('Отображается корректно если все условия соблюдены', () => {
      test('Кнопка раскрытия', async () => {
        const commentCount = DEFAULT_DISPLAYABLE_COUNT + 1
        mockGetTaskCommentListSuccess(requiredProps.taskId, {
          body: taskFixtures.getTaskCommentList(commentCount),
        })

        render(<CommentListTab {...requiredProps} />, {
          store: getStoreWithAuth(),
        })

        await commentListTabTestUtils.loadingFinished()
        const button = commentListTabTestUtils.getExpandButton(commentCount)

        expect(button).toBeInTheDocument()
        expect(button).toBeEnabled()
        expect(button).toHaveTextContent(new RegExp(String(commentCount)))
      })

      test('Кнопка скрытия', async () => {
        const commentCount = DEFAULT_DISPLAYABLE_COUNT + 1
        mockGetTaskCommentListSuccess(requiredProps.taskId, {
          body: taskFixtures.getTaskCommentList(commentCount),
        })

        const { user } = render(<CommentListTab {...requiredProps} />, {
          store: getStoreWithAuth(),
        })

        await commentListTabTestUtils.loadingFinished()
        await commentListTabTestUtils.userClickExpandButton(user)
        const button = commentListTabTestUtils.getCollapseButton()

        expect(button).toBeInTheDocument()
        expect(button).toBeEnabled()
      })
    })

    describe('Не отображается', () => {
      test('Если все условия соблюдены, но комментариев не больше отображаемого кол-ва по умолчанию', async () => {
        mockGetTaskCommentListSuccess(requiredProps.taskId, {
          body: taskFixtures.getTaskCommentList(DEFAULT_DISPLAYABLE_COUNT),
        })

        render(<CommentListTab {...requiredProps} />, {
          store: getStoreWithAuth(),
        })

        await commentListTabTestUtils.loadingFinished()
        const button = commentListTabTestUtils.queryExpandButton()

        expect(button).not.toBeInTheDocument()
      })

      test('Если нет комментариев', async () => {
        render(<CommentListTab {...requiredProps} />)

        const button = commentListTabTestUtils.queryExpandButton()
        expect(button).not.toBeInTheDocument()
      })
    })

    test('Раскрывает все комментарии', async () => {
      const commentCount = DEFAULT_DISPLAYABLE_COUNT + 1
      mockGetTaskCommentListSuccess(requiredProps.taskId, {
        body: taskFixtures.getTaskCommentList(commentCount),
      })

      const { user } = render(<CommentListTab {...requiredProps} />, {
        store: getStoreWithAuth(),
      })

      await commentListTabTestUtils.loadingFinished()
      await commentListTabTestUtils.userClickExpandButton(user)
      const commentList = commentListTestUtils.getAllComments()

      expect(commentList).toHaveLength(commentCount)
    })

    test('Скрывает все комментарии', async () => {
      const commentCount = DEFAULT_DISPLAYABLE_COUNT + 1
      mockGetTaskCommentListSuccess(requiredProps.taskId, {
        body: taskFixtures.getTaskCommentList(commentCount),
      })

      const { user } = render(<CommentListTab {...requiredProps} />, {
        store: getStoreWithAuth(),
      })

      await commentListTabTestUtils.loadingFinished()
      await commentListTabTestUtils.userClickExpandButton(user)
      await commentListTabTestUtils.userClickCollapseButton(user)
      const commentList = commentListTestUtils.getAllComments()

      expect(commentList).toHaveLength(DEFAULT_DISPLAYABLE_COUNT)
    })
  })

  describe('Форма добавления заявки', () => {
    describe('Роль - любая', () => {
      test('Отображается', () => {
        render(<CommentListTab {...requiredProps} />)

        const formContainer = createCommentFormTestUtils.getContainer()
        expect(formContainer).toBeInTheDocument()
      })

      describe('При успешном запросе', () => {
        test('Корректно добавляет комментарий в список', async () => {
          const newComment = taskFixtures.getTaskComment()
          mockCreateTaskCommentSuccess(requiredProps.taskId, {
            body: newComment,
          })
          mockGetTaskCommentListSuccess(requiredProps.taskId, {
            body: taskFixtures.getTaskCommentList(),
          })

          const { user } = render(<CommentListTab {...requiredProps} />, {
            store: getStoreWithAuth(),
          })

          // const commentField = createCommentFormTestUtils.getCommentField()

          await createCommentFormTestUtils.userEntersComment(
            user,
            newComment.text,
          )
          // await createCommentFormTestUtils.commentValidatingFinished()
          // await validatingFinished(commentField)

          const submitButton =
            await createCommentFormTestUtils.userClickSubmitButton(user)

          await loadingStartedByButton(submitButton)
          await loadingFinishedByButton(submitButton)

          const firstComment = commentListTestUtils.getFirstComment()
          const newCommentText = within(firstComment).getByText(newComment.text)

          expect(newCommentText).toBeInTheDocument()
        })

        test('Сбрасывает значения полей', async () => {
          const newComment = taskFixtures.getTaskComment()
          mockCreateTaskCommentSuccess(requiredProps.taskId, {
            body: newComment,
          })
          mockGetTaskCommentListSuccess(requiredProps.taskId, { body: [] })

          const { user } = render(<CommentListTab {...requiredProps} />, {
            store: getStoreWithAuth(),
          })

          const submitButton = createCommentFormTestUtils.getSubmitButton()
          const commentField = createCommentFormTestUtils.getCommentField()
          const commentInput = createCommentFormTestUtils.getCommentInput()

          await user.type(commentInput, newComment.text)
          await validatingFinished(commentField)

          await user.click(submitButton)
          await loadingStartedByButton(submitButton)
          await loadingFinishedByButton(submitButton)

          expect(createCommentFormTestUtils.getCommentInput()).not.toHaveValue()
        })
      })

      describe('При не успешном запросе', () => {
        setupNotifications()

        test('Корректно обрабатывается ошибка 400', async () => {
          mockGetTaskCommentListSuccess(requiredProps.taskId, { body: [] })

          const badRequestErrorResponse: CreateCommentFormErrors = {
            comment: [generateWord()],
          }
          mockCreateTaskCommentBadRequestError<CreateCommentFormFields>(
            requiredProps.taskId,
            { body: badRequestErrorResponse },
          )

          const { user } = render(<CommentListTab {...requiredProps} />, {
            store: getStoreWithAuth(),
          })

          const submitButton = createCommentFormTestUtils.getSubmitButton()
          const commentField = createCommentFormTestUtils.getCommentField()
          const commentInput = createCommentFormTestUtils.getCommentInput()

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
          mockGetTaskCommentListSuccess(requiredProps.taskId, { body: [] })
          mockCreateTaskCommentNotFoundError(requiredProps.taskId)

          const { user } = render(<CommentListTab {...requiredProps} />, {
            store: getStoreWithAuth(),
          })

          const submitButton = createCommentFormTestUtils.getSubmitButton()
          const commentField = createCommentFormTestUtils.getCommentField()
          const commentInput = createCommentFormTestUtils.getCommentInput()

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
          mockGetTaskCommentListSuccess(requiredProps.taskId, { body: [] })
          mockCreateTaskCommentServerError(requiredProps.taskId)

          const { user } = render(<CommentListTab {...requiredProps} />, {
            store: getStoreWithAuth(),
          })

          const submitButton = createCommentFormTestUtils.getSubmitButton()
          const commentField = createCommentFormTestUtils.getCommentField()
          const commentInput = createCommentFormTestUtils.getCommentInput()

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
          mockGetTaskCommentListSuccess(requiredProps.taskId, { body: [] })
          mockCreateTaskCommentForbiddenError(requiredProps.taskId)

          const { user } = render(<CommentListTab {...requiredProps} />, {
            store: getStoreWithAuth(),
          })

          const submitButton = createCommentFormTestUtils.getSubmitButton()
          const commentField = createCommentFormTestUtils.getCommentField()
          const commentInput = createCommentFormTestUtils.getCommentInput()

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

  describe('Список комментариев', () => {
    test('Отображается', () => {
      render(<CommentListTab {...requiredProps} />)
      expect(commentListTestUtils.getContainer()).toBeInTheDocument()
    })

    test('Комментарии отображаются если они есть', async () => {
      const commentCount = 1
      mockGetTaskCommentListSuccess(requiredProps.taskId, {
        body: taskFixtures.getTaskCommentList(commentCount),
      })

      render(<CommentListTab {...requiredProps} />, {
        store: getStoreWithAuth(),
      })

      await commentListTabTestUtils.loadingFinished()
      const commentList = commentListTestUtils.getAllComments()

      expect(commentList).toHaveLength(commentCount)
    })

    test('Комментарии не отображаются если их нет', async () => {
      render(<CommentListTab {...requiredProps} />)

      const commentList = commentListTestUtils.queryAllComments()
      expect(commentList).toHaveLength(0)
    })
  })
})
