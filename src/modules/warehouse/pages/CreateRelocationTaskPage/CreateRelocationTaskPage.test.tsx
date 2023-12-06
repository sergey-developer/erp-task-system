import { screen, waitFor, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { testUtils as createEquipmentsByFileModalTestUtils } from 'modules/warehouse/components/CreateEquipmentsByFileModal/CreateEquipmentsByFileModal.test'
import { testUtils as relocationEquipmentEditableTableTestUtils } from 'modules/warehouse/components/RelocationEquipmentEditableTable/RelocationEquipmentEditableTable.test'
import { testUtils as relocationTaskFormTestUtils } from 'modules/warehouse/components/RelocationTaskForm/RelocationTaskForm.test'
import {
  createEquipmentsByFileErrorMsg,
  getEquipmentListTemplateErrorMsg,
} from 'modules/warehouse/constants/equipment'

import { LocationTypeEnum } from 'shared/constants/catalogs'
import { CANCEL_TEXT } from 'shared/constants/common'
import { MimetypeEnum } from 'shared/constants/mimetype'
import * as base64Utils from 'shared/utils/common/base64'
import * as downloadLinkUtils from 'shared/utils/common/downloadLink'

import catalogsFixtures from '_tests_/fixtures/catalogs'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import {
  mockCreateEquipmentsByFileBadRequestError,
  mockCreateEquipmentsByFileServerError,
  mockCreateEquipmentsByFileSuccess,
  mockGetCurrencyListSuccess,
  mockGetEquipmentCatalogListSuccess,
  mockGetEquipmentListTemplateServerError,
  mockGetEquipmentListTemplateSuccess,
  mockGetLocationListSuccess,
  mockGetUserListSuccess,
} from '_tests_/mocks/api'
import { getUserMeQueryMock } from '_tests_/mocks/state/user'
import {
  buttonTestUtils,
  fakeWord,
  getStoreWithAuth,
  notificationTestUtils,
  render,
  setupApiTests,
} from '_tests_/utils'

import CreateRelocationTaskPage from './index'

const getContainer = () => screen.getByTestId('create-relocation-task-page')

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

setupApiTests()

describe('Страница создания заявки на перемещение', () => {
  describe('Форма', () => {
    test('Отображается', () => {
      mockGetUserListSuccess()
      mockGetLocationListSuccess()
      mockGetEquipmentCatalogListSuccess()
      mockGetCurrencyListSuccess()

      render(<CreateRelocationTaskPage />)

      const form = relocationTaskFormTestUtils.getContainer()
      expect(form).toBeInTheDocument()
    })
  })

  describe('Перечень оборудования', () => {
    test('Отображается', () => {
      mockGetUserListSuccess()
      mockGetLocationListSuccess()
      mockGetEquipmentCatalogListSuccess()
      mockGetCurrencyListSuccess()

      render(<CreateRelocationTaskPage />)

      const title = within(getContainer()).getByText('Перечень оборудования')
      const table = relocationEquipmentEditableTableTestUtils.getContainer()

      expect(title).toBeInTheDocument()
      expect(table).toBeInTheDocument()
    })
  })

  describe('Кнопка скачивания шаблона', () => {
    test('Отображается если есть права', () => {
      mockGetUserListSuccess()
      mockGetLocationListSuccess()
      mockGetEquipmentCatalogListSuccess()
      mockGetCurrencyListSuccess()

      render(<CreateRelocationTaskPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock({ permissions: ['EQUIPMENTS_CREATE'] }) },
        }),
      })

      const button = testUtils.getDownloadTemplateButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Не отображается если нет прав', () => {
      mockGetUserListSuccess()
      mockGetLocationListSuccess()
      mockGetEquipmentCatalogListSuccess()
      mockGetCurrencyListSuccess()

      render(<CreateRelocationTaskPage />)

      const button = testUtils.queryDownloadTemplateButton()
      expect(button).not.toBeInTheDocument()
    })

    test('При успешном запросе отрабатывает функционал скачивания', async () => {
      mockGetUserListSuccess()
      mockGetLocationListSuccess({ body: [] })
      mockGetEquipmentCatalogListSuccess()
      mockGetCurrencyListSuccess({ body: [] })

      const file = fakeWord()
      mockGetEquipmentListTemplateSuccess({ body: file })

      const clickDownloadLinkSpy = jest.spyOn(downloadLinkUtils, 'clickDownloadLink')

      const base64ToArrayBufferSpy = jest.spyOn(base64Utils, 'base64ToArrayBuffer')
      const arrayBuffer = new Uint8Array()
      base64ToArrayBufferSpy.mockReturnValueOnce(arrayBuffer)

      const { user } = render(<CreateRelocationTaskPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock({ permissions: ['EQUIPMENTS_CREATE'] }) },
        }),
      })

      await testUtils.clickDownloadTemplateButton(user)

      await waitFor(() => expect(base64ToArrayBufferSpy).toBeCalledTimes(1))
      expect(base64ToArrayBufferSpy).toBeCalledWith(file)

      expect(clickDownloadLinkSpy).toBeCalledTimes(1)
      expect(clickDownloadLinkSpy).toBeCalledWith(
        arrayBuffer,
        MimetypeEnum.Xls,
        'Шаблон загрузки оборудования',
      )
    })

    test('При не успешном запросе отображается сообщение об ошибке', async () => {
      mockGetUserListSuccess()
      mockGetLocationListSuccess({ body: [] })
      mockGetEquipmentCatalogListSuccess()
      mockGetCurrencyListSuccess({ body: [] })
      mockGetEquipmentListTemplateServerError()

      const { user } = render(<CreateRelocationTaskPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock({ permissions: ['EQUIPMENTS_CREATE'] }) },
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
      mockGetUserListSuccess()
      mockGetLocationListSuccess({ once: false })
      mockGetEquipmentCatalogListSuccess()
      mockGetCurrencyListSuccess()

      render(<CreateRelocationTaskPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock({ permissions: ['EQUIPMENTS_CREATE'] }) },
        }),
      })

      const button = testUtils.getAddByExcelButton()
      expect(button).toBeInTheDocument()
    })

    test('Не отображается если нет прав', () => {
      mockGetUserListSuccess()
      mockGetLocationListSuccess({ once: false })
      mockGetEquipmentCatalogListSuccess()
      mockGetCurrencyListSuccess()

      render(<CreateRelocationTaskPage />)

      const button = testUtils.queryAddByExcelButton()
      expect(button).not.toBeInTheDocument()
    })

    test('Активна если условия соблюдены', async () => {
      mockGetUserListSuccess()

      const locationTo = catalogsFixtures.locationListItem({ type: LocationTypeEnum.Warehouse })
      const locationFrom = catalogsFixtures.locationListItem()
      mockGetLocationListSuccess({ body: [locationTo, locationFrom], once: false })

      mockGetEquipmentCatalogListSuccess({ body: [] })
      mockGetCurrencyListSuccess({ body: [] })

      const { user } = render(<CreateRelocationTaskPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock({ permissions: ['EQUIPMENTS_CREATE'] }) },
        }),
      })

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
        mockGetUserListSuccess()

        const locationTo = catalogsFixtures.locationListItem({ type: LocationTypeEnum.Warehouse })
        const locationFrom = catalogsFixtures.locationListItem()
        mockGetLocationListSuccess({ body: [locationTo, locationFrom], once: false })

        mockGetEquipmentCatalogListSuccess({ body: [] })
        mockGetCurrencyListSuccess({ body: [] })

        render(<CreateRelocationTaskPage />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock({ permissions: ['EQUIPMENTS_CREATE'] }) },
          }),
        })

        const button = testUtils.getAddByExcelButton()
        expect(button).toBeDisabled()
      })

      test('Но не выбран объект прибытия, а объект выбытия выбран', async () => {
        mockGetUserListSuccess()

        const locationTo = catalogsFixtures.locationListItem({ type: LocationTypeEnum.Warehouse })
        const locationFrom = catalogsFixtures.locationListItem()
        mockGetLocationListSuccess({ body: [locationTo, locationFrom], once: false })

        mockGetEquipmentCatalogListSuccess({ body: [] })
        mockGetCurrencyListSuccess({ body: [] })

        const { user } = render(<CreateRelocationTaskPage />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock({ permissions: ['EQUIPMENTS_CREATE'] }) },
          }),
        })

        await relocationTaskFormTestUtils.expectRelocateFromLoadingFinished()
        await relocationTaskFormTestUtils.openRelocateFromSelect(user)
        await relocationTaskFormTestUtils.setRelocateFrom(user, locationFrom.title)

        const button = testUtils.getAddByExcelButton()
        expect(button).toBeDisabled()
      })

      test('Но объект прибытия не склад', async () => {
        mockGetUserListSuccess()

        const locationTo = catalogsFixtures.locationListItem()
        const locationFrom = catalogsFixtures.locationListItem()
        mockGetLocationListSuccess({ body: [locationTo, locationFrom], once: false })

        mockGetEquipmentCatalogListSuccess({ body: [] })
        mockGetCurrencyListSuccess({ body: [] })

        const { user } = render(<CreateRelocationTaskPage />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock({ permissions: ['EQUIPMENTS_CREATE'] }) },
          }),
        })

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
      mockGetUserListSuccess()

      const locationTo = catalogsFixtures.locationListItem({ type: LocationTypeEnum.Warehouse })
      const locationFrom = catalogsFixtures.locationListItem()
      mockGetLocationListSuccess({ body: [locationTo, locationFrom], once: false })

      mockGetEquipmentCatalogListSuccess({ body: [] })
      mockGetCurrencyListSuccess({ body: [] })
      mockCreateEquipmentsByFileSuccess({ body: [warehouseFixtures.equipmentByFile()] })

      const { user } = render(<CreateRelocationTaskPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock({ permissions: ['EQUIPMENTS_CREATE'] }) },
        }),
      })

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
        mockGetUserListSuccess()

        const locationTo = catalogsFixtures.locationListItem({ type: LocationTypeEnum.Warehouse })
        const locationFrom = catalogsFixtures.locationListItem()
        mockGetLocationListSuccess({ body: [locationTo, locationFrom], once: false })

        mockGetEquipmentCatalogListSuccess({ body: [] })
        mockGetCurrencyListSuccess({ body: [] })

        const errorMsg = fakeWord()
        mockCreateEquipmentsByFileBadRequestError({ body: { detail: errorMsg } })

        const { user } = render(<CreateRelocationTaskPage />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock({ permissions: ['EQUIPMENTS_CREATE'] }) },
          }),
        })

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
        mockGetUserListSuccess()

        const locationTo = catalogsFixtures.locationListItem({ type: LocationTypeEnum.Warehouse })
        const locationFrom = catalogsFixtures.locationListItem()
        mockGetLocationListSuccess({ body: [locationTo, locationFrom], once: false })

        mockGetEquipmentCatalogListSuccess({ body: [] })
        mockGetCurrencyListSuccess({ body: [] })
        mockCreateEquipmentsByFileServerError()

        const { user } = render(<CreateRelocationTaskPage />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock({ permissions: ['EQUIPMENTS_CREATE'] }) },
          }),
        })

        await relocationTaskFormTestUtils.expectRelocateFromLoadingFinished()
        await relocationTaskFormTestUtils.openRelocateFromSelect(user)
        await relocationTaskFormTestUtils.setRelocateFrom(user, locationFrom.title)

        await relocationTaskFormTestUtils.expectRelocateToLoadingFinished()
        await relocationTaskFormTestUtils.openRelocateToSelect(user)
        await relocationTaskFormTestUtils.setRelocateTo(user, locationTo.title)

        await testUtils.setExcelFile(user)
        await testUtils.expectAddByExcelLoadingFinished()

        const notification = await notificationTestUtils.findNotification(
          createEquipmentsByFileErrorMsg,
        )
        expect(notification).toBeInTheDocument()
      })
    })
  })
})
