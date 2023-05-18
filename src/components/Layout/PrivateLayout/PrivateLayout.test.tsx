import { expectLoadingFinishedBySpinner } from '_tests_/utils'

const expectLoadingFinished = expectLoadingFinishedBySpinner(
  'private-layout-loading',
)

export const testUtils = {
  expectLoadingFinished,
}

test.todo('Private layout')
