import { spinnerTestUtils } from '_tests_/helpers'

const expectLoadingStarted = spinnerTestUtils.expectLoadingStarted('home-layout-loading')
const expectLoadingFinished = spinnerTestUtils.expectLoadingFinished('home-layout-loading')

export const testUtils = {
  expectLoadingStarted,
  expectLoadingFinished,
}

test.todo('Private layout')
