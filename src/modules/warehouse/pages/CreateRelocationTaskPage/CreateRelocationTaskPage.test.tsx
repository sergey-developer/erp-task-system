import { screen, waitFor, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { testUtils as relocationEquipmentEditableTableTestUtils } from 'modules/warehouse/components/RelocationEquipmentEditableTable/RelocationEquipmentEditableTable.test'
import { testUtils as relocationTaskFormTestUtils } from 'modules/warehouse/components/RelocationTaskForm/RelocationTaskForm.test'
import { getEquipmentListTemplateErrorMsg } from 'modules/warehouse/constants/equipment'

import { LocationTypeEnum } from 'shared/constants/catalogs'
import { CANCEL_TEXT } from 'shared/constants/common'
import { MimetypeEnum } from 'shared/constants/mimetype'
import * as base64Utils from 'shared/utils/common/base64'
import * as downloadLinkUtils from 'shared/utils/common/downloadLink'

import catalogsFixtures from '_tests_/fixtures/catalogs'
import {
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
const getAddByExcelButton = () => buttonTestUtils.getButtonIn(getContainer(), /Добавить из Excel/)

const queryAddByExcelButton = () =>
  buttonTestUtils.queryButtonIn(getContainer(), /Добавить из Excel/)

const clickAddByExcelButton = async (user: UserEvent) => {
  const button = getAddByExcelButton()
  await user.click(button)
}

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
  clickAddByExcelButton,

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
      mockGetLocationListSuccess({ once: false })
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
      mockGetLocationListSuccess({ once: false })
      mockGetEquipmentCatalogListSuccess()
      mockGetCurrencyListSuccess()

      render(<CreateRelocationTaskPage />)

      const title = within(getContainer()).getByText('Перечень оборудования')
      const table = relocationEquipmentEditableTableTestUtils.getContainer()

      expect(title).toBeInTheDocument()
      expect(table).toBeInTheDocument()
    })

    describe('Кнопка скачивания шаблона', () => {
      test('Отображается если есть права', () => {
        mockGetUserListSuccess()
        mockGetLocationListSuccess({ once: false })
        mockGetEquipmentCatalogListSuccess()
        mockGetCurrencyListSuccess()

        render(<CreateRelocationTaskPage />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock({ permissions: ['EQUIPMENTS_CREATE'] }),
            },
          }),
        })

        const button = testUtils.getDownloadTemplateButton()

        expect(button).toBeInTheDocument()
        expect(button).toBeEnabled()
      })

      test('Не отображается если нет прав', () => {
        mockGetUserListSuccess()
        mockGetLocationListSuccess({ once: false })
        mockGetEquipmentCatalogListSuccess()
        mockGetCurrencyListSuccess()

        render(<CreateRelocationTaskPage />)

        const button = testUtils.queryDownloadTemplateButton()
        expect(button).not.toBeInTheDocument()
      })

      test('При успешном запросе отрабатывает функционал скачивания', async () => {
        mockGetUserListSuccess()
        mockGetLocationListSuccess({ body: [], once: false })
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
            queries: {
              ...getUserMeQueryMock({ permissions: ['EQUIPMENTS_CREATE'] }),
            },
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
        mockGetLocationListSuccess({ body: [], once: false })
        mockGetEquipmentCatalogListSuccess()
        mockGetCurrencyListSuccess({ body: [] })
        mockGetEquipmentListTemplateServerError()

        const { user } = render(<CreateRelocationTaskPage />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock({ permissions: ['EQUIPMENTS_CREATE'] }),
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
        mockGetUserListSuccess()
        mockGetLocationListSuccess()
        mockGetEquipmentCatalogListSuccess()
        mockGetCurrencyListSuccess()

        render(<CreateRelocationTaskPage />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock({ permissions: ['EQUIPMENTS_CREATE'] }),
            },
          }),
        })

        const button = testUtils.getAddByExcelButton()
        expect(button).toBeInTheDocument()
      })

      test('Не отображается если нет прав', () => {
        mockGetUserListSuccess()
        mockGetLocationListSuccess()
        mockGetEquipmentCatalogListSuccess()
        mockGetCurrencyListSuccess()

        render(<CreateRelocationTaskPage />)

        const button = testUtils.queryAddByExcelButton()
        expect(button).not.toBeInTheDocument()
      })

      test.skip('Активна если условия соблюдены', async () => {
        mockGetUserListSuccess()

        const locationTo = catalogsFixtures.locationListItem({ type: LocationTypeEnum.Warehouse })
        const locationFrom = catalogsFixtures.locationListItem()
        mockGetLocationListSuccess({ body: [locationTo, locationFrom], once: false })

        mockGetEquipmentCatalogListSuccess()
        mockGetCurrencyListSuccess({ body: [] })

        const { user } = render(<CreateRelocationTaskPage />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock({ permissions: ['EQUIPMENTS_CREATE'] }) },
          }),
        })

        await relocationTaskFormTestUtils.expectRelocateToLoadingFinished()
        await relocationTaskFormTestUtils.openRelocateToSelect(user)
        await relocationTaskFormTestUtils.setRelocateTo(user, locationTo.title)

        await relocationTaskFormTestUtils.expectRelocateFromLoadingFinished()
        await relocationTaskFormTestUtils.openRelocateFromSelect(user)
        await relocationTaskFormTestUtils.setRelocateFrom(user, locationFrom.title)

        const button = testUtils.getAddByExcelButton()
        await waitFor(() => expect(button).toBeEnabled())
      })

      describe('Не активна если условия соблюдены', () => {
        test.skip('Но не выбран объект выбытия', async () => {
          mockGetUserListSuccess()

          const locationTo = catalogsFixtures.locationListItem({ type: LocationTypeEnum.Warehouse })
          const locationFrom = catalogsFixtures.locationListItem()
          mockGetLocationListSuccess({ body: [locationTo, locationFrom], once: false })

          mockGetEquipmentCatalogListSuccess()
          mockGetCurrencyListSuccess({ body: [] })

          const { user } = render(<CreateRelocationTaskPage />, {
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: { ...getUserMeQueryMock({ permissions: ['EQUIPMENTS_CREATE'] }) },
            }),
          })

          await relocationTaskFormTestUtils.expectRelocateToLoadingFinished()
          await relocationTaskFormTestUtils.openRelocateToSelect(user)
          await relocationTaskFormTestUtils.setRelocateTo(user, locationTo.title)

          await relocationTaskFormTestUtils.expectRelocateFromLoadingFinished()
          await relocationTaskFormTestUtils.openRelocateFromSelect(user)
          await relocationTaskFormTestUtils.setRelocateFrom(user, locationFrom.title)

          const button = testUtils.getAddByExcelButton()
          await waitFor(() => expect(button).toBeEnabled())
        })

        test.skip('Но не выбран объект прибытия', async () => {
          mockGetUserListSuccess()

          const locationTo = catalogsFixtures.locationListItem({ type: LocationTypeEnum.Warehouse })
          const locationFrom = catalogsFixtures.locationListItem()
          mockGetLocationListSuccess({ body: [locationTo, locationFrom], once: false })

          mockGetEquipmentCatalogListSuccess()
          mockGetCurrencyListSuccess({ body: [] })

          const { user } = render(<CreateRelocationTaskPage />, {
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: { ...getUserMeQueryMock({ permissions: ['EQUIPMENTS_CREATE'] }) },
            }),
          })

          await relocationTaskFormTestUtils.expectRelocateToLoadingFinished()
          await relocationTaskFormTestUtils.openRelocateToSelect(user)
          await relocationTaskFormTestUtils.setRelocateTo(user, locationTo.title)

          await relocationTaskFormTestUtils.expectRelocateFromLoadingFinished()
          await relocationTaskFormTestUtils.openRelocateFromSelect(user)
          await relocationTaskFormTestUtils.setRelocateFrom(user, locationFrom.title)

          const button = testUtils.getAddByExcelButton()
          await waitFor(() => expect(button).toBeEnabled())
        })

        test.skip('Но объект прибытия не склад', async () => {
          mockGetUserListSuccess()

          const locationTo = catalogsFixtures.locationListItem({ type: LocationTypeEnum.Warehouse })
          const locationFrom = catalogsFixtures.locationListItem()
          mockGetLocationListSuccess({ body: [locationTo, locationFrom], once: false })

          mockGetEquipmentCatalogListSuccess()
          mockGetCurrencyListSuccess({ body: [] })

          const { user } = render(<CreateRelocationTaskPage />, {
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: { ...getUserMeQueryMock({ permissions: ['EQUIPMENTS_CREATE'] }) },
            }),
          })

          await relocationTaskFormTestUtils.expectRelocateToLoadingFinished()
          await relocationTaskFormTestUtils.openRelocateToSelect(user)
          await relocationTaskFormTestUtils.setRelocateTo(user, locationTo.title)

          await relocationTaskFormTestUtils.expectRelocateFromLoadingFinished()
          await relocationTaskFormTestUtils.openRelocateFromSelect(user)
          await relocationTaskFormTestUtils.setRelocateFrom(user, locationFrom.title)

          const button = testUtils.getAddByExcelButton()
          await waitFor(() => expect(button).toBeEnabled())
        })
      })
    })
  })
})
