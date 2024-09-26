import { screen } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { SAVE_TEXT } from 'shared/constants/common'

import { buttonTestUtils } from '_tests_/utils'

import { TestIdsEnum } from './constants'

const getContainer = () => screen.getByTestId(TestIdsEnum.Container)
const findContainer = () => screen.findByTestId(TestIdsEnum.Container)

const getSaveButton = () => buttonTestUtils.getButtonIn(getContainer(), new RegExp(SAVE_TEXT))
const clickSaveButton = async (user: UserEvent) => user.click(getSaveButton())

const expectLoadingFinished = () => buttonTestUtils.expectLoadingFinished(getSaveButton())

export const checkInventorizationEquipmentsModalTestUtils = {
  getContainer,
  findContainer,

  clickSaveButton,

  expectLoadingFinished,
}
