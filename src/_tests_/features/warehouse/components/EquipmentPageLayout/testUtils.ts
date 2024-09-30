import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { TestIdsEnum } from '_tests_/features/warehouse/components/EquipmentPageLayout/constants'
import { buttonTestUtils } from '_tests_/utils/index'

const getContainer = () => screen.getByTestId(TestIdsEnum.EquipmentPageLayout)

// filter button
const getFilterButton = () => buttonTestUtils.getButtonIn(getContainer(), /filter/)

const clickFilterButton = async (user: UserEvent) => {
  const button = getFilterButton()
  await user.click(button)
}

// search field
const getSearchField = () => within(getContainer()).getByPlaceholderText('Поиск оборудования')

const setSearch = async (
  user: UserEvent,
  value: string,
  pressEnter: boolean = false,
): Promise<HTMLElement> => {
  const field = getSearchField()
  await user.type(field, pressEnter ? value.concat('{enter}') : value)
  return field
}

export const equipmentPageLayoutTestUtils = {
  getContainer,

  getFilterButton,
  clickFilterButton,

  getSearchField,
  setSearch,
}
