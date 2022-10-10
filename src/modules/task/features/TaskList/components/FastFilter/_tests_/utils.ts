import { screen, waitFor, within } from '_tests_/utils'

export const getFilterContainer = () => screen.getByTestId('filter-fast')

export const getFilterTag = () => screen.getByTestId('checkable-tag')

export const getFirstFilterTag = () => screen.getAllByTestId('checkable-tag')[0]

export const getFilterTagByTextIn = (container: HTMLElement, text: string) =>
  within(container).getByText(text)

export const getFilterTagContainer = () =>
  screen.getByTestId('filter-fast-tag-container')

export const getFirstFilterTagContainer = () =>
  screen.getAllByTestId('filter-fast-tag-container')[0]

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
