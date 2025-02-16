import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { TestIdsEnum } from '_tests_/features/warehouses/components/WarehouseListFilter/constants'
import { buttonTestUtils, selectTestUtils } from '_tests_/helpers'

const getContainer = () => screen.getByTestId(TestIdsEnum.WarehousesFilter)

const findContainer = (): Promise<HTMLElement> => screen.findByTestId(TestIdsEnum.WarehousesFilter)

// reset button
const getResetAllButton = () => buttonTestUtils.getButtonIn(getContainer(), /Сбросить все/)

const clickResetButtonIn = async (user: UserEvent, container: HTMLElement) => {
  const button = buttonTestUtils.getButtonIn(container, /сбросить/i)
  await user.click(button)
}

const clickResetAllButton = async (user: UserEvent) => {
  const button = getResetAllButton()
  await user.click(button)
}

// close button
const getCloseButton = () => buttonTestUtils.getButtonIn(getContainer(), /close/i)

const clickCloseButton = async (user: UserEvent) => {
  const button = getCloseButton()
  await user.click(button)
}

// apply button
const getApplyButton = () => buttonTestUtils.getButtonIn(getContainer(), /Применить/)

const clickApplyButton = async (user: UserEvent) => {
  const button = getApplyButton()
  await user.click(button)
}

// title
const getTitleFilter = () => within(getContainer()).getByTestId(TestIdsEnum.TitleFilter)

const getTitleFilterLabel = () => within(getTitleFilter()).getByText('Наименование объекта')

const getTitleInput = () => within(getTitleFilter()).getByPlaceholderText('Ключевое слово')

const setTitle = async (user: UserEvent, value: string) => {
  const input = getTitleInput()
  await user.type(input, value)
  return input
}

const resetTitle = (user: UserEvent) => clickResetButtonIn(user, getTitleFilter())

// legal entity
const getLegalEntityFilter = () => within(getContainer()).getByTestId(TestIdsEnum.LegalEntityFilter)

const getLegalEntityFilterLabel = () => within(getLegalEntityFilter()).getByText('Юридическое лицо')

const getLegalEntitySelect = () =>
  within(getLegalEntityFilter()).getByTestId(TestIdsEnum.LegalEntitySelect)

const openLegalEntitySelect = (user: UserEvent) =>
  selectTestUtils.openSelect(user, getLegalEntitySelect())

const setLegalEntity = selectTestUtils.clickSelectOption

const getSelectedLegalEntity = () => selectTestUtils.getSelectedOption(getLegalEntitySelect())

const resetLegalEntity = (user: UserEvent) => clickResetButtonIn(user, getLegalEntityFilter())

const expectLegalEntityLoadingFinished = async () => {
  const select = getLegalEntitySelect()
  await selectTestUtils.expectLoadingFinished(select)
}

// address
const getAddressFilter = () => within(getContainer()).getByTestId(TestIdsEnum.AddressFilter)

const getAddressFilterLabel = () => within(getAddressFilter()).getByText('Адрес')

const getAddressInput = () => within(getAddressFilter()).getByPlaceholderText('Ключевое слово')

const setAddress = async (user: UserEvent, value: string) => {
  const input = getAddressInput()
  await user.type(input, value)
  return input
}

const resetAddress = (user: UserEvent) => clickResetButtonIn(user, getAddressFilter())

// parent
const getParentFilter = () => within(getContainer()).getByTestId(TestIdsEnum.ParentFilter)

const getParentFilterLabel = () => within(getParentFilter()).getByText('Родительский склад')

const getParentSelect = () => within(getParentFilter()).getByTestId(TestIdsEnum.ParentSelect)

const openParentSelect = (user: UserEvent) => selectTestUtils.openSelect(user, getParentSelect())

const setParent = selectTestUtils.clickSelectOption

const getSelectedParent = () => selectTestUtils.getSelectedOption(getParentSelect())

const resetParent = (user: UserEvent) => clickResetButtonIn(user, getParentFilter())

const expectParentLoadingFinished = async () => {
  const select = getLegalEntitySelect()
  await selectTestUtils.expectLoadingFinished(select)
}

export const warehouseListFilterTestUtils = {
  getContainer,
  findContainer,

  getResetAllButton,
  clickResetButtonIn,
  clickResetAllButton,

  getCloseButton,
  clickCloseButton,

  getApplyButton,
  clickApplyButton,

  getTitleFilter,
  getTitleFilterLabel,
  getTitleInput,
  setTitle,
  resetTitle,

  getLegalEntityFilter,
  getLegalEntityFilterLabel,
  getLegalEntitySelect,
  openLegalEntitySelect,
  setLegalEntity,
  getSelectedLegalEntity,
  resetLegalEntity,
  expectLegalEntityLoadingFinished,

  getAddressFilter,
  getAddressFilterLabel,
  getAddressInput,
  setAddress,
  resetAddress,

  getParentFilter,
  getParentFilterLabel,
  getParentSelect,
  openParentSelect,
  setParent,
  getSelectedParent,
  resetParent,
  expectParentLoadingFinished,
}
