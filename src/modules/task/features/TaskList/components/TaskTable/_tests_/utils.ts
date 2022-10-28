import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import { NumOrStr } from 'shared/interfaces/utils'

export const getTable = () => screen.getByTestId('table-task-list')

export const getRow = (id: number) => {
  const table = getTable()
  return table.querySelector(`[data-row-key='${id}']`)
}

export const userClickRow = async (user: UserEvent, id: number) => {
  const row = getRow(id)
  await user.click(row!)

  return row
}

export const getColText = (text: string) => within(getTable()).getByText(text)

export const getHeadCol = (text: string) => {
  return getColText(text).parentElement?.parentElement!
}

export const userClickHeadCol = async (user: UserEvent, text: string) => {
  const col = getHeadCol(text)
  await user.click(col)

  return col
}

export const getPaginationContainer = () => within(getTable()).getByRole('list')

export const getPaginationNextButton = () =>
  within(getPaginationContainer()).getByRole('button', {
    name: 'right',
  })

export const getPaginationPrevButton = () =>
  within(getPaginationContainer()).getByRole('button', {
    name: 'left',
  })

export const getPaginationPageButton = (pageNumber: string) =>
  within(getPaginationContainer()).getByRole('listitem', { name: pageNumber })

export const getPageSizeOptionsContainer = (container: HTMLElement) =>
  container.querySelector('.rc-virtual-list') as HTMLElement

export const getPageSizeOption = (container: HTMLElement, pageSize: NumOrStr) =>
  within(container).getByText(`${pageSize} / стр.`)

export const userOpenPageSizeOptions = async (
  user: UserEvent,
  container: HTMLElement,
) => {
  const button = within(container).getByRole('combobox', {
    expanded: false,
  })

  await user.click(button)
}

export const userChangePageSize = async (
  user: UserEvent,
  pageSize: NumOrStr,
) => {
  const pagination = getPaginationContainer()
  await userOpenPageSizeOptions(user, pagination)
  const pageSizeOption = getPageSizeOption(
    getPageSizeOptionsContainer(pagination),
    pageSize,
  )
  await user.click(pageSizeOption)
}
