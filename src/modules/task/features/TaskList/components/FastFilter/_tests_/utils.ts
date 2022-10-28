import { screen, waitFor, within } from '@testing-library/react'

export const getFilterContainer = () => screen.getByTestId('filter-fast')

export const getFilterTag = () => screen.getByTestId('checkable-tag')

export const getFilterTagByTextIn = (container: HTMLElement, text: string) =>
  within(container).getByText(text)

export const getFilterTagContainer = () =>
  screen.getByTestId('filter-fast-tag-container')

export const getFirstFilterTagContainer = () =>
  screen.getAllByTestId('filter-fast-tag-container')[0]

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
