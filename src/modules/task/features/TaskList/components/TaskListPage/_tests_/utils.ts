import { buttonTestUtils, generateWord } from '_tests_/utils'
import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

const getContainer = () => screen.getByTestId('page-task-list')

const getSearchInput = () =>
  within(getContainer()).getByPlaceholderText('Искать заявку по номеру')

const getSearchButton = () =>
  buttonTestUtils.getButtonIn(getContainer(), /search/)

const getSearchClearButton = () =>
  buttonTestUtils.getButtonIn(getContainer(), 'close-circle')

const userClickSearchClearButton = async (user: UserEvent) => {
  const button = getSearchClearButton()
  await user.click(button)
  return button
}

const getReloadListButton = () =>
  buttonTestUtils.getButtonIn(getContainer(), /sync/)

const userClickReloadListButton = async (user: UserEvent) => {
  const button = getReloadListButton()
  await user.click(button)
  return button
}

const getCreateTaskButton = () =>
  buttonTestUtils.getButtonIn(getContainer(), /создать заявку/i)

const getExtendedFilterButton = () =>
  buttonTestUtils.getButtonIn(getContainer(), /filter/)

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

const utils = {
  getContainer,

  getSearchInput,
  userFillSearchInput,

  getSearchButton,

  getSearchClearButton,
  userClickSearchClearButton,

  getReloadListButton,
  userClickReloadListButton,

  getCreateTaskButton,

  getExtendedFilterButton,
  userOpenExtendedFilter,
}

export default utils
