import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import {
  equipmentConditionDict,
  EquipmentConditionEnum,
} from 'modules/warehouse/constants'

import { yesNoOptions } from 'shared/constants/selectField'

import {
  clickSelectOption,
  getButtonIn,
  getRadioButtonIn,
  getSelect,
  getSelectedOptionByTitle,
  openSelect,
  querySelectedOptionByTitle,
  render,
} from '_tests_/utils'

import {
  fakeCategories,
  fakeOwners,
  fakeWarehouses,
} from '../EquipmentPageLayout'
import EquipmentFilter from './index'
import { EquipmentFilterProps } from './types'

const props: EquipmentFilterProps = {
  visible: true,
  values: {},
  initialValues: {},
  warehouseList: fakeWarehouses,
  categoryList: fakeCategories,
  ownerList: fakeOwners,
  onClose: jest.fn(),
  onApply: jest.fn(),
}

const getContainer = () => screen.getByTestId('equipment-filter')

// conditions
const getConditionsBlock = (): HTMLElement =>
  within(getContainer()).getByTestId('conditions')

const getConditionsSelect = (): HTMLElement =>
  within(getConditionsBlock()).getByTestId('conditions-select')

const getConditionsPlaceholder = (): HTMLElement =>
  within(getConditionsSelect()).getByText('Выберите состояние')

const getConditionsSelectInput = () => getSelect(getConditionsSelect())

const openConditionsSelect = (user: UserEvent) =>
  openSelect(user, getConditionsBlock())

const setCondition = clickSelectOption

const getSelectedCondition = (title: string) =>
  getSelectedOptionByTitle(getConditionsSelect(), title)

const querySelectedCondition = (title: string) =>
  querySelectedOptionByTitle(getConditionsSelect(), title)

// warehouses
const getWarehousesBlock = () =>
  within(getContainer()).getByTestId('warehouses')

const getWarehousesSelect = () =>
  within(getWarehousesBlock()).getByTestId('warehouses-select')

const getWarehousesPlaceholder = (): HTMLElement =>
  within(getWarehousesSelect()).getByText('Выберите склад')

const getWarehousesSelectInput = () => getSelect(getWarehousesSelect())

const openWarehousesSelect = (user: UserEvent) =>
  openSelect(user, getWarehousesBlock())

const setWarehouse = clickSelectOption

const getSelectedWarehouse = (title: string) =>
  getSelectedOptionByTitle(getWarehousesSelect(), title)

const querySelectedWarehouse = (title: string) =>
  querySelectedOptionByTitle(getWarehousesSelect(), title)

// owners
const getOwnersBlock = () => within(getContainer()).getByTestId('owners')

const getOwnersSelect = () =>
  within(getOwnersBlock()).getByTestId('owners-select')

const getOwnersPlaceholder = (): HTMLElement =>
  within(getOwnersSelect()).getByText('Выберите владельца оборудования')

const getOwnersSelectInput = () => getSelect(getOwnersSelect())

const openOwnersSelect = (user: UserEvent) => openSelect(user, getOwnersBlock())

const setOwner = clickSelectOption

const getSelectedOwner = (title: string) =>
  getSelectedOptionByTitle(getOwnersSelect(), title)

const querySelectedOwner = (title: string) =>
  querySelectedOptionByTitle(getOwnersSelect(), title)

// categories
const getCategoriesBlock = () =>
  within(getContainer()).getByTestId('categories')

const getCategoriesSelect = () =>
  within(getCategoriesBlock()).getByTestId('categories-select')

const getCategoriesPlaceholder = (): HTMLElement =>
  within(getCategoriesSelect()).getByText('Выберите категорию')

const getCategoriesSelectInput = () => getSelect(getCategoriesSelect())

const openCategoriesSelect = (user: UserEvent) =>
  openSelect(user, getCategoriesBlock())

const setCategory = clickSelectOption

const getSelectedCategory = (title: string) =>
  getSelectedOptionByTitle(getCategoriesSelect(), title)

const querySelectedCategory = (title: string) =>
  querySelectedOptionByTitle(getCategoriesSelect(), title)

// is new
const getIsNewBlock = () => within(getContainer()).getByTestId('is-new')

const getIsNewField = (text: string) => getRadioButtonIn(getIsNewBlock(), text)

const clickIsNewField = async (user: UserEvent, text: string) => {
  const field = getIsNewField(text)
  await user.click(field)
  return field
}

// is warranty
const getIsWarrantyBlock = () =>
  within(getContainer()).getByTestId('is-warranty')

const getIsWarrantyField = (text: string) =>
  getRadioButtonIn(getIsWarrantyBlock(), text)

const clickIsWarrantyField = async (user: UserEvent, text: string) => {
  const field = getIsWarrantyField(text)
  await user.click(field)
  return field
}

// is repaired
const getIsRepairedBlock = () =>
  within(getContainer()).getByTestId('is-repaired')

const getIsRepairedField = (text: string) =>
  getRadioButtonIn(getIsRepairedBlock(), text)

const clickIsRepairedField = async (user: UserEvent, text: string) => {
  const field = getIsRepairedField(text)
  await user.click(field)
  return field
}

// reset button
const getResetAllButton = () => getButtonIn(getContainer(), /Сбросить все/)

const clickResetButtonIn = async (user: UserEvent, container: HTMLElement) => {
  const button = getButtonIn(container, /сбросить/i)
  await user.click(button)
}

const clickResetAllButton = async (user: UserEvent) => {
  const button = getResetAllButton()
  await user.click(button)
}

// close button
const getCloseButton = () => getButtonIn(getContainer(), /close/i)

const clickCloseFilter = async (user: UserEvent) => {
  const button = getCloseButton()
  await user.click(button)
}

// apply button
const getApplyButton = () => getButtonIn(getContainer(), /Применить/)

const clickApplyButton = async (user: UserEvent) => {
  const button = getApplyButton()
  await user.click(button)
}

export const testUtils = {
  getContainer,

  getConditionsBlock,
  getConditionsSelect,
  getConditionsPlaceholder,
  getConditionsSelectInput,
  openConditionsSelect,
  setCondition,
  getSelectedCondition,
  querySelectedCondition,

  getWarehousesBlock,
  getWarehousesSelect,
  getWarehousesPlaceholder,
  getWarehousesSelectInput,
  openWarehousesSelect,
  setWarehouse,
  getSelectedWarehouse,
  querySelectedWarehouse,

  getOwnersBlock,
  getOwnersSelect,
  getOwnersPlaceholder,
  getOwnersSelectInput,
  openOwnersSelect,
  setOwner,
  getSelectedOwner,
  querySelectedOwner,

  getIsNewBlock,
  getIsNewField,
  clickIsNewField,

  getIsWarrantyBlock,
  getIsWarrantyField,
  clickIsWarrantyField,

  getIsRepairedBlock,
  getIsRepairedField,
  clickIsRepairedField,

  getCategoriesBlock,
  getCategoriesSelect,
  getCategoriesPlaceholder,
  getCategoriesSelectInput,
  openCategoriesSelect,
  setCategory,
  getSelectedCategory,
  querySelectedCategory,

  getResetAllButton,
  clickResetButtonIn,
  clickResetAllButton,

  getCloseButton,
  clickCloseFilter,

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
      await testUtils.setCondition(
        user,
        equipmentConditionDict[EquipmentConditionEnum.WrittenOff],
      )
      await testUtils.setCondition(
        user,
        equipmentConditionDict[EquipmentConditionEnum.Broken],
      )

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
      await testUtils.setCondition(
        user,
        equipmentConditionDict[EquipmentConditionEnum.Working],
      )

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

  describe('Склады', () => {
    test('Отображается корректно', () => {
      render(<EquipmentFilter {...props} />)

      const input = testUtils.getWarehousesSelectInput()
      const placeholder = testUtils.getWarehousesPlaceholder()

      expect(input).toBeInTheDocument()
      expect(input).toBeEnabled()
      expect(placeholder).toBeInTheDocument()
    })

    test('Можно выбрать несколько вариантов', async () => {
      const { user } = render(<EquipmentFilter {...props} />)

      await testUtils.openWarehousesSelect(user)
      await testUtils.setWarehouse(user, props.warehouseList[0].title)
      await testUtils.setWarehouse(user, props.warehouseList[1].title)

      const selectedWarehouse1 = testUtils.getSelectedWarehouse(
        props.warehouseList[0].title,
      )
      const selectedWarehouse2 = testUtils.getSelectedWarehouse(
        props.warehouseList[1].title,
      )

      expect(selectedWarehouse1).toBeInTheDocument()
      expect(selectedWarehouse2).toBeInTheDocument()
    })

    test('Устанавливается значение по умолчанию', () => {
      render(
        <EquipmentFilter
          {...props}
          initialValues={{
            warehouses: [props.warehouseList[0].id],
          }}
        />,
      )

      const selectedWarehouse = testUtils.getSelectedWarehouse(
        props.warehouseList[0].title,
      )

      expect(selectedWarehouse).toBeInTheDocument()
    })

    test('Сбрасывается к значению по умолчанию', async () => {
      const { user } = render(
        <EquipmentFilter
          {...props}
          initialValues={{
            warehouses: [props.warehouseList[0].id],
          }}
        />,
      )

      await testUtils.openWarehousesSelect(user)
      await testUtils.setWarehouse(user, props.warehouseList[1].title)

      await testUtils.clickResetButtonIn(user, testUtils.getWarehousesBlock())

      const selectedWarehouse1 = testUtils.getSelectedWarehouse(
        props.warehouseList[0].title,
      )
      const selectedWarehouse2 = testUtils.querySelectedCondition(
        props.warehouseList[1].title,
      )

      expect(selectedWarehouse1).toBeInTheDocument()
      expect(selectedWarehouse2).not.toBeInTheDocument()
    })

    test('Переданное значение заменяет значение по умолчанию', () => {
      render(
        <EquipmentFilter
          {...props}
          initialValues={{
            warehouses: [props.warehouseList[0].id],
          }}
          values={{
            warehouses: [props.warehouseList[1].id],
          }}
        />,
      )

      const selectedWarehouse1 = testUtils.getSelectedWarehouse(
        props.warehouseList[1].title,
      )
      const selectedWarehouse2 = testUtils.querySelectedWarehouse(
        props.warehouseList[0].title,
      )

      expect(selectedWarehouse1).toBeInTheDocument()
      expect(selectedWarehouse2).not.toBeInTheDocument()
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
      await testUtils.setOwner(user, props.ownerList[0].title)
      await testUtils.setOwner(user, props.ownerList[1].title)

      const selectedOwner1 = testUtils.getSelectedOwner(
        props.ownerList[0].title,
      )
      const selectedOwner2 = testUtils.getSelectedOwner(
        props.ownerList[1].title,
      )

      expect(selectedOwner1).toBeInTheDocument()
      expect(selectedOwner2).toBeInTheDocument()
    })

    test.todo('Устанавливается значение по умолчанию')
    test.todo('Сбрасывается к значению по умолчанию')
    test.todo('Переданное значение заменяет значение по умолчанию')
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

      const field = await testUtils.clickIsNewField(
        user,
        yesNoOptions[0].label as string,
      )
      expect(field).toBeChecked()
    })

    test.todo('Устанавливается значение по умолчанию')
    test.todo('Сбрасывается к значению по умолчанию')
    test.todo('Переданное значение заменяет значение по умолчанию')
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

      const field = await testUtils.clickIsWarrantyField(
        user,
        yesNoOptions[0].label as string,
      )
      expect(field).toBeChecked()
    })

    test.todo('Устанавливается значение по умолчанию')
    test.todo('Сбрасывается к значению по умолчанию')
    test.todo('Переданное значение заменяет значение по умолчанию')
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

      const field = await testUtils.clickIsRepairedField(
        user,
        yesNoOptions[0].label as string,
      )
      expect(field).toBeChecked()
    })

    test.todo('Устанавливается значение по умолчанию')
    test.todo('Сбрасывается к значению по умолчанию')
    test.todo('Переданное значение заменяет значение по умолчанию')
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
      await testUtils.setCategory(user, props.categoryList[0].title)
      await testUtils.setCategory(user, props.categoryList[1].title)

      const selectedCategory1 = testUtils.getSelectedCategory(
        props.categoryList[0].title,
      )
      const selectedCategory2 = testUtils.getSelectedCategory(
        props.categoryList[1].title,
      )

      expect(selectedCategory1).toBeInTheDocument()
      expect(selectedCategory2).toBeInTheDocument()
    })

    test.todo('Устанавливается значение по умолчанию')
    test.todo('Сбрасывается к значению по умолчанию')
    test.todo('Переданное значение заменяет значение по умолчанию')
  })

  test.todo('Стоимость')
  test.todo('Период оприходования')

  test.todo('Кнопка применить')
  test.todo('Кнопка сбросить всё')
  test.todo('Кнопка закрытия')
})
