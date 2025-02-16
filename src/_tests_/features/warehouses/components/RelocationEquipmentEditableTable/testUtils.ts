import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { IdType } from 'shared/types/common'
import { MaybeNull, NumberOrString } from 'shared/types/utils'

import { TestIdsEnum } from '_tests_/features/warehouses/components/RelocationEquipmentEditableTable/constants'
import { tableTestUtils } from '_tests_/helpers'

const getContainer = () => screen.getByTestId(TestIdsEnum.RelocationEquipmentEditableTableContainer)

const getRow = (id: IdType) => tableTestUtils.getRowById(getContainer(), id)
const clickRow = async (user: UserEvent, id: IdType) =>
  tableTestUtils.clickRowById(getContainer(), user, id)

const getHeadCell = (text: string) => tableTestUtils.getHeadCell(getContainer(), text)
const getColTitle = (text: string) => within(getContainer()).getByText(text)
const getColValue = (id: IdType, value: NumberOrString): MaybeNull<HTMLElement> => {
  const row = getRow(id)
  return row ? within(row).getByText(value) : null
}
const clickColValue = async (user: UserEvent, id: IdType, value: NumberOrString) => {
  const colValue = getColValue(id, value)
  await user.click(colValue!)
}

// loading
const expectLoadingStarted = () => tableTestUtils.expectLoadingStarted(getContainer())
const expectLoadingFinished = () => tableTestUtils.expectLoadingFinished(getContainer())

export const relocationEquipmentEditableTableTestUtils = {
  getContainer,

  getRow,
  clickRow,
  getHeadCell,
  getColTitle,
  getColValue,
  clickColValue,

  expectLoadingStarted,
  expectLoadingFinished,
}
