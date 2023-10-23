import { screen, waitFor } from '@testing-library/react'

/**
 Использование "All" нужно т.к. при передаче в компонент Spinner пропса "tip",
 пропс "data-testid" присваивается нескольким его дочерним элементам
 */

const expectLoadingStarted = (testId: string) => async () => {
  const spinner = (await screen.findAllByTestId(testId))[0]
  expect(spinner).toBeInTheDocument()
}

const expectLoadingNotStarted = (testId: string) => () => {
  const spinner = screen.queryAllByTestId(testId)[0]
  expect(spinner).not.toBeInTheDocument()
}

const expectLoadingFinished = (testId: string) => async () => {
  const spinner = screen.queryAllByTestId(testId)[0]

  await waitFor(() => {
    expect(spinner).not.toBeInTheDocument()
  })
}

const utils = {
  expectLoadingStarted,
  expectLoadingNotStarted,
  expectLoadingFinished,
}

export default utils
