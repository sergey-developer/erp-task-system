import { screen } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { buttonTestUtils, linkTestUtils } from '_tests_/utils'

import { TestIdsEnum } from './constants'

const getContainer = () => screen.getByTestId(TestIdsEnum.RelocationTasksPage)

const getFilterButton = () => buttonTestUtils.getFilterButtonIn(getContainer())
const clickFilterButton = (user: UserEvent) =>
  buttonTestUtils.clickFilterButtonIn(getContainer(), user)

const getCreateTaskLink = () => linkTestUtils.getLinkIn(getContainer(), 'Создать заявку')
const queryCreateTaskLink = () => linkTestUtils.queryLinkIn(getContainer(), 'Создать заявку')
const clickCreateTaskLink = (user: UserEvent) =>
  linkTestUtils.clickLinkIn(getContainer(), user, 'Создать заявку')

export const relocationTasksPageTestUtils = {
  getContainer,

  getFilterButton,
  clickFilterButton,

  getCreateTaskLink,
  queryCreateTaskLink,
  clickCreateTaskLink,
}
