import { screen } from '@testing-library/react'

export const getFilterTag = () => screen.getByTestId('checkable-tag')

export const getFilterTagContainer = () =>
  screen.getByTestId('filter-fast-tag-container')
