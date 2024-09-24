import { screen, within } from '@testing-library/react'

import { spinnerTestUtils } from '_tests_/utils/index'

import { TestIdsEnum } from './constants'

const getContainer = () => screen.getByTestId(TestIdsEnum.TaskComments)
const getChildByText = (text: string) => within(getContainer()).getByText(text)
const getAllComments = () => within(getContainer()).getAllByTestId(TestIdsEnum.TaskComment)
const queryAllComments = () => within(getContainer()).queryAllByTestId(TestIdsEnum.TaskComment)
const getFirstComment = () => getAllComments()[0]
const expectLoadingFinished = spinnerTestUtils.expectLoadingFinished('task-comments-loading')

export const commentsTestUtils = {
  getContainer,
  getChildByText,

  getAllComments,
  queryAllComments,
  getFirstComment,

  expectLoadingFinished,
}
