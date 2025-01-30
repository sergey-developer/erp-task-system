import { screen } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { CANCEL_TEXT } from 'shared/constants/common'

import { buttonTestUtils } from '_tests_/utils'

import { TestIdsEnum } from './constants'

const getContainer = () => screen.getByTestId(TestIdsEnum.Container)
const findContainer = () => screen.findByTestId(TestIdsEnum.Container)

// confirm button
const getConfirmButton = () => buttonTestUtils.getButtonIn(getContainer(), /Подтвердить/)
const clickConfirmButton = async (user: UserEvent) => user.click(getConfirmButton())

// cancel button
const getCancelButton = () => buttonTestUtils.getButtonIn(getContainer(), CANCEL_TEXT)
const clickCancelButton = async (user: UserEvent) => user.click(getCancelButton())

export const confirmMoveRelocationTaskDraftToWorkModalTestUtils = {
  getContainer,
  findContainer,

  getConfirmButton,
  clickConfirmButton,

  getCancelButton,
  clickCancelButton,

  expectLoadingStarted: () => buttonTestUtils.expectLoadingStarted(getConfirmButton()),
  expectLoadingFinished: () => buttonTestUtils.expectLoadingFinished(getConfirmButton()),
}
