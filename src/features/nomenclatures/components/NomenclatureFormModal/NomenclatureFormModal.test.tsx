import { within } from '@testing-library/react'

import { validationMessages } from 'shared/constants/validation'

import {
  addModeProps,
  props,
} from '_tests_/features/warehouses/components/NomenclatureFormModal/constants'
import { nomenclatureFormModalTestUtils } from '_tests_/features/warehouses/components/NomenclatureFormModal/testUtils'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import { fakeWord, render } from '_tests_/helpers'

import NomenclatureFormModal from './index'

describe('Модалка создания и редактирования номенклатурной позиции', () => {
  test('Заголовок отображается', () => {
    render(<NomenclatureFormModal {...props} />)
    const title = within(nomenclatureFormModalTestUtils.getContainer()).getByText(props.title)
    expect(title).toBeInTheDocument()
  })

  describe('Кнопка отправки', () => {
    test('Отображается', () => {
      render(<NomenclatureFormModal {...props} />)

      const button = nomenclatureFormModalTestUtils.getSubmitButton(new RegExp(props.okText))

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Можно сделать не активной', () => {
      render(<NomenclatureFormModal {...props} submitBtnDisabled />)
      const button = nomenclatureFormModalTestUtils.getSubmitButton(new RegExp(props.okText))
      expect(button).toBeDisabled()
    })

    test('Обработчик вызывается корректно', async () => {
      const { user } = render(<NomenclatureFormModal {...props} />)

      await nomenclatureFormModalTestUtils.setName(user, fakeWord())
      await nomenclatureFormModalTestUtils.setShortName(user, fakeWord())

      await nomenclatureFormModalTestUtils.openGroupSelect(user)
      await nomenclatureFormModalTestUtils.setGroup(user, props.groups[0].title)

      await nomenclatureFormModalTestUtils.setVendorCode(user, fakeWord())

      await nomenclatureFormModalTestUtils.openMeasurementUnitSelect(user)
      await nomenclatureFormModalTestUtils.setMeasurementUnit(user, props.measurementUnits[0].title)

      await nomenclatureFormModalTestUtils.setEquipmentHasSerialNumber(user)

      await nomenclatureFormModalTestUtils.clickSubmitButton(user, new RegExp(props.okText))

      expect(props.onSubmit).toBeCalledTimes(1)
      expect(props.onSubmit).toBeCalledWith(expect.anything(), expect.anything())
    })

    test('Не отображается во время загрузки номенклатуры', () => {
      render(<NomenclatureFormModal {...props} nomenclatureIsLoading />)
      const button = nomenclatureFormModalTestUtils.querySubmitButton(new RegExp(props.okText))
      expect(button).not.toBeInTheDocument()
    })
  })

  describe('Кнопка отмены', () => {
    test('Отображается корректно', () => {
      render(<NomenclatureFormModal {...props} />)

      const button = nomenclatureFormModalTestUtils.getCancelButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Обработчик вызывается корректно', async () => {
      const { user } = render(<NomenclatureFormModal {...props} />)
      await nomenclatureFormModalTestUtils.clickCancelButton(user)
      expect(props.onCancel).toBeCalledTimes(1)
    })

    test('Не отображается во время загрузки номенклатуры', () => {
      render(<NomenclatureFormModal {...props} nomenclatureIsLoading />)
      const button = nomenclatureFormModalTestUtils.queryCancelButton()
      expect(button).not.toBeInTheDocument()
    })
  })

  describe('Поле названия', () => {
    test('Отображается корректно', () => {
      render(<NomenclatureFormModal {...props} />)

      const label = nomenclatureFormModalTestUtils.getNameLabel()
      const field = nomenclatureFormModalTestUtils.getNameField()

      expect(label).toBeInTheDocument()
      expect(field).toBeInTheDocument()
      expect(field).toBeEnabled()
      expect(field).not.toHaveValue()
    })

    test('Можно установить значение', async () => {
      const { user } = render(<NomenclatureFormModal {...props} />)

      const value = fakeWord()
      const field = await nomenclatureFormModalTestUtils.setName(user, value)

      expect(field).toHaveDisplayValue(value)
    })

    test('Можно установить значение по умолчанию', () => {
      const nomenclature = warehouseFixtures.nomenclature()

      render(<NomenclatureFormModal {...props} nomenclature={nomenclature} />)

      const field = nomenclatureFormModalTestUtils.getNameField()
      expect(field).toHaveDisplayValue(nomenclature.title)
    })

    test('Обязательное поле', async () => {
      const { user } = render(<NomenclatureFormModal {...props} {...addModeProps} />)

      await nomenclatureFormModalTestUtils.clickAddButton(user)

      const error = await nomenclatureFormModalTestUtils.findNameError(validationMessages.required)
      expect(error).toBeInTheDocument()
    })
  })

  describe('Поле краткого названия', () => {
    test('Отображается корректно', () => {
      render(<NomenclatureFormModal {...props} />)

      const label = nomenclatureFormModalTestUtils.getShortNameLabel()
      const field = nomenclatureFormModalTestUtils.getShortNameField()

      expect(label).toBeInTheDocument()
      expect(field).toBeInTheDocument()
      expect(field).toBeEnabled()
      expect(field).not.toHaveValue()
    })

    test('Можно установить значение', async () => {
      const { user } = render(<NomenclatureFormModal {...props} />)

      const value = fakeWord()
      const field = await nomenclatureFormModalTestUtils.setShortName(user, value)

      expect(field).toHaveDisplayValue(value)
    })

    test('Можно установить значение по умолчанию', () => {
      const nomenclature = warehouseFixtures.nomenclature()

      render(<NomenclatureFormModal {...props} nomenclature={nomenclature} />)

      const field = nomenclatureFormModalTestUtils.getShortNameField()
      expect(field).toHaveDisplayValue(nomenclature.shortTitle)
    })

    test('Обязательное поле', async () => {
      const { user } = render(<NomenclatureFormModal {...props} {...addModeProps} />)

      await nomenclatureFormModalTestUtils.clickAddButton(user)

      const error = await nomenclatureFormModalTestUtils.findShortNameError(
        validationMessages.required,
      )
      expect(error).toBeInTheDocument()
    })
  })

  describe('Поле группы', () => {
    test('Отображается корректно', async () => {
      const { user } = render(<NomenclatureFormModal {...props} />)

      const label = nomenclatureFormModalTestUtils.getGroupLabel()
      const field = nomenclatureFormModalTestUtils.getGroupField()
      const selectedGroup = nomenclatureFormModalTestUtils.querySelectedGroup(props.groups[0].title)
      await nomenclatureFormModalTestUtils.openGroupSelect(user)

      expect(label).toBeInTheDocument()
      expect(field).toBeInTheDocument()
      expect(field).toBeEnabled()
      props.groups.forEach((g) => {
        const opt = nomenclatureFormModalTestUtils.getGroupOption(g.title)
        expect(opt).toBeInTheDocument()
      })
      expect(selectedGroup).not.toBeInTheDocument()
    })

    test('Можно установить значение', async () => {
      const { user } = render(<NomenclatureFormModal {...props} />)

      await nomenclatureFormModalTestUtils.openGroupSelect(user)
      await nomenclatureFormModalTestUtils.setGroup(user, props.groups[0].title)
      const selectedGroup = nomenclatureFormModalTestUtils.getSelectedGroup(props.groups[0].title)

      expect(selectedGroup).toBeInTheDocument()
    })

    test('Можно установить значение по умолчанию', async () => {
      const nomenclature = warehouseFixtures.nomenclature()

      render(<NomenclatureFormModal {...props} nomenclature={nomenclature} />)

      const selectedGroup = nomenclatureFormModalTestUtils.getSelectedGroup(
        String(nomenclature.group.id),
      )

      expect(selectedGroup).toBeInTheDocument()
    })

    test('Обязательное поле', async () => {
      const { user } = render(<NomenclatureFormModal {...props} {...addModeProps} />)

      await nomenclatureFormModalTestUtils.clickAddButton(user)
      const error = await nomenclatureFormModalTestUtils.findGroupError(validationMessages.required)

      expect(error).toBeInTheDocument()
    })
  })

  describe('Поле артикула', () => {
    test('Отображается корректно', () => {
      render(<NomenclatureFormModal {...props} />)

      const label = nomenclatureFormModalTestUtils.getVendorCodeLabel()
      const field = nomenclatureFormModalTestUtils.getVendorCodeField()

      expect(label).toBeInTheDocument()
      expect(field).toBeInTheDocument()
      expect(field).toBeEnabled()
      expect(field).not.toHaveValue()
    })

    test('Можно установить значение', async () => {
      const { user } = render(<NomenclatureFormModal {...props} />)

      const value = fakeWord()
      const field = await nomenclatureFormModalTestUtils.setVendorCode(user, value)

      expect(field).toHaveDisplayValue(value)
    })

    test('Можно установить значение по умолчанию', () => {
      const nomenclature = warehouseFixtures.nomenclature()

      render(<NomenclatureFormModal {...props} nomenclature={nomenclature} />)

      const field = nomenclatureFormModalTestUtils.getVendorCodeField()
      expect(field).toHaveDisplayValue(nomenclature.vendorCode)
    })

    test('Обязательное поле', async () => {
      const { user } = render(<NomenclatureFormModal {...props} {...addModeProps} />)

      await nomenclatureFormModalTestUtils.clickAddButton(user)

      const error = await nomenclatureFormModalTestUtils.findVendorCodeError(
        validationMessages.required,
      )
      expect(error).toBeInTheDocument()
    })
  })

  describe('Поле единицы измерения', () => {
    test('Отображается корректно', async () => {
      const { user } = render(<NomenclatureFormModal {...props} />)

      const label = nomenclatureFormModalTestUtils.getMeasurementUnitLabel()
      const field = nomenclatureFormModalTestUtils.getMeasurementUnitField()
      const selectedMeasurementUnit = nomenclatureFormModalTestUtils.querySelectedMeasurementUnit(
        props.measurementUnits[0].title,
      )
      await nomenclatureFormModalTestUtils.openMeasurementUnitSelect(user)

      expect(label).toBeInTheDocument()
      expect(field).toBeInTheDocument()
      expect(field).toBeEnabled()
      props.measurementUnits.forEach((m) => {
        const opt = nomenclatureFormModalTestUtils.getMeasurementUnitOption(m.title)
        expect(opt).toBeInTheDocument()
      })
      expect(selectedMeasurementUnit).not.toBeInTheDocument()
    })

    test('Можно установить значение', async () => {
      const { user } = render(<NomenclatureFormModal {...props} />)

      await nomenclatureFormModalTestUtils.openMeasurementUnitSelect(user)
      await nomenclatureFormModalTestUtils.setMeasurementUnit(user, props.measurementUnits[0].title)
      const selectedMeasurementUnit = nomenclatureFormModalTestUtils.getSelectedMeasurementUnit(
        props.measurementUnits[0].title,
      )

      expect(selectedMeasurementUnit).toBeInTheDocument()
    })

    test('Можно установить значение по умолчанию', () => {
      const nomenclature = warehouseFixtures.nomenclature()

      render(<NomenclatureFormModal {...props} nomenclature={nomenclature} />)

      const selectedMeasurementUnit = nomenclatureFormModalTestUtils.getSelectedMeasurementUnit(
        String(nomenclature.measurementUnit.id),
      )
      expect(selectedMeasurementUnit).toBeInTheDocument()
    })

    test('Обязательное поле', async () => {
      const { user } = render(<NomenclatureFormModal {...props} {...addModeProps} />)

      await nomenclatureFormModalTestUtils.clickAddButton(user)
      const error = await nomenclatureFormModalTestUtils.findMeasurementUnitError(
        validationMessages.required,
      )

      expect(error).toBeInTheDocument()
    })
  })

  describe('Поле страны производителя', () => {
    test('Отображается корректно', async () => {
      const { user } = render(<NomenclatureFormModal {...props} />)

      const label = nomenclatureFormModalTestUtils.getCountryLabel()
      const field = nomenclatureFormModalTestUtils.getCountryField()
      const selectedCountry = nomenclatureFormModalTestUtils.querySelectedCountry(
        props.countries[0].title,
      )
      await nomenclatureFormModalTestUtils.openCountrySelect(user)

      expect(label).toBeInTheDocument()
      expect(field).toBeInTheDocument()
      expect(field).toBeEnabled()
      props.countries.forEach((c) => {
        const opt = nomenclatureFormModalTestUtils.getCountryOption(c.title)
        expect(opt).toBeInTheDocument()
      })
      expect(selectedCountry).not.toBeInTheDocument()
    })

    test('Можно установить значение', async () => {
      const { user } = render(<NomenclatureFormModal {...props} />)

      await nomenclatureFormModalTestUtils.openCountrySelect(user)
      await nomenclatureFormModalTestUtils.setCountry(user, props.countries[0].title)
      const selectedCountry = nomenclatureFormModalTestUtils.getSelectedCountry(
        props.countries[0].title,
      )

      expect(selectedCountry).toBeInTheDocument()
    })

    test('Можно установить значение по умолчанию', () => {
      const nomenclature = warehouseFixtures.nomenclature()

      render(<NomenclatureFormModal {...props} nomenclature={nomenclature} />)

      const selectedCountry = nomenclatureFormModalTestUtils.getSelectedCountry(
        String(nomenclature.country!.id),
      )
      expect(selectedCountry).toBeInTheDocument()
    })
  })

  describe('Поле ведения учета по серийным номерам', () => {
    test('Отображается корректно', () => {
      render(<NomenclatureFormModal {...props} />)

      const field = nomenclatureFormModalTestUtils.getEquipmentHasSerialNumberField()

      expect(field).toBeInTheDocument()
      expect(field).toBeEnabled()
      expect(field).not.toBeChecked()
    })

    test('Можно установить значение', async () => {
      const { user } = render(<NomenclatureFormModal {...props} />)
      const field = await nomenclatureFormModalTestUtils.setEquipmentHasSerialNumber(user)
      expect(field).toBeChecked()
    })
  })
})
