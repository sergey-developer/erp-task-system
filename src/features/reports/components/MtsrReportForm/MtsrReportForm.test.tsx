import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import moment from 'moment-timezone'

import { DATE_PICKER_FORMAT } from 'lib/antd/constants/dateTimePicker'

import { UPDATE_TEXT } from 'shared/constants/common'
import { validationMessages } from 'shared/constants/validation'

import warehouseFixtures from '_tests_/fixtures/warehouse'
import { buttonTestUtils, render, selectTestUtils } from '_tests_/helpers'

import MtsrReportForm from './index'
import { MtsrReportFormProps } from './types'

const props: MtsrReportFormProps = {
  customers: [],
  customersIsLoading: false,

  initialValues: {},

  onSubmit: jest.fn(),
}

const getContainer = () => screen.getByTestId('mtsr-report-form')

// customers
const getCustomersFormItem = () => screen.getByTestId('customers-form-item')
const getCustomersSelect = () => selectTestUtils.getSelect(getCustomersFormItem())

const openCustomersSelect = (user: UserEvent) =>
  selectTestUtils.openSelect(user, getCustomersFormItem())

const setCustomer = selectTestUtils.clickSelectOption

const getSelectedCustomer = (text: string) =>
  selectTestUtils.getSelectedOptionByTitle(getCustomersFormItem(), text)

const querySelectedCustomer = (title: string) =>
  selectTestUtils.querySelectedOptionByTitle(getCustomersFormItem(), title)

const expectCustomersLoadingFinished = () =>
  selectTestUtils.expectLoadingFinished(getCustomersFormItem())

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

  return {
    startDateField,
    startDateValue,
    endDateField,
    endDateValue,
  }
}

const findPeriodError = (error: string) => within(getPeriodFormItem()).findByText(error)

// submit button
const clickSubmitButton = async (user: UserEvent) => {
  const button = buttonTestUtils.getButtonIn(getContainer(), UPDATE_TEXT)
  await user.click(button)
}

export const testUtils = {
  getContainer,

  getCustomersSelect,
  openCustomersSelect,
  setCustomer,
  getSelectedCustomer,
  querySelectedCustomer,
  expectCustomersLoadingFinished,

  setPeriod,
  findPeriodError,

  clickSubmitButton,
}

describe('Форма отчета MTSR', () => {
  describe('Клиенты', () => {
    test('Отображается корректно', async () => {
      const customerListItem = warehouseFixtures.customerListItem()
      const customers = [customerListItem]
      const { user } = render(<MtsrReportForm {...props} customers={customers} />)

      const field = testUtils.getCustomersSelect()
      const selectedOption = testUtils.querySelectedCustomer(customerListItem.title)
      await testUtils.openCustomersSelect(user)

      expect(field).toBeInTheDocument()
      expect(field).toBeEnabled()
      expect(selectedOption).not.toBeInTheDocument()
      customers.forEach((item) => {
        const option = selectTestUtils.getSelectOption(item.title)
        expect(option).toBeInTheDocument()
      })
    })

    test('Можно выбрать несколько вариантов', async () => {
      const customerListItem1 = warehouseFixtures.customerListItem()
      const customerListItem2 = warehouseFixtures.customerListItem()
      const { user } = render(
        <MtsrReportForm {...props} customers={[customerListItem1, customerListItem2]} />,
      )

      await testUtils.openCustomersSelect(user)
      await testUtils.setCustomer(user, customerListItem1.title)
      await testUtils.setCustomer(user, customerListItem2.title)

      const selectedOption1 = testUtils.getSelectedCustomer(customerListItem1.title)
      const selectedOption2 = testUtils.getSelectedCustomer(customerListItem2.title)

      expect(selectedOption1).toBeInTheDocument()
      expect(selectedOption1).toHaveTextContent(customerListItem1.title)
      expect(selectedOption2).toBeInTheDocument()
      expect(selectedOption2).toHaveTextContent(customerListItem2.title)
    })

    test('Значение по умолчанию устанавливается', () => {
      const customerListItem = warehouseFixtures.customerListItem()

      render(
        <MtsrReportForm
          {...props}
          customers={[customerListItem]}
          initialValues={{ customers: [customerListItem.id] }}
        />,
      )

      const selectedOption = testUtils.getSelectedCustomer(customerListItem.title)

      expect(selectedOption).toBeInTheDocument()
      expect(selectedOption).toHaveTextContent(customerListItem.title)
    })
  })

  describe('Период', () => {
    test('Можно установить значение', async () => {
      const { user } = render(<MtsrReportForm {...props} />)

      const { startDateField, startDateValue, endDateField, endDateValue } =
        await testUtils.setPeriod(user)

      expect(startDateField).toHaveDisplayValue(startDateValue)
      expect(endDateField).toHaveDisplayValue(endDateValue)
    })

    test('Обязательное поле', async () => {
      const { user } = render(<MtsrReportForm {...props} />)

      await testUtils.clickSubmitButton(user)
      const error = await testUtils.findPeriodError(validationMessages.required)

      expect(error).toBeInTheDocument()
    })
  })

  test('Обработчик вызывается если заполнены обязательные поля', async () => {
    const { user } = render(<MtsrReportForm {...props} />)

    await testUtils.setPeriod(user)
    await testUtils.clickSubmitButton(user)

    expect(props.onSubmit).toBeCalledTimes(1)
  })

  test('Обработчик не вызывается если не заполнены обязательные поля', async () => {
    const { user } = render(<MtsrReportForm {...props} />)
    await testUtils.clickSubmitButton(user)
    expect(props.onSubmit).not.toBeCalled()
  })
})
