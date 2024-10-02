import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { IdType } from 'shared/types/common'

import { TestIdsEnum } from '_tests_/features/tasks/components/TaskList/constants'

const getContainer = () => screen.getByTestId(TestIdsEnum.TaskList)

const getChildByText = (text: string) => within(getContainer()).getByText(text)

const getListItem = (id: IdType) => within(getContainer()).getByTestId(`task-list-item-${id}`)

const getListItemChildByText = (id: IdType, text: string) => {
  const listItem = getListItem(id)
  return within(listItem).getByText(text)
}

const queryListItemChildByText = (id: IdType, text: string) => {
  const listItem = getListItem(id)
  return within(listItem).queryByText(text)
}

const clickListItem = async (user: UserEvent, id: IdType) => {
  const listItem = getListItem(id)
  await user.click(listItem)
  return listItem
}

export const taskListTestUtils = {
  getContainer,
  getChildByText,

  getListItem,
  getListItemChildByText,
  queryListItemChildByText,

  clickListItem,
}
