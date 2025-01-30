import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { TestIdsEnum } from '_tests_/features/tasks/components/TaskReclassificationRequest/constants'
import { buttonTestUtils, iconTestUtils } from '_tests_/utils'

const getContainer = () => screen.getByTestId(TestIdsEnum.TaskReclassificationRequest)
const findContainer = () => screen.findByTestId(TestIdsEnum.TaskReclassificationRequest)
const queryContainer = () => screen.queryByTestId(TestIdsEnum.TaskReclassificationRequest)
const getChildByText = (text: string | RegExp) => within(getContainer()).getByText(text)
const getIcon = () => iconTestUtils.getIconByNameIn(getContainer(), 'question-circle')

const getCancelButton = () => buttonTestUtils.getButtonIn(getContainer(), /отменить запрос/i)
const clickCancelButton = async (user: UserEvent) => {
  const button = getCancelButton()
  await user.click(button)
}

export const taskReclassificationRequestTestUtils = {
  getContainer,
  findContainer,
  queryContainer,

  getChildByText,
  getIcon,

  getCancelButton,
  clickCancelButton,
}
