import { screen } from '@testing-library/react'

const getContainer = () => screen.getByTestId('task-details')
const findContainer = () => screen.findByTestId('task-details')

const utils = {
  getContainer,
  findContainer,
}

export default utils
