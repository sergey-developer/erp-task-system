import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { TestIdsEnum } from '_tests_/features/warehouse/components/RelocationTasksFilter/constants'
import { buttonTestUtils, selectTestUtils } from '_tests_/utils'

const getContainer = () => screen.getByTestId(TestIdsEnum.RelocationTasksFilter)
const queryContainer = () => screen.queryByTestId(TestIdsEnum.RelocationTasksFilter)
const findContainer = (): Promise<HTMLElement> =>
  screen.findByTestId(TestIdsEnum.RelocationTasksFilter)

// status block
const getStatusBlock = (): HTMLElement =>
  within(getContainer()).getByTestId(TestIdsEnum.StatusBlock)
const getStatusSelect = (): HTMLElement =>
  within(getStatusBlock()).getByTestId(TestIdsEnum.StatusSelect)
const getStatusSelectInput = () => selectTestUtils.getSelect(getStatusSelect())
const openStatusSelect = (user: UserEvent) => selectTestUtils.openSelect(user, getStatusBlock())
const setStatus = selectTestUtils.clickSelectOption

const getSelectedStatus = (title: string) =>
  selectTestUtils.getSelectedOptionByTitle(getStatusSelect(), title)

const querySelectedStatus = (title: string) =>
  selectTestUtils.querySelectedOptionByTitle(getStatusSelect(), title)

// type block
const getTypeBlock = (): HTMLElement => within(getContainer()).getByTestId(TestIdsEnum.TypeBlock)
const getTypeSelect = (): HTMLElement => within(getTypeBlock()).getByTestId(TestIdsEnum.TypeSelect)
const getTypeSelectInput = () => selectTestUtils.getSelect(getTypeSelect())
const openTypeSelect = (user: UserEvent) => selectTestUtils.openSelect(user, getTypeBlock())
const setType = selectTestUtils.clickSelectOption

const getSelectedType = (title: string) =>
  selectTestUtils.getSelectedOptionByTitle(getTypeSelect(), title)

const querySelectedType = (title: string) =>
  selectTestUtils.querySelectedOptionByTitle(getTypeSelect(), title)

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

export const relocationTasksFilterTestUtils = {
  getContainer,
  queryContainer,
  findContainer,

  getStatusBlock,
  getStatusSelect,
  getStatusSelectInput,
  openStatusSelect,
  setStatus,
  getSelectedStatus,
  querySelectedStatus,

  getTypeBlock,
  getTypeSelect,
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
