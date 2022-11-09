import { getButtonIn, loadingFinishedBySpinner } from '_tests_/utils'
import { screen, within } from '@testing-library/react'

const getContainer = () => screen.getByTestId('task-comment-list-tab')

const getFirstComment = () =>
  within(getContainer()).getAllByTestId('task-comment')[0]

const getChildByText = (text: string) => within(getContainer()).getByText(text)

const getExpandButton = (commentCount: number) =>
  getButtonIn(getContainer(), `Отобразить все комментарии: ${commentCount}`)

const getCollapseButton = () =>
  getButtonIn(getContainer(), 'Скрыть комментарии')

const loadingFinished = loadingFinishedBySpinner('spinner-task-comment-list')

const utils = {
  getContainer,
  getChildByText,
  getFirstComment,
  getExpandButton,
  getCollapseButton,
  loadingFinished,
}

export default utils
