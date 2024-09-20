import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { buttonTestUtils, iconTestUtils } from '_tests_/utils/index'

import { TestIdsEnum } from './constants'

const getContainer = () => screen.getByTestId(TestIdsEnum.TaskRequest)

const findContainer = () => screen.findByTestId(TestIdsEnum.TaskRequest)

const queryContainer = () => screen.queryByTestId(TestIdsEnum.TaskRequest)

const getChildByText = (text: string | RegExp) => within(getContainer()).getByText(text)

const getIcon = () => iconTestUtils.getIconByNameIn(getContainer(), 'pause-circle')

const getActionButton = (label: string) =>
  buttonTestUtils.getButtonIn(getContainer(), new RegExp(label))

const queryActionButton = (label: string) =>
  buttonTestUtils.queryButtonIn(getContainer(), new RegExp(label))

const clickActionButton = async (user: UserEvent, label: string) => {
  const button = getActionButton(label)
  await user.click(button)
  return button
}

const expectActionLoadingStarted = (label: string) =>
  buttonTestUtils.expectLoadingStarted(getActionButton(label))

export const taskRequestTestUtils = {
  getContainer,
  findContainer,
  queryContainer,

  getChildByText,
  getIcon,

  getActionButton,
  queryActionButton,
  clickActionButton,
  expectActionLoadingStarted,
}
