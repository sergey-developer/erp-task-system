// owners
import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import {
  equipmentConditionDict,
  EquipmentConditionEnum,
} from 'modules/warehouse/constants/equipment'

import catalogsFixtures from '_tests_/fixtures/catalogs'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import { buttonTestUtils, render, selectTestUtils } from '_tests_/utils'

import HistoryNomenclatureOperationsReportFilter from './index'
import { HistoryNomenclatureOperationsReportFilterProps } from './types'

const props: Readonly<HistoryNomenclatureOperationsReportFilterProps> = {
  open: true,

  values: {},
  initialValues: {},

  locations: catalogsFixtures.locationList(2),
  locationsIsLoading: false,

  owners: warehouseFixtures.customerList(2),
  ownersIsLoading: false,

  onClose: jest.fn(),
  onApply: jest.fn(),
}

const getContainer = () => screen.getByTestId('history-nomenclature-operations-report-filter')
const findContainer = () => screen.findByTestId('history-nomenclature-operations-report-filter')

// conditions
const getConditionsBlock = (): HTMLElement => within(getContainer()).getByTestId('conditions-block')

const getConditionsSelect = (): HTMLElement =>
  within(getConditionsBlock()).getByTestId('conditions-select')

const getConditionsSelectInput = () => selectTestUtils.getSelect(getConditionsSelect())

const openConditionsSelect = (user: UserEvent) =>
  selectTestUtils.openSelect(user, getConditionsBlock())

const setCondition = selectTestUtils.clickSelectOption

const getSelectedCondition = (title: string) =>
  selectTestUtils.getSelectedOptionByTitle(getConditionsSelect(), title)

const querySelectedCondition = (title: string) =>
  selectTestUtils.querySelectedOptionByTitle(getConditionsSelect(), title)

// locations
const getLocationsBlock = () => within(getContainer()).getByTestId('locations-block')
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
const getOwnersBlock = () => within(getContainer()).getByTestId('owners-block')
const getOwnersSelect = () => within(getOwnersBlock()).getByTestId('owners-select')

const getOwnersSelectInput = () => selectTestUtils.getSelect(getOwnersSelect())
const openOwnersSelect = (user: UserEvent) => selectTestUtils.openSelect(user, getOwnersBlock())
const setOwner = selectTestUtils.clickSelectOption

const getSelectedOwner = (title: string) =>
  selectTestUtils.getSelectedOptionByTitle(getOwnersSelect(), title)

const querySelectedOwner = (title: string) =>
  selectTestUtils.querySelectedOptionByTitle(getOwnersSelect(), title)

const expectOwnersLoadingFinished = () => selectTestUtils.expectLoadingFinished(getOwnersSelect())

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

  getConditionsBlock,
  getConditionsSelect,
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
  getOwnersSelectInput,
  openOwnersSelect,
  setOwner,
  getSelectedOwner,
  querySelectedOwner,
  expectOwnersLoadingFinished,

  getResetAllButton,
  clickResetButtonIn,
  clickResetAllButton,

  getApplyButton,
  clickApplyButton,
}

describe('Фильтр истории операций по номенклатуре', () => {
  describe('Состояние', () => {
    test('Отображается', async () => {
      render(<HistoryNomenclatureOperationsReportFilter {...props} />)
      const input = testUtils.getConditionsSelectInput()
      expect(input).toBeInTheDocument()
      expect(input).toBeEnabled()
    })

    test('Можно выбрать несколько вариантов', async () => {
      const { user } = render(<HistoryNomenclatureOperationsReportFilter {...props} />)

      await testUtils.openConditionsSelect(user)
      await testUtils.setCondition(user, equipmentConditionDict[EquipmentConditionEnum.WrittenOff])
      await testUtils.setCondition(user, equipmentConditionDict[EquipmentConditionEnum.Broken])

      const value1 = testUtils.getSelectedCondition(
        equipmentConditionDict[EquipmentConditionEnum.WrittenOff],
      )
      const value2 = testUtils.getSelectedCondition(
        equipmentConditionDict[EquipmentConditionEnum.Broken],
      )

      expect(value1).toBeInTheDocument()
      expect(value2).toBeInTheDocument()
    })

    test('Устанавливается значение по умолчанию', () => {
      render(
        <HistoryNomenclatureOperationsReportFilter
          {...props}
          initialValues={{ conditions: [EquipmentConditionEnum.Working] }}
        />,
      )

      const value = testUtils.getSelectedCondition(
        equipmentConditionDict[EquipmentConditionEnum.Working],
      )

      expect(value).toBeInTheDocument()
    })

    test('Сбрасывается к значению по умолчанию', async () => {
      const { user } = render(
        <HistoryNomenclatureOperationsReportFilter
          {...props}
          initialValues={{ conditions: [EquipmentConditionEnum.WrittenOff] }}
        />,
      )

      await testUtils.openConditionsSelect(user)
      await testUtils.setCondition(user, equipmentConditionDict[EquipmentConditionEnum.Working])

      await testUtils.clickResetButtonIn(user, testUtils.getConditionsBlock())

      const value1 = testUtils.getSelectedCondition(
        equipmentConditionDict[EquipmentConditionEnum.WrittenOff],
      )
      const value2 = testUtils.querySelectedCondition(
        equipmentConditionDict[EquipmentConditionEnum.Working],
      )

      expect(value1).toBeInTheDocument()
      expect(value2).not.toBeInTheDocument()
    })

    test('Переданное значение заменяет значение по умолчанию', () => {
      render(
        <HistoryNomenclatureOperationsReportFilter
          {...props}
          initialValues={{ conditions: [EquipmentConditionEnum.Broken] }}
          values={{ conditions: [EquipmentConditionEnum.NonRepairable] }}
        />,
      )

      const value1 = testUtils.getSelectedCondition(
        equipmentConditionDict[EquipmentConditionEnum.NonRepairable],
      )
      const value2 = testUtils.querySelectedCondition(
        equipmentConditionDict[EquipmentConditionEnum.Broken],
      )

      expect(value1).toBeInTheDocument()
      expect(value2).not.toBeInTheDocument()
    })
  })

  describe('Местонахождение', () => {
    test('Отображается', () => {
      render(<HistoryNomenclatureOperationsReportFilter {...props} />)
      const input = testUtils.getLocationsSelectInput()
      expect(input).toBeInTheDocument()
      expect(input).toBeEnabled()
    })

    test('Можно выбрать несколько вариантов', async () => {
      const { user } = render(<HistoryNomenclatureOperationsReportFilter {...props} />)

      await testUtils.openLocationsSelect(user)
      await testUtils.setLocation(user, props.locations[0].title)
      await testUtils.setLocation(user, props.locations[1].title)

      const value1 = testUtils.getSelectedLocation(props.locations[0].title)
      const value2 = testUtils.getSelectedLocation(props.locations[1].title)

      expect(value1).toBeInTheDocument()
      expect(value2).toBeInTheDocument()
    })

    test('Устанавливается значение по умолчанию', () => {
      render(
        <HistoryNomenclatureOperationsReportFilter
          {...props}
          initialValues={{ locations: [props.locations[0].id] }}
        />,
      )
      const value = testUtils.getSelectedLocation(props.locations[0].title)
      expect(value).toBeInTheDocument()
    })

    test('Сбрасывается к значению по умолчанию', async () => {
      const { user } = render(
        <HistoryNomenclatureOperationsReportFilter
          {...props}
          initialValues={{ locations: [props.locations[0].id] }}
        />,
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
        <HistoryNomenclatureOperationsReportFilter
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
      render(<HistoryNomenclatureOperationsReportFilter {...props} />)
      const input = testUtils.getOwnersSelectInput()
      expect(input).toBeInTheDocument()
      expect(input).toBeEnabled()
    })

    test('Можно выбрать несколько вариантов', async () => {
      const { user } = render(<HistoryNomenclatureOperationsReportFilter {...props} />)

      await testUtils.openOwnersSelect(user)
      await testUtils.setOwner(user, props.owners[0].title)
      await testUtils.setOwner(user, props.owners[1].title)

      const value1 = testUtils.getSelectedOwner(props.owners[0].title)
      const value2 = testUtils.getSelectedOwner(props.owners[1].title)

      expect(value1).toBeInTheDocument()
      expect(value2).toBeInTheDocument()
    })

    test('Устанавливается значение по умолчанию', async () => {
      const initialOwner = props.owners[1]
      const { user } = render(
        <HistoryNomenclatureOperationsReportFilter
          {...props}
          initialValues={{ owners: [initialOwner.id] }}
        />,
      )

      await testUtils.openOwnersSelect(user)
      const value = testUtils.getSelectedOwner(initialOwner.title)
      expect(value).toBeInTheDocument()
    })

    test('Сбрасывается к значению по умолчанию', async () => {
      const initialOwner = props.owners[1]
      const { user } = render(
        <HistoryNomenclatureOperationsReportFilter
          {...props}
          initialValues={{ owners: [initialOwner.id] }}
        />,
      )

      await testUtils.openOwnersSelect(user)
      await testUtils.setOwner(user, props.owners[0].title)
      await testUtils.clickResetButtonIn(user, testUtils.getOwnersBlock())
      const value = testUtils.getSelectedOwner(initialOwner.title)
      expect(value).toBeInTheDocument()
    })

    test('Переданное значение заменяет значение по умолчанию', async () => {
      const { user } = render(
        <HistoryNomenclatureOperationsReportFilter
          {...props}
          initialValues={{ owners: [props.owners[1].id] }}
          values={{ owners: [props.owners[0].id] }}
        />,
      )

      await testUtils.openOwnersSelect(user)
      const value = testUtils.getSelectedOwner(props.owners[0].title)
      expect(value).toBeInTheDocument()
    })
  })
})
