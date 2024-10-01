import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { TestIdsEnum } from '_tests_/features/warehouse/components/EquipmentFilter/constants'
import { buttonTestUtils, radioButtonTestUtils, selectTestUtils } from '_tests_/utils/index'

const getContainer = () => screen.getByTestId(TestIdsEnum.EquipmentFilter)
const findContainer = () => screen.findByTestId(TestIdsEnum.EquipmentFilter)
const queryContainer = () => screen.queryByTestId(TestIdsEnum.EquipmentFilter)

// conditions
const getConditionsBlock = (): HTMLElement =>
  within(getContainer()).getByTestId(TestIdsEnum.Conditions)

const getConditionsSelect = (): HTMLElement =>
  within(getConditionsBlock()).getByTestId(TestIdsEnum.ConditionsSelect)

const getConditionsPlaceholder = (): HTMLElement =>
  within(getConditionsSelect()).getByText('Выберите состояние')

const getConditionsSelectInput = () => selectTestUtils.getSelect(getConditionsSelect())

const openConditionsSelect = (user: UserEvent) =>
  selectTestUtils.openSelect(user, getConditionsBlock())

const setCondition = selectTestUtils.clickSelectOption

const getSelectedCondition = (title: string) =>
  selectTestUtils.getSelectedOptionByTitle(getConditionsSelect(), title)

const querySelectedCondition = (title: string) =>
  selectTestUtils.querySelectedOptionByTitle(getConditionsSelect(), title)

// locations
const getLocationsBlock = () => within(getContainer()).getByTestId(TestIdsEnum.Locations)
const getLocationsSelect = () =>
  within(getLocationsBlock()).getByTestId(TestIdsEnum.LocationsSelect)

const getLocationsSelectInput = () => selectTestUtils.getSelect(getLocationsSelect())

const openLocationsSelect = (user: UserEvent) =>
  selectTestUtils.openSelect(user, getLocationsBlock())

const setLocation = selectTestUtils.clickSelectOption

const getSelectedLocation = (title: string) =>
  selectTestUtils.getSelectedOptionByTitle(getLocationsSelect(), title)

const querySelectedLocation = (title: string) =>
  selectTestUtils.querySelectedOptionByTitle(getLocationsSelect(), title)

const expectLocationsLoadingFinished = () =>
  selectTestUtils.expectLoadingFinished(getLocationsSelect())

// owners
const getOwnersBlock = () => within(getContainer()).getByTestId(TestIdsEnum.Owners)
const getOwnersSelect = () => within(getOwnersBlock()).getByTestId(TestIdsEnum.OwnersSelect)

const getOwnersPlaceholder = (): HTMLElement =>
  within(getOwnersSelect()).getByText('Выберите владельца оборудования')

const getOwnersSelectInput = () => selectTestUtils.getSelect(getOwnersSelect())
const openOwnersSelect = (user: UserEvent) => selectTestUtils.openSelect(user, getOwnersBlock())
const setOwner = selectTestUtils.clickSelectOption

const getSelectedOwner = (title: string) =>
  selectTestUtils.getSelectedOptionByTitle(getOwnersSelect(), title)

const querySelectedOwner = (title: string) =>
  selectTestUtils.querySelectedOptionByTitle(getOwnersSelect(), title)

const expectOwnersLoadingFinished = () => selectTestUtils.expectLoadingFinished(getOwnersSelect())

// categories
const getCategoriesBlock = () => within(getContainer()).getByTestId(TestIdsEnum.Categories)
const getCategoriesSelect = () =>
  within(getCategoriesBlock()).getByTestId(TestIdsEnum.CategoriesSelect)

const getCategoriesPlaceholder = (): HTMLElement =>
  within(getCategoriesSelect()).getByText('Выберите категорию')

const getCategoriesSelectInput = () => selectTestUtils.getSelect(getCategoriesSelect())

const openCategoriesSelect = (user: UserEvent) =>
  selectTestUtils.openSelect(user, getCategoriesBlock())

const setCategory = selectTestUtils.clickSelectOption

const getSelectedCategory = (title: string) =>
  selectTestUtils.getSelectedOptionByTitle(getCategoriesSelect(), title)

const querySelectedCategory = (title: string) =>
  selectTestUtils.querySelectedOptionByTitle(getCategoriesSelect(), title)

const expectCategoryLoadingFinished = () =>
  selectTestUtils.expectLoadingFinished(getCategoriesSelect())

// price
const getPriceBlock = () => within(getContainer()).getByTestId(TestIdsEnum.Price)

// is new
const getIsNewBlock = () => within(getContainer()).getByTestId(TestIdsEnum.IsNew)
const getIsNewField = (text: string) => radioButtonTestUtils.getRadioButtonIn(getIsNewBlock(), text)
const clickIsNewField = async (user: UserEvent, text: string) => {
  const field = getIsNewField(text)
  await user.click(field)
  return field
}

// is warranty
const getIsWarrantyBlock = () => within(getContainer()).getByTestId(TestIdsEnum.IsWarranty)
const getIsWarrantyField = (text: string) =>
  radioButtonTestUtils.getRadioButtonIn(getIsWarrantyBlock(), text)

const clickIsWarrantyField = async (user: UserEvent, text: string) => {
  const field = getIsWarrantyField(text)
  await user.click(field)
  return field
}

// is repaired
const getIsRepairedBlock = () => within(getContainer()).getByTestId(TestIdsEnum.IsRepaired)
const getIsRepairedField = (text: string) =>
  radioButtonTestUtils.getRadioButtonIn(getIsRepairedBlock(), text)

const clickIsRepairedField = async (user: UserEvent, text: string) => {
  const field = getIsRepairedField(text)
  await user.click(field)
  return field
}

// zero quantity
const getZeroQuantityBlock = () => within(getContainer()).getByTestId(TestIdsEnum.ZeroQuantity)
const getZeroQuantityField = (text: string) =>
  radioButtonTestUtils.getRadioButtonIn(getZeroQuantityBlock(), text)

const clickZeroQuantityField = async (user: UserEvent, text: string) => {
  const field = getZeroQuantityField(text)
  await user.click(field)
  return field
}

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

export const equipmentFilterTestUtils = {
  getContainer,
  findContainer,
  queryContainer,

  getConditionsBlock,
  getConditionsSelect,
  getConditionsPlaceholder,
  getConditionsSelectInput,
  openConditionsSelect,
  setCondition,
  getSelectedCondition,
  querySelectedCondition,

  getLocationsBlock,
  getLocationsSelect,
  getLocationsSelectInput,
  openLocationsSelect,
  setLocation,
  getSelectedLocation,
  querySelectedLocation,
  expectLocationsLoadingFinished,

  getOwnersBlock,
  getOwnersSelect,
  getOwnersPlaceholder,
  getOwnersSelectInput,
  openOwnersSelect,
  setOwner,
  getSelectedOwner,
  querySelectedOwner,
  expectOwnersLoadingFinished,

  getIsNewBlock,
  getIsNewField,
  clickIsNewField,

  getIsWarrantyBlock,
  getIsWarrantyField,
  clickIsWarrantyField,

  getIsRepairedBlock,
  getIsRepairedField,
  clickIsRepairedField,

  getZeroQuantityBlock,
  getZeroQuantityField,
  clickZeroQuantityField,

  getCategoriesBlock,
  getCategoriesSelect,
  getCategoriesPlaceholder,
  getCategoriesSelectInput,
  openCategoriesSelect,
  setCategory,
  getSelectedCategory,
  querySelectedCategory,
  expectCategoryLoadingFinished,

  getPriceBlock,

  getResetAllButton,
  clickResetButtonIn,
  clickResetAllButton,

  getCloseButton,
  clickCloseButton,

  getApplyButton,
  clickApplyButton,
}
