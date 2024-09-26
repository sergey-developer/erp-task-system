import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

import { TestIdsEnum } from '_tests_/features/warehouse/components/WarehouseTable/constants'
import { iconTestUtils, tableTestUtils } from '_tests_/utils/index'

const getContainer = () => screen.getByTestId(TestIdsEnum.WarehouseTable)

const getRow = (id: IdType) => tableTestUtils.getRowById(getContainer(), id)

const getHeadCell = (text: string) => tableTestUtils.getHeadCell(getContainer(), text)

const getColTitle = (text: string) => within(getContainer()).getByText(text)

const clickColTitle = async (user: UserEvent, title: string) => {
  const col = getColTitle(title)
  await user.click(col)
}

const getColValue = (id: IdType, value: string): MaybeNull<HTMLElement> => {
  const row = getRow(id)
  return row ? within(row).getByText(value) : null
}

// title
const getTitleLink = (id: IdType, title: string): MaybeNull<HTMLElement> => {
  const row = getRow(id)
  return row ? within(row).getByRole('link', { name: title }) : null
}

const clickTitleLink = async (user: UserEvent, id: IdType, title: string) => {
  const link = getTitleLink(id, title)

  if (link) {
    await user.click(link)
  }
}

// loading
const expectLoadingStarted = () => iconTestUtils.expectLoadingStartedIn(getContainer())
const expectLoadingFinished = () => iconTestUtils.expectLoadingFinishedIn(getContainer())

export const warehouseTableTestUtils = {
  getContainer,

  getRow,

  getHeadCell,

  getColTitle,
  getColValue,
  clickColTitle,

  getTitleLink,
  clickTitleLink,

  expectLoadingStarted,
  expectLoadingFinished,
}
