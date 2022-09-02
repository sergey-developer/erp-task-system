import { screen, waitFor } from '__tests/utils'

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
