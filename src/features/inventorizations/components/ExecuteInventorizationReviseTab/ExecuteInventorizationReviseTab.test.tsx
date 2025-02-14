import { screen, waitFor, within } from '@testing-library/react'
import { EquipmentCategoryEnum, EquipmentConditionEnum } from 'features/equipments/api/constants'
import { equipmentConditionDict } from 'features/equipments/constants'
import { InventorizationStatusEnum } from 'features/inventorizations/api/constants'
import { UserPermissionsEnum } from 'features/users/api/constants'

import { DEFAULT_FILE_NAME } from 'shared/constants/common'
import { MimetypeEnum } from 'shared/constants/mimetype'
import { IdType } from 'shared/types/common'
import * as base64Utils from 'shared/utils/common/base64'
import * as downloadFileUtils from 'shared/utils/file/downloadFile'
import { makeString } from 'shared/utils/string'

import { checkEquipmentFormModalTestUtils } from '_tests_/features/equipment/components/CheckEquipmentFormModal/utils'
import { props } from '_tests_/features/inventorization/components/ExecuteInventorizationReviseTab/constants'
import { executeInventorizationReviseTabTestUtils as testUtils } from '_tests_/features/inventorization/components/ExecuteInventorizationReviseTab/testUtils'
import { checkInventorizationEquipmentsModalTestUtils } from '_tests_/features/inventorizationEquipments/components/CheckInventorizationEquipmentsModal/testUtils'
import { checkInventorizationEquipmentsTableTestUtils } from '_tests_/features/inventorizationEquipments/components/CheckInventorizationEquipmentsTable/testUtils'
import { createInventorizationEquipmentModalTestUtils } from '_tests_/features/warehouse/components/CreateInventorizationEquipmentModal/testUtils'
import { equipmentFormModalTestUtils } from '_tests_/features/warehouse/components/EquipmentFormModal/testUtils'
import { reviseEquipmentTableTestUtils } from '_tests_/features/warehouse/components/ReviseInventorizationEquipmentTable/testUtils'
import catalogsFixtures from '_tests_/fixtures/catalogs'
import commonFixtures from '_tests_/fixtures/common'
import userFixtures from '_tests_/fixtures/user'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import {
  mockCheckInventorizationEquipmentsBadRequestError,
  mockCheckInventorizationEquipmentsSuccess,
  mockCheckInventorizationEquipmentsTemplateBadRequestError,
  mockCheckInventorizationEquipmentsTemplateSuccess,
  mockCreateEquipmentSuccess,
  mockCreateInventorizationEquipmentSuccess,
  mockGetCurrencyListSuccess,
  mockGetCustomerListSuccess,
  mockGetEquipmentCatalogListSuccess,
  mockGetEquipmentCategoryListSuccess,
  mockGetEquipmentSuccess,
  mockGetInventorizationEquipmentsSuccess,
  mockGetInventorizationEquipmentsTemplateSuccess,
  mockGetLocationsCatalogSuccess,
  mockGetMacroregionsSuccess,
  mockGetNomenclatureListSuccess,
  mockGetNomenclatureSuccess,
  mockGetWorkTypesSuccess,
} from '_tests_/mocks/api'
import { getUserMeQueryMock } from '_tests_/mocks/state/user'
import { fakeInteger, fakeWord, getStoreWithAuth, render, setupApiTests } from '_tests_/utils'

import ExecuteInventorizationReviseTab from './index'

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

    test.skip('После добавления оборудования перезапрашивается список', async () => {
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

    test.skip('После создания оборудования при добавлении оборудования перезапрашивается список', async () => {
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

  describe('Сверить оборудование из Excel', () => {
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

      const button = testUtils.getCheckByExcelButton()
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

      const button = testUtils.getCheckByExcelButton()
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

        const button = testUtils.queryCheckByExcelButton()
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

        const button = testUtils.queryCheckByExcelButton()
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

        const button = testUtils.queryCheckByExcelButton()
        expect(button).not.toBeInTheDocument()
      })
    })

    test('При успешном запросе открывается модалка с результатами сверки', async () => {
      const inventorization = warehouseFixtures.inventorization({
        status: InventorizationStatusEnum.New,
      })

      const currentUser = userFixtures.user({
        id: inventorization.executor.id,
        permissions: [UserPermissionsEnum.InventorizationUpdate],
      })
      mockCheckInventorizationEquipmentsTemplateSuccess({ body: [] })
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

      await testUtils.clickCheckByExcelButton(user)
      await testUtils.expectCheckByExcelLoadingFinished()
      const modal = await checkInventorizationEquipmentsModalTestUtils.findContainer()
      expect(modal).toBeInTheDocument()
    })

    test('При 400 ошибке показываются ошибки сверки', async () => {
      const inventorization = warehouseFixtures.inventorization({
        status: InventorizationStatusEnum.New,
      })

      const currentUser = userFixtures.user({
        id: inventorization.executor.id,
        permissions: [UserPermissionsEnum.InventorizationUpdate],
      })

      const error1 = fakeWord()
      const error2 = fakeWord()
      mockCheckInventorizationEquipmentsTemplateBadRequestError({ body: { 1: [error1, error2] } })

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

      await testUtils.clickCheckByExcelButton(user)
      await testUtils.expectCheckByExcelLoadingFinished()

      const errorsTitle = 'Ошибка проверки сверяемого оборудования из Excel'
      const errorsTitleEl = screen.getByText(errorsTitle)
      const errorsContainer = testUtils.checkInventorizationEquipmentsTemplateErrorsContainer()

      expect(errorsTitleEl).toBeInTheDocument()
      expect(errorsContainer).toBeInTheDocument()
    })
  })

  describe('Результат сверки оборудования из Excel', () => {
    test('При нажатии на кнопку редактирования, вместо иконки восклицательного знака отображается иконка галочки', async () => {
      const inventorization = warehouseFixtures.inventorization({
        status: InventorizationStatusEnum.New,
      })

      const currentUser = userFixtures.user({
        id: inventorization.executor.id,
        permissions: [UserPermissionsEnum.InventorizationUpdate],
      })

      const checkedInventorizationEquipmentsTemplateListItem =
        warehouseFixtures.checkedInventorizationEquipmentsTemplateListItem({ isCredited: false })

      mockCheckInventorizationEquipmentsTemplateSuccess({
        body: [checkedInventorizationEquipmentsTemplateListItem],
      })
      mockGetInventorizationEquipmentsSuccess({ inventorizationId: inventorization.id })
      mockGetLocationsCatalogSuccess({ body: [] })

      mockGetNomenclatureListSuccess()
      mockGetNomenclatureSuccess(checkedInventorizationEquipmentsTemplateListItem.nomenclature!.id)
      mockGetWorkTypesSuccess()
      mockGetCurrencyListSuccess()
      mockGetCustomerListSuccess()
      mockGetMacroregionsSuccess()
      mockGetEquipmentCategoryListSuccess()

      const { user } = render(
        <ExecuteInventorizationReviseTab {...props} inventorization={inventorization} />,
        {
          store: getStoreWithAuth(currentUser, undefined, undefined, {
            queries: { ...getUserMeQueryMock(currentUser) },
          }),
        },
      )

      await testUtils.clickCheckByExcelButton(user)
      await testUtils.expectCheckByExcelLoadingFinished()
      await checkInventorizationEquipmentsModalTestUtils.findContainer()
      const exclamationIcon =
        checkInventorizationEquipmentsTableTestUtils.getIsCreditedIcon('exclamation-circle')
      expect(exclamationIcon).toBeInTheDocument()
      await checkInventorizationEquipmentsTableTestUtils.clickEditIcon(user)
      await waitFor(() => expect(exclamationIcon).not.toBeInTheDocument())
      const checkIcon =
        checkInventorizationEquipmentsTableTestUtils.getIsCreditedIcon('check-circle')
      expect(checkIcon).toBeInTheDocument()
    })

    test.todo(
      'После редактирования оборудования с категорией не расходный материал, значения полей в строке таблицы меняются',
    )

    // todo: доделать
    test.skip('После редактирования оборудования с категорией расходный материал, значения полей в строке таблицы меняются', async () => {
      const inventorization = warehouseFixtures.inventorization({
        status: InventorizationStatusEnum.New,
      })

      const currentUser = userFixtures.user({
        id: inventorization.executor.id,
        permissions: [UserPermissionsEnum.InventorizationUpdate],
      })

      const equipmentCategoryListItem = warehouseFixtures.equipmentCategoryListItem({
        code: EquipmentCategoryEnum.Consumable,
      })

      const checkedInventorizationEquipmentsTemplateListItem =
        warehouseFixtures.checkedInventorizationEquipmentsTemplateListItem({
          isCredited: false,
          category: equipmentCategoryListItem,
        })

      const checkedInventorizationEquipmentsTemplate = [
        checkedInventorizationEquipmentsTemplateListItem,
      ]
      mockCheckInventorizationEquipmentsTemplateSuccess({
        body: checkedInventorizationEquipmentsTemplate,
      })

      mockGetInventorizationEquipmentsSuccess({ inventorizationId: inventorization.id })

      const locationCatalogListItem = catalogsFixtures.locationCatalogListItem({
        id: checkedInventorizationEquipmentsTemplateListItem.locationFact!.id as IdType,
        title: checkedInventorizationEquipmentsTemplateListItem.locationFact!.title,
      })
      mockGetLocationsCatalogSuccess({ body: [locationCatalogListItem] })

      mockGetNomenclatureListSuccess({
        body: commonFixtures.paginatedListResponse([
          checkedInventorizationEquipmentsTemplateListItem.nomenclature!,
        ]),
      })

      const nomenclature = warehouseFixtures.nomenclature({
        ...checkedInventorizationEquipmentsTemplateListItem.nomenclature!,
      })
      mockGetNomenclatureSuccess(nomenclature.id, { body: nomenclature })

      mockGetWorkTypesSuccess()
      mockGetCurrencyListSuccess()
      mockGetCustomerListSuccess()
      mockGetMacroregionsSuccess()
      mockGetEquipmentCategoryListSuccess({ body: [equipmentCategoryListItem] })

      const { user } = render(
        <ExecuteInventorizationReviseTab {...props} inventorization={inventorization} />,
        {
          store: getStoreWithAuth(currentUser, undefined, undefined, {
            queries: { ...getUserMeQueryMock(currentUser) },
          }),
        },
      )

      await testUtils.clickCheckByExcelButton(user)
      await testUtils.expectCheckByExcelLoadingFinished()
      await checkInventorizationEquipmentsModalTestUtils.findContainer()
      await checkInventorizationEquipmentsTableTestUtils.expectLoadingFinished()

      const rowId = checkedInventorizationEquipmentsTemplate.findIndex(
        (eqp) => eqp === checkedInventorizationEquipmentsTemplateListItem,
      )
      const currentLocation = checkInventorizationEquipmentsTableTestUtils.getColValue(
        rowId,
        checkedInventorizationEquipmentsTemplateListItem.locationFact!.title,
      )
      expect(currentLocation).toBeInTheDocument()

      const currentQuantity = checkInventorizationEquipmentsTableTestUtils.getColValue(
        rowId,
        checkedInventorizationEquipmentsTemplateListItem.quantityFact!,
      )
      expect(currentQuantity).toBeInTheDocument()

      const currentTitle = checkInventorizationEquipmentsTableTestUtils.getColValue(
        rowId,
        checkedInventorizationEquipmentsTemplateListItem.title!,
      )
      expect(currentTitle).toBeInTheDocument()

      await checkInventorizationEquipmentsTableTestUtils.clickEditIcon(user)
      await checkEquipmentFormModalTestUtils.findContainer()
      await checkEquipmentFormModalTestUtils.expectCategoryLoadingFinished()
      await checkEquipmentFormModalTestUtils.expectNomenclaturesLoadingFinished()
      await checkEquipmentFormModalTestUtils.expectLocationLoadingFinished()
      await checkEquipmentFormModalTestUtils.openLocationSelect(user)
      await checkEquipmentFormModalTestUtils.setLocation(user, locationCatalogListItem.title, true)
      await checkEquipmentFormModalTestUtils.setQuantity(
        user,
        checkedInventorizationEquipmentsTemplateListItem.quantityFact! + 1,
      )
      await checkEquipmentFormModalTestUtils.openNomenclatureSelect(user)
      await checkEquipmentFormModalTestUtils.setNomenclature(
        user,
        checkedInventorizationEquipmentsTemplateListItem.nomenclature!.title,
      )
    })

    test('При успешной сверке закрывается модалка и перезапрашивается перечень оборудования для сверки', async () => {
      const inventorization = warehouseFixtures.inventorization({
        status: InventorizationStatusEnum.New,
      })

      const currentUser = userFixtures.user({
        id: inventorization.executor.id,
        permissions: [UserPermissionsEnum.InventorizationUpdate],
      })

      const checkedInventorizationEquipmentsTemplateListItem =
        warehouseFixtures.checkedInventorizationEquipmentsTemplateListItem({ isCredited: false })

      mockCheckInventorizationEquipmentsTemplateSuccess({
        body: [checkedInventorizationEquipmentsTemplateListItem],
      })

      mockCheckInventorizationEquipmentsSuccess()

      mockGetInventorizationEquipmentsSuccess(
        { inventorizationId: inventorization.id },
        { once: false },
      )
      mockGetLocationsCatalogSuccess({ body: [] })

      mockGetNomenclatureListSuccess()
      mockGetNomenclatureSuccess(checkedInventorizationEquipmentsTemplateListItem.nomenclature!.id)
      mockGetWorkTypesSuccess()
      mockGetCurrencyListSuccess()
      mockGetCustomerListSuccess()
      mockGetMacroregionsSuccess()
      mockGetEquipmentCategoryListSuccess()

      const { user } = render(
        <ExecuteInventorizationReviseTab {...props} inventorization={inventorization} />,
        {
          store: getStoreWithAuth(currentUser, undefined, undefined, {
            queries: { ...getUserMeQueryMock(currentUser) },
          }),
        },
      )

      await testUtils.clickCheckByExcelButton(user)
      await testUtils.expectCheckByExcelLoadingFinished()
      const modal = await checkInventorizationEquipmentsModalTestUtils.findContainer()
      await checkInventorizationEquipmentsModalTestUtils.clickSaveButton(user)
      await checkInventorizationEquipmentsModalTestUtils.expectLoadingFinished()
      await reviseEquipmentTableTestUtils.expectLoadingStarted()
      await reviseEquipmentTableTestUtils.expectLoadingFinished()
      await waitFor(() => expect(modal).not.toBeInTheDocument())
    })

    test('При 400 ошибке показываются ошибки сверки', async () => {
      const inventorization = warehouseFixtures.inventorization({
        status: InventorizationStatusEnum.New,
      })

      const currentUser = userFixtures.user({
        id: inventorization.executor.id,
        permissions: [UserPermissionsEnum.InventorizationUpdate],
      })

      const checkedInventorizationEquipmentsTemplateListItem =
        warehouseFixtures.checkedInventorizationEquipmentsTemplateListItem({ isCredited: false })

      mockCheckInventorizationEquipmentsTemplateSuccess({
        body: [checkedInventorizationEquipmentsTemplateListItem],
      })

      const error1 = fakeWord()
      const error2 = fakeWord()
      mockCheckInventorizationEquipmentsBadRequestError({ body: { 1: [error1, error2] } })

      mockGetInventorizationEquipmentsSuccess({ inventorizationId: inventorization.id })
      mockGetLocationsCatalogSuccess({ body: [] })

      mockGetNomenclatureListSuccess()
      mockGetNomenclatureSuccess(checkedInventorizationEquipmentsTemplateListItem.nomenclature!.id)
      mockGetWorkTypesSuccess()
      mockGetCurrencyListSuccess()
      mockGetCustomerListSuccess()
      mockGetMacroregionsSuccess()
      mockGetEquipmentCategoryListSuccess()

      const { user } = render(
        <ExecuteInventorizationReviseTab {...props} inventorization={inventorization} />,
        {
          store: getStoreWithAuth(currentUser, undefined, undefined, {
            queries: { ...getUserMeQueryMock(currentUser) },
          }),
        },
      )

      await testUtils.clickCheckByExcelButton(user)
      await testUtils.expectCheckByExcelLoadingFinished()
      await checkInventorizationEquipmentsModalTestUtils.findContainer()
      await checkInventorizationEquipmentsModalTestUtils.clickSaveButton(user)
      await checkInventorizationEquipmentsModalTestUtils.expectLoadingFinished()

      const errorsTitle = 'Ошибка проверки сверяемого оборудования'
      const errorTitleEl = screen.getByText(errorsTitle)
      const errorsContainer = testUtils.checkInventorizationEquipmentsErrorsContainer()

      expect(errorTitleEl).toBeInTheDocument()
      expect(errorsContainer).toBeInTheDocument()
    })
  })
})
