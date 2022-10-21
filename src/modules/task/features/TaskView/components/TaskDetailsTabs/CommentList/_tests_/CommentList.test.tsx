import { getTaskComment } from '_fixtures_/task'
import {
  generateId,
  render,
  setupApiTests,
  waitFinishLoadingByButton,
} from '_tests_/utils'
import { getStoreWithAuth } from '_tests_/utils/auth'
import { UserRolesEnum } from 'shared/constants/roles'

import {
  getCommentInput,
  getFormContainer,
  getSubmitButton,
} from '../AddCommentForm/_tests_/utils'
import CommentList from '../index'
import { baseProps } from './constants'
import {
  mockCreateTaskCommentSuccess,
  mockGetTaskCommentListSuccess,
} from './mocks'

setupApiTests()

describe('Список комментариев заявки', () => {
  describe('Форма добавления заявки', () => {
    test('Отображается', () => {
      render(<CommentList {...baseProps} />)

      const formContainer = getFormContainer()
      expect(formContainer).toBeInTheDocument()
    })

    test('Корректно добавляет комментарий в список', async () => {
      const taskComment1 = getTaskComment()
      const taskComment2 = getTaskComment({ text: taskComment1.text })

      mockGetTaskCommentListSuccess([taskComment2])
      mockCreateTaskCommentSuccess(taskComment1)

      const store = getStoreWithAuth({
        userId: generateId(),
        userRole: UserRolesEnum.FirstLineSupport,
      })

      const { user } = render(<CommentList {...baseProps} />, { store })

      const submitButton = getSubmitButton()
      const commentInput = getCommentInput()

      await user.type(commentInput, taskComment1.text)
      await user.click(submitButton)

      await waitFinishLoadingByButton(submitButton)

      // const comments = screen.getAllByText(taskComment1.text)
      // screen.debug()
    })
  })
})
