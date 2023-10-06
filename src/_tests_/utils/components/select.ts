import { ByRoleOptions } from '@testing-library/dom/types/queries'
import { screen, waitFor, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { MaybeNull, NumberOrString } from 'shared/types/utils'

const selectArrowLoadingClass = '.ant-select-arrow-loading'

const getSelect = (container: HTMLElement, opts?: ByRoleOptions) =>
  within(container).getByRole('combobox', opts)

const querySelect = (container: HTMLElement, opts?: ByRoleOptions) =>
  within(container).queryByRole('combobox', opts)

const findSelect = (container: HTMLElement, opts?: ByRoleOptions) =>
  within(container).findByRole('combobox', opts)

const openSelect = async (user: UserEvent, container: HTMLElement) => {
  const selectInput = getSelect(container)
  await user.click(selectInput)
}

const getSelectedOption = (container: HTMLElement): MaybeNull<HTMLElement> =>
  container.querySelector('.ant-select-selection-item')

const getSelectedOptionByTitle = (container: HTMLElement, title: string): HTMLElement =>
  within(container).getByTitle(title)

const querySelectedOptionByTitle = (
  container: HTMLElement,
  title: string,
): MaybeNull<HTMLElement> => within(container).queryByTitle(title)

const getSelectedOptionText = (option: HTMLElement, text: string) => within(option).getByText(text)

const getAllSelectOption = () => screen.getAllByRole('option')

const getSelectOption = (name: string) => screen.getByRole('option', { name })

const getSelectOptionById = (id: NumberOrString | RegExp) =>
  screen.getByTestId(`select-option-${id}`)

const querySelectOption = (name: string) => screen.queryByRole('option', { name })

const clickSelectOption = async (user: UserEvent, name: string, isGetByRole?: boolean) => {
  let option

  if (isGetByRole) {
    option = getSelectOption(name)
  } else {
    option = await screen.findByText(name)
  }

  await user.click(option)
  return option
}

const userSearchInSelect = async (user: UserEvent, container: HTMLElement, searchValue: string) => {
  const openedSelect = getSelect(container, { expanded: true })
  await user.type(openedSelect, searchValue)
}

const expectOptionSelected = async (element: HTMLElement) => {
  await waitFor(() => {
    expect(element).toHaveClass('ant-select-item-option-selected')
  })
}

const expectOptionNotSelected = async (element: HTMLElement) => {
  await waitFor(() => {
    expect(element).not.toHaveClass('ant-select-item-option-selected')
  })
}

const selectDisabledIn = async (container: HTMLElement) => {
  await waitFor(() => {
    expect(container.querySelector('.ant-select-disabled')).toBeInTheDocument()
  })
}

const selectNotDisabledIn = async (container: HTMLElement) => {
  await waitFor(() => {
    expect(container.querySelector('.ant-select-disabled')).not.toBeInTheDocument()
  })
}

const expectSelectDisabled = async (select: HTMLElement) => {
  await waitFor(() => {
    expect(select).toHaveClass('ant-select-disabled')
  })
}

const expectSelectNotDisabled = async (select: HTMLElement) => {
  await waitFor(() => {
    expect(select).not.toHaveClass('ant-select-disabled')
  })
}

const expectOptionDisabled = async (element: HTMLElement) => {
  await waitFor(() => {
    expect(element).toHaveClass('ant-select-item-option-disabled')
  })
}

const expectOptionNotDisabled = async (element: HTMLElement) => {
  await waitFor(() => {
    expect(element).toHaveClass('ant-select-item-option-disabled')
  })
}

const expectLoadingStarted = async (container: HTMLElement) => {
  await waitFor(() => {
    expect(container.querySelector(selectArrowLoadingClass)).toBeInTheDocument()
  })
}

const expectLoadingFinished = async (container: HTMLElement) => {
  await waitFor(() => {
    expect(container.querySelector(selectArrowLoadingClass)).not.toBeInTheDocument()
  })
}

const utils = {
  getSelect,
  querySelect,
  findSelect,
  openSelect,
  getSelectedOption,
  getSelectedOptionByTitle,
  querySelectedOptionByTitle,
  getSelectedOptionText,
  getAllSelectOption,
  getSelectOption,
  getSelectOptionById,
  querySelectOption,
  clickSelectOption,
  userSearchInSelect,
  expectOptionSelected,
  expectOptionNotSelected,
  selectDisabledIn,
  selectNotDisabledIn,
  expectSelectDisabled,
  expectSelectNotDisabled,
  expectOptionDisabled,
  expectOptionNotDisabled,
  expectLoadingStarted,
  expectLoadingFinished,
}

export default utils
