import { screen } from '@testing-library/react'

const findContainer = () => screen.getByTestId('task')

export const testUtils = {
  findContainer,
}

test.todo('task details')
