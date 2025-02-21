import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { updateTasksButtonTestUtils } from '_tests_/features/tasks/components/UpdateTasksButton/testUtils'
import { TestIdsEnum } from '_tests_/features/tasks/pages/TasksPage/constants'
import { buttonTestUtils } from '_tests_/helpers/index'

const getContainer = () => screen.getByTestId(TestIdsEnum.TasksPage)
const findContainer = () => screen.findByTestId(TestIdsEnum.TasksPage)

// search input
const getSearchInput = () => within(getContainer()).getByPlaceholderText('Искать заявку по номеру')
const getSearchButton = () => buttonTestUtils.getButtonIn(getContainer(), /search/)
const setSearchValue = async (user: UserEvent, value: string, pressEnter: boolean = false) => {
  const input = getSearchInput()
  await user.type(input, pressEnter ? value.concat('{enter}') : value)
  return input
}
const getSearchClearButton = () => buttonTestUtils.getButtonIn(getContainer(), 'close-circle')
const clickSearchClearButton = async (user: UserEvent) => {
  const button = getSearchClearButton()
  await user.click(button)
  return button
}

// update tasks button
const getUpdateTasksButton = () => updateTasksButtonTestUtils.getUpdateTasksButton(getContainer())
const clickUpdateTasksButton = async (user: UserEvent) => {
  const button = getUpdateTasksButton()
  await user.click(button)
}

// create task button
const getCreateTaskButton = () => buttonTestUtils.getButtonIn(getContainer(), /создать заявку/i)

// extended filter button
const getTasksFilterButton = () => buttonTestUtils.getButtonIn(getContainer(), /filter/)
const clickTasksFilterButton = async (user: UserEvent) => user.click(getTasksFilterButton())

// fast filters
const getFastFilter = () => within(getContainer()).getByTestId(TestIdsEnum.FastFilter)
const getFastFilterByLines = () => within(getContainer()).getByTestId(TestIdsEnum.FastFilterByLines)
const queryFastFilterByLines = () =>
  within(getContainer()).queryByTestId(TestIdsEnum.FastFilterByLines)

export const tasksPageTestUtils = {
  getContainer,
  findContainer,

  getSearchInput,
  setSearchValue,

  getSearchButton,

  getSearchClearButton,
  clickSearchClearButton,

  getUpdateTasksButton,
  clickUpdateTasksButton,

  getCreateTaskButton,

  getTasksFilterButton,
  clickTasksFilterButton,

  getFastFilter,
  getFastFilterByLines,
  queryFastFilterByLines,
}
