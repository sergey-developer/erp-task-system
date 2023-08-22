import { within } from '@testing-library/react'

import { MaybeNull } from 'shared/types/utils'

import {
  expectLoadingFinishedByIconIn,
  expectLoadingStartedByIconIn,
} from './loading'

const getRowIn = (
  container: HTMLElement,
  id: string | number,
): MaybeNull<HTMLElement> => container.querySelector(`[data-row-key='${id}']`)

const getHeadCell = (container: HTMLElement, text: string) =>
  within(container).getByText(text).parentElement?.parentElement

// pagination
const getPaginationIn = (container: HTMLElement): MaybeNull<HTMLElement> =>
  container.querySelector('.ant-table-pagination')

const expectPaginationEnabled = (container: HTMLElement) => {
  const pagination = getPaginationIn(container)
  expect(pagination).toBeInTheDocument()
}

// loading
const expectLoadingStarted = (container: HTMLElement) =>
  expectLoadingStartedByIconIn(container)

const expectLoadingFinished = (container: HTMLElement) =>
  expectLoadingFinishedByIconIn(container)

const utils = {
  getRowIn,
  getHeadCell,
  getPaginationIn,
  expectPaginationEnabled,
  expectLoadingStarted,
  expectLoadingFinished,
}

export default utils
