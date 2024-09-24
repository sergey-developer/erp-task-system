import { screen, within } from '@testing-library/react'

import { TestIdsEnum } from './constants'

const getContainer = () => screen.getByTestId(TestIdsEnum.TaskResolutionTab)

const getChildByText = (text: string | RegExp) => within(getContainer()).getByText(text)

const queryChildByText = (text: string | RegExp) => within(getContainer()).queryByText(text)

export const resolutionTabTestUtils = {
  getContainer,
  getChildByText,
  queryChildByText,
}
