import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import equipmentsFixtures from '_tests_/fixtures/equipments'
import { buttonTestUtils, render, selectTestUtils } from '_tests_/helpers'

import AmountEquipmentSpentReportFilter from './index'
import { AmountEquipmentSpentReportFilterProps } from './types'

const props: Readonly<AmountEquipmentSpentReportFilterProps> = {
  open: true,

  values: {},
  initialValues: {},

  categories: equipmentsFixtures.equipmentCategories(2),
  categoriesIsLoading: false,

  onClose: jest.fn(),
  onApply: jest.fn(),
}

const getContainer = () => screen.getByTestId('amount-equipment-spent-report-filter')
const findContainer = () => screen.findByTestId('amount-equipment-spent-report-filter')

// categories
const getCategoriesBlock = () => within(getContainer()).getByTestId('categories-block')
const getCategoriesSelect = () => within(getCategoriesBlock()).getByTestId('categories-select')

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

// apply button
const getApplyButton = () => buttonTestUtils.getButtonIn(getContainer(), /Применить/)
const clickApplyButton = async (user: UserEvent) => {
  const button = getApplyButton()
  await user.click(button)
}

export const testUtils = {
  getContainer,
  findContainer,

  getCategoriesBlock,
  getCategoriesSelect,
  getCategoriesSelectInput,
  openCategoriesSelect,
  setCategory,
  getSelectedCategory,
  querySelectedCategory,
  expectCategoryLoadingFinished,

  getResetAllButton,
  clickResetButtonIn,
  clickResetAllButton,

  getApplyButton,
  clickApplyButton,
}

describe('Фильтр отчета количества потраченного оборудования', () => {
  describe('Категории', () => {
    test('Отображается корректно', () => {
      render(<AmountEquipmentSpentReportFilter {...props} />)
      const input = testUtils.getCategoriesSelectInput()
      expect(input).toBeInTheDocument()
      expect(input).toBeEnabled()
    })

    test('Можно выбрать несколько вариантов', async () => {
      const { user } = render(<AmountEquipmentSpentReportFilter {...props} />)

      await testUtils.openCategoriesSelect(user)
      await testUtils.setCategory(user, props.categories[0].title)
      await testUtils.setCategory(user, props.categories[1].title)

      const value1 = testUtils.getSelectedCategory(props.categories[0].title)
      const value2 = testUtils.getSelectedCategory(props.categories[1].title)

      expect(value1).toBeInTheDocument()
      expect(value2).toBeInTheDocument()
    })

    test('Устанавливается значение по умолчанию', async () => {
      const initialCategory = props.categories[1]
      const { user } = render(
        <AmountEquipmentSpentReportFilter
          {...props}
          initialValues={{ categories: [initialCategory.id] }}
        />,
      )

      await testUtils.openCategoriesSelect(user)
      const value = testUtils.getSelectedCategory(initialCategory.title)
      expect(value).toBeInTheDocument()
    })

    test('Сбрасывается к значению по умолчанию', async () => {
      const initialCategory = props.categories[1]
      const { user } = render(
        <AmountEquipmentSpentReportFilter
          {...props}
          initialValues={{ categories: [initialCategory.id] }}
        />,
      )

      await testUtils.openCategoriesSelect(user)
      await testUtils.setCategory(user, props.categories[0].title)
      await testUtils.clickResetButtonIn(user, testUtils.getCategoriesBlock())
      const value = testUtils.getSelectedCategory(initialCategory.title)
      expect(value).toBeInTheDocument()
    })

    test('Переданное значение заменяет значение по умолчанию', async () => {
      const { user } = render(
        <AmountEquipmentSpentReportFilter
          {...props}
          initialValues={{ categories: [props.categories[1].id] }}
          values={{ categories: [props.categories[0].id] }}
        />,
      )

      await testUtils.openCategoriesSelect(user)
      const value = testUtils.getSelectedCategory(props.categories[0].title)
      expect(value).toBeInTheDocument()
    })
  })
})
