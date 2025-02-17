import { screen } from '@testing-library/react'
import { TaskAssignedEnum, TaskExtendedStatusEnum } from 'features/tasks/api/constants'
import { taskExtendedStatusDict } from 'features/tasks/constants'
import { UserPermissionsEnum } from 'features/users/api/constants'
import moment from 'moment-timezone'

import { props } from '_tests_/features/tasks/components/TasksFilter/constants'
import { tasksFilterTestUtils } from '_tests_/features/tasks/components/TasksFilter/testUtils'
import catalogsFixtures from '_tests_/fixtures/catalogs'
import supportGroupsFixtures from '_tests_/fixtures/supportGroups'
import userFixtures from '_tests_/fixtures/users'
import workGroupsFixtures from '_tests_/fixtures/workGroups'
import {
  checkboxTestUtils,
  fakeName,
  radioButtonTestUtils,
  render,
  selectTestUtils,
  setupApiTests,
} from '_tests_/helpers'

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
    expect(tasksFilterTestUtils.getContainer()).toBeInTheDocument()
  })

  describe('Header', () => {
    test('Корректно отображается', () => {
      render(<TasksFilter {...props} />)

      const title = screen.getByText('Фильтры')
      const closeButton = tasksFilterTestUtils.getCloseButton()

      expect(title).toBeInTheDocument()
      expect(closeButton).toBeInTheDocument()
    })

    test('Кнопка закрытия кликабельна', async () => {
      const { user } = render(<TasksFilter {...props} />)

      const closeButton = tasksFilterTestUtils.getCloseButton()
      expect(closeButton).toBeEnabled()

      await user.click(closeButton)
      expect(props.onClose).toBeCalledTimes(1)
    })
  })

  describe('Footer', () => {
    test('Корректно отображается', () => {
      render(<TasksFilter {...props} />)

      const applyButton = tasksFilterTestUtils.getApplyButton()
      const resetAllButton = tasksFilterTestUtils.getResetAllButton()

      expect(applyButton).toBeInTheDocument()
      expect(resetAllButton).toBeInTheDocument()
    })

    test('Кнопки активны', () => {
      render(<TasksFilter {...props} />)

      const applyButton = tasksFilterTestUtils.getApplyButton()
      const resetAllButton = tasksFilterTestUtils.getResetAllButton()

      expect(applyButton).toBeEnabled()
      expect(resetAllButton).toBeEnabled()
    })
  })

  describe('Группа поддержки', () => {
    describe('Клиенты', () => {
      test('Отображается корректно', async () => {
        const customersCatalog = catalogsFixtures.customersCatalog()
        const { user } = render(<TasksFilter {...props} customers={customersCatalog} />)

        const field = tasksFilterTestUtils.getCustomersSelect()
        const selectedOption = tasksFilterTestUtils.getSelectedCustomer()
        await tasksFilterTestUtils.openCustomersSelect(user)

        expect(field).toBeInTheDocument()
        expect(field).toBeEnabled()
        expect(selectedOption).not.toBeInTheDocument()
        customersCatalog.forEach((item) => {
          const option = selectTestUtils.getSelectOption(item.title)
          expect(option).toBeInTheDocument()
        })
      })

      test('Значение устанавливается', async () => {
        const customerCatalogItem = catalogsFixtures.customerCatalogItem()
        const { user } = render(<TasksFilter {...props} customers={[customerCatalogItem]} />)

        await tasksFilterTestUtils.openCustomersSelect(user)
        await tasksFilterTestUtils.setCustomer(user, customerCatalogItem.title)

        const selectedOption = tasksFilterTestUtils.getSelectedCustomer()
        expect(selectedOption).toBeInTheDocument()
        expect(selectedOption).toHaveTextContent(customerCatalogItem.title)
        expect(props.onChangeCustomers).toBeCalledTimes(1)
        expect(props.onChangeCustomers).toBeCalledWith([customerCatalogItem.id])
      })

      test('Переданное значение устанавливается', () => {
        const customerCatalogItem = catalogsFixtures.customerCatalogItem()

        render(
          <TasksFilter
            {...props}
            customers={[customerCatalogItem]}
            formValues={{
              ...props.formValues,
              customers: [customerCatalogItem.id],
            }}
          />,
        )

        const selectedOption = tasksFilterTestUtils.getSelectedCustomer()

        expect(selectedOption).toBeInTheDocument()
        expect(selectedOption).toHaveTextContent(customerCatalogItem.title)
      })

      test.todo('Сбрасывает выбранные макрорегионы и группы поддержки')

      test('Кнопка "Сбросить" сбрасывает значение', async () => {
        const customerCatalogItem = catalogsFixtures.customerCatalogItem()

        const { user } = render(<TasksFilter {...props} customers={[customerCatalogItem]} />)

        await tasksFilterTestUtils.openCustomersSelect(user)
        await tasksFilterTestUtils.setCustomer(user, customerCatalogItem.title)
        const block = tasksFilterTestUtils.getSupportGroupBlock()
        await tasksFilterTestUtils.clickResetButtonIn(user, block)
        const selectedOption = tasksFilterTestUtils.getSelectedCustomer()
        expect(props.onChangeCustomers).toBeCalled()
        expect(props.onChangeCustomers).toBeCalledWith([])

        expect(selectedOption).not.toBeInTheDocument()
      })

      test('Кнопка "Сбросить всё" сбрасывает значение', async () => {
        const customerCatalogItem = catalogsFixtures.customerCatalogItem()

        const { user } = render(<TasksFilter {...props} customers={[customerCatalogItem]} />)

        await tasksFilterTestUtils.openCustomersSelect(user)
        await tasksFilterTestUtils.setCustomer(user, customerCatalogItem.title)
        await tasksFilterTestUtils.clickResetAllButton(user)
        const selectedOption = tasksFilterTestUtils.getSelectedCustomer()
        expect(props.onChangeCustomers).toBeCalled()
        expect(props.onChangeCustomers).toBeCalledWith([])

        expect(selectedOption).not.toBeInTheDocument()
      })
    })

    describe('Макрорегионы', () => {
      test('Отображается корректно', async () => {
        const macroregionsCatalog = catalogsFixtures.macroregionsCatalog()
        const { user } = render(<TasksFilter {...props} macroregions={macroregionsCatalog} />)

        const field = tasksFilterTestUtils.getMacroregionsSelect()
        const selectedOption = tasksFilterTestUtils.getSelectedMacroregion()
        await tasksFilterTestUtils.openMacroregionsSelect(user)

        expect(field).toBeInTheDocument()
        expect(field).toBeEnabled()
        expect(selectedOption).not.toBeInTheDocument()
        macroregionsCatalog.forEach((item) => {
          const option = selectTestUtils.getSelectOption(item.title)
          expect(option).toBeInTheDocument()
        })
      })

      test('Можно установить значение', async () => {
        const macroregion = catalogsFixtures.macroregionCatalogItem()

        const { user } = render(<TasksFilter {...props} macroregions={[macroregion]} />)

        await tasksFilterTestUtils.openMacroregionsSelect(user)
        await tasksFilterTestUtils.setMacroregion(user, macroregion.title)
        const selectedOption = tasksFilterTestUtils.getSelectedMacroregion()

        expect(selectedOption).toBeInTheDocument()
        expect(selectedOption).toHaveTextContent(macroregion.title)
        expect(props.onChangeMacroregions).toBeCalledTimes(1)
        expect(props.onChangeMacroregions).toBeCalledWith([macroregion.id])
      })

      test('Переданное значение устанавливается', () => {
        const macroregion = catalogsFixtures.macroregionCatalogItem()

        render(
          <TasksFilter
            {...props}
            macroregions={[macroregion]}
            formValues={{
              ...props.formValues,
              macroregions: [macroregion.id],
            }}
          />,
        )

        const selectedOption = tasksFilterTestUtils.getSelectedMacroregion()

        expect(selectedOption).toBeInTheDocument()
        expect(selectedOption).toHaveTextContent(macroregion.title)
      })

      test.todo('Сбрасывает выбранные группы поддержки')

      test('Кнопка "Сбросить" сбрасывает значение', async () => {
        const macroregion = catalogsFixtures.macroregionCatalogItem()

        const { user } = render(<TasksFilter {...props} macroregions={[macroregion]} />)

        await tasksFilterTestUtils.openMacroregionsSelect(user)
        await tasksFilterTestUtils.setMacroregion(user, macroregion.title)
        const block = tasksFilterTestUtils.getSupportGroupBlock()
        await tasksFilterTestUtils.clickResetButtonIn(user, block)
        const selectedOption = tasksFilterTestUtils.getSelectedMacroregion()

        expect(selectedOption).not.toBeInTheDocument()
        expect(props.onChangeMacroregions).toBeCalled()
        expect(props.onChangeMacroregions).toBeCalledWith([macroregion.id])
      })

      test('Кнопка "Сбросить всё" сбрасывает значение', async () => {
        const macroregion = catalogsFixtures.macroregionCatalogItem()

        const { user } = render(<TasksFilter {...props} macroregions={[macroregion]} />)

        await tasksFilterTestUtils.openMacroregionsSelect(user)
        await tasksFilterTestUtils.setMacroregion(user, macroregion.title)
        await tasksFilterTestUtils.clickResetAllButton(user)
        const selectedOption = tasksFilterTestUtils.getSelectedMacroregion()

        expect(selectedOption).not.toBeInTheDocument()
        expect(props.onChangeMacroregions).toBeCalled()
        expect(props.onChangeMacroregions).toBeCalledWith([macroregion.id])
      })
    })

    describe('Группы поддержки', () => {
      test('Отображается корректно', async () => {
        const supportGroups = supportGroupsFixtures.supportGroups()
        const { user } = render(<TasksFilter {...props} supportGroups={supportGroups} />)

        const field = tasksFilterTestUtils.getSupportGroupsSelect()
        const selectedOption = tasksFilterTestUtils.getSelectedSupportGroup()
        await tasksFilterTestUtils.openSupportGroupsSelect(user)

        expect(field).toBeInTheDocument()
        expect(field).toBeEnabled()
        expect(selectedOption).not.toBeInTheDocument()
        supportGroups.forEach((item) => {
          const option = selectTestUtils.getSelectOption(item.name)
          expect(option).toBeInTheDocument()
        })
      })

      test('Можно установить значение', async () => {
        const supportGroup = supportGroupsFixtures.supportGroup()
        const { user } = render(<TasksFilter {...props} supportGroups={[supportGroup]} />)

        await tasksFilterTestUtils.openSupportGroupsSelect(user)
        await tasksFilterTestUtils.setSupportGroup(user, supportGroup.name)

        const selectedOption = tasksFilterTestUtils.getSelectedSupportGroup()
        expect(selectedOption).toBeInTheDocument()
        expect(selectedOption).toHaveTextContent(supportGroup.name)
      })

      test('Переданное значение устанавливается', () => {
        const supportGroup = supportGroupsFixtures.supportGroup()

        render(
          <TasksFilter
            {...props}
            supportGroups={[supportGroup]}
            formValues={{
              ...props.formValues,
              supportGroups: [supportGroup.id],
            }}
          />,
        )

        const selectedOption = tasksFilterTestUtils.getSelectedSupportGroup()

        expect(selectedOption).toBeInTheDocument()
        expect(selectedOption).toHaveTextContent(supportGroup.name)
      })

      test('Кнопка "Сбросить" сбрасывает значение', async () => {
        const supportGroup = supportGroupsFixtures.supportGroup()

        const { user } = render(<TasksFilter {...props} supportGroups={[supportGroup]} />)

        await tasksFilterTestUtils.openSupportGroupsSelect(user)
        await tasksFilterTestUtils.setSupportGroup(user, supportGroup.name)
        const block = tasksFilterTestUtils.getSupportGroupBlock()
        await tasksFilterTestUtils.clickResetButtonIn(user, block)
        const selectedOption = tasksFilterTestUtils.getSelectedSupportGroup()

        expect(selectedOption).not.toBeInTheDocument()
      })

      test('Кнопка "Сбросить всё" сбрасывает значение', async () => {
        const supportGroup = supportGroupsFixtures.supportGroup()

        const { user } = render(<TasksFilter {...props} supportGroups={[supportGroup]} />)

        await tasksFilterTestUtils.openSupportGroupsSelect(user)
        await tasksFilterTestUtils.setSupportGroup(user, supportGroup.name)
        await tasksFilterTestUtils.clickResetAllButton(user)
        const selectedOption = tasksFilterTestUtils.getSelectedSupportGroup()

        expect(selectedOption).not.toBeInTheDocument()
      })
    })
  })

  describe('Статус', () => {
    test('Отображается', () => {
      render(<TasksFilter {...props} />)

      const container = tasksFilterTestUtils.status.getContainer()

      taskExtendedStatusDictValues.forEach((value) => {
        const checkbox = checkboxTestUtils.getCheckboxIn(container, new RegExp(value))
        expect(checkbox).toBeInTheDocument()
      })
    })

    test('Имеет корректные значения по умолчанию', () => {
      render(<TasksFilter {...props} />)
      tasksFilterTestUtils.status.expectHasCorrectInitialValues()
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
        tasksFilterTestUtils.status.getContainer(),
        new RegExp(taskExtendedStatusDict[TaskExtendedStatusEnum.InProgress]!),
      )

      expect(checkbox).toBeChecked()
    })

    test('Доступен для редактирования', () => {
      render(<TasksFilter {...props} />)

      const container = tasksFilterTestUtils.status.getContainer()

      taskExtendedStatusDictValues.forEach((value) => {
        const checkbox = checkboxTestUtils.getCheckboxIn(container, new RegExp(value))
        expect(checkbox).toBeEnabled()
      })
    })

    test('Можно выбрать любое значение', async () => {
      const { user } = render(<TasksFilter {...props} />)

      for await (const value of taskExtendedStatusDictValues) {
        const checkbox = await tasksFilterTestUtils.status.setValue(user, value)
        expect(checkbox).toBeChecked()
      }
    })

    describe('Сбрасывает значения', () => {
      test('Кнопка "Сбросить"', async () => {
        const { user } = render(<TasksFilter {...props} />)

        const container = tasksFilterTestUtils.status.getContainer()

        for await (const value of taskExtendedStatusDictValues) {
          const checkbox = checkboxTestUtils.getCheckboxIn(container, new RegExp(value))
          await user.click(checkbox)
        }

        await tasksFilterTestUtils.clickResetButtonIn(user, container)

        taskExtendedStatusDictValues.forEach((value) => {
          const checkbox = checkboxTestUtils.getCheckboxIn(container, new RegExp(value))
          expect(checkbox).not.toBeChecked()
        })
      })

      test('Кнопка "Сбросить всё"', async () => {
        const { user } = render(<TasksFilter {...props} />)

        const container = tasksFilterTestUtils.status.getContainer()

        for await (const value of taskExtendedStatusDictValues) {
          const checkbox = checkboxTestUtils.getCheckboxIn(container, new RegExp(value))
          await user.click(checkbox)
        }

        await tasksFilterTestUtils.clickResetAllButton(user)

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

      const startDateField = tasksFilterTestUtils.creationDate.getStartDateField()
      const endDateField = tasksFilterTestUtils.creationDate.getEndDateField()

      expect(startDateField).toBeInTheDocument()
      expect(startDateField).toBeEnabled()

      expect(endDateField).toBeInTheDocument()
      expect(endDateField).toBeEnabled()
    })

    test('Имеет корректные значения по умолчанию', () => {
      render(<TasksFilter {...props} />)
      tasksFilterTestUtils.creationDate.expectHasCorrectInitialValues()
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

      const startDateField = tasksFilterTestUtils.creationDate.getStartDateField()
      const endDateField = tasksFilterTestUtils.creationDate.getEndDateField()

      expect(startDateField).toHaveValue()
      expect(endDateField).toHaveValue()
    })

    test('Доступен для редактирования', () => {
      render(<TasksFilter {...props} />)

      const startDateField = tasksFilterTestUtils.creationDate.getStartDateField()
      const endDateField = tasksFilterTestUtils.creationDate.getEndDateField()

      expect(startDateField).toBeEnabled()
      expect(endDateField).toBeEnabled()
    })

    test('Можно выбрать даты', async () => {
      const { user } = render(<TasksFilter {...props} />)

      const { startDateField, startDateValue, endDateField, endDateValue } =
        await tasksFilterTestUtils.creationDate.setValue(user)

      expect(startDateField).toHaveDisplayValue(startDateValue)
      expect(endDateField).toHaveDisplayValue(endDateValue)
    })

    describe('Сбрасывает значения', () => {
      test('Кнопка "Сбросить"', async () => {
        const { user } = render(<TasksFilter {...props} />)

        const { startDateValue, endDateValue } = await tasksFilterTestUtils.creationDate.setValue(
          user,
        )

        const container = tasksFilterTestUtils.creationDate.getContainer()
        await tasksFilterTestUtils.clickResetButtonIn(user, container)

        expect(tasksFilterTestUtils.creationDate.getStartDateField()).not.toHaveDisplayValue(
          startDateValue,
        )
        expect(tasksFilterTestUtils.creationDate.getEndDateField()).not.toHaveDisplayValue(
          endDateValue,
        )
      })

      test('Кнопка "Сбросить всё"', async () => {
        const { user } = render(<TasksFilter {...props} />)

        const { startDateValue, endDateValue } = await tasksFilterTestUtils.creationDate.setValue(
          user,
        )

        await tasksFilterTestUtils.clickResetAllButton(user)

        expect(tasksFilterTestUtils.creationDate.getStartDateField()).not.toHaveDisplayValue(
          startDateValue,
        )
        expect(tasksFilterTestUtils.creationDate.getEndDateField()).not.toHaveDisplayValue(
          endDateValue,
        )
      })
    })
  })

  describe('Назначенный', () => {
    test('Отображается', () => {
      render(<TasksFilter {...props} />)

      const container = tasksFilterTestUtils.assigned.getContainer()

      taskAssignedDictValues.forEach((value) => {
        const radioButton = radioButtonTestUtils.getRadioButtonIn(container, value)
        expect(radioButton).toBeInTheDocument()
      })
    })

    test('Имеет корректные значения по умолчанию', () => {
      render(<TasksFilter {...props} />)
      tasksFilterTestUtils.assigned.expectHasCorrectInitialValues()
    })

    test('Переданное значение перезаписывает значение по умолчанию', () => {
      /**
       * По каким-то причинам, в тесте, radioButton не помечается как выбранный и тест не проходит
       * Но по факту всё работает как надо
       */
    })

    test('Доступен для редактирования', () => {
      render(<TasksFilter {...props} />)

      const container = tasksFilterTestUtils.assigned.getContainer()

      taskAssignedDictValues.forEach((value) => {
        const radioButton = radioButtonTestUtils.getRadioButtonIn(container, value)
        expect(radioButton).toBeEnabled()
      })
    })

    test('Можно выбрать любое значение', async () => {
      const { user } = render(<TasksFilter {...props} />)

      for await (const value of taskAssignedDictValues) {
        const radioButton = await tasksFilterTestUtils.assigned.setValue(user, value)
        expect(radioButton).toBeChecked()
      }
    })

    describe('Сбрасывает значение', () => {
      test('Кнопка "Сбросить"', async () => {
        const { user } = render(<TasksFilter {...props} />)

        const container = tasksFilterTestUtils.assigned.getContainer()

        await user.click(
          radioButtonTestUtils.getRadioButtonIn(
            container,
            taskAssignedDict[TaskAssignedEnum.NotAssigned],
          ),
        )

        await tasksFilterTestUtils.clickResetButtonIn(user, container)

        expect(
          radioButtonTestUtils.getRadioButtonIn(
            container,
            taskAssignedDict[TaskAssignedEnum.NotAssigned],
          ),
        ).not.toBeChecked()
      })

      test('Кнопка "Сбросить всё"', async () => {
        const { user } = render(<TasksFilter {...props} />)

        const container = tasksFilterTestUtils.assigned.getContainer()

        await user.click(
          radioButtonTestUtils.getRadioButtonIn(
            container,
            taskAssignedDict[TaskAssignedEnum.Assigned],
          ),
        )

        await tasksFilterTestUtils.clickResetAllButton(user)

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

      const container = tasksFilterTestUtils.overdue.getContainer()

      taskOverdueDictValues.forEach((value) => {
        const radioButton = radioButtonTestUtils.getRadioButtonIn(container, value)
        expect(radioButton).toBeInTheDocument()
      })
    })

    test('Имеет корректные значения по умолчанию', () => {
      render(<TasksFilter {...props} />)
      tasksFilterTestUtils.overdue.expectHasCorrectInitialValues()
    })

    test('Переданное значение перезаписывает значение по умолчанию', () => {
      /**
       * По каким-то причинам, в тесте, radioButton не помечается как выбранный и тест не проходит
       * Но по факту всё работает как надо
       */
    })

    test('Доступен для редактирования', () => {
      render(<TasksFilter {...props} />)

      const container = tasksFilterTestUtils.overdue.getContainer()

      taskOverdueDictValues.forEach((value) => {
        const radioButton = radioButtonTestUtils.getRadioButtonIn(container, value)
        expect(radioButton).toBeEnabled()
      })
    })

    test('Можно выбрать любое значение', async () => {
      const { user } = render(<TasksFilter {...props} />)

      for await (const value of taskOverdueDictValues) {
        const radioButton = await tasksFilterTestUtils.overdue.setValue(user, value)
        expect(radioButton).toBeChecked()
      }
    })

    describe('Сбрасывает значение', () => {
      test('Кнопка "Сбросить"', async () => {
        const { user } = render(<TasksFilter {...props} />)

        const container = tasksFilterTestUtils.overdue.getContainer()

        await user.click(radioButtonTestUtils.getRadioButtonIn(container, taskOverdueDict.False))

        await tasksFilterTestUtils.clickResetButtonIn(user, container)

        expect(
          radioButtonTestUtils.getRadioButtonIn(container, taskOverdueDict.False),
        ).not.toBeChecked()
      })

      test('Кнопка "Сбросить всё"', async () => {
        const { user } = render(<TasksFilter {...props} />)

        const container = tasksFilterTestUtils.overdue.getContainer()

        await user.click(radioButtonTestUtils.getRadioButtonIn(container, taskOverdueDict.True))

        await tasksFilterTestUtils.clickResetAllButton(user)

        expect(
          radioButtonTestUtils.getRadioButtonIn(container, taskOverdueDict.True),
        ).not.toBeChecked()
      })
    })
  })

  describe('Выполнить до', () => {
    test('Отображается', () => {
      render(<TasksFilter {...props} />)

      const startDateField = tasksFilterTestUtils.completeAt.getStartDateField()
      const endDateField = tasksFilterTestUtils.completeAt.getEndDateField()

      expect(startDateField).toBeInTheDocument()
      expect(startDateField).toBeEnabled()

      expect(endDateField).toBeInTheDocument()
      expect(endDateField).toBeEnabled()
    })

    test('Имеет корректные значения по умолчанию', () => {
      render(<TasksFilter {...props} />)
      tasksFilterTestUtils.completeAt.expectHasCorrectInitialValues()
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

      const startDateField = tasksFilterTestUtils.completeAt.getStartDateField()
      const endDateField = tasksFilterTestUtils.completeAt.getEndDateField()

      expect(startDateField).toHaveValue()
      expect(endDateField).toHaveValue()
    })

    test('Доступен для редактирования', () => {
      render(<TasksFilter {...props} />)

      const startDateField = tasksFilterTestUtils.completeAt.getStartDateField()
      const endDateField = tasksFilterTestUtils.completeAt.getEndDateField()

      expect(startDateField).toBeEnabled()
      expect(endDateField).toBeEnabled()
    })

    test('Можно выбрать даты', async () => {
      const { user } = render(<TasksFilter {...props} />)

      const { startDateField, startDateValue, endDateField, endDateValue } =
        await tasksFilterTestUtils.completeAt.setValue(user)

      expect(startDateField).toHaveDisplayValue(startDateValue)
      expect(endDateField).toHaveDisplayValue(endDateValue)
    })

    describe('Сбрасывает значения', () => {
      test('Кнопка "Сбросить"', async () => {
        const { user } = render(<TasksFilter {...props} />)

        const { startDateValue, endDateValue } = await tasksFilterTestUtils.completeAt.setValue(
          user,
        )

        const container = tasksFilterTestUtils.completeAt.getContainer()
        await tasksFilterTestUtils.clickResetButtonIn(user, container)

        expect(tasksFilterTestUtils.completeAt.getStartDateField()).not.toHaveDisplayValue(
          startDateValue,
        )
        expect(tasksFilterTestUtils.completeAt.getEndDateField()).not.toHaveDisplayValue(
          endDateValue,
        )
      })

      test('Кнопка "Сбросить всё"', async () => {
        const { user } = render(<TasksFilter {...props} />)

        const { startDateValue, endDateValue } = await tasksFilterTestUtils.completeAt.setValue(
          user,
        )

        await tasksFilterTestUtils.clickResetAllButton(user)

        expect(tasksFilterTestUtils.completeAt.getStartDateField()).not.toHaveDisplayValue(
          startDateValue,
        )
        expect(tasksFilterTestUtils.completeAt.getEndDateField()).not.toHaveDisplayValue(
          endDateValue,
        )
      })
    })
  })

  describe('Поиск по столбцу', () => {
    test('Отображается', () => {
      render(<TasksFilter {...props} />)

      const container = tasksFilterTestUtils.searchByColumn.getContainer()

      searchFieldDictValues.forEach((value) => {
        const radioButton = radioButtonTestUtils.getRadioButtonIn(container, value)
        expect(radioButton).toBeInTheDocument()
      })

      const keywordField = tasksFilterTestUtils.searchByColumn.getKeywordField()
      expect(keywordField).toBeInTheDocument()
    })

    test('Имеет корректные значения по умолчанию', () => {
      render(<TasksFilter {...props} />)
      tasksFilterTestUtils.searchByColumn.expectHasCorrectInitialValues()
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

      const container = tasksFilterTestUtils.searchByColumn.getContainer()

      const keywordField = tasksFilterTestUtils.searchByColumn.getKeywordField()
      expect(keywordField).toHaveValue(searchValue)

      const searchByNameButton = radioButtonTestUtils.getRadioButtonIn(
        container,
        searchFieldDict.searchByName,
      )
      expect(searchByNameButton).toBeChecked()
    })

    test('Доступен для редактирования', () => {
      render(<TasksFilter {...props} />)

      const container = tasksFilterTestUtils.searchByColumn.getContainer()

      searchFieldDictValues.forEach((value) => {
        const radioButton = radioButtonTestUtils.getRadioButtonIn(container, value)
        expect(radioButton).toBeEnabled()
      })

      const keywordField = tasksFilterTestUtils.searchByColumn.getKeywordField()

      expect(keywordField).toBeEnabled()
    })

    test('Можно ввести ключевое слово', async () => {
      const { user } = render(<TasksFilter {...props} />)

      const { keywordField, keyword } = await tasksFilterTestUtils.searchByColumn.setKeywordValue(
        user,
      )

      expect(keywordField).toHaveDisplayValue(keyword)
    })

    test('Можно выбрать любой столбец', async () => {
      const { user } = render(<TasksFilter {...props} />)

      for await (const value of searchFieldDictValues) {
        const radioButton = await tasksFilterTestUtils.searchByColumn.setColumnValue(user, value)

        expect(radioButton).toBeChecked()
      }
    })

    describe('Сбрасывает значения', () => {
      test('Кнопка "Сбросить"', async () => {
        const { user } = render(<TasksFilter {...props} />)

        const container = tasksFilterTestUtils.searchByColumn.getContainer()

        const keyword = fakeName()
        await user.type(tasksFilterTestUtils.searchByColumn.getKeywordField(), keyword)

        await user.click(
          radioButtonTestUtils.getRadioButtonIn(container, searchFieldDict.searchByName),
        )

        await tasksFilterTestUtils.clickResetButtonIn(user, container)

        expect(tasksFilterTestUtils.searchByColumn.getKeywordField()).not.toHaveDisplayValue(
          keyword,
        )
        expect(
          radioButtonTestUtils.getRadioButtonIn(container, searchFieldDict.searchByName),
        ).not.toBeChecked()
      })

      test('Кнопка "Сбросить всё"', async () => {
        const { user } = render(<TasksFilter {...props} />)

        const container = tasksFilterTestUtils.searchByColumn.getContainer()

        const keyword = fakeName()
        await user.type(tasksFilterTestUtils.searchByColumn.getKeywordField(), keyword)

        await user.click(
          radioButtonTestUtils.getRadioButtonIn(container, searchFieldDict.searchByName),
        )

        await tasksFilterTestUtils.clickResetAllButton(user)

        expect(tasksFilterTestUtils.searchByColumn.getKeywordField()).not.toHaveDisplayValue(
          keyword,
        )
        expect(
          radioButtonTestUtils.getRadioButtonIn(container, searchFieldDict.searchByName),
        ).not.toBeChecked()
      })
    })
  })

  describe('Рабочая группа', () => {
    test(`Отображается если есть права ${UserPermissionsEnum.SelfWorkGroupsRead}`, () => {
      render(<TasksFilter {...props} permissions={{ selfWorkGroupsRead: true }} />)
      const container = tasksFilterTestUtils.workGroup.getContainer()
      expect(container).toBeInTheDocument()
    })

    test(`Отображается если есть права ${UserPermissionsEnum.AnyWorkGroupsRead}`, () => {
      render(<TasksFilter {...props} permissions={{ anyWorkGroupsRead: true }} />)
      const container = tasksFilterTestUtils.workGroup.getContainer()
      expect(container).toBeInTheDocument()
    })

    test('Не отображается если нет прав', () => {
      render(
        <TasksFilter
          {...props}
          permissions={{ selfWorkGroupsRead: false, anyWorkGroupsRead: false }}
        />,
      )

      const container = tasksFilterTestUtils.workGroup.queryContainer()
      expect(container).not.toBeInTheDocument()
    })

    test('Имеет корректные значения по умолчанию', () => {
      render(
        <TasksFilter
          {...props}
          workGroups={workGroupsFixtures.workGroups()}
          permissions={{ selfWorkGroupsRead: true }}
        />,
      )
      const field = tasksFilterTestUtils.workGroup.getField()
      const selectedOption = selectTestUtils.getSelectedOption(field)
      expect(selectedOption).not.toBeInTheDocument()
    })

    test('Переданное значение перезаписывает значение по умолчанию', () => {
      const workGroupListItem = workGroupsFixtures.workGroup()

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

      const workGroupField = tasksFilterTestUtils.workGroup.getField()
      const selectedOption = selectTestUtils.getSelectedOption(workGroupField)

      expect(selectedOption).toBeInTheDocument()
      expect(selectedOption).toHaveTextContent(workGroupListItem.name)
    })

    test('Доступен для редактирования после загрузки списка', () => {
      render(<TasksFilter {...props} permissions={{ selfWorkGroupsRead: true }} />)
      const workGroupField = tasksFilterTestUtils.workGroup.getField()
      const select = selectTestUtils.getSelect(workGroupField)
      expect(select).toBeEnabled()
    })

    test('Можно выбрать рабочую группу из списка', async () => {
      const workGroupListItem = workGroupsFixtures.workGroup()

      const { user } = render(
        <TasksFilter
          {...props}
          workGroups={[workGroupListItem]}
          permissions={{ selfWorkGroupsRead: true }}
        />,
      )

      const workGroupField = tasksFilterTestUtils.workGroup.getField()
      await tasksFilterTestUtils.workGroup.openField(user, workGroupField)
      await tasksFilterTestUtils.workGroup.setValue(user, workGroupListItem.name)

      const selectedOption = selectTestUtils.getSelectedOption(workGroupField)
      expect(selectedOption).toHaveTextContent(workGroupListItem.name)
      expect(selectedOption).toBeVisible()
    })

    test('Поиск по списку работает', async () => {
      const workGroupListItem1 = workGroupsFixtures.workGroup()
      const workGroupListItem2 = workGroupsFixtures.workGroup()

      const { user } = render(
        <TasksFilter
          {...props}
          workGroups={[workGroupListItem1, workGroupListItem2]}
          permissions={{ selfWorkGroupsRead: true }}
        />,
      )

      const workGroupField = tasksFilterTestUtils.workGroup.getField()
      await tasksFilterTestUtils.workGroup.openField(user, workGroupField)
      await selectTestUtils.userSearchInSelect(user, workGroupField, workGroupListItem1.name)

      const option1 = selectTestUtils.getSelectOption(workGroupListItem1.name)
      const option2 = selectTestUtils.querySelectOption(workGroupListItem2.name)

      expect(option1).toBeInTheDocument()
      expect(option2).not.toBeInTheDocument()
    })

    describe('Сбрасывает значения', () => {
      test('Кнопка "Сбросить"', async () => {
        const workGroupListItem = workGroupsFixtures.workGroup()

        const { user } = render(
          <TasksFilter
            {...props}
            workGroups={[workGroupListItem]}
            permissions={{ selfWorkGroupsRead: true }}
          />,
        )

        const workGroupField = tasksFilterTestUtils.workGroup.getField()
        await tasksFilterTestUtils.workGroup.openField(user, workGroupField)
        await tasksFilterTestUtils.workGroup.setValue(user, workGroupListItem.name)

        const container = tasksFilterTestUtils.workGroup.getContainer()
        await tasksFilterTestUtils.clickResetButtonIn(user, container)

        const selectedOption = selectTestUtils.getSelectedOption(workGroupField)
        expect(selectedOption).not.toBeInTheDocument()
      })

      test('Кнопка "Сбросить всё"', async () => {
        const workGroupListItem = workGroupsFixtures.workGroup()

        const { user } = render(
          <TasksFilter
            {...props}
            workGroups={[workGroupListItem]}
            permissions={{ selfWorkGroupsRead: true }}
          />,
        )

        const workGroupField = tasksFilterTestUtils.workGroup.getField()
        await tasksFilterTestUtils.workGroup.openField(user, workGroupField)

        await tasksFilterTestUtils.workGroup.setValue(user, workGroupListItem.name)
        await tasksFilterTestUtils.clickResetAllButton(user)

        const selectedOption = selectTestUtils.getSelectedOption(workGroupField)
        expect(selectedOption).not.toBeInTheDocument()
      })
    })
  })

  describe('Руководитель', () => {
    test('Отображается корректно', async () => {
      const userList = [userFixtures.user()]
      const { user } = render(<TasksFilter {...props} users={userList} />)

      const field = tasksFilterTestUtils.manager.getField()
      const selectedOption = tasksFilterTestUtils.manager.getSelected()
      await tasksFilterTestUtils.manager.openField(user)

      expect(field).toBeInTheDocument()
      expect(field).toBeEnabled()
      expect(selectedOption).not.toBeInTheDocument()
      userList.forEach((usr) => {
        const option = selectTestUtils.getSelectOption(usr.fullName)
        expect(option).toBeInTheDocument()
      })
    })

    test('Можно установить значение', async () => {
      const userListItem = userFixtures.user()
      const { user } = render(<TasksFilter {...props} users={[userListItem]} />)

      await tasksFilterTestUtils.manager.openField(user)
      await tasksFilterTestUtils.manager.setValue(user, userListItem.fullName)

      const selectedOption = tasksFilterTestUtils.manager.getSelected()
      expect(selectedOption).toBeInTheDocument()
      expect(selectedOption).toHaveTextContent(userListItem.fullName)
    })

    test('Переданное значение устанавливается', () => {
      const userListItem = userFixtures.user()

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

      const selectedOption = tasksFilterTestUtils.manager.getSelected()

      expect(selectedOption).toBeInTheDocument()
      expect(selectedOption).toHaveTextContent(userListItem.fullName)
    })

    test('Поиск по списку работает', async () => {
      const userListItem1 = userFixtures.user()
      const userListItem2 = userFixtures.user()

      const { user } = render(<TasksFilter {...props} users={[userListItem1, userListItem2]} />)

      const container = await tasksFilterTestUtils.manager.openField(user)
      await selectTestUtils.userSearchInSelect(user, container, userListItem1.fullName)

      const option1 = selectTestUtils.getSelectOption(userListItem1.fullName)
      const option2 = selectTestUtils.querySelectOption(userListItem2.fullName)

      expect(option1).toBeInTheDocument()
      expect(option2).not.toBeInTheDocument()
    })

    test('Кнопка "Сбросить" сбрасывает значение', async () => {
      const userListItem = userFixtures.user()

      const { user } = render(<TasksFilter {...props} users={[userListItem]} />)

      await tasksFilterTestUtils.manager.openField(user)
      await tasksFilterTestUtils.manager.setValue(user, userListItem.fullName)
      const container = tasksFilterTestUtils.manager.getContainer()
      await tasksFilterTestUtils.clickResetButtonIn(user, container)
      const selectedOption = tasksFilterTestUtils.manager.getSelected()

      expect(selectedOption).not.toBeInTheDocument()
    })

    test('Кнопка "Сбросить всё" сбрасывает значение', async () => {
      const userListItem = userFixtures.user()

      const { user } = render(<TasksFilter {...props} users={[userListItem]} />)

      await tasksFilterTestUtils.manager.openField(user)
      await tasksFilterTestUtils.manager.setValue(user, userListItem.fullName)
      await tasksFilterTestUtils.clickResetAllButton(user)
      const selectedOption = tasksFilterTestUtils.manager.getSelected()

      expect(selectedOption).not.toBeInTheDocument()
    })
  })
})
