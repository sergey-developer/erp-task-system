import { within } from '@testing-library/react'
import { EquipmentCategoryEnum, EquipmentConditionEnum } from 'features/equipments/api/constants'

import { yesNoOptions } from 'shared/constants/selectField'
import { validationMessages } from 'shared/constants/validation'

import { props } from '_tests_/features/equipment/components/CheckEquipmentFormModal/constants'
import { checkEquipmentFormModalTestUtils as testUtils } from '_tests_/features/equipment/components/CheckEquipmentFormModal/utils'
import currencyFixtures from '_tests_/fixtures/currency'
import macroregionFixtures from '_tests_/fixtures/macroregion'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import { fakeInteger, fakeWord, render } from '_tests_/utils'

import { equipmentConditionDict } from '../../constants'
import CheckEquipmentFormModal from './index'

describe('Модалка проверки оборудования', () => {
  describe('Категория', () => {
    test('Отображается корректно', () => {
      render(<CheckEquipmentFormModal {...props} />)

      const label = within(testUtils.getCategoryFormItem()).getByLabelText('Категория')
      const input = testUtils.getCategorySelectInput()

      expect(label).toBeInTheDocument()
      expect(input).toBeInTheDocument()
      expect(input).toBeEnabled()
    })

    test('Можно установить значение', async () => {
      const category = warehouseFixtures.equipmentCategoryListItem()
      const { user } = render(<CheckEquipmentFormModal {...props} categories={[category]} />)

      await testUtils.openCategorySelect(user)
      await testUtils.setCategory(user, category.title)
      const selectedCategory = testUtils.getSelectedCategory(category.title)

      expect(selectedCategory).toBeInTheDocument()
    })

    test('Показывается ошибка если поле не заполнено', async () => {
      const { user } = render(<CheckEquipmentFormModal {...props} />)

      await testUtils.clickSaveButton(user)
      const error = await testUtils.findCategoryError(validationMessages.required)

      expect(error).toBeInTheDocument()
    })
  })

  describe('Номенклатура', () => {
    test('Отображается корректно', () => {
      render(<CheckEquipmentFormModal {...props} />)

      const label = testUtils.getNomenclatureLabel()
      const input = testUtils.getNomenclatureSelectInput()

      expect(label).toBeInTheDocument()
      expect(input).toBeInTheDocument()
      expect(input).toBeEnabled()
    })

    test('Можно установить значение', async () => {
      const nomenclature = warehouseFixtures.nomenclatureListItem()
      const { user } = render(<CheckEquipmentFormModal {...props} nomenclatures={[nomenclature]} />)

      await testUtils.openNomenclatureSelect(user)
      await testUtils.setNomenclature(user, nomenclature.title)
      const selectedNomenclature = testUtils.getSelectedNomenclature(nomenclature.title)

      expect(selectedNomenclature).toBeInTheDocument()
    })

    test('Показывается ошибка если поле не заполнено', async () => {
      const { user } = render(<CheckEquipmentFormModal {...props} />)

      await testUtils.clickSaveButton(user)
      const error = await testUtils.findNomenclatureError(validationMessages.required)

      expect(error).toBeInTheDocument()
    })
  })

  describe('Наименование', () => {
    test('Отображается корректно', () => {
      render(<CheckEquipmentFormModal {...props} />)

      const label = testUtils.getTitleLabel()
      const field = testUtils.getTitleField()

      expect(label).toBeInTheDocument()
      expect(field).toBeInTheDocument()
      expect(field).toBeEnabled()
      expect(field).not.toHaveValue()
    })

    test('Можно установить значение', async () => {
      const { user } = render(<CheckEquipmentFormModal {...props} />)

      const value = fakeWord()
      const field = await testUtils.setTitle(user, value)

      expect(field).toHaveDisplayValue(value)
    })

    test('Не активно если категория расходный материал', () => {
      const category = warehouseFixtures.equipmentCategoryListItem({
        code: EquipmentCategoryEnum.Consumable,
      })

      render(<CheckEquipmentFormModal {...props} category={category} />)

      const field = testUtils.getTitleField()
      expect(field).toBeDisabled()
    })

    test('Показывается ошибка если поле не заполнено', async () => {
      const { user } = render(<CheckEquipmentFormModal {...props} />)

      await testUtils.clickSaveButton(user)
      const error = await testUtils.findTitleError(validationMessages.required)

      expect(error).toBeInTheDocument()
    })
  })

  describe('Инвентарный номер', () => {
    test('Отображается если категория не расходный материал', () => {
      render(<CheckEquipmentFormModal {...props} />)

      const label = testUtils.getInventoryNumberLabel()
      const field = testUtils.getInventoryNumberField()

      expect(label).toBeInTheDocument()
      expect(field).toBeInTheDocument()
      expect(field).toBeEnabled()
      expect(field).not.toHaveValue()
    })

    test('Не отображается если категория расходный материал', () => {
      const category = warehouseFixtures.equipmentCategoryListItem({
        code: EquipmentCategoryEnum.Consumable,
      })

      render(<CheckEquipmentFormModal {...props} category={category} />)

      const formItem = testUtils.queryInventoryNumberFormItem()
      expect(formItem).not.toBeInTheDocument()
    })

    test('Можно установить значение', async () => {
      const { user } = render(<CheckEquipmentFormModal {...props} />)

      const value = fakeWord()
      const field = await testUtils.setInventoryNumber(user, value)

      expect(field).toHaveDisplayValue(value)
    })
  })

  describe('Серийный номер', () => {
    test('Отображается если условия соблюдены', () => {
      const nomenclature = warehouseFixtures.nomenclature({ equipmentHasSerialNumber: true })

      render(<CheckEquipmentFormModal {...props} nomenclature={nomenclature} />)

      const label = testUtils.getSerialNumberLabel()
      const field = testUtils.getSerialNumberField()

      expect(label).toBeInTheDocument()
      expect(field).toBeInTheDocument()
      expect(field).toBeEnabled()
      expect(field).not.toHaveValue()
    })

    test('Не отображается если у оборудования нет серийного номера', () => {
      render(<CheckEquipmentFormModal {...props} />)

      const formItem = testUtils.querySerialNumberFormItem()
      expect(formItem).not.toBeInTheDocument()
    })

    test('Можно установить значение', async () => {
      const nomenclature = warehouseFixtures.nomenclature({ equipmentHasSerialNumber: true })

      const { user } = render(<CheckEquipmentFormModal {...props} nomenclature={nomenclature} />)

      const value = fakeWord()
      const field = await testUtils.setSerialNumber(user, value)

      expect(field).toHaveDisplayValue(value)
    })

    test('Показывается ошибка если поле не заполнено', async () => {
      const nomenclature = warehouseFixtures.nomenclature({ equipmentHasSerialNumber: true })

      const { user } = render(<CheckEquipmentFormModal {...props} nomenclature={nomenclature} />)

      await testUtils.clickSaveButton(user)
      const error = await testUtils.findSerialNumberError(validationMessages.required)

      expect(error).toBeInTheDocument()
    })
  })

  // describe('Склад', () => {})

  describe('Состояние', () => {
    test('Отображается корректно', () => {
      render(<CheckEquipmentFormModal {...props} />)

      const label = testUtils.getConditionLabel()
      const input = testUtils.getConditionSelectInput()

      expect(label).toBeInTheDocument()
      expect(input).toBeInTheDocument()
      expect(input).toBeEnabled()
    })

    test('Можно установить значение', async () => {
      const { user } = render(<CheckEquipmentFormModal {...props} />)

      const value = equipmentConditionDict[EquipmentConditionEnum.Working]
      await testUtils.openConditionSelect(user)
      await testUtils.setCondition(user, value)
      const selectedCondition = testUtils.getSelectedCondition(value)

      expect(selectedCondition).toBeInTheDocument()
    })

    test('Показывается ошибка если поле не заполнено', async () => {
      const { user } = render(<CheckEquipmentFormModal {...props} />)

      await testUtils.clickSaveButton(user)
      const error = await testUtils.findConditionError(validationMessages.required)

      expect(error).toBeInTheDocument()
    })
  })

  describe('Количество', () => {
    test('Отображается если категория расходный материал', () => {
      const category = warehouseFixtures.equipmentCategoryListItem({
        code: EquipmentCategoryEnum.Consumable,
      })

      render(<CheckEquipmentFormModal {...props} category={category} />)

      const label = testUtils.getQuantityLabel()
      const field = testUtils.getQuantityField()

      expect(label).toBeInTheDocument()
      expect(field).toBeInTheDocument()
      expect(field).toBeEnabled()
      expect(field).not.toHaveValue()
    })

    test('Не отображается если категория не расходный материал', () => {
      render(<CheckEquipmentFormModal {...props} />)

      const formItem = testUtils.queryQuantityFormItem()
      expect(formItem).not.toBeInTheDocument()
    })

    test('Можно установить значение', async () => {
      const category = warehouseFixtures.equipmentCategoryListItem({
        code: EquipmentCategoryEnum.Consumable,
      })

      const { user } = render(<CheckEquipmentFormModal {...props} category={category} />)

      const value = fakeInteger()
      const field = await testUtils.setQuantity(user, value)

      expect(field).toHaveDisplayValue(String(value))
    })

    test('Показывается ошибка если поле не заполнено', async () => {
      const category = warehouseFixtures.equipmentCategoryListItem({
        code: EquipmentCategoryEnum.Consumable,
      })

      const { user } = render(<CheckEquipmentFormModal {...props} category={category} />)

      await testUtils.clickSaveButton(user)
      const error = await testUtils.findQuantityError(validationMessages.required)

      expect(error).toBeInTheDocument()
    })
  })

  describe('Ед.измерения', () => {
    test('Отображается если категория расходный материал', () => {
      const category = warehouseFixtures.equipmentCategoryListItem({
        code: EquipmentCategoryEnum.Consumable,
      })

      render(<CheckEquipmentFormModal {...props} category={category} />)

      const label = testUtils.getMeasurementUnitLabel()
      expect(label).toBeInTheDocument()
    })

    test('Не отображается если категория не расходный материал', () => {
      render(<CheckEquipmentFormModal {...props} />)

      const formItem = testUtils.queryMeasurementUnitFormItem()
      expect(formItem).not.toBeInTheDocument()
    })
  })

  describe('Стоимость', () => {
    test('Отображается корректно', () => {
      render(<CheckEquipmentFormModal {...props} />)

      const label = testUtils.getPriceLabel()
      const field = testUtils.getPriceField()

      expect(label).toBeInTheDocument()
      expect(field).toBeInTheDocument()
      expect(field).toBeEnabled()
      expect(field).not.toHaveValue()
    })

    test('Можно установить значение', async () => {
      const { user } = render(<CheckEquipmentFormModal {...props} />)

      const value = fakeInteger()
      const field = await testUtils.setPrice(user, value)

      expect(field).toHaveDisplayValue(String(value))
    })
  })

  describe('Валюта', () => {
    test('Отображается корректно', () => {
      render(<CheckEquipmentFormModal {...props} />)

      const label = testUtils.getCurrencyLabel()
      const input = testUtils.getCurrencySelectInput()

      expect(label).toBeInTheDocument()
      expect(input).toBeInTheDocument()
      expect(input).toBeEnabled()
    })

    test('Можно установить значение', async () => {
      const currency = currencyFixtures.currencyListItem()

      const { user } = render(<CheckEquipmentFormModal {...props} currencies={[currency]} />)

      await testUtils.openCurrencySelect(user)
      await testUtils.setCurrency(user, currency.title)
      const selectedCurrency = testUtils.getSelectedCurrency(currency.title)

      expect(selectedCurrency).toBeInTheDocument()
    })
  })

  describe('Новое', () => {
    test('Отображается если категория не расходный материал', () => {
      render(<CheckEquipmentFormModal {...props} />)

      yesNoOptions.forEach((opt) => {
        const field = testUtils.getIsNewField(opt.label as string)
        expect(field).toBeInTheDocument()
        expect(field).toBeEnabled()
        expect(field).not.toBeChecked()
      })
    })

    test('Не отображается если категория расходный материал', () => {
      const category = warehouseFixtures.equipmentCategoryListItem({
        code: EquipmentCategoryEnum.Consumable,
      })

      render(<CheckEquipmentFormModal {...props} category={category} />)

      const formItem = testUtils.queryIsNewFormItem()
      expect(formItem).not.toBeInTheDocument()
    })

    test('Можно установить значение', async () => {
      const { user } = render(<CheckEquipmentFormModal {...props} />)

      const field = await testUtils.clickIsNewField(user, yesNoOptions[0].label as string)
      expect(field).toBeChecked()
    })

    test('Показывается ошибка если поле не заполнено', async () => {
      const { user } = render(<CheckEquipmentFormModal {...props} />)

      await testUtils.clickSaveButton(user)

      const error = await testUtils.findIsNewError(validationMessages.required)
      expect(error).toBeInTheDocument()
    })
  })

  describe('На гарантии', () => {
    test('Отображается если категория не расходный материал', () => {
      render(<CheckEquipmentFormModal {...props} />)

      yesNoOptions.forEach((opt) => {
        const field = testUtils.getIsWarrantyField(opt.label as string)
        expect(field).toBeInTheDocument()
        expect(field).toBeEnabled()
        expect(field).not.toBeChecked()
      })
    })

    test('Не отображается если категория расходный материал', () => {
      const category = warehouseFixtures.equipmentCategoryListItem({
        code: EquipmentCategoryEnum.Consumable,
      })

      render(<CheckEquipmentFormModal {...props} category={category} />)

      const formItem = testUtils.queryIsWarrantyFormItem()
      expect(formItem).not.toBeInTheDocument()
    })

    test('Можно установить значение', async () => {
      const { user } = render(<CheckEquipmentFormModal {...props} />)

      const field = await testUtils.clickIsWarrantyField(user, yesNoOptions[0].label as string)
      expect(field).toBeChecked()
    })

    test('Показывается ошибка если поле не заполнено', async () => {
      const { user } = render(<CheckEquipmentFormModal {...props} />)

      await testUtils.clickSaveButton(user)

      const error = await testUtils.findIsWarrantyError(validationMessages.required)
      expect(error).toBeInTheDocument()
    })
  })

  describe('Отремонтированное', () => {
    test('Отображается если категория не расходный материал', () => {
      render(<CheckEquipmentFormModal {...props} />)

      yesNoOptions.forEach((opt) => {
        const field = testUtils.getIsRepairedField(opt.label as string)
        expect(field).toBeInTheDocument()
        expect(field).toBeEnabled()
        expect(field).not.toBeChecked()
      })
    })

    test('Не отображается если категория расходный материал', () => {
      const category = warehouseFixtures.equipmentCategoryListItem({
        code: EquipmentCategoryEnum.Consumable,
      })

      render(<CheckEquipmentFormModal {...props} category={category} />)

      const formItem = testUtils.queryIsRepairedFormItem()
      expect(formItem).not.toBeInTheDocument()
    })

    test('Можно установить значение', async () => {
      const { user } = render(<CheckEquipmentFormModal {...props} />)

      const field = await testUtils.clickIsRepairedField(user, yesNoOptions[0].label as string)
      expect(field).toBeChecked()
    })

    test('Показывается ошибка если поле не заполнено', async () => {
      const { user } = render(<CheckEquipmentFormModal {...props} />)

      await testUtils.clickSaveButton(user)

      const error = await testUtils.findIsRepairedError(validationMessages.required)
      expect(error).toBeInTheDocument()
    })
  })

  describe('Счетчик пробега текущий', () => {
    test('Отображается если категория не расходный материал', () => {
      render(<CheckEquipmentFormModal {...props} />)

      const label = testUtils.getUsageCounterLabel()
      const field = testUtils.getUsageCounterField()

      expect(label).toBeInTheDocument()
      expect(field).toBeInTheDocument()
      expect(field).toBeEnabled()
      expect(field).not.toHaveValue()
    })

    test('Не отображается если категория расходный материал', () => {
      const category = warehouseFixtures.equipmentCategoryListItem({
        code: EquipmentCategoryEnum.Consumable,
      })
      render(<CheckEquipmentFormModal {...props} category={category} />)

      const formItem = testUtils.queryUsageCounterFormItem()
      expect(formItem).not.toBeInTheDocument()
    })

    test('Можно установить значение', async () => {
      const { user } = render(<CheckEquipmentFormModal {...props} />)

      const value = fakeInteger()
      const field = await testUtils.setUsageCounter(user, value)

      expect(field).toHaveDisplayValue(String(value))
    })
  })

  describe('Владелец оборудования', () => {
    test('Отображается если категория не расходный материал и поле "владелец оборудования Obermeister" не заполнено', () => {
      render(<CheckEquipmentFormModal {...props} />)

      const label = testUtils.getOwnerLabel()
      const input = testUtils.getOwnerSelectInput()

      expect(label).toBeInTheDocument()
      expect(input).toBeInTheDocument()
      expect(input).toBeEnabled()
    })

    test('Отображается если категория не расходный материал', () => {
      const categoryListItem = warehouseFixtures.equipmentCategoryListItem({
        code: EquipmentCategoryEnum.Equipment,
      })
      render(<CheckEquipmentFormModal {...props} category={categoryListItem} />)

      const label = testUtils.getOwnerLabel()
      const input = testUtils.getOwnerSelectInput()

      expect(label).toBeInTheDocument()
      expect(input).toBeInTheDocument()
      expect(input).toBeEnabled()
    })

    test('Не отображается если категория расходный материал', () => {
      const category = warehouseFixtures.equipmentCategoryListItem({
        code: EquipmentCategoryEnum.Consumable,
      })
      render(<CheckEquipmentFormModal {...props} category={category} />)

      const formItem = testUtils.queryOwnerFormItem()
      expect(formItem).not.toBeInTheDocument()
    })

    test('Можно установить значение', async () => {
      const owner = warehouseFixtures.customerListItem()
      const { user } = render(<CheckEquipmentFormModal {...props} owners={[owner]} />)

      await testUtils.openOwnerSelect(user)
      await testUtils.setOwner(user, owner.title)
      const selectedOwner = testUtils.getSelectedOwner(owner.title)

      expect(selectedOwner).toBeInTheDocument()
    })
  })

  describe('Макрорегион', () => {
    test('Отображается если выбран владелец оборудования', async () => {
      const owner = warehouseFixtures.customerListItem()
      const { user } = render(<CheckEquipmentFormModal {...props} owners={[owner]} />)

      await testUtils.openOwnerSelect(user)
      await testUtils.setOwner(user, owner.title)
      const label = testUtils.getMacroregionLabel()
      const input = testUtils.getMacroregionSelectInput()

      expect(label).toBeInTheDocument()
      expect(input).toBeInTheDocument()
      expect(input).toBeEnabled()
    })

    test('Не отображается если не выбран владелец оборудования', () => {
      render(<CheckEquipmentFormModal {...props} />)
      const formItem = testUtils.queryMacroregionFormItem()
      expect(formItem).not.toBeInTheDocument()
    })

    test('Можно установить значение', async () => {
      const owner = warehouseFixtures.customerListItem()
      const macroregionListItem = macroregionFixtures.macroregionListItem()

      const { user } = render(
        <CheckEquipmentFormModal
          {...props}
          macroregions={[macroregionListItem]}
          owners={[owner]}
        />,
      )

      await testUtils.openOwnerSelect(user)
      await testUtils.setOwner(user, owner.title)

      await testUtils.openMacroregionSelect(user)
      await testUtils.setMacroregion(user, macroregionListItem.title)
      const selectedOption = testUtils.getSelectedMacroregion(macroregionListItem.title)

      expect(selectedOption).toBeInTheDocument()
    })
  })

  describe('Назначение оборудования', () => {
    test('Отображается корректно', () => {
      render(<CheckEquipmentFormModal {...props} />)

      const label = testUtils.getPurposeLabel()
      const input = testUtils.getPurposeSelectInput()

      expect(label).toBeInTheDocument()
      expect(input).toBeInTheDocument()
      expect(input).toBeEnabled()
    })

    test('Можно установить значение', async () => {
      const workType = warehouseFixtures.workTypeListItem()
      const { user } = render(<CheckEquipmentFormModal {...props} workTypes={[workType]} />)

      await testUtils.openPurposeSelect(user)
      await testUtils.setPurpose(user, workType.title)
      const selectedPurpose = testUtils.getSelectedPurpose(workType.title)

      expect(selectedPurpose).toBeInTheDocument()
    })

    test('Показывается ошибка если поле не заполнено', async () => {
      const { user } = render(<CheckEquipmentFormModal {...props} />)

      await testUtils.clickSaveButton(user)
      const error = await testUtils.findPurposeError(validationMessages.required)

      expect(error).toBeInTheDocument()
    })
  })

  describe('Комментарий', () => {
    test('Отображается корректно', () => {
      render(<CheckEquipmentFormModal {...props} />)

      const label = testUtils.getCommentLabel()
      const field = testUtils.getCommentField()

      expect(label).toBeInTheDocument()
      expect(field).toBeInTheDocument()
      expect(field).toBeEnabled()
      expect(field).not.toHaveValue()
    })

    test('Можно установить значение', async () => {
      const { user } = render(<CheckEquipmentFormModal {...props} />)

      const value = fakeWord()
      const field = await testUtils.setComment(user, value)

      expect(field).toHaveDisplayValue(value)
    })
  })
})
