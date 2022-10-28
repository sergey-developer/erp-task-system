import { generateWord, getButtonIn } from '_tests_/utils'
import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

export const getTaskListPage = () => screen.getByTestId('page-task-list')

export const getSearchInput = () =>
  within(getTaskListPage()).getByPlaceholderText('Искать заявку по номеру')

export const getSearchButton = () => getButtonIn(getTaskListPage(), 'search')

export const getSearchClearButton = () =>
  getButtonIn(getTaskListPage(), 'close-circle')

export const userFillSearchInput = async (
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

export const getExtendedFilterButton = () =>
  getButtonIn(getTaskListPage(), /Фильтры/i)
