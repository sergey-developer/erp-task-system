import { screen, waitFor, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import * as reactRouterDom from 'react-router-dom'

import { UserPermissionsEnum } from 'modules/user/constants'
import { testUtils as relocationEquipmentSimplifiedEditableTableTestUtils } from 'modules/warehouse/components/RelocationEquipmentSimplifiedEditableTable/RelocationEquipmentSimplifiedEditableTable.test'
import { getEquipmentListTemplateErrMsg } from 'modules/warehouse/constants/equipment'

import { CANCEL_TEXT } from 'shared/constants/common'
import { MimetypeEnum } from 'shared/constants/mimetype'
import * as base64Utils from 'shared/utils/common/base64'
import * as downloadFileUtils from 'shared/utils/file/downloadFile'

import taskFixtures from '_tests_/fixtures/task'
import { useLocationResult } from '_tests_/fixtures/useLocation'
import userFixtures from '_tests_/fixtures/user'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import {
  mockGetCurrencyListSuccess,
  mockGetEquipmentCatalogListSuccess,
  mockGetEquipmentListTemplateServerError,
  mockGetEquipmentListTemplateSuccess,
  mockGetLocationsCatalogSuccess,
  mockGetUsersSuccess,
  mockGetWarehouseMSISuccess,
} from '_tests_/mocks/api'
import { getUserMeQueryMock } from '_tests_/mocks/state/user'
import {
  buttonTestUtils,
  fakeWord,
  getStoreWithAuth,
  notificationTestUtils,
  render,
  selectTestUtils,
  setupApiTests,
} from '_tests_/utils'

import CreateRelocationTaskSimplifiedPage from './index'

const getContainer = () => screen.getByTestId('create-relocation-task-simplified-page')

// controller field
const getControllerFormItem = () => within(getContainer()).getByTestId('controller-form-item')
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
  within(getContainer()).getByTestId('equipments-to-shop-block')

// equipments to warehouse block
const getEquipmentsToWarehouseBlock = () =>
  within(getContainer()).getByTestId('equipments-to-warehouse-block')

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

export const testUtils = {
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

jest.mock('react-router-dom', () => ({
  __esModule: true,
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
}))

setupApiTests()
notificationTestUtils.setupNotifications()

describe('Упрощенная страница создания заявки на перемещение', () => {
  describe('Форма', () => {
    test('Контроллером нельзя выбрать исполнителя заявки и текущего пользователя', async () => {
      const locationStateTask = taskFixtures.task()
      jest
        .spyOn(reactRouterDom, 'useLocation')
        .mockReturnValue(useLocationResult({ state: { task: locationStateTask } }))

      const taskAssigneeUser = userFixtures.userListItem({ id: locationStateTask.assignee!.id })
      const currentUser = userFixtures.userListItem()
      mockGetUsersSuccess({ body: [taskAssigneeUser, currentUser] })
      mockGetLocationsCatalogSuccess()
      mockGetEquipmentCatalogListSuccess()
      mockGetCurrencyListSuccess()
      mockGetEquipmentCatalogListSuccess({
        body: warehouseFixtures.equipmentCatalogList(),
        once: false,
      })

      const warehouseMSI = warehouseFixtures.warehouse()
      mockGetWarehouseMSISuccess(locationStateTask.assignee!.id, { body: warehouseMSI })

      const { user } = render(<CreateRelocationTaskSimplifiedPage />, {
        store: getStoreWithAuth({ id: currentUser.id }, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      await testUtils.expectControllersLoadingFinished()
      await testUtils.openControllerSelect(user)
      const option1 = testUtils.queryControllerOption(taskAssigneeUser.fullName)
      const option2 = testUtils.queryControllerOption(currentUser.fullName)

      expect(option1).not.toBeInTheDocument()
      expect(option2).not.toBeInTheDocument()
    })
  })

  describe('Перечень оборудования для перемещения со склада', () => {
    test('Отображается корректно', () => {
      mockGetUsersSuccess()
      mockGetLocationsCatalogSuccess()
      mockGetEquipmentCatalogListSuccess()
      mockGetCurrencyListSuccess()

      render(<CreateRelocationTaskSimplifiedPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      const equipmentsToShopBlock = testUtils.getEquipmentsToShopBlock()
      const title = within(equipmentsToShopBlock).getByText(
        'Перечень оборудования для перемещения со склада',
      )
      const table =
        relocationEquipmentSimplifiedEditableTableTestUtils.getContainerIn(equipmentsToShopBlock)

      expect(title).toBeInTheDocument()
      expect(table).toBeInTheDocument()
    })
  })

  describe('Кнопка скачивания шаблона', () => {
    test('Отображается если есть права', () => {
      mockGetUsersSuccess()
      mockGetLocationsCatalogSuccess()
      mockGetEquipmentCatalogListSuccess()
      mockGetCurrencyListSuccess()

      render(<CreateRelocationTaskSimplifiedPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: {
            ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.EquipmentsCreate] }),
          },
        }),
      })

      const button = testUtils.getDownloadTemplateButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Не отображается если нет прав', () => {
      mockGetUsersSuccess()
      mockGetLocationsCatalogSuccess()
      mockGetEquipmentCatalogListSuccess()
      mockGetCurrencyListSuccess()

      render(<CreateRelocationTaskSimplifiedPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      const button = testUtils.queryDownloadTemplateButton()
      expect(button).not.toBeInTheDocument()
    })

    test('При успешном запросе отрабатывает функционал скачивания', async () => {
      mockGetUsersSuccess({ body: [] })
      mockGetLocationsCatalogSuccess({ body: [] })
      mockGetEquipmentCatalogListSuccess()
      mockGetCurrencyListSuccess({ body: [] })

      const file = fakeWord()
      mockGetEquipmentListTemplateSuccess({ body: file })

      const downloadFileSpy = jest.spyOn(downloadFileUtils, 'downloadFile')

      const base64ToArrayBufferSpy = jest.spyOn(base64Utils, 'base64ToBytes')
      const arrayBuffer = new Uint8Array()
      base64ToArrayBufferSpy.mockReturnValueOnce(arrayBuffer)

      const { user } = render(<CreateRelocationTaskSimplifiedPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: {
            ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.EquipmentsCreate] }),
          },
        }),
      })

      await testUtils.clickDownloadTemplateButton(user)

      await waitFor(() => expect(base64ToArrayBufferSpy).toBeCalledTimes(1))
      expect(base64ToArrayBufferSpy).toBeCalledWith(file)

      expect(downloadFileSpy).toBeCalledTimes(1)
      expect(downloadFileSpy).toBeCalledWith(
        arrayBuffer,
        MimetypeEnum.Xls,
        'Шаблон загрузки оборудования',
      )
    })

    test('При не успешном запросе отображается сообщение об ошибке', async () => {
      mockGetUsersSuccess({ body: [] })
      mockGetLocationsCatalogSuccess({ body: [] })
      mockGetEquipmentCatalogListSuccess()
      mockGetCurrencyListSuccess({ body: [] })
      mockGetEquipmentListTemplateServerError()

      const { user } = render(<CreateRelocationTaskSimplifiedPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: {
            ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.EquipmentsCreate] }),
          },
        }),
      })

      await testUtils.clickDownloadTemplateButton(user)
      const notification = await notificationTestUtils.findNotification(
        getEquipmentListTemplateErrMsg,
      )

      expect(notification).toBeInTheDocument()
    })
  })
})
