import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { NumberOrString } from 'shared/types/utils'

import { buttonTestUtils, menuTestUtils, spinnerTestUtils } from '_tests_/utils/index'

import { TestIdsEnum } from './constants'

const getContainer = () => screen.getByTestId(TestIdsEnum.EquipmentDetails)
const findContainer = (): Promise<HTMLElement> => screen.findByTestId(TestIdsEnum.EquipmentDetails)

const getBlock = (testId: string) => within(getContainer()).getByTestId(testId)
const queryBlock = (testId: string) => within(getContainer()).queryByTestId(testId)

const getInfoInBlock = (block: HTMLElement, value: NumberOrString | RegExp) =>
  within(block).getByText(value)

const queryInfoInBlock = (block: HTMLElement, value: NumberOrString | RegExp) =>
  within(block).queryByText(value)

// equipment images
const getEquipmentImageList = () =>
  within(getBlock('images')).getByTestId(TestIdsEnum.EquipmentImages)

const getViewAllImagesButton = () =>
  buttonTestUtils.getButtonIn(getBlock('images'), /Просмотреть все фото/)
const clickViewAllImagesButton = async (user: UserEvent) => {
  const button = getViewAllImagesButton()
  await user.click(button)
}

const expectEquipmentImageListLoadingFinished = spinnerTestUtils.expectLoadingFinished(
  'equipment-images-loading',
)

const expectTotalEquipmentImageListLoadingFinished = () =>
  buttonTestUtils.expectLoadingFinished(getViewAllImagesButton())

// close button
const getCloseButton = () => buttonTestUtils.getButtonIn(getContainer(), /close/i)

const clickCloseButton = async (user: UserEvent) => {
  const button = getCloseButton()
  await user.click(button)
}

// menu
const getMenuButton = () => buttonTestUtils.getMenuButtonIn(getContainer())
const openMenu = async (user: UserEvent) => menuTestUtils.openMenu(user, getMenuButton())

// edit menu item
const getEditMenuItem = () => menuTestUtils.getMenuItem('Редактировать')
const clickEditMenuItem = async (user: UserEvent) => user.click(getEditMenuItem())

// relocation history menu item
const getRelocationHistoryMenuItem = () => menuTestUtils.getMenuItem('История перемещений')

const clickRelocationHistoryMenuItem = async (user: UserEvent) =>
  user.click(getRelocationHistoryMenuItem())

// technical examinations menu item
const getTechnicalExaminationsMenuItem = () => menuTestUtils.getMenuItem('История АТЭ')
const clickTechnicalExaminationsMenuItem = async (user: UserEvent) =>
  user.click(getTechnicalExaminationsMenuItem())

// create equipment technical examination menu item
const getCreateEquipmentTechnicalExaminationMenuItem = () =>
  menuTestUtils.getMenuItem('Сформировать АТЭ')

const clickCreateEquipmentTechnicalExaminationMenuItem = async (user: UserEvent) =>
  user.click(getCreateEquipmentTechnicalExaminationMenuItem())

// loading
const expectLoadingStarted = spinnerTestUtils.expectLoadingStarted('equipment-details-loading')
const expectLoadingFinished = spinnerTestUtils.expectLoadingFinished('equipment-details-loading')

export const equipmentDetailsTestUtils = {
  getContainer,
  findContainer,

  getBlock,
  queryBlock,

  getInfoInBlock,
  queryInfoInBlock,

  getCloseButton,
  clickCloseButton,

  getRelocationHistoryMenuItem,
  clickRelocationHistoryMenuItem,

  openMenu,
  getEditMenuItem,
  clickEditMenuItem,
  getTechnicalExaminationsMenuItem,
  clickTechnicalExaminationsMenuItem,
  getCreateEquipmentTechnicalExaminationMenuItem,
  clickCreateEquipmentTechnicalExaminationMenuItem,

  getEquipmentImageList,
  getViewAllImagesButton,
  clickViewAllImagesButton,
  expectEquipmentImageListLoadingFinished,
  expectTotalEquipmentImageListLoadingFinished,

  expectLoadingStarted,
  expectLoadingFinished,
}
