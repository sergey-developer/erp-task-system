import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { buttonTestUtils, iconTestUtils } from '_tests_/utils/index'

import { TestIdsEnum } from './constants'

const getContainer = () => screen.getByTestId(TestIdsEnum.TaskDetailsAdditionalInfo)
const queryContainer = () => screen.queryByTestId(TestIdsEnum.TaskDetailsAdditionalInfo)
const getChildByText = (text: string) => within(getContainer()).getByText(text)

const getAdditionalInfoContent = () =>
  within(getContainer()).getByTestId(TestIdsEnum.AdditionalInfoContent)

const queryAdditionalInfoContent = () =>
  within(getContainer()).queryByTestId(TestIdsEnum.AdditionalInfoContent)

const getExpandButton = () =>
  buttonTestUtils.getButtonIn(getContainer(), /дополнительная информация/i)

const clickExpandButton = async (user: UserEvent) => {
  const button = getExpandButton()
  await user.click(button)
  return button
}

const getAddress = () =>
  within(getAdditionalInfoContent()).getByTestId(TestIdsEnum.AdditionalInfoAddress)

const getAddressIcon = () => iconTestUtils.getIconByNameIn(getAddress(), 'environment')

export const additionalInfoTestUtils = {
  getContainer,
  queryContainer,
  getChildByText,

  getAdditionalInfoContent,
  queryAdditionalInfoContent,

  getExpandButton,
  clickExpandButton,

  getAddress,
  getAddressIcon,
}
