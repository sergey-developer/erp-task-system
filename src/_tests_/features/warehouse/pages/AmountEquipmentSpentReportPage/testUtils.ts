import { screen } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { buttonTestUtils } from '_tests_/utils'

import { TestIdsEnum } from './constants'

const getContainer = () => screen.getByTestId(TestIdsEnum.AmountEquipmentSpentReportPage)

// filter button
const getFilterButton = () => buttonTestUtils.getButtonIn(getContainer(), /filter/)

const clickFilterButton = async (user: UserEvent) => {
  const button = getFilterButton()
  await user.click(button)
}

// export to excel button
const getExportToExcelButton = () =>
  buttonTestUtils.getButtonIn(getContainer(), /Выгрузить в Excel/)

const clickExportToExcelButton = async (user: UserEvent) => {
  const button = getExportToExcelButton()
  await user.click(button)
}

const expectExportToExcelLoadingFinished = () =>
  buttonTestUtils.expectLoadingFinished(getExportToExcelButton())

export const amountEquipmentSpentReportPageTestUtils = {
  getContainer,

  clickFilterButton,

  getExportToExcelButton,
  clickExportToExcelButton,
  expectExportToExcelLoadingFinished,
}
