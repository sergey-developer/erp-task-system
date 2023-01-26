import { ByRoleOptions } from '@testing-library/dom/types/queries'
import { screen, waitFor, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import { MaybeNull, NumberOrString } from 'shared/interfaces/utils'

export const getSelect = (container: HTMLElement, opts?: ByRoleOptions) =>
  within(container).getByRole('combobox', opts)

export const querySelect = (container: HTMLElement, opts?: ByRoleOptions) =>
  within(container).queryByRole('combobox', opts)

export const findSelect = (container: HTMLElement, opts?: ByRoleOptions) =>
  within(container).findByRole('combobox', opts)

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

export const getSelectOption_new = (id: NumberOrString | RegExp) =>
  screen.getByTestId(`select-option-${id}`)

export const querySelectOption = (name: string) =>
  screen.queryByRole('option', { name })

export const clickSelectOption = async (user: UserEvent, name: string) => {
  const option = await screen.findByText(name)
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

export const expectOptionSelected = async (element: HTMLElement) => {
  await waitFor(() => {
    expect(element).toHaveClass('ant-select-item-option-selected')
  })
}

export const expectOptionNotSelected = async (element: HTMLElement) => {
  await waitFor(() => {
    expect(element).not.toHaveClass('ant-select-item-option-selected')
  })
}

export const selectDisabled = async (element: HTMLElement) => {
  await waitFor(() => {
    expect(element.querySelector('.ant-select-disabled')).toBeInTheDocument()
  })
}

export const expectOptionDisabled = async (element: HTMLElement) => {
  await waitFor(() => {
    expect(element).toHaveClass('ant-select-item-option-disabled')
  })
}

export const expectOptionNotDisabled = async (element: HTMLElement) => {
  await waitFor(() => {
    expect(element).toHaveClass('ant-select-item-option-disabled')
  })
}

export const selectNotDisabled = async (element: HTMLElement) => {
  await waitFor(() => {
    expect(
      element.querySelector('.ant-select-disabled'),
    ).not.toBeInTheDocument()
  })
}
