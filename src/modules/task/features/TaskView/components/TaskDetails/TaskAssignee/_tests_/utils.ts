import { screen } from '_tests_/utils'

export const getTakeTaskButton = () => screen.getByTestId('btn-takeTask')
export const queryTakeTaskButton = () => screen.queryByTestId('btn-takeTask')
