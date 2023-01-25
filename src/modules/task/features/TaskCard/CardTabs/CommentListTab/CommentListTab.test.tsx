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
  findNotification,
  generateId,
  generateWord,
  getButtonIn,
  getStoreWithAuth,
  queryButtonIn,
  render,
  setupApiTests,
  setupNotifications,
} from '_tests_/utils'
import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import taskFixtures from 'fixtures/task'
import { CREATE_TASK_COMMENT_ERROR_MSG } from 'modules/task/constants/errorMessages'
import { UNKNOWN_ERROR_MSG } from 'shared/constants/errors'

import { testUtils as commentListTestUtils } from './CommentList/CommentList.test'
import { testUtils as createCommentFormTestUtils } from './CreateCommentForm/CreateCommentForm.test'
import {
  CreateCommentFormErrors,
  CreateCommentFormFields,
} from './CreateCommentForm/interfaces'
import CommentListTab, {
  CommentListTabProps,
  DEFAULT_DISPLAYABLE_COUNT,
} from './index'

const requiredProps: Readonly<CommentListTabProps> = {
  title: generateWord(),
  taskId: generateId(),
}

const getContainer = () => screen.getByTestId('task-comment-list-tab')

const getChildByText = (text: string) => within(getContainer()).getByText(text)

const getExpandButton = (commentCount?: number) =>
  getButtonIn(
    getContainer(),
    commentCount
      ? `Отобразить все комментарии: ${commentCount}`
      : /Отобразить все комментарии/,
  )

const queryExpandButton = (commentCount?: number) =>
  queryButtonIn(
    getContainer(),
    commentCount
      ? `Отобразить все комментарии: ${commentCount}`
      : /Отобразить все комментарии/,
  )

const userClickExpandButton = async (user: UserEvent) => {
  const button = getExpandButton()
  await user.click(button)
  return button
}

const getCollapseButton = () =>
  getButtonIn(getContainer(), /скрыть комментарии/i)

const userClickCollapseButton = async (user: UserEvent) => {
  const button = getCollapseButton()
  await user.click(button)
  return button
}

export const testUtils = {
  getContainer,
  getChildByText,

  getExpandButton,
  queryExpandButton,
  userClickExpandButton,

  getCollapseButton,
  userClickCollapseButton,
}

setupApiTests()

describe('Вкладка списка комментариев заявки', () => {
  test('Заголовок отображается корректно', () => {
    render(<CommentListTab {...requiredProps} />)

    expect(testUtils.getChildByText(requiredProps.title)).toBeInTheDocument()
  })

  describe('Кнопка раскрытия/скрытия комментариев', () => {
    describe('Отображается корректно если условия соблюдены', () => {
      test('Кнопка раскрытия', async () => {
        const taskCommentList = taskFixtures.getCommentList(
          DEFAULT_DISPLAYABLE_COUNT + 1,
        )
        mockGetTaskCommentListSuccess(requiredProps.taskId, {
          body: taskCommentList,
        })

        render(<CommentListTab {...requiredProps} />, {
          store: getStoreWithAuth(),
        })

        await commentListTestUtils.loadingFinished()
        const button = testUtils.getExpandButton(taskCommentList.length)

        expect(button).toBeInTheDocument()
        expect(button).toBeEnabled()
        expect(button).toHaveTextContent(
          new RegExp(String(taskCommentList.length)),
        )
      })

      test('Кнопка скрытия', async () => {
        const taskCommentList = taskFixtures.getCommentList(
          DEFAULT_DISPLAYABLE_COUNT + 1,
        )
        mockGetTaskCommentListSuccess(requiredProps.taskId, {
          body: taskCommentList,
        })

        const { user } = render(<CommentListTab {...requiredProps} />, {
          store: getStoreWithAuth(),
        })

        await commentListTestUtils.loadingFinished()
        await testUtils.userClickExpandButton(user)
        const button = testUtils.getCollapseButton()

        expect(button).toBeInTheDocument()
        expect(button).toBeEnabled()
      })
    })

    describe('Не отображается', () => {
      test('Если все условия соблюдены, но комментариев не более отображаемого кол-ва по умолчанию', async () => {
        mockGetTaskCommentListSuccess(requiredProps.taskId, {
          body: taskFixtures.getCommentList(DEFAULT_DISPLAYABLE_COUNT),
        })

        render(<CommentListTab {...requiredProps} />, {
          store: getStoreWithAuth(),
        })

        await commentListTestUtils.loadingFinished()
        const button = testUtils.queryExpandButton()

        expect(button).not.toBeInTheDocument()
      })

      test('Если нет комментариев', async () => {
        mockGetTaskCommentListSuccess(requiredProps.taskId, {
          body: taskFixtures.getCommentList(0),
        })

        render(<CommentListTab {...requiredProps} />, {
          store: getStoreWithAuth(),
        })

        await commentListTestUtils.loadingFinished()
        const button = testUtils.queryExpandButton()

        expect(button).not.toBeInTheDocument()
      })
    })

    test('Раскрывает все комментарии', async () => {
      const allCommentCount = DEFAULT_DISPLAYABLE_COUNT + 1
      mockGetTaskCommentListSuccess(requiredProps.taskId, {
        body: taskFixtures.getCommentList(allCommentCount),
      })

      const { user } = render(<CommentListTab {...requiredProps} />, {
        store: getStoreWithAuth(),
      })

      await commentListTestUtils.loadingFinished()

      expect(commentListTestUtils.getAllComments()).toHaveLength(
        DEFAULT_DISPLAYABLE_COUNT,
      )

      await testUtils.userClickExpandButton(user)

      expect(commentListTestUtils.getAllComments()).toHaveLength(
        allCommentCount,
      )
    })

    test('Скрывает все комментарии', async () => {
      const allCommentCount = DEFAULT_DISPLAYABLE_COUNT + 1
      mockGetTaskCommentListSuccess(requiredProps.taskId, {
        body: taskFixtures.getCommentList(allCommentCount),
      })

      const { user } = render(<CommentListTab {...requiredProps} />, {
        store: getStoreWithAuth(),
      })

      await commentListTestUtils.loadingFinished()

      expect(commentListTestUtils.getAllComments()).toHaveLength(
        DEFAULT_DISPLAYABLE_COUNT,
      )

      await testUtils.userClickExpandButton(user)

      expect(commentListTestUtils.getAllComments()).toHaveLength(
        allCommentCount,
      )

      await testUtils.userClickCollapseButton(user)

      expect(commentListTestUtils.getAllComments()).toHaveLength(
        DEFAULT_DISPLAYABLE_COUNT,
      )
    })
  })

  describe('Форма добавления комментария', () => {
    describe('Роль - любая', () => {
      test('Отображается', () => {
        render(<CommentListTab {...requiredProps} />)
        expect(createCommentFormTestUtils.getContainer()).toBeInTheDocument()
      })

      describe('При успешном запросе', () => {
        test('Корректно добавляет комментарий в список', async () => {
          const newComment = taskFixtures.getComment()
          mockCreateTaskCommentSuccess(requiredProps.taskId, {
            body: newComment,
          })
          mockGetTaskCommentListSuccess(requiredProps.taskId, {
            body: taskFixtures.getCommentList(),
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
          const newComment = taskFixtures.getComment()
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

          expect(
            createCommentFormTestUtils.getCommentInput(),
          ).not.toHaveDisplayValue(newComment.text)
        })
      })

      describe('При не успешном запросе', () => {
        setupNotifications()

        test('Обрабатывается ошибка 400', async () => {
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

        test('Обрабатывается ошибка 404', async () => {
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

          const error = await findNotification(CREATE_TASK_COMMENT_ERROR_MSG)
          expect(error).toBeInTheDocument()
        })

        test('Обрабатывается ошибка 500', async () => {
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

          const error = await findNotification(CREATE_TASK_COMMENT_ERROR_MSG)
          expect(error).toBeInTheDocument()
        })

        test('Обрабатывается неизвестная ошибка', async () => {
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

          const error = await findNotification(UNKNOWN_ERROR_MSG)
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
      const taskCommentList = taskFixtures.getCommentList(1)
      mockGetTaskCommentListSuccess(requiredProps.taskId, {
        body: taskCommentList,
      })

      render(<CommentListTab {...requiredProps} />, {
        store: getStoreWithAuth(),
      })

      await commentListTestUtils.loadingFinished()
      const commentList = commentListTestUtils.getAllComments()

      expect(commentList).toHaveLength(taskCommentList.length)
    })

    test('Комментарии не отображаются если их нет', async () => {
      const taskCommentList = taskFixtures.getCommentList(0)
      mockGetTaskCommentListSuccess(requiredProps.taskId, {
        body: taskCommentList,
      })

      render(<CommentListTab {...requiredProps} />, {
        store: getStoreWithAuth(),
      })

      await commentListTestUtils.loadingFinished()
      const commentList = commentListTestUtils.queryAllComments()

      expect(commentList).toHaveLength(taskCommentList.length)
    })
  })
})
