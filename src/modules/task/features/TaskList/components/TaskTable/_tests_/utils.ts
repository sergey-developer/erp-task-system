import { screen, within } from '_tests_/utils'
import { Nullable } from 'shared/interfaces/utils'

export const getTable = (): HTMLElement => screen.getByTestId('table-task-list')

export const getColumnTitle = (
  container: HTMLElement,
  title: string,
): HTMLElement => within(container).getByText(title)

export const getColumnTitleContainer = (
  container: HTMLElement,
  title: string,
): Nullable<HTMLElement> => {
  // eslint-disable-next-line testing-library/no-node-access
  return getColumnTitle(container, title).parentElement?.parentElement
}
