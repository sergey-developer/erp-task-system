import { screen, waitFor } from '_tests_/utils'

export const waitStartLoading = async () => {
  await waitFor(() => {
    expect(screen.getByTestId('spinner-journal')).toBeInTheDocument()
  })
}

export const waitFinishLoading = async () => {
  await waitFor(() => {
    expect(screen.queryByTestId('spinner-journal')).not.toBeInTheDocument()
  })
}
