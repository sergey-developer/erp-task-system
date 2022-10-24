import { screen } from '_tests_/utils'

export const getFirstComment = (): HTMLElement =>
  screen.getAllByTestId('task-comment')[0]
