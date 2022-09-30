import { screen } from '_tests_/utils'

export const getFilterTag = () => screen.getByTestId('checkable-tag')

export const getFilterTagContainer = () =>
  screen.getByTestId('filter-fast-tag-container')
