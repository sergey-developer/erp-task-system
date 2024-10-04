import { screen, within } from '@testing-library/react'

import { TestIdsEnum } from './constants'

const getContainer = () => screen.getByTestId(TestIdsEnum.ChangeInfrastructureOrderFormContainer)

const getChildByText = (text: string | RegExp) => within(getContainer()).getByText(text)

export const changeInfrastructureOrderFormTestUtils = {
  getContainer,

  getChildByText,
}
