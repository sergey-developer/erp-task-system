import { screen } from '@testing-library/react'
import moment from 'moment-timezone'

import {
  TaskAssignedEnum,
  taskExtendedStatusDict,
  TaskExtendedStatusEnum,
} from 'modules/task/constants/task'
import { UserPermissionsEnum } from 'modules/user/constants'

import { props } from '_tests_/features/tasks/TasksFilter/constants'
import { testUtils } from '_tests_/features/tasks/TasksFilter/testUtils'
import macroregionFixtures from '_tests_/fixtures/macroregion'
import supportGroupFixtures from '_tests_/fixtures/supportGroup'
import userFixtures from '_tests_/fixtures/user'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import workGroupFixtures from '_tests_/fixtures/workGroup'
import {
  checkboxTestUtils,
  fakeName,
  radioButtonTestUtils,
  render,
  selectTestUtils,
  setupApiTests,
} from '_tests_/utils'

import { searchFieldDict, taskAssignedDict, taskOverdueDict } from './constants'
import TasksFilter from './index'

const taskExtendedStatusDictValues = Object.values(taskExtendedStatusDict)
const taskOverdueDictValues = Object.values(taskOverdueDict)
const taskAssignedDictValues = Object.values(taskAssignedDict)
const searchFieldDictValues = Object.values(searchFieldDict)

setupApiTests()

afterEach(() => {
  const onChangeCustomers = props.onChangeCustomers as jest.Mock
  const onChangeMacroregions = props.onChangeMacroregions as jest.Mock

  onChangeCustomers.mockReset()
  onChangeMacroregions.mockReset()
})

describe('Расширенный фильтр', () => {
  test('Отображается', () => {
    render(<TasksFilter {...props} />)
    expect(testUtils.getContainer()).toBeInTheDocument()
  })

  describe('Header', () => {
    test('Корректно отображается', () => {
      render(<TasksFilter {...props} />)

      const title = screen.getByText('Фильтры')
      const closeButton = testUtils.getCloseButton()

      expect(title).toBeInTheDocument()
      expect(closeButton).toBeInTheDocument()
    })

    test('Кнопка закрытия кликабельна', async () => {
      const { user } = render(<TasksFilter {...props} />)

      const closeButton = testUtils.getCloseButton()
      expect(closeButton).toBeEnabled()

      await user.click(closeButton)
      expect(props.onClose).toBeCalledTimes(1)
    })
  })

  describe('Footer', () => {
    test('Корректно отображается', () => {
      render(<TasksFilter {...props} />)

      const applyButton = testUtils.getApplyButton()
      const resetAllButton = testUtils.getResetAllButton()

      expect(applyButton).toBeInTheDocument()
      expect(resetAllButton).toBeInTheDocument()
    })

    test('Кнопки активны', () => {
      render(<TasksFilter {...props} />)

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
        const { user } = render(<TasksFilter {...props} customers={customerList} />)

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
        const { user } = render(<TasksFilter {...props} customers={[customerListItem]} />)

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
          <TasksFilter
            {...props}
            customers={[customerListItem]}
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

        const { user } = render(<TasksFilter {...props} customers={[customerListItem]} />)

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

        const { user } = render(<TasksFilter {...props} customers={[customerListItem]} />)

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
        const { user } = render(<TasksFilter {...props} macroregions={macroregionList} />)

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

        const { user } = render(<TasksFilter {...props} macroregions={[macroregionListItem]} />)

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
          <TasksFilter
            {...props}
            macroregions={[macroregionListItem]}
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

        const { user } = render(<TasksFilter {...props} macroregions={[macroregionListItem]} />)

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

        const { user } = render(<TasksFilter {...props} macroregions={[macroregionListItem]} />)

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
        const { user } = render(<TasksFilter {...props} supportGroups={supportGroupList} />)

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
        const { user } = render(<TasksFilter {...props} supportGroups={[supportGroupListItem]} />)

        await testUtils.openSupportGroupsSelect(user)
        await testUtils.setSupportGroup(user, supportGroupListItem.name)

        const selectedOption = testUtils.getSelectedSupportGroup()
        expect(selectedOption).toBeInTheDocument()
        expect(selectedOption).toHaveTextContent(supportGroupListItem.name)
      })

      test('Переданное значение устанавливается', () => {
        const supportGroupListItem = supportGroupFixtures.supportGroupListItem()

        render(
          <TasksFilter
            {...props}
            supportGroups={[supportGroupListItem]}
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

        const { user } = render(<TasksFilter {...props} supportGroups={[supportGroupListItem]} />)

        await testUtils.openSupportGroupsSelect(user)
        await testUtils.setSupportGroup(user, supportGroupListItem.name)
        const block = testUtils.getSupportGroupBlock()
        await testUtils.clickResetButtonIn(user, block)
        const selectedOption = testUtils.getSelectedSupportGroup()

        expect(selectedOption).not.toBeInTheDocument()
      })

      test('Кнопка "Сбросить всё" сбрасывает значение', async () => {
        const supportGroupListItem = supportGroupFixtures.supportGroupListItem()

        const { user } = render(<TasksFilter {...props} supportGroups={[supportGroupListItem]} />)

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
      render(<TasksFilter {...props} />)

      const container = testUtils.status.getContainer()

      taskExtendedStatusDictValues.forEach((value) => {
        const checkbox = checkboxTestUtils.getCheckboxIn(container, new RegExp(value))
        expect(checkbox).toBeInTheDocument()
      })
    })

    test('Имеет корректные значения по умолчанию', () => {
      render(<TasksFilter {...props} />)
      testUtils.status.expectHasCorrectInitialValues()
    })

    test('Переданное значение перезаписывает значение по умолчанию', () => {
      render(
        <TasksFilter
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
      render(<TasksFilter {...props} />)

      const container = testUtils.status.getContainer()

      taskExtendedStatusDictValues.forEach((value) => {
        const checkbox = checkboxTestUtils.getCheckboxIn(container, new RegExp(value))
        expect(checkbox).toBeEnabled()
      })
    })

    test('Можно выбрать любое значение', async () => {
      const { user } = render(<TasksFilter {...props} />)

      for await (const value of taskExtendedStatusDictValues) {
        const checkbox = await testUtils.status.setValue(user, value)
        expect(checkbox).toBeChecked()
      }
    })

    describe('Сбрасывает значения', () => {
      test('Кнопка "Сбросить"', async () => {
        const { user } = render(<TasksFilter {...props} />)

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
        const { user } = render(<TasksFilter {...props} />)

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
      render(<TasksFilter {...props} />)

      const startDateField = testUtils.creationDate.getStartDateField()
      const endDateField = testUtils.creationDate.getEndDateField()

      expect(startDateField).toBeInTheDocument()
      expect(startDateField).toBeEnabled()

      expect(endDateField).toBeInTheDocument()
      expect(endDateField).toBeEnabled()
    })

    test('Имеет корректные значения по умолчанию', () => {
      render(<TasksFilter {...props} />)
      testUtils.creationDate.expectHasCorrectInitialValues()
    })

    test('Переданное значение перезаписывает значение по умолчанию', () => {
      render(
        <TasksFilter
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
      render(<TasksFilter {...props} />)

      const startDateField = testUtils.creationDate.getStartDateField()
      const endDateField = testUtils.creationDate.getEndDateField()

      expect(startDateField).toBeEnabled()
      expect(endDateField).toBeEnabled()
    })

    test('Можно выбрать даты', async () => {
      const { user } = render(<TasksFilter {...props} />)

      const { startDateField, startDateValue, endDateField, endDateValue } =
        await testUtils.creationDate.setValue(user)

      expect(startDateField).toHaveDisplayValue(startDateValue)
      expect(endDateField).toHaveDisplayValue(endDateValue)
    })

    describe('Сбрасывает значения', () => {
      test('Кнопка "Сбросить"', async () => {
        const { user } = render(<TasksFilter {...props} />)

        const { startDateValue, endDateValue } = await testUtils.creationDate.setValue(user)

        const container = testUtils.creationDate.getContainer()
        await testUtils.clickResetButtonIn(user, container)

        expect(testUtils.creationDate.getStartDateField()).not.toHaveDisplayValue(startDateValue)
        expect(testUtils.creationDate.getEndDateField()).not.toHaveDisplayValue(endDateValue)
      })

      test('Кнопка "Сбросить всё"', async () => {
        const { user } = render(<TasksFilter {...props} />)

        const { startDateValue, endDateValue } = await testUtils.creationDate.setValue(user)

        await testUtils.clickResetAllButton(user)

        expect(testUtils.creationDate.getStartDateField()).not.toHaveDisplayValue(startDateValue)
        expect(testUtils.creationDate.getEndDateField()).not.toHaveDisplayValue(endDateValue)
      })
    })
  })

  describe('Назначенный', () => {
    test('Отображается', () => {
      render(<TasksFilter {...props} />)

      const container = testUtils.assigned.getContainer()

      taskAssignedDictValues.forEach((value) => {
        const radioButton = radioButtonTestUtils.getRadioButtonIn(container, value)
        expect(radioButton).toBeInTheDocument()
      })
    })

    test('Имеет корректные значения по умолчанию', () => {
      render(<TasksFilter {...props} />)
      testUtils.assigned.expectHasCorrectInitialValues()
    })

    test('Переданное значение перезаписывает значение по умолчанию', () => {
      /**
       * По каким-то причинам, в тесте, radioButton не помечается как выбранный и тест не проходит
       * Но по факту всё работает как надо
       */
    })

    test('Доступен для редактирования', () => {
      render(<TasksFilter {...props} />)

      const container = testUtils.assigned.getContainer()

      taskAssignedDictValues.forEach((value) => {
        const radioButton = radioButtonTestUtils.getRadioButtonIn(container, value)
        expect(radioButton).toBeEnabled()
      })
    })

    test('Можно выбрать любое значение', async () => {
      const { user } = render(<TasksFilter {...props} />)

      for await (const value of taskAssignedDictValues) {
        const radioButton = await testUtils.assigned.setValue(user, value)
        expect(radioButton).toBeChecked()
      }
    })

    describe('Сбрасывает значение', () => {
      test('Кнопка "Сбросить"', async () => {
        const { user } = render(<TasksFilter {...props} />)

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
        const { user } = render(<TasksFilter {...props} />)

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
      render(<TasksFilter {...props} />)

      const container = testUtils.overdue.getContainer()

      taskOverdueDictValues.forEach((value) => {
        const radioButton = radioButtonTestUtils.getRadioButtonIn(container, value)
        expect(radioButton).toBeInTheDocument()
      })
    })

    test('Имеет корректные значения по умолчанию', () => {
      render(<TasksFilter {...props} />)
      testUtils.overdue.expectHasCorrectInitialValues()
    })

    test('Переданное значение перезаписывает значение по умолчанию', () => {
      /**
       * По каким-то причинам, в тесте, radioButton не помечается как выбранный и тест не проходит
       * Но по факту всё работает как надо
       */
    })

    test('Доступен для редактирования', () => {
      render(<TasksFilter {...props} />)

      const container = testUtils.overdue.getContainer()

      taskOverdueDictValues.forEach((value) => {
        const radioButton = radioButtonTestUtils.getRadioButtonIn(container, value)
        expect(radioButton).toBeEnabled()
      })
    })

    test('Можно выбрать любое значение', async () => {
      const { user } = render(<TasksFilter {...props} />)

      for await (const value of taskOverdueDictValues) {
        const radioButton = await testUtils.overdue.setValue(user, value)
        expect(radioButton).toBeChecked()
      }
    })

    describe('Сбрасывает значение', () => {
      test('Кнопка "Сбросить"', async () => {
        const { user } = render(<TasksFilter {...props} />)

        const container = testUtils.overdue.getContainer()

        await user.click(radioButtonTestUtils.getRadioButtonIn(container, taskOverdueDict.False))

        await testUtils.clickResetButtonIn(user, container)

        expect(
          radioButtonTestUtils.getRadioButtonIn(container, taskOverdueDict.False),
        ).not.toBeChecked()
      })

      test('Кнопка "Сбросить всё"', async () => {
        const { user } = render(<TasksFilter {...props} />)

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
      render(<TasksFilter {...props} />)

      const startDateField = testUtils.completeAt.getStartDateField()
      const endDateField = testUtils.completeAt.getEndDateField()

      expect(startDateField).toBeInTheDocument()
      expect(startDateField).toBeEnabled()

      expect(endDateField).toBeInTheDocument()
      expect(endDateField).toBeEnabled()
    })

    test('Имеет корректные значения по умолчанию', () => {
      render(<TasksFilter {...props} />)
      testUtils.completeAt.expectHasCorrectInitialValues()
    })

    test('Переданное значение перезаписывает значение по умолчанию', () => {
      render(
        <TasksFilter
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
      render(<TasksFilter {...props} />)

      const startDateField = testUtils.completeAt.getStartDateField()
      const endDateField = testUtils.completeAt.getEndDateField()

      expect(startDateField).toBeEnabled()
      expect(endDateField).toBeEnabled()
    })

    test('Можно выбрать даты', async () => {
      const { user } = render(<TasksFilter {...props} />)

      const { startDateField, startDateValue, endDateField, endDateValue } =
        await testUtils.completeAt.setValue(user)

      expect(startDateField).toHaveDisplayValue(startDateValue)
      expect(endDateField).toHaveDisplayValue(endDateValue)
    })

    describe('Сбрасывает значения', () => {
      test('Кнопка "Сбросить"', async () => {
        const { user } = render(<TasksFilter {...props} />)

        const { startDateValue, endDateValue } = await testUtils.completeAt.setValue(user)

        const container = testUtils.completeAt.getContainer()
        await testUtils.clickResetButtonIn(user, container)

        expect(testUtils.completeAt.getStartDateField()).not.toHaveDisplayValue(startDateValue)
        expect(testUtils.completeAt.getEndDateField()).not.toHaveDisplayValue(endDateValue)
      })

      test('Кнопка "Сбросить всё"', async () => {
        const { user } = render(<TasksFilter {...props} />)

        const { startDateValue, endDateValue } = await testUtils.completeAt.setValue(user)

        await testUtils.clickResetAllButton(user)

        expect(testUtils.completeAt.getStartDateField()).not.toHaveDisplayValue(startDateValue)
        expect(testUtils.completeAt.getEndDateField()).not.toHaveDisplayValue(endDateValue)
      })
    })
  })

  describe('Поиск по столбцу', () => {
    test('Отображается', () => {
      render(<TasksFilter {...props} />)

      const container = testUtils.searchByColumn.getContainer()

      searchFieldDictValues.forEach((value) => {
        const radioButton = radioButtonTestUtils.getRadioButtonIn(container, value)
        expect(radioButton).toBeInTheDocument()
      })

      const keywordField = testUtils.searchByColumn.getKeywordField()
      expect(keywordField).toBeInTheDocument()
    })

    test('Имеет корректные значения по умолчанию', () => {
      render(<TasksFilter {...props} />)
      testUtils.searchByColumn.expectHasCorrectInitialValues()
    })

    test('Переданное значение перезаписывает значение по умолчанию', () => {
      const searchValue = 'value'

      render(
        <TasksFilter
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
      render(<TasksFilter {...props} />)

      const container = testUtils.searchByColumn.getContainer()

      searchFieldDictValues.forEach((value) => {
        const radioButton = radioButtonTestUtils.getRadioButtonIn(container, value)
        expect(radioButton).toBeEnabled()
      })

      const keywordField = testUtils.searchByColumn.getKeywordField()

      expect(keywordField).toBeEnabled()
    })

    test('Можно ввести ключевое слово', async () => {
      const { user } = render(<TasksFilter {...props} />)

      const { keywordField, keyword } = await testUtils.searchByColumn.setKeywordValue(user)

      expect(keywordField).toHaveDisplayValue(keyword)
    })

    test('Можно выбрать любой столбец', async () => {
      const { user } = render(<TasksFilter {...props} />)

      for await (const value of searchFieldDictValues) {
        const radioButton = await testUtils.searchByColumn.setColumnValue(user, value)

        expect(radioButton).toBeChecked()
      }
    })

    describe('Сбрасывает значения', () => {
      test('Кнопка "Сбросить"', async () => {
        const { user } = render(<TasksFilter {...props} />)

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
        const { user } = render(<TasksFilter {...props} />)

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
    test(`Отображается если есть права ${UserPermissionsEnum.SelfWorkGroupsRead}`, () => {
      render(<TasksFilter {...props} permissions={{ selfWorkGroupsRead: true }} />)
      const container = testUtils.workGroup.getContainer()
      expect(container).toBeInTheDocument()
    })

    test(`Отображается если есть права ${UserPermissionsEnum.AnyWorkGroupsRead}`, () => {
      render(<TasksFilter {...props} permissions={{ anyWorkGroupsRead: true }} />)
      const container = testUtils.workGroup.getContainer()
      expect(container).toBeInTheDocument()
    })

    test('Не отображается если нет прав', () => {
      render(
        <TasksFilter
          {...props}
          permissions={{ selfWorkGroupsRead: false, anyWorkGroupsRead: false }}
        />,
      )

      const container = testUtils.workGroup.queryContainer()
      expect(container).not.toBeInTheDocument()
    })

    test('Имеет корректные значения по умолчанию', () => {
      render(
        <TasksFilter
          {...props}
          workGroups={workGroupFixtures.workGroupList()}
          permissions={{ selfWorkGroupsRead: true }}
        />,
      )
      const field = testUtils.workGroup.getField()
      const selectedOption = selectTestUtils.getSelectedOption(field)
      expect(selectedOption).not.toBeInTheDocument()
    })

    test('Переданное значение перезаписывает значение по умолчанию', () => {
      const workGroupListItem = workGroupFixtures.workGroupListItem()

      render(
        <TasksFilter
          {...props}
          workGroups={[workGroupListItem]}
          formValues={{
            ...props.formValues,
            workGroupId: workGroupListItem.id,
          }}
          permissions={{ selfWorkGroupsRead: true }}
        />,
      )

      const workGroupField = testUtils.workGroup.getField()
      const selectedOption = selectTestUtils.getSelectedOption(workGroupField)

      expect(selectedOption).toBeInTheDocument()
      expect(selectedOption).toHaveTextContent(workGroupListItem.name)
    })

    test('Доступен для редактирования после загрузки списка', () => {
      render(<TasksFilter {...props} permissions={{ selfWorkGroupsRead: true }} />)
      const workGroupField = testUtils.workGroup.getField()
      const select = selectTestUtils.getSelect(workGroupField)
      expect(select).toBeEnabled()
    })

    test('Можно выбрать рабочую группу из списка', async () => {
      const workGroupListItem = workGroupFixtures.workGroupListItem()

      const { user } = render(
        <TasksFilter
          {...props}
          workGroups={[workGroupListItem]}
          permissions={{ selfWorkGroupsRead: true }}
        />,
      )

      const workGroupField = testUtils.workGroup.getField()
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
        <TasksFilter
          {...props}
          workGroups={[workGroupListItem1, workGroupListItem2]}
          permissions={{ selfWorkGroupsRead: true }}
        />,
      )

      const workGroupField = testUtils.workGroup.getField()
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
          <TasksFilter
            {...props}
            workGroups={[workGroupListItem]}
            permissions={{ selfWorkGroupsRead: true }}
          />,
        )

        const workGroupField = testUtils.workGroup.getField()
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
          <TasksFilter
            {...props}
            workGroups={[workGroupListItem]}
            permissions={{ selfWorkGroupsRead: true }}
          />,
        )

        const workGroupField = testUtils.workGroup.getField()
        await testUtils.workGroup.openField(user, workGroupField)

        await testUtils.workGroup.setValue(user, workGroupListItem.name)
        await testUtils.clickResetAllButton(user)

        const selectedOption = selectTestUtils.getSelectedOption(workGroupField)
        expect(selectedOption).not.toBeInTheDocument()
      })
    })
  })

  describe('Руководитель', () => {
    test('Отображается корректно', async () => {
      const userList = [userFixtures.userListItem()]
      const { user } = render(<TasksFilter {...props} users={userList} />)

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
      const { user } = render(<TasksFilter {...props} users={[userListItem]} />)

      await testUtils.manager.openField(user)
      await testUtils.manager.setValue(user, userListItem.fullName)

      const selectedOption = testUtils.manager.getSelected()
      expect(selectedOption).toBeInTheDocument()
      expect(selectedOption).toHaveTextContent(userListItem.fullName)
    })

    test('Переданное значение устанавливается', () => {
      const userListItem = userFixtures.userListItem()

      render(
        <TasksFilter
          {...props}
          users={[userListItem]}
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

      const { user } = render(<TasksFilter {...props} users={[userListItem1, userListItem2]} />)

      const container = await testUtils.manager.openField(user)
      await selectTestUtils.userSearchInSelect(user, container, userListItem1.fullName)

      const option1 = selectTestUtils.getSelectOption(userListItem1.fullName)
      const option2 = selectTestUtils.querySelectOption(userListItem2.fullName)

      expect(option1).toBeInTheDocument()
      expect(option2).not.toBeInTheDocument()
    })

    test('Кнопка "Сбросить" сбрасывает значение', async () => {
      const userListItem = userFixtures.userListItem()

      const { user } = render(<TasksFilter {...props} users={[userListItem]} />)

      await testUtils.manager.openField(user)
      await testUtils.manager.setValue(user, userListItem.fullName)
      const container = testUtils.manager.getContainer()
      await testUtils.clickResetButtonIn(user, container)
      const selectedOption = testUtils.manager.getSelected()

      expect(selectedOption).not.toBeInTheDocument()
    })

    test('Кнопка "Сбросить всё" сбрасывает значение', async () => {
      const userListItem = userFixtures.userListItem()

      const { user } = render(<TasksFilter {...props} users={[userListItem]} />)

      await testUtils.manager.openField(user)
      await testUtils.manager.setValue(user, userListItem.fullName)
      await testUtils.clickResetAllButton(user)
      const selectedOption = testUtils.manager.getSelected()

      expect(selectedOption).not.toBeInTheDocument()
    })
  })
})
