import { screen } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { CANCEL_TEXT } from 'shared/constants/common'

import { buttonTestUtils } from '_tests_/helpers'

import { TestIdsEnum } from './constants'

const getContainer = () => screen.getByTestId(TestIdsEnum.EditRelocationTaskDraftPage)

// submit button
const getSubmitButton = () => buttonTestUtils.getButtonIn(getContainer(), 'Создать заявку')
const clickSubmitButton = async (user: UserEvent) => user.click(getSubmitButton())

// cancel button
const getCancelButton = () => buttonTestUtils.getButtonIn(getContainer(), CANCEL_TEXT)
const clickCancelButton = async (user: UserEvent) => user.click(getCancelButton())

export const editRelocationTaskDraftPageTestUtils = {
  getContainer,

  getSubmitButton,
  clickSubmitButton,

  getCancelButton,
  clickCancelButton,
}
