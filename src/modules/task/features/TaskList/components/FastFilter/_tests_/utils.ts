import { screen, waitFor } from '_tests_/utils'

export const getFilterContainer = () => screen.getByTestId('filter-fast')

export const getFilterTag = () => screen.getByTestId('checkable-tag')

export const getFilterTagContainer = () =>
  screen.getByTestId('filter-fast-tag-container')

export const getAllFilterTagContainer = () =>
  screen.getAllByTestId('filter-fast-tag-container')

export const waitStartLoading = (container: HTMLElement) => {
  const skeleton = container.querySelector('.ant-skeleton-active')
  expect(skeleton).toBeInTheDocument()
}

export const waitFinishLoading = async (container: HTMLElement) => {
  await waitFor(() => {
    const skeleton = container.querySelector('.ant-skeleton-active')
    expect(skeleton).not.toBeInTheDocument()
  })
}
