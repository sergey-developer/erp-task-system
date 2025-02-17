import { waitFor, within } from '@testing-library/react'
import { getEquipmentsTemplateErrorMessage } from 'features/equipments/api/constants'
import { UserPermissionsEnum } from 'features/users/api/constants'
import * as reactRouterDom from 'react-router-dom'

import { MimetypeEnum } from 'shared/constants/mimetype'
import * as base64Utils from 'shared/utils/common/base64'
import * as downloadFileUtils from 'shared/utils/file/downloadFile'

import { relocationEquipmentSimplifiedEditableTableTestUtils } from '_tests_/features/warehouses/components/RelocationEquipmentSimplifiedEditableTable/testUtils'
import { createRelocationTaskSimplifiedPageTestUtils } from '_tests_/features/warehouses/pages/CreateRelocationTaskSimplifiedPage/testUtils'
import equipmentsFixtures from '_tests_/fixtures/api/data/equipments'
import tasksFixtures from '_tests_/fixtures/api/data/tasks'
import userFixtures from '_tests_/fixtures/api/data/users'
import warehousesFixtures from '_tests_/fixtures/api/data/warehouses'
import { fakeUseLocationResult } from '_tests_/fixtures/hooks/useLocation'
import { getStoreWithAuth } from '_tests_/fixtures/store/auth'
import { getUserMeQueryMock } from '_tests_/fixtures/store/users'
import { fakeWord, notificationTestUtils, render, setupApiTests } from '_tests_/helpers'
import {
  mockGetCurrenciesSuccess,
  mockGetEquipmentsCatalogSuccess,
  mockGetEquipmentsTemplateServerError,
  mockGetEquipmentsTemplateSuccess,
  mockGetLocationsCatalogSuccess,
  mockGetUsersSuccess,
  mockGetWarehouseMSISuccess,
} from '_tests_/mocks/api'

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
      const locationStateTask = tasksFixtures.taskDetail()
      jest
        .spyOn(reactRouterDom, 'useLocation')
        .mockReturnValue(fakeUseLocationResult({ state: { task: locationStateTask } }))

      const taskAssigneeUser = userFixtures.user({ id: locationStateTask.assignee!.id })
      const currentUser = userFixtures.userDetail()
      mockGetUsersSuccess({ body: [taskAssigneeUser, currentUser] })
      mockGetLocationsCatalogSuccess()
      mockGetEquipmentsCatalogSuccess()
      mockGetCurrenciesSuccess()
      mockGetEquipmentsCatalogSuccess({
        body: equipmentsFixtures.equipmentsCatalog(),
        once: false,
      })

      const warehouseMSI = warehousesFixtures.warehouseDetail()
      mockGetWarehouseMSISuccess(locationStateTask.assignee!.id, { body: warehouseMSI })

      const { user } = render(<CreateRelocationTaskSimplifiedPage />, {
        store: getStoreWithAuth(currentUser, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
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
      mockGetEquipmentsCatalogSuccess()
      mockGetCurrenciesSuccess()

      render(<CreateRelocationTaskSimplifiedPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
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
      mockGetEquipmentsCatalogSuccess()
      mockGetCurrenciesSuccess()

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
      mockGetEquipmentsCatalogSuccess()
      mockGetCurrenciesSuccess()

      render(<CreateRelocationTaskSimplifiedPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
        }),
      })

      const button = createRelocationTaskSimplifiedPageTestUtils.queryDownloadTemplateButton()
      expect(button).not.toBeInTheDocument()
    })

    test('При успешном запросе отрабатывает функционал скачивания', async () => {
      mockGetUsersSuccess({ body: [] })
      mockGetLocationsCatalogSuccess({ body: [] })
      mockGetEquipmentsCatalogSuccess()
      mockGetCurrenciesSuccess({ body: [] })

      const file = fakeWord()
      mockGetEquipmentsTemplateSuccess({ body: file })

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
      mockGetEquipmentsCatalogSuccess()
      mockGetCurrenciesSuccess({ body: [] })
      mockGetEquipmentsTemplateServerError()

      const { user } = render(<CreateRelocationTaskSimplifiedPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: {
            ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.EquipmentsCreate] }),
          },
        }),
      })

      await createRelocationTaskSimplifiedPageTestUtils.clickDownloadTemplateButton(user)
      const notification = await notificationTestUtils.findNotification(
        getEquipmentsTemplateErrorMessage,
      )

      expect(notification).toBeInTheDocument()
    })
  })
})
