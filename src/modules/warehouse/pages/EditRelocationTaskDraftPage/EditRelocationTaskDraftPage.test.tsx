import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import * as reactRouterDom from 'react-router-dom'

import { CommonRouteEnum } from 'configs/routes'

import { testUtils as relocationEquipmentDraftEditableTableTestUtils } from 'modules/warehouse/components/RelocationEquipmentDraftEditableTable/RelocationEquipmentDraftEditableTable.test'
import { testUtils as relocationTaskDetailsTestUtils } from 'modules/warehouse/components/RelocationTaskDetails/RelocationTaskDetails.test'
import { testUtils as relocationTaskFormTestUtils } from 'modules/warehouse/components/RelocationTaskForm/RelocationTaskForm.test'
import { WarehouseRouteEnum } from 'modules/warehouse/constants/routes'
import ExecuteInventorizationPage from 'modules/warehouse/pages/ExecuteInventorizationPage'
import { testUtils as executeInventorizationPageTestUtils } from 'modules/warehouse/pages/ExecuteInventorizationPage/ExecuteInventorizationPage.test'
import { makeCreateRelocationTaskDraftPageLocationState } from 'modules/warehouse/utils/relocationTask'

import { CANCEL_TEXT } from 'shared/constants/common'
import { makeString } from 'shared/utils/string'

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
  mockGetLocationListSuccess,
  mockGetRelocationEquipmentListSuccess,
  mockGetRelocationTaskSuccess,
  mockGetUsersGroupsSuccess,
  mockGetUsersSuccess,
} from '_tests_/mocks/api'
import { getUserMeQueryMock } from '_tests_/mocks/state/user'
import {
  buttonTestUtils,
  getStoreWithAuth,
  notificationTestUtils,
  render,
  renderWithRouter,
  setupApiTests,
} from '_tests_/utils'

import CreateRelocationTaskDraftPage from './index'

const getContainer = () => screen.getByTestId('create-relocation-task-draft-page')

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

  getSubmitButton,
  clickSubmitButton,

  getCancelButton,
  clickCancelButton,
}

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
      mockGetLocationListSuccess({ once: false })
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
      const locationStateMock = makeCreateRelocationTaskDraftPageLocationState({
        inventorization: warehouseFixtures.inventorization(),
      })

      jest
        .spyOn(reactRouterDom, 'useLocation')
        .mockReturnValue(fakeUseLocationResult({ state: locationStateMock }))

      const executorUser = userFixtures.userListItem()
      const currentUser = userFixtures.userListItem()
      const otherUser = userFixtures.userListItem()
      mockGetUsersSuccess({ body: [executorUser, currentUser, otherUser] })
      mockGetLocationListSuccess({ body: [], once: false })
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
      const locationStateMock = makeCreateRelocationTaskDraftPageLocationState({
        inventorization: warehouseFixtures.inventorization(),
      })

      jest
        .spyOn(reactRouterDom, 'useLocation')
        .mockReturnValue(fakeUseLocationResult({ state: locationStateMock }))

      const controllerUser = userFixtures.userListItem()
      const currentUser = userFixtures.userListItem()
      mockGetUsersSuccess({ body: [controllerUser, currentUser] })
      mockGetLocationListSuccess({ body: [], once: false })
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
      const locationStateMock = makeCreateRelocationTaskDraftPageLocationState({
        inventorization: warehouseFixtures.inventorization(),
      })

      jest
        .spyOn(reactRouterDom, 'useLocation')
        .mockReturnValue(fakeUseLocationResult({ state: locationStateMock }))

      mockGetUsersSuccess()
      mockGetLocationListSuccess({ once: false })
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

      const title = within(getContainer()).getByText('Перечень оборудования')
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
    mockGetLocationListSuccess({ once: false })
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

    const controllerUser = userFixtures.userListItem()
    mockGetUsersSuccess({ body: [controllerUser] })

    const locationFrom = catalogsFixtures.locationListItem()
    mockGetLocationListSuccess({ body: [locationFrom], once: false })
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

    mockGetRelocationTaskSuccess({ relocationTaskId: relocationTask.id })
    mockGetRelocationEquipmentListSuccess({ relocationTaskId: relocationTask.id })

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
    await testUtils.clickSubmitButton(user)

    const page = await executeInventorizationPageTestUtils.findContainer()
    expect(page).toBeInTheDocument()

    const details = await relocationTaskDetailsTestUtils.findContainer()
    expect(details).toBeInTheDocument()
  })
})
