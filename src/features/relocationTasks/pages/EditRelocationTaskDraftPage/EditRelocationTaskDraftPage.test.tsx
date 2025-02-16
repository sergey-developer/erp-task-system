import { within } from '@testing-library/react'
import ExecuteInventorizationPage from 'features/inventorizations/pages/ExecuteInventorizationPage'
import { makeCreateRelocationTaskDraftPageLocationState } from 'features/relocationTasks/helpers'
import { WarehousesRoutesEnum } from 'features/warehouses/routes/routes'
import * as reactRouterDom from 'react-router-dom'

import { CommonRoutesEnum } from 'configs/routes'

import { makeString } from 'shared/utils/string'

import { relocationEquipmentDraftEditableTableTestUtils } from '_tests_/features/warehouses/components/RelocationEquipmentDraftEditableTable/testUtils'
import { relocationTaskDetailsTestUtils } from '_tests_/features/warehouses/components/RelocationTaskDetails/testUtils'
import { relocationTaskFormTestUtils } from '_tests_/features/warehouses/components/RelocationTaskForm/testUtils'
import { editRelocationTaskDraftPageTestUtils as testUtils } from '_tests_/features/warehouses/pages/EditRelocationTaskDraftPage/testUtils'
import { executeInventorizationPageTestUtils } from '_tests_/features/warehouses/pages/ExecuteInventorizationPage/testUtils'
import catalogsFixtures from '_tests_/fixtures/catalogs'
import commonFixtures from '_tests_/fixtures/common'
import { fakeUseLocationResult } from '_tests_/fixtures/useLocation'
import userFixtures from '_tests_/fixtures/users'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import {
  getStoreWithAuth,
  notificationTestUtils,
  render,
  renderWithRouter,
  setupApiTests,
} from '_tests_/helpers'
import {
  mockCreateRelocationTaskSuccess,
  mockGetCurrenciesSuccess,
  mockGetEquipmentsCatalogSuccess,
  mockGetInventorizationEquipmentsSuccess,
  mockGetInventorizationEquipmentSuccess,
  mockGetLocationsCatalogSuccess,
  mockGetRelocationEquipmentsSuccess,
  mockGetRelocationTaskSuccess,
  mockGetUsersGroupsSuccess,
  mockGetUsersSuccess,
} from '_tests_/mocks/api'
import { getUserMeQueryMock } from '_tests_/mocks/store/users'

import EditRelocationTaskDraftPage from './index'

jest.mock('react-router-dom', () => ({
  __esModule: true,
  ...jest.requireActual('react-router-dom'),
}))

setupApiTests()
notificationTestUtils.setupNotifications()

describe('Страница создания черновика заявки на перемещение', () => {
  describe('Форма', () => {
    test('Отображается', () => {
      const locationStateMock = makeCreateRelocationTaskDraftPageLocationState({
        inventorization: warehouseFixtures.inventorization(),
      })

      jest
        .spyOn(reactRouterDom, 'useLocation')
        .mockReturnValue(fakeUseLocationResult({ state: locationStateMock }))

      mockGetUsersSuccess()
      mockGetLocationsCatalogSuccess({ once: false })
      mockGetEquipmentsCatalogSuccess()
      mockGetCurrenciesSuccess()
      mockGetUsersGroupsSuccess()
      mockGetInventorizationEquipmentsSuccess({
        inventorizationId: locationStateMock.inventorization.id,
      })

      render(<EditRelocationTaskDraftPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
        }),
      })

      const form = relocationTaskFormTestUtils.getContainer()
      expect(form).toBeInTheDocument()
    })

    test('Контроллером нельзя выбрать текущего пользователя', async () => {
      const locationStateMock = makeCreateRelocationTaskDraftPageLocationState({
        inventorization: warehouseFixtures.inventorization(),
      })

      jest
        .spyOn(reactRouterDom, 'useLocation')
        .mockReturnValue(fakeUseLocationResult({ state: locationStateMock }))

      const executorUser = userFixtures.user()
      const currentUser = userFixtures.userDetail()
      const otherUser = userFixtures.user()
      mockGetUsersSuccess({ body: [executorUser, currentUser, otherUser] })
      mockGetLocationsCatalogSuccess({ body: [], once: false })
      mockGetCurrenciesSuccess({ body: [] })
      mockGetEquipmentsCatalogSuccess({
        body: warehouseFixtures.equipmentsCatalog(),
        once: false,
      })
      mockGetUsersGroupsSuccess({ body: [] })
      mockGetInventorizationEquipmentsSuccess({
        inventorizationId: locationStateMock.inventorization.id,
      })

      const { user } = render(<EditRelocationTaskDraftPage />, {
        store: getStoreWithAuth({ id: currentUser.id }, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
        }),
      })

      await relocationTaskFormTestUtils.expectExecutorsLoadingFinished()
      await relocationTaskFormTestUtils.expectControllersLoadingFinished()
      await relocationTaskFormTestUtils.openExecutorSelect(user)
      await relocationTaskFormTestUtils.setExecutor(user, executorUser.fullName)
      await relocationTaskFormTestUtils.openControllerSelect(user)
      // const executorOption = relocationTaskFormTestUtils.queryControllerOption(
      //   executorUser.fullName,
      // )
      const currentUserOption = relocationTaskFormTestUtils.queryControllerOption(
        currentUser.fullName,
      )
      const otherUserOption = relocationTaskFormTestUtils.getControllerOption(otherUser.fullName)

      expect(otherUserOption).toBeInTheDocument()
      // expect(executorOption).not.toBeInTheDocument()
      expect(currentUserOption).not.toBeInTheDocument()
    })

    test('Исполнителем нельзя выбрать контроллера', async () => {
      const locationStateMock = makeCreateRelocationTaskDraftPageLocationState({
        inventorization: warehouseFixtures.inventorization(),
      })

      jest
        .spyOn(reactRouterDom, 'useLocation')
        .mockReturnValue(fakeUseLocationResult({ state: locationStateMock }))

      const controllerUser = userFixtures.user()
      const currentUser = userFixtures.userDetail()
      mockGetUsersSuccess({ body: [controllerUser, currentUser] })
      mockGetLocationsCatalogSuccess({ body: [], once: false })
      mockGetCurrenciesSuccess({ body: [] })
      mockGetEquipmentsCatalogSuccess({
        body: warehouseFixtures.equipmentsCatalog(),
        once: false,
      })
      mockGetUsersGroupsSuccess({ body: [] })
      mockGetInventorizationEquipmentsSuccess({
        inventorizationId: locationStateMock.inventorization.id,
      })

      const { user } = render(<EditRelocationTaskDraftPage />, {
        store: getStoreWithAuth({ id: currentUser.id }, undefined, undefined, {
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
      const locationStateMock = makeCreateRelocationTaskDraftPageLocationState({
        inventorization: warehouseFixtures.inventorization(),
      })

      jest
        .spyOn(reactRouterDom, 'useLocation')
        .mockReturnValue(fakeUseLocationResult({ state: locationStateMock }))

      mockGetUsersSuccess()
      mockGetLocationsCatalogSuccess({ once: false })
      mockGetEquipmentsCatalogSuccess()
      mockGetCurrenciesSuccess()
      mockGetUsersGroupsSuccess()
      mockGetInventorizationEquipmentsSuccess({
        inventorizationId: locationStateMock.inventorization.id,
      })

      render(<EditRelocationTaskDraftPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
        }),
      })

      const title = within(testUtils.getContainer()).getByText('Перечень оборудования')
      const table = relocationEquipmentDraftEditableTableTestUtils.getContainer()

      expect(title).toBeInTheDocument()
      expect(table).toBeInTheDocument()
    })
  })

  test('При нажатии кнопки отмены возвращается на страницу выполнения инвентаризации во вкладку перемещений', async () => {
    const locationStateMock = makeCreateRelocationTaskDraftPageLocationState({
      inventorization: warehouseFixtures.inventorization(),
    })

    jest
      .spyOn(reactRouterDom, 'useLocation')
      .mockReturnValue(fakeUseLocationResult({ state: locationStateMock }))

    jest
      .spyOn(reactRouterDom, 'useParams')
      .mockReturnValue({ id: String(locationStateMock.inventorization.id) })

    mockGetUsersSuccess()
    mockGetLocationsCatalogSuccess({ once: false })
    mockGetEquipmentsCatalogSuccess()
    mockGetCurrenciesSuccess()
    mockGetUsersGroupsSuccess()
    mockGetInventorizationEquipmentsSuccess({
      inventorizationId: locationStateMock.inventorization.id,
    })

    const { user } = renderWithRouter(
      [
        {
          path: CommonRoutesEnum.Root,
          element: <EditRelocationTaskDraftPage />,
        },
        {
          path: WarehousesRoutesEnum.ExecuteInventorization,
          element: <ExecuteInventorizationPage />,
        },
      ],
      { initialEntries: [CommonRoutesEnum.Root], initialIndex: 0 },
      {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
        }),
      },
    )

    await testUtils.clickCancelButton(user)
    const page = executeInventorizationPageTestUtils.getContainer()
    expect(page).toBeInTheDocument()
  })

  test('При успешном создании возвращается на страницу выполнения инвентаризации во вкладку перемещений и открывает карточку', async () => {
    const locationStateMock = makeCreateRelocationTaskDraftPageLocationState({
      inventorization: warehouseFixtures.inventorization(),
    })

    jest
      .spyOn(reactRouterDom, 'useLocation')
      .mockReturnValue(fakeUseLocationResult({ state: locationStateMock }))

    jest
      .spyOn(reactRouterDom, 'useParams')
      .mockReturnValue({ id: String(locationStateMock.inventorization.id) })

    const controllerUser = userFixtures.user()
    mockGetUsersSuccess({ body: [controllerUser] })

    const locationFrom = catalogsFixtures.locationCatalogItem()
    mockGetLocationsCatalogSuccess({ body: [locationFrom], once: false })
    mockGetEquipmentsCatalogSuccess({ body: [] })
    mockGetCurrenciesSuccess({ body: [] })
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

    mockGetRelocationTaskSuccess({ relocationTaskId: relocationTask.id })
    mockGetRelocationEquipmentsSuccess({ relocationTaskId: relocationTask.id })

    const { user } = renderWithRouter(
      [
        {
          path: CommonRoutesEnum.Root,
          element: <EditRelocationTaskDraftPage />,
        },
        {
          path: WarehousesRoutesEnum.ExecuteInventorization,
          element: <ExecuteInventorizationPage />,
        },
      ],
      { initialEntries: [CommonRoutesEnum.Root], initialIndex: 0 },
      {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
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
    await testUtils.clickSubmitButton(user)

    const page = await executeInventorizationPageTestUtils.findContainer()
    expect(page).toBeInTheDocument()

    const details = await relocationTaskDetailsTestUtils.findContainer()
    expect(details).toBeInTheDocument()
  })
})
