import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { IdType } from 'shared/types/common'

const getContainer = () => screen.getByTestId('relocation-task-list')

// list item
const getListItem = (id: IdType) =>
  within(getContainer()).getByTestId(`relocation-task-list-item-${id}`)

const clickListItem = async (user: UserEvent, id: IdType) => {
  const item = getListItem(id)
  await user.click(item)
}

export const testUtils = {
  getContainer,

  getListItem,
  clickListItem,
}

test.todo('RelocationTaskList')
