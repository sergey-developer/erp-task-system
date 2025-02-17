import { within } from '@testing-library/react'
import { createTaskCommentErrorMessage } from 'features/tasks/api/constants'
import { UserPermissionsEnum } from 'features/users/api/constants'

import { commentsTestUtils } from '_tests_/features/tasks/components/TaskDetails/TaskDetailsTabs/CommentsTab/Comments/testUtils'
import { createCommentFormTestUtils } from '_tests_/features/tasks/components/TaskDetails/TaskDetailsTabs/CommentsTab/CreateCommentForm/testUtils'
import { props } from '_tests_/features/tasks/components/TaskDetails/TaskDetailsTabs/CommentsTab/constants'
import { commentsTabTestUtils } from '_tests_/features/tasks/components/TaskDetails/TaskDetailsTabs/CommentsTab/testUtils'
import tasksFixtures from '_tests_/fixtures/api/data/tasks'
import { getStoreWithAuth } from '_tests_/fixtures/store/auth'
import { getUserMeQueryMock } from '_tests_/fixtures/store/users'
import { fakeWord, notificationTestUtils, render, setupApiTests } from '_tests_/helpers'
import {
  mockCreateTaskCommentBadRequestError,
  mockCreateTaskCommentForbiddenError,
  mockCreateTaskCommentNotFoundError,
  mockCreateTaskCommentServerError,
  mockCreateTaskCommentSuccess,
  mockGetTaskCommentsSuccess,
} from '_tests_/mocks/api'

import { CreateCommentFormFields } from './CreateCommentForm/types'
import CommentsTab, { DEFAULT_DISPLAYABLE_COUNT } from './index'

setupApiTests()
notificationTestUtils.setupNotifications()

describe('Вкладка списка комментариев заявки', () => {
  test('Заголовок отображается', () => {
    mockGetTaskCommentsSuccess(props.taskId)
    render(<CommentsTab {...props} />, {
      store: getStoreWithAuth(undefined, undefined, undefined, {
        queries: { ...getUserMeQueryMock({ permissions: [] }) },
      }),
    })
    expect(commentsTabTestUtils.getChildByText(props.title)).toBeInTheDocument()
  })

  describe('Кнопка раскрытия/скрытия комментариев', () => {
    describe('Отображается если условия соблюдены', () => {
      test('Кнопка раскрытия', async () => {
        const taskCommentList = tasksFixtures.taskComments(DEFAULT_DISPLAYABLE_COUNT + 1)
        mockGetTaskCommentsSuccess(props.taskId, {
          body: taskCommentList,
        })

        render(<CommentsTab {...props} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock({ permissions: [] }) },
          }),
        })

        await commentsTestUtils.expectLoadingFinished()
        const button = commentsTabTestUtils.getExpandButton(taskCommentList.length)

        expect(button).toBeInTheDocument()
        expect(button).toBeEnabled()
        expect(button).toHaveTextContent(new RegExp(String(taskCommentList.length)))
      })

      test('Кнопка скрытия', async () => {
        const taskCommentList = tasksFixtures.taskComments(DEFAULT_DISPLAYABLE_COUNT + 1)
        mockGetTaskCommentsSuccess(props.taskId, {
          body: taskCommentList,
        })

        const { user } = render(<CommentsTab {...props} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock({ permissions: [] }) },
          }),
        })

        await commentsTestUtils.expectLoadingFinished()
        await commentsTabTestUtils.clickExpandButton(user)
        const button = commentsTabTestUtils.getCollapseButton()

        expect(button).toBeInTheDocument()
        expect(button).toBeEnabled()
      })
    })

    describe('Не отображается', () => {
      test('Если все условия соблюдены, но комментариев не более отображаемого кол-ва по умолчанию', async () => {
        mockGetTaskCommentsSuccess(props.taskId, {
          body: tasksFixtures.taskComments(DEFAULT_DISPLAYABLE_COUNT),
        })

        render(<CommentsTab {...props} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock({ permissions: [] }) },
          }),
        })

        await commentsTestUtils.expectLoadingFinished()
        const button = commentsTabTestUtils.queryExpandButton()

        expect(button).not.toBeInTheDocument()
      })

      test('Если нет комментариев', async () => {
        mockGetTaskCommentsSuccess(props.taskId, { body: tasksFixtures.taskComments(0) })

        render(<CommentsTab {...props} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock({ permissions: [] }) },
          }),
        })

        await commentsTestUtils.expectLoadingFinished()
        const button = commentsTabTestUtils.queryExpandButton()

        expect(button).not.toBeInTheDocument()
      })
    })

    test('Раскрывает все комментарии', async () => {
      const allCommentCount = DEFAULT_DISPLAYABLE_COUNT + 1
      mockGetTaskCommentsSuccess(props.taskId, {
        body: tasksFixtures.taskComments(allCommentCount),
      })

      const { user } = render(<CommentsTab {...props} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock({ permissions: [] }) },
        }),
      })

      await commentsTestUtils.expectLoadingFinished()
      expect(commentsTestUtils.getAllComments()).toHaveLength(DEFAULT_DISPLAYABLE_COUNT)

      await commentsTabTestUtils.clickExpandButton(user)
      expect(commentsTestUtils.getAllComments()).toHaveLength(allCommentCount)
    })

    test('Скрывает все комментарии', async () => {
      const allCommentCount = DEFAULT_DISPLAYABLE_COUNT + 1
      mockGetTaskCommentsSuccess(props.taskId, {
        body: tasksFixtures.taskComments(allCommentCount),
      })

      const { user } = render(<CommentsTab {...props} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock({ permissions: [] }) },
        }),
      })

      await commentsTestUtils.expectLoadingFinished()
      expect(commentsTestUtils.getAllComments()).toHaveLength(DEFAULT_DISPLAYABLE_COUNT)

      await commentsTabTestUtils.clickExpandButton(user)
      expect(commentsTestUtils.getAllComments()).toHaveLength(allCommentCount)

      await commentsTabTestUtils.clickCollapseButton(user)
      expect(commentsTestUtils.getAllComments()).toHaveLength(DEFAULT_DISPLAYABLE_COUNT)
    })
  })

  describe('Форма добавления комментария', () => {
    test('Отображается если есть права', () => {
      mockGetTaskCommentsSuccess(props.taskId)

      render(<CommentsTab {...props} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: {
            ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.TasksCommentCreate] }),
          },
        }),
      })

      expect(createCommentFormTestUtils.getContainer()).toBeInTheDocument()
    })

    test('Не отображается если нет прав', () => {
      mockGetTaskCommentsSuccess(props.taskId)

      render(<CommentsTab {...props} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock({ permissions: [] }) },
        }),
      })

      expect(createCommentFormTestUtils.queryContainer()).not.toBeInTheDocument()
    })

    // todo: проверить и поправить
    describe('При успешном запросе', () => {
      test.skip('Добавляет комментарий в список', async () => {
        const newComment = tasksFixtures.taskComment()
        mockCreateTaskCommentSuccess(props.taskId, {
          body: newComment,
        })
        mockGetTaskCommentsSuccess(props.taskId, {
          body: tasksFixtures.taskComments(),
        })

        const { user } = render(<CommentsTab {...props} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.TasksCommentCreate] }),
            },
          }),
        })

        await commentsTestUtils.expectLoadingFinished()
        await createCommentFormTestUtils.setComment(user, newComment.text)
        await createCommentFormTestUtils.setAttachment(user)
        await createCommentFormTestUtils.clickSubmitButton(user)
        await createCommentFormTestUtils.expectLoadingStarted()
        await createCommentFormTestUtils.expectLoadingFinished()

        const newCommentText = within(commentsTestUtils.getFirstComment()).getByText(
          newComment.text,
        )

        expect(newCommentText).toBeInTheDocument()
      })

      test.skip('Значения полей сбрасываются', async () => {
        const newComment = tasksFixtures.taskComment()
        mockCreateTaskCommentSuccess(props.taskId, {
          body: newComment,
        })
        mockGetTaskCommentsSuccess(props.taskId, { body: [] })

        const { user } = render(<CommentsTab {...props} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.TasksCommentCreate] }),
            },
          }),
        })

        await commentsTestUtils.expectLoadingFinished()
        await createCommentFormTestUtils.setComment(user, newComment.text)
        const { file } = await createCommentFormTestUtils.setAttachment(user)
        await createCommentFormTestUtils.clickSubmitButton(user)
        await createCommentFormTestUtils.expectLoadingStarted()
        await createCommentFormTestUtils.expectLoadingFinished()

        const commentInput = createCommentFormTestUtils.getCommentField()
        const uploadedAttachment = createCommentFormTestUtils.queryUploadedAttachment(file.name)

        expect(commentInput).not.toHaveDisplayValue(newComment.text)
        expect(uploadedAttachment).not.toBeInTheDocument()
      })
    })

    describe('При не успешном запросе', () => {
      test('Обрабатывается ошибка 400', async () => {
        mockGetTaskCommentsSuccess(props.taskId, { body: [] })

        const badRequestResponse = {
          comment: [fakeWord()],
          attachments: [fakeWord()],
          detail: [fakeWord()],
        }
        mockCreateTaskCommentBadRequestError<CreateCommentFormFields>(props.taskId, {
          body: badRequestResponse,
        })

        const { user } = render(<CommentsTab {...props} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.TasksCommentCreate] }),
            },
          }),
        })

        await commentsTestUtils.expectLoadingFinished()
        await createCommentFormTestUtils.setComment(user, fakeWord())
        await createCommentFormTestUtils.setAttachment(user)
        await createCommentFormTestUtils.clickSubmitButton(user)
        await createCommentFormTestUtils.expectLoadingStarted()
        await createCommentFormTestUtils.expectLoadingFinished()

        const commentError = await createCommentFormTestUtils.findCommentError(
          badRequestResponse.comment[0],
        )

        const attachmentsError = await createCommentFormTestUtils.findAttachmentsError(
          badRequestResponse.attachments[0],
        )

        const detailError = await notificationTestUtils.findNotification(
          badRequestResponse.detail[0],
        )

        expect(commentError).toBeInTheDocument()
        expect(attachmentsError).toBeInTheDocument()
        expect(detailError).toBeInTheDocument()
      })

      test('Обрабатывается ошибка 403', async () => {
        mockGetTaskCommentsSuccess(props.taskId, { body: [] })

        const detailError = fakeWord()
        mockCreateTaskCommentForbiddenError(props.taskId, { body: { detail: [detailError] } })

        const { user } = render(<CommentsTab {...props} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.TasksCommentCreate] }),
            },
          }),
        })

        await commentsTestUtils.expectLoadingFinished()
        await createCommentFormTestUtils.setComment(user, fakeWord())
        await createCommentFormTestUtils.setAttachment(user)
        await createCommentFormTestUtils.clickSubmitButton(user)
        await createCommentFormTestUtils.expectLoadingStarted()
        await createCommentFormTestUtils.expectLoadingFinished()

        const error = await notificationTestUtils.findNotification(detailError)
        expect(error).toBeInTheDocument()
      })

      test('Обрабатывается ошибка 404', async () => {
        mockGetTaskCommentsSuccess(props.taskId, { body: [] })

        const detailError = fakeWord()
        mockCreateTaskCommentNotFoundError(props.taskId, { body: { detail: [detailError] } })

        const { user } = render(<CommentsTab {...props} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.TasksCommentCreate] }),
            },
          }),
        })

        await commentsTestUtils.expectLoadingFinished()
        await createCommentFormTestUtils.setComment(user, fakeWord())
        await createCommentFormTestUtils.setAttachment(user)
        await createCommentFormTestUtils.clickSubmitButton(user)
        await createCommentFormTestUtils.expectLoadingStarted()
        await createCommentFormTestUtils.expectLoadingFinished()

        const error = await notificationTestUtils.findNotification(detailError)
        expect(error).toBeInTheDocument()
      })

      test('Обрабатывается ошибка 500', async () => {
        mockGetTaskCommentsSuccess(props.taskId, { body: [] })
        mockCreateTaskCommentServerError(props.taskId)

        const { user } = render(<CommentsTab {...props} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.TasksCommentCreate] }),
            },
          }),
        })

        await commentsTestUtils.expectLoadingFinished()
        await createCommentFormTestUtils.setComment(user, fakeWord())
        await createCommentFormTestUtils.setAttachment(user)
        await createCommentFormTestUtils.clickSubmitButton(user)
        await createCommentFormTestUtils.expectLoadingStarted()
        await createCommentFormTestUtils.expectLoadingFinished()

        const error = await notificationTestUtils.findNotification(createTaskCommentErrorMessage)
        expect(error).toBeInTheDocument()
      })
    })
  })

  test('Комментарии отображаются если они есть', async () => {
    const taskCommentList = tasksFixtures.taskComments(1)
    mockGetTaskCommentsSuccess(props.taskId, {
      body: taskCommentList,
    })

    render(<CommentsTab {...props} />, {
      store: getStoreWithAuth(undefined, undefined, undefined, {
        queries: { ...getUserMeQueryMock({ permissions: [] }) },
      }),
    })

    await commentsTestUtils.expectLoadingFinished()
    const commentList = commentsTestUtils.getAllComments()

    expect(commentList).toHaveLength(taskCommentList.length)
  })

  test('Комментарии не отображаются если их нет', async () => {
    const taskCommentList = tasksFixtures.taskComments(0)
    mockGetTaskCommentsSuccess(props.taskId, {
      body: taskCommentList,
    })

    render(<CommentsTab {...props} />, {
      store: getStoreWithAuth(undefined, undefined, undefined, {
        queries: { ...getUserMeQueryMock({ permissions: [] }) },
      }),
    })

    await commentsTestUtils.expectLoadingFinished()
    const commentList = commentsTestUtils.queryAllComments()

    expect(commentList).toHaveLength(taskCommentList.length)
  })
})
