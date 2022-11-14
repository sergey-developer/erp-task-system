import { screen } from '@testing-library/react'

const getContainer = () => screen.getByTestId('task-secondary-details')

const utils = {
  getContainer,
}

export default utils
