import { screen, waitFor, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { makeString } from 'shared/utils/string'

import warehouseFixtures from '_tests_/fixtures/warehouse'
import {
  mockCreateInventorizationEquipmentSuccess,
  mockGetEquipmentCatalogListSuccess,
  mockGetEquipmentCategoryListSuccess,
  mockGetEquipmentSuccess,
  mockGetInventorizationEquipmentsSuccess,
  mockGetLocationListSuccess,
} from '_tests_/mocks/api'
import { buttonTestUtils, fakeId, render, setupApiTests } from '_tests_/utils'

import { testUtils as createInventorizationEquipmentModalTestUtils } from '../CreateInventorizationEquipmentModal/CreateInventorizationEquipmentModal.test'
import { testUtils as reviseEquipmentTableTestUtils } from '../ReviseEquipmentTable/ReviseEquipmentTable.test'
import ExecuteInventorizationReviseTab, { ExecuteInventorizationReviseTabProps } from './index'

const props: ExecuteInventorizationReviseTabProps = {
  inventorizationId: fakeId(),
  warehouses: [],
}

const getContainer = () => screen.getByTestId('execute-inventorization-revise-tab')

// create equipment button
const getCreateEquipmentButton = () =>
  buttonTestUtils.getButtonIn(getContainer(), /Добавить оборудование/)

const clickCreateEquipmentButton = async (user: UserEvent) => user.click(getCreateEquipmentButton())

export const testUtils = {
  getContainer,

  getCreateEquipmentButton,
  clickCreateEquipmentButton,
}

setupApiTests()

describe('Вкладка списка оборудования с расхождением', () => {
  test('Отображает заголовок и таблицу', () => {
    mockGetInventorizationEquipmentsSuccess({ inventorizationId: props.inventorizationId })
    mockGetLocationListSuccess()

    render(<ExecuteInventorizationReviseTab {...props} />)

    const container = testUtils.getContainer()
    const title = within(container).getByText('Перечень оборудования для сверки')
    const table = reviseEquipmentTableTestUtils.getContainer()

    expect(title).toBeInTheDocument()
    expect(table).toBeInTheDocument()
  })

  describe('Создание оборудования', () => {
    describe('Кнопка создания оборудования', () => {
      test('Отображается и активна', () => {
        mockGetInventorizationEquipmentsSuccess({ inventorizationId: props.inventorizationId })
        mockGetLocationListSuccess()

        render(<ExecuteInventorizationReviseTab {...props} />)

        const button = testUtils.getCreateEquipmentButton()

        expect(button).toBeInTheDocument()
        expect(button).toBeEnabled()
      })

      test('При клике открывается модалка добавления оборудования', async () => {
        mockGetInventorizationEquipmentsSuccess({ inventorizationId: props.inventorizationId })
        mockGetLocationListSuccess({ body: [] })
        mockGetEquipmentCategoryListSuccess({ body: [] })
        mockGetEquipmentCatalogListSuccess()

        const { user } = render(<ExecuteInventorizationReviseTab {...props} />)

        await testUtils.clickCreateEquipmentButton(user)
        const modal = await createInventorizationEquipmentModalTestUtils.findContainer()

        expect(modal).toBeInTheDocument()
      })
    })

    test('После добавления оборудования перезапрашивается список', async () => {
      mockGetInventorizationEquipmentsSuccess(
        { inventorizationId: props.inventorizationId },
        { once: false },
      )
      mockGetLocationListSuccess({ body: [] })
      mockGetEquipmentCategoryListSuccess({ body: [] })

      const equipmentCatalogListItem = warehouseFixtures.equipmentCatalogListItem()
      mockGetEquipmentCatalogListSuccess({ body: [equipmentCatalogListItem] })

      mockGetEquipmentSuccess(equipmentCatalogListItem.id)
      mockCreateInventorizationEquipmentSuccess({ inventorizationId: props.inventorizationId })
      const warehouseListItem = warehouseFixtures.warehouseListItem()

      const { user } = render(
        <ExecuteInventorizationReviseTab {...props} warehouses={[warehouseListItem]} />,
      )

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
  })
})
