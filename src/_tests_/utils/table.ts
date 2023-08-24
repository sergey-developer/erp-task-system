import { within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

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
const getPaginationIn = (table: HTMLElement): MaybeNull<HTMLElement> =>
  table.querySelector('.ant-table-pagination')

const expectPaginationEnabledIn = (table: HTMLElement) => {
  const pagination = getPaginationIn(table)
  expect(pagination).toBeInTheDocument()
}

const getPaginationNextButtonIn = (table: HTMLElement) =>
  within(getPaginationIn(table)!).getByRole('listitem', { name: 'Вперед' })

const clickPaginationNextButtonIn = async (
  user: UserEvent,
  table: HTMLElement,
) => {
  const button = getPaginationNextButtonIn(table)
  await user.click(button)
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
  getPaginationNextButtonIn,
  clickPaginationNextButtonIn,
  expectPaginationEnabledIn,

  expectLoadingStarted,
  expectLoadingFinished,
}

export default utils
