import { screen, waitFor, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import pick from 'lodash/pick'

import { UserPermissionsEnum } from 'modules/user/constants'
import { testUtils as equipmentFormModalTestUtils } from 'modules/warehouse/components/EquipmentFormModal/EquipmentFormModal.test'
import {
  EquipmentCategoryEnum,
  equipmentConditionDict,
  EquipmentConditionEnum,
} from 'modules/warehouse/constants/equipment'
import { InventorizationStatusEnum } from 'modules/warehouse/constants/inventorization'

import { DEFAULT_FILE_NAME } from 'shared/constants/common'
import { MimetypeEnum } from 'shared/constants/mimetype'
import * as base64Utils from 'shared/utils/common/base64'
import * as downloadFileUtils from 'shared/utils/file/downloadFile'
import { makeString } from 'shared/utils/string'

import commonFixtures from '_tests_/fixtures/common'
import userFixtures from '_tests_/fixtures/user'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import {
  mockCreateEquipmentSuccess,
  mockCreateInventorizationEquipmentSuccess,
  mockGetCurrencyListSuccess,
  mockGetEquipmentCatalogListSuccess,
  mockGetEquipmentCategoryListSuccess,
  mockGetEquipmentSuccess,
  mockGetInventorizationEquipmentsSuccess,
  mockGetInventorizationEquipmentsTemplateSuccess,
  mockGetLocationsCatalogSuccess,
  mockGetNomenclatureListSuccess,
  mockGetNomenclatureSuccess,
  mockGetWorkTypesSuccess,
} from '_tests_/mocks/api'
import { getUserMeQueryMock } from '_tests_/mocks/state/user'
import {
  buttonTestUtils,
  fakeInteger,
  fakeWord,
  getStoreWithAuth,
  render,
  setupApiTests,
} from '_tests_/utils'

import { testUtils as createInventorizationEquipmentModalTestUtils } from '../CreateInventorizationEquipmentModal/CreateInventorizationEquipmentModal.test'
import { testUtils as reviseEquipmentTableTestUtils } from '../ReviseEquipmentTable/ReviseEquipmentTable.test'
import ExecuteInventorizationReviseTab, { ExecuteInventorizationReviseTabProps } from './index'

const props: ExecuteInventorizationReviseTabProps = {
  inventorization: pick(
    warehouseFixtures.inventorization(),
    'id',
    'warehouses',
    'status',
    'executor',
  ),
}

const getContainer = () => screen.getByTestId('execute-inventorization-revise-tab')

// create equipment button
const getCreateEquipmentButton = () =>
  buttonTestUtils.getButtonIn(getContainer(), /Добавить оборудование/)

const clickCreateEquipmentButton = async (user: UserEvent) => user.click(getCreateEquipmentButton())

// download template button
const getDownloadTemplateButton = () =>
  buttonTestUtils.getButtonIn(getContainer(), /Скачать шаблон/)

const queryDownloadTemplateButton = () =>
  buttonTestUtils.queryButtonIn(getContainer(), /Скачать шаблон/)

const clickDownloadTemplateButton = async (user: UserEvent) =>
  user.click(getDownloadTemplateButton())

const expectDownloadTemplateLoadingFinished = () =>
  buttonTestUtils.expectLoadingFinished(getDownloadTemplateButton())

export const testUtils = {
  getContainer,

  getCreateEquipmentButton,
  clickCreateEquipmentButton,

  getDownloadTemplateButton,
  queryDownloadTemplateButton,
  clickDownloadTemplateButton,
  expectDownloadTemplateLoadingFinished,
}

setupApiTests()

describe('Вкладка списка оборудования с расхождением', () => {
  test('Отображает заголовок и таблицу', () => {
    mockGetInventorizationEquipmentsSuccess({ inventorizationId: props.inventorization.id })
    mockGetLocationsCatalogSuccess()
    const currentUser = userFixtures.user()

    render(<ExecuteInventorizationReviseTab {...props} />, {
      store: getStoreWithAuth(currentUser, undefined, undefined, {
        queries: { ...getUserMeQueryMock(currentUser) },
      }),
    })

    const container = testUtils.getContainer()
    const title = within(container).getByText('Перечень оборудования для сверки')
    const table = reviseEquipmentTableTestUtils.getContainer()

    expect(title).toBeInTheDocument()
    expect(table).toBeInTheDocument()
  })

  describe('Создание оборудования', () => {
    describe('Кнопка создания оборудования', () => {
      test('Отображается и активна', () => {
        mockGetInventorizationEquipmentsSuccess({ inventorizationId: props.inventorization.id })
        mockGetLocationsCatalogSuccess()
        const currentUser = userFixtures.user()

        render(<ExecuteInventorizationReviseTab {...props} />, {
          store: getStoreWithAuth(currentUser, undefined, undefined, {
            queries: { ...getUserMeQueryMock(currentUser) },
          }),
        })

        const button = testUtils.getCreateEquipmentButton()

        expect(button).toBeInTheDocument()
        expect(button).toBeEnabled()
      })

      test('При клике открывается модалка добавления оборудования', async () => {
        mockGetInventorizationEquipmentsSuccess({ inventorizationId: props.inventorization.id })
        mockGetLocationsCatalogSuccess({ body: [] })
        mockGetEquipmentCategoryListSuccess({ body: [] })
        mockGetEquipmentCatalogListSuccess()
        const currentUser = userFixtures.user()

        const { user } = render(<ExecuteInventorizationReviseTab {...props} />, {
          store: getStoreWithAuth(currentUser, undefined, undefined, {
            queries: { ...getUserMeQueryMock(currentUser) },
          }),
        })

        await testUtils.clickCreateEquipmentButton(user)
        const modal = await createInventorizationEquipmentModalTestUtils.findContainer()

        expect(modal).toBeInTheDocument()
      })
    })

    test('После добавления оборудования перезапрашивается список', async () => {
      mockGetInventorizationEquipmentsSuccess(
        { inventorizationId: props.inventorization.id },
        { once: false },
      )
      mockGetLocationsCatalogSuccess({ body: [] })
      mockGetEquipmentCategoryListSuccess({ body: [] })

      const equipmentCatalogListItem = warehouseFixtures.equipmentCatalogListItem()
      mockGetEquipmentCatalogListSuccess({ body: [equipmentCatalogListItem] })

      mockGetEquipmentSuccess(equipmentCatalogListItem.id)
      mockCreateInventorizationEquipmentSuccess({ inventorizationId: props.inventorization.id })
      const warehouseListItem = props.inventorization.warehouses[0]
      const currentUser = userFixtures.user()

      const { user } = render(<ExecuteInventorizationReviseTab {...props} />, {
        store: getStoreWithAuth(currentUser, undefined, undefined, {
          queries: { ...getUserMeQueryMock(currentUser) },
        }),
      })

      await testUtils.clickCreateEquipmentButton(user)
      const modal = await createInventorizationEquipmentModalTestUtils.findContainer()
      await createInventorizationEquipmentModalTestUtils.expectEquipmentLoadingFinished()
      await createInventorizationEquipmentModalTestUtils.openEquipmentSelect(user)
      await createInventorizationEquipmentModalTestUtils.setEquipment(
        user,
        makeString(
          ', ',
          equipmentCatalogListItem.title,
          equipmentCatalogListItem.serialNumber,
          equipmentCatalogListItem.inventoryNumber,
        ),
      )
      await createInventorizationEquipmentModalTestUtils.openLocationFactSelect(user)
      await createInventorizationEquipmentModalTestUtils.setLocationFact(
        user,
        warehouseListItem.title,
      )
      await createInventorizationEquipmentModalTestUtils.clickSubmitButton(user)
      await waitFor(() => expect(modal).not.toBeInTheDocument())
      await reviseEquipmentTableTestUtils.expectLoadingStarted()
      await reviseEquipmentTableTestUtils.expectLoadingFinished()
    })

    test('После создания оборудования при добавлении оборудования перезапрашивается список', async () => {
      mockGetInventorizationEquipmentsSuccess(
        { inventorizationId: props.inventorization.id },
        { once: false },
      )

      mockGetLocationsCatalogSuccess({ body: [] })

      const equipmentCategoryListItem = warehouseFixtures.equipmentCategoryListItem({
        code: EquipmentCategoryEnum.Consumable,
      })
      mockGetEquipmentCategoryListSuccess({ body: [equipmentCategoryListItem] })
      mockGetCurrencyListSuccess()

      const nomenclatureListItem = warehouseFixtures.nomenclatureListItem()
      mockGetNomenclatureListSuccess({
        body: commonFixtures.paginatedListResponse([nomenclatureListItem]),
      })
      mockGetNomenclatureSuccess(nomenclatureListItem.id, {
        body: warehouseFixtures.nomenclature(),
      })

      const workTypeListItem = warehouseFixtures.workTypeListItem()
      mockGetWorkTypesSuccess({ body: [workTypeListItem] })
      mockGetEquipmentCatalogListSuccess({ body: [], once: false })
      mockCreateEquipmentSuccess()
      mockCreateInventorizationEquipmentSuccess({ inventorizationId: props.inventorization.id })
      const warehouseListItem = props.inventorization.warehouses[0]
      const currentUser = userFixtures.user()

      const { user } = render(<ExecuteInventorizationReviseTab {...props} />, {
        store: getStoreWithAuth(currentUser, undefined, undefined, {
          queries: { ...getUserMeQueryMock(currentUser) },
        }),
      })

      await testUtils.clickCreateEquipmentButton(user)
      const createInventorizationEquipmentModal =
        await createInventorizationEquipmentModalTestUtils.findContainer()
      await createInventorizationEquipmentModalTestUtils.openLocationFactSelect(user)
      await createInventorizationEquipmentModalTestUtils.setLocationFact(
        user,
        warehouseListItem.title,
      )
      await createInventorizationEquipmentModalTestUtils.expectEquipmentLoadingFinished()
      await createInventorizationEquipmentModalTestUtils.openEquipmentSelect(user)
      await createInventorizationEquipmentModalTestUtils.clickCreateEquipmentButton(user)
      const equipmentFormModal = await equipmentFormModalTestUtils.findContainer()
      await equipmentFormModalTestUtils.expectCategoryLoadingFinished()
      await equipmentFormModalTestUtils.openCategorySelect(user)
      await equipmentFormModalTestUtils.setCategory(user, equipmentCategoryListItem.title)
      await equipmentFormModalTestUtils.expectNomenclaturesLoadingFinished()
      await equipmentFormModalTestUtils.openNomenclatureSelect(user)
      await equipmentFormModalTestUtils.setNomenclature(user, nomenclatureListItem.title)
      await equipmentFormModalTestUtils.expectNomenclatureLoadingStarted()
      await equipmentFormModalTestUtils.expectNomenclatureLoadingFinished()
      await equipmentFormModalTestUtils.openConditionSelect(user)
      await equipmentFormModalTestUtils.setCondition(
        user,
        equipmentConditionDict[EquipmentConditionEnum.Working],
      )
      await equipmentFormModalTestUtils.setQuantity(user, fakeInteger())
      await equipmentFormModalTestUtils.openPurposeSelect(user)
      await equipmentFormModalTestUtils.setPurpose(user, workTypeListItem.title)
      await equipmentFormModalTestUtils.clickAddButton(user)
      await waitFor(() => expect(equipmentFormModal).not.toBeInTheDocument())
      await waitFor(() => expect(createInventorizationEquipmentModal).not.toBeInTheDocument())
      await reviseEquipmentTableTestUtils.expectLoadingStarted()
      await reviseEquipmentTableTestUtils.expectLoadingFinished()
    })
  })

  describe('Скачать шаблон', () => {
    test(`Кнопка отображается и активна если есть права ${UserPermissionsEnum.InventorizationUpdate} и статус инвентаризации ${InventorizationStatusEnum.New} и текущий пользователь является исполнителем инвентаризации`, () => {
      const inventorization = warehouseFixtures.inventorization({
        status: InventorizationStatusEnum.New,
      })
      mockGetInventorizationEquipmentsSuccess({ inventorizationId: inventorization.id })
      mockGetLocationsCatalogSuccess({ body: [] })

      const currentUser = userFixtures.user({
        id: inventorization.executor.id,
        permissions: [UserPermissionsEnum.InventorizationUpdate],
      })

      render(<ExecuteInventorizationReviseTab {...props} inventorization={inventorization} />, {
        store: getStoreWithAuth(currentUser, undefined, undefined, {
          queries: { ...getUserMeQueryMock(currentUser) },
        }),
      })

      const button = testUtils.getDownloadTemplateButton()
      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test(`Кнопка отображается если есть права ${UserPermissionsEnum.InventorizationUpdate} и статус инвентаризации ${InventorizationStatusEnum.InProgress} и текущий пользователь является исполнителем инвентаризации`, async () => {
      const inventorization = warehouseFixtures.inventorization({
        status: InventorizationStatusEnum.InProgress,
      })
      mockGetInventorizationEquipmentsSuccess({ inventorizationId: inventorization.id })
      mockGetLocationsCatalogSuccess({ body: [] })

      const currentUser = userFixtures.user({
        id: inventorization.executor.id,
        permissions: [UserPermissionsEnum.InventorizationUpdate],
      })

      render(<ExecuteInventorizationReviseTab {...props} inventorization={inventorization} />, {
        store: getStoreWithAuth(currentUser, undefined, undefined, {
          queries: { ...getUserMeQueryMock(currentUser) },
        }),
      })

      const button = testUtils.getDownloadTemplateButton()
      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    describe('Кнопка не отображается', () => {
      test(`Если есть права ${UserPermissionsEnum.InventorizationUpdate} и статус инвентаризации ${InventorizationStatusEnum.New} но текущий пользователь не является исполнителем инвентаризации`, () => {
        const inventorization = warehouseFixtures.inventorization({
          status: InventorizationStatusEnum.New,
        })
        mockGetInventorizationEquipmentsSuccess({ inventorizationId: inventorization.id })
        mockGetLocationsCatalogSuccess({ body: [] })

        const currentUser = userFixtures.user({
          permissions: [UserPermissionsEnum.InventorizationUpdate],
        })

        render(<ExecuteInventorizationReviseTab {...props} inventorization={inventorization} />, {
          store: getStoreWithAuth(currentUser, undefined, undefined, {
            queries: { ...getUserMeQueryMock(currentUser) },
          }),
        })

        const button = testUtils.queryDownloadTemplateButton()
        expect(button).not.toBeInTheDocument()
      })

      test(`Если есть права ${UserPermissionsEnum.InventorizationUpdate} и текущий пользователь является исполнителем инвентаризации но статус инвентаризации не ${InventorizationStatusEnum.New} или ${InventorizationStatusEnum.InProgress}`, () => {
        const inventorization = warehouseFixtures.inventorization({
          status: InventorizationStatusEnum.Closed,
        })
        mockGetInventorizationEquipmentsSuccess({ inventorizationId: inventorization.id })
        mockGetLocationsCatalogSuccess({ body: [] })

        const currentUser = userFixtures.user({
          id: inventorization.executor.id,
          permissions: [UserPermissionsEnum.InventorizationUpdate],
        })

        render(<ExecuteInventorizationReviseTab {...props} inventorization={inventorization} />, {
          store: getStoreWithAuth(currentUser, undefined, undefined, {
            queries: { ...getUserMeQueryMock(currentUser) },
          }),
        })

        const button = testUtils.queryDownloadTemplateButton()
        expect(button).not.toBeInTheDocument()
      })

      test(`Если статус инвентаризации ${InventorizationStatusEnum.New} и текущий пользователь является исполнителем инвентаризации но нет прав ${UserPermissionsEnum.InventorizationUpdate}`, () => {
        const inventorization = warehouseFixtures.inventorization({
          status: InventorizationStatusEnum.InProgress,
        })
        mockGetInventorizationEquipmentsSuccess({ inventorizationId: inventorization.id })
        mockGetLocationsCatalogSuccess({ body: [] })

        const currentUser = userFixtures.user({ id: inventorization.executor.id, permissions: [] })

        render(<ExecuteInventorizationReviseTab {...props} inventorization={inventorization} />, {
          store: getStoreWithAuth(currentUser, undefined, undefined, {
            queries: { ...getUserMeQueryMock(currentUser) },
          }),
        })

        const button = testUtils.queryDownloadTemplateButton()
        expect(button).not.toBeInTheDocument()
      })
    })

    test('При успешном запросе вызывается функция открытия окна скачивания', async () => {
      const inventorization = warehouseFixtures.inventorization({
        status: InventorizationStatusEnum.New,
      })

      const currentUser = userFixtures.user({
        id: inventorization.executor.id,
        permissions: [UserPermissionsEnum.InventorizationUpdate],
      })

      const downloadFileSpy = jest.spyOn(downloadFileUtils, 'downloadFile')

      const base64ToBytes = jest.spyOn(base64Utils, 'base64ToBytes')
      const fakeArrayBuffer = new Uint8Array()
      base64ToBytes.mockReturnValueOnce(fakeArrayBuffer)

      const file = fakeWord()
      mockGetInventorizationEquipmentsTemplateSuccess({ body: file })
      mockGetInventorizationEquipmentsSuccess({ inventorizationId: inventorization.id })
      mockGetLocationsCatalogSuccess({ body: [] })

      const { user } = render(
        <ExecuteInventorizationReviseTab {...props} inventorization={inventorization} />,
        {
          store: getStoreWithAuth(currentUser, undefined, undefined, {
            queries: { ...getUserMeQueryMock(currentUser) },
          }),
        },
      )

      await testUtils.clickDownloadTemplateButton(user)
      await testUtils.expectDownloadTemplateLoadingFinished()

      await waitFor(() => expect(base64ToBytes).toBeCalledTimes(1))
      expect(base64ToBytes).toBeCalledWith(file)

      expect(downloadFileSpy).toBeCalledTimes(1)
      expect(downloadFileSpy).toBeCalledWith(fakeArrayBuffer, MimetypeEnum.Xlsx, DEFAULT_FILE_NAME)
    })
  })
})
