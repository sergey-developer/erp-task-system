import { screen, waitFor } from '@testing-library/react'

const expectLoadingStarted = (testId: string) => async () => {
  expect(await screen.findByTestId(testId)).toBeInTheDocument()
}

const expectLoadingNotStarted = (testId: string) => () => {
  expect(screen.queryByTestId(testId)).not.toBeInTheDocument()
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
