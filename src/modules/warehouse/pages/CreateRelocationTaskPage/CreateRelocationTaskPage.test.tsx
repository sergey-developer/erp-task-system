import { waitFor, within } from '@testing-library/react'

import { UserPermissionsEnum } from 'modules/user/constants'
import {
  getEquipmentListTemplateErrMsg,
  importEquipmentsByFileErrMsg,
} from 'modules/warehouse/constants/equipment'

import { LocationTypeEnum } from 'shared/constants/catalogs'
import { MimetypeEnum } from 'shared/constants/mimetype'
import * as base64Utils from 'shared/utils/common/base64'
import * as downloadFileUtils from 'shared/utils/file/downloadFile'

import { createEquipmentsByFileModalTestUtils } from '_tests_/features/warehouse/components/CreateEquipmentsByFileModal/testUtils'
import { relocationEquipmentEditableTableTestUtils } from '_tests_/features/warehouse/components/RelocationEquipmentEditableTable/testUtils'
import { relocationTaskFormTestUtils } from '_tests_/features/warehouse/components/RelocationTaskForm/testUtils'
import { createRelocationTaskPageTestUtils } from '_tests_/features/warehouse/pages/CreateRelocationTaskPage/testUtils'
import catalogsFixtures from '_tests_/fixtures/catalogs'
import userFixtures from '_tests_/fixtures/user'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import {
  mockGetCurrencyListSuccess,
  mockGetEquipmentCatalogListSuccess,
  mockGetEquipmentListTemplateServerError,
  mockGetEquipmentListTemplateSuccess,
  mockGetLocationsCatalogSuccess,
  mockGetUsersSuccess,
  mockGetWarehouseSuccess,
  mockImportEquipmentsByFileBadRequestError,
  mockImportEquipmentsByFileServerError,
  mockImportEquipmentsByFileSuccess,
} from '_tests_/mocks/api'
import { getUserMeQueryMock } from '_tests_/mocks/state/user'
import {
  fakeWord,
  getStoreWithAuth,
  notificationTestUtils,
  render,
  setupApiTests,
} from '_tests_/utils'

import CreateRelocationTaskPage from './index'

setupApiTests()
notificationTestUtils.setupNotifications()

describe('Страница создания заявки на перемещение', () => {
  describe('Форма', () => {
    test('Отображается', () => {
      mockGetUsersSuccess()
      mockGetLocationsCatalogSuccess({ once: false })
      mockGetEquipmentCatalogListSuccess()
      mockGetCurrencyListSuccess()

      render(<CreateRelocationTaskPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      const form = relocationTaskFormTestUtils.getContainer()
      expect(form).toBeInTheDocument()
    })

    test('Контроллером нельзя выбрать исполнителя и текущего пользователя', async () => {
      const executorUser = userFixtures.userListItem()
      const currentUser = userFixtures.userListItem()
      const otherUser = userFixtures.userListItem()
      mockGetUsersSuccess({ body: [executorUser, currentUser, otherUser] })
      mockGetLocationsCatalogSuccess({ body: [], once: false })
      mockGetCurrencyListSuccess({ body: [] })
      mockGetEquipmentCatalogListSuccess({
        body: warehouseFixtures.equipmentsCatalog(),
        once: false,
      })

      const { user } = render(<CreateRelocationTaskPage />, {
        store: getStoreWithAuth({ id: currentUser.id }, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      await relocationTaskFormTestUtils.expectExecutorsLoadingFinished()
      await relocationTaskFormTestUtils.expectControllersLoadingFinished()
      await relocationTaskFormTestUtils.openExecutorSelect(user)
      await relocationTaskFormTestUtils.setExecutor(user, executorUser.fullName)
      await relocationTaskFormTestUtils.openControllerSelect(user)
      const executorOption = relocationTaskFormTestUtils.queryControllerOption(
        executorUser.fullName,
      )
      const currentUserOption = relocationTaskFormTestUtils.queryControllerOption(
        currentUser.fullName,
      )
      const otherUserOption = relocationTaskFormTestUtils.getControllerOption(otherUser.fullName)

      expect(otherUserOption).toBeInTheDocument()
      expect(executorOption).not.toBeInTheDocument()
      expect(currentUserOption).not.toBeInTheDocument()
    })

    test('Исполнителем нельзя выбрать контроллера', async () => {
      const controllerUser = userFixtures.userListItem()
      const currentUser = userFixtures.userListItem()
      mockGetUsersSuccess({ body: [controllerUser, currentUser] })
      mockGetLocationsCatalogSuccess({ body: [], once: false })
      mockGetCurrencyListSuccess({ body: [] })
      mockGetEquipmentCatalogListSuccess({
        body: warehouseFixtures.equipmentsCatalog(),
        once: false,
      })

      const { user } = render(<CreateRelocationTaskPage />, {
        store: getStoreWithAuth({ id: currentUser.id }, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      await relocationTaskFormTestUtils.expectExecutorsLoadingFinished()
      await relocationTaskFormTestUtils.expectControllersLoadingFinished()
      await relocationTaskFormTestUtils.openControllerSelect(user)
      await relocationTaskFormTestUtils.setController(user, controllerUser.fullName)
      await relocationTaskFormTestUtils.openExecutorSelect(user)
      const currentUserOption = relocationTaskFormTestUtils.getExecutorOption(currentUser.fullName)
      const controllerOption = relocationTaskFormTestUtils.queryExecutorOption(
        controllerUser.fullName,
      )

      expect(currentUserOption).toBeInTheDocument()
      expect(controllerOption).not.toBeInTheDocument()
    })
  })

  describe('Перечень оборудования', () => {
    test('Отображается', () => {
      mockGetUsersSuccess()
      mockGetLocationsCatalogSuccess({ once: false })
      mockGetEquipmentCatalogListSuccess()
      mockGetCurrencyListSuccess()

      render(<CreateRelocationTaskPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      const title = within(createRelocationTaskPageTestUtils.getContainer()).getByText(
        'Перечень оборудования',
      )
      const table = relocationEquipmentEditableTableTestUtils.getContainer()

      expect(title).toBeInTheDocument()
      expect(table).toBeInTheDocument()
    })
  })

  // todo: не проходит на CI
  describe.skip('Кнопка скачивания шаблона', () => {
    test('Отображается если есть права', () => {
      mockGetUsersSuccess()
      mockGetLocationsCatalogSuccess({ once: false })
      mockGetEquipmentCatalogListSuccess()
      mockGetCurrencyListSuccess()

      render(<CreateRelocationTaskPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: {
            ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.EquipmentsCreate] }),
          },
        }),
      })

      const button = createRelocationTaskPageTestUtils.getDownloadTemplateButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Не отображается если нет прав', () => {
      mockGetUsersSuccess()
      mockGetLocationsCatalogSuccess({ once: false })
      mockGetEquipmentCatalogListSuccess()
      mockGetCurrencyListSuccess()

      render(<CreateRelocationTaskPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      const button = createRelocationTaskPageTestUtils.queryDownloadTemplateButton()
      expect(button).not.toBeInTheDocument()
    })

    test('При успешном запросе отрабатывает функционал скачивания', async () => {
      mockGetUsersSuccess({ body: [] })
      mockGetLocationsCatalogSuccess({ body: [], once: false })
      mockGetEquipmentCatalogListSuccess()
      mockGetCurrencyListSuccess({ body: [] })

      const file = fakeWord()
      mockGetEquipmentListTemplateSuccess({ body: file })

      const downloadFileSpy = jest.spyOn(downloadFileUtils, 'downloadFile')

      const base64ToArrayBufferSpy = jest.spyOn(base64Utils, 'base64ToBytes')
      const arrayBuffer = new Uint8Array()
      base64ToArrayBufferSpy.mockReturnValueOnce(arrayBuffer)

      const { user } = render(<CreateRelocationTaskPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: {
            ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.EquipmentsCreate] }),
          },
        }),
      })

      await createRelocationTaskPageTestUtils.clickDownloadTemplateButton(user)

      await waitFor(() => expect(base64ToArrayBufferSpy).toBeCalledTimes(1))
      expect(base64ToArrayBufferSpy).toBeCalledWith(file)

      expect(downloadFileSpy).toBeCalledTimes(1)
      expect(downloadFileSpy).toBeCalledWith(
        arrayBuffer,
        MimetypeEnum.Xls,
        'Шаблон загрузки оборудования',
      )
    })

    // todo: не проходит на CI
    test.skip('При не успешном запросе отображается сообщение об ошибке', async () => {
      mockGetUsersSuccess({ body: [] })
      mockGetLocationsCatalogSuccess({ body: [], once: false })
      mockGetEquipmentCatalogListSuccess()
      mockGetCurrencyListSuccess({ body: [] })
      mockGetEquipmentListTemplateServerError()

      const { user } = render(<CreateRelocationTaskPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: {
            ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.EquipmentsCreate] }),
          },
        }),
      })

      await createRelocationTaskPageTestUtils.clickDownloadTemplateButton(user)
      const notification = await notificationTestUtils.findNotification(
        getEquipmentListTemplateErrMsg,
      )

      expect(notification).toBeInTheDocument()
    })
  })

  describe('Кнопка добавления из Excel', () => {
    test('Отображается если есть права', () => {
      mockGetUsersSuccess()
      mockGetLocationsCatalogSuccess({ once: false })
      mockGetEquipmentCatalogListSuccess()
      mockGetCurrencyListSuccess()

      render(<CreateRelocationTaskPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: {
            ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.EquipmentsCreate] }),
          },
        }),
      })

      const button = createRelocationTaskPageTestUtils.getAddByExcelButton()
      expect(button).toBeInTheDocument()
    })

    test('Не отображается если нет прав', () => {
      mockGetUsersSuccess()
      mockGetLocationsCatalogSuccess({ once: false })
      mockGetEquipmentCatalogListSuccess()
      mockGetCurrencyListSuccess()

      render(<CreateRelocationTaskPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      const button = createRelocationTaskPageTestUtils.queryAddByExcelButton()
      expect(button).not.toBeInTheDocument()
    })

    test('Активна если условия соблюдены', async () => {
      mockGetUsersSuccess({ body: [] })

      const locationTo = catalogsFixtures.locationCatalogListItem({
        type: LocationTypeEnum.Warehouse,
      })
      const locationFrom = catalogsFixtures.locationCatalogListItem()
      mockGetLocationsCatalogSuccess({ body: [locationTo, locationFrom], once: false })

      mockGetEquipmentCatalogListSuccess({ body: [] })
      mockGetCurrencyListSuccess({ body: [] })

      const { user } = render(<CreateRelocationTaskPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: {
            ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.EquipmentsCreate] }),
          },
        }),
      })

      await relocationTaskFormTestUtils.expectRelocateFromLoadingFinished()
      await relocationTaskFormTestUtils.openRelocateFromSelect(user)
      await relocationTaskFormTestUtils.setRelocateFrom(user, locationFrom.title)

      await relocationTaskFormTestUtils.expectRelocateToLoadingFinished()
      await relocationTaskFormTestUtils.openRelocateToSelect(user)
      await relocationTaskFormTestUtils.setRelocateTo(user, locationTo.title)

      const button = createRelocationTaskPageTestUtils.getAddByExcelButton()
      expect(button).toBeEnabled()
    })

    describe('Не активна если условия соблюдены', () => {
      test('Но не выбран объект выбытия и прибытия', async () => {
        mockGetUsersSuccess()

        const locationTo = catalogsFixtures.locationCatalogListItem({
          type: LocationTypeEnum.Warehouse,
        })
        const locationFrom = catalogsFixtures.locationCatalogListItem()
        mockGetLocationsCatalogSuccess({ body: [locationTo, locationFrom], once: false })

        mockGetEquipmentCatalogListSuccess({ body: [] })
        mockGetCurrencyListSuccess({ body: [] })

        render(<CreateRelocationTaskPage />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.EquipmentsCreate] }),
            },
          }),
        })

        const button = createRelocationTaskPageTestUtils.getAddByExcelButton()
        expect(button).toBeDisabled()
      })

      test('Но не выбран объект прибытия, а объект выбытия выбран', async () => {
        mockGetUsersSuccess({ body: [] })

        const locationTo = catalogsFixtures.locationCatalogListItem({
          type: LocationTypeEnum.Warehouse,
        })
        const locationFrom = catalogsFixtures.locationCatalogListItem()
        mockGetLocationsCatalogSuccess({ body: [locationTo, locationFrom], once: false })

        mockGetEquipmentCatalogListSuccess({ body: [] })
        mockGetCurrencyListSuccess({ body: [] })

        const { user } = render(<CreateRelocationTaskPage />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.EquipmentsCreate] }),
            },
          }),
        })

        await relocationTaskFormTestUtils.expectRelocateFromLoadingFinished()
        await relocationTaskFormTestUtils.openRelocateFromSelect(user)
        await relocationTaskFormTestUtils.setRelocateFrom(user, locationFrom.title)

        const button = createRelocationTaskPageTestUtils.getAddByExcelButton()
        expect(button).toBeDisabled()
      })

      test('Но объект прибытия не склад', async () => {
        mockGetUsersSuccess({ body: [] })

        const locationTo = catalogsFixtures.locationCatalogListItem()
        const locationFrom = catalogsFixtures.locationCatalogListItem()
        mockGetLocationsCatalogSuccess({ body: [locationTo, locationFrom], once: false })

        mockGetEquipmentCatalogListSuccess({ body: [] })
        mockGetCurrencyListSuccess({ body: [] })

        const { user } = render(<CreateRelocationTaskPage />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.EquipmentsCreate] }),
            },
          }),
        })

        await relocationTaskFormTestUtils.expectRelocateFromLoadingFinished()
        await relocationTaskFormTestUtils.openRelocateFromSelect(user)
        await relocationTaskFormTestUtils.setRelocateFrom(user, locationFrom.title)

        await relocationTaskFormTestUtils.expectRelocateToLoadingFinished()
        await relocationTaskFormTestUtils.openRelocateToSelect(user)
        await relocationTaskFormTestUtils.setRelocateTo(user, locationTo.title)

        const button = createRelocationTaskPageTestUtils.getAddByExcelButton()
        expect(button).toBeDisabled()
      })
    })

    test('При успешном запросе открывается модалка', async () => {
      mockGetUsersSuccess({ body: [] })

      const locationTo = catalogsFixtures.locationCatalogListItem({
        type: LocationTypeEnum.Warehouse,
      })
      const locationFrom = catalogsFixtures.locationCatalogListItem()
      mockGetLocationsCatalogSuccess({ body: [locationTo, locationFrom], once: false })

      mockGetEquipmentCatalogListSuccess({ body: [] })
      mockGetCurrencyListSuccess({ body: [] })
      mockImportEquipmentsByFileSuccess({ body: [warehouseFixtures.importedEquipmentByFile()] })

      const { user } = render(<CreateRelocationTaskPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: {
            ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.EquipmentsCreate] }),
          },
        }),
      })

      await relocationTaskFormTestUtils.expectRelocateFromLoadingFinished()
      await relocationTaskFormTestUtils.openRelocateFromSelect(user)
      mockGetWarehouseSuccess(locationFrom.id)
      await relocationTaskFormTestUtils.setRelocateFrom(user, locationFrom.title)

      await relocationTaskFormTestUtils.expectRelocateToLoadingFinished()
      await relocationTaskFormTestUtils.openRelocateToSelect(user)
      mockGetWarehouseSuccess(locationTo.id)
      await relocationTaskFormTestUtils.setRelocateTo(user, locationTo.title)

      await createRelocationTaskPageTestUtils.setExcelFile(user)
      await createRelocationTaskPageTestUtils.expectAddByExcelLoadingFinished()
      const modal = await createEquipmentsByFileModalTestUtils.findContainer()

      expect(modal).toBeInTheDocument()
    })

    describe('При не успешном запросе', () => {
      test('Обрабатывается ошибка 400', async () => {
        mockGetUsersSuccess({ body: [] })

        const locationTo = catalogsFixtures.locationCatalogListItem({
          type: LocationTypeEnum.Warehouse,
        })
        const locationFrom = catalogsFixtures.locationCatalogListItem()
        mockGetLocationsCatalogSuccess({ body: [locationTo, locationFrom], once: false })

        mockGetEquipmentCatalogListSuccess({ body: [] })
        mockGetCurrencyListSuccess({ body: [] })

        const errorMsg = fakeWord()
        mockImportEquipmentsByFileBadRequestError({ body: { detail: errorMsg } })

        const { user } = render(<CreateRelocationTaskPage />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.EquipmentsCreate] }),
            },
          }),
        })

        await relocationTaskFormTestUtils.expectRelocateFromLoadingFinished()
        await relocationTaskFormTestUtils.openRelocateFromSelect(user)
        mockGetWarehouseSuccess(locationFrom.id)
        await relocationTaskFormTestUtils.setRelocateFrom(user, locationFrom.title)

        await relocationTaskFormTestUtils.expectRelocateToLoadingFinished()
        await relocationTaskFormTestUtils.openRelocateToSelect(user)
        mockGetWarehouseSuccess(locationTo.id)
        await relocationTaskFormTestUtils.setRelocateTo(user, locationTo.title)

        await createRelocationTaskPageTestUtils.setExcelFile(user)
        await createRelocationTaskPageTestUtils.expectAddByExcelLoadingFinished()

        const notification = await notificationTestUtils.findNotification(errorMsg)
        expect(notification).toBeInTheDocument()
      })

      test('Обрабатывается ошибка 500', async () => {
        mockGetUsersSuccess({ body: [] })

        const locationTo = catalogsFixtures.locationCatalogListItem({
          type: LocationTypeEnum.Warehouse,
        })
        const locationFrom = catalogsFixtures.locationCatalogListItem()
        mockGetLocationsCatalogSuccess({ body: [locationTo, locationFrom], once: false })

        mockGetEquipmentCatalogListSuccess({ body: [] })
        mockGetCurrencyListSuccess({ body: [] })
        mockImportEquipmentsByFileServerError()

        const { user } = render(<CreateRelocationTaskPage />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.EquipmentsCreate] }),
            },
          }),
        })

        await relocationTaskFormTestUtils.expectRelocateFromLoadingFinished()
        await relocationTaskFormTestUtils.openRelocateFromSelect(user)
        mockGetWarehouseSuccess(locationFrom.id)
        await relocationTaskFormTestUtils.setRelocateFrom(user, locationFrom.title)

        await relocationTaskFormTestUtils.expectRelocateToLoadingFinished()
        await relocationTaskFormTestUtils.openRelocateToSelect(user)
        mockGetWarehouseSuccess(locationTo.id)
        await relocationTaskFormTestUtils.setRelocateTo(user, locationTo.title)

        await createRelocationTaskPageTestUtils.setExcelFile(user)
        await createRelocationTaskPageTestUtils.expectAddByExcelLoadingFinished()

        const notification = await notificationTestUtils.findNotification(
          importEquipmentsByFileErrMsg,
        )
        expect(notification).toBeInTheDocument()
      })
    })
  })
})
