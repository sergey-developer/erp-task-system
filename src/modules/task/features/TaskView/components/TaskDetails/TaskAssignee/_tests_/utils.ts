import { screen } from '_tests_/utils'

export const getTakeTaskButton = () =>
  screen.getByRole('button', { name: 'В работу' })
