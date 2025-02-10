import { within } from '@testing-library/react'

import { createTaskCommentErrMsg } from 'features/task/constants/taskComment'
import { UserPermissionsEnum } from 'features/user/api/constants'

import { commentsTestUtils } from '_tests_/features/tasks/components/TaskDetails/Tabs/CommentsTab/Comments/testUtils'
import { createCommentFormTestUtils } from '_tests_/features/tasks/components/TaskDetails/Tabs/CommentsTab/CreateCommentForm/testUtils'
import { props } from '_tests_/features/tasks/components/TaskDetails/Tabs/CommentsTab/constants'
import { commentsTabTestUtils } from '_tests_/features/tasks/components/TaskDetails/Tabs/CommentsTab/testUtils'
import taskFixtures from '_tests_/fixtures/task'
import {
  mockCreateTaskCommentBadRequestError,
  mockCreateTaskCommentForbiddenError,
  mockCreateTaskCommentNotFoundError,
  mockCreateTaskCommentServerError,
  mockCreateTaskCommentSuccess,
  mockGetTaskCommentListSuccess,
} from '_tests_/mocks/api'
import { getUserMeQueryMock } from '_tests_/mocks/state/user'
import {
  fakeWord,
  getStoreWithAuth,
  notificationTestUtils,
  render,
  setupApiTests,
} from '_tests_/utils'

import { CreateCommentFormFields } from './CreateCommentForm/types'
import CommentsTab, { DEFAULT_DISPLAYABLE_COUNT } from './index'

setupApiTests()
notificationTestUtils.setupNotifications()

describe('Вкладка списка комментариев заявки', () => {
  test('Заголовок отображается', () => {
    mockGetTaskCommentListSuccess(props.taskId)
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
        const taskCommentList = taskFixtures.commentList(DEFAULT_DISPLAYABLE_COUNT + 1)
        mockGetTaskCommentListSuccess(props.taskId, {
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
        const taskCommentList = taskFixtures.commentList(DEFAULT_DISPLAYABLE_COUNT + 1)
        mockGetTaskCommentListSuccess(props.taskId, {
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
        mockGetTaskCommentListSuccess(props.taskId, {
          body: taskFixtures.commentList(DEFAULT_DISPLAYABLE_COUNT),
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
        mockGetTaskCommentListSuccess(props.taskId, { body: taskFixtures.commentList(0) })

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
      mockGetTaskCommentListSuccess(props.taskId, {
        body: taskFixtures.commentList(allCommentCount),
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
      mockGetTaskCommentListSuccess(props.taskId, {
        body: taskFixtures.commentList(allCommentCount),
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
      mockGetTaskCommentListSuccess(props.taskId)

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
      mockGetTaskCommentListSuccess(props.taskId)

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
        const newComment = taskFixtures.comment()
        mockCreateTaskCommentSuccess(props.taskId, {
          body: newComment,
        })
        mockGetTaskCommentListSuccess(props.taskId, {
          body: taskFixtures.commentList(),
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
        const newComment = taskFixtures.comment()
        mockCreateTaskCommentSuccess(props.taskId, {
          body: newComment,
        })
        mockGetTaskCommentListSuccess(props.taskId, { body: [] })

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
        mockGetTaskCommentListSuccess(props.taskId, { body: [] })

        const badRequestErrorResponse = {
          comment: [fakeWord()],
          attachments: [fakeWord()],
          detail: [fakeWord()],
        }
        mockCreateTaskCommentBadRequestError<CreateCommentFormFields>(props.taskId, {
          body: badRequestErrorResponse,
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
          badRequestErrorResponse.comment[0],
        )

        const attachmentsError = await createCommentFormTestUtils.findAttachmentsError(
          badRequestErrorResponse.attachments[0],
        )

        const detailError = await notificationTestUtils.findNotification(
          badRequestErrorResponse.detail[0],
        )

        expect(commentError).toBeInTheDocument()
        expect(attachmentsError).toBeInTheDocument()
        expect(detailError).toBeInTheDocument()
      })

      test('Обрабатывается ошибка 403', async () => {
        mockGetTaskCommentListSuccess(props.taskId, { body: [] })

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
        mockGetTaskCommentListSuccess(props.taskId, { body: [] })

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
        mockGetTaskCommentListSuccess(props.taskId, { body: [] })
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

        const error = await notificationTestUtils.findNotification(createTaskCommentErrMsg)
        expect(error).toBeInTheDocument()
      })
    })
  })

  test('Комментарии отображаются если они есть', async () => {
    const taskCommentList = taskFixtures.commentList(1)
    mockGetTaskCommentListSuccess(props.taskId, {
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
    const taskCommentList = taskFixtures.commentList(0)
    mockGetTaskCommentListSuccess(props.taskId, {
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
