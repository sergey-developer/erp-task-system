import { getButtonIn, loadingStartedByButton } from '_tests_/utils'
import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import { ReclassificationReasonEnum } from 'modules/task/constants/common'

import { reclassificationReasonLabels } from '../constants'

const getContainer = () => screen.getByTestId('task-reclassification-modal')
const getChildByText = (text: string) => within(getContainer()).getByText(text)

// close button
const getCloseButton = () => getButtonIn(getContainer(), /close/i)

const userClickCloseButton = async (user: UserEvent) => {
  const button = getCloseButton()
  await user.click(button)
  return button
}

// cancel button
const getCancelButton = () => getButtonIn(getContainer(), /отменить/i)

const userClickCancelButton = async (user: UserEvent) => {
  const button = getCancelButton()
  await user.click(button)
  return button
}

// submit button
const getSubmitButton = () =>
  getButtonIn(getContainer(), /запросить переклассификацию/i)

const userClickSubmitButton = async (user: UserEvent) => {
  const button = getSubmitButton()
  await user.click(button)
  return button
}

// reclassification reason
const getReclassificationReasonBlock = () =>
  within(getContainer()).getByTestId('reclassification-reason')

const getReclassificationReasonTitle = () =>
  within(getReclassificationReasonBlock()).getByTitle(
    'Причина переклассификации',
  )

const getReclassificationReasonField = (
  reason: ReclassificationReasonEnum,
): HTMLInputElement =>
  within(getContainer()).getByRole('radio', {
    name: reclassificationReasonLabels[reason],
  })

const findReclassificationReasonError = (text: string) =>
  within(getReclassificationReasonBlock()).findByText(text)

const userSetReclassificationReason = async (
  user: UserEvent,
  reason: ReclassificationReasonEnum,
) => {
  const field = getReclassificationReasonField(reason)
  await user.click(field)
  return field
}

// comment
const getCommentBlock = () => within(getContainer()).getByTestId('comment')

const getCommentTitle = () =>
  within(getCommentBlock()).getByTitle('Комментарий')

const getCommentField = () =>
  within(getCommentBlock()).getByPlaceholderText('Опишите ситуацию')

const findCommentError = (text: string) =>
  within(getCommentBlock()).findByText(text)

const userSetComment = async (user: UserEvent, value: string) => {
  const field = getCommentField()
  await user.type(field, value)
  return field
}

// loading
const loadingStarted = () => loadingStartedByButton(getSubmitButton())

const utils = {
  getContainer,
  getChildByText,

  getCloseButton,
  userClickCloseButton,

  getCancelButton,
  userClickCancelButton,

  getSubmitButton,
  userClickSubmitButton,

  getReclassificationReasonBlock,
  getReclassificationReasonTitle,
  getReclassificationReasonField,
  findReclassificationReasonError,
  userSetReclassificationReason,

  getCommentBlock,
  getCommentTitle,
  getCommentField,
  findCommentError,
  userSetComment,

  loadingStarted,
}

export default utils
