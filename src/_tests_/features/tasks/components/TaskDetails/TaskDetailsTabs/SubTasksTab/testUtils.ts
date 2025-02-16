import { screen } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { buttonTestUtils, spinnerTestUtils } from '_tests_/helpers'

import { TestIdsEnum } from './constants'

const getContainer = () => screen.getByTestId(TestIdsEnum.SubtaskListTab)

const getCreateSubTaskButton = () =>
  buttonTestUtils.getButtonIn(getContainer(), /создать новое задание/i)

const clickCreateSubTaskButton = async (user: UserEvent) => {
  const button = getCreateSubTaskButton()
  await user.click(button)
  return button
}

export const subTaskListTabTestUtils = {
  getContainer,

  getCreateSubTaskButton,
  openCreateSubTaskModal: clickCreateSubTaskButton,

  expectLoadingFinished: spinnerTestUtils.expectLoadingFinished('sub-task-list-loading'),
}
