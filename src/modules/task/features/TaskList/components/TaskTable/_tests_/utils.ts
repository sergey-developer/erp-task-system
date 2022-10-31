import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import { NumOrStr } from 'shared/interfaces/utils'

const getTable = () => screen.getByTestId('table-task-list')

const getRow = (id: number) =>
  getTable().querySelector(`[data-row-key='${id}']`)

const userClickRow = async (user: UserEvent, id: number) => {
  const row = getRow(id)
  await user.click(row!)

  return row
}

const getColText = (text: string) => within(getTable()).getByText(text)

const getHeadCol = (text: string) => {
  return getColText(text).parentElement?.parentElement!
}

const userClickHeadCol = async (user: UserEvent, text: string) => {
  const col = getHeadCol(text)
  await user.click(col)

  return col
}

const getPaginationContainer = () => within(getTable()).getByRole('list')

const getPaginationNextButton = () =>
  within(getPaginationContainer()).getByRole('button', {
    name: 'right',
  })

const getPaginationPrevButton = () =>
  within(getPaginationContainer()).getByRole('button', {
    name: 'left',
  })

const getPaginationPageButton = (pageNumber: string) =>
  within(getPaginationContainer()).getByRole('listitem', { name: pageNumber })

const getPageSizeOptionsContainer = (container: HTMLElement) =>
  container.querySelector('.rc-virtual-list') as HTMLElement

const getPageSizeOption = (container: HTMLElement, pageSize: NumOrStr) =>
  within(container).getByText(`${pageSize} / стр.`)

const userOpenPageSizeOptions = async (
  user: UserEvent,
  container: HTMLElement,
) => {
  const button = within(container).getByRole('combobox', {
    expanded: false,
  })

  await user.click(button)
}

const userChangePageSize = async (user: UserEvent, pageSize: NumOrStr) => {
  const pagination = getPaginationContainer()
  await userOpenPageSizeOptions(user, pagination)
  const pageSizeOption = getPageSizeOption(
    getPageSizeOptionsContainer(pagination),
    pageSize,
  )
  await user.click(pageSizeOption)
}

export {
  getTable,
  getRow,
  userClickRow,
  getColText,
  getHeadCol,
  userClickHeadCol,
  getPaginationContainer,
  getPaginationNextButton,
  getPaginationPrevButton,
  getPaginationPageButton,
  getPageSizeOptionsContainer,
  getPageSizeOption,
  userOpenPageSizeOptions,
  userChangePageSize,
}
