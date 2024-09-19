import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { TestIdsEnum } from '_tests_/features/tasks/SubTaskList/SubTask/constants'
import { buttonTestUtils } from '_tests_/utils/index'

const getContainer = () => screen.getByTestId(TestIdsEnum.SubTaskListItem)

const getAllContainerIn = (container: HTMLElement) =>
  within(container).getAllByTestId(TestIdsEnum.SubTaskListItem)

const getChildByText = (text: string | RegExp) => within(getContainer()).getByText(text)
const queryChildByText = (text: string) => within(getContainer()).queryByText(text)

// tech resolution button
const getTechResolutionButton = () => buttonTestUtils.getButtonIn(getContainer(), /решение/i)
const queryTechResolutionButton = () => buttonTestUtils.queryButtonIn(getContainer(), /решение/i)

const clickTechResolutionButton = async (user: UserEvent) => {
  const button = getTechResolutionButton()
  await user.click(button)
  return button
}

// return reason button
const getReturnReasonButton = () => buttonTestUtils.getButtonIn(getContainer(), /причина возврата/i)

const queryReturnReasonButton = () =>
  buttonTestUtils.queryButtonIn(getContainer(), /причина возврата/i)

const clickReturnReasonButton = async (user: UserEvent) => {
  const button = getReturnReasonButton()
  await user.click(button)
  return button
}

// cancel reason button
const getCancelReasonButton = () => buttonTestUtils.getButtonIn(getContainer(), /причина отмены/i)

const queryCancelReasonButton = () =>
  buttonTestUtils.queryButtonIn(getContainer(), /причина отмены/i)

const clickCancelReasonButton = async (user: UserEvent) => {
  const button = getCancelReasonButton()
  await user.click(button)
  return button
}

// description button
const getDescriptionButton = () =>
  buttonTestUtils.getButtonIn(getContainer(), /подробное описание/i)

const clickDescriptionButton = async (user: UserEvent) => {
  const button = getDescriptionButton()
  await user.click(button)
  return button
}

// rework button
const getReworkButton = () => buttonTestUtils.getButtonIn(getContainer(), /вернуть на доработку/i)

const queryReworkButton = () =>
  buttonTestUtils.queryButtonIn(getContainer(), /вернуть на доработку/i)

const clickReworkButton = async (user: UserEvent) => {
  const button = getReworkButton()
  await user.click(button)
  return button
}

// cancel button
const getCancelButton = () => buttonTestUtils.getButtonIn(getContainer(), /отменить/i)
const queryCancelButton = () => buttonTestUtils.queryButtonIn(getContainer(), /отменить/i)

const clickCancelButton = async (user: UserEvent) => {
  const button = getCancelButton()
  await user.click(button)
  return button
}

export const subTaskTestUtils = {
  getContainer,
  getAllContainerIn,
  getChildByText,
  queryChildByText,

  getTechResolutionButton,
  queryTechResolutionButton,
  clickTechResolutionButton,

  getReturnReasonButton,
  queryReturnReasonButton,
  clickReturnReasonButton,

  getCancelReasonButton,
  queryCancelReasonButton,
  clickCancelReasonButton,

  getDescriptionButton,
  clickDescriptionButton,

  getReworkButton,
  queryReworkButton,
  clickReworkButton,

  getCancelButton,
  queryCancelButton,
  clickCancelButton,
}
