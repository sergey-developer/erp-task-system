import { screen } from '_tests_/utils'

export const getFilterTag = () => screen.getByTestId('checkable-tag')

export const getFilterTagContainer = () =>
  screen.getByTestId('filter-fast-tag-container')

export const getFirstFilterTagContainer = () =>
  screen.getAllByTestId('filter-fast-tag-container')[0]

export const waitStartLoading = (container: HTMLElement) => {
  const skeleton = container.querySelector('.ant-skeleton-active')
  expect(skeleton).toBeInTheDocument()
}
