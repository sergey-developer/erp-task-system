import { within } from '@testing-library/react'
import { EquipmentCategoryEnum, EquipmentConditionEnum } from 'features/equipments/api/constants'
import { equipmentConditionDict } from 'features/equipments/constants'

import { yesNoOptions } from 'shared/constants/selectField'
import { validationMessages } from 'shared/constants/validation'

import {
  addModeProps,
  props,
} from '_tests_/features/warehouses/components/EquipmentFormModal/constants'
import { equipmentFormModalTestUtils } from '_tests_/features/warehouses/components/EquipmentFormModal/testUtils'
import currencyFixtures from '_tests_/fixtures/currencies'
import macroregionFixtures from '_tests_/fixtures/macroregions'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import { fakeInteger, fakeWord, render } from '_tests_/helpers'

import EquipmentFormModal from './index'

describe('Модалка оборудования', () => {
  describe('Категория', () => {
    test('Отображается корректно', () => {
      render(<EquipmentFormModal {...props} />)

      const label = within(equipmentFormModalTestUtils.getCategoryFormItem()).getByLabelText(
        'Категория',
      )
      const input = equipmentFormModalTestUtils.getCategorySelectInput()

      expect(label).toBeInTheDocument()
      expect(input).toBeInTheDocument()
      expect(input).toBeEnabled()
    })

    test('Можно установить значение', async () => {
      const category = warehouseFixtures.equipmentCategoryListItem()
      const { user } = render(<EquipmentFormModal {...props} categories={[category]} />)

      await equipmentFormModalTestUtils.openCategorySelect(user)
      await equipmentFormModalTestUtils.setCategory(user, category.title)
      const selectedCategory = equipmentFormModalTestUtils.getSelectedCategory(category.title)

      expect(selectedCategory).toBeInTheDocument()
    })

    test('Показывается ошибка если поле не заполнено', async () => {
      const { user } = render(<EquipmentFormModal {...props} {...addModeProps} />)

      await equipmentFormModalTestUtils.clickAddButton(user)
      const error = await equipmentFormModalTestUtils.findCategoryError(validationMessages.required)

      expect(error).toBeInTheDocument()
    })
  })

  describe('Номенклатура', () => {
    test('Отображается корректно', () => {
      render(<EquipmentFormModal {...props} />)

      const label = equipmentFormModalTestUtils.getNomenclatureLabel()
      const input = equipmentFormModalTestUtils.getNomenclatureSelectInput()

      expect(label).toBeInTheDocument()
      expect(input).toBeInTheDocument()
      expect(input).toBeEnabled()
    })

    test('Можно установить значение', async () => {
      const nomenclature = warehouseFixtures.nomenclatureListItem()
      const { user } = render(<EquipmentFormModal {...props} nomenclatures={[nomenclature]} />)

      await equipmentFormModalTestUtils.openNomenclatureSelect(user)
      await equipmentFormModalTestUtils.setNomenclature(user, nomenclature.title)
      const selectedNomenclature = equipmentFormModalTestUtils.getSelectedNomenclature(
        nomenclature.title,
      )

      expect(selectedNomenclature).toBeInTheDocument()
    })

    test('Показывается ошибка если поле не заполнено', async () => {
      const { user } = render(<EquipmentFormModal {...props} {...addModeProps} />)

      await equipmentFormModalTestUtils.clickAddButton(user)
      const error = await equipmentFormModalTestUtils.findNomenclatureError(
        validationMessages.required,
      )

      expect(error).toBeInTheDocument()
    })
  })

  describe('Наименование', () => {
    test('Отображается корректно', () => {
      render(<EquipmentFormModal {...props} />)

      const label = equipmentFormModalTestUtils.getTitleLabel()
      const field = equipmentFormModalTestUtils.getTitleField()

      expect(label).toBeInTheDocument()
      expect(field).toBeInTheDocument()
      expect(field).toBeEnabled()
      expect(field).not.toHaveValue()
    })

    test('Можно установить значение', async () => {
      const { user } = render(<EquipmentFormModal {...props} />)

      const value = fakeWord()
      const field = await equipmentFormModalTestUtils.setTitle(user, value)

      expect(field).toHaveDisplayValue(value)
    })

    test('Не активно если категория расходный материал', () => {
      const category = warehouseFixtures.equipmentCategoryListItem({
        code: EquipmentCategoryEnum.Consumable,
      })

      render(<EquipmentFormModal {...props} category={category} />)

      const field = equipmentFormModalTestUtils.getTitleField()
      expect(field).toBeDisabled()
    })

    test('Показывается ошибка если поле не заполнено', async () => {
      const { user } = render(<EquipmentFormModal {...props} {...addModeProps} />)

      await equipmentFormModalTestUtils.clickAddButton(user)
      const error = await equipmentFormModalTestUtils.findTitleError(validationMessages.required)

      expect(error).toBeInTheDocument()
    })
  })

  describe('Инвентарный номер', () => {
    test('Отображается если категория не расходный материал', () => {
      render(<EquipmentFormModal {...props} />)

      const label = equipmentFormModalTestUtils.getInventoryNumberLabel()
      const field = equipmentFormModalTestUtils.getInventoryNumberField()

      expect(label).toBeInTheDocument()
      expect(field).toBeInTheDocument()
      expect(field).toBeEnabled()
      expect(field).not.toHaveValue()
    })

    test('Не отображается если категория расходный материал', () => {
      const category = warehouseFixtures.equipmentCategoryListItem({
        code: EquipmentCategoryEnum.Consumable,
      })

      render(<EquipmentFormModal {...props} category={category} />)

      const formItem = equipmentFormModalTestUtils.queryInventoryNumberFormItem()
      expect(formItem).not.toBeInTheDocument()
    })

    test('Можно установить значение', async () => {
      const { user } = render(<EquipmentFormModal {...props} />)

      const value = fakeWord()
      const field = await equipmentFormModalTestUtils.setInventoryNumber(user, value)

      expect(field).toHaveDisplayValue(value)
    })
  })

  describe('Серийный номер', () => {
    test('Отображается если условия соблюдены', () => {
      const nomenclature = warehouseFixtures.nomenclature({ equipmentHasSerialNumber: true })

      render(<EquipmentFormModal {...props} nomenclature={nomenclature} />)

      const label = equipmentFormModalTestUtils.getSerialNumberLabel()
      const field = equipmentFormModalTestUtils.getSerialNumberField()

      expect(label).toBeInTheDocument()
      expect(field).toBeInTheDocument()
      expect(field).toBeEnabled()
      expect(field).not.toHaveValue()
    })

    test('Не отображается если у оборудования нет серийного номера', () => {
      render(<EquipmentFormModal {...props} />)

      const formItem = equipmentFormModalTestUtils.querySerialNumberFormItem()
      expect(formItem).not.toBeInTheDocument()
    })

    test('Можно установить значение', async () => {
      const nomenclature = warehouseFixtures.nomenclature({ equipmentHasSerialNumber: true })

      const { user } = render(<EquipmentFormModal {...props} nomenclature={nomenclature} />)

      const value = fakeWord()
      const field = await equipmentFormModalTestUtils.setSerialNumber(user, value)

      expect(field).toHaveDisplayValue(value)
    })

    test('Показывается ошибка если поле не заполнено', async () => {
      const nomenclature = warehouseFixtures.nomenclature({ equipmentHasSerialNumber: true })

      const { user } = render(
        <EquipmentFormModal {...props} {...addModeProps} nomenclature={nomenclature} />,
      )

      await equipmentFormModalTestUtils.clickAddButton(user)
      const error = await equipmentFormModalTestUtils.findSerialNumberError(
        validationMessages.required,
      )

      expect(error).toBeInTheDocument()
    })
  })

  // describe('Склад', () => {})

  describe('Состояние', () => {
    test('Отображается корректно', () => {
      render(<EquipmentFormModal {...props} />)

      const label = equipmentFormModalTestUtils.getConditionLabel()
      const input = equipmentFormModalTestUtils.getConditionSelectInput()

      expect(label).toBeInTheDocument()
      expect(input).toBeInTheDocument()
      expect(input).toBeEnabled()
    })

    test('Можно установить значение', async () => {
      const { user } = render(<EquipmentFormModal {...props} />)

      const value = equipmentConditionDict[EquipmentConditionEnum.Working]
      await equipmentFormModalTestUtils.openConditionSelect(user)
      await equipmentFormModalTestUtils.setCondition(user, value)
      const selectedCondition = equipmentFormModalTestUtils.getSelectedCondition(value)

      expect(selectedCondition).toBeInTheDocument()
    })

    test('Показывается ошибка если поле не заполнено', async () => {
      const { user } = render(<EquipmentFormModal {...props} {...addModeProps} />)

      await equipmentFormModalTestUtils.clickAddButton(user)
      const error = await equipmentFormModalTestUtils.findConditionError(
        validationMessages.required,
      )

      expect(error).toBeInTheDocument()
    })
  })

  describe('Количество', () => {
    describe('Режим создания', () => {
      test('Отображается если категория расходный материал', () => {
        const category = warehouseFixtures.equipmentCategoryListItem({
          code: EquipmentCategoryEnum.Consumable,
        })

        render(<EquipmentFormModal {...props} category={category} />)

        const label = equipmentFormModalTestUtils.getQuantityLabel()
        const field = equipmentFormModalTestUtils.getQuantityField()

        expect(label).toBeInTheDocument()
        expect(field).toBeInTheDocument()
        expect(field).toBeEnabled()
        expect(field).not.toHaveValue()
      })

      test('Не отображается если категория не расходный материал', () => {
        render(<EquipmentFormModal {...props} />)

        const formItem = equipmentFormModalTestUtils.queryQuantityFormItem()
        expect(formItem).not.toBeInTheDocument()
      })

      test('Можно установить значение', async () => {
        const category = warehouseFixtures.equipmentCategoryListItem({
          code: EquipmentCategoryEnum.Consumable,
        })

        const { user } = render(<EquipmentFormModal {...props} category={category} />)

        const value = fakeInteger()
        const field = await equipmentFormModalTestUtils.setQuantity(user, value)

        expect(field).toHaveDisplayValue(String(value))
      })

      test('Показывается ошибка если поле не заполнено', async () => {
        const category = warehouseFixtures.equipmentCategoryListItem({
          code: EquipmentCategoryEnum.Consumable,
        })

        const { user } = render(
          <EquipmentFormModal {...props} category={category} {...addModeProps} />,
        )

        await equipmentFormModalTestUtils.clickAddButton(user)
        const error = await equipmentFormModalTestUtils.findQuantityError(
          validationMessages.required,
        )

        expect(error).toBeInTheDocument()
      })
    })

    describe('Режим редактирования', () => {
      test('Отображается если категория расходный материал', () => {
        const category = warehouseFixtures.equipmentCategoryListItem({
          code: EquipmentCategoryEnum.Consumable,
        })

        render(<EquipmentFormModal {...props} category={category} mode='edit' />)

        const label = equipmentFormModalTestUtils.getQuantityLabel()
        const field = equipmentFormModalTestUtils.getQuantityField()

        expect(label).toBeInTheDocument()
        expect(field).toBeInTheDocument()
        expect(field).toBeDisabled()
        expect(field).not.toHaveValue()
      })

      test('Не отображается если категория не расходный материал', () => {
        render(<EquipmentFormModal {...props} mode='edit' />)
        const formItem = equipmentFormModalTestUtils.queryQuantityFormItem()
        expect(formItem).not.toBeInTheDocument()
      })
    })
  })

  describe('Ед.измерения', () => {
    test('Отображается если категория расходный материал', () => {
      const category = warehouseFixtures.equipmentCategoryListItem({
        code: EquipmentCategoryEnum.Consumable,
      })

      render(<EquipmentFormModal {...props} category={category} />)

      const label = equipmentFormModalTestUtils.getMeasurementUnitLabel()
      expect(label).toBeInTheDocument()
    })

    test('Не отображается если категория не расходный материал', () => {
      render(<EquipmentFormModal {...props} />)

      const formItem = equipmentFormModalTestUtils.queryMeasurementUnitFormItem()
      expect(formItem).not.toBeInTheDocument()
    })
  })

  describe('Стоимость', () => {
    test('Отображается корректно', () => {
      render(<EquipmentFormModal {...props} />)

      const label = equipmentFormModalTestUtils.getPriceLabel()
      const field = equipmentFormModalTestUtils.getPriceField()

      expect(label).toBeInTheDocument()
      expect(field).toBeInTheDocument()
      expect(field).toBeEnabled()
      expect(field).not.toHaveValue()
    })

    test('Можно установить значение', async () => {
      const { user } = render(<EquipmentFormModal {...props} />)

      const value = fakeInteger()
      const field = await equipmentFormModalTestUtils.setPrice(user, value)

      expect(field).toHaveDisplayValue(String(value))
    })
  })

  describe('Валюта', () => {
    test('Отображается корректно', () => {
      render(<EquipmentFormModal {...props} />)

      const label = equipmentFormModalTestUtils.getCurrencyLabel()
      const input = equipmentFormModalTestUtils.getCurrencySelectInput()

      expect(label).toBeInTheDocument()
      expect(input).toBeInTheDocument()
      expect(input).toBeEnabled()
    })

    test('Можно установить значение', async () => {
      const currency = currencyFixtures.currency()

      const { user } = render(<EquipmentFormModal {...props} currencies={[currency]} />)

      await equipmentFormModalTestUtils.openCurrencySelect(user)
      await equipmentFormModalTestUtils.setCurrency(user, currency.title)
      const selectedCurrency = equipmentFormModalTestUtils.getSelectedCurrency(currency.title)

      expect(selectedCurrency).toBeInTheDocument()
    })
  })

  describe('Новое', () => {
    test('Отображается если категория не расходный материал', () => {
      render(<EquipmentFormModal {...props} />)

      yesNoOptions.forEach((opt) => {
        const field = equipmentFormModalTestUtils.getIsNewField(opt.label as string)
        expect(field).toBeInTheDocument()
        expect(field).toBeEnabled()
        expect(field).not.toBeChecked()
      })
    })

    test('Не отображается если категория расходный материал', () => {
      const category = warehouseFixtures.equipmentCategoryListItem({
        code: EquipmentCategoryEnum.Consumable,
      })

      render(<EquipmentFormModal {...props} category={category} />)

      const formItem = equipmentFormModalTestUtils.queryIsNewFormItem()
      expect(formItem).not.toBeInTheDocument()
    })

    test('Можно установить значение', async () => {
      const { user } = render(<EquipmentFormModal {...props} />)

      const field = await equipmentFormModalTestUtils.clickIsNewField(
        user,
        yesNoOptions[0].label as string,
      )
      expect(field).toBeChecked()
    })

    test('Показывается ошибка если поле не заполнено', async () => {
      const { user } = render(<EquipmentFormModal {...props} {...addModeProps} />)

      await equipmentFormModalTestUtils.clickAddButton(user)

      const error = await equipmentFormModalTestUtils.findIsNewError(validationMessages.required)
      expect(error).toBeInTheDocument()
    })
  })

  describe('На гарантии', () => {
    test('Отображается если категория не расходный материал', () => {
      render(<EquipmentFormModal {...props} />)

      yesNoOptions.forEach((opt) => {
        const field = equipmentFormModalTestUtils.getIsWarrantyField(opt.label as string)
        expect(field).toBeInTheDocument()
        expect(field).toBeEnabled()
        expect(field).not.toBeChecked()
      })
    })

    test('Не отображается если категория расходный материал', () => {
      const category = warehouseFixtures.equipmentCategoryListItem({
        code: EquipmentCategoryEnum.Consumable,
      })

      render(<EquipmentFormModal {...props} category={category} />)

      const formItem = equipmentFormModalTestUtils.queryIsWarrantyFormItem()
      expect(formItem).not.toBeInTheDocument()
    })

    test('Можно установить значение', async () => {
      const { user } = render(<EquipmentFormModal {...props} />)

      const field = await equipmentFormModalTestUtils.clickIsWarrantyField(
        user,
        yesNoOptions[0].label as string,
      )
      expect(field).toBeChecked()
    })

    test('Показывается ошибка если поле не заполнено', async () => {
      const { user } = render(<EquipmentFormModal {...props} {...addModeProps} />)

      await equipmentFormModalTestUtils.clickAddButton(user)

      const error = await equipmentFormModalTestUtils.findIsWarrantyError(
        validationMessages.required,
      )
      expect(error).toBeInTheDocument()
    })
  })

  describe('Отремонтированное', () => {
    test('Отображается если категория не расходный материал', () => {
      render(<EquipmentFormModal {...props} />)

      yesNoOptions.forEach((opt) => {
        const field = equipmentFormModalTestUtils.getIsRepairedField(opt.label as string)
        expect(field).toBeInTheDocument()
        expect(field).toBeEnabled()
        expect(field).not.toBeChecked()
      })
    })

    test('Не отображается если категория расходный материал', () => {
      const category = warehouseFixtures.equipmentCategoryListItem({
        code: EquipmentCategoryEnum.Consumable,
      })

      render(<EquipmentFormModal {...props} category={category} />)

      const formItem = equipmentFormModalTestUtils.queryIsRepairedFormItem()
      expect(formItem).not.toBeInTheDocument()
    })

    test('Можно установить значение', async () => {
      const { user } = render(<EquipmentFormModal {...props} />)

      const field = await equipmentFormModalTestUtils.clickIsRepairedField(
        user,
        yesNoOptions[0].label as string,
      )
      expect(field).toBeChecked()
    })

    test('Показывается ошибка если поле не заполнено', async () => {
      const { user } = render(<EquipmentFormModal {...props} {...addModeProps} />)

      await equipmentFormModalTestUtils.clickAddButton(user)

      const error = await equipmentFormModalTestUtils.findIsRepairedError(
        validationMessages.required,
      )
      expect(error).toBeInTheDocument()
    })
  })

  describe('Счетчик пробега текущий', () => {
    test('Отображается если категория не расходный материал', () => {
      render(<EquipmentFormModal {...props} />)

      const label = equipmentFormModalTestUtils.getUsageCounterLabel()
      const field = equipmentFormModalTestUtils.getUsageCounterField()

      expect(label).toBeInTheDocument()
      expect(field).toBeInTheDocument()
      expect(field).toBeEnabled()
      expect(field).not.toHaveValue()
    })

    test('Не отображается если категория расходный материал', () => {
      const category = warehouseFixtures.equipmentCategoryListItem({
        code: EquipmentCategoryEnum.Consumable,
      })
      render(<EquipmentFormModal {...props} category={category} />)

      const formItem = equipmentFormModalTestUtils.queryUsageCounterFormItem()
      expect(formItem).not.toBeInTheDocument()
    })

    test('Можно установить значение', async () => {
      const { user } = render(<EquipmentFormModal {...props} />)

      const value = fakeInteger()
      const field = await equipmentFormModalTestUtils.setUsageCounter(user, value)

      expect(field).toHaveDisplayValue(String(value))
    })
  })

  describe('Владелец оборудования - Obermeister', () => {
    test('Отображается если категория не расходный материал', () => {
      render(<EquipmentFormModal {...props} />)

      yesNoOptions.forEach((opt) => {
        const field = equipmentFormModalTestUtils.getOwnerIsObermeisterField(opt.label as string)
        expect(field).toBeInTheDocument()
        expect(field).toBeEnabled()
        expect(field).not.toBeChecked()
      })
    })

    test('Не отображается если категория расходный материал', () => {
      const category = warehouseFixtures.equipmentCategoryListItem({
        code: EquipmentCategoryEnum.Consumable,
      })

      render(<EquipmentFormModal {...props} category={category} />)

      const formItem = equipmentFormModalTestUtils.queryOwnerIsObermeisterFormItem()
      expect(formItem).not.toBeInTheDocument()
    })

    test('Можно установить значение', async () => {
      const { user } = render(<EquipmentFormModal {...props} />)
      const field = await equipmentFormModalTestUtils.clickOwnerIsObermeisterField(
        user,
        yesNoOptions[0].label as string,
      )
      expect(field).toBeChecked()
    })
  })

  describe('Владелец оборудования', () => {
    test('Отображается если категория не расходный материал и поле "владелец оборудования Obermeister" не заполнено', () => {
      render(<EquipmentFormModal {...props} />)

      const label = equipmentFormModalTestUtils.getOwnerLabel()
      const input = equipmentFormModalTestUtils.getOwnerSelectInput()

      expect(label).toBeInTheDocument()
      expect(input).toBeInTheDocument()
      expect(input).toBeEnabled()
    })

    test('Отображается если категория не расходный материал и в поле "владелец оборудования Obermeister" выбрано "Нет"', async () => {
      const { user } = render(<EquipmentFormModal {...props} />)

      await equipmentFormModalTestUtils.clickOwnerIsObermeisterField(user, 'Нет')
      const label = equipmentFormModalTestUtils.getOwnerLabel()
      const input = equipmentFormModalTestUtils.getOwnerSelectInput()

      expect(label).toBeInTheDocument()
      expect(input).toBeInTheDocument()
      expect(input).toBeEnabled()
    })

    test('Не отображается если категория расходный материал', () => {
      const category = warehouseFixtures.equipmentCategoryListItem({
        code: EquipmentCategoryEnum.Consumable,
      })
      render(<EquipmentFormModal {...props} category={category} />)

      const formItem = equipmentFormModalTestUtils.queryOwnerFormItem()
      expect(formItem).not.toBeInTheDocument()
    })

    test('Не отображается если в поле "владелец оборудования Obermeister" выбрано "Да"', async () => {
      const { user } = render(<EquipmentFormModal {...props} />)

      await equipmentFormModalTestUtils.clickOwnerIsObermeisterField(user, 'Да')
      const formItem = equipmentFormModalTestUtils.queryOwnerFormItem()

      expect(formItem).not.toBeInTheDocument()
    })

    test('Можно установить значение', async () => {
      const owner = warehouseFixtures.customerListItem()
      const { user } = render(<EquipmentFormModal {...props} owners={[owner]} />)

      await equipmentFormModalTestUtils.openOwnerSelect(user)
      await equipmentFormModalTestUtils.setOwner(user, owner.title)
      const selectedOwner = equipmentFormModalTestUtils.getSelectedOwner(owner.title)

      expect(selectedOwner).toBeInTheDocument()
    })

    test('Обязательно для заполнения если в поле "владелец оборудования Obermeister" выбрано "Нет"', async () => {
      const { user } = render(<EquipmentFormModal {...props} {...addModeProps} />)

      await equipmentFormModalTestUtils.clickOwnerIsObermeisterField(user, 'Нет')
      await equipmentFormModalTestUtils.clickAddButton(user)
      const notification = await equipmentFormModalTestUtils.findOwnerError(
        validationMessages.required,
      )

      expect(notification).toBeInTheDocument()
    })
  })

  describe('Макрорегион', () => {
    test('Отображается если выбран владелец оборудования', async () => {
      const owner = warehouseFixtures.customerListItem()
      const { user } = render(<EquipmentFormModal {...props} owners={[owner]} />)

      await equipmentFormModalTestUtils.openOwnerSelect(user)
      await equipmentFormModalTestUtils.setOwner(user, owner.title)
      const label = equipmentFormModalTestUtils.getMacroregionLabel()
      const input = equipmentFormModalTestUtils.getMacroregionSelectInput()

      expect(label).toBeInTheDocument()
      expect(input).toBeInTheDocument()
      expect(input).toBeEnabled()
    })

    test('Не отображается если не выбран владелец оборудования', () => {
      render(<EquipmentFormModal {...props} />)
      const formItem = equipmentFormModalTestUtils.queryMacroregionFormItem()
      expect(formItem).not.toBeInTheDocument()
    })

    test('Можно установить значение', async () => {
      const owner = warehouseFixtures.customerListItem()
      const macroregion = macroregionFixtures.macroregion()

      const { user } = render(
        <EquipmentFormModal {...props} macroregions={[macroregion]} owners={[owner]} />,
      )

      await equipmentFormModalTestUtils.openOwnerSelect(user)
      await equipmentFormModalTestUtils.setOwner(user, owner.title)

      await equipmentFormModalTestUtils.openMacroregionSelect(user)
      await equipmentFormModalTestUtils.setMacroregion(user, macroregion.title)
      const selectedOption = equipmentFormModalTestUtils.getSelectedMacroregion(macroregion.title)

      expect(selectedOption).toBeInTheDocument()
    })

    test('Обязательно для заполнения если в поле "владелец оборудования Obermeister" выбрано "Нет"', async () => {
      const owner = warehouseFixtures.customerListItem()

      const { user } = render(<EquipmentFormModal {...props} owners={[owner]} {...addModeProps} />)

      await equipmentFormModalTestUtils.clickOwnerIsObermeisterField(user, 'Нет')
      await equipmentFormModalTestUtils.openOwnerSelect(user)
      await equipmentFormModalTestUtils.setOwner(user, owner.title)
      await equipmentFormModalTestUtils.clickAddButton(user)
      const error = await equipmentFormModalTestUtils.findMacroregionError(
        validationMessages.required,
      )

      expect(error).toBeInTheDocument()
    })
  })

  describe('Назначение оборудования', () => {
    test('Отображается корректно', () => {
      render(<EquipmentFormModal {...props} />)

      const label = equipmentFormModalTestUtils.getPurposeLabel()
      const input = equipmentFormModalTestUtils.getPurposeSelectInput()

      expect(label).toBeInTheDocument()
      expect(input).toBeInTheDocument()
      expect(input).toBeEnabled()
    })

    test('Можно установить значение', async () => {
      const workType = warehouseFixtures.workTypeListItem()
      const { user } = render(<EquipmentFormModal {...props} workTypes={[workType]} />)

      await equipmentFormModalTestUtils.openPurposeSelect(user)
      await equipmentFormModalTestUtils.setPurpose(user, workType.title)
      const selectedPurpose = equipmentFormModalTestUtils.getSelectedPurpose(workType.title)

      expect(selectedPurpose).toBeInTheDocument()
    })

    test('Показывается ошибка если поле не заполнено', async () => {
      const { user } = render(<EquipmentFormModal {...props} {...addModeProps} />)

      await equipmentFormModalTestUtils.clickAddButton(user)
      const error = await equipmentFormModalTestUtils.findPurposeError(validationMessages.required)

      expect(error).toBeInTheDocument()
    })
  })

  describe('Комментарий', () => {
    test('Отображается корректно', () => {
      render(<EquipmentFormModal {...props} />)

      const label = equipmentFormModalTestUtils.getCommentLabel()
      const field = equipmentFormModalTestUtils.getCommentField()

      expect(label).toBeInTheDocument()
      expect(field).toBeInTheDocument()
      expect(field).toBeEnabled()
      expect(field).not.toHaveValue()
    })

    test('Можно установить значение', async () => {
      const { user } = render(<EquipmentFormModal {...props} />)

      const value = fakeWord()
      const field = await equipmentFormModalTestUtils.setComment(user, value)

      expect(field).toHaveDisplayValue(value)
    })
  })

  describe('Изображения оборудования', () => {
    test('Кнопка и заголовок отображаются', async () => {
      render(<EquipmentFormModal {...props} />)

      const label = equipmentFormModalTestUtils.getImagesLabel()
      const button = equipmentFormModalTestUtils.getAddImagesButton()

      expect(label).toBeInTheDocument()
      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Загрузка работает корректно', async () => {
      const { user } = render(<EquipmentFormModal {...props} />)

      const { input, file } = await equipmentFormModalTestUtils.setImage(user)
      const uploadedImage = equipmentFormModalTestUtils.getUploadedImage(file.name)

      expect(input.files!.item(0)).toBe(file)
      expect(input.files).toHaveLength(1)
      expect(uploadedImage).toBeInTheDocument()
      expect(props.onUploadImage).toBeCalledTimes(1)
      expect(props.onUploadImage).toBeCalledWith(expect.anything())
    })

    test('Удаление работает корректно', async () => {
      const { user } = render(<EquipmentFormModal {...props} />)

      await equipmentFormModalTestUtils.setImage(user)
      await equipmentFormModalTestUtils.clickDeleteImageButton(user)

      expect(props.onDeleteImage).toBeCalledTimes(1)
      expect(props.onDeleteImage).toBeCalledWith(expect.anything())
    })

    test('Кнопка и зона загрузки не активны во время загрузки', () => {
      render(<EquipmentFormModal {...props} isLoading />)

      const button = equipmentFormModalTestUtils.getAddImagesButton()
      const input = equipmentFormModalTestUtils.getAddImagesInput()

      expect(button).toBeDisabled()
      expect(input).toBeDisabled()
    })

    test('Зона загрузки не активна во время удаления изображения', () => {
      render(<EquipmentFormModal {...props} imageIsDeleting />)

      const input = equipmentFormModalTestUtils.getAddImagesInput()
      expect(input).toBeDisabled()
    })
  })
})
