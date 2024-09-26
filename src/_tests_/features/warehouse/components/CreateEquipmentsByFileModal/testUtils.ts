import { screen } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { ADD_TEXT, CANCEL_TEXT } from 'shared/constants/common'

import { buttonTestUtils } from '_tests_/utils/index'

import { TestIdsEnum } from '_tests_/features/warehouse/components/CreateEquipmentsByFileModal/constants'

const getContainer = () => screen.getByTestId(TestIdsEnum.CreateEquipmentsByFileModal)
const findContainer = () => screen.findByTestId(TestIdsEnum.CreateEquipmentsByFileModal)

const getAddButton = () => buttonTestUtils.getButtonIn(getContainer(), new RegExp(ADD_TEXT))
const clickAddButton = async (user: UserEvent) => {
  const button = getAddButton()
  await user.click(button)
}

const getCancelButton = () => buttonTestUtils.getButtonIn(getContainer(), CANCEL_TEXT)
const clickCancelButton = async (user: UserEvent) => {
  const button = getCancelButton()
  await user.click(button)
}

export const createEquipmentsByFileModalTestUtils = {
  getContainer,
  findContainer,

  getAddButton,
  clickAddButton,

  getCancelButton,
  clickCancelButton,
}
