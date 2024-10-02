import { screen, within } from '@testing-library/react'

import { TestIdsEnum } from './constants'

const getContainer = () => screen.getByTestId(TestIdsEnum.TaskComment)

const getChildByText = (text: string) => within(getContainer()).getByText(text)

export const commentTestUtils = {
  getContainer,
  getChildByText,
}
