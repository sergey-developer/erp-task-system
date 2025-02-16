import { screen } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { TestIdsEnum } from '_tests_/features/tasks/components/TasksLayout/constants'
import { radioButtonTestUtils } from '_tests_/helpers/index'

const getContainer = () => screen.getByTestId(TestIdsEnum.TasksLayout)

// task list button
const getTaskListButton = () => radioButtonTestUtils.getRadioButtonIn(getContainer(), 'Реестр')
const clickTaskListButton = async (user: UserEvent) => {
  const button = getTaskListButton()
  await user.click(button)
}

// task list map button
const getTaskListMapButton = () => radioButtonTestUtils.getRadioButtonIn(getContainer(), 'Карта')
const clickTaskListMapButton = async (user: UserEvent) => {
  const button = getTaskListMapButton()
  await user.click(button)
}

export const taskListLayoutTestUtils = {
  getContainer,

  getTaskListButton,
  clickTaskListButton,

  getTaskListMapButton,
  clickTaskListMapButton,
}
