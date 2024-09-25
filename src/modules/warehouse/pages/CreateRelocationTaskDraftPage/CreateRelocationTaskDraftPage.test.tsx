import { within } from '@testing-library/react'
import * as reactRouterDom from 'react-router-dom'

import { CommonRouteEnum } from 'configs/routes'

import { WarehouseRouteEnum } from 'modules/warehouse/constants/routes'
import ExecuteInventorizationPage from 'modules/warehouse/pages/ExecuteInventorizationPage'
import { makeCreateRelocationTaskDraftPageLocationState } from 'modules/warehouse/utils/relocationTask'

import { makeString } from 'shared/utils/string'

import { relocationEquipmentDraftEditableTableTestUtils } from '_tests_/features/warehouse/components/RelocationEquipmentDraftEditableTable/testUtils'
import { relocationTaskDetailsTestUtils } from '_tests_/features/warehouse/components/RelocationTaskDetails/testUtils'
import { relocationTaskFormTestUtils } from '_tests_/features/warehouse/components/RelocationTaskForm/testUtils'
import { createRelocationTaskDraftPageTestUtils } from '_tests_/features/warehouse/pages/CreateRelocationTaskDraftPage/testUtils'
import { executeInventorizationPageTestUtils } from '_tests_/features/warehouse/pages/ExecuteInventorizationPage/testUtils'
import catalogsFixtures from '_tests_/fixtures/catalogs'
import commonFixtures from '_tests_/fixtures/common'
import { fakeUseLocationResult } from '_tests_/fixtures/useLocation'
import userFixtures from '_tests_/fixtures/user'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import {
  mockCreateRelocationTaskSuccess,
  mockGetCurrencyListSuccess,
  mockGetEquipmentCatalogListSuccess,
  mockGetInventorizationEquipmentsSuccess,
  mockGetInventorizationEquipmentSuccess,
  mockGetLocationsCatalogSuccess,
  mockGetRelocationEquipmentListSuccess,
  mockGetRelocationTaskSuccess,
  mockGetUsersGroupsSuccess,
  mockGetUsersSuccess,
} from '_tests_/mocks/api'
import { getUserMeQueryMock } from '_tests_/mocks/state/user'
import {
  getStoreWithAuth,
  notificationTestUtils,
  render,
  renderWithRouter,
  setupApiTests,
} from '_tests_/utils'

import CreateRelocationTaskDraftPage from './index'

jest.mock('react-router-dom', () => ({
  __esModule: true,
  ...jest.requireActual('react-router-dom'),
}))

setupApiTests()
notificationTestUtils.setupNotifications()

describe('Страница создания черновика заявки на перемещение', () => {
  describe('Форма', () => {
    test('Отображается', () => {
      const locationStateMock = makeCreateRelocationTaskDraftPageLocationState(
        warehouseFixtures.inventorization(),
      )

      jest
        .spyOn(reactRouterDom, 'useLocation')
        .mockReturnValue(fakeUseLocationResult({ state: locationStateMock }))

      mockGetUsersSuccess()
      mockGetLocationsCatalogSuccess({ once: false })
      mockGetEquipmentCatalogListSuccess()
      mockGetCurrencyListSuccess()
      mockGetUsersGroupsSuccess()
      mockGetInventorizationEquipmentsSuccess({
        inventorizationId: locationStateMock.inventorization.id,
      })

      render(<CreateRelocationTaskDraftPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      const form = relocationTaskFormTestUtils.getContainer()
      expect(form).toBeInTheDocument()
    })

    test('Контроллером нельзя выбрать исполнителя и текущего пользователя', async () => {
      const locationStateMock = makeCreateRelocationTaskDraftPageLocationState(
        warehouseFixtures.inventorization(),
      )

      jest
        .spyOn(reactRouterDom, 'useLocation')
        .mockReturnValue(fakeUseLocationResult({ state: locationStateMock }))

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
      mockGetUsersGroupsSuccess({ body: [] })
      mockGetInventorizationEquipmentsSuccess({
        inventorizationId: locationStateMock.inventorization.id,
      })

      const { user } = render(<CreateRelocationTaskDraftPage />, {
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
      const locationStateMock = makeCreateRelocationTaskDraftPageLocationState(
        warehouseFixtures.inventorization(),
      )

      jest
        .spyOn(reactRouterDom, 'useLocation')
        .mockReturnValue(fakeUseLocationResult({ state: locationStateMock }))

      const controllerUser = userFixtures.userListItem()
      const currentUser = userFixtures.userListItem()
      mockGetUsersSuccess({ body: [controllerUser, currentUser] })
      mockGetLocationsCatalogSuccess({ body: [], once: false })
      mockGetCurrencyListSuccess({ body: [] })
      mockGetEquipmentCatalogListSuccess({
        body: warehouseFixtures.equipmentsCatalog(),
        once: false,
      })
      mockGetUsersGroupsSuccess({ body: [] })
      mockGetInventorizationEquipmentsSuccess({
        inventorizationId: locationStateMock.inventorization.id,
      })

      const { user } = render(<CreateRelocationTaskDraftPage />, {
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
      const locationStateMock = makeCreateRelocationTaskDraftPageLocationState(
        warehouseFixtures.inventorization(),
      )

      jest
        .spyOn(reactRouterDom, 'useLocation')
        .mockReturnValue(fakeUseLocationResult({ state: locationStateMock }))

      mockGetUsersSuccess()
      mockGetLocationsCatalogSuccess({ once: false })
      mockGetEquipmentCatalogListSuccess()
      mockGetCurrencyListSuccess()
      mockGetUsersGroupsSuccess()
      mockGetInventorizationEquipmentsSuccess({
        inventorizationId: locationStateMock.inventorization.id,
      })

      render(<CreateRelocationTaskDraftPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      const title = within(createRelocationTaskDraftPageTestUtils.getContainer()).getByText(
        'Перечень оборудования',
      )
      const table = relocationEquipmentDraftEditableTableTestUtils.getContainer()

      expect(title).toBeInTheDocument()
      expect(table).toBeInTheDocument()
    })
  })

  test('При нажатии кнопки отмены возвращается на страницу выполнения инвентаризации во вкладку перемещений', async () => {
    const locationStateMock = makeCreateRelocationTaskDraftPageLocationState(
      warehouseFixtures.inventorization(),
    )

    jest
      .spyOn(reactRouterDom, 'useLocation')
      .mockReturnValue(fakeUseLocationResult({ state: locationStateMock }))

    jest
      .spyOn(reactRouterDom, 'useParams')
      .mockReturnValue({ id: String(locationStateMock.inventorization.id) })

    mockGetUsersSuccess()
    mockGetLocationsCatalogSuccess({ once: false })
    mockGetEquipmentCatalogListSuccess()
    mockGetCurrencyListSuccess()
    mockGetUsersGroupsSuccess()
    mockGetInventorizationEquipmentsSuccess({
      inventorizationId: locationStateMock.inventorization.id,
    })

    const { user } = renderWithRouter(
      [
        {
          path: CommonRouteEnum.Root,
          element: <CreateRelocationTaskDraftPage />,
        },
        {
          path: WarehouseRouteEnum.ExecuteInventorization,
          element: <ExecuteInventorizationPage />,
        },
      ],
      { initialEntries: [CommonRouteEnum.Root], initialIndex: 0 },
      {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      },
    )

    await createRelocationTaskDraftPageTestUtils.clickCancelButton(user)
    const page = executeInventorizationPageTestUtils.getContainer()
    expect(page).toBeInTheDocument()
  })

  test.skip('При успешном создании возвращается на страницу выполнения инвентаризации во вкладку перемещений и открывает карточку', async () => {
    const locationStateMock = makeCreateRelocationTaskDraftPageLocationState(
      warehouseFixtures.inventorization(),
    )

    jest
      .spyOn(reactRouterDom, 'useLocation')
      .mockReturnValue(fakeUseLocationResult({ state: locationStateMock }))

    jest
      .spyOn(reactRouterDom, 'useParams')
      .mockReturnValue({ id: String(locationStateMock.inventorization.id) })

    const controllerUser = userFixtures.userListItem()
    mockGetUsersSuccess({ body: [controllerUser] })

    const locationFrom = catalogsFixtures.locationCatalogListItem()
    mockGetLocationsCatalogSuccess({ body: [locationFrom], once: false })
    mockGetEquipmentCatalogListSuccess({ body: [] })
    mockGetCurrencyListSuccess({ body: [] })
    mockGetUsersGroupsSuccess({ body: [] })

    const inventorizationEquipmentListItem = warehouseFixtures.inventorizationEquipmentListItem()
    mockGetInventorizationEquipmentsSuccess(
      { inventorizationId: locationStateMock.inventorization.id },
      {
        body: commonFixtures.paginatedListResponse([inventorizationEquipmentListItem]),
        once: false,
      },
    )

    mockGetInventorizationEquipmentSuccess(
      {
        equipmentId: inventorizationEquipmentListItem.equipment.id,
      },
      { body: warehouseFixtures.inventorizationEquipment() },
    )

    const relocationTask = warehouseFixtures.relocationTask()
    mockCreateRelocationTaskSuccess({ body: relocationTask })

    mockGetRelocationTaskSuccess(relocationTask.id)
    mockGetRelocationEquipmentListSuccess(relocationTask.id)

    const { user } = renderWithRouter(
      [
        {
          path: CommonRouteEnum.Root,
          element: <CreateRelocationTaskDraftPage />,
        },
        {
          path: WarehouseRouteEnum.ExecuteInventorization,
          element: <ExecuteInventorizationPage />,
        },
      ],
      { initialEntries: [CommonRouteEnum.Root], initialIndex: 0 },
      {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      },
    )

    await relocationTaskFormTestUtils.expectControllersLoadingFinished()
    await relocationTaskFormTestUtils.openControllerSelect(user)
    await relocationTaskFormTestUtils.setController(user, controllerUser.fullName)
    await relocationTaskFormTestUtils.openRelocateFromSelect(user)
    await relocationTaskFormTestUtils.setRelocateFrom(user, locationFrom.title)

    await relocationEquipmentDraftEditableTableTestUtils.clickAddEquipmentButton(user)
    const row = relocationEquipmentDraftEditableTableTestUtils.getRowByRole()
    await relocationEquipmentDraftEditableTableTestUtils.expectEquipmentsLoadingFinished(row)
    await relocationEquipmentDraftEditableTableTestUtils.openEquipmentSelect(user, row)
    await relocationEquipmentDraftEditableTableTestUtils.setEquipment(
      user,
      makeString(
        ', ',
        inventorizationEquipmentListItem.equipment.title,
        inventorizationEquipmentListItem.equipment.serialNumber,
        inventorizationEquipmentListItem.equipment.inventoryNumber,
      ),
    )
    await createRelocationTaskDraftPageTestUtils.clickSubmitButton(user)

    const page = await executeInventorizationPageTestUtils.findContainer()
    expect(page).toBeInTheDocument()

    const details = await relocationTaskDetailsTestUtils.findContainer()
    expect(details).toBeInTheDocument()
  })
})
