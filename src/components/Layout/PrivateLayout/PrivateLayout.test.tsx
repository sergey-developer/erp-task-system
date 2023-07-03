import {
  expectLoadingFinishedBySpinner,
  expectLoadingStartedBySpinner,
} from '_tests_/utils'

const expectLoadingStarted = expectLoadingStartedBySpinner(
  'private-layout-loading',
)

const expectLoadingFinished = expectLoadingFinishedBySpinner(
  'private-layout-loading',
)

export const testUtils = {
  expectLoadingStarted,
  expectLoadingFinished,
}

test.todo('Private layout')
