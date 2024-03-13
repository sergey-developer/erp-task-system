import { screen, waitFor, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import * as reactRouterDom from 'react-router-dom'

import { UserPermissionsEnum } from 'modules/user/constants'
import { testUtils as createEquipmentsByFileModalTestUtils } from 'modules/warehouse/components/CreateEquipmentsByFileModal/CreateEquipmentsByFileModal.test'
import { testUtils as relocationEquipmentEditableTableTestUtils } from 'modules/warehouse/components/RelocationEquipmentEditableTable/RelocationEquipmentEditableTable.test'
import { testUtils as relocationTaskFormTestUtils } from 'modules/warehouse/components/RelocationTaskForm/RelocationTaskForm.test'
import {
  getEquipmentListTemplateErrorMsg,
  importEquipmentsByFileErrorMsg,
} from 'modules/warehouse/constants/equipment'

import { LocationTypeEnum } from 'shared/constants/catalogs'
import { CANCEL_TEXT } from 'shared/constants/common'
import { MimetypeEnum } from 'shared/constants/mimetype'
import * as base64Utils from 'shared/utils/common/base64'
import * as downloadFileUtils from 'shared/utils/file/downloadFile'

import catalogsFixtures from '_tests_/fixtures/catalogs'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import {
  mockGetCurrencyListSuccess,
  mockGetEquipmentCatalogListSuccess,
  mockGetEquipmentListTemplateServerError,
  mockGetEquipmentListTemplateSuccess,
  mockGetLocationListSuccess,
  mockGetRelocationEquipmentBalanceListSuccess,
  mockGetRelocationEquipmentListSuccess,
  mockGetRelocationTaskSuccess,
  mockGetUserListSuccess,
  mockImportEquipmentsByFileBadRequestError,
  mockImportEquipmentsByFileServerError,
  mockImportEquipmentsByFileSuccess,
} from '_tests_/mocks/api'
import { getUserMeQueryMock } from '_tests_/mocks/state/user'
import {
  buttonTestUtils,
  fakeId,
  fakeWord,
  getStoreWithAuth,
  notificationTestUtils,
  render,
  setupApiTests,
} from '_tests_/utils'

import EditRelocationTaskPage from './index'

const getContainer = () => screen.getByTestId('edit-relocation-task-page')

// add by excel button
const getAddByExcelButton = () =>
  buttonTestUtils.getAllButtonIn(getContainer(), /Добавить из Excel/)[1]

const getAddByExcelZoneButton = () =>
  buttonTestUtils.getAllButtonIn(getContainer(), /Добавить из Excel/)[0]

const queryAddByExcelButton = () =>
  buttonTestUtils.queryButtonIn(getContainer(), /Добавить из Excel/)

const setExcelFile = async (
  user: UserEvent,
  file: File = new File([], fakeWord(), { type: 'image/png' }),
) => {
  const button = getAddByExcelZoneButton()
  // eslint-disable-next-line testing-library/no-node-access
  const input = button.querySelector('input[type="file"]') as HTMLInputElement
  await user.upload(input, file)
  return { input, file }
}

const expectAddByExcelLoadingFinished = () =>
  buttonTestUtils.expectLoadingFinished(getAddByExcelButton())

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

  getAddByExcelButton,
  queryAddByExcelButton,
  setExcelFile,
  expectAddByExcelLoadingFinished,

  getDownloadTemplateButton,
  queryDownloadTemplateButton,
  clickDownloadTemplateButton,

  getSubmitButton,
  clickSubmitButton,

  getCancelButton,
  clickCancelButton,
}

const relocationTaskId = fakeId()

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

      mockGetUserListSuccess()
      mockGetLocationListSuccess()
      mockGetEquipmentCatalogListSuccess()
      mockGetCurrencyListSuccess()
      mockGetRelocationTaskSuccess(relocationTaskId)
      mockGetRelocationEquipmentListSuccess(relocationTaskId)
      mockGetRelocationEquipmentBalanceListSuccess(relocationTaskId)

      render(<EditRelocationTaskPage />)

      const form = relocationTaskFormTestUtils.getContainer()
      expect(form).toBeInTheDocument()
    })
  })

  describe('Перечень оборудования', () => {
    test('Отображается', () => {
      jest.spyOn(reactRouterDom, 'useParams').mockReturnValue({ id: String(relocationTaskId) })

      mockGetUserListSuccess()
      mockGetLocationListSuccess()
      mockGetEquipmentCatalogListSuccess()
      mockGetCurrencyListSuccess()
      mockGetRelocationTaskSuccess(relocationTaskId)
      mockGetRelocationEquipmentListSuccess(relocationTaskId)
      mockGetRelocationEquipmentBalanceListSuccess(relocationTaskId)

      render(<EditRelocationTaskPage />)

      const title = within(getContainer()).getByText('Перечень оборудования')
      const table = relocationEquipmentEditableTableTestUtils.getContainer()

      expect(title).toBeInTheDocument()
      expect(table).toBeInTheDocument()
    })
  })

  describe('Кнопка скачивания шаблона', () => {
    test('Отображается если есть права', () => {
      jest.spyOn(reactRouterDom, 'useParams').mockReturnValue({ id: String(relocationTaskId) })

      mockGetUserListSuccess()
      mockGetLocationListSuccess()
      mockGetEquipmentCatalogListSuccess()
      mockGetCurrencyListSuccess()
      mockGetRelocationTaskSuccess(relocationTaskId)
      mockGetRelocationEquipmentListSuccess(relocationTaskId)
      mockGetRelocationEquipmentBalanceListSuccess(relocationTaskId)

      render(<EditRelocationTaskPage />, {
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
      jest.spyOn(reactRouterDom, 'useParams').mockReturnValue({ id: String(relocationTaskId) })

      mockGetUserListSuccess()
      mockGetLocationListSuccess()
      mockGetEquipmentCatalogListSuccess()
      mockGetCurrencyListSuccess()
      mockGetRelocationTaskSuccess(relocationTaskId)
      mockGetRelocationEquipmentListSuccess(relocationTaskId)
      mockGetRelocationEquipmentBalanceListSuccess(relocationTaskId)

      render(<EditRelocationTaskPage />)

      const button = testUtils.queryDownloadTemplateButton()
      expect(button).not.toBeInTheDocument()
    })

    test('При успешном запросе отрабатывает функционал скачивания', async () => {
      jest.spyOn(reactRouterDom, 'useParams').mockReturnValue({ id: String(relocationTaskId) })

      mockGetUserListSuccess()
      mockGetLocationListSuccess({ body: [] })
      mockGetEquipmentCatalogListSuccess()
      mockGetCurrencyListSuccess({ body: [] })
      mockGetRelocationTaskSuccess(relocationTaskId)
      mockGetRelocationEquipmentListSuccess(relocationTaskId)
      mockGetRelocationEquipmentBalanceListSuccess(relocationTaskId)

      const file = fakeWord()
      mockGetEquipmentListTemplateSuccess({ body: file })

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
      jest.spyOn(reactRouterDom, 'useParams').mockReturnValue({ id: String(relocationTaskId) })

      mockGetUserListSuccess()
      mockGetLocationListSuccess({ body: [] })
      mockGetEquipmentCatalogListSuccess()
      mockGetCurrencyListSuccess({ body: [] })
      mockGetRelocationTaskSuccess(relocationTaskId)
      mockGetRelocationEquipmentListSuccess(relocationTaskId)
      mockGetRelocationEquipmentBalanceListSuccess(relocationTaskId)
      mockGetEquipmentListTemplateServerError()

      const { user } = render(<EditRelocationTaskPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: {
            ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.EquipmentsCreate] }),
          },
        }),
      })

      await testUtils.clickDownloadTemplateButton(user)
      const notification = await notificationTestUtils.findNotification(
        getEquipmentListTemplateErrorMsg,
      )

      expect(notification).toBeInTheDocument()
    })
  })

  describe('Кнопка добавления из Excel', () => {
    test('Отображается если есть права', () => {
      jest.spyOn(reactRouterDom, 'useParams').mockReturnValue({ id: String(relocationTaskId) })

      mockGetUserListSuccess()
      mockGetLocationListSuccess()
      mockGetEquipmentCatalogListSuccess()
      mockGetCurrencyListSuccess()
      mockGetRelocationTaskSuccess(relocationTaskId)
      mockGetRelocationEquipmentListSuccess(relocationTaskId)
      mockGetRelocationEquipmentBalanceListSuccess(relocationTaskId)

      render(<EditRelocationTaskPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: {
            ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.EquipmentsCreate] }),
          },
        }),
      })

      const button = testUtils.getAddByExcelButton()
      expect(button).toBeInTheDocument()
    })

    test('Не отображается если нет прав', () => {
      jest.spyOn(reactRouterDom, 'useParams').mockReturnValue({ id: String(relocationTaskId) })

      mockGetUserListSuccess()
      mockGetLocationListSuccess()
      mockGetEquipmentCatalogListSuccess()
      mockGetCurrencyListSuccess()
      mockGetRelocationTaskSuccess(relocationTaskId)
      mockGetRelocationEquipmentListSuccess(relocationTaskId)
      mockGetRelocationEquipmentBalanceListSuccess(relocationTaskId)

      render(<EditRelocationTaskPage />)

      const button = testUtils.queryAddByExcelButton()
      expect(button).not.toBeInTheDocument()
    })

    test('Активна если условия соблюдены', async () => {
      jest.spyOn(reactRouterDom, 'useParams').mockReturnValue({ id: String(relocationTaskId) })

      mockGetUserListSuccess()
      mockGetRelocationTaskSuccess(relocationTaskId, { body: warehouseFixtures.relocationTask() })
      mockGetRelocationEquipmentListSuccess(relocationTaskId)
      mockGetRelocationEquipmentBalanceListSuccess(relocationTaskId)
      mockGetEquipmentCatalogListSuccess({ body: [] })
      mockGetCurrencyListSuccess({ body: [] })

      const locationTo = catalogsFixtures.locationListItem({ type: LocationTypeEnum.Warehouse })
      const locationFrom = catalogsFixtures.locationListItem()
      mockGetLocationListSuccess({ body: [locationTo, locationFrom], once: false })

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

      const button = testUtils.getAddByExcelButton()
      expect(button).toBeEnabled()
    })

    describe('Не активна если условия соблюдены', () => {
      test('Но не выбран объект выбытия и прибытия', async () => {
        jest.spyOn(reactRouterDom, 'useParams').mockReturnValue({ id: String(relocationTaskId) })

        mockGetUserListSuccess()
        mockGetRelocationTaskSuccess(relocationTaskId, { body: warehouseFixtures.relocationTask() })
        mockGetRelocationEquipmentListSuccess(relocationTaskId)
        mockGetRelocationEquipmentBalanceListSuccess(relocationTaskId)
        mockGetEquipmentCatalogListSuccess({ body: [] })
        mockGetCurrencyListSuccess({ body: [] })

        const locationTo = catalogsFixtures.locationListItem({ type: LocationTypeEnum.Warehouse })
        const locationFrom = catalogsFixtures.locationListItem()
        mockGetLocationListSuccess({ body: [locationTo, locationFrom], once: false })

        render(<EditRelocationTaskPage />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.EquipmentsCreate] }),
            },
          }),
        })

        const button = testUtils.getAddByExcelButton()
        expect(button).toBeDisabled()
      })

      test('Но не выбран объект прибытия, а объект выбытия выбран', async () => {
        jest.spyOn(reactRouterDom, 'useParams').mockReturnValue({ id: String(relocationTaskId) })

        mockGetUserListSuccess()
        mockGetRelocationTaskSuccess(relocationTaskId, { body: warehouseFixtures.relocationTask() })
        mockGetRelocationEquipmentListSuccess(relocationTaskId)
        mockGetRelocationEquipmentBalanceListSuccess(relocationTaskId)
        mockGetEquipmentCatalogListSuccess({ body: [] })
        mockGetCurrencyListSuccess({ body: [] })

        const locationTo = catalogsFixtures.locationListItem({ type: LocationTypeEnum.Warehouse })
        const locationFrom = catalogsFixtures.locationListItem()
        mockGetLocationListSuccess({ body: [locationTo, locationFrom], once: false })

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

        const button = testUtils.getAddByExcelButton()
        expect(button).toBeDisabled()
      })

      test('Но объект прибытия не склад', async () => {
        jest.spyOn(reactRouterDom, 'useParams').mockReturnValue({ id: String(relocationTaskId) })

        mockGetUserListSuccess()
        mockGetRelocationTaskSuccess(relocationTaskId, { body: warehouseFixtures.relocationTask() })
        mockGetRelocationEquipmentListSuccess(relocationTaskId)
        mockGetRelocationEquipmentBalanceListSuccess(relocationTaskId)
        mockGetEquipmentCatalogListSuccess({ body: [] })
        mockGetCurrencyListSuccess({ body: [] })

        const locationTo = catalogsFixtures.locationListItem()
        const locationFrom = catalogsFixtures.locationListItem()
        mockGetLocationListSuccess({ body: [locationTo, locationFrom], once: false })

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

        const button = testUtils.getAddByExcelButton()
        expect(button).toBeDisabled()
      })
    })

    test('При успешном запросе открывается модалка', async () => {
      jest.spyOn(reactRouterDom, 'useParams').mockReturnValue({ id: String(relocationTaskId) })

      mockGetUserListSuccess()
      mockGetRelocationTaskSuccess(relocationTaskId, { body: warehouseFixtures.relocationTask() })
      mockGetRelocationEquipmentListSuccess(relocationTaskId)
      mockGetRelocationEquipmentBalanceListSuccess(relocationTaskId)
      mockGetEquipmentCatalogListSuccess({ body: [] })
      mockGetCurrencyListSuccess({ body: [] })

      const locationTo = catalogsFixtures.locationListItem({ type: LocationTypeEnum.Warehouse })
      const locationFrom = catalogsFixtures.locationListItem()
      mockGetLocationListSuccess({ body: [locationTo, locationFrom], once: false })

      mockImportEquipmentsByFileSuccess({ body: [warehouseFixtures.importedEquipmentByFile()] })

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

      await testUtils.setExcelFile(user)
      await testUtils.expectAddByExcelLoadingFinished()
      const modal = await createEquipmentsByFileModalTestUtils.findContainer()

      expect(modal).toBeInTheDocument()
    })

    describe('При не успешном запросе', () => {
      test('Обрабатывается ошибка 400', async () => {
        jest.spyOn(reactRouterDom, 'useParams').mockReturnValue({ id: String(relocationTaskId) })

        mockGetUserListSuccess()
        mockGetRelocationTaskSuccess(relocationTaskId, { body: warehouseFixtures.relocationTask() })
        mockGetRelocationEquipmentListSuccess(relocationTaskId)
        mockGetRelocationEquipmentBalanceListSuccess(relocationTaskId)
        mockGetEquipmentCatalogListSuccess({ body: [] })
        mockGetCurrencyListSuccess({ body: [] })

        const locationTo = catalogsFixtures.locationListItem({ type: LocationTypeEnum.Warehouse })
        const locationFrom = catalogsFixtures.locationListItem()
        mockGetLocationListSuccess({ body: [locationTo, locationFrom], once: false })

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

        await testUtils.setExcelFile(user)
        await testUtils.expectAddByExcelLoadingFinished()

        const notification = await notificationTestUtils.findNotification(errorMsg)
        expect(notification).toBeInTheDocument()
      })

      test('Обрабатывается ошибка 500', async () => {
        jest.spyOn(reactRouterDom, 'useParams').mockReturnValue({ id: String(relocationTaskId) })

        mockGetUserListSuccess()
        mockGetRelocationTaskSuccess(relocationTaskId, { body: warehouseFixtures.relocationTask() })
        mockGetRelocationEquipmentListSuccess(relocationTaskId)
        mockGetRelocationEquipmentBalanceListSuccess(relocationTaskId)
        mockGetEquipmentCatalogListSuccess({ body: [] })
        mockGetCurrencyListSuccess({ body: [] })

        const locationTo = catalogsFixtures.locationListItem({ type: LocationTypeEnum.Warehouse })
        const locationFrom = catalogsFixtures.locationListItem()
        mockGetLocationListSuccess({ body: [locationTo, locationFrom], once: false })

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

        await testUtils.setExcelFile(user)
        await testUtils.expectAddByExcelLoadingFinished()

        const notification = await notificationTestUtils.findNotification(
          importEquipmentsByFileErrorMsg,
        )
        expect(notification).toBeInTheDocument()
      })
    })
  })
})
