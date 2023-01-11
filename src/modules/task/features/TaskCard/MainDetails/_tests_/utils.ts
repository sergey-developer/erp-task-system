import { screen, within } from '@testing-library/react'

const getContainer = () => screen.getByTestId('task-card-main-details')

const queryContainer = () => screen.queryByTestId('task-card-main-details')

const getChildByText = (text: string | RegExp) =>
  within(getContainer()).getByText(text)

const utils = {
  getContainer,
  queryContainer,
  getChildByText,
}

export default utils
