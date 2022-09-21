import { screen, waitFor } from '_tests_/utils'
import getRandomInt from 'shared/utils/common/getRandomInt'

export const generateId = getRandomInt

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
