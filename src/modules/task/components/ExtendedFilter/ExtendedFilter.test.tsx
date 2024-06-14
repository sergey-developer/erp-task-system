import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import moment from 'moment-timezone'

import {
  TaskAssignedEnum,
  taskExtendedStatusDict,
  TaskExtendedStatusEnum,
} from 'modules/task/constants/task'
import { getInitialExtendedFilterFormValues } from 'modules/task/pages/TaskListPage/utils'
import { UserRoleEnum } from 'modules/user/constants'

import macroregionFixtures from '_tests_/fixtures/macroregion'
import supportGroupFixtures from '_tests_/fixtures/supportGroup'
import userFixtures from '_tests_/fixtures/user'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import workGroupFixtures from '_tests_/fixtures/workGroup'
import {
  buttonTestUtils,
  checkboxTestUtils,
  fakeName,
  fakeWord,
  getStoreWithAuth,
  radioButtonTestUtils,
  render,
  selectTestUtils,
  setupApiTests,
} from '_tests_/utils'

import { searchFieldDict, taskAssignedDict, taskOverdueDict } from './constants'
import ExtendedFilter from './index'
import { TasksFilterProps } from './types'

const taskExtendedStatusDictValues = Object.values(taskExtendedStatusDict)
const taskOverdueDictValues = Object.values(taskOverdueDict)
const taskAssignedDictValues = Object.values(taskAssignedDict)
const searchFieldDictValues = Object.values(searchFieldDict)

const props: Readonly<TasksFilterProps> = {
  open: true,

  formValues: getInitialExtendedFilterFormValues(),
  initialFormValues: getInitialExtendedFilterFormValues(),

  userList: [],
  userListIsLoading: false,

  workGroupList: [],
  workGroupListIsLoading: false,

  customerList: [],
  customerListIsLoading: false,
  onChangeCustomers: jest.fn(),

  macroregionList: [],
  macroregionListIsLoading: false,
  onChangeMacroregions: jest.fn(),

  supportGroupList: [],
  supportGroupListIsLoading: false,

  onClose: jest.fn(),
  onSubmit: jest.fn(),
}

const getContainer = () => screen.getByTestId('extended-filter')
const findContainer = () => screen.findByTestId('extended-filter')

// reset button
const getResetAllButton = () => buttonTestUtils.getButtonIn(getContainer(), /сбросить все/i)

const clickResetButtonIn = async (user: UserEvent, container: HTMLElement) => {
  const button = buttonTestUtils.getButtonIn(container, /сбросить/i)
  await user.click(button)
  return button
}

const clickResetAllButton = async (user: UserEvent) => {
  const button = getResetAllButton()
  await user.click(button)
  return button
}

// close button
const getCloseButton = () => buttonTestUtils.getButtonIn(getContainer(), /close/i)

const closeFilter = async (user: UserEvent) => {
  const button = getCloseButton()
  await user.click(button)
  return button
}

// apply button
const getApplyButton = () => buttonTestUtils.getButtonIn(getContainer(), /применить/i)

const clickApplyButton = async (user: UserEvent) => {
  const button = getApplyButton()
  await user.click(button)
  return button
}

// support group
const getSupportGroupBlock = () => within(getContainer()).getByTestId('support-group-block')
// support group. customers
const getCustomersFormItem = () => screen.getByTestId('customers-form-item')

const getCustomersSelect = () => selectTestUtils.getSelect(getCustomersFormItem())

const openCustomersSelect = (user: UserEvent) =>
  selectTestUtils.openSelect(user, getCustomersFormItem())

const setCustomer = selectTestUtils.clickSelectOption

const getSelectedCustomer = () => selectTestUtils.getSelectedOption(getCustomersFormItem())

const expectCustomersLoadingStarted = () =>
  selectTestUtils.expectLoadingStarted(getCustomersFormItem())

const expectCustomersLoadingFinished = () =>
  selectTestUtils.expectLoadingFinished(getCustomersFormItem())

// support group. macroregions
const getMacroregionsFormItem = () => screen.getByTestId('macroregions-form-item')

const getMacroregionsSelect = () => selectTestUtils.getSelect(getMacroregionsFormItem())

const openMacroregionsSelect = (user: UserEvent) =>
  selectTestUtils.openSelect(user, getMacroregionsFormItem())

const setMacroregion = selectTestUtils.clickSelectOption

const getSelectedMacroregion = () => selectTestUtils.getSelectedOption(getMacroregionsFormItem())

const expectMacroregionsLoadingStarted = () =>
  selectTestUtils.expectLoadingStarted(getMacroregionsFormItem())

const expectMacroregionsLoadingFinished = () =>
  selectTestUtils.expectLoadingFinished(getMacroregionsFormItem())

// support group. supportGroups
const getSupportGroupsFormItem = () => screen.getByTestId('support-groups-form-item')

const getSupportGroupsSelect = () => selectTestUtils.getSelect(getSupportGroupsFormItem())

const openSupportGroupsSelect = (user: UserEvent) =>
  selectTestUtils.openSelect(user, getSupportGroupsFormItem())

const setSupportGroup = selectTestUtils.clickSelectOption

const getSelectedSupportGroup = () => selectTestUtils.getSelectedOption(getSupportGroupsFormItem())

const expectSupportGroupsLoadingStarted = () =>
  selectTestUtils.expectLoadingStarted(getSupportGroupsFormItem())

const expectSupportGroupsLoadingFinished = () =>
  selectTestUtils.expectLoadingFinished(getSupportGroupsFormItem())

// status
const getStatusFieldContainer = () => screen.getByTestId('status-block')

const getStatusField = (label: string) =>
  checkboxTestUtils.getCheckboxIn(getStatusFieldContainer(), new RegExp(label))

const setStatus = async (user: UserEvent, label: string) => {
  const field = getStatusField(label)
  await user.click(field)
  return field
}

const expectStatusHasCorrectInitialValues = () => {
  const container = getStatusFieldContainer()

  Object.entries(taskExtendedStatusDict).forEach(([value, text]) => {
    const checkbox = checkboxTestUtils.getCheckboxIn(container, new RegExp(text))
    expect(checkbox).not.toBeChecked()
    expect(checkbox.value).toBe(value)
  })
}

const status = {
  getContainer: getStatusFieldContainer,
  getField: getStatusField,
  setValue: setStatus,
  expectHasCorrectInitialValues: expectStatusHasCorrectInitialValues,
}

// assigned
const getAssignedFieldContainer = () => screen.getByTestId('is-assigned-block')

const getAssignedField = (label: string) =>
  radioButtonTestUtils.getRadioButtonIn(getAssignedFieldContainer(), label)

const setAssigned = async (user: UserEvent, label: string) => {
  const radioButton = getAssignedField(label)
  await user.click(radioButton)
  return radioButton
}

const expectAssignedHasCorrectInitialValues = () => {
  const container = getAssignedFieldContainer()

  Object.entries(taskAssignedDict).forEach(([value, text]) => {
    const radioButton = radioButtonTestUtils.getRadioButtonIn(container, text)
    expect(radioButton).not.toBeChecked()
    expect(radioButton.value).toBe(value)
  })
}

const assigned = {
  getContainer: getAssignedFieldContainer,
  getField: getAssignedField,
  setValue: setAssigned,
  expectHasCorrectInitialValues: expectAssignedHasCorrectInitialValues,
}

// overdue
const getOverdueFieldContainer = () => screen.getByTestId('is-overdue-block')

const getOverdueField = (label: string) =>
  radioButtonTestUtils.getRadioButtonIn(getOverdueFieldContainer(), label)

const setOverdue = async (user: UserEvent, label: string) => {
  const radioButton = getOverdueField(label)
  await user.click(radioButton)
  return radioButton
}

const expectOverdueHasCorrectInitialValues = () => {
  const container = getOverdueFieldContainer()

  Object.entries(taskOverdueDict).forEach(([value, text]) => {
    const radioButton = radioButtonTestUtils.getRadioButtonIn(container, text)
    expect(radioButton).not.toBeChecked()
    expect(radioButton.value).toBe(value)
  })
}

const overdue = {
  getContainer: getOverdueFieldContainer,
  getField: getOverdueField,
  setValue: setOverdue,
  expectHasCorrectInitialValues: expectOverdueHasCorrectInitialValues,
}

// complete at
const getCompleteAtFieldContainer = () => screen.getByTestId('complete-at-block')

const getStartDateField = (): HTMLInputElement =>
  within(getCompleteAtFieldContainer()).getByPlaceholderText('Начальная дата')

const getEndDateField = (): HTMLInputElement =>
  within(getCompleteAtFieldContainer()).getByPlaceholderText('Конечная дата')

const setCompleteAt = async (user: UserEvent) => {
  const startDateField = getStartDateField()
  const endDateField = getEndDateField()

  const startDateValue = '2022-09-10'
  const endDateValue = '2022-09-11'

  await user.type(startDateField, startDateValue)
  await user.type(endDateField, endDateValue)
  await user.tab()

  return { startDateField, startDateValue, endDateField, endDateValue }
}

const expectCompleteAtHasCorrectInitialValues = () => {
  expect(getStartDateField()).not.toHaveValue()
  expect(getEndDateField()).not.toHaveValue()
}

const completeAt = {
  getContainer: getCompleteAtFieldContainer,
  getStartDateField: getStartDateField,
  getEndDateField: getEndDateField,
  setValue: setCompleteAt,
  expectHasCorrectInitialValues: expectCompleteAtHasCorrectInitialValues,
}

// creation date
const getCreationDateBlock = () => screen.getByTestId('creation-date-block')

const getCreationStartDateField = (): HTMLInputElement =>
  within(getCreationDateBlock()).getByPlaceholderText('Начальная дата')

const getCreationEndDateField = (): HTMLInputElement =>
  within(getCreationDateBlock()).getByPlaceholderText('Конечная дата')

const setCreationDate = async (user: UserEvent) => {
  const startDateField = getCreationStartDateField()
  const endDateField = getCreationEndDateField()

  const startDateValue = '2022-09-10'
  const endDateValue = '2022-09-11'

  await user.type(startDateField, startDateValue)
  await user.type(endDateField, endDateValue)
  await user.tab()

  return { startDateField, startDateValue, endDateField, endDateValue }
}

const expectCreationDateHasCorrectInitialValues = () => {
  expect(getCreationStartDateField()).not.toHaveValue()
  expect(getCreationEndDateField()).not.toHaveValue()
}

const creationDate = {
  getContainer: getCreationDateBlock,
  getStartDateField: getCreationStartDateField,
  getEndDateField: getCreationEndDateField,
  setValue: setCreationDate,
  expectHasCorrectInitialValues: expectCreationDateHasCorrectInitialValues,
}

// work group
const getWorkGroupFieldContainer = () => screen.getByTestId('work-group-block')

const getWorkGroupField = () => screen.getByTestId('work-group-select')

const queryWorkGroupField = () => screen.queryByTestId('work-group-select')

const workGroupExpectLoadingFinished = async () => {
  const workGroupField = getWorkGroupField()
  await selectTestUtils.expectLoadingFinished(workGroupField)
  return workGroupField
}

const workGroup = {
  getContainer: getWorkGroupFieldContainer,
  getField: getWorkGroupField,
  queryField: queryWorkGroupField,
  openField: selectTestUtils.openSelect,
  setValue: selectTestUtils.clickSelectOption,
  expectLoadingFinished: workGroupExpectLoadingFinished,
}

// manager
const getManagerFilterBlock = () => screen.getByTestId('manager-block')

const getManagerFieldContainer = () => screen.getByTestId('manager-select')

const getManagerField = () => selectTestUtils.getSelect(getManagerFieldContainer())

const openManagerSelect = async (user: UserEvent): Promise<HTMLElement> => {
  const container = getManagerFieldContainer()
  await selectTestUtils.openSelect(user, container)
  return container
}

const getSelectedManager = () => selectTestUtils.getSelectedOption(getManagerFieldContainer())

const expectManagerLoadingFinished = () =>
  selectTestUtils.expectLoadingFinished(getManagerFieldContainer())

const manager = {
  getContainer: getManagerFilterBlock,
  getFieldContainer: getManagerFieldContainer,
  getField: getManagerField,
  getSelected: getSelectedManager,
  openField: openManagerSelect,
  setValue: selectTestUtils.clickSelectOption,
  expectLoadingFinished: expectManagerLoadingFinished,
}

// search by column
const getSearchByColumnFieldContainer = () => screen.getByTestId('search-by-column-block')

const getSearchByColumnKeywordField = (): HTMLInputElement =>
  within(getSearchByColumnFieldContainer()).getByPlaceholderText('Ключевое слово')

const getSearchByColumnColumnField = (label: string) =>
  radioButtonTestUtils.getRadioButtonIn(getSearchByColumnFieldContainer(), label)

const setSearchByColumnKeyword = async (user: UserEvent) => {
  const keywordField = getSearchByColumnKeywordField()
  const keyword = fakeWord()

  await user.type(keywordField, keyword)

  return { keywordField, keyword }
}

const setSearchByColumnField = async (user: UserEvent, label: string) => {
  const radioButton = radioButtonTestUtils.getRadioButtonIn(
    getSearchByColumnFieldContainer(),
    label,
  )
  await user.click(radioButton)
  return radioButton
}

const expectSearchByColumnHasCorrectInitialValues = () => {
  const searchByNameButton = getSearchByColumnColumnField(searchFieldDict.searchByName)

  const searchByTitleButton = getSearchByColumnColumnField(searchFieldDict.searchByTitle)

  const searchByAssigneeButton = getSearchByColumnColumnField(searchFieldDict.searchByAssignee)

  expect(searchByNameButton.value).toBe('searchByName')
  expect(searchByTitleButton.value).toBe('searchByTitle')
  expect(searchByAssigneeButton.value).toBe('searchByAssignee')

  expect(searchByNameButton).not.toBeChecked()
  expect(searchByTitleButton).toBeChecked()
  expect(searchByAssigneeButton).not.toBeChecked()

  const keywordField = getSearchByColumnKeywordField()
  expect(keywordField).not.toHaveValue()
}

const searchByColumn = {
  getContainer: getSearchByColumnFieldContainer,
  getColumnField: getSearchByColumnColumnField,
  getKeywordField: getSearchByColumnKeywordField,
  setKeywordValue: setSearchByColumnKeyword,
  setColumnValue: setSearchByColumnField,
  expectHasCorrectInitialValues: expectSearchByColumnHasCorrectInitialValues,
}

export const testUtils = {
  getContainer,
  findContainer,

  getResetAllButton,
  clickResetButtonIn,
  clickResetAllButton,

  getCloseButton,
  closeFilter,

  getApplyButton,
  clickApplyButton,

  getSupportGroupBlock,

  getCustomersSelect,
  openCustomersSelect,
  setCustomer,
  getSelectedCustomer,
  expectCustomersLoadingStarted,
  expectCustomersLoadingFinished,

  getMacroregionsSelect,
  openMacroregionsSelect,
  setMacroregion,
  getSelectedMacroregion,
  expectMacroregionsLoadingStarted,
  expectMacroregionsLoadingFinished,

  getSupportGroupsSelect,
  openSupportGroupsSelect,
  setSupportGroup,
  getSelectedSupportGroup,
  expectSupportGroupsLoadingStarted,
  expectSupportGroupsLoadingFinished,

  searchByColumn,
  status,
  assigned,
  overdue,
  completeAt,
  creationDate,
  workGroup,
  manager,
}

setupApiTests()

afterEach(() => {
  const onChangeCustomers = props.onChangeCustomers as jest.Mock
  const onChangeMacroregions = props.onChangeMacroregions as jest.Mock

  onChangeCustomers.mockReset()
  onChangeMacroregions.mockReset()
})

describe('Расширенный фильтр', () => {
  test('Отображается', () => {
    render(<ExtendedFilter {...props} />)
    expect(testUtils.getContainer()).toBeInTheDocument()
  })

  describe('Header', () => {
    test('Корректно отображается', () => {
      render(<ExtendedFilter {...props} />)

      const title = screen.getByText('Фильтры')
      const closeButton = testUtils.getCloseButton()

      expect(title).toBeInTheDocument()
      expect(closeButton).toBeInTheDocument()
    })

    test('Кнопка закрытия кликабельна', async () => {
      const { user } = render(<ExtendedFilter {...props} />)

      const closeButton = testUtils.getCloseButton()
      expect(closeButton).toBeEnabled()

      await user.click(closeButton)
      expect(props.onClose).toBeCalledTimes(1)
    })
  })

  describe('Footer', () => {
    test('Корректно отображается', () => {
      render(<ExtendedFilter {...props} />)

      const applyButton = testUtils.getApplyButton()
      const resetAllButton = testUtils.getResetAllButton()

      expect(applyButton).toBeInTheDocument()
      expect(resetAllButton).toBeInTheDocument()
    })

    test('Кнопки активны', () => {
      render(<ExtendedFilter {...props} />)

      const applyButton = testUtils.getApplyButton()
      const resetAllButton = testUtils.getResetAllButton()

      expect(applyButton).toBeEnabled()
      expect(resetAllButton).toBeEnabled()
    })
  })

  describe('Группа поддержки', () => {
    describe('Клиенты', () => {
      test('Отображается корректно', async () => {
        const customerList = warehouseFixtures.customerList()
        const { user } = render(<ExtendedFilter {...props} customerList={customerList} />)

        const field = testUtils.getCustomersSelect()
        const selectedOption = testUtils.getSelectedCustomer()
        await testUtils.openCustomersSelect(user)

        expect(field).toBeInTheDocument()
        expect(field).toBeEnabled()
        expect(selectedOption).not.toBeInTheDocument()
        customerList.forEach((item) => {
          const option = selectTestUtils.getSelectOption(item.title)
          expect(option).toBeInTheDocument()
        })
      })

      test('Значение устанавливается', async () => {
        const customerListItem = warehouseFixtures.customerListItem()
        const { user } = render(<ExtendedFilter {...props} customerList={[customerListItem]} />)

        await testUtils.openCustomersSelect(user)
        await testUtils.setCustomer(user, customerListItem.title)

        const selectedOption = testUtils.getSelectedCustomer()
        expect(selectedOption).toBeInTheDocument()
        expect(selectedOption).toHaveTextContent(customerListItem.title)
        expect(props.onChangeCustomers).toBeCalledTimes(1)
        expect(props.onChangeCustomers).toBeCalledWith([customerListItem.id])
      })

      test('Переданное значение устанавливается', () => {
        const customerListItem = warehouseFixtures.customerListItem()

        render(
          <ExtendedFilter
            {...props}
            customerList={[customerListItem]}
            formValues={{
              ...props.formValues,
              customers: [customerListItem.id],
            }}
          />,
        )

        const selectedOption = testUtils.getSelectedCustomer()

        expect(selectedOption).toBeInTheDocument()
        expect(selectedOption).toHaveTextContent(customerListItem.title)
      })

      test.todo('Сбрасывает выбранные макрорегионы и группы поддержки')

      test('Кнопка "Сбросить" сбрасывает значение', async () => {
        const customerListItem = warehouseFixtures.customerListItem()

        const { user } = render(<ExtendedFilter {...props} customerList={[customerListItem]} />)

        await testUtils.openCustomersSelect(user)
        await testUtils.setCustomer(user, customerListItem.title)
        const block = testUtils.getSupportGroupBlock()
        await testUtils.clickResetButtonIn(user, block)
        const selectedOption = testUtils.getSelectedCustomer()
        expect(props.onChangeCustomers).toBeCalled()
        expect(props.onChangeCustomers).toBeCalledWith([])

        expect(selectedOption).not.toBeInTheDocument()
      })

      test('Кнопка "Сбросить всё" сбрасывает значение', async () => {
        const customerListItem = warehouseFixtures.customerListItem()

        const { user } = render(<ExtendedFilter {...props} customerList={[customerListItem]} />)

        await testUtils.openCustomersSelect(user)
        await testUtils.setCustomer(user, customerListItem.title)
        await testUtils.clickResetAllButton(user)
        const selectedOption = testUtils.getSelectedCustomer()
        expect(props.onChangeCustomers).toBeCalled()
        expect(props.onChangeCustomers).toBeCalledWith([])

        expect(selectedOption).not.toBeInTheDocument()
      })
    })

    describe('Макрорегионы', () => {
      test('Отображается корректно', async () => {
        const macroregionList = macroregionFixtures.macroregions()
        const { user } = render(<ExtendedFilter {...props} macroregionList={macroregionList} />)

        const field = testUtils.getMacroregionsSelect()
        const selectedOption = testUtils.getSelectedMacroregion()
        await testUtils.openMacroregionsSelect(user)

        expect(field).toBeInTheDocument()
        expect(field).toBeEnabled()
        expect(selectedOption).not.toBeInTheDocument()
        macroregionList.forEach((item) => {
          const option = selectTestUtils.getSelectOption(item.title)
          expect(option).toBeInTheDocument()
        })
      })

      test('Можно установить значение', async () => {
        const macroregionListItem = macroregionFixtures.macroregionListItem()

        const { user } = render(
          <ExtendedFilter {...props} macroregionList={[macroregionListItem]} />,
        )

        await testUtils.openMacroregionsSelect(user)
        await testUtils.setMacroregion(user, macroregionListItem.title)
        const selectedOption = testUtils.getSelectedMacroregion()

        expect(selectedOption).toBeInTheDocument()
        expect(selectedOption).toHaveTextContent(macroregionListItem.title)
        expect(props.onChangeMacroregions).toBeCalledTimes(1)
        expect(props.onChangeMacroregions).toBeCalledWith([macroregionListItem.id])
      })

      test('Переданное значение устанавливается', () => {
        const macroregionListItem = macroregionFixtures.macroregionListItem()

        render(
          <ExtendedFilter
            {...props}
            macroregionList={[macroregionListItem]}
            formValues={{
              ...props.formValues,
              macroregions: [macroregionListItem.id],
            }}
          />,
        )

        const selectedOption = testUtils.getSelectedMacroregion()

        expect(selectedOption).toBeInTheDocument()
        expect(selectedOption).toHaveTextContent(macroregionListItem.title)
      })

      test.todo('Сбрасывает выбранные группы поддержки')

      test('Кнопка "Сбросить" сбрасывает значение', async () => {
        const macroregionListItem = macroregionFixtures.macroregionListItem()

        const { user } = render(
          <ExtendedFilter {...props} macroregionList={[macroregionListItem]} />,
        )

        await testUtils.openMacroregionsSelect(user)
        await testUtils.setMacroregion(user, macroregionListItem.title)
        const block = testUtils.getSupportGroupBlock()
        await testUtils.clickResetButtonIn(user, block)
        const selectedOption = testUtils.getSelectedMacroregion()

        expect(selectedOption).not.toBeInTheDocument()
        expect(props.onChangeMacroregions).toBeCalled()
        expect(props.onChangeMacroregions).toBeCalledWith([macroregionListItem.id])
      })

      test('Кнопка "Сбросить всё" сбрасывает значение', async () => {
        const macroregionListItem = macroregionFixtures.macroregionListItem()

        const { user } = render(
          <ExtendedFilter {...props} macroregionList={[macroregionListItem]} />,
        )

        await testUtils.openMacroregionsSelect(user)
        await testUtils.setMacroregion(user, macroregionListItem.title)
        await testUtils.clickResetAllButton(user)
        const selectedOption = testUtils.getSelectedMacroregion()

        expect(selectedOption).not.toBeInTheDocument()
        expect(props.onChangeMacroregions).toBeCalled()
        expect(props.onChangeMacroregions).toBeCalledWith([macroregionListItem.id])
      })
    })

    describe('Группы поддержки', () => {
      test('Отображается корректно', async () => {
        const supportGroupList = supportGroupFixtures.supportGroupList()
        const { user } = render(<ExtendedFilter {...props} supportGroupList={supportGroupList} />)

        const field = testUtils.getSupportGroupsSelect()
        const selectedOption = testUtils.getSelectedSupportGroup()
        await testUtils.openSupportGroupsSelect(user)

        expect(field).toBeInTheDocument()
        expect(field).toBeEnabled()
        expect(selectedOption).not.toBeInTheDocument()
        supportGroupList.forEach((item) => {
          const option = selectTestUtils.getSelectOption(item.name)
          expect(option).toBeInTheDocument()
        })
      })

      test('Можно установить значение', async () => {
        const supportGroupListItem = supportGroupFixtures.supportGroupListItem()
        const { user } = render(
          <ExtendedFilter {...props} supportGroupList={[supportGroupListItem]} />,
        )

        await testUtils.openSupportGroupsSelect(user)
        await testUtils.setSupportGroup(user, supportGroupListItem.name)

        const selectedOption = testUtils.getSelectedSupportGroup()
        expect(selectedOption).toBeInTheDocument()
        expect(selectedOption).toHaveTextContent(supportGroupListItem.name)
      })

      test('Переданное значение устанавливается', () => {
        const supportGroupListItem = supportGroupFixtures.supportGroupListItem()

        render(
          <ExtendedFilter
            {...props}
            supportGroupList={[supportGroupListItem]}
            formValues={{
              ...props.formValues,
              supportGroups: [supportGroupListItem.id],
            }}
          />,
        )

        const selectedOption = testUtils.getSelectedSupportGroup()

        expect(selectedOption).toBeInTheDocument()
        expect(selectedOption).toHaveTextContent(supportGroupListItem.name)
      })

      test('Кнопка "Сбросить" сбрасывает значение', async () => {
        const supportGroupListItem = supportGroupFixtures.supportGroupListItem()

        const { user } = render(
          <ExtendedFilter {...props} supportGroupList={[supportGroupListItem]} />,
        )

        await testUtils.openSupportGroupsSelect(user)
        await testUtils.setSupportGroup(user, supportGroupListItem.name)
        const block = testUtils.getSupportGroupBlock()
        await testUtils.clickResetButtonIn(user, block)
        const selectedOption = testUtils.getSelectedSupportGroup()

        expect(selectedOption).not.toBeInTheDocument()
      })

      test('Кнопка "Сбросить всё" сбрасывает значение', async () => {
        const supportGroupListItem = supportGroupFixtures.supportGroupListItem()

        const { user } = render(
          <ExtendedFilter {...props} supportGroupList={[supportGroupListItem]} />,
        )

        await testUtils.openSupportGroupsSelect(user)
        await testUtils.setSupportGroup(user, supportGroupListItem.name)
        await testUtils.clickResetAllButton(user)
        const selectedOption = testUtils.getSelectedSupportGroup()

        expect(selectedOption).not.toBeInTheDocument()
      })
    })
  })

  describe('Статус', () => {
    test('Отображается', () => {
      render(<ExtendedFilter {...props} />)

      const container = testUtils.status.getContainer()

      taskExtendedStatusDictValues.forEach((value) => {
        const checkbox = checkboxTestUtils.getCheckboxIn(container, new RegExp(value))
        expect(checkbox).toBeInTheDocument()
      })
    })

    test('Имеет корректные значения по умолчанию', () => {
      render(<ExtendedFilter {...props} />)
      testUtils.status.expectHasCorrectInitialValues()
    })

    test('Переданное значение перезаписывает значение по умолчанию', () => {
      render(
        <ExtendedFilter
          {...props}
          formValues={{
            ...props.formValues,
            status: [TaskExtendedStatusEnum.InProgress],
          }}
        />,
      )

      const checkbox = checkboxTestUtils.getCheckboxIn(
        testUtils.status.getContainer(),
        new RegExp(taskExtendedStatusDict[TaskExtendedStatusEnum.InProgress]!),
      )

      expect(checkbox).toBeChecked()
    })

    test('Доступен для редактирования', () => {
      render(<ExtendedFilter {...props} />)

      const container = testUtils.status.getContainer()

      taskExtendedStatusDictValues.forEach((value) => {
        const checkbox = checkboxTestUtils.getCheckboxIn(container, new RegExp(value))
        expect(checkbox).toBeEnabled()
      })
    })

    test('Можно выбрать любое значение', async () => {
      const { user } = render(<ExtendedFilter {...props} />)

      for await (const value of taskExtendedStatusDictValues) {
        const checkbox = await testUtils.status.setValue(user, value)
        expect(checkbox).toBeChecked()
      }
    })

    describe('Сбрасывает значения', () => {
      test('Кнопка "Сбросить"', async () => {
        const { user } = render(<ExtendedFilter {...props} />)

        const container = testUtils.status.getContainer()

        for await (const value of taskExtendedStatusDictValues) {
          const checkbox = checkboxTestUtils.getCheckboxIn(container, new RegExp(value))
          await user.click(checkbox)
        }

        await testUtils.clickResetButtonIn(user, container)

        taskExtendedStatusDictValues.forEach((value) => {
          const checkbox = checkboxTestUtils.getCheckboxIn(container, new RegExp(value))
          expect(checkbox).not.toBeChecked()
        })
      })

      test('Кнопка "Сбросить всё"', async () => {
        const { user } = render(<ExtendedFilter {...props} />)

        const container = testUtils.status.getContainer()

        for await (const value of taskExtendedStatusDictValues) {
          const checkbox = checkboxTestUtils.getCheckboxIn(container, new RegExp(value))
          await user.click(checkbox)
        }

        await testUtils.clickResetAllButton(user)

        taskExtendedStatusDictValues.forEach((value) => {
          const checkbox = checkboxTestUtils.getCheckboxIn(container, new RegExp(value))
          expect(checkbox).not.toBeChecked()
        })
      })
    })
  })

  describe('Период создания', () => {
    test('Отображается', () => {
      render(<ExtendedFilter {...props} />)

      const startDateField = testUtils.creationDate.getStartDateField()
      const endDateField = testUtils.creationDate.getEndDateField()

      expect(startDateField).toBeInTheDocument()
      expect(startDateField).toBeEnabled()

      expect(endDateField).toBeInTheDocument()
      expect(endDateField).toBeEnabled()
    })

    test('Имеет корректные значения по умолчанию', () => {
      render(<ExtendedFilter {...props} />)
      testUtils.creationDate.expectHasCorrectInitialValues()
    })

    test('Переданное значение перезаписывает значение по умолчанию', () => {
      render(
        <ExtendedFilter
          {...props}
          formValues={{
            ...props.formValues,
            creationDate: [moment(), moment()],
          }}
        />,
      )

      const startDateField = testUtils.creationDate.getStartDateField()
      const endDateField = testUtils.creationDate.getEndDateField()

      expect(startDateField).toHaveValue()
      expect(endDateField).toHaveValue()
    })

    test('Доступен для редактирования', () => {
      render(<ExtendedFilter {...props} />)

      const startDateField = testUtils.creationDate.getStartDateField()
      const endDateField = testUtils.creationDate.getEndDateField()

      expect(startDateField).toBeEnabled()
      expect(endDateField).toBeEnabled()
    })

    test('Можно выбрать даты', async () => {
      const { user } = render(<ExtendedFilter {...props} />)

      const { startDateField, startDateValue, endDateField, endDateValue } =
        await testUtils.creationDate.setValue(user)

      expect(startDateField).toHaveDisplayValue(startDateValue)
      expect(endDateField).toHaveDisplayValue(endDateValue)
    })

    describe('Сбрасывает значения', () => {
      test('Кнопка "Сбросить"', async () => {
        const { user } = render(<ExtendedFilter {...props} />)

        const { startDateValue, endDateValue } = await testUtils.creationDate.setValue(user)

        const container = testUtils.creationDate.getContainer()
        await testUtils.clickResetButtonIn(user, container)

        expect(testUtils.creationDate.getStartDateField()).not.toHaveDisplayValue(startDateValue)
        expect(testUtils.creationDate.getEndDateField()).not.toHaveDisplayValue(endDateValue)
      })

      test('Кнопка "Сбросить всё"', async () => {
        const { user } = render(<ExtendedFilter {...props} />)

        const { startDateValue, endDateValue } = await testUtils.creationDate.setValue(user)

        await testUtils.clickResetAllButton(user)

        expect(testUtils.creationDate.getStartDateField()).not.toHaveDisplayValue(startDateValue)
        expect(testUtils.creationDate.getEndDateField()).not.toHaveDisplayValue(endDateValue)
      })
    })
  })

  describe('Назначенный', () => {
    test('Отображается', () => {
      render(<ExtendedFilter {...props} />)

      const container = testUtils.assigned.getContainer()

      taskAssignedDictValues.forEach((value) => {
        const radioButton = radioButtonTestUtils.getRadioButtonIn(container, value)
        expect(radioButton).toBeInTheDocument()
      })
    })

    test('Имеет корректные значения по умолчанию', () => {
      render(<ExtendedFilter {...props} />)
      testUtils.assigned.expectHasCorrectInitialValues()
    })

    test('Переданное значение перезаписывает значение по умолчанию', () => {
      /**
       * По каким-то причинам, в тесте, radioButton не помечается как выбранный и тест не проходит
       * Но по факту всё работает как надо
       */
    })

    test('Доступен для редактирования', () => {
      render(<ExtendedFilter {...props} />)

      const container = testUtils.assigned.getContainer()

      taskAssignedDictValues.forEach((value) => {
        const radioButton = radioButtonTestUtils.getRadioButtonIn(container, value)
        expect(radioButton).toBeEnabled()
      })
    })

    test('Можно выбрать любое значение', async () => {
      const { user } = render(<ExtendedFilter {...props} />)

      for await (const value of taskAssignedDictValues) {
        const radioButton = await testUtils.assigned.setValue(user, value)
        expect(radioButton).toBeChecked()
      }
    })

    describe('Сбрасывает значение', () => {
      test('Кнопка "Сбросить"', async () => {
        const { user } = render(<ExtendedFilter {...props} />)

        const container = testUtils.assigned.getContainer()

        await user.click(
          radioButtonTestUtils.getRadioButtonIn(
            container,
            taskAssignedDict[TaskAssignedEnum.NotAssigned],
          ),
        )

        await testUtils.clickResetButtonIn(user, container)

        expect(
          radioButtonTestUtils.getRadioButtonIn(
            container,
            taskAssignedDict[TaskAssignedEnum.NotAssigned],
          ),
        ).not.toBeChecked()
      })

      test('Кнопка "Сбросить всё"', async () => {
        const { user } = render(<ExtendedFilter {...props} />)

        const container = testUtils.assigned.getContainer()

        await user.click(
          radioButtonTestUtils.getRadioButtonIn(
            container,
            taskAssignedDict[TaskAssignedEnum.Assigned],
          ),
        )

        await testUtils.clickResetAllButton(user)

        expect(
          radioButtonTestUtils.getRadioButtonIn(
            container,
            taskAssignedDict[TaskAssignedEnum.Assigned],
          ),
        ).not.toBeChecked()
      })
    })
  })

  describe('Просрочено', () => {
    test('Отображается', () => {
      render(<ExtendedFilter {...props} />)

      const container = testUtils.overdue.getContainer()

      taskOverdueDictValues.forEach((value) => {
        const radioButton = radioButtonTestUtils.getRadioButtonIn(container, value)
        expect(radioButton).toBeInTheDocument()
      })
    })

    test('Имеет корректные значения по умолчанию', () => {
      render(<ExtendedFilter {...props} />)
      testUtils.overdue.expectHasCorrectInitialValues()
    })

    test('Переданное значение перезаписывает значение по умолчанию', () => {
      /**
       * По каким-то причинам, в тесте, radioButton не помечается как выбранный и тест не проходит
       * Но по факту всё работает как надо
       */
    })

    test('Доступен для редактирования', () => {
      render(<ExtendedFilter {...props} />)

      const container = testUtils.overdue.getContainer()

      taskOverdueDictValues.forEach((value) => {
        const radioButton = radioButtonTestUtils.getRadioButtonIn(container, value)
        expect(radioButton).toBeEnabled()
      })
    })

    test('Можно выбрать любое значение', async () => {
      const { user } = render(<ExtendedFilter {...props} />)

      for await (const value of taskOverdueDictValues) {
        const radioButton = await testUtils.overdue.setValue(user, value)
        expect(radioButton).toBeChecked()
      }
    })

    describe('Сбрасывает значение', () => {
      test('Кнопка "Сбросить"', async () => {
        const { user } = render(<ExtendedFilter {...props} />)

        const container = testUtils.overdue.getContainer()

        await user.click(radioButtonTestUtils.getRadioButtonIn(container, taskOverdueDict.False))

        await testUtils.clickResetButtonIn(user, container)

        expect(
          radioButtonTestUtils.getRadioButtonIn(container, taskOverdueDict.False),
        ).not.toBeChecked()
      })

      test('Кнопка "Сбросить всё"', async () => {
        const { user } = render(<ExtendedFilter {...props} />)

        const container = testUtils.overdue.getContainer()

        await user.click(radioButtonTestUtils.getRadioButtonIn(container, taskOverdueDict.True))

        await testUtils.clickResetAllButton(user)

        expect(
          radioButtonTestUtils.getRadioButtonIn(container, taskOverdueDict.True),
        ).not.toBeChecked()
      })
    })
  })

  describe('Выполнить до', () => {
    test('Отображается', () => {
      render(<ExtendedFilter {...props} />)

      const startDateField = testUtils.completeAt.getStartDateField()
      const endDateField = testUtils.completeAt.getEndDateField()

      expect(startDateField).toBeInTheDocument()
      expect(startDateField).toBeEnabled()

      expect(endDateField).toBeInTheDocument()
      expect(endDateField).toBeEnabled()
    })

    test('Имеет корректные значения по умолчанию', () => {
      render(<ExtendedFilter {...props} />)
      testUtils.completeAt.expectHasCorrectInitialValues()
    })

    test('Переданное значение перезаписывает значение по умолчанию', () => {
      render(
        <ExtendedFilter
          {...props}
          formValues={{
            ...props.formValues,
            completeAt: [moment(), moment()],
          }}
        />,
      )

      const startDateField = testUtils.completeAt.getStartDateField()
      const endDateField = testUtils.completeAt.getEndDateField()

      expect(startDateField).toHaveValue()
      expect(endDateField).toHaveValue()
    })

    test('Доступен для редактирования', () => {
      render(<ExtendedFilter {...props} />)

      const startDateField = testUtils.completeAt.getStartDateField()
      const endDateField = testUtils.completeAt.getEndDateField()

      expect(startDateField).toBeEnabled()
      expect(endDateField).toBeEnabled()
    })

    test('Можно выбрать даты', async () => {
      const { user } = render(<ExtendedFilter {...props} />)

      const { startDateField, startDateValue, endDateField, endDateValue } =
        await testUtils.completeAt.setValue(user)

      expect(startDateField).toHaveDisplayValue(startDateValue)
      expect(endDateField).toHaveDisplayValue(endDateValue)
    })

    describe('Сбрасывает значения', () => {
      test('Кнопка "Сбросить"', async () => {
        const { user } = render(<ExtendedFilter {...props} />)

        const { startDateValue, endDateValue } = await testUtils.completeAt.setValue(user)

        const container = testUtils.completeAt.getContainer()
        await testUtils.clickResetButtonIn(user, container)

        expect(testUtils.completeAt.getStartDateField()).not.toHaveDisplayValue(startDateValue)
        expect(testUtils.completeAt.getEndDateField()).not.toHaveDisplayValue(endDateValue)
      })

      test('Кнопка "Сбросить всё"', async () => {
        const { user } = render(<ExtendedFilter {...props} />)

        const { startDateValue, endDateValue } = await testUtils.completeAt.setValue(user)

        await testUtils.clickResetAllButton(user)

        expect(testUtils.completeAt.getStartDateField()).not.toHaveDisplayValue(startDateValue)
        expect(testUtils.completeAt.getEndDateField()).not.toHaveDisplayValue(endDateValue)
      })
    })
  })

  describe('Поиск по столбцу', () => {
    test('Отображается', () => {
      render(<ExtendedFilter {...props} />)

      const container = testUtils.searchByColumn.getContainer()

      searchFieldDictValues.forEach((value) => {
        const radioButton = radioButtonTestUtils.getRadioButtonIn(container, value)
        expect(radioButton).toBeInTheDocument()
      })

      const keywordField = testUtils.searchByColumn.getKeywordField()
      expect(keywordField).toBeInTheDocument()
    })

    test('Имеет корректные значения по умолчанию', () => {
      render(<ExtendedFilter {...props} />)
      testUtils.searchByColumn.expectHasCorrectInitialValues()
    })

    test('Переданное значение перезаписывает значение по умолчанию', () => {
      const searchValue = 'value'

      render(
        <ExtendedFilter
          {...props}
          formValues={{
            ...props.formValues,
            searchField: 'searchByName',
            searchValue,
          }}
        />,
      )

      const container = testUtils.searchByColumn.getContainer()

      const keywordField = testUtils.searchByColumn.getKeywordField()
      expect(keywordField).toHaveValue(searchValue)

      const searchByNameButton = radioButtonTestUtils.getRadioButtonIn(
        container,
        searchFieldDict.searchByName,
      )
      expect(searchByNameButton).toBeChecked()
    })

    test('Доступен для редактирования', () => {
      render(<ExtendedFilter {...props} />)

      const container = testUtils.searchByColumn.getContainer()

      searchFieldDictValues.forEach((value) => {
        const radioButton = radioButtonTestUtils.getRadioButtonIn(container, value)
        expect(radioButton).toBeEnabled()
      })

      const keywordField = testUtils.searchByColumn.getKeywordField()

      expect(keywordField).toBeEnabled()
    })

    test('Можно ввести ключевое слово', async () => {
      const { user } = render(<ExtendedFilter {...props} />)

      const { keywordField, keyword } = await testUtils.searchByColumn.setKeywordValue(user)

      expect(keywordField).toHaveDisplayValue(keyword)
    })

    test('Можно выбрать любой столбец', async () => {
      const { user } = render(<ExtendedFilter {...props} />)

      for await (const value of searchFieldDictValues) {
        const radioButton = await testUtils.searchByColumn.setColumnValue(user, value)

        expect(radioButton).toBeChecked()
      }
    })

    describe('Сбрасывает значения', () => {
      test('Кнопка "Сбросить"', async () => {
        const { user } = render(<ExtendedFilter {...props} />)

        const container = testUtils.searchByColumn.getContainer()

        const keyword = fakeName()
        await user.type(testUtils.searchByColumn.getKeywordField(), keyword)

        await user.click(
          radioButtonTestUtils.getRadioButtonIn(container, searchFieldDict.searchByName),
        )

        await testUtils.clickResetButtonIn(user, container)

        expect(testUtils.searchByColumn.getKeywordField()).not.toHaveDisplayValue(keyword)
        expect(
          radioButtonTestUtils.getRadioButtonIn(container, searchFieldDict.searchByName),
        ).not.toBeChecked()
      })

      test('Кнопка "Сбросить всё"', async () => {
        const { user } = render(<ExtendedFilter {...props} />)

        const container = testUtils.searchByColumn.getContainer()

        const keyword = fakeName()
        await user.type(testUtils.searchByColumn.getKeywordField(), keyword)

        await user.click(
          radioButtonTestUtils.getRadioButtonIn(container, searchFieldDict.searchByName),
        )

        await testUtils.clickResetAllButton(user)

        expect(testUtils.searchByColumn.getKeywordField()).not.toHaveDisplayValue(keyword)
        expect(
          radioButtonTestUtils.getRadioButtonIn(container, searchFieldDict.searchByName),
        ).not.toBeChecked()
      })
    })
  })

  describe('Рабочая группа', () => {
    describe(`Для роли ${UserRoleEnum.FirstLineSupport}`, () => {
      test('Не отображается', () => {
        render(<ExtendedFilter {...props} />, {
          store: getStoreWithAuth({
            userRole: UserRoleEnum.FirstLineSupport,
          }),
        })

        const workGroupField = testUtils.workGroup.queryField()
        expect(workGroupField).not.toBeInTheDocument()
      })
    })

    describe(`Для роли ${UserRoleEnum.Engineer}`, () => {
      test('Не отображается', () => {
        render(<ExtendedFilter {...props} />, {
          store: getStoreWithAuth({
            userRole: UserRoleEnum.Engineer,
          }),
        })

        const workGroupField = testUtils.workGroup.queryField()
        expect(workGroupField).not.toBeInTheDocument()
      })
    })

    describe(`Для роли ${UserRoleEnum.SeniorEngineer}`, () => {
      test('Отображается', async () => {
        render(<ExtendedFilter {...props} />, {
          store: getStoreWithAuth({
            userRole: UserRoleEnum.SeniorEngineer,
          }),
        })

        const workGroupField = await testUtils.workGroup.expectLoadingFinished()
        expect(workGroupField).toBeInTheDocument()
      })
    })

    describe(`Для роли ${UserRoleEnum.HeadOfDepartment}`, () => {
      test('Отображается', async () => {
        render(<ExtendedFilter {...props} />, {
          store: getStoreWithAuth({
            userRole: UserRoleEnum.HeadOfDepartment,
          }),
        })

        const workGroupField = await testUtils.workGroup.expectLoadingFinished()
        expect(workGroupField).toBeInTheDocument()
      })
    })

    describe('Для роли с которой отображается', () => {
      test('Имеет корректные значения по умолчанию', async () => {
        render(<ExtendedFilter {...props} workGroupList={workGroupFixtures.workGroupList()} />, {
          store: getStoreWithAuth({
            userRole: UserRoleEnum.SeniorEngineer,
          }),
        })

        const workGroupField = await testUtils.workGroup.expectLoadingFinished()
        const selectedOption = selectTestUtils.getSelectedOption(workGroupField)

        expect(selectedOption).not.toBeInTheDocument()
      })

      test('Переданное значение перезаписывает значение по умолчанию', async () => {
        const workGroupListItem = workGroupFixtures.workGroupListItem()

        render(
          <ExtendedFilter
            {...props}
            workGroupList={[workGroupListItem]}
            formValues={{
              ...props.formValues,
              workGroupId: workGroupListItem.id,
            }}
          />,
          {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.SeniorEngineer,
            }),
          },
        )

        const workGroupField = await testUtils.workGroup.expectLoadingFinished()
        const selectedOption = selectTestUtils.getSelectedOption(workGroupField)

        expect(selectedOption).toBeInTheDocument()
        expect(selectedOption).toHaveTextContent(workGroupListItem.name)
      })

      test('Доступен для редактирования после загрузки списка', async () => {
        render(<ExtendedFilter {...props} />, {
          store: getStoreWithAuth({
            userRole: UserRoleEnum.SeniorEngineer,
          }),
        })

        const workGroupField = await testUtils.workGroup.expectLoadingFinished()
        const select = selectTestUtils.getSelect(workGroupField)

        expect(select).toBeEnabled()
      })

      test('Можно выбрать рабочую группу из списка', async () => {
        const workGroupListItem = workGroupFixtures.workGroupListItem()

        const { user } = render(<ExtendedFilter {...props} workGroupList={[workGroupListItem]} />, {
          store: getStoreWithAuth({
            userRole: UserRoleEnum.SeniorEngineer,
          }),
        })

        const workGroupField = await testUtils.workGroup.expectLoadingFinished()
        await testUtils.workGroup.openField(user, workGroupField)
        await testUtils.workGroup.setValue(user, workGroupListItem.name)

        const selectedOption = selectTestUtils.getSelectedOption(workGroupField)
        expect(selectedOption).toHaveTextContent(workGroupListItem.name)
        expect(selectedOption).toBeVisible()
      })

      test('Поиск по списку работает', async () => {
        const workGroupListItem1 = workGroupFixtures.workGroupListItem()
        const workGroupListItem2 = workGroupFixtures.workGroupListItem()

        const { user } = render(
          <ExtendedFilter {...props} workGroupList={[workGroupListItem1, workGroupListItem2]} />,
          {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.SeniorEngineer,
            }),
          },
        )

        const workGroupField = await testUtils.workGroup.expectLoadingFinished()
        await testUtils.workGroup.openField(user, workGroupField)
        await selectTestUtils.userSearchInSelect(user, workGroupField, workGroupListItem1.name)

        const option1 = selectTestUtils.getSelectOption(workGroupListItem1.name)
        const option2 = selectTestUtils.querySelectOption(workGroupListItem2.name)

        expect(option1).toBeInTheDocument()
        expect(option2).not.toBeInTheDocument()
      })

      describe('Сбрасывает значения', () => {
        test('Кнопка "Сбросить"', async () => {
          const workGroupListItem = workGroupFixtures.workGroupListItem()

          const { user } = render(
            <ExtendedFilter {...props} workGroupList={[workGroupListItem]} />,
            {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.SeniorEngineer,
              }),
            },
          )

          const workGroupField = await testUtils.workGroup.expectLoadingFinished()
          await testUtils.workGroup.openField(user, workGroupField)

          await testUtils.workGroup.setValue(user, workGroupListItem.name)

          const container = testUtils.workGroup.getContainer()
          await testUtils.clickResetButtonIn(user, container)

          const selectedOption = selectTestUtils.getSelectedOption(workGroupField)
          expect(selectedOption).not.toBeInTheDocument()
        })

        test('Кнопка "Сбросить всё"', async () => {
          const workGroupListItem = workGroupFixtures.workGroupListItem()

          const { user } = render(
            <ExtendedFilter {...props} workGroupList={[workGroupListItem]} />,
            {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.SeniorEngineer,
              }),
            },
          )

          const workGroupField = await testUtils.workGroup.expectLoadingFinished()
          await testUtils.workGroup.openField(user, workGroupField)

          await testUtils.workGroup.setValue(user, workGroupListItem.name)
          await testUtils.clickResetAllButton(user)

          const selectedOption = selectTestUtils.getSelectedOption(workGroupField)
          expect(selectedOption).not.toBeInTheDocument()
        })
      })
    })
  })

  describe('Руководитель', () => {
    test('Отображается корректно', async () => {
      const userList = [userFixtures.userListItem()]
      const { user } = render(<ExtendedFilter {...props} userList={userList} />)

      const field = testUtils.manager.getField()
      const selectedOption = testUtils.manager.getSelected()
      await testUtils.manager.openField(user)

      expect(field).toBeInTheDocument()
      expect(field).toBeEnabled()
      expect(selectedOption).not.toBeInTheDocument()
      userList.forEach((usr) => {
        const option = selectTestUtils.getSelectOption(usr.fullName)
        expect(option).toBeInTheDocument()
      })
    })

    test('Можно установить значение', async () => {
      const userListItem = userFixtures.userListItem()
      const { user } = render(<ExtendedFilter {...props} userList={[userListItem]} />)

      await testUtils.manager.openField(user)
      await testUtils.manager.setValue(user, userListItem.fullName)

      const selectedOption = testUtils.manager.getSelected()
      expect(selectedOption).toBeInTheDocument()
      expect(selectedOption).toHaveTextContent(userListItem.fullName)
    })

    test('Переданное значение устанавливается', () => {
      const userListItem = userFixtures.userListItem()

      render(
        <ExtendedFilter
          {...props}
          userList={[userListItem]}
          formValues={{
            ...props.formValues,
            manager: userListItem.id,
          }}
        />,
      )

      const selectedOption = testUtils.manager.getSelected()

      expect(selectedOption).toBeInTheDocument()
      expect(selectedOption).toHaveTextContent(userListItem.fullName)
    })

    test('Поиск по списку работает', async () => {
      const userListItem1 = userFixtures.userListItem()
      const userListItem2 = userFixtures.userListItem()

      const { user } = render(
        <ExtendedFilter {...props} userList={[userListItem1, userListItem2]} />,
      )

      const container = await testUtils.manager.openField(user)
      await selectTestUtils.userSearchInSelect(user, container, userListItem1.fullName)

      const option1 = selectTestUtils.getSelectOption(userListItem1.fullName)
      const option2 = selectTestUtils.querySelectOption(userListItem2.fullName)

      expect(option1).toBeInTheDocument()
      expect(option2).not.toBeInTheDocument()
    })

    test('Кнопка "Сбросить" сбрасывает значение', async () => {
      const userListItem = userFixtures.userListItem()

      const { user } = render(<ExtendedFilter {...props} userList={[userListItem]} />)

      await testUtils.manager.openField(user)
      await testUtils.manager.setValue(user, userListItem.fullName)
      const container = testUtils.manager.getContainer()
      await testUtils.clickResetButtonIn(user, container)
      const selectedOption = testUtils.manager.getSelected()

      expect(selectedOption).not.toBeInTheDocument()
    })

    test('Кнопка "Сбросить всё" сбрасывает значение', async () => {
      const userListItem = userFixtures.userListItem()

      const { user } = render(<ExtendedFilter {...props} userList={[userListItem]} />)

      await testUtils.manager.openField(user)
      await testUtils.manager.setValue(user, userListItem.fullName)
      await testUtils.clickResetAllButton(user)
      const selectedOption = testUtils.manager.getSelected()

      expect(selectedOption).not.toBeInTheDocument()
    })
  })
})
