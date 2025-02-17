import { waitFor, within } from '@testing-library/react'
import {
  getEquipmentsTemplateErrorMessage,
  importEquipmentsByFileErrorMessage,
} from 'features/equipments/api/constants'
import { UserPermissionsEnum } from 'features/users/api/constants'

import { LocationTypeEnum } from 'shared/catalogs/locations/api/constants'
import { MimetypeEnum } from 'shared/constants/mimetype'
import * as base64Utils from 'shared/utils/common/base64'
import * as downloadFileUtils from 'shared/utils/file/downloadFile'

import { createEquipmentsByFileModalTestUtils } from '_tests_/features/warehouses/components/CreateEquipmentsByFileModal/testUtils'
import { relocationEquipmentEditableTableTestUtils } from '_tests_/features/warehouses/components/RelocationEquipmentEditableTable/testUtils'
import { relocationTaskFormTestUtils } from '_tests_/features/warehouses/components/RelocationTaskForm/testUtils'
import { createRelocationTaskPageTestUtils } from '_tests_/features/warehouses/pages/CreateRelocationTaskPage/testUtils'
import catalogsFixtures from '_tests_/fixtures/api/data/catalogs'
import equipmentsFixtures from '_tests_/fixtures/api/data/equipments'
import userFixtures from '_tests_/fixtures/api/data/users'
import {
  mockGetCurrenciesSuccess,
  mockGetEquipmentsCatalogSuccess,
  mockGetEquipmentsTemplateServerError,
  mockGetEquipmentsTemplateSuccess,
  mockGetLocationsCatalogSuccess,
  mockGetUsersSuccess,
  mockGetWarehouseSuccess,
  mockImportEquipmentsByFileBadRequestError,
  mockImportEquipmentsByFileServerError,
  mockImportEquipmentsByFileSuccess,
} from '_tests_/mocks/api'
import { getStoreWithAuth } from '_tests_/fixtures/store/auth'
import { getUserMeQueryMock } from '_tests_/fixtures/store/users'
import { fakeWord, notificationTestUtils, render, setupApiTests } from '_tests_/helpers'

import CreateRelocationTaskPage from './index'

setupApiTests()
notificationTestUtils.setupNotifications()

describe('Страница создания заявки на перемещение', () => {
  describe.skip('Форма', () => {
    test('Отображается', () => {
      mockGetUsersSuccess()
      mockGetLocationsCatalogSuccess({ once: false })
      mockGetEquipmentsCatalogSuccess()
      mockGetCurrenciesSuccess()

      render(<CreateRelocationTaskPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
        }),
      })

      const form = relocationTaskFormTestUtils.getContainer()
      expect(form).toBeInTheDocument()
    })

    test('Контроллером нельзя выбрать исполнителя и текущего пользователя', async () => {
      const executorUser = userFixtures.user()
      const currentUser = userFixtures.userDetail()
      const otherUser = userFixtures.user()
      mockGetUsersSuccess({ body: [executorUser, currentUser, otherUser] })
      mockGetLocationsCatalogSuccess({ body: [], once: false })
      mockGetCurrenciesSuccess({ body: [] })
      mockGetEquipmentsCatalogSuccess({
        body: equipmentsFixtures.equipmentsCatalog(),
        once: false,
      })

      const { user } = render(<CreateRelocationTaskPage />, {
        store: getStoreWithAuth(currentUser, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
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
      const controllerUser = userFixtures.user()
      const currentUser = userFixtures.userDetail()
      mockGetUsersSuccess({ body: [controllerUser, currentUser] })
      mockGetLocationsCatalogSuccess({ body: [], once: false })
      mockGetCurrenciesSuccess({ body: [] })
      mockGetEquipmentsCatalogSuccess({
        body: equipmentsFixtures.equipmentsCatalog(),
        once: false,
      })

      const { user } = render(<CreateRelocationTaskPage />, {
        store: getStoreWithAuth(currentUser, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
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
      mockGetEquipmentsCatalogSuccess()
      mockGetCurrenciesSuccess()

      render(<CreateRelocationTaskPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
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
      mockGetEquipmentsCatalogSuccess()
      mockGetCurrenciesSuccess()

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
      mockGetEquipmentsCatalogSuccess()
      mockGetCurrenciesSuccess()

      render(<CreateRelocationTaskPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
        }),
      })

      const button = createRelocationTaskPageTestUtils.queryDownloadTemplateButton()
      expect(button).not.toBeInTheDocument()
    })

    test('При успешном запросе отрабатывает функционал скачивания', async () => {
      mockGetUsersSuccess({ body: [] })
      mockGetLocationsCatalogSuccess({ body: [], once: false })
      mockGetEquipmentsCatalogSuccess()
      mockGetCurrenciesSuccess({ body: [] })

      const file = fakeWord()
      mockGetEquipmentsTemplateSuccess({ body: file })

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
      mockGetEquipmentsCatalogSuccess()
      mockGetCurrenciesSuccess({ body: [] })
      mockGetEquipmentsTemplateServerError()

      const { user } = render(<CreateRelocationTaskPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: {
            ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.EquipmentsCreate] }),
          },
        }),
      })

      await createRelocationTaskPageTestUtils.clickDownloadTemplateButton(user)
      const notification = await notificationTestUtils.findNotification(
        getEquipmentsTemplateErrorMessage,
      )

      expect(notification).toBeInTheDocument()
    })
  })

  describe('Кнопка добавления из Excel', () => {
    test('Отображается если есть права', () => {
      mockGetUsersSuccess()
      mockGetLocationsCatalogSuccess({ once: false })
      mockGetEquipmentsCatalogSuccess()
      mockGetCurrenciesSuccess()

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
      mockGetEquipmentsCatalogSuccess()
      mockGetCurrenciesSuccess()

      render(<CreateRelocationTaskPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
        }),
      })

      const button = createRelocationTaskPageTestUtils.queryAddByExcelButton()
      expect(button).not.toBeInTheDocument()
    })

    test('Активна если условия соблюдены', async () => {
      mockGetUsersSuccess({ body: [] })

      const locationTo = catalogsFixtures.locationCatalogItem({
        type: LocationTypeEnum.Warehouse,
      })
      const locationFrom = catalogsFixtures.locationCatalogItem()
      mockGetLocationsCatalogSuccess({ body: [locationTo, locationFrom], once: false })

      mockGetEquipmentsCatalogSuccess({ body: [] })
      mockGetCurrenciesSuccess({ body: [] })

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

        const locationTo = catalogsFixtures.locationCatalogItem({
          type: LocationTypeEnum.Warehouse,
        })
        const locationFrom = catalogsFixtures.locationCatalogItem()
        mockGetLocationsCatalogSuccess({ body: [locationTo, locationFrom], once: false })

        mockGetEquipmentsCatalogSuccess({ body: [] })
        mockGetCurrenciesSuccess({ body: [] })

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

        const locationTo = catalogsFixtures.locationCatalogItem({
          type: LocationTypeEnum.Warehouse,
        })
        const locationFrom = catalogsFixtures.locationCatalogItem()
        mockGetLocationsCatalogSuccess({ body: [locationTo, locationFrom], once: false })

        mockGetEquipmentsCatalogSuccess({ body: [] })
        mockGetCurrenciesSuccess({ body: [] })

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

        const locationTo = catalogsFixtures.locationCatalogItem()
        const locationFrom = catalogsFixtures.locationCatalogItem()
        mockGetLocationsCatalogSuccess({ body: [locationTo, locationFrom], once: false })

        mockGetEquipmentsCatalogSuccess({ body: [] })
        mockGetCurrenciesSuccess({ body: [] })

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

      const locationTo = catalogsFixtures.locationCatalogItem({
        type: LocationTypeEnum.Warehouse,
      })
      const locationFrom = catalogsFixtures.locationCatalogItem()
      mockGetLocationsCatalogSuccess({ body: [locationTo, locationFrom], once: false })

      mockGetEquipmentsCatalogSuccess({ body: [] })
      mockGetCurrenciesSuccess({ body: [] })
      mockImportEquipmentsByFileSuccess({ body: [equipmentsFixtures.importedEquipmentByFile()] })

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

        const locationTo = catalogsFixtures.locationCatalogItem({
          type: LocationTypeEnum.Warehouse,
        })
        const locationFrom = catalogsFixtures.locationCatalogItem()
        mockGetLocationsCatalogSuccess({ body: [locationTo, locationFrom], once: false })

        mockGetEquipmentsCatalogSuccess({ body: [] })
        mockGetCurrenciesSuccess({ body: [] })

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

      test.skip('Обрабатывается ошибка 500', async () => {
        mockGetUsersSuccess({ body: [] })

        const locationTo = catalogsFixtures.locationCatalogItem({
          type: LocationTypeEnum.Warehouse,
        })
        const locationFrom = catalogsFixtures.locationCatalogItem()
        mockGetLocationsCatalogSuccess({ body: [locationTo, locationFrom], once: false })

        mockGetEquipmentsCatalogSuccess({ body: [] })
        mockGetCurrenciesSuccess({ body: [] })
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
          importEquipmentsByFileErrorMessage,
        )
        expect(notification).toBeInTheDocument()
      })
    })
  })
})
