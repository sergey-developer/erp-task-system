import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { createTaskCommentErrorMsg } from 'modules/task/constants/taskComment'

import { commonApiMessages } from 'shared/constants/common'

import taskFixtures from '_tests_/fixtures/task'
import {
  mockCreateTaskCommentBadRequestError,
  mockCreateTaskCommentForbiddenError,
  mockCreateTaskCommentNotFoundError,
  mockCreateTaskCommentServerError,
  mockCreateTaskCommentSuccess,
  mockGetTaskCommentListSuccess,
} from '_tests_/mocks/api'
import {
  buttonTestUtils,
  fakeId,
  fakeWord,
  getStoreWithAuth,
  notificationTestUtils,
  render,
  setupApiTests,
} from '_tests_/utils'

import { testUtils as commentListTestUtils } from './CommentList/CommentList.test'
import { testUtils as createCommentFormTestUtils } from './CreateCommentForm/CreateCommentForm.test'
import { CreateCommentFormErrors, CreateCommentFormFields } from './CreateCommentForm/types'
import CommentListTab, { CommentListTabProps, DEFAULT_DISPLAYABLE_COUNT } from './index'

const props: Readonly<CommentListTabProps> = {
  title: fakeWord(),
  taskId: fakeId(),
}

const getContainer = () => screen.getByTestId('task-comment-list-tab')

const getChildByText = (text: string) => within(getContainer()).getByText(text)

const getExpandButton = (commentCount?: number) =>
  buttonTestUtils.getButtonIn(
    getContainer(),
    commentCount ? `Отобразить все комментарии: ${commentCount}` : /Отобразить все комментарии/,
  )

const queryExpandButton = (commentCount?: number) =>
  buttonTestUtils.queryButtonIn(
    getContainer(),
    commentCount ? `Отобразить все комментарии: ${commentCount}` : /Отобразить все комментарии/,
  )

const clickExpandButton = async (user: UserEvent) => {
  const button = getExpandButton()
  await user.click(button)
  return button
}

const getCollapseButton = () => buttonTestUtils.getButtonIn(getContainer(), /скрыть комментарии/i)

const clickCollapseButton = async (user: UserEvent) => {
  const button = getCollapseButton()
  await user.click(button)
  return button
}

export const testUtils = {
  getContainer,
  getChildByText,

  getExpandButton,
  queryExpandButton,
  clickExpandButton,

  getCollapseButton,
  clickCollapseButton,
}

setupApiTests()
notificationTestUtils.setupNotifications()

describe('Вкладка списка комментариев заявки', () => {
  test('Заголовок отображается корректно', () => {
    render(<CommentListTab {...props} />)
    expect(testUtils.getChildByText(props.title)).toBeInTheDocument()
  })

  describe('Кнопка раскрытия/скрытия комментариев', () => {
    describe('Отображается корректно если условия соблюдены', () => {
      test('Кнопка раскрытия', async () => {
        const taskCommentList = taskFixtures.commentList(DEFAULT_DISPLAYABLE_COUNT + 1)
        mockGetTaskCommentListSuccess(props.taskId, {
          body: taskCommentList,
        })

        render(<CommentListTab {...props} />, {
          store: getStoreWithAuth(),
        })

        await commentListTestUtils.expectLoadingFinished()
        const button = testUtils.getExpandButton(taskCommentList.length)

        expect(button).toBeInTheDocument()
        expect(button).toBeEnabled()
        expect(button).toHaveTextContent(new RegExp(String(taskCommentList.length)))
      })

      test('Кнопка скрытия', async () => {
        const taskCommentList = taskFixtures.commentList(DEFAULT_DISPLAYABLE_COUNT + 1)
        mockGetTaskCommentListSuccess(props.taskId, {
          body: taskCommentList,
        })

        const { user } = render(<CommentListTab {...props} />, {
          store: getStoreWithAuth(),
        })

        await commentListTestUtils.expectLoadingFinished()
        await testUtils.clickExpandButton(user)
        const button = testUtils.getCollapseButton()

        expect(button).toBeInTheDocument()
        expect(button).toBeEnabled()
      })
    })

    describe('Не отображается', () => {
      test('Если все условия соблюдены, но комментариев не более отображаемого кол-ва по умолчанию', async () => {
        mockGetTaskCommentListSuccess(props.taskId, {
          body: taskFixtures.commentList(DEFAULT_DISPLAYABLE_COUNT),
        })

        render(<CommentListTab {...props} />, {
          store: getStoreWithAuth(),
        })

        await commentListTestUtils.expectLoadingFinished()
        const button = testUtils.queryExpandButton()

        expect(button).not.toBeInTheDocument()
      })

      test('Если нет комментариев', async () => {
        mockGetTaskCommentListSuccess(props.taskId, {
          body: taskFixtures.commentList(0),
        })

        render(<CommentListTab {...props} />, {
          store: getStoreWithAuth(),
        })

        await commentListTestUtils.expectLoadingFinished()
        const button = testUtils.queryExpandButton()

        expect(button).not.toBeInTheDocument()
      })
    })

    test('Раскрывает все комментарии', async () => {
      const allCommentCount = DEFAULT_DISPLAYABLE_COUNT + 1
      mockGetTaskCommentListSuccess(props.taskId, {
        body: taskFixtures.commentList(allCommentCount),
      })

      const { user } = render(<CommentListTab {...props} />, {
        store: getStoreWithAuth(),
      })

      await commentListTestUtils.expectLoadingFinished()

      expect(commentListTestUtils.getAllComments()).toHaveLength(DEFAULT_DISPLAYABLE_COUNT)

      await testUtils.clickExpandButton(user)

      expect(commentListTestUtils.getAllComments()).toHaveLength(allCommentCount)
    })

    test('Скрывает все комментарии', async () => {
      const allCommentCount = DEFAULT_DISPLAYABLE_COUNT + 1
      mockGetTaskCommentListSuccess(props.taskId, {
        body: taskFixtures.commentList(allCommentCount),
      })

      const { user } = render(<CommentListTab {...props} />, {
        store: getStoreWithAuth(),
      })

      await commentListTestUtils.expectLoadingFinished()

      expect(commentListTestUtils.getAllComments()).toHaveLength(DEFAULT_DISPLAYABLE_COUNT)

      await testUtils.clickExpandButton(user)

      expect(commentListTestUtils.getAllComments()).toHaveLength(allCommentCount)

      await testUtils.clickCollapseButton(user)

      expect(commentListTestUtils.getAllComments()).toHaveLength(DEFAULT_DISPLAYABLE_COUNT)
    })
  })

  describe('Форма добавления комментария', () => {
    describe('Роль - любая', () => {
      test('Отображается', () => {
        render(<CommentListTab {...props} />)
        expect(createCommentFormTestUtils.getContainer()).toBeInTheDocument()
      })

      describe('При успешном запросе', () => {
        test.skip('Корректно добавляет комментарий в список', async () => {
          const newComment = taskFixtures.comment()
          mockCreateTaskCommentSuccess(props.taskId, {
            body: newComment,
          })
          mockGetTaskCommentListSuccess(props.taskId, {
            body: taskFixtures.commentList(),
          })

          const { user } = render(<CommentListTab {...props} />, {
            store: getStoreWithAuth(),
          })

          await commentListTestUtils.expectLoadingFinished()
          await createCommentFormTestUtils.setComment(user, newComment.text)
          await createCommentFormTestUtils.setAttachment(user)
          await createCommentFormTestUtils.clickSubmitButton(user)
          await createCommentFormTestUtils.expectLoadingStarted()
          await createCommentFormTestUtils.expectLoadingFinished()

          const newCommentText = within(commentListTestUtils.getFirstComment()).getByText(
            newComment.text,
          )

          expect(newCommentText).toBeInTheDocument()
        })

        test.skip('Сбрасывает значения полей', async () => {
          const newComment = taskFixtures.comment()
          mockCreateTaskCommentSuccess(props.taskId, {
            body: newComment,
          })
          mockGetTaskCommentListSuccess(props.taskId, { body: [] })

          const { user } = render(<CommentListTab {...props} />, {
            store: getStoreWithAuth(),
          })

          await commentListTestUtils.expectLoadingFinished()
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

          const badRequestErrorResponse: CreateCommentFormErrors = {
            comment: [fakeWord()],
            attachments: [fakeWord()],
          }
          mockCreateTaskCommentBadRequestError<CreateCommentFormFields>(props.taskId, {
            body: badRequestErrorResponse,
          })

          const { user } = render(<CommentListTab {...props} />, {
            store: getStoreWithAuth(),
          })

          await commentListTestUtils.expectLoadingFinished()
          await createCommentFormTestUtils.setComment(user, fakeWord())
          await createCommentFormTestUtils.setAttachment(user)
          await createCommentFormTestUtils.clickSubmitButton(user)
          await createCommentFormTestUtils.expectLoadingStarted()
          await createCommentFormTestUtils.expectLoadingFinished()

          const commentError = await createCommentFormTestUtils.findCommentError(
            badRequestErrorResponse.comment![0],
          )

          const attachmentsError = await createCommentFormTestUtils.findAttachmentsError(
            badRequestErrorResponse.attachments![0],
          )

          expect(commentError).toBeInTheDocument()
          expect(attachmentsError).toBeInTheDocument()
        })

        test('Обрабатывается ошибка 404', async () => {
          mockGetTaskCommentListSuccess(props.taskId, { body: [] })
          mockCreateTaskCommentNotFoundError(props.taskId)

          const { user } = render(<CommentListTab {...props} />, {
            store: getStoreWithAuth(),
          })

          await commentListTestUtils.expectLoadingFinished()
          await createCommentFormTestUtils.setComment(user, fakeWord())
          await createCommentFormTestUtils.setAttachment(user)
          await createCommentFormTestUtils.clickSubmitButton(user)
          await createCommentFormTestUtils.expectLoadingStarted()
          await createCommentFormTestUtils.expectLoadingFinished()

          const error = await notificationTestUtils.findNotification(createTaskCommentErrorMsg)
          expect(error).toBeInTheDocument()
        })

        test('Обрабатывается ошибка 500', async () => {
          mockGetTaskCommentListSuccess(props.taskId, { body: [] })
          mockCreateTaskCommentServerError(props.taskId)

          const { user } = render(<CommentListTab {...props} />, {
            store: getStoreWithAuth(),
          })

          await commentListTestUtils.expectLoadingFinished()
          await createCommentFormTestUtils.setComment(user, fakeWord())
          await createCommentFormTestUtils.setAttachment(user)
          await createCommentFormTestUtils.clickSubmitButton(user)
          await createCommentFormTestUtils.expectLoadingStarted()
          await createCommentFormTestUtils.expectLoadingFinished()

          const error = await notificationTestUtils.findNotification(createTaskCommentErrorMsg)
          expect(error).toBeInTheDocument()
        })

        test('Обрабатывается неизвестная ошибка', async () => {
          mockGetTaskCommentListSuccess(props.taskId, { body: [] })
          mockCreateTaskCommentForbiddenError(props.taskId)

          const { user } = render(<CommentListTab {...props} />, {
            store: getStoreWithAuth(),
          })

          await commentListTestUtils.expectLoadingFinished()
          await createCommentFormTestUtils.setComment(user, fakeWord())
          await createCommentFormTestUtils.setAttachment(user)
          await createCommentFormTestUtils.clickSubmitButton(user)
          await createCommentFormTestUtils.expectLoadingStarted()
          await createCommentFormTestUtils.expectLoadingFinished()

          const error = await notificationTestUtils.findNotification(commonApiMessages.unknownError)
          expect(error).toBeInTheDocument()
        })
      })
    })
  })

  describe('Список комментариев', () => {
    test('Отображается', () => {
      render(<CommentListTab {...props} />)
      expect(commentListTestUtils.getContainer()).toBeInTheDocument()
    })

    test('Комментарии отображаются если они есть', async () => {
      const taskCommentList = taskFixtures.commentList(1)
      mockGetTaskCommentListSuccess(props.taskId, {
        body: taskCommentList,
      })

      render(<CommentListTab {...props} />, {
        store: getStoreWithAuth(),
      })

      await commentListTestUtils.expectLoadingFinished()
      const commentList = commentListTestUtils.getAllComments()

      expect(commentList).toHaveLength(taskCommentList.length)
    })

    test('Комментарии не отображаются если их нет', async () => {
      const taskCommentList = taskFixtures.commentList(0)
      mockGetTaskCommentListSuccess(props.taskId, {
        body: taskCommentList,
      })

      render(<CommentListTab {...props} />, {
        store: getStoreWithAuth(),
      })

      await commentListTestUtils.expectLoadingFinished()
      const commentList = commentListTestUtils.queryAllComments()

      expect(commentList).toHaveLength(taskCommentList.length)
    })
  })
})
