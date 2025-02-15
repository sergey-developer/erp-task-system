import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import { TaskSuspendRequestProps } from 'features/tasks/components/TaskSuspendRequest/index'

import { TestIdsEnum } from '_tests_/features/tasks/components/TaskSuspendRequest/constants'
import { buttonTestUtils, iconTestUtils } from '_tests_/utils'

export const cancelRequestAction: TaskSuspendRequestProps['action'] = {
  text: 'Отменить запрос',
  onClick: jest.fn(),
}

export const returnInWorkAction: TaskSuspendRequestProps['action'] = {
  text: 'Вернуть в работу',
  onClick: jest.fn(),
}

const getContainer = () => screen.getByTestId(TestIdsEnum.TaskDetailsSuspendRequest)
const findContainer = () => screen.findByTestId(TestIdsEnum.TaskDetailsSuspendRequest)
const queryContainer = () => screen.queryByTestId(TestIdsEnum.TaskDetailsSuspendRequest)
const getChildByText = (text: string | RegExp) => within(getContainer()).getByText(text)
const getIcon = () => iconTestUtils.getIconByNameIn(getContainer(), 'pause-circle')

// cancel button
const getCancelButton = () =>
  buttonTestUtils.getButtonIn(getContainer(), new RegExp(cancelRequestAction.text))

const queryCancelButton = () =>
  buttonTestUtils.queryButtonIn(getContainer(), new RegExp(cancelRequestAction.text))

const clickCancelButton = async (user: UserEvent) => {
  const button = getCancelButton()
  await user.click(button)
  return button
}

const expectCancelRequestLoadingStarted = () =>
  buttonTestUtils.expectLoadingStarted(getCancelButton())

// return button
const getReturnToWorkButton = () =>
  buttonTestUtils.getButtonIn(getContainer(), new RegExp(returnInWorkAction.text))

const queryReturnToWorkButton = () =>
  buttonTestUtils.queryButtonIn(getContainer(), new RegExp(returnInWorkAction.text))

const clickReturnToWorkButton = async (user: UserEvent) => {
  const button = getReturnToWorkButton()
  await user.click(button)
  return button
}

const expectReturnToWorkLoadingStarted = () =>
  buttonTestUtils.expectLoadingStarted(getReturnToWorkButton())

export const taskSuspendRequestTestUtils = {
  getContainer,
  findContainer,
  queryContainer,

  getChildByText,
  getIcon,

  getCancelButton,
  queryCancelButton,
  clickCancelButton,
  expectCancelRequestLoadingStarted,

  getReturnToWorkButton,
  queryReturnToWorkButton,
  clickReturnToWorkButton,
  expectReturnToWorkLoadingStarted,
}
