import { screen } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { TestIdsEnum } from '_tests_/features/infrastructures/components/InfrastructureStatusHistoryModal/constants'
import { buttonTestUtils } from '_tests_/helpers'

const getContainer = () => screen.getByTestId(TestIdsEnum.Container)
const findContainer = () => screen.findByTestId(TestIdsEnum.Container)

const clickCloseButton = async (user: UserEvent) =>
  user.click(buttonTestUtils.getButtonIn(getContainer(), new RegExp('Закрыть')))

export const infrastructureStatusHistoryModalTestUtils = {
  getContainer,
  findContainer,

  clickCloseButton,
}
