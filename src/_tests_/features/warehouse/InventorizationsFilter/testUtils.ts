import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { buttonTestUtils, selectTestUtils } from '_tests_/utils/index'

import { TestIdsEnum } from './constants'

const getContainer = () => screen.getByTestId(TestIdsEnum.InventorizationsFilter)
const queryContainer = () => screen.queryByTestId(TestIdsEnum.InventorizationsFilter)
const findContainer = (): Promise<HTMLElement> =>
  screen.findByTestId(TestIdsEnum.InventorizationsFilter)

// status block
const getStatusBlock = (): HTMLElement =>
  within(getContainer()).getByTestId(TestIdsEnum.StatusBlock)
const getStatusSelectInput = () => selectTestUtils.getSelect(getStatusBlock())
const openStatusSelect = (user: UserEvent) => selectTestUtils.openSelect(user, getStatusBlock())
const setStatus = selectTestUtils.clickSelectOption

const unSetStatus = async (user: UserEvent, title: string) => {
  const status = getSelectedStatus(title)
  // eslint-disable-next-line testing-library/no-node-access
  const closeIcon = status.querySelector('.ant-select-selection-item-remove')
  if (closeIcon) await user.click(closeIcon)
}

const getSelectedStatus = (title: string) =>
  selectTestUtils.getSelectedOptionByTitle(getStatusBlock(), title)

const querySelectedStatus = (title: string) =>
  selectTestUtils.querySelectedOptionByTitle(getStatusBlock(), title)

// type block
const getTypeBlock = (): HTMLElement => within(getContainer()).getByTestId(TestIdsEnum.TypeBlock)
const getTypeSelectInput = () => selectTestUtils.getSelect(getTypeBlock())
const openTypeSelect = (user: UserEvent) => selectTestUtils.openSelect(user, getTypeBlock())
const setType = selectTestUtils.clickSelectOption

const getSelectedType = (title: string) =>
  selectTestUtils.getSelectedOptionByTitle(getTypeBlock(), title)

const querySelectedType = (title: string) =>
  selectTestUtils.querySelectedOptionByTitle(getTypeBlock(), title)

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

export const inventorizationsFilterTestUtils = {
  getContainer,
  queryContainer,
  findContainer,

  getStatusBlock,
  getStatusSelectInput,
  openStatusSelect,
  setStatus,
  unSetStatus,
  getSelectedStatus,
  querySelectedStatus,

  getTypeBlock,
  getTypeSelectInput,
  openTypeSelect,
  setType,
  getSelectedType,
  querySelectedType,

  getResetAllButton,
  clickResetButtonIn,
  clickResetAllButton,

  getCloseButton,
  clickCloseButton,

  getApplyButton,
  clickApplyButton,
}
