import { getButtonIn } from '_tests_/utils'
import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

const getContainer = () => screen.getByTestId('page-task-list')

const getSearchInput = () =>
  within(getContainer()).getByPlaceholderText('Искать заявку по номеру')

const getSearchButton = () => getButtonIn(getContainer(), /search/)

const getSearchClearButton = () => getButtonIn(getContainer(), 'close-circle')

const userClickSearchClearButton = async (user: UserEvent) => {
  const button = getSearchClearButton()
  await user.click(button)
  return button
}

const getReloadListButton = () => getButtonIn(getContainer(), /sync/)

const userClickReloadListButton = async (user: UserEvent) => {
  const button = getReloadListButton()
  await user.click(button)
  return button
}

const getCreateTaskButton = () => getButtonIn(getContainer(), /создать заявку/i)

const getExtendedFilterButton = () => getButtonIn(getContainer(), /filter/)

const userOpenExtendedFilter = async (user: UserEvent) => {
  const extendedFilterButton = getExtendedFilterButton()
  await user.click(extendedFilterButton)
  return extendedFilterButton
}

const userFillSearchInput = async (
  user: UserEvent,
  value: string,
  pressEnter: boolean = false,
) => {
  const input = getSearchInput()
  await user.type(input, pressEnter ? value.concat('{enter}') : value)
  return input
}

const userClearSearchFieldByBackspace = async (
  user: UserEvent,
  input: HTMLElement,
) => {
  await user.type(input, '{backspace}')
}

const utils = {
  getContainer,

  getSearchInput,
  userFillSearchInput,

  getSearchButton,

  getSearchClearButton,
  userClickSearchClearButton,

  userClearSearchFieldByBackspace,

  getReloadListButton,
  userClickReloadListButton,

  getCreateTaskButton,

  getExtendedFilterButton,
  userOpenExtendedFilter,
}

export default utils
