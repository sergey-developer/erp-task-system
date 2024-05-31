import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import {
  equipmentConditionDict,
  EquipmentConditionEnum,
} from 'modules/warehouse/constants/equipment'

import { yesNoOptions } from 'shared/constants/selectField'
import { getBooleanOptions } from 'shared/utils/selectField'

import catalogsFixtures from '_tests_/fixtures/catalogs'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import { buttonTestUtils, radioButtonTestUtils, render, selectTestUtils } from '_tests_/utils'

import EquipmentFilter from './index'
import { EquipmentFilterProps } from './types'

const props: Readonly<EquipmentFilterProps> = {
  visible: true,

  values: {},
  initialValues: {},

  locations: catalogsFixtures.locationList(2),
  locationsIsLoading: false,

  categories: warehouseFixtures.equipmentCategoryList(2),
  categoriesIsLoading: false,

  owners: warehouseFixtures.customerList(2),
  ownersIsLoading: false,

  onClose: jest.fn(),
  onApply: jest.fn(),
}

const getContainer = () => screen.getByTestId('equipment-filter')
const findContainer = () => screen.findByTestId('equipment-filter')
const queryContainer = () => screen.queryByTestId('equipment-filter')

// conditions
const getConditionsBlock = (): HTMLElement => within(getContainer()).getByTestId('conditions')

const getConditionsSelect = (): HTMLElement =>
  within(getConditionsBlock()).getByTestId('conditions-select')

const getConditionsPlaceholder = (): HTMLElement =>
  within(getConditionsSelect()).getByText('Выберите состояние')

const getConditionsSelectInput = () => selectTestUtils.getSelect(getConditionsSelect())

const openConditionsSelect = (user: UserEvent) =>
  selectTestUtils.openSelect(user, getConditionsBlock())

const setCondition = selectTestUtils.clickSelectOption

const getSelectedCondition = (title: string) =>
  selectTestUtils.getSelectedOptionByTitle(getConditionsSelect(), title)

const querySelectedCondition = (title: string) =>
  selectTestUtils.querySelectedOptionByTitle(getConditionsSelect(), title)

// locations
const getLocationsBlock = () => within(getContainer()).getByTestId('locations')
const getLocationsSelect = () => within(getLocationsBlock()).getByTestId('locations-select')

const getLocationsSelectInput = () => selectTestUtils.getSelect(getLocationsSelect())

const openLocationsSelect = (user: UserEvent) =>
  selectTestUtils.openSelect(user, getLocationsBlock())

const setLocation = selectTestUtils.clickSelectOption

const getSelectedLocation = (title: string) =>
  selectTestUtils.getSelectedOptionByTitle(getLocationsSelect(), title)

const querySelectedLocation = (title: string) =>
  selectTestUtils.querySelectedOptionByTitle(getLocationsSelect(), title)

const expectLocationsLoadingFinished = () =>
  selectTestUtils.expectLoadingFinished(getLocationsSelect())

// owners
const getOwnersBlock = () => within(getContainer()).getByTestId('owners')
const getOwnersSelect = () => within(getOwnersBlock()).getByTestId('owners-select')

const getOwnersPlaceholder = (): HTMLElement =>
  within(getOwnersSelect()).getByText('Выберите владельца оборудования')

const getOwnersSelectInput = () => selectTestUtils.getSelect(getOwnersSelect())
const openOwnersSelect = (user: UserEvent) => selectTestUtils.openSelect(user, getOwnersBlock())
const setOwner = selectTestUtils.clickSelectOption

const getSelectedOwner = (title: string) =>
  selectTestUtils.getSelectedOptionByTitle(getOwnersSelect(), title)

const querySelectedOwner = (title: string) =>
  selectTestUtils.querySelectedOptionByTitle(getOwnersSelect(), title)

const expectOwnersLoadingFinished = () => selectTestUtils.expectLoadingFinished(getOwnersSelect())

// categories
const getCategoriesBlock = () => within(getContainer()).getByTestId('categories')
const getCategoriesSelect = () => within(getCategoriesBlock()).getByTestId('categories-select')

const getCategoriesPlaceholder = (): HTMLElement =>
  within(getCategoriesSelect()).getByText('Выберите категорию')

const getCategoriesSelectInput = () => selectTestUtils.getSelect(getCategoriesSelect())

const openCategoriesSelect = (user: UserEvent) =>
  selectTestUtils.openSelect(user, getCategoriesBlock())

const setCategory = selectTestUtils.clickSelectOption

const getSelectedCategory = (title: string) =>
  selectTestUtils.getSelectedOptionByTitle(getCategoriesSelect(), title)

const querySelectedCategory = (title: string) =>
  selectTestUtils.querySelectedOptionByTitle(getCategoriesSelect(), title)

const expectCategoryLoadingFinished = () =>
  selectTestUtils.expectLoadingFinished(getCategoriesSelect())

// price
const getPriceBlock = () => within(getContainer()).getByTestId('price')

// is new
const getIsNewBlock = () => within(getContainer()).getByTestId('is-new')
const getIsNewField = (text: string) => radioButtonTestUtils.getRadioButtonIn(getIsNewBlock(), text)
const clickIsNewField = async (user: UserEvent, text: string) => {
  const field = getIsNewField(text)
  await user.click(field)
  return field
}

// is warranty
const getIsWarrantyBlock = () => within(getContainer()).getByTestId('is-warranty')
const getIsWarrantyField = (text: string) =>
  radioButtonTestUtils.getRadioButtonIn(getIsWarrantyBlock(), text)

const clickIsWarrantyField = async (user: UserEvent, text: string) => {
  const field = getIsWarrantyField(text)
  await user.click(field)
  return field
}

// is repaired
const getIsRepairedBlock = () => within(getContainer()).getByTestId('is-repaired')
const getIsRepairedField = (text: string) =>
  radioButtonTestUtils.getRadioButtonIn(getIsRepairedBlock(), text)

const clickIsRepairedField = async (user: UserEvent, text: string) => {
  const field = getIsRepairedField(text)
  await user.click(field)
  return field
}

// zero quantity
const getZeroQuantityBlock = () => within(getContainer()).getByTestId('zero-quantity')
const getZeroQuantityField = (text: string) =>
  radioButtonTestUtils.getRadioButtonIn(getZeroQuantityBlock(), text)

const clickZeroQuantityField = async (user: UserEvent, text: string) => {
  const field = getZeroQuantityField(text)
  await user.click(field)
  return field
}

// reset button
const getResetAllButton = () => buttonTestUtils.getButtonIn(getContainer(), /Сбросить все/)

const clickResetButtonIn = async (user: UserEvent, container: HTMLElement) => {
  const button = buttonTestUtils.getButtonIn(container, /сбросить/i)
  await user.click(button)
}

const clickResetAllButton = async (user: UserEvent) => {
  const button = getResetAllButton()
  await user.click(button)
}

// close button
const getCloseButton = () => buttonTestUtils.getButtonIn(getContainer(), /close/i)
const clickCloseButton = async (user: UserEvent) => {
  const button = getCloseButton()
  await user.click(button)
}

// apply button
const getApplyButton = () => buttonTestUtils.getButtonIn(getContainer(), /Применить/)
const clickApplyButton = async (user: UserEvent) => {
  const button = getApplyButton()
  await user.click(button)
}

export const testUtils = {
  getContainer,
  findContainer,
  queryContainer,

  getConditionsBlock,
  getConditionsSelect,
  getConditionsPlaceholder,
  getConditionsSelectInput,
  openConditionsSelect,
  setCondition,
  getSelectedCondition,
  querySelectedCondition,

  getLocationsBlock,
  getLocationsSelect,
  getLocationsSelectInput,
  openLocationsSelect,
  setLocation,
  getSelectedLocation,
  querySelectedLocation,
  expectLocationsLoadingFinished,

  getOwnersBlock,
  getOwnersSelect,
  getOwnersPlaceholder,
  getOwnersSelectInput,
  openOwnersSelect,
  setOwner,
  getSelectedOwner,
  querySelectedOwner,
  expectOwnersLoadingFinished,

  getIsNewBlock,
  getIsNewField,
  clickIsNewField,

  getIsWarrantyBlock,
  getIsWarrantyField,
  clickIsWarrantyField,

  getIsRepairedBlock,
  getIsRepairedField,
  clickIsRepairedField,

  getZeroQuantityBlock,
  getZeroQuantityField,
  clickZeroQuantityField,

  getCategoriesBlock,
  getCategoriesSelect,
  getCategoriesPlaceholder,
  getCategoriesSelectInput,
  openCategoriesSelect,
  setCategory,
  getSelectedCategory,
  querySelectedCategory,
  expectCategoryLoadingFinished,

  getPriceBlock,

  getResetAllButton,
  clickResetButtonIn,
  clickResetAllButton,

  getCloseButton,
  clickCloseButton,

  getApplyButton,
  clickApplyButton,
}

describe('Фильтр списка номенклатуры оборудования', () => {
  describe('Состояние', () => {
    test('Отображается корректно', async () => {
      const { user } = render(<EquipmentFilter {...props} />)

      const input = testUtils.getConditionsSelectInput()
      const placeholder = testUtils.getConditionsPlaceholder()
      await testUtils.openConditionsSelect(user)

      expect(input).toBeInTheDocument()
      expect(input).toBeEnabled()
      expect(placeholder).toBeInTheDocument()
    })

    test('Можно выбрать несколько вариантов', async () => {
      const { user } = render(<EquipmentFilter {...props} />)

      await testUtils.openConditionsSelect(user)
      await testUtils.setCondition(user, equipmentConditionDict[EquipmentConditionEnum.WrittenOff])
      await testUtils.setCondition(user, equipmentConditionDict[EquipmentConditionEnum.Broken])

      const selectedCondition1 = testUtils.getSelectedCondition(
        equipmentConditionDict[EquipmentConditionEnum.WrittenOff],
      )
      const selectedCondition2 = testUtils.getSelectedCondition(
        equipmentConditionDict[EquipmentConditionEnum.Broken],
      )

      expect(selectedCondition1).toBeInTheDocument()
      expect(selectedCondition2).toBeInTheDocument()
    })

    test('Устанавливается значение по умолчанию', () => {
      render(
        <EquipmentFilter
          {...props}
          initialValues={{
            conditions: [EquipmentConditionEnum.Working],
          }}
        />,
      )

      const selectedCondition = testUtils.getSelectedCondition(
        equipmentConditionDict[EquipmentConditionEnum.Working],
      )

      expect(selectedCondition).toBeInTheDocument()
    })

    test('Сбрасывается к значению по умолчанию', async () => {
      const { user } = render(
        <EquipmentFilter
          {...props}
          initialValues={{
            conditions: [EquipmentConditionEnum.WrittenOff],
          }}
        />,
      )

      await testUtils.openConditionsSelect(user)
      await testUtils.setCondition(user, equipmentConditionDict[EquipmentConditionEnum.Working])

      await testUtils.clickResetButtonIn(user, testUtils.getConditionsBlock())

      const selectedCondition1 = testUtils.getSelectedCondition(
        equipmentConditionDict[EquipmentConditionEnum.WrittenOff],
      )
      const selectedCondition2 = testUtils.querySelectedCondition(
        equipmentConditionDict[EquipmentConditionEnum.Working],
      )

      expect(selectedCondition1).toBeInTheDocument()
      expect(selectedCondition2).not.toBeInTheDocument()
    })

    test('Переданное значение заменяет значение по умолчанию', () => {
      render(
        <EquipmentFilter
          {...props}
          initialValues={{
            conditions: [EquipmentConditionEnum.Broken],
          }}
          values={{
            conditions: [EquipmentConditionEnum.NonRepairable],
          }}
        />,
      )

      const selectedCondition1 = testUtils.getSelectedCondition(
        equipmentConditionDict[EquipmentConditionEnum.NonRepairable],
      )
      const selectedCondition2 = testUtils.querySelectedCondition(
        equipmentConditionDict[EquipmentConditionEnum.Broken],
      )

      expect(selectedCondition1).toBeInTheDocument()
      expect(selectedCondition2).not.toBeInTheDocument()
    })
  })

  describe('Местонахождение', () => {
    test('Отображается', () => {
      render(<EquipmentFilter {...props} />)

      const input = testUtils.getLocationsSelectInput()

      expect(input).toBeInTheDocument()
      expect(input).toBeEnabled()
    })

    test('Можно выбрать несколько вариантов', async () => {
      const { user } = render(<EquipmentFilter {...props} />)

      await testUtils.openLocationsSelect(user)
      await testUtils.setLocation(user, props.locations[0].title)
      await testUtils.setLocation(user, props.locations[1].title)

      const value1 = testUtils.getSelectedLocation(props.locations[0].title)
      const value2 = testUtils.getSelectedLocation(props.locations[1].title)

      expect(value1).toBeInTheDocument()
      expect(value2).toBeInTheDocument()
    })

    test('Устанавливается значение по умолчанию', () => {
      render(<EquipmentFilter {...props} initialValues={{ locations: [props.locations[0].id] }} />)
      const value = testUtils.getSelectedLocation(props.locations[0].title)
      expect(value).toBeInTheDocument()
    })

    test('Сбрасывается к значению по умолчанию', async () => {
      const { user } = render(
        <EquipmentFilter {...props} initialValues={{ locations: [props.locations[0].id] }} />,
      )

      await testUtils.openLocationsSelect(user)
      await testUtils.setLocation(user, props.locations[1].title)

      await testUtils.clickResetButtonIn(user, testUtils.getLocationsBlock())

      const value1 = testUtils.getSelectedLocation(props.locations[0].title)
      const value2 = testUtils.querySelectedCondition(props.locations[1].title)

      expect(value1).toBeInTheDocument()
      expect(value2).not.toBeInTheDocument()
    })

    test('Переданное значение заменяет значение по умолчанию', () => {
      render(
        <EquipmentFilter
          {...props}
          initialValues={{ locations: [props.locations[0].id] }}
          values={{ locations: [props.locations[1].id] }}
        />,
      )

      const value1 = testUtils.getSelectedLocation(props.locations[1].title)
      const value2 = testUtils.querySelectedLocation(props.locations[0].title)

      expect(value1).toBeInTheDocument()
      expect(value2).not.toBeInTheDocument()
    })
  })

  describe('Владелец оборудования', () => {
    test('Отображается корректно', () => {
      render(<EquipmentFilter {...props} />)

      const input = testUtils.getOwnersSelectInput()
      const placeholder = testUtils.getOwnersPlaceholder()

      expect(input).toBeInTheDocument()
      expect(input).toBeEnabled()
      expect(placeholder).toBeInTheDocument()
    })

    test('Можно выбрать несколько вариантов', async () => {
      const { user } = render(<EquipmentFilter {...props} />)

      await testUtils.openOwnersSelect(user)
      await testUtils.setOwner(user, props.owners[0].title)
      await testUtils.setOwner(user, props.owners[1].title)

      const selectedOwner1 = testUtils.getSelectedOwner(props.owners[0].title)
      const selectedOwner2 = testUtils.getSelectedOwner(props.owners[1].title)

      expect(selectedOwner1).toBeInTheDocument()
      expect(selectedOwner2).toBeInTheDocument()
    })

    test('Устанавливается значение по умолчанию', async () => {
      const initialOwner = props.owners[1]
      const { user } = render(
        <EquipmentFilter {...props} initialValues={{ owners: [initialOwner.id] }} />,
      )

      await testUtils.openOwnersSelect(user)
      const selectedOption = testUtils.getSelectedOwner(initialOwner.title)
      expect(selectedOption).toBeInTheDocument()
    })

    test('Сбрасывается к значению по умолчанию', async () => {
      const initialOwner = props.owners[1]
      const { user } = render(
        <EquipmentFilter {...props} initialValues={{ owners: [initialOwner.id] }} />,
      )

      await testUtils.openOwnersSelect(user)
      await testUtils.setOwner(user, props.owners[0].title)
      await testUtils.clickResetButtonIn(user, testUtils.getOwnersBlock())
      const selectedOption = testUtils.getSelectedOwner(initialOwner.title)
      expect(selectedOption).toBeInTheDocument()
    })

    test('Переданное значение заменяет значение по умолчанию', async () => {
      const { user } = render(
        <EquipmentFilter
          {...props}
          initialValues={{ owners: [props.owners[1].id] }}
          values={{ owners: [props.owners[0].id] }}
        />,
      )

      await testUtils.openOwnersSelect(user)
      const selectedOption = testUtils.getSelectedOwner(props.owners[0].title)
      expect(selectedOption).toBeInTheDocument()
    })
  })

  describe('Новое', () => {
    test('Отображается корректно', () => {
      render(<EquipmentFilter {...props} />)

      yesNoOptions.forEach((opt) => {
        const field = testUtils.getIsNewField(opt.label as string)
        expect(field).toBeInTheDocument()
        expect(field).toBeEnabled()
        expect(field).not.toBeChecked()
      })
    })

    test('Можно установить значение', async () => {
      const { user } = render(<EquipmentFilter {...props} />)
      const field = await testUtils.clickIsNewField(user, yesNoOptions[0].label as string)
      expect(field).toBeChecked()
    })

    test('Устанавливается значение по умолчанию', () => {
      render(<EquipmentFilter {...props} initialValues={{ isNew: true }} />)

      const truthyField = testUtils.getIsNewField(yesNoOptions[0].label as string)
      const falsyField = testUtils.getIsNewField(yesNoOptions[1].label as string)

      expect(truthyField).toBeChecked()
      expect(falsyField).not.toBeChecked()
    })

    test('Сбрасывается к значению по умолчанию', async () => {
      const { user } = render(<EquipmentFilter {...props} initialValues={{ isNew: true }} />)

      const falsyField = await testUtils.clickIsNewField(user, yesNoOptions[1].label as string)
      expect(falsyField).toBeChecked()

      await testUtils.clickResetButtonIn(user, testUtils.getIsNewBlock())
      expect(falsyField).not.toBeChecked()

      const truthyField = testUtils.getIsNewField(yesNoOptions[0].label as string)
      expect(truthyField).toBeChecked()
    })

    test('Переданное значение заменяет значение по умолчанию', () => {
      render(
        <EquipmentFilter {...props} initialValues={{ isNew: true }} values={{ isNew: false }} />,
      )

      const truthyField = testUtils.getIsNewField(yesNoOptions[0].label as string)
      const falsyField = testUtils.getIsNewField(yesNoOptions[1].label as string)

      expect(truthyField).not.toBeChecked()
      expect(falsyField).toBeChecked()
    })
  })

  describe('На гарантии', () => {
    test('Отображается корректно', () => {
      render(<EquipmentFilter {...props} />)

      yesNoOptions.forEach((opt) => {
        const field = testUtils.getIsWarrantyField(opt.label as string)
        expect(field).toBeInTheDocument()
        expect(field).toBeEnabled()
        expect(field).not.toBeChecked()
      })
    })

    test('Можно установить значение', async () => {
      const { user } = render(<EquipmentFilter {...props} />)
      const field = await testUtils.clickIsWarrantyField(user, yesNoOptions[0].label as string)
      expect(field).toBeChecked()
    })

    test('Устанавливается значение по умолчанию', () => {
      render(<EquipmentFilter {...props} initialValues={{ isWarranty: true }} />)

      const truthyField = testUtils.getIsWarrantyField(yesNoOptions[0].label as string)
      const falsyField = testUtils.getIsWarrantyField(yesNoOptions[1].label as string)

      expect(truthyField).toBeChecked()
      expect(falsyField).not.toBeChecked()
    })

    test('Сбрасывается к значению по умолчанию', async () => {
      const { user } = render(<EquipmentFilter {...props} initialValues={{ isWarranty: true }} />)

      const falsyField = await testUtils.clickIsWarrantyField(user, yesNoOptions[1].label as string)
      expect(falsyField).toBeChecked()

      await testUtils.clickResetButtonIn(user, testUtils.getIsWarrantyBlock())
      expect(falsyField).not.toBeChecked()

      const truthyField = testUtils.getIsWarrantyField(yesNoOptions[0].label as string)
      expect(truthyField).toBeChecked()
    })

    test('Переданное значение заменяет значение по умолчанию', async () => {
      render(
        <EquipmentFilter
          {...props}
          initialValues={{ isWarranty: true }}
          values={{ isWarranty: false }}
        />,
      )

      const truthyField = testUtils.getIsWarrantyField(yesNoOptions[0].label as string)
      const falsyField = testUtils.getIsWarrantyField(yesNoOptions[1].label as string)

      expect(truthyField).not.toBeChecked()
      expect(falsyField).toBeChecked()
    })
  })

  describe('Отремонтированное', () => {
    test('Отображается корректно', () => {
      render(<EquipmentFilter {...props} />)

      yesNoOptions.forEach((opt) => {
        const field = testUtils.getIsRepairedField(opt.label as string)
        expect(field).toBeInTheDocument()
        expect(field).toBeEnabled()
        expect(field).not.toBeChecked()
      })
    })

    test('Можно установить значение', async () => {
      const { user } = render(<EquipmentFilter {...props} />)
      const field = await testUtils.clickIsRepairedField(user, yesNoOptions[0].label as string)
      expect(field).toBeChecked()
    })

    test('Устанавливается значение по умолчанию', () => {
      render(<EquipmentFilter {...props} initialValues={{ isRepaired: true }} />)

      const truthyField = testUtils.getIsRepairedField(yesNoOptions[0].label as string)
      const falsyField = testUtils.getIsRepairedField(yesNoOptions[1].label as string)

      expect(truthyField).toBeChecked()
      expect(falsyField).not.toBeChecked()
    })

    test('Сбрасывается к значению по умолчанию', async () => {
      const { user } = render(<EquipmentFilter {...props} initialValues={{ isRepaired: true }} />)

      const falsyField = await testUtils.clickIsRepairedField(user, yesNoOptions[1].label as string)
      expect(falsyField).toBeChecked()

      await testUtils.clickResetButtonIn(user, testUtils.getIsRepairedBlock())
      expect(falsyField).not.toBeChecked()

      const truthyField = testUtils.getIsRepairedField(yesNoOptions[0].label as string)
      expect(truthyField).toBeChecked()
    })

    test('Переданное значение заменяет значение по умолчанию', () => {
      render(
        <EquipmentFilter
          {...props}
          initialValues={{ isRepaired: true }}
          values={{ isRepaired: false }}
        />,
      )

      const truthyField = testUtils.getIsRepairedField(yesNoOptions[0].label as string)
      const falsyField = testUtils.getIsRepairedField(yesNoOptions[1].label as string)

      expect(truthyField).not.toBeChecked()
      expect(falsyField).toBeChecked()
    })
  })

  describe('Категория', () => {
    test('Отображается корректно', () => {
      render(<EquipmentFilter {...props} />)

      const input = testUtils.getCategoriesSelectInput()
      const placeholder = testUtils.getCategoriesPlaceholder()

      expect(input).toBeInTheDocument()
      expect(input).toBeEnabled()
      expect(placeholder).toBeInTheDocument()
    })

    test('Можно выбрать несколько вариантов', async () => {
      const { user } = render(<EquipmentFilter {...props} />)

      await testUtils.openCategoriesSelect(user)
      await testUtils.setCategory(user, props.categories[0].title)
      await testUtils.setCategory(user, props.categories[1].title)

      const selectedCategory1 = testUtils.getSelectedCategory(props.categories[0].title)
      const selectedCategory2 = testUtils.getSelectedCategory(props.categories[1].title)

      expect(selectedCategory1).toBeInTheDocument()
      expect(selectedCategory2).toBeInTheDocument()
    })

    test('Устанавливается значение по умолчанию', async () => {
      const initialCategory = props.categories[1]
      const { user } = render(
        <EquipmentFilter {...props} initialValues={{ categories: [initialCategory.id] }} />,
      )

      await testUtils.openCategoriesSelect(user)
      const selectedOption = testUtils.getSelectedCategory(initialCategory.title)
      expect(selectedOption).toBeInTheDocument()
    })

    test('Сбрасывается к значению по умолчанию', async () => {
      const initialCategory = props.categories[1]
      const { user } = render(
        <EquipmentFilter {...props} initialValues={{ categories: [initialCategory.id] }} />,
      )

      await testUtils.openCategoriesSelect(user)
      await testUtils.setCategory(user, props.categories[0].title)
      await testUtils.clickResetButtonIn(user, testUtils.getCategoriesBlock())
      const selectedOption = testUtils.getSelectedCategory(initialCategory.title)
      expect(selectedOption).toBeInTheDocument()
    })

    test('Переданное значение заменяет значение по умолчанию', async () => {
      const { user } = render(
        <EquipmentFilter
          {...props}
          initialValues={{ categories: [props.categories[1].id] }}
          values={{ categories: [props.categories[0].id] }}
        />,
      )

      await testUtils.openCategoriesSelect(user)
      const selectedOption = testUtils.getSelectedCategory(props.categories[0].title)
      expect(selectedOption).toBeInTheDocument()
    })
  })

  test.todo('Стоимость')
  test.todo('Период оприходования')

  describe('Оборудование с остатком 0', () => {
    const options = getBooleanOptions('Отображать', 'Не отображать')

    test('Отображается', () => {
      render(<EquipmentFilter {...props} />)

      options.forEach((opt) => {
        const field = testUtils.getZeroQuantityField(opt.label as string)
        expect(field).toBeInTheDocument()
        expect(field).toBeEnabled()
        expect(field).not.toBeChecked()
      })
    })

    test('Можно установить значение', async () => {
      const { user } = render(<EquipmentFilter {...props} />)
      const field = await testUtils.clickZeroQuantityField(user, options[0].label as string)
      expect(field).toBeChecked()
    })

    test('Устанавливается значение по умолчанию', () => {
      render(<EquipmentFilter {...props} initialValues={{ zeroQuantity: true }} />)

      const truthyField = testUtils.getZeroQuantityField(options[0].label as string)
      const falsyField = testUtils.getZeroQuantityField(options[1].label as string)

      expect(truthyField).toBeChecked()
      expect(falsyField).not.toBeChecked()
    })

    test('Сбрасывается к значению по умолчанию', async () => {
      const { user } = render(<EquipmentFilter {...props} initialValues={{ zeroQuantity: true }} />)

      const falsyField = await testUtils.clickZeroQuantityField(user, options[1].label as string)
      expect(falsyField).toBeChecked()

      await testUtils.clickResetButtonIn(user, testUtils.getZeroQuantityBlock())
      expect(falsyField).not.toBeChecked()

      const truthyField = testUtils.getZeroQuantityField(options[0].label as string)
      expect(truthyField).toBeChecked()
    })

    test('Переданное значение заменяет значение по умолчанию', () => {
      render(
        <EquipmentFilter
          {...props}
          initialValues={{ zeroQuantity: true }}
          values={{ zeroQuantity: false }}
        />,
      )

      const truthyField = testUtils.getZeroQuantityField(options[0].label as string)
      const falsyField = testUtils.getZeroQuantityField(options[1].label as string)

      expect(truthyField).not.toBeChecked()
      expect(falsyField).toBeChecked()
    })
  })

  test.todo('Кнопка применить')
  test.todo('Кнопка сбросить всё')
  test.todo('Кнопка закрытия')
})
