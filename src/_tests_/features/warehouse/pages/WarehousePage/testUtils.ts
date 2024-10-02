import { screen, within } from '@testing-library/react'

import { spinnerTestUtils } from '_tests_/utils/index'

import { TestIdsEnum } from './constants'

const getContainer = () => screen.getByTestId(TestIdsEnum.WarehousePage)
const getChildByText = (value: string) => within(getContainer()).getByText(value)

const expectLoadingStarted = spinnerTestUtils.expectLoadingStarted('warehouse-loading')
const expectLoadingFinished = spinnerTestUtils.expectLoadingFinished('warehouse-loading')

export const warehousePageTestUtils = {
  getContainer,
  getChildByText,

  expectLoadingStarted,
  expectLoadingFinished,
}
