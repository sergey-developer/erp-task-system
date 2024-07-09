import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import * as reactRouterDom from 'react-router-dom'

import { UserPermissionsEnum } from 'modules/user/constants'
import { testUtils as inventorizationDetailsTestUtils } from 'modules/warehouse/components/InventorizationDetails/InventorizationDetails.test'
import {
  inventorizationStatusDict,
  InventorizationStatusEnum,
  inventorizationTypeDict,
} from 'modules/warehouse/constants/inventorization'
import { WarehouseRouteEnum } from 'modules/warehouse/constants/routes'
import {
  getExecuteInventorizationPageLocationState,
  mapInventorizationWarehousesTitles,
} from 'modules/warehouse/utils/inventorization'

import { MimetypeEnum } from 'shared/constants/mimetype'
import * as base64Utils from 'shared/utils/common/base64'
import { formatDate } from 'shared/utils/date'
import * as downloadFileUtils from 'shared/utils/file/downloadFile'

import { useLocationResult } from '_tests_/fixtures/useLocation'
import userFixtures from '_tests_/fixtures/user'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import {
  mockCompleteInventorizationSuccess,
  mockGetInventorizationEquipmentsSuccess,
  mockGetInventorizationReportSuccess,
  mockGetInventorizationsSuccess,
  mockGetInventorizationSuccess,
  mockGetLocationListSuccess,
} from '_tests_/mocks/api'
import { getUserMeQueryMock } from '_tests_/mocks/state/user'
import {
  buttonTestUtils,
  fakeWord,
  getStoreWithAuth,
  render,
  renderInRoute_latest,
  setupApiTests,
} from '_tests_/utils'

import InventorizationsPage from '../InventorizationsPage'
import ExecuteInventorizationPage from './index'

const getContainer = () => screen.getByTestId('execute-inventorization-page')

// return to inventorization details
const getReturnToInventorizationDetailsButton = () =>
  buttonTestUtils.getButtonIn(getContainer(), 'Вернуться в карточку')

const clickReturnToInventorizationDetailsButton = async (user: UserEvent) => {
  const button = getReturnToInventorizationDetailsButton()
  await user.click(button)
}

// complete inventorization
const getCompleteInventorizationButton = () =>
  buttonTestUtils.getButtonIn(getContainer(), 'Завершить инвентаризацию')

const queryCompleteInventorizationButton = () =>
  buttonTestUtils.queryButtonIn(getContainer(), 'Завершить инвентаризацию')

const clickCompleteInventorizationButton = async (user: UserEvent) => {
  const button = getReturnToInventorizationDetailsButton()
  await user.click(button)
}

// make report button
const getMakeReportButton = () => buttonTestUtils.getButtonIn(getContainer(), /Сформировать отчет/)

const clickMakeReportButton = async (user: UserEvent) => {
  const button = getMakeReportButton()
  await user.click(button)
}

const expectMakeReportLoadingFinished = () =>
  buttonTestUtils.expectLoadingFinished(getMakeReportButton())

export const testUtils = {
  getContainer,

  getReturnToInventorizationDetailsButton,
  clickReturnToInventorizationDetailsButton,

  getCompleteInventorizationButton,
  queryCompleteInventorizationButton,
  clickCompleteInventorizationButton,

  getMakeReportButton,
  clickMakeReportButton,
  expectMakeReportLoadingFinished,
}

jest.mock('react-router-dom', () => ({
  __esModule: true,
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
  useLocation: jest.fn(),
}))

setupApiTests()

describe('Страница проведения инвентаризации', () => {
  test('Информации об инвентаризации отображается', () => {
    const inventorization = warehouseFixtures.inventorization()
    const inventorizationState = getExecuteInventorizationPageLocationState(inventorization)

    jest.spyOn(reactRouterDom, 'useParams').mockReturnValue({ id: String(inventorization.id) })

    jest
      .spyOn(reactRouterDom, 'useLocation')
      .mockReturnValue(useLocationResult({ state: inventorizationState }))

    mockGetInventorizationEquipmentsSuccess({ inventorizationId: inventorization.id })
    mockGetLocationListSuccess()

    render(<ExecuteInventorizationPage />, {
      store: getStoreWithAuth(undefined, undefined, undefined, {
        queries: { ...getUserMeQueryMock(userFixtures.user()) },
      }),
    })

    const container = testUtils.getContainer()

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
    test('Отображается и активна если условия соблюдены', () => {
      const inventorization = warehouseFixtures.inventorization({
        status: InventorizationStatusEnum.New,
      })
      const inventorizationState = getExecuteInventorizationPageLocationState(inventorization)

      jest.spyOn(reactRouterDom, 'useParams').mockReturnValue({ id: String(inventorization.id) })

      jest
        .spyOn(reactRouterDom, 'useLocation')
        .mockReturnValue(useLocationResult({ state: inventorizationState }))

      mockGetInventorizationEquipmentsSuccess({ inventorizationId: inventorization.id })
      mockGetLocationListSuccess()

      render(<ExecuteInventorizationPage />, {
        store: getStoreWithAuth(inventorizationState.executor, undefined, undefined, {
          queries: {
            ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.InventorizationUpdate] }),
          },
        }),
      })

      const button = testUtils.getCompleteInventorizationButton()
      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    describe('Не отображается если условия соблюдены', () => {
      test('Но нет прав', () => {
        const inventorization = warehouseFixtures.inventorization({
          status: InventorizationStatusEnum.New,
        })
        const inventorizationState = getExecuteInventorizationPageLocationState(inventorization)

        jest.spyOn(reactRouterDom, 'useParams').mockReturnValue({ id: String(inventorization.id) })

        jest
          .spyOn(reactRouterDom, 'useLocation')
          .mockReturnValue(useLocationResult({ state: inventorizationState }))

        mockGetLocationListSuccess()
        mockGetInventorizationEquipmentsSuccess({ inventorizationId: inventorization.id })

        render(<ExecuteInventorizationPage />, {
          store: getStoreWithAuth(inventorizationState.executor, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        })

        const button = testUtils.queryCompleteInventorizationButton()
        expect(button).not.toBeInTheDocument()
      })

      test('Но исполнитель не текущий пользователь', () => {
        const inventorization = warehouseFixtures.inventorization({
          status: InventorizationStatusEnum.New,
        })
        const inventorizationState = getExecuteInventorizationPageLocationState(inventorization)

        jest.spyOn(reactRouterDom, 'useParams').mockReturnValue({ id: String(inventorization.id) })

        jest
          .spyOn(reactRouterDom, 'useLocation')
          .mockReturnValue(useLocationResult({ state: inventorizationState }))

        mockGetLocationListSuccess()
        mockGetInventorizationEquipmentsSuccess({ inventorizationId: inventorization.id })

        render(<ExecuteInventorizationPage />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.InventorizationUpdate] }),
            },
          }),
        })

        const button = testUtils.queryCompleteInventorizationButton()
        expect(button).not.toBeInTheDocument()
      })

      test(`Но статус инвентаризации не ${InventorizationStatusEnum.New} или ${InventorizationStatusEnum.InProgress}`, () => {
        const inventorization = warehouseFixtures.inventorization({
          status: InventorizationStatusEnum.Closed,
        })
        const inventorizationState = getExecuteInventorizationPageLocationState(inventorization)

        jest.spyOn(reactRouterDom, 'useParams').mockReturnValue({ id: String(inventorization.id) })

        jest
          .spyOn(reactRouterDom, 'useLocation')
          .mockReturnValue(useLocationResult({ state: inventorizationState }))

        mockGetLocationListSuccess()
        mockGetInventorizationEquipmentsSuccess({ inventorizationId: inventorization.id })

        render(<ExecuteInventorizationPage />, {
          store: getStoreWithAuth(inventorizationState.executor, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.InventorizationUpdate] }),
            },
          }),
        })

        const button = testUtils.queryCompleteInventorizationButton()
        expect(button).not.toBeInTheDocument()
      })
    })

    test('При клике возвращается на страницу списка инвентаризаций и открывает карточку инвентаризации', async () => {
      const inventorization = warehouseFixtures.inventorization({
        status: InventorizationStatusEnum.New,
      })
      const inventorizationState = getExecuteInventorizationPageLocationState(inventorization)

      jest.spyOn(reactRouterDom, 'useParams').mockReturnValue({ id: String(inventorization.id) })

      jest
        .spyOn(reactRouterDom, 'useLocation')
        .mockReturnValue(useLocationResult({ state: inventorizationState }))

      mockGetInventorizationSuccess({ inventorizationId: inventorization.id })
      mockGetInventorizationsSuccess()
      mockGetInventorizationEquipmentsSuccess({ inventorizationId: inventorization.id })
      mockGetLocationListSuccess()
      mockCompleteInventorizationSuccess({ inventorizationId: inventorization.id })

      const { user } = renderInRoute_latest(
        [
          {
            path: WarehouseRouteEnum.ExecuteInventorization,
            element: <ExecuteInventorizationPage />,
          },
          {
            path: WarehouseRouteEnum.Inventorizations,
            element: <InventorizationsPage />,
          },
        ],
        { initialEntries: [WarehouseRouteEnum.ExecuteInventorization], initialIndex: 0 },
        {
          store: getStoreWithAuth(inventorizationState.executor, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.InventorizationUpdate] }),
            },
          }),
        },
      )

      await testUtils.clickCompleteInventorizationButton(user)
      const details = await inventorizationDetailsTestUtils.findContainer()

      expect(details).toBeInTheDocument()
    })
  })

  describe('Кнопка возврата в карточку', () => {
    test('Отображается', () => {
      const inventorization = warehouseFixtures.inventorization()
      const inventorizationState = getExecuteInventorizationPageLocationState(inventorization)

      jest.spyOn(reactRouterDom, 'useParams').mockReturnValue({ id: String(inventorization.id) })

      jest
        .spyOn(reactRouterDom, 'useLocation')
        .mockReturnValue(useLocationResult({ state: inventorizationState }))

      mockGetInventorizationEquipmentsSuccess({ inventorizationId: inventorization.id })
      mockGetLocationListSuccess()

      render(<ExecuteInventorizationPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      const button = testUtils.getReturnToInventorizationDetailsButton()
      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('При клике возвращается на страницу списка инвентаризаций и открывает карточку инвентаризации', async () => {
      const inventorization = warehouseFixtures.inventorization()
      const inventorizationState = getExecuteInventorizationPageLocationState(inventorization)

      jest.spyOn(reactRouterDom, 'useParams').mockReturnValue({ id: String(inventorization.id) })

      jest
        .spyOn(reactRouterDom, 'useLocation')
        .mockReturnValue(useLocationResult({ state: inventorizationState }))

      mockGetInventorizationSuccess({ inventorizationId: inventorization.id })
      mockGetInventorizationsSuccess()
      mockGetInventorizationEquipmentsSuccess({ inventorizationId: inventorization.id })
      mockGetLocationListSuccess()

      const { user } = renderInRoute_latest(
        [
          {
            path: WarehouseRouteEnum.ExecuteInventorization,
            element: <ExecuteInventorizationPage />,
          },
          {
            path: WarehouseRouteEnum.Inventorizations,
            element: <InventorizationsPage />,
          },
        ],
        { initialEntries: [WarehouseRouteEnum.ExecuteInventorization], initialIndex: 0 },
        {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        },
      )

      await testUtils.clickReturnToInventorizationDetailsButton(user)
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
      const inventorizationState = getExecuteInventorizationPageLocationState(inventorization)

      jest.spyOn(reactRouterDom, 'useParams').mockReturnValue({ id: String(inventorization.id) })

      jest
        .spyOn(reactRouterDom, 'useLocation')
        .mockReturnValue(useLocationResult({ state: inventorizationState }))

      mockGetLocationListSuccess({ body: [] })

      mockGetInventorizationEquipmentsSuccess({ inventorizationId: inventorization.id })
      const file = fakeWord()
      mockGetInventorizationReportSuccess({ inventorizationId: inventorization.id }, { body: file })

      const { user } = render(<ExecuteInventorizationPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      await testUtils.clickMakeReportButton(user)
      await testUtils.expectMakeReportLoadingFinished()

      expect(base64ToBytes).toBeCalledTimes(1)
      expect(base64ToBytes).toBeCalledWith(file)

      expect(downloadFileSpy).toBeCalledTimes(1)
      expect(downloadFileSpy).toBeCalledWith(fakeArrayBuffer, MimetypeEnum.Xlsx, 'filename')
    })
  })

  test.todo('Отображается верная вкладка по умолчанию')
  test.todo('Вкладка расхождения открывается')
})
