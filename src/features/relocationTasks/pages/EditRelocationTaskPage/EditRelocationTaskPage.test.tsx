import { waitFor, within } from '@testing-library/react'
import {
  getEquipmentsTemplateErrorMessage,
  importEquipmentsByFileErrorMessage,
} from 'features/equipments/api/constants'
import { UserPermissionsEnum } from 'features/users/api/constants'
import * as reactRouterDom from 'react-router-dom'

import { LocationTypeEnum } from 'shared/catalogs/locations/api/constants'
import { MimetypeEnum } from 'shared/constants/mimetype'
import * as base64Utils from 'shared/utils/common/base64'
import * as downloadFileUtils from 'shared/utils/file/downloadFile'

import { createEquipmentsByFileModalTestUtils } from '_tests_/features/warehouses/components/CreateEquipmentsByFileModal/testUtils'
import { relocationEquipmentEditableTableTestUtils } from '_tests_/features/warehouses/components/RelocationEquipmentEditableTable/testUtils'
import { relocationTaskFormTestUtils } from '_tests_/features/warehouses/components/RelocationTaskForm/testUtils'
import { relocationTaskId } from '_tests_/features/warehouses/pages/EditRelocationTaskPage/constants'
import { editRelocationTaskPageTestUtils } from '_tests_/features/warehouses/pages/EditRelocationTaskPage/testUtils'
import catalogsFixtures from '_tests_/fixtures/catalogs'
import equipmentsFixtures from '_tests_/fixtures/equipments'
import relocationTasksFixtures from '_tests_/fixtures/relocationTasks'
import userFixtures from '_tests_/fixtures/users'
import {
  fakeWord,
  getStoreWithAuth,
  notificationTestUtils,
  render,
  setupApiTests,
} from '_tests_/helpers'
import {
  mockCreateAttachmentSuccess,
  mockGetCurrenciesSuccess,
  mockGetEquipmentsCatalogSuccess,
  mockGetEquipmentsTemplateServerError,
  mockGetEquipmentsTemplateSuccess,
  mockGetLocationsCatalogSuccess,
  mockGetRelocationEquipmentBalancesSuccess,
  mockGetRelocationEquipmentsSuccess,
  mockGetRelocationTaskAttachmentsSuccess,
  mockGetRelocationTaskSuccess,
  mockGetUsersSuccess,
  mockGetWarehouseSuccess,
  mockImportEquipmentsByFileBadRequestError,
  mockImportEquipmentsByFileServerError,
  mockImportEquipmentsByFileSuccess,
} from '_tests_/mocks/api'
import { getUserMeQueryMock } from '_tests_/mocks/store/users'

import EditRelocationTaskPage from './index'

jest.mock('react-router-dom', () => ({
  __esModule: true,
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}))

setupApiTests()

describe('Страница редактирования заявки на перемещение', () => {
  describe('Форма', () => {
    test('Отображается', () => {
      jest.spyOn(reactRouterDom, 'useParams').mockReturnValue({ id: String(relocationTaskId) })

      mockGetUsersSuccess()
      mockGetLocationsCatalogSuccess()
      mockGetEquipmentsCatalogSuccess()
      mockGetCurrenciesSuccess()
      mockGetRelocationTaskSuccess({ relocationTaskId })
      mockGetRelocationEquipmentsSuccess({ relocationTaskId })
      mockGetRelocationEquipmentBalancesSuccess(relocationTaskId)

      render(<EditRelocationTaskPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
        }),
      })

      const form = relocationTaskFormTestUtils.getContainer()
      expect(form).toBeInTheDocument()
    })

    test.skip('Контроллером нельзя выбрать исполнителя и текущего пользователя', async () => {
      jest.spyOn(reactRouterDom, 'useParams').mockReturnValue({ id: String(relocationTaskId) })

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
      mockGetRelocationTaskSuccess({ relocationTaskId })
      mockGetRelocationEquipmentsSuccess({ relocationTaskId })
      mockGetRelocationEquipmentBalancesSuccess(relocationTaskId)
      mockGetRelocationTaskAttachmentsSuccess(relocationTaskId)

      const { user } = render(<EditRelocationTaskPage />, {
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

    test.skip('Исполнителем нельзя выбрать контроллера', async () => {
      jest.spyOn(reactRouterDom, 'useParams').mockReturnValue({ id: String(relocationTaskId) })

      const controllerUser = userFixtures.user()
      const currentUser = userFixtures.userDetail()
      mockGetUsersSuccess({ body: [controllerUser, currentUser] })
      mockGetLocationsCatalogSuccess({ body: [], once: false })
      mockGetCurrenciesSuccess({ body: [] })
      mockGetEquipmentsCatalogSuccess({
        body: equipmentsFixtures.equipmentsCatalog(),
        once: false,
      })
      mockGetRelocationTaskSuccess({ relocationTaskId })
      mockGetRelocationEquipmentsSuccess({ relocationTaskId })
      mockGetRelocationEquipmentBalancesSuccess(relocationTaskId)
      mockGetRelocationTaskAttachmentsSuccess(relocationTaskId)

      const { user } = render(<EditRelocationTaskPage />, {
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
      jest.spyOn(reactRouterDom, 'useParams').mockReturnValue({ id: String(relocationTaskId) })

      mockGetUsersSuccess()
      mockGetLocationsCatalogSuccess()
      mockGetEquipmentsCatalogSuccess()
      mockGetCurrenciesSuccess()
      mockGetRelocationTaskSuccess({ relocationTaskId })
      mockGetRelocationEquipmentsSuccess({ relocationTaskId })
      mockGetRelocationEquipmentBalancesSuccess(relocationTaskId)

      render(<EditRelocationTaskPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
        }),
      })

      const title = within(editRelocationTaskPageTestUtils.getContainer()).getByText(
        'Перечень оборудования',
      )
      const table = relocationEquipmentEditableTableTestUtils.getContainer()

      expect(title).toBeInTheDocument()
      expect(table).toBeInTheDocument()
    })
  })

  describe('Кнопка скачивания шаблона', () => {
    test('Отображается если есть права', () => {
      jest.spyOn(reactRouterDom, 'useParams').mockReturnValue({ id: String(relocationTaskId) })

      mockGetUsersSuccess()
      mockGetLocationsCatalogSuccess()
      mockGetEquipmentsCatalogSuccess()
      mockGetCurrenciesSuccess()
      mockGetRelocationTaskSuccess({ relocationTaskId })
      mockGetRelocationEquipmentsSuccess({ relocationTaskId })
      mockGetRelocationEquipmentBalancesSuccess(relocationTaskId)

      render(<EditRelocationTaskPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: {
            ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.EquipmentsCreate] }),
          },
        }),
      })

      const button = editRelocationTaskPageTestUtils.getDownloadTemplateButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Не отображается если нет прав', () => {
      jest.spyOn(reactRouterDom, 'useParams').mockReturnValue({ id: String(relocationTaskId) })

      mockGetUsersSuccess()
      mockGetLocationsCatalogSuccess()
      mockGetEquipmentsCatalogSuccess()
      mockGetCurrenciesSuccess()
      mockGetRelocationTaskSuccess({ relocationTaskId })
      mockGetRelocationEquipmentsSuccess({ relocationTaskId })
      mockGetRelocationEquipmentBalancesSuccess(relocationTaskId)

      render(<EditRelocationTaskPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
        }),
      })

      const button = editRelocationTaskPageTestUtils.queryDownloadTemplateButton()
      expect(button).not.toBeInTheDocument()
    })

    test('При успешном запросе отрабатывает функционал скачивания', async () => {
      jest.spyOn(reactRouterDom, 'useParams').mockReturnValue({ id: String(relocationTaskId) })

      mockGetUsersSuccess({ body: [] })
      mockGetLocationsCatalogSuccess({ body: [] })
      mockGetEquipmentsCatalogSuccess()
      mockGetCurrenciesSuccess({ body: [] })
      mockGetRelocationTaskSuccess({ relocationTaskId })
      mockGetRelocationEquipmentsSuccess({ relocationTaskId })
      mockGetRelocationEquipmentBalancesSuccess(relocationTaskId)

      const file = fakeWord()
      mockGetEquipmentsTemplateSuccess({ body: file })

      const downloadFileSpy = jest.spyOn(downloadFileUtils, 'downloadFile')

      const base64ToArrayBufferSpy = jest.spyOn(base64Utils, 'base64ToBytes')
      const arrayBuffer = new Uint8Array()
      base64ToArrayBufferSpy.mockReturnValueOnce(arrayBuffer)

      const { user } = render(<EditRelocationTaskPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: {
            ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.EquipmentsCreate] }),
          },
        }),
      })

      await editRelocationTaskPageTestUtils.clickDownloadTemplateButton(user)

      await waitFor(() => expect(base64ToArrayBufferSpy).toBeCalledTimes(1))
      expect(base64ToArrayBufferSpy).toBeCalledWith(file)

      expect(downloadFileSpy).toBeCalledTimes(1)
      expect(downloadFileSpy).toBeCalledWith(
        arrayBuffer,
        MimetypeEnum.Xls,
        'Шаблон загрузки оборудования',
      )
    })

    test.skip('При не успешном запросе отображается сообщение об ошибке', async () => {
      jest.spyOn(reactRouterDom, 'useParams').mockReturnValue({ id: String(relocationTaskId) })

      mockGetUsersSuccess({ body: [] })
      mockGetLocationsCatalogSuccess({ body: [] })
      mockGetEquipmentsCatalogSuccess()
      mockGetCurrenciesSuccess({ body: [] })
      mockGetRelocationTaskSuccess({ relocationTaskId })
      mockGetRelocationEquipmentsSuccess({ relocationTaskId })
      mockGetRelocationEquipmentBalancesSuccess(relocationTaskId)
      mockGetEquipmentsTemplateServerError()

      const { user } = render(<EditRelocationTaskPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: {
            ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.EquipmentsCreate] }),
          },
        }),
      })

      await editRelocationTaskPageTestUtils.clickDownloadTemplateButton(user)
      const notification = await notificationTestUtils.findNotification(
        getEquipmentsTemplateErrorMessage,
      )

      expect(notification).toBeInTheDocument()
    })
  })

  describe('Кнопка добавления из Excel', () => {
    test('Отображается если есть права', () => {
      jest.spyOn(reactRouterDom, 'useParams').mockReturnValue({ id: String(relocationTaskId) })

      mockGetUsersSuccess()
      mockGetLocationsCatalogSuccess()
      mockGetEquipmentsCatalogSuccess()
      mockGetCurrenciesSuccess()
      mockGetRelocationTaskSuccess({ relocationTaskId })
      mockGetRelocationEquipmentsSuccess({ relocationTaskId })
      mockGetRelocationEquipmentBalancesSuccess(relocationTaskId)

      render(<EditRelocationTaskPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: {
            ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.EquipmentsCreate] }),
          },
        }),
      })

      const button = editRelocationTaskPageTestUtils.getAddByExcelButton()
      expect(button).toBeInTheDocument()
    })

    test('Не отображается если нет прав', () => {
      jest.spyOn(reactRouterDom, 'useParams').mockReturnValue({ id: String(relocationTaskId) })

      mockGetUsersSuccess()
      mockGetLocationsCatalogSuccess()
      mockGetEquipmentsCatalogSuccess()
      mockGetCurrenciesSuccess()
      mockGetRelocationTaskSuccess({ relocationTaskId })
      mockGetRelocationEquipmentsSuccess({ relocationTaskId })
      mockGetRelocationEquipmentBalancesSuccess(relocationTaskId)

      render(<EditRelocationTaskPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
        }),
      })

      const button = editRelocationTaskPageTestUtils.queryAddByExcelButton()
      expect(button).not.toBeInTheDocument()
    })

    test.skip('Активна если условия соблюдены', async () => {
      jest.spyOn(reactRouterDom, 'useParams').mockReturnValue({ id: String(relocationTaskId) })

      mockGetUsersSuccess({ body: [] })
      mockGetRelocationTaskSuccess(
        { relocationTaskId },
        { body: relocationTasksFixtures.relocationTaskDetail() },
      )
      mockGetRelocationEquipmentsSuccess({ relocationTaskId })
      mockGetRelocationEquipmentBalancesSuccess(relocationTaskId)
      mockGetEquipmentsCatalogSuccess({ body: [] })
      mockGetCurrenciesSuccess({ body: [] })

      const locationTo = catalogsFixtures.locationCatalogItem({
        type: LocationTypeEnum.Warehouse,
      })
      const locationFrom = catalogsFixtures.locationCatalogItem()
      mockGetLocationsCatalogSuccess({ body: [locationTo, locationFrom], once: false })

      const { user } = render(<EditRelocationTaskPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: {
            ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.EquipmentsCreate] }),
          },
        }),
      })

      await relocationTaskFormTestUtils.expectRelocateFromLoadingStarted()
      await relocationTaskFormTestUtils.expectRelocateFromLoadingFinished()
      await relocationTaskFormTestUtils.openRelocateFromSelect(user)
      await relocationTaskFormTestUtils.setRelocateFrom(user, locationFrom.title)

      await relocationTaskFormTestUtils.expectRelocateToLoadingFinished()
      await relocationTaskFormTestUtils.openRelocateToSelect(user)
      await relocationTaskFormTestUtils.setRelocateTo(user, locationTo.title)

      const button = editRelocationTaskPageTestUtils.getAddByExcelButton()
      expect(button).toBeEnabled()
    })

    describe.skip('Не активна если условия соблюдены', () => {
      test('Но не выбран объект выбытия и прибытия', async () => {
        jest.spyOn(reactRouterDom, 'useParams').mockReturnValue({ id: String(relocationTaskId) })

        mockGetUsersSuccess()
        mockGetRelocationTaskSuccess(
          { relocationTaskId },
          { body: relocationTasksFixtures.relocationTaskDetail() },
        )
        mockGetRelocationEquipmentsSuccess({ relocationTaskId })
        mockGetRelocationEquipmentBalancesSuccess(relocationTaskId)
        mockGetEquipmentsCatalogSuccess({ body: [] })
        mockGetCurrenciesSuccess({ body: [] })

        const locationTo = catalogsFixtures.locationCatalogItem({
          type: LocationTypeEnum.Warehouse,
        })
        const locationFrom = catalogsFixtures.locationCatalogItem()
        mockGetLocationsCatalogSuccess({ body: [locationTo, locationFrom], once: false })

        render(<EditRelocationTaskPage />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.EquipmentsCreate] }),
            },
          }),
        })

        const button = editRelocationTaskPageTestUtils.getAddByExcelButton()
        expect(button).toBeDisabled()
      })

      test('Но не выбран объект прибытия, а объект выбытия выбран', async () => {
        jest.spyOn(reactRouterDom, 'useParams').mockReturnValue({ id: String(relocationTaskId) })

        mockGetUsersSuccess({ body: [] })
        mockGetRelocationTaskSuccess(
          { relocationTaskId },
          { body: relocationTasksFixtures.relocationTaskDetail() },
        )
        mockGetRelocationEquipmentsSuccess({ relocationTaskId })
        mockGetRelocationEquipmentBalancesSuccess(relocationTaskId)
        mockGetEquipmentsCatalogSuccess({ body: [] })
        mockGetCurrenciesSuccess({ body: [] })

        const locationTo = catalogsFixtures.locationCatalogItem({
          type: LocationTypeEnum.Warehouse,
        })
        const locationFrom = catalogsFixtures.locationCatalogItem()
        mockGetLocationsCatalogSuccess({ body: [locationTo, locationFrom], once: false })

        const { user } = render(<EditRelocationTaskPage />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.EquipmentsCreate] }),
            },
          }),
        })

        await relocationTaskFormTestUtils.expectRelocateFromLoadingStarted()
        await relocationTaskFormTestUtils.expectRelocateFromLoadingFinished()
        await relocationTaskFormTestUtils.openRelocateFromSelect(user)
        await relocationTaskFormTestUtils.setRelocateFrom(user, locationFrom.title)

        const button = editRelocationTaskPageTestUtils.getAddByExcelButton()
        expect(button).toBeDisabled()
      })

      test('Но объект прибытия не склад', async () => {
        jest.spyOn(reactRouterDom, 'useParams').mockReturnValue({ id: String(relocationTaskId) })

        mockGetUsersSuccess({ body: [] })
        mockGetRelocationTaskSuccess(
          { relocationTaskId },
          { body: relocationTasksFixtures.relocationTaskDetail() },
        )
        mockGetRelocationEquipmentsSuccess({ relocationTaskId })
        mockGetRelocationEquipmentBalancesSuccess(relocationTaskId)
        mockGetEquipmentsCatalogSuccess({ body: [] })
        mockGetCurrenciesSuccess({ body: [] })

        const locationTo = catalogsFixtures.locationCatalogItem()
        const locationFrom = catalogsFixtures.locationCatalogItem()
        mockGetLocationsCatalogSuccess({ body: [locationTo, locationFrom], once: false })

        const { user } = render(<EditRelocationTaskPage />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.EquipmentsCreate] }),
            },
          }),
        })

        await relocationTaskFormTestUtils.expectRelocateFromLoadingStarted()
        await relocationTaskFormTestUtils.expectRelocateFromLoadingFinished()
        await relocationTaskFormTestUtils.openRelocateFromSelect(user)
        await relocationTaskFormTestUtils.setRelocateFrom(user, locationFrom.title)

        await relocationTaskFormTestUtils.expectRelocateToLoadingFinished()
        await relocationTaskFormTestUtils.openRelocateToSelect(user)
        await relocationTaskFormTestUtils.setRelocateTo(user, locationTo.title)

        const button = editRelocationTaskPageTestUtils.getAddByExcelButton()
        expect(button).toBeDisabled()
      })
    })

    test.skip('При успешном запросе открывается модалка', async () => {
      jest.spyOn(reactRouterDom, 'useParams').mockReturnValue({ id: String(relocationTaskId) })

      mockGetUsersSuccess({ body: [] })
      mockGetRelocationTaskSuccess(
        { relocationTaskId },
        { body: relocationTasksFixtures.relocationTaskDetail() },
      )
      mockGetRelocationEquipmentsSuccess({ relocationTaskId })
      mockGetRelocationEquipmentBalancesSuccess(relocationTaskId)
      mockGetEquipmentsCatalogSuccess({ body: [] })
      mockGetCurrenciesSuccess({ body: [] })
      mockGetRelocationTaskAttachmentsSuccess(relocationTaskId)
      mockCreateAttachmentSuccess()

      const locationTo = catalogsFixtures.locationCatalogItem({
        type: LocationTypeEnum.Warehouse,
      })
      const locationFrom = catalogsFixtures.locationCatalogItem({
        type: LocationTypeEnum.Warehouse,
      })
      mockGetLocationsCatalogSuccess({ body: [locationTo, locationFrom], once: false })

      mockImportEquipmentsByFileSuccess({ body: [equipmentsFixtures.importedEquipmentByFile()] })

      const { user } = render(<EditRelocationTaskPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: {
            ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.EquipmentsCreate] }),
          },
        }),
      })

      await relocationTaskFormTestUtils.expectRelocateFromLoadingStarted()
      await relocationTaskFormTestUtils.expectRelocateFromLoadingFinished()
      await relocationTaskFormTestUtils.openRelocateFromSelect(user)
      mockGetWarehouseSuccess(locationFrom.id)
      await relocationTaskFormTestUtils.setRelocateFrom(user, locationFrom.title)

      await relocationTaskFormTestUtils.expectRelocateToLoadingFinished()
      await relocationTaskFormTestUtils.openRelocateToSelect(user)
      mockGetWarehouseSuccess(locationTo.id)
      await relocationTaskFormTestUtils.setRelocateTo(user, locationTo.title)

      await editRelocationTaskPageTestUtils.setExcelFile(user)
      await editRelocationTaskPageTestUtils.expectAddByExcelLoadingFinished()
      const modal = await createEquipmentsByFileModalTestUtils.findContainer()

      expect(modal).toBeInTheDocument()
    })

    describe('При не успешном запросе', () => {
      test('Обрабатывается ошибка 400', async () => {
        jest.spyOn(reactRouterDom, 'useParams').mockReturnValue({ id: String(relocationTaskId) })

        mockGetUsersSuccess({ body: [] })
        mockGetRelocationTaskSuccess(
          { relocationTaskId },
          { body: relocationTasksFixtures.relocationTaskDetail() },
        )
        mockGetRelocationEquipmentsSuccess({ relocationTaskId })
        mockGetRelocationEquipmentBalancesSuccess(relocationTaskId)
        mockGetEquipmentsCatalogSuccess({ body: [] })
        mockGetCurrenciesSuccess({ body: [] })

        const locationTo = catalogsFixtures.locationCatalogItem({
          type: LocationTypeEnum.Warehouse,
        })
        const locationFrom = catalogsFixtures.locationCatalogItem()
        mockGetLocationsCatalogSuccess({ body: [locationTo, locationFrom], once: false })

        const errorMsg = fakeWord()
        mockImportEquipmentsByFileBadRequestError({ body: { detail: errorMsg } })

        const { user } = render(<EditRelocationTaskPage />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.EquipmentsCreate] }),
            },
          }),
        })

        await relocationTaskFormTestUtils.expectRelocateFromLoadingStarted()
        await relocationTaskFormTestUtils.expectRelocateFromLoadingFinished()
        await relocationTaskFormTestUtils.openRelocateFromSelect(user)
        await relocationTaskFormTestUtils.setRelocateFrom(user, locationFrom.title)

        await relocationTaskFormTestUtils.expectRelocateToLoadingFinished()
        await relocationTaskFormTestUtils.openRelocateToSelect(user)
        await relocationTaskFormTestUtils.setRelocateTo(user, locationTo.title)

        await editRelocationTaskPageTestUtils.setExcelFile(user)
        await editRelocationTaskPageTestUtils.expectAddByExcelLoadingFinished()

        const notification = await notificationTestUtils.findNotification(errorMsg)
        expect(notification).toBeInTheDocument()
      })

      test('Обрабатывается ошибка 500', async () => {
        jest.spyOn(reactRouterDom, 'useParams').mockReturnValue({ id: String(relocationTaskId) })

        mockGetUsersSuccess({ body: [] })
        mockGetRelocationTaskSuccess(
          { relocationTaskId },
          { body: relocationTasksFixtures.relocationTaskDetail() },
        )
        mockGetRelocationEquipmentsSuccess({ relocationTaskId })
        mockGetRelocationEquipmentBalancesSuccess(relocationTaskId)
        mockGetEquipmentsCatalogSuccess({ body: [] })
        mockGetCurrenciesSuccess({ body: [] })

        const locationTo = catalogsFixtures.locationCatalogItem({
          type: LocationTypeEnum.Warehouse,
        })
        const locationFrom = catalogsFixtures.locationCatalogItem()
        mockGetLocationsCatalogSuccess({ body: [locationTo, locationFrom], once: false })

        mockImportEquipmentsByFileServerError()

        const { user } = render(<EditRelocationTaskPage />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.EquipmentsCreate] }),
            },
          }),
        })

        await relocationTaskFormTestUtils.expectRelocateFromLoadingStarted()
        await relocationTaskFormTestUtils.expectRelocateFromLoadingFinished()
        await relocationTaskFormTestUtils.openRelocateFromSelect(user)
        await relocationTaskFormTestUtils.setRelocateFrom(user, locationFrom.title)

        await relocationTaskFormTestUtils.expectRelocateToLoadingFinished()
        await relocationTaskFormTestUtils.openRelocateToSelect(user)
        await relocationTaskFormTestUtils.setRelocateTo(user, locationTo.title)

        await editRelocationTaskPageTestUtils.setExcelFile(user)
        await editRelocationTaskPageTestUtils.expectAddByExcelLoadingFinished()

        const notification = await notificationTestUtils.findNotification(
          importEquipmentsByFileErrorMessage,
        )
        expect(notification).toBeInTheDocument()
      })
    })
  })
})
