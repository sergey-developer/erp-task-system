import { screen } from '@testing-library/react'

import { TestIdsEnum } from '_tests_/features/infrastructure/components/InfrastructureStatusHistoryModal/constants'

const getContainer = () => screen.getByTestId(TestIdsEnum.Container)
const findContainer = () => screen.findByTestId(TestIdsEnum.Container)

export const infrastructureStatusHistoryModalTestUtils = {
  getContainer,
  findContainer,
}
