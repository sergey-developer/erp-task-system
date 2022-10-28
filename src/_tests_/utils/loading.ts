import { findIconByNameIn, queryIconByNameIn } from '_tests_/utils'
import { screen, waitFor } from '@testing-library/react'

const btnLoadingClass = 'ant-btn-loading'

export const loadingStartedByButton = async (button: HTMLElement) => {
  await waitFor(() => {
    expect(button).toHaveClass(btnLoadingClass)
  })
}

export const loadingFinishedByButton = async (button: HTMLElement) => {
  await waitFor(() => {
    expect(button).not.toHaveClass(btnLoadingClass)
  })
}

export const loadingStartedBySpinner = (testId: string) => async () => {
  expect(await screen.findByTestId(testId)).toBeInTheDocument()
}

export const loadingFinishedBySpinner = (testId: string) => async () => {
  await waitFor(() => {
    expect(screen.queryByTestId(testId)).not.toBeInTheDocument()
  })
}

export const loadingFinishedBySelect = async (container: HTMLElement) => {
  await waitFor(() => {
    expect(
      container.querySelector('.ant-select-arrow-loading'),
    ).not.toBeInTheDocument()
  })
}

export const loadingFinishedByCard = async (card: HTMLElement) => {
  await waitFor(() => {
    expect(card).not.toHaveClass('ant-card-loading')
  })
}

export const loadingStartedByIconIn = async (container: HTMLElement) => {
  const icon = await findIconByNameIn(container, 'loading')
  expect(icon).toBeInTheDocument()
}

export const loadingFinishedByIconIn = async (container: HTMLElement) => {
  await waitFor(() => {
    expect(queryIconByNameIn(container, 'loading')).not.toBeInTheDocument()
  })
}
