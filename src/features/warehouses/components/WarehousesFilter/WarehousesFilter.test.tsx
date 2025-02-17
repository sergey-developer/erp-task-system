import { props } from '_tests_/features/warehouses/components/WarehouseListFilter/constants'
import { warehouseListFilterTestUtils } from '_tests_/features/warehouses/components/WarehouseListFilter/testUtils'
import catalogsFixtures from '_tests_/fixtures/api/data/catalogs'
import warehousesFixtures from '_tests_/fixtures/api/data/warehouses'
import { mockGetLegalEntitiesSuccess, mockGetWarehousesSuccess } from '_tests_/mocks/api'
import { fakeWord, render, setupApiTests } from '_tests_/helpers'

import WarehousesFilter from './index'

setupApiTests()

describe('Фильтр списка складов', () => {
  describe('Кнопка закрытия', () => {
    test('Отображается корректно', () => {
      mockGetWarehousesSuccess()
      mockGetLegalEntitiesSuccess()

      render(<WarehousesFilter {...props} />)

      const button = warehouseListFilterTestUtils.getCloseButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Обработчик вызывается корректно', async () => {
      mockGetWarehousesSuccess()
      mockGetLegalEntitiesSuccess()

      const { user } = render(<WarehousesFilter {...props} />)

      await warehouseListFilterTestUtils.clickCloseButton(user)
      expect(props.onClose).toBeCalledTimes(1)
    })
  })

  describe('Кнопка применить', () => {
    test('Отображается корректно', () => {
      mockGetWarehousesSuccess()
      mockGetLegalEntitiesSuccess()

      render(<WarehousesFilter {...props} />)

      const button = warehouseListFilterTestUtils.getApplyButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Обработчик вызывается корректно', async () => {
      mockGetWarehousesSuccess()
      mockGetLegalEntitiesSuccess()

      const { user } = render(<WarehousesFilter {...props} />)

      await warehouseListFilterTestUtils.clickApplyButton(user)

      expect(props.onApply).toBeCalledTimes(1)
      expect(props.onApply).toBeCalledWith(expect.anything())
    })
  })

  describe('Кнопка сбросить всё', () => {
    test('Отображается корректно', () => {
      mockGetWarehousesSuccess()
      mockGetLegalEntitiesSuccess()

      render(<WarehousesFilter {...props} />)

      const button = warehouseListFilterTestUtils.getResetAllButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Сбрасывает значения полей', async () => {
      const warehouseListItem = warehousesFixtures.warehouse()
      mockGetWarehousesSuccess({ body: [warehouseListItem] })

      const legalEntityCatalogItem = catalogsFixtures.legalEntityCatalogItem()
      mockGetLegalEntitiesSuccess({ body: [legalEntityCatalogItem] })

      const titleValue = fakeWord()
      const addressValue = fakeWord()

      const { user } = render(
        <WarehousesFilter
          {...props}
          formValues={{
            title: titleValue,
            address: addressValue,
            parent: warehouseListItem.id,
            legalEntity: legalEntityCatalogItem.id,
          }}
        />,
      )

      await warehouseListFilterTestUtils.clickResetAllButton(user)

      expect(warehouseListFilterTestUtils.getTitleInput()).not.toHaveDisplayValue(titleValue)
      expect(warehouseListFilterTestUtils.getAddressInput()).not.toHaveDisplayValue(addressValue)
      expect(warehouseListFilterTestUtils.getSelectedParent()).not.toBeInTheDocument()
      expect(warehouseListFilterTestUtils.getSelectedLegalEntity()).not.toBeInTheDocument()
    })
  })

  describe('Наименование объекта', () => {
    test('Отображается корректно', () => {
      mockGetWarehousesSuccess()
      mockGetLegalEntitiesSuccess()

      render(<WarehousesFilter {...props} />)

      const label = warehouseListFilterTestUtils.getTitleFilterLabel()
      const input = warehouseListFilterTestUtils.getTitleInput()

      expect(label).toBeInTheDocument()
      expect(input).toBeInTheDocument()
      expect(input).toBeEnabled()
      expect(input).not.toHaveValue()
    })

    test('Можно установить значение', async () => {
      mockGetWarehousesSuccess()
      mockGetLegalEntitiesSuccess()

      const { user } = render(<WarehousesFilter {...props} />)

      const value = fakeWord()
      const input = await warehouseListFilterTestUtils.setTitle(user, value)

      expect(input).toHaveDisplayValue(value)
    })

    test('Можно установить значение по умолчанию', () => {
      mockGetWarehousesSuccess()
      mockGetLegalEntitiesSuccess()
      const titleValue = fakeWord()

      render(<WarehousesFilter {...props} formValues={{ title: titleValue }} />)

      const input = warehouseListFilterTestUtils.getTitleInput()
      expect(input).toHaveDisplayValue(titleValue)
    })

    test('Можно сбросить значение', async () => {
      mockGetWarehousesSuccess()
      mockGetLegalEntitiesSuccess()

      const { user } = render(<WarehousesFilter {...props} />)

      const value = fakeWord()
      await warehouseListFilterTestUtils.setTitle(user, value)
      await warehouseListFilterTestUtils.resetTitle(user)
      const input = warehouseListFilterTestUtils.getTitleInput()

      expect(input).not.toHaveDisplayValue(value)
    })
  })

  describe('Юридическое лицо', () => {
    test('Отображается корректно', async () => {
      mockGetWarehousesSuccess()
      mockGetLegalEntitiesSuccess()

      render(<WarehousesFilter {...props} />)

      await warehouseListFilterTestUtils.expectLegalEntityLoadingFinished()
      const label = warehouseListFilterTestUtils.getLegalEntityFilterLabel()
      const select = warehouseListFilterTestUtils.getLegalEntitySelect()
      const selectedLegalEntity = warehouseListFilterTestUtils.getSelectedLegalEntity()

      expect(label).toBeInTheDocument()
      expect(select).toBeInTheDocument()
      expect(select).toBeEnabled()
      expect(selectedLegalEntity).not.toBeInTheDocument()
    })

    test('Можно установить значение', async () => {
      const legalEntityCatalogItem = catalogsFixtures.legalEntityCatalogItem()
      mockGetLegalEntitiesSuccess({ body: [legalEntityCatalogItem] })
      mockGetWarehousesSuccess()

      const { user } = render(<WarehousesFilter {...props} />)

      await warehouseListFilterTestUtils.expectLegalEntityLoadingFinished()
      await warehouseListFilterTestUtils.openLegalEntitySelect(user)
      await warehouseListFilterTestUtils.setLegalEntity(user, legalEntityCatalogItem.title)
      const selectedLegalEntity = warehouseListFilterTestUtils.getSelectedLegalEntity()

      expect(selectedLegalEntity).toBeInTheDocument()
      expect(selectedLegalEntity).toHaveTextContent(legalEntityCatalogItem.title)
    })

    test('Можно установить значение по умолчанию', async () => {
      const legalEntityCatalogItem = catalogsFixtures.legalEntityCatalogItem()
      mockGetLegalEntitiesSuccess({ body: [legalEntityCatalogItem] })
      mockGetWarehousesSuccess()

      render(
        <WarehousesFilter {...props} formValues={{ legalEntity: legalEntityCatalogItem.id }} />,
      )

      await warehouseListFilterTestUtils.expectLegalEntityLoadingFinished()
      const selectedLegalEntity = warehouseListFilterTestUtils.getSelectedLegalEntity()

      expect(selectedLegalEntity).toBeInTheDocument()
      expect(selectedLegalEntity).toHaveTextContent(legalEntityCatalogItem.title)
    })

    test('Можно сбросить значение', async () => {
      const legalEntityCatalogItem = catalogsFixtures.legalEntityCatalogItem()
      mockGetLegalEntitiesSuccess({ body: [legalEntityCatalogItem] })
      mockGetWarehousesSuccess()

      const { user } = render(<WarehousesFilter {...props} />)

      await warehouseListFilterTestUtils.expectLegalEntityLoadingFinished()
      await warehouseListFilterTestUtils.openLegalEntitySelect(user)
      await warehouseListFilterTestUtils.setLegalEntity(user, legalEntityCatalogItem.title)
      await warehouseListFilterTestUtils.resetLegalEntity(user)
      const selectedLegalEntity = warehouseListFilterTestUtils.getSelectedLegalEntity()

      expect(selectedLegalEntity).not.toBeInTheDocument()
    })
  })

  describe('Адрес', () => {
    test('Отображается корректно', () => {
      mockGetWarehousesSuccess()
      mockGetLegalEntitiesSuccess()

      render(<WarehousesFilter {...props} />)

      const label = warehouseListFilterTestUtils.getAddressFilterLabel()
      const input = warehouseListFilterTestUtils.getAddressInput()

      expect(label).toBeInTheDocument()
      expect(input).toBeInTheDocument()
      expect(input).toBeEnabled()
      expect(input).not.toHaveValue()
    })

    test('Можно установить значение', async () => {
      mockGetWarehousesSuccess()
      mockGetLegalEntitiesSuccess()

      const { user } = render(<WarehousesFilter {...props} />)

      const value = fakeWord()
      const input = await warehouseListFilterTestUtils.setAddress(user, value)

      expect(input).toHaveDisplayValue(value)
    })

    test('Можно установить значение по умолчанию', () => {
      mockGetWarehousesSuccess()
      mockGetLegalEntitiesSuccess()
      const addressValue = fakeWord()

      render(<WarehousesFilter {...props} formValues={{ address: addressValue }} />)

      const input = warehouseListFilterTestUtils.getAddressInput()
      expect(input).toHaveDisplayValue(addressValue)
    })

    test('Можно сбросить значение', async () => {
      mockGetWarehousesSuccess()
      mockGetLegalEntitiesSuccess()

      const { user } = render(<WarehousesFilter {...props} />)

      const value = fakeWord()
      await warehouseListFilterTestUtils.setAddress(user, value)
      await warehouseListFilterTestUtils.resetAddress(user)
      const input = warehouseListFilterTestUtils.getAddressInput()

      expect(input).not.toHaveDisplayValue(value)
    })
  })

  describe('Родительский склад', () => {
    test('Отображается корректно', async () => {
      mockGetWarehousesSuccess()
      mockGetLegalEntitiesSuccess()

      render(<WarehousesFilter {...props} />)

      await warehouseListFilterTestUtils.expectParentLoadingFinished()
      const label = warehouseListFilterTestUtils.getParentFilterLabel()
      const select = warehouseListFilterTestUtils.getParentSelect()
      const selectedParent = warehouseListFilterTestUtils.getSelectedParent()

      expect(label).toBeInTheDocument()
      expect(select).toBeInTheDocument()
      expect(select).toBeEnabled()
      expect(selectedParent).not.toBeInTheDocument()
    })

    test('Можно установить значение', async () => {
      const warehouseListItem = warehousesFixtures.warehouse()
      mockGetWarehousesSuccess({ body: [warehouseListItem] })
      mockGetLegalEntitiesSuccess()

      const { user } = render(<WarehousesFilter {...props} />)

      await warehouseListFilterTestUtils.expectParentLoadingFinished()
      await warehouseListFilterTestUtils.openParentSelect(user)
      await warehouseListFilterTestUtils.setParent(user, warehouseListItem.title)
      const selectedParent = warehouseListFilterTestUtils.getSelectedParent()

      expect(selectedParent).toBeInTheDocument()
      expect(selectedParent).toHaveTextContent(warehouseListItem.title)
    })

    test('Можно установить значение по умолчанию', async () => {
      const warehouseListItem = warehousesFixtures.warehouse()
      mockGetWarehousesSuccess({ body: [warehouseListItem] })
      mockGetLegalEntitiesSuccess()

      render(<WarehousesFilter {...props} formValues={{ parent: warehouseListItem.id }} />)

      await warehouseListFilterTestUtils.expectParentLoadingFinished()
      const selectedParent = warehouseListFilterTestUtils.getSelectedParent()

      expect(selectedParent).toBeInTheDocument()
      expect(selectedParent).toHaveTextContent(warehouseListItem.title)
    })

    test('Можно сбросить значение', async () => {
      const warehouseListItem = warehousesFixtures.warehouse()
      mockGetWarehousesSuccess({ body: [warehouseListItem] })
      mockGetLegalEntitiesSuccess()

      const { user } = render(<WarehousesFilter {...props} />)

      await warehouseListFilterTestUtils.expectParentLoadingFinished()
      await warehouseListFilterTestUtils.openParentSelect(user)
      await warehouseListFilterTestUtils.setParent(user, warehouseListItem.title)
      await warehouseListFilterTestUtils.resetParent(user)
      const selectedParent = warehouseListFilterTestUtils.getSelectedParent()

      expect(selectedParent).not.toBeInTheDocument()
    })
  })
})
