import { screen } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { TestIdsEnum } from '_tests_/features/warehouse/components/ExecuteInventorizationRelocationsTab/constants'
import { buttonTestUtils } from '_tests_/utils/index'

const getContainer = () => screen.getByTestId(TestIdsEnum.ExecuteInventorizationRelocationsTab)

// create task button
const getCreateTaskButton = () => buttonTestUtils.getButtonIn(getContainer(), 'Создать заявку')
const clickCreateTaskButton = async (user: UserEvent) => user.click(getCreateTaskButton())

export const executeInventorizationRelocationsTabTestUtils = {
  getContainer,

  clickCreateTaskButton,
}
