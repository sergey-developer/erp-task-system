import { screen, within } from '@testing-library/react'

import { buttonTestUtils } from '_tests_/utils'

import { TestIdsEnum } from './constants'

const getContainer = () => screen.getByTestId(TestIdsEnum.TaskDescriptionTab)

const getChildByText = (text: string) => within(getContainer()).getByText(text)

const queryChildByText = (text: string) => within(getContainer()).queryByText(text)

// copy button
const getCopyButton = () => buttonTestUtils.getButtonIn(getContainer(), 'Копировать')

export const descriptionTabTestUtils = {
  getContainer,
  getChildByText,
  queryChildByText,

  getCopyButton,
}
