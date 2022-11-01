import { screen, waitFor } from '@testing-library/react'

import { FastFilterEnum } from '../../../constants/common'

export const getFastFilter = () => screen.getByTestId('filter-fast')

export const getFilterTag = () => screen.getByTestId('filter-tag')

export const getAllFilterTag = () => screen.getAllByTestId('filter-tag')

export const getCheckableTag = (value: FastFilterEnum) =>
  screen.getByTestId(`checkable-tag-${value}`)

export const loadingFinished = async () => {
  await waitFor(() => {
    getAllFilterTag().forEach((tag) => {
      // eslint-disable-next-line testing-library/no-node-access
      const skeleton = tag.querySelector('.ant-skeleton-active')
      expect(skeleton).not.toBeInTheDocument()
    })
  })
}
