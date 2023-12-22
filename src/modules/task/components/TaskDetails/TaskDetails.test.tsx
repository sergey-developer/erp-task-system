import { screen } from '@testing-library/react'

import { spinnerTestUtils } from '_tests_/utils'

const findContainer = () => screen.findByTestId('task-details')

const expectTaskLoadingFinished = spinnerTestUtils.expectLoadingFinished('task-loading')

export const testUtils = {
  findContainer,

  expectTaskLoadingFinished,
}

test.todo('task details')
