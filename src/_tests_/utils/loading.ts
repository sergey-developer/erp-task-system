import { screen, waitFor } from '_tests_/utils'

const btnLoadingClass = 'ant-btn-loading'

export const waitStartLoadingByButton = async (button: HTMLElement) => {
  await waitFor(() => {
    expect(button).toHaveClass(btnLoadingClass)
  })
}

export const waitFinishLoadingByButton = async (button: HTMLElement) => {
  await waitFor(() => {
    expect(button).not.toHaveClass(btnLoadingClass)
  })
}

export const waitStartLoadingBySpinner = (testId: string) => async () => {
  expect(await screen.findByTestId(testId)).toBeInTheDocument()
}

export const waitFinishLoadingBySpinner = (testId: string) => async () => {
  await waitFor(() => {
    expect(screen.queryByTestId(testId)).not.toBeInTheDocument()
  })
}

export const waitFinishLoadingBySelect = async (container: HTMLElement) => {
  await waitFor(() => {
    expect(
      container.querySelector('.ant-select-arrow-loading'),
    ).not.toBeInTheDocument()
  })
}
