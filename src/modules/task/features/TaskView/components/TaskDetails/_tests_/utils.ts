import { screen } from '@testing-library/react'

const getTaskDetails = () => screen.getByTestId('task-details')
const findTaskDetails = async () => screen.findByTestId('task-details')

const utils = {
  getTaskDetails,
  findTaskDetails,
}

export default utils
