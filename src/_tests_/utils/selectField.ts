import { screen, within } from '_tests_/utils'
import { ByRoleOptions } from '@testing-library/dom/types/queries'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import { MaybeNull } from 'shared/interfaces/utils'

export const getSelect = (container: HTMLElement, opts?: ByRoleOptions) =>
  within(container).getByRole('combobox', opts)

export const userOpenSelect = async (
  user: UserEvent,
  container: HTMLElement,
) => {
  const selectInput = getSelect(container)
  await user.click(selectInput)
}

export const getSelectedOption = (
  container: HTMLElement,
): MaybeNull<HTMLElement> =>
  container.querySelector('.ant-select-selection-item')

export const getSelectOption = (name: string) =>
  screen.getByRole('option', { name })

export const querySelectOption = (name: string) =>
  screen.queryByRole('option', { name })

export const userSearchInSelect = async (
  user: UserEvent,
  container: HTMLElement,
  searchValue: string,
) => {
  const openedSelect = getSelect(container, { expanded: true })
  await user.type(openedSelect, searchValue)
}
