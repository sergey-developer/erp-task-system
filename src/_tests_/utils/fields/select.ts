import { ByRoleOptions } from '@testing-library/dom/types/queries'
import { screen, waitFor, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import { MaybeNull } from 'shared/interfaces/utils'

export const getSelect = (container: HTMLElement, opts?: ByRoleOptions) =>
  within(container).getByRole('combobox', opts)

export const querySelect = (container: HTMLElement, opts?: ByRoleOptions) =>
  within(container).queryByRole('combobox', opts)

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

export const getAllSelectOption = () => screen.getAllByRole('option')

export const getSelectOption = (name: string) =>
  screen.getByRole('option', { name })

export const querySelectOption = (name: string) =>
  screen.queryByRole('option', { name })

export const userClickOption = async (user: UserEvent, name: string) => {
  const option = screen.getByText(name)
  await user.click(option)
  return option
}

export const userSearchInSelect = async (
  user: UserEvent,
  container: HTMLElement,
  searchValue: string,
) => {
  const openedSelect = getSelect(container, { expanded: true })
  await user.type(openedSelect, searchValue)
}

export const selectDisabled = async (element: HTMLElement) => {
  await waitFor(() => {
    expect(element.querySelector('.ant-select-disabled')).toBeInTheDocument()
  })
}

export const selectNotDisabled = async (element: HTMLElement) => {
  await waitFor(() => {
    expect(
      element.querySelector('.ant-select-disabled'),
    ).not.toBeInTheDocument()
  })
}
