import { screen, waitFor } from '_tests_/utils'

export const waitStartLoading = async () => {
  expect(await screen.findByTestId('spinner-journal')).toBeInTheDocument()
}

export const waitFinishLoading = async () => {
  await waitFor(() => {
    expect(screen.queryByTestId('spinner-journal')).not.toBeInTheDocument()
  })
}
