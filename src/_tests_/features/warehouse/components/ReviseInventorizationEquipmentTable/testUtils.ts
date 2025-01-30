import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { IdType } from 'shared/types/common'
import { MaybeNull, NumberOrString } from 'shared/types/utils'

import { TestIdsEnum } from '_tests_/features/warehouse/components/ReviseInventorizationEquipmentTable/constants'
import { selectTestUtils, tableTestUtils } from '_tests_/utils'

const getContainer = () => screen.getByTestId(TestIdsEnum.ReviseEquipmentTable)

const getRow = (id: IdType) => tableTestUtils.getRowById(getContainer(), id)

const clickRow = async (user: UserEvent, id: IdType) =>
  tableTestUtils.clickRowById(getContainer(), user, id)

const getHeadCell = (text: string) => tableTestUtils.getHeadCell(getContainer(), text)

const getColTitle = (text: string) => within(getContainer()).getByText(text)
const getColValue = (id: IdType, value: NumberOrString): MaybeNull<HTMLElement> => {
  const row = getRow(id)
  return row ? within(row).getByText(value) : null
}

// loading
const expectLoadingStarted = () => tableTestUtils.expectLoadingStarted(getContainer())
const expectLoadingFinished = () => tableTestUtils.expectLoadingFinished(getContainer())

// location fact
const getLocationFactFormItem = (id: IdType) =>
  within(getRow(id)).getByTestId(TestIdsEnum.LocationFactFormItem)

const getLocationFactSelect = (id: IdType) => selectTestUtils.getSelect(getLocationFactFormItem(id))

const openLocationFactSelect = (user: UserEvent, id: IdType) =>
  selectTestUtils.openSelect(user, getLocationFactFormItem(id))

const setLocationFact = selectTestUtils.clickSelectOption

const getSelectedLocationFact = (id: IdType) =>
  selectTestUtils.getSelectedOption(getLocationFactFormItem(id))

// quantity fact
const getQuantityFactFormItem = (id: IdType) =>
  within(getRow(id)).getByTestId(TestIdsEnum.QuantityFactFormItem)

const getQuantityFactInput = (id: IdType) =>
  within(getQuantityFactFormItem(id)).getByRole('spinbutton')

const setQuantityFact = async (user: UserEvent, id: IdType, value: number) => {
  const input = getQuantityFactInput(id)
  await user.type(input, String(value))
  return input
}

export const reviseEquipmentTableTestUtils = {
  getContainer,

  getRow,
  clickRow,
  getHeadCell,
  getColTitle,
  getColValue,

  expectLoadingStarted,
  expectLoadingFinished,

  getLocationFactFormItem,
  getLocationFactSelect,
  openLocationFactSelect,
  setLocationFact,
  getSelectedLocationFact,

  getQuantityFactFormItem,
  getQuantityFactInput,
  setQuantityFact,
}
