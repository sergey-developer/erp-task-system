import { screen } from '@testing-library/react'

export const getFirstComment = (): HTMLElement =>
  screen.getAllByTestId('task-comment')[0]
