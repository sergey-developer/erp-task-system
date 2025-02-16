import { screen, within } from '@testing-library/react'

import { TestIdsEnum } from '_tests_/features/tasks/components/SubTasks/constants'

const getContainer = () => screen.getByTestId(TestIdsEnum.SubTasks)
const getChildByText = (text: string) => within(getContainer()).getByText(text)

export const subTaskListTestUtils = {
  getContainer,
  getChildByText,
}
