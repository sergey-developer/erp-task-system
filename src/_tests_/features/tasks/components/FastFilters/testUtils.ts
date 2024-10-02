import { screen } from '@testing-library/react'

const getContainer = () => screen.getByTestId('fast-filters')

export const testUtils = {
  getContainer,
}
