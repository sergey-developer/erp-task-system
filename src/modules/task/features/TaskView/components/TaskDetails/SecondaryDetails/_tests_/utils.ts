import { screen } from '@testing-library/react'

const getContainer = () => screen.getByTestId('task-details-secondary')

const utils = {
  getContainer,
}

export default utils
