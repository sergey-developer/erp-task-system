import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import moment from 'moment-timezone'

import { DATE_PICKER_FORMAT } from 'lib/antd/constants/dateTimePicker'

import { UPDATE_TEXT } from 'shared/constants/common'
import { validationMessages } from 'shared/constants/validation'

import userFixtures from '_tests_/fixtures/users'
import { buttonTestUtils, render, selectTestUtils } from '_tests_/helpers'

import EmployeesActionsReportForm from './index'
import { EmployeesActionsReportFormProps } from './types'

const props: EmployeesActionsReportFormProps = {
  users: [],
  usersIsLoading: false,

  onSubmit: jest.fn(),
}

const getContainer = () => screen.getByTestId('employees-actions-report-form')

// employee field
const getEmployeeFormItem = () => within(getContainer()).getByTestId('employee-form-item')
const getEmployeeSelect = () => within(getEmployeeFormItem()).getByTestId('employee-select')
const getEmployeeSelectInput = () => selectTestUtils.getSelect(getEmployeeSelect())

const openEmployeeSelect = (user: UserEvent) =>
  selectTestUtils.openSelect(user, getEmployeeFormItem())

const setEmployee = selectTestUtils.clickSelectOption

const getSelectedEmployee = (title: string) =>
  selectTestUtils.getSelectedOptionByTitle(getEmployeeSelect(), title)

const findEmployeeError = (error: string) => within(getEmployeeFormItem()).findByText(error)

const expectEmployeesLoadingStarted = () =>
  selectTestUtils.expectLoadingStarted(getEmployeeFormItem())

const expectEmployeesLoadingFinished = () =>
  selectTestUtils.expectLoadingFinished(getEmployeeFormItem())

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

  getEmployeeSelectInput,
  openEmployeeSelect,
  setEmployee,
  getSelectedEmployee,
  findEmployeeError,
  expectEmployeesLoadingStarted,
  expectEmployeesLoadingFinished,

  setPeriod,

  clickSubmitButton,
}

describe('Форма отчета действий сотрудников', () => {
  describe('Поле сотрудника', () => {
    test('Можно установить значение', async () => {
      const userListItem = userFixtures.user()

      const { user } = render(<EmployeesActionsReportForm {...props} users={[userListItem]} />)

      await testUtils.openEmployeeSelect(user)
      await testUtils.setEmployee(user, userListItem.fullName)
      const value = testUtils.getSelectedEmployee(userListItem.fullName)

      expect(value).toBeInTheDocument()
    })

    test('Обязательное поле', async () => {
      const { user } = render(<EmployeesActionsReportForm {...props} />)
      await testUtils.clickSubmitButton(user)
      const error = await testUtils.findEmployeeError(validationMessages.required)
      expect(error).toBeInTheDocument()
    })
  })

  describe('Поле периода', () => {
    test('Можно установить значение', async () => {
      const { user } = render(<EmployeesActionsReportForm {...props} />)

      const { startDateField, startDateValue, endDateField, endDateValue } =
        await testUtils.setPeriod(user)

      expect(startDateField).toHaveDisplayValue(startDateValue)
      expect(endDateField).toHaveDisplayValue(endDateValue)
    })
  })
})
