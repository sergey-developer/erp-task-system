import { screen } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { TestIdsEnum } from '_tests_/features/warehouse/components/ExecuteInventorizationReviseTab/constants'
import { buttonTestUtils } from '_tests_/utils/index'

const getContainer = () => screen.getByTestId(TestIdsEnum.ExecuteInventorizationReviseTab)

// create equipment button
const getCreateEquipmentButton = () =>
  buttonTestUtils.getButtonIn(getContainer(), /Добавить оборудование/)

const clickCreateEquipmentButton = async (user: UserEvent) => user.click(getCreateEquipmentButton())

export const executeInventorizationReviseTabTestUtils = {
  getContainer,

  getCreateEquipmentButton,
  clickCreateEquipmentButton,
}
