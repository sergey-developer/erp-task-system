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

export const loadingNotStartedBySpinner = (testId: string) => () => {
  expect(screen.queryByTestId(testId)).not.toBeInTheDocument()
}

export const loadingFinishedBySpinner = (testId: string) => async () => {
  const spinner = screen.queryByTestId(testId)

  await waitFor(() => {
    expect(spinner).not.toBeInTheDocument()
  })
}

export const loadingStartedBySpinnerIn =
  (container: HTMLElement) => async () => {
    expect(await findIconByNameIn(container, 'loading')).toBeInTheDocument()
  }

export const loadingNotStartedBySpinnerIn = (container: HTMLElement) => () => {
  expect(queryIconByNameIn(container, 'loading')).not.toBeInTheDocument()
}

export const loadingFinishedBySpinnerIn =
  (container: HTMLElement) => async () => {
    const spinner = queryIconByNameIn(container, 'loading')

    await waitFor(() => {
      expect(spinner).not.toBeInTheDocument()
    })
  }

export const loadingStartedBySelect = async (container: HTMLElement) => {
  await waitFor(() => {
    expect(
      container.querySelector('.ant-select-arrow-loading'),
    ).toBeInTheDocument()
  })
}

export const loadingFinishedBySelect = async (container: HTMLElement) => {
  await waitFor(() => {
    expect(
      container.querySelector('.ant-select-arrow-loading'),
    ).not.toBeInTheDocument()
  })
}

export const loadingStartedByCard = async (card: HTMLElement) => {
  await waitFor(() => {
    expect(card).toHaveClass('ant-card-loading')
  })
}

export const expectLoadingNotStartedByCard = (card: HTMLElement) => {
  expect(card).not.toHaveClass('ant-card-loading')
}

export const loadingFinishedByCard = async (card: HTMLElement) => {
  await waitFor(() => {
    expect(card).not.toHaveClass('ant-card-loading')
  })
}

export const loadingStartedByIconIn = async (container: HTMLElement) => {
  expect(await findIconByNameIn(container, 'loading')).toBeInTheDocument()
}

export const loadingFinishedByIconIn = async (container: HTMLElement) => {
  await waitFor(() => {
    expect(queryIconByNameIn(container, 'loading')).not.toBeInTheDocument()
  })
}

export const loadingStartedBySkeletonIn = (container: HTMLElement) => () => {
  const skeleton = container.querySelector('.ant-skeleton-active')
  expect(skeleton).toBeInTheDocument()
}

export const loadingFinishedBySkeletonIn = (container: HTMLElement) => () => {
  const skeleton = container.querySelector('.ant-skeleton-active')
  expect(skeleton).not.toBeInTheDocument()
}
