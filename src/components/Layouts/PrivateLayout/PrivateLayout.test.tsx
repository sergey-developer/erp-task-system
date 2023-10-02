import { spinnerTestUtils } from '_tests_/utils'

const expectLoadingStarted = spinnerTestUtils.expectLoadingStarted('private-layout-loading')
const expectLoadingFinished = spinnerTestUtils.expectLoadingFinished('private-layout-loading')

export const testUtils = {
  expectLoadingStarted,
  expectLoadingFinished,
}

test.todo('Private layout')
