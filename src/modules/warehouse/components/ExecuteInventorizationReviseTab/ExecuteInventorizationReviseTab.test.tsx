import { waitFor, within } from '@testing-library/react'

import {
  EquipmentCategoryEnum,
  equipmentConditionDict,
  EquipmentConditionEnum,
} from 'modules/warehouse/constants/equipment'

import { makeString } from 'shared/utils/string'

import { createInventorizationEquipmentModalTestUtils } from '_tests_/features/warehouse/CreateInventorizationEquipmentModal/testUtils'
import { equipmentFormModalTestUtils } from '_tests_/features/warehouse/EquipmentFormModal/testUtils'
import { props } from '_tests_/features/warehouse/ExecuteInventorizationReviseTab/constants'
import { executeInventorizationReviseTabTestUtils } from '_tests_/features/warehouse/ExecuteInventorizationReviseTab/testUtils'
import { reviseEquipmentTableTestUtils } from '_tests_/features/warehouse/ReviseEquipmentTable/testUtils'
import commonFixtures from '_tests_/fixtures/common'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import {
  mockCreateEquipmentSuccess,
  mockCreateInventorizationEquipmentSuccess,
  mockGetCurrencyListSuccess,
  mockGetEquipmentCatalogListSuccess,
  mockGetEquipmentCategoryListSuccess,
  mockGetEquipmentSuccess,
  mockGetInventorizationEquipmentsSuccess,
  mockGetLocationsCatalogSuccess,
  mockGetNomenclatureListSuccess,
  mockGetNomenclatureSuccess,
  mockGetWorkTypesSuccess,
} from '_tests_/mocks/api'
import { fakeInteger, render, setupApiTests } from '_tests_/utils'

import ExecuteInventorizationReviseTab from './index'

setupApiTests()

describe('Вкладка списка оборудования с расхождением', () => {
  test('Отображает заголовок и таблицу', () => {
    mockGetInventorizationEquipmentsSuccess({ inventorizationId: props.inventorization.id })
    mockGetLocationsCatalogSuccess()

    render(<ExecuteInventorizationReviseTab {...props} />)

    const container = executeInventorizationReviseTabTestUtils.getContainer()
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

        render(<ExecuteInventorizationReviseTab {...props} />)

        const button = executeInventorizationReviseTabTestUtils.getCreateEquipmentButton()

        expect(button).toBeInTheDocument()
        expect(button).toBeEnabled()
      })

      test('При клике открывается модалка добавления оборудования', async () => {
        mockGetInventorizationEquipmentsSuccess({ inventorizationId: props.inventorization.id })
        mockGetLocationsCatalogSuccess({ body: [] })
        mockGetEquipmentCategoryListSuccess({ body: [] })
        mockGetEquipmentCatalogListSuccess()

        const { user } = render(<ExecuteInventorizationReviseTab {...props} />)

        await executeInventorizationReviseTabTestUtils.clickCreateEquipmentButton(user)
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
      const warehouseListItem = warehouseFixtures.warehouseListItem()

      const { user } = render(<ExecuteInventorizationReviseTab {...props} />)

      await executeInventorizationReviseTabTestUtils.clickCreateEquipmentButton(user)
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

      const warehouseListItem = warehouseFixtures.warehouseListItem()

      const { user } = render(<ExecuteInventorizationReviseTab {...props} />)

      await executeInventorizationReviseTabTestUtils.clickCreateEquipmentButton(user)
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
})
