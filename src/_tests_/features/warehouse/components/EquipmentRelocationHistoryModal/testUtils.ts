import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { IdType } from 'shared/types/common'
import { NumberOrString } from 'shared/types/utils'

import { TestIdsEnum } from '_tests_/features/warehouse/components/EquipmentRelocationHistoryModal/constants'
import { tableTestUtils } from '_tests_/utils'

const getContainer = () => screen.getByTestId(TestIdsEnum.EquipmentRelocationHistoryModal)
const findContainer = () => screen.findByTestId(TestIdsEnum.EquipmentRelocationHistoryModal)

const getTable = () =>
  within(getContainer()).getByTestId(TestIdsEnum.EquipmentRelocationHistoryTable)
const getRow = (id: IdType) => tableTestUtils.getRowById(getTable(), id)
const clickRow = async (user: UserEvent, id: IdType) =>
  tableTestUtils.clickRowById(getTable(), user, id)

const getColTitle = (text: string) => within(getTable()).getByText(text)

const getColValue = (id: IdType, value: NumberOrString): HTMLElement =>
  within(getRow(id)).getByText(value)

// loading
const expectLoadingStarted = () => tableTestUtils.expectLoadingStarted(getTable())
const expectLoadingFinished = () => tableTestUtils.expectLoadingFinished(getTable())

export const equipmentRelocationHistoryModalTestUtils = {
  getContainer,
  findContainer,

  getTable,
  getRow,
  clickRow,
  getColTitle,
  getColValue,

  expectLoadingStarted,
  expectLoadingFinished,
}
