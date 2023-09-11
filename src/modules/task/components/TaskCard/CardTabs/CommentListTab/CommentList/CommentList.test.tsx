import { screen, within } from '@testing-library/react'

import taskFixtures from '_tests_/fixtures/task'

import { spinnerTestUtils, render } from '_tests_/utils'

import CommentList, { CommentListProps } from './index'

const props: Readonly<CommentListProps> = {
  comments: taskFixtures.commentList(),
  isLoading: false,
}

const getContainer = () => screen.getByTestId('task-comment-list')

const getChildByText = (text: string) => within(getContainer()).getByText(text)

const getAllComments = () =>
  within(getContainer()).getAllByTestId('task-comment')

const queryAllComments = () =>
  within(getContainer()).queryAllByTestId('task-comment')

const getFirstComment = () => getAllComments()[0]

const expectLoadingFinished = spinnerTestUtils.expectLoadingFinished(
  'task-comment-list-loading',
)

export const testUtils = {
  getContainer,
  getChildByText,

  getAllComments,
  queryAllComments,
  getFirstComment,

  expectLoadingFinished,
}

describe('Список комментариев заявки', () => {
  test('Отображает комментарии если они есть', () => {
    render(<CommentList {...props} />)
    expect(testUtils.getAllComments()).toHaveLength(props.comments.length)
  })

  test('Отображает соответствующий текст, если загрузка завершена и комментариев нет', () => {
    render(<CommentList {...props} isLoading={false} comments={[]} />)

    expect(
      testUtils.getChildByText('Комментариев пока нет'),
    ).toBeInTheDocument()
  })
})
