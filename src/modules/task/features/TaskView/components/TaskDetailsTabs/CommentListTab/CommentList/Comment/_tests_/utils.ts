import { screen, within } from '@testing-library/react'

const getContainer = () => screen.getByTestId('task-comment')

const getChildByText = (text: string) => within(getContainer()).getByText(text)

const utils = {
  getContainer,
  getChildByText,
}

export default utils
