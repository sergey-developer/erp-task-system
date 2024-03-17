import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import moment from 'moment-timezone'

import { DATE_PICKER_FORMAT } from 'lib/antd/constants/dateTimePicker'

import { UPDATE_TEXT } from 'shared/constants/common'
import { validationMessages } from 'shared/constants/validation'

import warehouseFixtures from '_tests_/fixtures/warehouse'
import { buttonTestUtils, render, selectTestUtils } from '_tests_/utils'

import HistoryNomenclatureOperationsReportForm from './index'
import { HistoryNomenclatureOperationsReportFormProps } from './types'

const props: HistoryNomenclatureOperationsReportFormProps = {
  nomenclatures: [],
  nomenclaturesIsLoading: false,

  onSubmit: jest.fn(),
}

const getContainer = () => screen.getByTestId('spent-equipment-amount-report-form')

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

  setPeriod,

  clickSubmitButton,
}

describe('Форма отчета истории операций по номенклатуре', () => {
  describe('Поле номенклатуры', () => {
    test('Можно установить значение', async () => {
      const equipmentNomenclatureListItem = warehouseFixtures.equipmentNomenclatureListItem()

      const { user } = render(
        <HistoryNomenclatureOperationsReportForm
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
      const { user } = render(<HistoryNomenclatureOperationsReportForm {...props} />)
      await testUtils.clickSubmitButton(user)
      const error = await testUtils.findNomenclatureError(validationMessages.required)
      expect(error).toBeInTheDocument()
    })
  })

  describe('Поле периода', () => {
    test('Можно установить значение', async () => {
      const { user } = render(<HistoryNomenclatureOperationsReportForm {...props} />)

      const { startDateField, startDateValue, endDateField, endDateValue } =
        await testUtils.setPeriod(user)

      expect(startDateField).toHaveDisplayValue(startDateValue)
      expect(endDateField).toHaveDisplayValue(endDateValue)
    })
  })
})
