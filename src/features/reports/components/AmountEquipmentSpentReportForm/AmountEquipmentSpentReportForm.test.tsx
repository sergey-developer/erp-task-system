import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import moment from 'moment-timezone'

import { DATE_PICKER_FORMAT } from 'lib/antd/constants/dateTimePicker'

import { UPDATE_TEXT } from 'shared/constants/common'
import { validationMessages } from 'shared/constants/validation'

import catalogsFixtures from '_tests_/fixtures/catalogs'
import equipmentsFixtures from '_tests_/fixtures/equipments'
import { buttonTestUtils, render, selectTestUtils } from '_tests_/helpers'

import AmountEquipmentSpentReportForm from './index'
import { AmountEquipmentSpentReportFormProps } from './types'

const props: AmountEquipmentSpentReportFormProps = {
  nomenclatures: [],
  nomenclaturesIsLoading: false,

  locations: [],
  locationsIsLoading: false,

  onSubmit: jest.fn(),
}

const getContainer = () => screen.getByTestId('amount-equipment-spent-report-form')

// nomenclature field
const getNomenclatureFormItem = () => within(getContainer()).getByTestId('nomenclature-form-item')
const getNomenclatureSelect = () =>
  within(getNomenclatureFormItem()).getByTestId('nomenclature-select')
const getNomenclatureSelectInput = () => selectTestUtils.getSelect(getNomenclatureSelect())

const openNomenclatureSelect = (user: UserEvent) =>
  selectTestUtils.openSelect(user, getNomenclatureFormItem())

const setNomenclature = selectTestUtils.clickSelectOption

const getSelectedNomenclature = (title: string) =>
  selectTestUtils.getSelectedOptionByTitle(getNomenclatureSelect(), title)

const findNomenclatureError = (error: string) => within(getNomenclatureFormItem()).findByText(error)

const expectNomenclaturesLoadingStarted = () =>
  selectTestUtils.expectLoadingStarted(getNomenclatureFormItem())

const expectNomenclaturesLoadingFinished = () =>
  selectTestUtils.expectLoadingFinished(getNomenclatureFormItem())

// relocate from field
const getRelocateFromFormItem = () => within(getContainer()).getByTestId('relocate-from-form-item')
const getRelocateFromSelect = () =>
  within(getRelocateFromFormItem()).getByTestId('relocate-from-select')
const getRelocateFromSelectInput = () => selectTestUtils.getSelect(getRelocateFromSelect())

const openRelocateFromSelect = (user: UserEvent) =>
  selectTestUtils.openSelect(user, getRelocateFromFormItem())

const setRelocateFrom = selectTestUtils.clickSelectOption

const getSelectedRelocateFrom = (title: string) =>
  selectTestUtils.getSelectedOptionByTitle(getRelocateFromSelect(), title)

const findRelocateFromError = (error: string) => within(getRelocateFromFormItem()).findByText(error)
const queryRelocateFromError = (error: string) =>
  within(getRelocateFromFormItem()).queryByText(error)

const expectRelocateFromLoadingStarted = () =>
  selectTestUtils.expectLoadingStarted(getRelocateFromFormItem())

const expectRelocateFromLoadingFinished = () =>
  selectTestUtils.expectLoadingFinished(getRelocateFromFormItem())

// relocate to field
const getRelocateToFormItem = () => within(getContainer()).getByTestId('relocate-to-form-item')
const getRelocateToSelect = () => within(getRelocateToFormItem()).getByTestId('relocate-to-select')
const getRelocateToSelectInput = () => selectTestUtils.getSelect(getRelocateToSelect())

const openRelocateToSelect = (user: UserEvent) =>
  selectTestUtils.openSelect(user, getRelocateToFormItem())

const setRelocateTo = selectTestUtils.clickSelectOption

const getSelectedRelocateTo = (title: string) =>
  selectTestUtils.getSelectedOptionByTitle(getRelocateToSelect(), title)

const findRelocateToError = (error: string) => within(getRelocateToFormItem()).findByText(error)
const queryRelocateToError = (error: string) => within(getRelocateToFormItem()).queryByText(error)

const expectRelocateToLoadingStarted = () =>
  selectTestUtils.expectLoadingStarted(getRelocateToFormItem())

const expectRelocateToLoadingFinished = () =>
  selectTestUtils.expectLoadingFinished(getRelocateToFormItem())

// period
const getPeriodFormItem = () => screen.getByTestId('period-form-item')

const getPeriodStartDateField = (): HTMLInputElement =>
  within(getPeriodFormItem()).getByPlaceholderText('Начальная дата')

const getPeriodEndDateField = (): HTMLInputElement =>
  within(getPeriodFormItem()).getByPlaceholderText('Конечная дата')

const setPeriod = async (user: UserEvent) => {
  const startDateField = getPeriodStartDateField()
  const endDateField = getPeriodEndDateField()

  const startDateMoment = moment()
  const endDateMoment = startDateMoment.add(1, 'day')
  const startDateValue = startDateMoment.format(DATE_PICKER_FORMAT)
  const endDateValue = endDateMoment.format(DATE_PICKER_FORMAT)

  await user.type(startDateField, startDateValue)
  await user.type(endDateField, endDateValue)
  await user.tab()

  return { startDateField, startDateValue, endDateField, endDateValue }
}

// submit button
const clickSubmitButton = async (user: UserEvent) => {
  const button = buttonTestUtils.getButtonIn(getContainer(), UPDATE_TEXT)
  await user.click(button)
}

export const testUtils = {
  getContainer,

  getNomenclatureSelectInput,
  openNomenclatureSelect,
  setNomenclature,
  getSelectedNomenclature,
  findNomenclatureError,
  expectNomenclaturesLoadingStarted,
  expectNomenclaturesLoadingFinished,

  getRelocateFromSelectInput,
  openRelocateFromSelect,
  setRelocateFrom,
  getSelectedRelocateFrom,
  findRelocateFromError,
  queryRelocateFromError,
  expectRelocateFromLoadingStarted,
  expectRelocateFromLoadingFinished,

  getRelocateToSelectInput,
  openRelocateToSelect,
  setRelocateTo,
  getSelectedRelocateTo,
  findRelocateToError,
  queryRelocateToError,
  expectRelocateToLoadingStarted,
  expectRelocateToLoadingFinished,

  setPeriod,

  clickSubmitButton,
}

describe('Форма отчета количества потраченного оборудования', () => {
  describe('Поле номенклатуры', () => {
    test('Можно установить значение', async () => {
      const equipmentNomenclatureListItem = equipmentsFixtures.equipmentNomenclatureListItem()

      const { user } = render(
        <AmountEquipmentSpentReportForm
          {...props}
          nomenclatures={[equipmentNomenclatureListItem]}
        />,
      )

      await testUtils.openNomenclatureSelect(user)
      await testUtils.setNomenclature(user, equipmentNomenclatureListItem.title)
      const value = testUtils.getSelectedNomenclature(equipmentNomenclatureListItem.title)

      expect(value).toBeInTheDocument()
    })

    test('Обязательное поле', async () => {
      const { user } = render(<AmountEquipmentSpentReportForm {...props} />)
      await testUtils.clickSubmitButton(user)
      const error = await testUtils.findNomenclatureError(validationMessages.required)
      expect(error).toBeInTheDocument()
    })
  })

  describe('Поле объект выбытия', () => {
    test('Можно установить значение', async () => {
      const locationCatalogItem = catalogsFixtures.locationCatalogItem()

      const { user } = render(
        <AmountEquipmentSpentReportForm {...props} locations={[locationCatalogItem]} />,
      )

      await testUtils.openRelocateFromSelect(user)
      await testUtils.setRelocateFrom(user, locationCatalogItem.title)
      const value = testUtils.getSelectedRelocateFrom(locationCatalogItem.title)

      expect(value).toBeInTheDocument()
    })

    test('Обязательное поле если объект прибытия не выбран', async () => {
      const { user } = render(<AmountEquipmentSpentReportForm {...props} />)
      await testUtils.clickSubmitButton(user)
      const error = await testUtils.findRelocateFromError(validationMessages.required)
      expect(error).toBeInTheDocument()
    })

    test('Не обязательное поле если объект прибытия выбран', async () => {
      const locationCatalogItem = catalogsFixtures.locationCatalogItem()

      const { user } = render(
        <AmountEquipmentSpentReportForm {...props} locations={[locationCatalogItem]} />,
      )

      await testUtils.openRelocateToSelect(user)
      await testUtils.setRelocateTo(user, locationCatalogItem.title)
      await testUtils.clickSubmitButton(user)
      const error = testUtils.queryRelocateFromError(validationMessages.required)
      expect(error).not.toBeInTheDocument()
    })
  })

  describe('Поле объект прибытия', () => {
    test('Можно установить значение', async () => {
      const locationCatalogItem = catalogsFixtures.locationCatalogItem()

      const { user } = render(
        <AmountEquipmentSpentReportForm {...props} locations={[locationCatalogItem]} />,
      )

      await testUtils.openRelocateToSelect(user)
      await testUtils.setRelocateTo(user, locationCatalogItem.title)
      const value = testUtils.getSelectedRelocateTo(locationCatalogItem.title)

      expect(value).toBeInTheDocument()
    })

    test('Обязательное поле если объект выбытия не выбран', async () => {
      const { user } = render(<AmountEquipmentSpentReportForm {...props} />)
      await testUtils.clickSubmitButton(user)
      const error = await testUtils.findRelocateToError(validationMessages.required)
      expect(error).toBeInTheDocument()
    })

    test('Не обязательное поле если объект выбытия выбран', async () => {
      const locationCatalogItem = catalogsFixtures.locationCatalogItem()

      const { user } = render(
        <AmountEquipmentSpentReportForm {...props} locations={[locationCatalogItem]} />,
      )

      await testUtils.openRelocateFromSelect(user)
      await testUtils.setRelocateFrom(user, locationCatalogItem.title)
      await testUtils.clickSubmitButton(user)
      const error = testUtils.queryRelocateToError(validationMessages.required)
      expect(error).not.toBeInTheDocument()
    })
  })

  describe('Поле периода', () => {
    test('Можно установить значение', async () => {
      const { user } = render(<AmountEquipmentSpentReportForm {...props} />)

      const { startDateField, startDateValue, endDateField, endDateValue } =
        await testUtils.setPeriod(user)

      expect(startDateField).toHaveDisplayValue(startDateValue)
      expect(endDateField).toHaveDisplayValue(endDateValue)
    })
  })
})
