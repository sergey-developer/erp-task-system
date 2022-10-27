import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

export const getTable = () => screen.getByTestId('table-task-list')

export const getFirstRow = () => {
  const table = getTable()
  return table.querySelector('.ant-table-row')
}

export const userClickFirstRow = async (user: UserEvent) => {
  const row = getFirstRow()
  await user.click(row!)

  return row
}

export const getColumnTitle = (title: string) =>
  within(getTable()).getByText(title)

export const getColumnTitleContainer = (title: string) => {
  // eslint-disable-next-line testing-library/no-node-access
  return getColumnTitle(title).parentElement?.parentElement!
}

export const getPaginationContainer = () => screen.getByRole('list')

export const getPaginationNextButton = (container: HTMLElement) =>
  within(container).getByRole('listitem', {
    name: 'Вперед',
  })

export const getPaginationPrevButton = (container: HTMLElement) =>
  within(container).getByRole('listitem', {
    name: 'Назад',
  })

export const getPageButton = (container: HTMLElement, pageNumber: string) =>
  within(container).getByRole('listitem', { name: pageNumber })

export const getPageSizeOptionsContainer = (container: HTMLElement) =>
  container.querySelector('.rc-virtual-list') as HTMLElement

export const getPageSizeOption = (
  container: HTMLElement,
  pageSize: string | number,
) => within(container).getByText(`${pageSize} / стр.`)

export const userOpenPageSizeOptions = async (
  user: UserEvent,
  container: HTMLElement,
) => {
  const button = within(container).getByRole('combobox', {
    expanded: false,
  })

  await user.click(button)
}
