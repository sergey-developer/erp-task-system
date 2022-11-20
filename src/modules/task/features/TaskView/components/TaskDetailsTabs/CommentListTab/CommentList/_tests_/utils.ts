import { loadingFinishedBySpinner } from '_tests_/utils'
import { screen, within } from '@testing-library/react'

const getContainer = () => screen.getByTestId('task-comment-list')

const getChildByText = (text: string) => within(getContainer()).getByText(text)

const getAllComments = () =>
  within(getContainer()).getAllByTestId('task-comment')

const queryAllComments = () =>
  within(getContainer()).queryAllByTestId('task-comment')

const getFirstComment = () => getAllComments()[0]

const loadingFinished = loadingFinishedBySpinner('task-comment-list-spinner')

const utils = {
  getContainer,
  getChildByText,

  getAllComments,
  queryAllComments,
  getFirstComment,

  loadingFinished,
}

export default utils
