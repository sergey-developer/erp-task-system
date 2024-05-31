import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import * as reactRouterDom from 'react-router-dom'

import { testUtils as inventorizationDetailsTestUtils } from 'modules/warehouse/components/InventorizationDetails/InventorizationDetails.test'
import {
  inventorizationStatusDict,
  inventorizationTypeDict,
} from 'modules/warehouse/constants/inventorization'
import { WarehouseRouteEnum } from 'modules/warehouse/constants/routes'
import {
  getExecuteInventorizationPageLocationState,
  mapInventorizationWarehousesTitles,
} from 'modules/warehouse/utils/inventorization'

import { formatDate } from 'shared/utils/date'

import { useLocationResult } from '_tests_/fixtures/useLocation'
import userFixtures from '_tests_/fixtures/user'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import {
  mockGetInventorizationEquipmentsSuccess,
  mockGetInventorizationsSuccess,
  mockGetInventorizationSuccess,
} from '_tests_/mocks/api'
import { getUserMeQueryMock } from '_tests_/mocks/state/user'
import {
  buttonTestUtils,
  getStoreWithAuth,
  render,
  renderInRoute_latest,
  setupApiTests,
} from '_tests_/utils'

import InventorizationsPage from '../InventorizationsPage'
import ExecuteInventorizationPage from './index'

const getContainer = () => screen.getByTestId('execute-inventorization-page')

const getReturnToInventorizationDetailsButton = () =>
  buttonTestUtils.getButtonIn(getContainer(), 'Вернуться в карточку')
const clickReturnToInventorizationDetailsButton = async (user: UserEvent) => {
  const button = getReturnToInventorizationDetailsButton()
  await user.click(button)
}

export const testUtils = {
  getContainer,

  getReturnToInventorizationDetailsButton,
  clickReturnToInventorizationDetailsButton,
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

    render(<ExecuteInventorizationPage />)

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

  describe('Кнопка возврата в карточку', () => {
    test('Отображается', () => {
      const inventorization = warehouseFixtures.inventorization()
      const inventorizationState = getExecuteInventorizationPageLocationState(inventorization)

      jest.spyOn(reactRouterDom, 'useParams').mockReturnValue({ id: String(inventorization.id) })

      jest
        .spyOn(reactRouterDom, 'useLocation')
        .mockReturnValue(useLocationResult({ state: inventorizationState }))

      mockGetInventorizationEquipmentsSuccess({ inventorizationId: inventorization.id })

      render(<ExecuteInventorizationPage />)

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
})
