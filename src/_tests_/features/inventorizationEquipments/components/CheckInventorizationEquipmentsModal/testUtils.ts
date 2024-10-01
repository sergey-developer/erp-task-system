import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { SAVE_TEXT } from 'shared/constants/common'

import { buttonTestUtils, checkboxTestUtils } from '_tests_/utils'

import { TestIdsEnum } from './constants'

const getContainer = () => screen.getByTestId(TestIdsEnum.Container)
const findContainer = () => screen.findByTestId(TestIdsEnum.Container)

const getSaveButton = () => buttonTestUtils.getButtonIn(getContainer(), new RegExp(SAVE_TEXT))
const clickSaveButton = async (user: UserEvent) => user.click(getSaveButton())

// is-credited-block
const getIsCreditedBlock = () => within(getContainer()).getByTestId('is-credited-block')
const queryIsCreditedBlock = () => within(getContainer()).queryByTestId('is-credited-block')

const getIsCreditedCheckbox = () =>
  checkboxTestUtils.getCheckboxIn(
    getIsCreditedBlock(),
    /Показывать только оборудование, требующее оприходования/,
  )

// loading
const expectLoadingFinished = () => buttonTestUtils.expectLoadingFinished(getSaveButton())

export const checkInventorizationEquipmentsModalTestUtils = {
  getContainer,
  findContainer,

  clickSaveButton,

  getIsCreditedBlock,
  queryIsCreditedBlock,
  getIsCreditedCheckbox,

  expectLoadingFinished,
}
