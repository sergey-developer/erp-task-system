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
  render,
  setupApiTests,
  setupNotifications,
} from '_tests_/utils'
import { within } from '@testing-library/react'
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

        await commentListTestUtils.loadingFinished()
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

        await commentListTestUtils.loadingFinished()
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

        await commentListTestUtils.loadingFinished()
        const button = commentListTabTestUtils.queryExpandButton()

        expect(button).not.toBeInTheDocument()
      })

      test('Если нет комментариев', async () => {
        mockGetTaskCommentListSuccess(requiredProps.taskId, {
          body: taskFixtures.getTaskCommentList(0),
        })

        render(<CommentListTab {...requiredProps} />, {
          store: getStoreWithAuth(),
        })

        await commentListTestUtils.loadingFinished()
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

      await commentListTestUtils.loadingFinished()
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

      await commentListTestUtils.loadingFinished()
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
        expect(createCommentFormTestUtils.getContainer()).toBeInTheDocument()
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

          await commentListTestUtils.loadingFinished()
          await createCommentFormTestUtils.userEntersComment(
            user,
            newComment.text,
          )
          await createCommentFormTestUtils.userClickSubmitButton(user)
          await createCommentFormTestUtils.loadingStarted()
          await createCommentFormTestUtils.loadingFinished()

          const newCommentText = within(
            commentListTestUtils.getFirstComment(),
          ).getByText(newComment.text)

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

          await commentListTestUtils.loadingFinished()
          await createCommentFormTestUtils.userEntersComment(
            user,
            newComment.text,
          )
          await createCommentFormTestUtils.userClickSubmitButton(user)
          await createCommentFormTestUtils.loadingStarted()
          await createCommentFormTestUtils.loadingFinished()

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

          await commentListTestUtils.loadingFinished()
          await createCommentFormTestUtils.userEntersComment(
            user,
            generateWord(),
          )
          await createCommentFormTestUtils.userClickSubmitButton(user)
          await createCommentFormTestUtils.loadingStarted()
          await createCommentFormTestUtils.loadingFinished()

          const error = await createCommentFormTestUtils.findCommentFieldError(
            head(badRequestErrorResponse.comment)!,
          )

          expect(error).toBeInTheDocument()
        })

        test('Корректно обрабатывается ошибка 404', async () => {
          mockGetTaskCommentListSuccess(requiredProps.taskId, { body: [] })
          mockCreateTaskCommentNotFoundError(requiredProps.taskId)

          const { user } = render(<CommentListTab {...requiredProps} />, {
            store: getStoreWithAuth(),
          })

          await commentListTestUtils.loadingFinished()
          await createCommentFormTestUtils.userEntersComment(
            user,
            generateWord(),
          )
          await createCommentFormTestUtils.userClickSubmitButton(user)
          await createCommentFormTestUtils.loadingStarted()
          await createCommentFormTestUtils.loadingFinished()

          const error = await createCommentFormTestUtils.findChildByText(
            CREATE_TASK_COMMENT_ERROR_MSG,
          )

          expect(error).toBeInTheDocument()
        })

        test('Корректно обрабатывается ошибка 500', async () => {
          mockGetTaskCommentListSuccess(requiredProps.taskId, { body: [] })
          mockCreateTaskCommentServerError(requiredProps.taskId)

          const { user } = render(<CommentListTab {...requiredProps} />, {
            store: getStoreWithAuth(),
          })

          await commentListTestUtils.loadingFinished()
          await createCommentFormTestUtils.userEntersComment(
            user,
            generateWord(),
          )
          await createCommentFormTestUtils.userClickSubmitButton(user)
          await createCommentFormTestUtils.loadingStarted()
          await createCommentFormTestUtils.loadingFinished()

          const error = await createCommentFormTestUtils.findChildByText(
            CREATE_TASK_COMMENT_ERROR_MSG,
          )

          expect(error).toBeInTheDocument()
        })

        test('Корректно обрабатывается неизвестная ошибка', async () => {
          mockGetTaskCommentListSuccess(requiredProps.taskId, { body: [] })
          mockCreateTaskCommentForbiddenError(requiredProps.taskId)

          const { user } = render(<CommentListTab {...requiredProps} />, {
            store: getStoreWithAuth(),
          })

          await commentListTestUtils.loadingFinished()
          await createCommentFormTestUtils.userEntersComment(
            user,
            generateWord(),
          )
          await createCommentFormTestUtils.userClickSubmitButton(user)
          await createCommentFormTestUtils.loadingStarted()
          await createCommentFormTestUtils.loadingFinished()

          const error = await createCommentFormTestUtils.findChildByText(
            UNKNOWN_ERROR_MSG,
          )

          expect(error).toBeInTheDocument()
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

      await commentListTestUtils.loadingFinished()
      const commentList = commentListTestUtils.getAllComments()

      expect(commentList).toHaveLength(commentCount)
    })

    test('Комментарии не отображаются если их нет', async () => {
      const commentCount = 0
      mockGetTaskCommentListSuccess(requiredProps.taskId, {
        body: taskFixtures.getTaskCommentList(commentCount),
      })

      render(<CommentListTab {...requiredProps} />, {
        store: getStoreWithAuth(),
      })

      await commentListTestUtils.loadingFinished()
      const commentList = commentListTestUtils.queryAllComments()

      expect(commentList).toHaveLength(commentCount)
    })
  })
})
