import { screen, within } from '@testing-library/react'

const getContainer = () => screen.getByTestId('task-description-tab')

const getChildByText = (text: string) => within(getContainer()).getByText(text)

const queryChildByText = (text: string) =>
  within(getContainer()).queryByText(text)

const utils = {
  getContainer,
  getChildByText,
  queryChildByText,
}

export default utils
