import { screen, waitFor, within } from '@testing-library/react'

export const getFastFilter = () => screen.getByTestId('filter-fast')

export const getFilterTag = () => screen.getByTestId('filter-tag')

export const getAllFilterTag = () => screen.getAllByTestId('filter-tag')

export const getCheckableTag = () => screen.getByTestId('checkable-tag')

export const getAllCheckableTag = () => screen.getAllByTestId('checkable-tag')

export const getFilterTagByTextIn = (container: HTMLElement, text: string) =>
  within(container).getByText(text)

export const getFirstFilterTagContainer = () =>
  screen.getAllByTestId('filter-tag')[0]

export const loadingFinished = async (container: HTMLElement) => {
  const skeleton = container.querySelector('.ant-skeleton-active')

  await waitFor(() => {
    expect(skeleton).not.toBeInTheDocument()
  })
}
