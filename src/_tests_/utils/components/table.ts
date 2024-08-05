import { within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { IdType } from 'shared/types/common'
import { MaybeNull, NumberOrString } from 'shared/types/utils'

import { iconTestUtils } from '_tests_/utils'

const getRowById = (container: HTMLElement, id: NumberOrString): HTMLElement => {
  const row = container.querySelector(`[data-row-key='${id}']`) as HTMLElement

  if (row) {
    return row
  } else {
    throw new Error(`Table row with id: ${id} was not found`)
  }
}

const getOneRowByRole = (container: HTMLElement) => within(container).getAllByRole('row')[1]

const clickRowIn = async (container: HTMLElement, user: UserEvent, id: NumberOrString) => {
  const row = getRowById(container, id)
  await user.click(row)
  return row
}

const getHeadCell = (container: HTMLElement, text: string) =>
  within(container).getByText(text).parentElement?.parentElement

const expectRowsRendered = <T extends { id: IdType }>(
  container: HTMLElement,
  data: T[] | ReadonlyArray<T>,
) => {
  data.forEach((item) => {
    const row = getRowById(container, item.id)
    expect(row).toBeInTheDocument()
  })
}

// pagination
const getPaginationIn = (table: HTMLElement): MaybeNull<HTMLElement> =>
  table.querySelector('.ant-table-pagination')

const expectPaginationEnabledIn = (table: HTMLElement) => {
  const pagination = getPaginationIn(table)
  expect(pagination).toBeInTheDocument()
}

const getPaginationNextButtonIn = (table: HTMLElement) =>
  within(getPaginationIn(table)!).getByRole('listitem', { name: 'Вперед' })

const clickPaginationNextButtonIn = async (user: UserEvent, table: HTMLElement) => {
  const button = getPaginationNextButtonIn(table)
  await user.click(button)
}

// loading
const expectLoadingStarted = (container: HTMLElement) =>
  iconTestUtils.expectLoadingStartedIn(container)

const expectLoadingFinished = (container: HTMLElement) =>
  iconTestUtils.expectLoadingFinishedIn(container)

const utils = {
  getOneRowByRole,
  getRowById,
  clickRowIn,

  getHeadCell,

  expectRowsRendered,

  getPaginationIn,
  getPaginationNextButtonIn,
  clickPaginationNextButtonIn,
  expectPaginationEnabledIn,

  expectLoadingStarted,
  expectLoadingFinished,
}

export default utils
