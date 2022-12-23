import { screen } from '@testing-library/react'

const getContainer = () => screen.getByTestId('task-card')
const findContainer = () => screen.findByTestId('task-card')

const utils = {
  getContainer,
  findContainer,
}

export default utils
