import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { relocationEquipmentTableTestUtils } from '_tests_/features/warehouse/components/RelocationEquipmentTable/testUtils'
import { TestIdsEnum } from '_tests_/features/warehouse/components/RelocationTaskDetails/constants'
import { buttonTestUtils, menuTestUtils, spinnerTestUtils } from '_tests_/utils/index'

const getContainer = () => screen.getByTestId(TestIdsEnum.RelocationTaskDetails)
const findContainer = () => screen.findByTestId(TestIdsEnum.RelocationTaskDetails)

const getBlock = (testId: string) => within(getContainer()).getByTestId(testId)
const getBlockInfo = (testId: string, text: string | RegExp) =>
  within(getBlock(testId)).getByText(text)

const openMenu = (user: UserEvent) => buttonTestUtils.clickMenuButtonIn(getContainer(), user)

// waybill m15 menu item
const getWaybillM15MenuItem = () => menuTestUtils.getMenuItem(/Сформировать накладную М-15/)
const clickWaybillM15MenuItem = (user: UserEvent) =>
  menuTestUtils.clickMenuItem(/Сформировать накладную М-15/, user)

// edit task menu item
const getEditTaskMenuItem = () => menuTestUtils.getMenuItem('Изменить заявку')
const clickEditTaskMenuItem = (user: UserEvent) =>
  menuTestUtils.clickMenuItem('Изменить заявку', user)

// execute task menu item
const getExecuteTaskMenuItem = () => menuTestUtils.getMenuItem('Выполнить заявку')
const clickExecuteTaskMenuItem = (user: UserEvent) =>
  menuTestUtils.clickMenuItem('Выполнить заявку', user)

// rework menu item
const getReturnToReworkMenuItem = () => menuTestUtils.getMenuItem('Вернуть на доработку')

const clickReturnToReworkMenuItem = (user: UserEvent) =>
  menuTestUtils.clickMenuItem('Вернуть на доработку', user)

// cancel task menu item
const getCancelTaskMenuItem = () => menuTestUtils.getMenuItem('Отменить заявку')
const clickCancelTaskMenuItem = (user: UserEvent) =>
  menuTestUtils.clickMenuItem('Отменить заявку', user)

// confirm execution menu item
const getConfirmExecutionMenuItem = () => menuTestUtils.getMenuItem('Подтвердить выполнение')
const clickConfirmExecutionMenuItem = (user: UserEvent) =>
  menuTestUtils.clickMenuItem('Подтвердить выполнение', user)

// create documents package menu item
const getCreateDocumentsPackageMenuItem = () =>
  menuTestUtils.getMenuItem('Сформировать пакет документов')

const clickCreateDocumentsPackageMenuItem = (user: UserEvent) =>
  menuTestUtils.clickMenuItem('Сформировать пакет документов', user)

// move draft to work button
const getMoveDraftToWorkMenuItem = () => menuTestUtils.getMenuItem('Перевести черновик в работу')
const queryMoveDraftToWorkMenuItem = () =>
  menuTestUtils.queryMenuItem('Перевести черновик в работу')
const clickMoveDraftToWorkMenuItem = async (user: UserEvent) =>
  menuTestUtils.clickMenuItem('Перевести черновик в работу', user)

// change draft menu item
const getChangeDraftMenuItem = () => menuTestUtils.getMenuItem('Изменить черновик')
const clickChangeDraftMenuItem = (user: UserEvent) =>
  menuTestUtils.clickMenuItem('Изменить черновик', user)

// stretch details button
const getStretchDetailsButton = () => buttonTestUtils.getButtonIn(getContainer(), 'double-right')
const clickStretchDetailsButton = async (user: UserEvent) => {
  const button = getStretchDetailsButton()
  await user.click(button)
}

// documents
const getDocumentsBlock = () => getBlock('documents')

const getCreateDocumentsButton = () =>
  buttonTestUtils.getButtonIn(getDocumentsBlock(), /Добавить вложение/)

const setDocument = async (
  user: UserEvent,
  file: File = new File([], '', { type: 'image/png' }),
) => {
  const block = getDocumentsBlock()
  // eslint-disable-next-line testing-library/no-node-access
  const input = block.querySelector('input[type="file"]') as HTMLInputElement
  await user.upload(input, file)
  return { input, file }
}

const getUploadedDocument = (filename: string) => within(getDocumentsBlock()).getByTitle(filename)

// common photos button
const getCommonPhotosButton = () =>
  buttonTestUtils.getButtonIn(getContainer(), /Посмотреть общие фото/)

const clickCommonPhotosButton = async (user: UserEvent) => {
  const button = getCommonPhotosButton()
  await user.click(button)
}

const expectCommonPhotosLoadingStarted = () =>
  buttonTestUtils.expectLoadingStarted(getCommonPhotosButton())

const expectCommonPhotosLoadingFinished = () =>
  buttonTestUtils.expectLoadingFinished(getCommonPhotosButton())

// loading
const expectRelocationTaskLoadingStarted = spinnerTestUtils.expectLoadingStarted(
  TestIdsEnum.RelocationTaskDetailsLoading,
)

const expectRelocationTaskLoadingFinished = spinnerTestUtils.expectLoadingFinished(
  TestIdsEnum.RelocationTaskDetailsLoading,
)

const expectRelocationEquipmentListLoadingFinished =
  relocationEquipmentTableTestUtils.expectLoadingFinished

export const relocationTaskDetailsTestUtils = {
  getContainer,
  findContainer,

  getBlockInfo,

  openMenu,

  getStretchDetailsButton,
  clickStretchDetailsButton,

  getWaybillM15MenuItem,
  clickWaybillM15MenuItem,

  getReturnToReworkMenuItem,
  clickReturnToReworkMenuItem,

  getEditTaskMenuItem,
  clickEditTaskMenuItem,

  getExecuteTaskMenuItem,
  clickExecuteTaskMenuItem,

  getChangeDraftMenuItem,
  clickChangeDraftMenuItem,

  getCancelTaskMenuItem,
  clickCancelTaskMenuItem,

  getConfirmExecutionMenuItem,
  clickConfirmExecutionMenuItem,

  getCreateDocumentsPackageMenuItem,
  clickCreateDocumentsPackageMenuItem,

  getMoveDraftToWorkMenuItem,
  queryMoveDraftToWorkMenuItem,
  clickMoveDraftToWorkMenuItem,

  getCreateDocumentsButton,
  setDocument,
  getUploadedDocument,

  getCommonPhotosButton,
  clickCommonPhotosButton,
  expectCommonPhotosLoadingStarted,
  expectCommonPhotosLoadingFinished,

  clickCloseButton: (user: UserEvent) => buttonTestUtils.clickCloseButtonIn(getContainer(), user),

  expectRelocationTaskLoadingStarted,
  expectRelocationTaskLoadingFinished,

  expectRelocationEquipmentListLoadingFinished,
}
