import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import { ReclassificationReasonEnum } from 'features/tasks/api/constants'
import { reclassificationReasonDict } from 'features/tasks/constants'

import { TestIdsEnum } from '_tests_/features/tasks/components/RequestTaskReclassificationModal/constants'
import { buttonTestUtils, radioButtonTestUtils } from '_tests_/helpers'

const getContainer = () => screen.getByTestId(TestIdsEnum.RequestTaskReclassificationModal)
const queryContainer = () => screen.queryByTestId(TestIdsEnum.RequestTaskReclassificationModal)
const findContainer = () => screen.findByTestId(TestIdsEnum.RequestTaskReclassificationModal)

const getChildByText = (text: string) => within(getContainer()).getByText(text)

// close button
const getCloseButton = () => buttonTestUtils.getButtonIn(getContainer(), /close/i)

const clickCloseButton = async (user: UserEvent) => {
  const button = getCloseButton()
  await user.click(button)
  return button
}

// cancel button
const getCancelButton = () => buttonTestUtils.getButtonIn(getContainer(), /отменить/i)

const clickCancelButton = async (user: UserEvent) => {
  const button = getCancelButton()
  await user.click(button)
  return button
}

// submit button
const getSubmitButton = () =>
  buttonTestUtils.getButtonIn(getContainer(), /запросить переклассификацию/i)

const clickSubmitButton = async (user: UserEvent) => {
  const button = getSubmitButton()
  await user.click(button)
  return button
}

// reclassification reason
const getReclassificationReasonBlock = () =>
  within(getContainer()).getByTestId(TestIdsEnum.ReclassificationReason)

const getReclassificationReasonTitle = () =>
  within(getReclassificationReasonBlock()).getByTitle('Причина переклассификации')

const getReclassificationReasonField = (reason: ReclassificationReasonEnum): HTMLInputElement =>
  radioButtonTestUtils.getRadioButtonIn(
    getReclassificationReasonBlock(),
    reclassificationReasonDict[reason],
  )

const findReclassificationReasonError = (text: string) =>
  within(getReclassificationReasonBlock()).findByText(text)

const setReclassificationReason = async (user: UserEvent, reason: ReclassificationReasonEnum) => {
  const field = getReclassificationReasonField(reason)
  await user.click(field)
  return field
}

// comment
const getCommentBlock = () => within(getContainer()).getByTestId('comment')
const getCommentTitle = () => within(getCommentBlock()).getByTitle('Комментарий')
const getCommentField = () => within(getCommentBlock()).getByPlaceholderText('Опишите ситуацию')
const findCommentError = (text: string) => within(getCommentBlock()).findByText(text)

const setComment = async (user: UserEvent, value: string) => {
  const field = getCommentField()
  await user.type(field, value)
  return field
}

// loading
const expectLoadingStarted = () => buttonTestUtils.expectLoadingStarted(getSubmitButton())
const expectLoadingFinished = () => buttonTestUtils.expectLoadingFinished(getSubmitButton())

export const requestTaskReclassificationModalTestUtils = {
  getContainer,
  queryContainer,
  findContainer,
  getChildByText,

  getCloseButton,
  clickCloseButton,

  getCancelButton,
  clickCancelButton,

  getSubmitButton,
  clickSubmitButton,

  getReclassificationReasonBlock,
  getReclassificationReasonTitle,
  getReclassificationReasonField,
  findReclassificationReasonError,
  setReclassificationReason,

  getCommentBlock,
  getCommentTitle,
  getCommentField,
  findCommentError,
  setComment,

  expectLoadingStarted,
  expectLoadingFinished,
}
