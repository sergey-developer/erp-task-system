import { screen, waitFor } from '@testing-library/react'

import { findIconByNameIn, queryIconByNameIn } from '_tests_/utils'

const btnLoadingClass = 'ant-btn-loading'

export const expectLoadingStartedByButton = async (button: HTMLElement) => {
  await waitFor(() => {
    expect(button).toHaveClass(btnLoadingClass)
  })
}

export const expectLoadingFinishedByButton = async (button: HTMLElement) => {
  await waitFor(() => {
    expect(button).not.toHaveClass(btnLoadingClass)
  })
}

export const expectLoadingStartedBySpinner = (testId: string) => async () => {
  expect(await screen.findByTestId(testId)).toBeInTheDocument()
}

export const expectLoadingNotStartedBySpinner = (testId: string) => () => {
  expect(screen.queryByTestId(testId)).not.toBeInTheDocument()
}

export const expectLoadingFinishedBySpinner = (testId: string) => async () => {
  const spinner = screen.queryByTestId(testId)

  await waitFor(() => {
    expect(spinner).not.toBeInTheDocument()
  })
}

const selectArrowLoadingClass = '.ant-select-arrow-loading'

export const expectLoadingStartedBySelect = async (container: HTMLElement) => {
  await waitFor(() => {
    expect(container.querySelector(selectArrowLoadingClass)).toBeInTheDocument()
  })
}

export const expectLoadingFinishedBySelect = async (container: HTMLElement) => {
  await waitFor(() => {
    expect(
      container.querySelector(selectArrowLoadingClass),
    ).not.toBeInTheDocument()
  })
}

const cardLoadingClass = 'ant-card-loading'

export const expectLoadingStartedByCard = async (card: HTMLElement) => {
  await waitFor(() => {
    expect(card).toHaveClass(cardLoadingClass)
  })
}

export const expectLoadingNotStartedByCard = (card: HTMLElement) => {
  expect(card).not.toHaveClass(cardLoadingClass)
}

export const expectLoadingFinishedByCard = async (card: HTMLElement) => {
  await waitFor(() => {
    expect(card).not.toHaveClass(cardLoadingClass)
  })
}

export const expectLoadingStartedByIconIn = async (container: HTMLElement) => {
  expect(await findIconByNameIn(container, 'loading')).toBeInTheDocument()
}

export const expectLoadingFinishedByIconIn = async (container: HTMLElement) => {
  await waitFor(() => {
    expect(queryIconByNameIn(container, 'loading')).not.toBeInTheDocument()
  })
}
