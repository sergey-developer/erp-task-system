import { screen, waitFor, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import * as reactRouterDom from 'react-router-dom'

import { testUtils as relocationEquipmentEditableTableTestUtils } from 'modules/warehouse/components/RelocationEquipmentEditableTable/RelocationEquipmentEditableTable.test'
import { testUtils as relocationTaskFormTestUtils } from 'modules/warehouse/components/RelocationTaskForm/RelocationTaskForm.test'
import { getEquipmentListTemplateErrorMsg } from 'modules/warehouse/constants/equipment'

import { CANCEL_TEXT } from 'shared/constants/common'
import { MimetypeEnum } from 'shared/constants/mimetype'
import * as base64Utils from 'shared/utils/common/base64'
import * as downloadLinkUtils from 'shared/utils/common/downloadLink'

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
              ...getUserMeQueryMock({ permissions: ['EQUIPMENTS_CREATE'] }),
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

        const clickDownloadLinkSpy = jest.spyOn(downloadLinkUtils, 'clickDownloadLink')

        const base64ToArrayBufferSpy = jest.spyOn(base64Utils, 'base64ToArrayBuffer')
        const arrayBuffer = new Uint8Array()
        base64ToArrayBufferSpy.mockReturnValueOnce(arrayBuffer)

        const { user } = render(<EditRelocationTaskPage />, {
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
              ...getUserMeQueryMock({ permissions: ['EQUIPMENTS_CREATE'] }),
            },
          }),
        })

        const button = testUtils.getAddByExcelButton()

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

        const button = testUtils.queryAddByExcelButton()
        expect(button).not.toBeInTheDocument()
      })
    })
  })
})
