import { waitFor, within } from '@testing-library/react'
import * as reactRouterDom from 'react-router-dom'

import { UserPermissionsEnum } from 'features/user/constants'
import { getEquipmentListTemplateErrMsg } from 'features/warehouse/constants/equipment'

import { MimetypeEnum } from 'shared/constants/mimetype'
import * as base64Utils from 'shared/utils/common/base64'
import * as downloadFileUtils from 'shared/utils/file/downloadFile'

import { relocationEquipmentSimplifiedEditableTableTestUtils } from '_tests_/features/warehouse/components/RelocationEquipmentSimplifiedEditableTable/testUtils'
import { createRelocationTaskSimplifiedPageTestUtils } from '_tests_/features/warehouse/pages/CreateRelocationTaskSimplifiedPage/testUtils'
import taskFixtures from '_tests_/fixtures/task'
import { fakeUseLocationResult } from '_tests_/fixtures/useLocation'
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
  fakeWord,
  getStoreWithAuth,
  notificationTestUtils,
  render,
  setupApiTests,
} from '_tests_/utils'

import CreateRelocationTaskSimplifiedPage from './index'

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
        .mockReturnValue(fakeUseLocationResult({ state: { task: locationStateTask } }))

      const taskAssigneeUser = userFixtures.userListItem({ id: locationStateTask.assignee!.id })
      const currentUser = userFixtures.userListItem()
      mockGetUsersSuccess({ body: [taskAssigneeUser, currentUser] })
      mockGetLocationsCatalogSuccess()
      mockGetEquipmentCatalogListSuccess()
      mockGetCurrencyListSuccess()
      mockGetEquipmentCatalogListSuccess({
        body: warehouseFixtures.equipmentsCatalog(),
        once: false,
      })

      const warehouseMSI = warehouseFixtures.warehouse()
      mockGetWarehouseMSISuccess(locationStateTask.assignee!.id, { body: warehouseMSI })

      const { user } = render(<CreateRelocationTaskSimplifiedPage />, {
        store: getStoreWithAuth(currentUser, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      await createRelocationTaskSimplifiedPageTestUtils.expectControllersLoadingFinished()
      await createRelocationTaskSimplifiedPageTestUtils.openControllerSelect(user)
      const option1 = createRelocationTaskSimplifiedPageTestUtils.queryControllerOption(
        taskAssigneeUser.fullName,
      )
      const option2 = createRelocationTaskSimplifiedPageTestUtils.queryControllerOption(
        currentUser.fullName,
      )

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

      const equipmentsToShopBlock =
        createRelocationTaskSimplifiedPageTestUtils.getEquipmentsToShopBlock()
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

      const button = createRelocationTaskSimplifiedPageTestUtils.getDownloadTemplateButton()

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

      const button = createRelocationTaskSimplifiedPageTestUtils.queryDownloadTemplateButton()
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

      await createRelocationTaskSimplifiedPageTestUtils.clickDownloadTemplateButton(user)

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

      await createRelocationTaskSimplifiedPageTestUtils.clickDownloadTemplateButton(user)
      const notification = await notificationTestUtils.findNotification(
        getEquipmentListTemplateErrMsg,
      )

      expect(notification).toBeInTheDocument()
    })
  })
})
