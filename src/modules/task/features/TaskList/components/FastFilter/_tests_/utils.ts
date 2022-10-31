import { loadingFinishedBySkeletonIn } from '_tests_/utils'
import { screen } from '@testing-library/react'

import { FastFilterEnum } from '../../../constants/common'

export const getFastFilter = () => screen.getByTestId('filter-fast')

export const getFilterTag = () => screen.getByTestId('filter-tag')

export const getAllFilterTag = () => screen.getAllByTestId('filter-tag')

export const getCheckableTag = (value: FastFilterEnum) =>
  screen.getByTestId(`checkable-tag-${value}`)

export const loadingFinished = async () => {
  for await (const fastFilter of getAllFilterTag()) {
    await loadingFinishedBySkeletonIn(fastFilter)
  }
}
