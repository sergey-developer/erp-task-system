import { screen } from '@testing-library/react'

import { tableTestUtils } from '_tests_/utils'

const getContainer = () => screen.getByTestId('revise-equipment-table')

// loading
const expectLoadingStarted = () => tableTestUtils.expectLoadingStarted(getContainer())
const expectLoadingFinished = () => tableTestUtils.expectLoadingFinished(getContainer())

export const testUtils = {
  getContainer,

  expectLoadingStarted,
  expectLoadingFinished,
}

test.todo('ReviseEquipmentTable')
