import { screen } from '@testing-library/react'

export const getSecondaryDetails = () =>
  screen.getByTestId('task-details-secondary')
