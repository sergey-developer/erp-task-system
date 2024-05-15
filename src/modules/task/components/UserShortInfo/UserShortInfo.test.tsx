import { screen } from '@testing-library/react'

const findContainer = () => screen.findByTestId('user-short-info')

export const testUtils = {
  findContainer,
}
