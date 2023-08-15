import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { validationMessages } from 'shared/constants/validation'
import { MaybeNull } from 'shared/types/utils'

import warehouseFixtures from 'fixtures/warehouse'

import {
  clickSelectOption,
  expectLoadingFinishedBySelect,
  expectLoadingStartedBySelect,
  fakeWord,
  getButtonIn,
  getSelect,
  getSelectOption,
  openSelect,
  queryButtonIn,
  render,
} from '_tests_/utils'

import AddOrEditNomenclatureModal from './index'
import { AddOrEditNomenclatureModalProps } from './types'

const props: AddOrEditNomenclatureModalProps = {
  visible: true,
  isLoading: false,

  nomenclature: undefined,
  nomenclatureIsLoading: false,

  groups: [warehouseFixtures.nomenclatureGroupListItem()],
  groupsIsLoading: false,

  countries: [warehouseFixtures.countryListItem()],
  countriesIsLoading: false,

  measurementUnits: [warehouseFixtures.measurementUnitListItem()],
  measurementUnitsIsLoading: false,
  title: fakeWord(),
  okText: fakeWord(),
  onCancel: jest.fn(),
  onSubmit: jest.fn(),
}

const addModeProps: Pick<AddOrEditNomenclatureModalProps, 'okText'> = {
  okText: 'Добавить',
}

const editModeProps: Pick<AddOrEditNomenclatureModalProps, 'okText'> = {
  okText: 'Сохранить',
}

const getContainer = () => screen.getByTestId('add-or-edit-nomenclature-modal')

const findContainer = (): Promise<HTMLElement> =>
  screen.findByTestId('add-or-edit-nomenclature-modal')

// name field
const getNameFormItem = () =>
  within(getContainer()).getByTestId('name-form-item')

const getNameLabel = () =>
  within(getNameFormItem()).getByLabelText('Наименование')

const getNameField = () =>
  within(getNameFormItem()).getByPlaceholderText('Введите наименование')

const setName = async (user: UserEvent, value: string) => {
  const field = getNameField()
  await user.type(field, value)
  return field
}

const findNameError = (error: string): Promise<HTMLElement> =>
  within(getNameFormItem()).findByText(error)

// short name field
const getShortNameFormItem = () =>
  within(getContainer()).getByTestId('short-name-form-item')

const getShortNameLabel = () =>
  within(getShortNameFormItem()).getByLabelText('Краткое наименование')

const getShortNameField = () =>
  within(getShortNameFormItem()).getByPlaceholderText(
    'Введите краткое наименование',
  )

const setShortName = async (user: UserEvent, value: string) => {
  const field = getShortNameField()
  await user.type(field, value)
  return field
}

const findShortNameError = (error: string): Promise<HTMLElement> =>
  within(getShortNameFormItem()).findByText(error)

// group field
const getGroupFormItem = () =>
  within(getContainer()).getByTestId('group-form-item')

const getGroupLabel = () => within(getGroupFormItem()).getByLabelText('Группа')

const getGroupField = (opened?: boolean) =>
  getSelect(getGroupFormItem(), { name: 'Группа', expanded: opened })

const setGroup = clickSelectOption

const getGroupOption = getSelectOption

const getSelectedGroup = (value: string): HTMLElement =>
  within(getGroupFormItem()).getByTitle(value)

const querySelectedGroup = (value: string): MaybeNull<HTMLElement> =>
  within(getGroupFormItem()).queryByTitle(value)

const openGroupSelect = async (user: UserEvent) => {
  await openSelect(user, getGroupFormItem())
}

const findGroupError = (error: string): Promise<HTMLElement> =>
  within(getGroupFormItem()).findByText(error)

const expectGroupLoadingStarted = () =>
  expectLoadingStartedBySelect(getGroupFormItem())

const expectGroupLoadingFinished = () =>
  expectLoadingFinishedBySelect(getGroupFormItem())

// vendor code field
const getVendorCodeFormItem = () =>
  within(getContainer()).getByTestId('vendor-code-form-item')

const getVendorCodeLabel = () =>
  within(getVendorCodeFormItem()).getByLabelText('Артикул')

const getVendorCodeField = () =>
  within(getVendorCodeFormItem()).getByPlaceholderText('Введите артикул')

const setVendorCode = async (user: UserEvent, value: string) => {
  const field = getVendorCodeField()
  await user.type(field, value)
  return field
}

const findVendorCodeError = (error: string): Promise<HTMLElement> =>
  within(getVendorCodeFormItem()).findByText(error)

// measurement unit field
const getMeasurementUnitFormItem = () =>
  within(getContainer()).getByTestId('measurement-unit-form-item')

const getMeasurementUnitLabel = () =>
  within(getMeasurementUnitFormItem()).getByLabelText('Единица измерения')

const getMeasurementUnitField = (opened?: boolean) =>
  getSelect(getMeasurementUnitFormItem(), {
    name: 'Единица измерения',
    expanded: opened,
  })

const setMeasurementUnit = clickSelectOption

const getMeasurementUnitOption = getSelectOption

const getSelectedMeasurementUnit = (value: string): HTMLElement =>
  within(getMeasurementUnitFormItem()).getByTitle(value)

const querySelectedMeasurementUnit = (value: string): MaybeNull<HTMLElement> =>
  within(getMeasurementUnitFormItem()).queryByTitle(value)

const openMeasurementUnitSelect = async (user: UserEvent) => {
  await openSelect(user, getMeasurementUnitFormItem())
}

const findMeasurementUnitError = (error: string): Promise<HTMLElement> =>
  within(getMeasurementUnitFormItem()).findByText(error)

const expectMeasurementUnitLoadingStarted = () =>
  expectLoadingStartedBySelect(getMeasurementUnitFormItem())

const expectMeasurementUnitLoadingFinished = () =>
  expectLoadingFinishedBySelect(getMeasurementUnitFormItem())

// country field
const getCountryFormItem = () =>
  within(getContainer()).getByTestId('country-form-item')

const getCountryLabel = () =>
  within(getCountryFormItem()).getByLabelText('Страна производитель')

const getCountryField = (opened?: boolean) =>
  getSelect(getCountryFormItem(), {
    name: 'Страна производитель',
    expanded: opened,
  })

const setCountry = clickSelectOption

const getCountryOption = getSelectOption

const getSelectedCountry = (value: string): HTMLElement =>
  within(getCountryFormItem()).getByTitle(value)

const querySelectedCountry = (value: string): MaybeNull<HTMLElement> =>
  within(getCountryFormItem()).queryByTitle(value)

const openCountrySelect = async (user: UserEvent) => {
  await openSelect(user, getCountryFormItem())
}

const findCountryError = (error: string): Promise<HTMLElement> =>
  within(getCountryFormItem()).findByText(error)

const expectCountryLoadingStarted = () =>
  expectLoadingStartedBySelect(getCountryFormItem())

const expectCountryLoadingFinished = () =>
  expectLoadingFinishedBySelect(getCountryFormItem())

// add button
const getAddButton = () =>
  getButtonIn(getContainer(), new RegExp(addModeProps.okText))

const queryAddButton = () =>
  queryButtonIn(getContainer(), new RegExp(addModeProps.okText))

const clickAddButton = async (user: UserEvent) => {
  const button = getAddButton()
  await user.click(button)
}

// close button
const getCancelButton = () => getButtonIn(getContainer(), /Отменить/)

const queryCancelButton = () => queryButtonIn(getContainer(), /Отменить/)

const clickCancelButton = async (user: UserEvent) => {
  const button = getCancelButton()
  await user.click(button)
}

export const testUtils = {
  getContainer,
  findContainer,

  getAddButton,
  queryAddButton,
  clickAddButton,

  getCancelButton,
  queryCancelButton,
  clickCancelButton,

  getNameFormItem,
  getNameLabel,
  getNameField,
  setName,
  findNameError,

  getShortNameFormItem,
  getShortNameLabel,
  getShortNameField,
  setShortName,
  findShortNameError,

  getGroupFormItem,
  getGroupLabel,
  getGroupField,
  setGroup,
  getGroupOption,
  getSelectedGroup,
  querySelectedGroup,
  openGroupSelect,
  findGroupError,
  expectGroupLoadingStarted,
  expectGroupLoadingFinished,

  getVendorCodeFormItem,
  getVendorCodeLabel,
  getVendorCodeField,
  setVendorCode,
  findVendorCodeError,

  getMeasurementUnitFormItem,
  getMeasurementUnitLabel,
  getMeasurementUnitField,
  setMeasurementUnit,
  getMeasurementUnitOption,
  getSelectedMeasurementUnit,
  querySelectedMeasurementUnit,
  openMeasurementUnitSelect,
  findMeasurementUnitError,
  expectMeasurementUnitLoadingStarted,
  expectMeasurementUnitLoadingFinished,

  getCountryFormItem,
  getCountryLabel,
  getCountryField,
  setCountry,
  getCountryOption,
  getSelectedCountry,
  querySelectedCountry,
  openCountrySelect,
  findCountryError,
  expectCountryLoadingStarted,
  expectCountryLoadingFinished,
}

describe('Модалка создания и редактирования номенклатурной позиции', () => {
  test('Заголовок отображается', () => {
    render(<AddOrEditNomenclatureModal {...props} />)
    const title = within(getContainer()).getByText(props.title)
    expect(title).toBeInTheDocument()
  })

  describe('Кнопка создания', () => {
    test('Отображается корректно', () => {
      render(<AddOrEditNomenclatureModal {...props} {...addModeProps} />)

      const button = testUtils.getAddButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Обработчик вызывается корректно', async () => {
      const { user } = render(
        <AddOrEditNomenclatureModal {...props} {...addModeProps} />,
      )

      await testUtils.setName(user, fakeWord())
      await testUtils.setShortName(user, fakeWord())

      await testUtils.openGroupSelect(user)
      await testUtils.setGroup(user, props.groups[0].title)

      await testUtils.setVendorCode(user, fakeWord())

      await testUtils.openMeasurementUnitSelect(user)
      await testUtils.setMeasurementUnit(user, props.measurementUnits[0].title)

      await testUtils.clickAddButton(user)

      expect(props.onSubmit).toBeCalledTimes(1)
      expect(props.onSubmit).toBeCalledWith(
        expect.anything(),
        expect.anything(),
      )
    })

    test('Не отображается во время загрузки номенклатуры', () => {
      render(
        <AddOrEditNomenclatureModal
          {...props}
          {...addModeProps}
          nomenclatureIsLoading
        />,
      )

      const button = testUtils.queryAddButton()
      expect(button).not.toBeInTheDocument()
    })
  })

  describe('Кнопка отмены', () => {
    test('Отображается корректно', () => {
      render(<AddOrEditNomenclatureModal {...props} />)

      const button = testUtils.getCancelButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Обработчик вызывается корректно', async () => {
      const { user } = render(<AddOrEditNomenclatureModal {...props} />)
      await testUtils.clickCancelButton(user)
      expect(props.onCancel).toBeCalledTimes(1)
    })

    test('Не отображается во время загрузки номенклатуры', () => {
      render(<AddOrEditNomenclatureModal {...props} nomenclatureIsLoading />)
      const button = testUtils.queryCancelButton()
      expect(button).not.toBeInTheDocument()
    })
  })

  describe('Поле названия', () => {
    test('Отображается корректно', () => {
      render(<AddOrEditNomenclatureModal {...props} />)

      const label = testUtils.getNameLabel()
      const field = testUtils.getNameField()

      expect(label).toBeInTheDocument()
      expect(field).toBeInTheDocument()
      expect(field).toBeEnabled()
      expect(field).not.toHaveValue()
    })

    test('Можно установить значение', async () => {
      const { user } = render(<AddOrEditNomenclatureModal {...props} />)

      const value = fakeWord()
      const field = await testUtils.setName(user, value)

      expect(field).toHaveDisplayValue(value)
    })

    test('Можно установить значение по умолчанию', () => {
      const nomenclature = warehouseFixtures.nomenclature()

      render(
        <AddOrEditNomenclatureModal {...props} nomenclature={nomenclature} />,
      )

      const field = testUtils.getNameField()
      expect(field).toHaveDisplayValue(nomenclature.title)
    })

    test('Отображается ошибка если не заполнить поле и нажать кнопка отправки', async () => {
      const { user } = render(
        <AddOrEditNomenclatureModal {...props} {...addModeProps} />,
      )

      await testUtils.clickAddButton(user)

      const error = await testUtils.findNameError(validationMessages.required)
      expect(error).toBeInTheDocument()
    })
  })

  describe('Поле краткого названия', () => {
    test('Отображается корректно', () => {
      render(<AddOrEditNomenclatureModal {...props} />)

      const label = testUtils.getShortNameLabel()
      const field = testUtils.getShortNameField()

      expect(label).toBeInTheDocument()
      expect(field).toBeInTheDocument()
      expect(field).toBeEnabled()
      expect(field).not.toHaveValue()
    })

    test('Можно установить значение', async () => {
      const { user } = render(<AddOrEditNomenclatureModal {...props} />)

      const value = fakeWord()
      const field = await testUtils.setShortName(user, value)

      expect(field).toHaveDisplayValue(value)
    })

    test('Можно установить значение по умолчанию', () => {
      const nomenclature = warehouseFixtures.nomenclature()

      render(
        <AddOrEditNomenclatureModal {...props} nomenclature={nomenclature} />,
      )

      const field = testUtils.getShortNameField()
      expect(field).toHaveDisplayValue(nomenclature.shortTitle)
    })

    test('Отображается ошибка если не заполнить поле и нажать кнопка отправки', async () => {
      const { user } = render(
        <AddOrEditNomenclatureModal {...props} {...addModeProps} />,
      )

      await testUtils.clickAddButton(user)

      const error = await testUtils.findShortNameError(
        validationMessages.required,
      )
      expect(error).toBeInTheDocument()
    })
  })

  describe('Поле группы', () => {
    test('Отображается корректно', async () => {
      const { user } = render(<AddOrEditNomenclatureModal {...props} />)

      const label = testUtils.getGroupLabel()
      const field = testUtils.getGroupField()
      const selectedGroup = testUtils.querySelectedGroup(props.groups[0].title)
      await testUtils.openGroupSelect(user)

      expect(label).toBeInTheDocument()
      expect(field).toBeInTheDocument()
      expect(field).toBeEnabled()
      props.groups.forEach((g) => {
        const opt = testUtils.getGroupOption(g.title)
        expect(opt).toBeInTheDocument()
      })
      expect(selectedGroup).not.toBeInTheDocument()
    })

    test('Можно установить значение', async () => {
      const { user } = render(<AddOrEditNomenclatureModal {...props} />)

      await testUtils.openGroupSelect(user)
      await testUtils.setGroup(user, props.groups[0].title)
      const selectedGroup = testUtils.getSelectedGroup(props.groups[0].title)

      expect(selectedGroup).toBeInTheDocument()
    })

    test('Можно установить значение по умолчанию', async () => {
      const nomenclature = warehouseFixtures.nomenclature()

      render(
        <AddOrEditNomenclatureModal {...props} nomenclature={nomenclature} />,
      )

      const selectedGroup = testUtils.getSelectedGroup(
        String(nomenclature.group.id),
      )

      expect(selectedGroup).toBeInTheDocument()
    })

    test('Отображается ошибка если не заполнить поле и нажать кнопка отправки', async () => {
      const { user } = render(
        <AddOrEditNomenclatureModal {...props} {...addModeProps} />,
      )

      await testUtils.clickAddButton(user)
      const error = await testUtils.findGroupError(validationMessages.required)

      expect(error).toBeInTheDocument()
    })
  })

  describe('Поле артикула', () => {
    test('Отображается корректно', () => {
      render(<AddOrEditNomenclatureModal {...props} />)

      const label = testUtils.getVendorCodeLabel()
      const field = testUtils.getVendorCodeField()

      expect(label).toBeInTheDocument()
      expect(field).toBeInTheDocument()
      expect(field).toBeEnabled()
      expect(field).not.toHaveValue()
    })

    test('Можно установить значение', async () => {
      const { user } = render(<AddOrEditNomenclatureModal {...props} />)

      const value = fakeWord()
      const field = await testUtils.setVendorCode(user, value)

      expect(field).toHaveDisplayValue(value)
    })

    test('Можно установить значение по умолчанию', () => {
      const nomenclature = warehouseFixtures.nomenclature()

      render(
        <AddOrEditNomenclatureModal {...props} nomenclature={nomenclature} />,
      )

      const field = testUtils.getVendorCodeField()
      expect(field).toHaveDisplayValue(nomenclature.vendorCode)
    })

    test('Отображается ошибка если не заполнить поле и нажать кнопка отправки', async () => {
      const { user } = render(
        <AddOrEditNomenclatureModal {...props} {...addModeProps} />,
      )

      await testUtils.clickAddButton(user)

      const error = await testUtils.findVendorCodeError(
        validationMessages.required,
      )
      expect(error).toBeInTheDocument()
    })
  })

  describe('Поле единицы измерения', () => {
    test('Отображается корректно', async () => {
      const { user } = render(<AddOrEditNomenclatureModal {...props} />)

      const label = testUtils.getMeasurementUnitLabel()
      const field = testUtils.getMeasurementUnitField()
      const selectedMeasurementUnit = testUtils.querySelectedMeasurementUnit(
        props.measurementUnits[0].title,
      )
      await testUtils.openMeasurementUnitSelect(user)

      expect(label).toBeInTheDocument()
      expect(field).toBeInTheDocument()
      expect(field).toBeEnabled()
      props.measurementUnits.forEach((m) => {
        const opt = testUtils.getMeasurementUnitOption(m.title)
        expect(opt).toBeInTheDocument()
      })
      expect(selectedMeasurementUnit).not.toBeInTheDocument()
    })

    test('Можно установить значение', async () => {
      const { user } = render(<AddOrEditNomenclatureModal {...props} />)

      await testUtils.openMeasurementUnitSelect(user)
      await testUtils.setMeasurementUnit(user, props.measurementUnits[0].title)
      const selectedMeasurementUnit = testUtils.getSelectedMeasurementUnit(
        props.measurementUnits[0].title,
      )

      expect(selectedMeasurementUnit).toBeInTheDocument()
    })

    test('Можно установить значение по умолчанию', () => {
      const nomenclature = warehouseFixtures.nomenclature()

      render(
        <AddOrEditNomenclatureModal {...props} nomenclature={nomenclature} />,
      )

      const selectedMeasurementUnit = testUtils.getSelectedMeasurementUnit(
        String(nomenclature.measurementUnit.id),
      )
      expect(selectedMeasurementUnit).toBeInTheDocument()
    })

    test('Отображается ошибка если не заполнить поле и нажать кнопка отправки', async () => {
      const { user } = render(
        <AddOrEditNomenclatureModal {...props} {...addModeProps} />,
      )

      await testUtils.clickAddButton(user)
      const error = await testUtils.findMeasurementUnitError(
        validationMessages.required,
      )

      expect(error).toBeInTheDocument()
    })
  })

  describe('Поле страны производителя', () => {
    test('Отображается корректно', async () => {
      const { user } = render(<AddOrEditNomenclatureModal {...props} />)

      const label = testUtils.getCountryLabel()
      const field = testUtils.getCountryField()
      const selectedCountry = testUtils.querySelectedCountry(
        props.countries[0].title,
      )
      await testUtils.openCountrySelect(user)

      expect(label).toBeInTheDocument()
      expect(field).toBeInTheDocument()
      expect(field).toBeEnabled()
      props.countries.forEach((c) => {
        const opt = testUtils.getCountryOption(c.title)
        expect(opt).toBeInTheDocument()
      })
      expect(selectedCountry).not.toBeInTheDocument()
    })

    test('Можно установить значение', async () => {
      const { user } = render(<AddOrEditNomenclatureModal {...props} />)

      await testUtils.openCountrySelect(user)
      await testUtils.setCountry(user, props.countries[0].title)
      const selectedCountry = testUtils.getSelectedCountry(
        props.countries[0].title,
      )

      expect(selectedCountry).toBeInTheDocument()
    })

    test('Можно установить значение по умолчанию', () => {
      const nomenclature = warehouseFixtures.nomenclature()

      render(
        <AddOrEditNomenclatureModal {...props} nomenclature={nomenclature} />,
      )

      const selectedCountry = testUtils.getSelectedCountry(
        String(nomenclature.country!.id),
      )
      expect(selectedCountry).toBeInTheDocument()
    })
  })
})
