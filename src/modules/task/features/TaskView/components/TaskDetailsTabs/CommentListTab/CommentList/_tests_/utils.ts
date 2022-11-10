import { screen, within } from '@testing-library/react'

const getContainer = () => screen.getByTestId('task-comment-list')

const getAllComments = () =>
  within(getContainer()).getAllByTestId('task-comment')

const queryAllComments = () =>
  within(getContainer()).queryAllByTestId('task-comment')

const getFirstComment = () => getAllComments()[0]

const utils = {
  getContainer,

  getAllComments,
  queryAllComments,
  getFirstComment,
}

export default utils
