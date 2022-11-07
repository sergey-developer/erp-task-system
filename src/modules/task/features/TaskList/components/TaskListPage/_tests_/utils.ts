import { generateWord, getButtonIn } from '_tests_/utils'
import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

const getTaskListPage = () => screen.getByTestId('page-task-list')

const getSearchInput = () =>
  within(getTaskListPage()).getByPlaceholderText('Искать заявку по номеру')

const getSearchButton = () => getButtonIn(getTaskListPage(), /search/)

const getSearchClearButton = () =>
  getButtonIn(getTaskListPage(), 'close-circle')

const userClickSearchClearButton = async (user: UserEvent) => {
  const button = getSearchClearButton()
  await user.click(button)
  return button
}

const getReloadListButton = () => getButtonIn(getTaskListPage(), /sync/)

const userClickReloadListButton = async (user: UserEvent) => {
  const button = getReloadListButton()
  await user.click(button)
  return button
}

const getCreateTaskButton = () =>
  getButtonIn(getTaskListPage(), /создать заявку/i)

const getExtendedFilterButton = () => getButtonIn(getTaskListPage(), /filter/)

const userOpenExtendedFilter = async (user: UserEvent) => {
  const extendedFilterButton = getExtendedFilterButton()
  await user.click(extendedFilterButton)
  return extendedFilterButton
}

const userFillSearchInput = async (
  user: UserEvent,
  pressEnter: boolean = false,
) => {
  const searchInput = getSearchInput()
  const searchValue = generateWord()

  await user.type(
    searchInput,
    pressEnter ? searchValue.concat('{enter}') : searchValue,
  )

  return { searchInput, searchValue }
}

const testUtils = {
  getTaskListPage,
  getSearchInput,
  getSearchButton,
  getSearchClearButton,
  userClickSearchClearButton,
  getReloadListButton,
  userClickReloadListButton,
  getCreateTaskButton,
  getExtendedFilterButton,
  userOpenExtendedFilter,
  userFillSearchInput,
}

export default testUtils
