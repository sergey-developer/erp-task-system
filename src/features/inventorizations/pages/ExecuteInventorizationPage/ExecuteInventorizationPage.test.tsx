import { within } from '@testing-library/react'
import {
  inventorizationStatusDict,
  inventorizationTypeDict,
} from 'features/inventorizations/constants'
import {
  makeExecuteInventorizationPageLocationState,
  mapInventorizationWarehousesTitles,
} from 'features/inventorizations/helpers'
import InventorizationsPage from 'features/inventorizations/pages/InventorizationsPage'
import { WarehousesRoutesEnum } from 'features/warehouses/routes/routes'
import * as reactRouterDom from 'react-router-dom'

import { DEFAULT_FILE_NAME } from 'shared/constants/common'
import { MimetypeEnum } from 'shared/constants/mimetype'
import * as base64Utils from 'shared/utils/common/base64'
import { formatDate } from 'shared/utils/date'
import * as downloadFileUtils from 'shared/utils/file/downloadFile'

import { inventorizationDetailsTestUtils } from '_tests_/features/warehouses/components/InventorizationDetails/testUtils'
import { executeInventorizationPageTestUtils } from '_tests_/features/warehouses/pages/ExecuteInventorizationPage/testUtils'
import { fakeUseLocationResult } from '_tests_/fixtures/useLocation'
import userFixtures from '_tests_/fixtures/users'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import {
  fakeWord,
  getStoreWithAuth,
  render,
  renderWithRouter,
  setupApiTests,
} from '_tests_/helpers'
import {
  mockCompleteInventorizationSuccess,
  mockGetCurrenciesSuccess,
  mockGetInventorizationEquipmentsSuccess,
  mockGetInventorizationReportSuccess,
  mockGetInventorizationsSuccess,
  mockGetInventorizationSuccess,
  mockGetLocationsCatalogSuccess,
} from '_tests_/mocks/api'
import { getUserMeQueryMock } from '_tests_/mocks/store/users'

import { ExecuteInventorizationPageTabsEnum } from './constants'
import ExecuteInventorizationPage from './index'

jest.mock('react-router-dom', () => ({
  __esModule: true,
  ...jest.requireActual('react-router-dom'),
}))

setupApiTests()

describe('Страница проведения инвентаризации', () => {
  test('Информации об инвентаризации отображается', () => {
    const inventorization = warehouseFixtures.inventorization()
    const inventorizationState = makeExecuteInventorizationPageLocationState(inventorization)

    jest.spyOn(reactRouterDom, 'useParams').mockReturnValue({ id: String(inventorization.id) })

    jest
      .spyOn(reactRouterDom, 'useLocation')
      .mockReturnValue(fakeUseLocationResult({ state: inventorizationState }))

    mockGetInventorizationEquipmentsSuccess({ inventorizationId: inventorization.id })
    mockGetLocationsCatalogSuccess()
    mockGetCurrenciesSuccess()
    const currentUser = userFixtures.userDetail()

    render(<ExecuteInventorizationPage />, {
      store: getStoreWithAuth(currentUser, undefined, undefined, {
        queries: { ...getUserMeQueryMock(currentUser) },
      }),
    })

    const container = executeInventorizationPageTestUtils.getContainer()

    const typeLabel = within(container).getByText('Тип:')
    const typeValue = within(container).getByText(inventorizationTypeDict[inventorization.type])

    const statusLabel = within(container).getByText('Статус:')
    const statusValue = within(container).getByText(
      inventorizationStatusDict[inventorization.status],
    )

    const deadlineAtLabel = within(container).getByText('Срок выполнения:')
    const deadlineAtValue = within(container).getByText(formatDate(inventorization.deadlineAt))

    const createdAtLabel = within(container).getByText('Создано:')
    const createdAtValue = within(container).getByText(formatDate(inventorization.createdAt))

    const executorLabel = within(container).getByText('Исполнитель:')
    const executorValue = within(container).getByText(inventorization.executor.fullName)

    const createdByLabel = within(container).getByText('Автор:')
    const createdByValue = within(container).getByText(inventorization.createdBy.fullName)

    const warehousesLabel = within(container).getByText('Склады:')
    const warehousesValue = within(container).getByText(
      mapInventorizationWarehousesTitles(inventorization.warehouses),
    )

    expect(typeLabel).toBeInTheDocument()
    expect(typeValue).toBeInTheDocument()

    expect(statusLabel).toBeInTheDocument()
    expect(statusValue).toBeInTheDocument()

    expect(deadlineAtLabel).toBeInTheDocument()
    expect(deadlineAtValue).toBeInTheDocument()

    expect(createdAtLabel).toBeInTheDocument()
    expect(createdAtValue).toBeInTheDocument()

    expect(executorLabel).toBeInTheDocument()
    expect(executorValue).toBeInTheDocument()

    expect(createdByLabel).toBeInTheDocument()
    expect(createdByValue).toBeInTheDocument()

    expect(warehousesLabel).toBeInTheDocument()
    expect(warehousesValue).toBeInTheDocument()
  })

  describe('Кнопка завершения инвентаризации', () => {
    test('Отображается и активна', () => {
      const inventorization = warehouseFixtures.inventorization()
      const inventorizationState = makeExecuteInventorizationPageLocationState(inventorization)

      jest.spyOn(reactRouterDom, 'useParams').mockReturnValue({ id: String(inventorization.id) })

      jest
        .spyOn(reactRouterDom, 'useLocation')
        .mockReturnValue(fakeUseLocationResult({ state: inventorizationState }))

      mockGetInventorizationEquipmentsSuccess({ inventorizationId: inventorization.id })
      mockGetLocationsCatalogSuccess()
      mockGetCurrenciesSuccess()
      const currentUser = userFixtures.userDetail()

      render(<ExecuteInventorizationPage />, {
        store: getStoreWithAuth(currentUser, undefined, undefined, {
          queries: { ...getUserMeQueryMock(currentUser) },
        }),
      })

      const button = executeInventorizationPageTestUtils.getCompleteInventorizationButton()
      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test.skip('По завершению возвращается на страницу списка инвентаризаций и открывает карточку инвентаризации', async () => {
      const inventorization = warehouseFixtures.inventorization()
      const inventorizationState = makeExecuteInventorizationPageLocationState(inventorization)

      jest.spyOn(reactRouterDom, 'useParams').mockReturnValue({ id: String(inventorization.id) })

      jest
        .spyOn(reactRouterDom, 'useLocation')
        .mockReturnValue(fakeUseLocationResult({ state: inventorizationState }))

      mockGetInventorizationSuccess({ inventorizationId: inventorization.id })
      mockGetInventorizationsSuccess()
      mockGetInventorizationEquipmentsSuccess({ inventorizationId: inventorization.id })
      mockGetLocationsCatalogSuccess({ body: [] })
      mockCompleteInventorizationSuccess({ inventorizationId: inventorization.id })
      mockGetCurrenciesSuccess()

      const { user } = renderWithRouter(
        [
          {
            path: WarehousesRoutesEnum.ExecuteInventorization,
            element: <ExecuteInventorizationPage />,
          },
          {
            path: WarehousesRoutesEnum.Inventorizations,
            element: <InventorizationsPage />,
          },
        ],
        { initialEntries: [WarehousesRoutesEnum.ExecuteInventorization], initialIndex: 0 },
        {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
          }),
        },
      )

      await executeInventorizationPageTestUtils.clickCompleteInventorizationButton(user)
      const details = await inventorizationDetailsTestUtils.findContainer()

      expect(details).toBeInTheDocument()
    })
  })

  describe('Кнопка возврата в карточку', () => {
    test('Отображается и активна', () => {
      const inventorization = warehouseFixtures.inventorization()
      const inventorizationState = makeExecuteInventorizationPageLocationState(inventorization)

      jest.spyOn(reactRouterDom, 'useParams').mockReturnValue({ id: String(inventorization.id) })

      jest
        .spyOn(reactRouterDom, 'useLocation')
        .mockReturnValue(fakeUseLocationResult({ state: inventorizationState }))

      mockGetInventorizationEquipmentsSuccess({ inventorizationId: inventorization.id })
      mockGetLocationsCatalogSuccess()
      mockGetCurrenciesSuccess()
      const currentUser = userFixtures.userDetail()

      render(<ExecuteInventorizationPage />, {
        store: getStoreWithAuth(currentUser, undefined, undefined, {
          queries: { ...getUserMeQueryMock(currentUser) },
        }),
      })

      const button = executeInventorizationPageTestUtils.getReturnToInventorizationDetailsButton()
      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('При клике возвращается на страницу списка инвентаризаций и открывает карточку инвентаризации', async () => {
      const inventorization = warehouseFixtures.inventorization()
      const inventorizationState = makeExecuteInventorizationPageLocationState(inventorization)

      jest.spyOn(reactRouterDom, 'useParams').mockReturnValue({ id: String(inventorization.id) })

      jest
        .spyOn(reactRouterDom, 'useLocation')
        .mockReturnValue(fakeUseLocationResult({ state: inventorizationState }))

      mockGetInventorizationSuccess({ inventorizationId: inventorization.id })
      mockGetInventorizationsSuccess()
      mockGetInventorizationEquipmentsSuccess({ inventorizationId: inventorization.id })
      mockGetLocationsCatalogSuccess({ body: [] })
      mockGetCurrenciesSuccess()

      const { user } = renderWithRouter(
        [
          {
            path: WarehousesRoutesEnum.ExecuteInventorization,
            element: <ExecuteInventorizationPage />,
          },
          {
            path: WarehousesRoutesEnum.Inventorizations,
            element: <InventorizationsPage />,
          },
        ],
        { initialEntries: [WarehousesRoutesEnum.ExecuteInventorization], initialIndex: 0 },
        {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
          }),
        },
      )

      await executeInventorizationPageTestUtils.clickReturnToInventorizationDetailsButton(user)
      const details = await inventorizationDetailsTestUtils.findContainer()

      expect(details).toBeInTheDocument()
    })
  })

  describe('Сформировать отчет', () => {
    test('При успешном запросе вызывается функция открытия окна скачивания', async () => {
      const downloadFileSpy = jest.spyOn(downloadFileUtils, 'downloadFile')

      const base64ToBytes = jest.spyOn(base64Utils, 'base64ToBytes')
      const fakeArrayBuffer = new Uint8Array()
      base64ToBytes.mockReturnValueOnce(fakeArrayBuffer)

      const inventorization = warehouseFixtures.inventorization()
      const inventorizationState = makeExecuteInventorizationPageLocationState(inventorization)

      jest.spyOn(reactRouterDom, 'useParams').mockReturnValue({ id: String(inventorization.id) })

      jest
        .spyOn(reactRouterDom, 'useLocation')
        .mockReturnValue(fakeUseLocationResult({ state: inventorizationState }))

      mockGetLocationsCatalogSuccess({ body: [] })
      mockGetCurrenciesSuccess()

      mockGetInventorizationEquipmentsSuccess({ inventorizationId: inventorization.id })
      const file = fakeWord()
      mockGetInventorizationReportSuccess({ inventorizationId: inventorization.id }, { body: file })
      const currentUser = userFixtures.userDetail()

      const { user } = render(<ExecuteInventorizationPage />, {
        store: getStoreWithAuth(currentUser, undefined, undefined, {
          queries: { ...getUserMeQueryMock(currentUser) },
        }),
      })

      await executeInventorizationPageTestUtils.clickMakeReportButton(user)
      await executeInventorizationPageTestUtils.expectMakeReportLoadingFinished()

      expect(base64ToBytes).toBeCalledTimes(1)
      expect(base64ToBytes).toBeCalledWith(file)

      expect(downloadFileSpy).toBeCalledTimes(1)
      expect(downloadFileSpy).toBeCalledWith(fakeArrayBuffer, MimetypeEnum.Xlsx, DEFAULT_FILE_NAME)
    })
  })

  test('Вкладка "Сверка" отображается по умолчанию', () => {
    const inventorization = warehouseFixtures.inventorization()
    const inventorizationState = makeExecuteInventorizationPageLocationState(inventorization)

    jest.spyOn(reactRouterDom, 'useParams').mockReturnValue({ id: String(inventorization.id) })

    jest
      .spyOn(reactRouterDom, 'useLocation')
      .mockReturnValue(fakeUseLocationResult({ state: inventorizationState }))

    mockGetInventorizationEquipmentsSuccess({ inventorizationId: inventorization.id })
    mockGetLocationsCatalogSuccess()
    mockGetCurrenciesSuccess()
    const currentUser = userFixtures.userDetail()

    render(<ExecuteInventorizationPage />, {
      store: getStoreWithAuth(currentUser, undefined, undefined, {
        queries: { ...getUserMeQueryMock(currentUser) },
      }),
    })

    const reviseTab = executeInventorizationPageTestUtils.getOpenedTab(
      ExecuteInventorizationPageTabsEnum.Revise,
    )
    expect(reviseTab).toBeInTheDocument()
  })

  test.skip('Все вкладки открываются', async () => {
    const inventorization = warehouseFixtures.inventorization()
    const inventorizationState = makeExecuteInventorizationPageLocationState(inventorization)

    jest.spyOn(reactRouterDom, 'useParams').mockReturnValue({ id: String(inventorization.id) })

    jest
      .spyOn(reactRouterDom, 'useLocation')
      .mockReturnValue(fakeUseLocationResult({ state: inventorizationState }))

    mockGetInventorizationEquipmentsSuccess(
      { inventorizationId: inventorization.id },
      { once: false },
    )
    mockGetLocationsCatalogSuccess()
    mockGetCurrenciesSuccess()
    const currentUser = userFixtures.userDetail()

    const { user } = render(<ExecuteInventorizationPage />, {
      store: getStoreWithAuth(currentUser, undefined, undefined, {
        queries: { ...getUserMeQueryMock(currentUser) },
      }),
    })

    await executeInventorizationPageTestUtils.clickTab(
      user,
      ExecuteInventorizationPageTabsEnum.Discrepancies,
    )
    const discrepanciesTab = executeInventorizationPageTestUtils.getOpenedTab(
      ExecuteInventorizationPageTabsEnum.Discrepancies,
    )
    expect(discrepanciesTab).toBeInTheDocument()

    await executeInventorizationPageTestUtils.clickTab(
      user,
      ExecuteInventorizationPageTabsEnum.Relocations,
    )
    const relocationsTab = executeInventorizationPageTestUtils.getOpenedTab(
      ExecuteInventorizationPageTabsEnum.Relocations,
    )
    expect(relocationsTab).toBeInTheDocument()
  })
})
