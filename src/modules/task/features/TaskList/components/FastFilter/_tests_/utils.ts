import { screen, waitFor, within } from '@testing-library/react'

export const getFilterContainer = () => screen.getByTestId('filter-fast')

export const getFilterTag = () =>
  within(getFilterContainer()).getByTestId('filter-tag')

export const getCheckableTag = () =>
  within(getFilterContainer()).getByTestId('checkable-tag')

export const getAllCheckableTag = () =>
  within(getFilterContainer()).getAllByTestId('checkable-tag')

export const getFilterTagByTextIn = (container: HTMLElement, text: string) =>
  within(container).getByText(text)

export const getFirstFilterTagContainer = () =>
  screen.getAllByTestId('filter-tag')[0]

export const loadingStarted = (container: HTMLElement) => {
  const skeleton = container.querySelector('.ant-skeleton-active')
  expect(skeleton).toBeInTheDocument()
}

export const loadingFinished = async (container: HTMLElement) => {
  const skeleton = container.querySelector('.ant-skeleton-active')

  await waitFor(() => {
    expect(skeleton).not.toBeInTheDocument()
  })
}
