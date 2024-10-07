import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { buttonTestUtils, fakeWord } from '_tests_/utils'

import { TestIdsEnum } from './constants'

const getContainer = () => screen.getByTestId(TestIdsEnum.Container)

// create equipment button
const getCreateEquipmentButton = () =>
  buttonTestUtils.getButtonIn(getContainer(), /Добавить оборудование/)

const clickCreateEquipmentButton = async (user: UserEvent) => user.click(getCreateEquipmentButton())

// download template button
const getDownloadTemplateButton = () =>
  buttonTestUtils.getButtonIn(getContainer(), /Скачать шаблон/)

const queryDownloadTemplateButton = () =>
  buttonTestUtils.queryButtonIn(getContainer(), /Скачать шаблон/)

const clickDownloadTemplateButton = async (user: UserEvent) =>
  user.click(getDownloadTemplateButton())

const expectDownloadTemplateLoadingFinished = () =>
  buttonTestUtils.expectLoadingFinished(getDownloadTemplateButton())

// check by excel button
const getCheckByExcelButton = () => buttonTestUtils.getButtonIn(getContainer(), /Сверить из Excel/)

const queryCheckByExcelButton = () =>
  buttonTestUtils.queryButtonIn(getContainer(), /Сверить из Excel/)

const clickCheckByExcelButton = async (
  user: UserEvent,
  file: File = new File([], fakeWord(), { type: 'image/png' }),
) => {
  const container = getContainer()
  const input = within(container).getByTestId(TestIdsEnum.CheckByExcelUpload)
  await user.upload(input, file)
  return { input, file }
}

const expectCheckByExcelLoadingFinished = () =>
  buttonTestUtils.expectLoadingFinished(getCheckByExcelButton())

const checkInventorizationEquipmentsErrorsContainer = () =>
  screen.getByTestId(TestIdsEnum.CheckInventorizationEquipmentsErrorsContainer)

const checkInventorizationEquipmentsTemplateErrorsContainer = () =>
  screen.getByTestId(TestIdsEnum.CheckInventorizationEquipmentsTemplateErrorsContainer)

export const executeInventorizationReviseTabTestUtils = {
  getContainer,

  getCreateEquipmentButton,
  clickCreateEquipmentButton,

  getDownloadTemplateButton,
  queryDownloadTemplateButton,
  clickDownloadTemplateButton,
  expectDownloadTemplateLoadingFinished,

  getCheckByExcelButton,
  queryCheckByExcelButton,
  clickCheckByExcelButton,
  expectCheckByExcelLoadingFinished,
  checkInventorizationEquipmentsErrorsContainer,
  checkInventorizationEquipmentsTemplateErrorsContainer,
}
