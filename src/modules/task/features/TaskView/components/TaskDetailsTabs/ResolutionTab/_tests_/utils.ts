import { screen, within } from '@testing-library/react'

const getContainer = () => screen.getByTestId('task-resolution-tab')

const getElementByText = (text: string) =>
  within(getContainer()).getByText(text)

const queryElementByText = (text: string) =>
  within(getContainer()).queryByText(text)

const utils = {
  getContainer,
  getElementByText,
  queryElementByText,
}

export default utils
