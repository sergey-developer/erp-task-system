import { screen } from '@testing-library/react'

const getContainer = () => screen.getByTestId('task-card-secondary-details')

const queryContainer = () => screen.queryByTestId('task-card-secondary-details')

const utils = {
  getContainer,
  queryContainer,
}

export default utils
