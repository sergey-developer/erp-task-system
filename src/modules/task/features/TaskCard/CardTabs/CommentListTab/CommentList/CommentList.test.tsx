import { loadingFinishedBySpinner, render } from '_tests_/utils'
import { screen, within } from '@testing-library/react'
import taskFixtures from 'fixtures/task'

import CommentList from './index'

const getContainer = () => screen.getByTestId('task-comment-list')

const getChildByText = (text: string) => within(getContainer()).getByText(text)

const getAllComments = () =>
  within(getContainer()).getAllByTestId('task-comment')

const queryAllComments = () =>
  within(getContainer()).queryAllByTestId('task-comment')

const getFirstComment = () => getAllComments()[0]

const loadingFinished = loadingFinishedBySpinner('task-comment-list-spinner')

export const testUtils = {
  getContainer,
  getChildByText,

  getAllComments,
  queryAllComments,
  getFirstComment,

  loadingFinished,
}

describe('Список комментариев заявки', () => {
  test('Отображает комментарии если они есть', () => {
    const data = taskFixtures.getTaskCommentList()

    render(<CommentList isLoading={false} data={data} />)

    expect(testUtils.getAllComments()).toHaveLength(data.length)
  })

  test('Отображает соответствующий текст, если загрузка завершена и комментариев нет', () => {
    render(<CommentList isLoading={false} data={[]} />)

    expect(
      testUtils.getChildByText('Комментариев пока нет'),
    ).toBeInTheDocument()
  })
})
