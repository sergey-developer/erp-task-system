import { screen, within } from '_tests_/utils'
import { UserEvent } from '@testing-library/user-event/setup/setup'

export const getTable = (): HTMLElement => screen.getByTestId('table-task-list')

export const getColumnTitle = (
  container: HTMLElement,
  title: string,
): HTMLElement => within(container).getByText(title)

export const getColumnTitleContainer = (
  container: HTMLElement,
  title: string,
): HTMLElement => {
  // eslint-disable-next-line testing-library/no-node-access
  return getColumnTitle(container, title).parentElement?.parentElement!
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
