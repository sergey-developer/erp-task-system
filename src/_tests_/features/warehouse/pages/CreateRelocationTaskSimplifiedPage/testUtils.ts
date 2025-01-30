import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { CANCEL_TEXT } from 'shared/constants/common'

import { buttonTestUtils, selectTestUtils } from '_tests_/utils'

import { TestIdsEnum } from './constants'

const getContainer = () => screen.getByTestId(TestIdsEnum.CreateRelocationTaskSimplifiedPage)

// controller field
const getControllerFormItem = () =>
  within(getContainer()).getByTestId(TestIdsEnum.ControllerFormItem)
const getControllerSelectInput = () => selectTestUtils.getSelect(getControllerFormItem())
const setController = selectTestUtils.clickSelectOption
const findControllerError = (text: string) => within(getControllerFormItem()).findByText(text)

const openControllerSelect = (user: UserEvent) =>
  selectTestUtils.openSelect(user, getControllerFormItem())

const queryControllerOption = selectTestUtils.querySelectOption

const getSelectedController = (title: string) =>
  selectTestUtils.getSelectedOptionByTitle(getControllerFormItem(), title)

const expectControllersLoadingFinished = () =>
  selectTestUtils.expectLoadingFinished(getControllerFormItem())

// equipments to shop block
const getEquipmentsToShopBlock = () =>
  within(getContainer()).getByTestId(TestIdsEnum.EquipmentsToShopBlock)

// equipments to warehouse block
const getEquipmentsToWarehouseBlock = () =>
  within(getContainer()).getByTestId(TestIdsEnum.EquipmentsToWarehouseBlock)

// download template button
const getDownloadTemplateButton = () =>
  buttonTestUtils.getButtonIn(getContainer(), /Скачать шаблон/)

const queryDownloadTemplateButton = () =>
  buttonTestUtils.queryButtonIn(getContainer(), /Скачать шаблон/)

const clickDownloadTemplateButton = async (user: UserEvent) => {
  const button = getDownloadTemplateButton()
  await user.click(button)
}

// submit button
const getSubmitButton = () => buttonTestUtils.getButtonIn(getContainer(), 'Создать заявку')
const clickSubmitButton = async (user: UserEvent) => {
  const button = getSubmitButton()
  await user.click(button)
}

// cancel button
const getCancelButton = () => buttonTestUtils.getButtonIn(getContainer(), CANCEL_TEXT)
const clickCancelButton = async (user: UserEvent) => {
  const button = getCancelButton()
  await user.click(button)
}

export const createRelocationTaskSimplifiedPageTestUtils = {
  getContainer,

  getControllerSelectInput,
  setController,
  findControllerError,
  openControllerSelect,
  queryControllerOption,
  getSelectedController,
  expectControllersLoadingFinished,

  getEquipmentsToShopBlock,
  getEquipmentsToWarehouseBlock,

  getDownloadTemplateButton,
  queryDownloadTemplateButton,
  clickDownloadTemplateButton,

  getSubmitButton,
  clickSubmitButton,

  getCancelButton,
  clickCancelButton,
}
