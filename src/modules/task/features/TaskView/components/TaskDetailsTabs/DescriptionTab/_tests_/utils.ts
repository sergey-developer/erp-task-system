import { screen, within } from '@testing-library/react'

const getContainer = () => screen.getByTestId('task-description-tab')

const getByTextInTab = (text: string) => within(getContainer()).getByText(text)

const queryByTextInTab = (text: string) =>
  within(getContainer()).queryByText(text)

const utils = {
  getContainer,
  getByTextInTab,
  queryByTextInTab,
}

export default utils
