import { screen } from '@testing-library/react'

const getContainer = () => screen.getByTestId('task-card-secondary-details')

const utils = {
  getContainer,
}

export default utils
