import { screen, within } from '@testing-library/react'

import { MaybeNull, NumberOrString } from 'shared/types/utils'

import { TestIdsEnum } from '_tests_/features/warehouses/components/EquipmentsByFileTable/constants'
import { tableTestUtils } from '_tests_/helpers'

const getContainer = () => screen.getByTestId(TestIdsEnum.EquipmentsByFileTable)
const getRow = (id: number) => tableTestUtils.getRowById(getContainer(), id)
const getColTitle = (text: string) => within(getContainer()).getByText(text)
const getColValue = (id: number, value: NumberOrString): MaybeNull<HTMLElement> => {
  const row = getRow(id)
  return row ? within(row).getByText(value) : null
}

// loading
const expectLoadingStarted = () => tableTestUtils.expectLoadingStarted(getContainer())
const expectLoadingFinished = () => tableTestUtils.expectLoadingFinished(getContainer())

export const equipmentsByFileTableTestUtils = {
  getContainer,
  getRow,
  getColTitle,
  getColValue,

  expectLoadingStarted,
  expectLoadingFinished,
}
