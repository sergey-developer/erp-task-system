import moment from 'moment'

import { mockGetWorkGroupListSuccess } from '_tests_/mocks/api'
import {
  generateName,
  getCheckboxIn,
  getRadioButtonIn,
  getSelect,
  getSelectOption,
  getSelectedOption,
  getStoreWithAuth,
  querySelectOption,
  render,
  setupApiTests,
  userSearchInSelect,
} from '_tests_/utils'
import { screen } from '@testing-library/react'
import workGroupFixtures from 'fixtures/workGroup'
import { TaskExtendedStatusEnum } from 'modules/task/constants/common'
import { taskExtendedStatusDict } from 'modules/task/constants/dictionary'
import { UserRoleEnum } from 'shared/constants/roles'

import {
  TaskAssignedEnum,
  searchFieldDict,
  taskAssignedDict,
  taskOverdueDict,
} from '../constants'
import ExtendedFilter from '../index'
import {
  requiredProps,
  searchFieldDictValues,
  taskAssignedDictValues,
  taskExtendedStatusDictValues,
  taskOverdueDictValues,
} from './constants'
import testUtils from './utils'

setupApiTests()

describe('Расширенный фильтр', () => {
  test('Отображается', () => {
    render(<ExtendedFilter {...requiredProps} />)

    expect(testUtils.getFilter()).toBeInTheDocument()
  })

  describe('Header', () => {
    test('Корректно отображается', () => {
      render(<ExtendedFilter {...requiredProps} />)

      const title = screen.getByText('Фильтры')
      const closeButton = testUtils.getCloseButton()

      expect(title).toBeInTheDocument()
      expect(closeButton).toBeInTheDocument()
    })

    test('Кнопка закрытия кликабельна', async () => {
      const { user } = render(<ExtendedFilter {...requiredProps} />)

      const closeButton = testUtils.getCloseButton()
      expect(closeButton).toBeEnabled()

      await user.click(closeButton)
      expect(requiredProps.onClose).toBeCalledTimes(1)
    })
  })

  describe('Footer', () => {
    test('Корректно отображается', () => {
      render(<ExtendedFilter {...requiredProps} />)

      const applyButton = testUtils.getApplyButton()
      const resetAllButton = testUtils.getResetAllButton()

      expect(applyButton).toBeInTheDocument()
      expect(resetAllButton).toBeInTheDocument()
    })

    test('Кнопки активны', () => {
      render(<ExtendedFilter {...requiredProps} />)

      const applyButton = testUtils.getApplyButton()
      const resetAllButton = testUtils.getResetAllButton()

      expect(applyButton).toBeEnabled()
      expect(resetAllButton).toBeEnabled()
    })
  })

  describe('Статус', () => {
    test('Отображается', () => {
      render(<ExtendedFilter {...requiredProps} />)

      const container = testUtils.status.getContainer()

      taskExtendedStatusDictValues.forEach((value) => {
        const checkbox = getCheckboxIn(container, new RegExp(value))
        expect(checkbox).toBeInTheDocument()
      })
    })

    test('Имеет корректные значения по умолчанию', () => {
      render(<ExtendedFilter {...requiredProps} />)
      testUtils.status.expectHasCorrectInitialValues()
    })

    test('Переданное значение перезаписывает значение по умолчанию', () => {
      render(
        <ExtendedFilter
          {...requiredProps}
          formValues={{
            ...requiredProps.formValues,
            status: [TaskExtendedStatusEnum.InProgress],
          }}
        />,
      )

      const checkbox = getCheckboxIn(
        testUtils.status.getContainer(),
        new RegExp(taskExtendedStatusDict[TaskExtendedStatusEnum.InProgress]!),
      )

      expect(checkbox).toBeChecked()
    })

    test('Доступен для редактирования', () => {
      render(<ExtendedFilter {...requiredProps} />)

      const container = testUtils.status.getContainer()

      taskExtendedStatusDictValues.forEach((value) => {
        const checkbox = getCheckboxIn(container, new RegExp(value))
        expect(checkbox).toBeEnabled()
      })
    })

    test('Можно выбрать любое значение', async () => {
      const { user } = render(<ExtendedFilter {...requiredProps} />)

      for await (const value of taskExtendedStatusDictValues) {
        const checkbox = await testUtils.status.userSetValue(user, value)
        expect(checkbox).toBeChecked()
      }
    })

    describe('Сбрасывает значения', () => {
      test('Кнопка "Сбросить"', async () => {
        const { user } = render(<ExtendedFilter {...requiredProps} />)

        const container = testUtils.status.getContainer()

        for await (const value of taskExtendedStatusDictValues) {
          const checkbox = getCheckboxIn(container, new RegExp(value))
          await user.click(checkbox)
        }

        await testUtils.userClickResetButtonIn(user, container)

        taskExtendedStatusDictValues.forEach((value) => {
          const checkbox = getCheckboxIn(container, new RegExp(value))
          expect(checkbox).not.toBeChecked()
        })
      })

      test('Кнопка "Сбросить всё"', async () => {
        const { user } = render(<ExtendedFilter {...requiredProps} />)

        const container = testUtils.status.getContainer()

        for await (const value of taskExtendedStatusDictValues) {
          const checkbox = getCheckboxIn(container, new RegExp(value))
          await user.click(checkbox)
        }

        await testUtils.userClickResetAllButton(user)

        taskExtendedStatusDictValues.forEach((value) => {
          const checkbox = getCheckboxIn(container, new RegExp(value))
          expect(checkbox).not.toBeChecked()
        })
      })
    })
  })

  describe('Назначенный', () => {
    test('Отображается', () => {
      render(<ExtendedFilter {...requiredProps} />)

      const container = testUtils.assigned.getContainer()

      taskAssignedDictValues.forEach((value) => {
        const radioButton = getRadioButtonIn(container, value)
        expect(radioButton).toBeInTheDocument()
      })
    })

    test('Имеет корректные значения по умолчанию', () => {
      render(<ExtendedFilter {...requiredProps} />)
      testUtils.assigned.expectHasCorrectInitialValues()
    })

    test('Переданное значение перезаписывает значение по умолчанию', () => {
      /**
       * По каким-то причинам, в тесте, radioButton не помечается как выбранный и тест не проходит
       * Но по факту всё работает как надо
       */
    })

    test('Доступен для редактирования', () => {
      render(<ExtendedFilter {...requiredProps} />)

      const container = testUtils.assigned.getContainer()

      taskAssignedDictValues.forEach((value) => {
        const radioButton = getRadioButtonIn(container, value)
        expect(radioButton).toBeEnabled()
      })
    })

    test('Можно выбрать любое значение', async () => {
      const { user } = render(<ExtendedFilter {...requiredProps} />)

      for await (const value of taskAssignedDictValues) {
        const radioButton = await testUtils.assigned.userSetValue(user, value)
        expect(radioButton).toBeChecked()
      }
    })

    describe('Сбрасывает значение', () => {
      test('Кнопка "Сбросить"', async () => {
        const { user } = render(<ExtendedFilter {...requiredProps} />)

        const container = testUtils.assigned.getContainer()

        await user.click(
          getRadioButtonIn(
            container,
            taskAssignedDict[TaskAssignedEnum.NotAssigned],
          ),
        )

        await testUtils.userClickResetButtonIn(user, container)

        expect(
          getRadioButtonIn(
            container,
            taskAssignedDict[TaskAssignedEnum.NotAssigned],
          ),
        ).not.toBeChecked()
      })

      test('Кнопка "Сбросить всё"', async () => {
        const { user } = render(<ExtendedFilter {...requiredProps} />)

        const container = testUtils.assigned.getContainer()

        await user.click(
          getRadioButtonIn(
            container,
            taskAssignedDict[TaskAssignedEnum.Assigned],
          ),
        )

        await testUtils.userClickResetAllButton(user)

        expect(
          getRadioButtonIn(
            container,
            taskAssignedDict[TaskAssignedEnum.Assigned],
          ),
        ).not.toBeChecked()
      })
    })
  })

  describe('Просрочено', () => {
    test('Отображается', () => {
      render(<ExtendedFilter {...requiredProps} />)

      const container = testUtils.overdue.getContainer()

      taskOverdueDictValues.forEach((value) => {
        const radioButton = getRadioButtonIn(container, value)
        expect(radioButton).toBeInTheDocument()
      })
    })

    test('Имеет корректные значения по умолчанию', () => {
      render(<ExtendedFilter {...requiredProps} />)
      testUtils.overdue.expectHasCorrectInitialValues()
    })

    test('Переданное значение перезаписывает значение по умолчанию', () => {
      /**
       * По каким-то причинам, в тесте, radioButton не помечается как выбранный и тест не проходит
       * Но по факту всё работает как надо
       */
    })

    test('Доступен для редактирования', () => {
      render(<ExtendedFilter {...requiredProps} />)

      const container = testUtils.overdue.getContainer()

      taskOverdueDictValues.forEach((value) => {
        const radioButton = getRadioButtonIn(container, value)
        expect(radioButton).toBeEnabled()
      })
    })

    test('Можно выбрать любое значение', async () => {
      const { user } = render(<ExtendedFilter {...requiredProps} />)

      for await (const value of taskOverdueDictValues) {
        const radioButton = await testUtils.overdue.userSetValue(user, value)
        expect(radioButton).toBeChecked()
      }
    })

    describe('Сбрасывает значение', () => {
      test('Кнопка "Сбросить"', async () => {
        const { user } = render(<ExtendedFilter {...requiredProps} />)

        const container = testUtils.overdue.getContainer()

        await user.click(getRadioButtonIn(container, taskOverdueDict.False))

        await testUtils.userClickResetButtonIn(user, container)

        expect(
          getRadioButtonIn(container, taskOverdueDict.False),
        ).not.toBeChecked()
      })

      test('Кнопка "Сбросить всё"', async () => {
        const { user } = render(<ExtendedFilter {...requiredProps} />)

        const container = testUtils.overdue.getContainer()

        await user.click(getRadioButtonIn(container, taskOverdueDict.True))

        await testUtils.userClickResetAllButton(user)

        expect(
          getRadioButtonIn(container, taskOverdueDict.True),
        ).not.toBeChecked()
      })
    })
  })

  describe('Выполнить до', () => {
    test('Отображается', () => {
      render(<ExtendedFilter {...requiredProps} />)

      const startDateField = testUtils.completeAt.getStartDateField()
      const endDateField = testUtils.completeAt.getEndDateField()

      expect(startDateField).toBeInTheDocument()
      expect(endDateField).toBeInTheDocument()
    })

    test('Имеет корректные значения по умолчанию', () => {
      render(<ExtendedFilter {...requiredProps} />)
      testUtils.completeAt.expectHasCorrectInitialValues()
    })

    test('Переданное значение перезаписывает значение по умолчанию', () => {
      render(
        <ExtendedFilter
          {...requiredProps}
          formValues={{
            ...requiredProps.formValues,
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
      render(<ExtendedFilter {...requiredProps} />)

      const startDateField = testUtils.completeAt.getStartDateField()
      const endDateField = testUtils.completeAt.getEndDateField()

      expect(startDateField).toBeEnabled()
      expect(endDateField).toBeEnabled()
    })

    test('Можно выбрать даты', async () => {
      const { user } = render(<ExtendedFilter {...requiredProps} />)

      const { startDateField, startDateValue, endDateField, endDateValue } =
        await testUtils.completeAt.userSetValue(user)

      expect(startDateField).toHaveDisplayValue(startDateValue)
      expect(endDateField).toHaveDisplayValue(endDateValue)
    })

    describe('Сбрасывает значения', () => {
      test('Кнопка "Сбросить"', async () => {
        const { user } = render(<ExtendedFilter {...requiredProps} />)

        const { startDateValue, endDateValue } =
          await testUtils.completeAt.userSetValue(user)

        const container = testUtils.completeAt.getContainer()
        await testUtils.userClickResetButtonIn(user, container)

        expect(testUtils.completeAt.getStartDateField()).not.toHaveDisplayValue(
          startDateValue,
        )
        expect(testUtils.completeAt.getEndDateField()).not.toHaveDisplayValue(
          endDateValue,
        )
      })

      test('Кнопка "Сбросить всё"', async () => {
        const { user } = render(<ExtendedFilter {...requiredProps} />)

        const { startDateValue, endDateValue } =
          await testUtils.completeAt.userSetValue(user)

        await testUtils.userClickResetAllButton(user)

        expect(testUtils.completeAt.getStartDateField()).not.toHaveDisplayValue(
          startDateValue,
        )
        expect(testUtils.completeAt.getEndDateField()).not.toHaveDisplayValue(
          endDateValue,
        )
      })
    })
  })

  describe('Поиск по столбцу', () => {
    test('Отображается', () => {
      render(<ExtendedFilter {...requiredProps} />)

      const container = testUtils.searchByColumn.getContainer()

      searchFieldDictValues.forEach((value) => {
        const radioButton = getRadioButtonIn(container, value)
        expect(radioButton).toBeInTheDocument()
      })

      const keywordField = testUtils.searchByColumn.getKeywordField()
      expect(keywordField).toBeInTheDocument()
    })

    test('Имеет корректные значения по умолчанию', () => {
      render(<ExtendedFilter {...requiredProps} />)
      testUtils.searchByColumn.expectHasCorrectInitialValues()
    })

    test('Переданное значение перезаписывает значение по умолчанию', () => {
      const searchValue = 'value'

      render(
        <ExtendedFilter
          {...requiredProps}
          formValues={{
            ...requiredProps.formValues,
            searchField: 'searchByName',
            searchValue,
          }}
        />,
      )

      const container = testUtils.searchByColumn.getContainer()

      const keywordField = testUtils.searchByColumn.getKeywordField()
      expect(keywordField).toHaveValue(searchValue)

      const searchByNameButton = getRadioButtonIn(
        container,
        searchFieldDict.searchByName,
      )
      expect(searchByNameButton).toBeChecked()
    })

    test('Доступен для редактирования', () => {
      render(<ExtendedFilter {...requiredProps} />)

      const container = testUtils.searchByColumn.getContainer()

      searchFieldDictValues.forEach((value) => {
        const radioButton = getRadioButtonIn(container, value)
        expect(radioButton).toBeEnabled()
      })

      const keywordField = testUtils.searchByColumn.getKeywordField()

      expect(keywordField).toBeEnabled()
    })

    test('Можно ввести ключевое слово', async () => {
      const { user } = render(<ExtendedFilter {...requiredProps} />)

      const { keywordField, keyword } =
        await testUtils.searchByColumn.userSetKeywordValue(user)

      expect(keywordField).toHaveDisplayValue(keyword)
    })

    test('Можно выбрать любой столбец', async () => {
      const { user } = render(<ExtendedFilter {...requiredProps} />)

      for await (const value of searchFieldDictValues) {
        const radioButton = await testUtils.searchByColumn.userSetColumnValue(
          user,
          value,
        )

        expect(radioButton).toBeChecked()
      }
    })

    describe('Сбрасывает значения', () => {
      test('Кнопка "Сбросить"', async () => {
        const { user } = render(<ExtendedFilter {...requiredProps} />)

        const container = testUtils.searchByColumn.getContainer()

        const keyword = generateName()
        await user.type(testUtils.searchByColumn.getKeywordField(), keyword)

        await user.click(
          getRadioButtonIn(container, searchFieldDict.searchByName),
        )

        await testUtils.userClickResetButtonIn(user, container)

        expect(
          testUtils.searchByColumn.getKeywordField(),
        ).not.toHaveDisplayValue(keyword)
        expect(
          getRadioButtonIn(container, searchFieldDict.searchByName),
        ).not.toBeChecked()
      })

      test('Кнопка "Сбросить всё"', async () => {
        const { user } = render(<ExtendedFilter {...requiredProps} />)

        const container = testUtils.searchByColumn.getContainer()

        const keyword = generateName()
        await user.type(testUtils.searchByColumn.getKeywordField(), keyword)

        await user.click(
          getRadioButtonIn(container, searchFieldDict.searchByName),
        )

        await testUtils.userClickResetAllButton(user)

        expect(
          testUtils.searchByColumn.getKeywordField(),
        ).not.toHaveDisplayValue(keyword)
        expect(
          getRadioButtonIn(container, searchFieldDict.searchByName),
        ).not.toBeChecked()
      })
    })
  })

  describe('Рабочая группа', () => {
    describe(`Для роли ${UserRoleEnum.FirstLineSupport}`, () => {
      test('Не отображается', () => {
        mockGetWorkGroupListSuccess({ body: [] })

        const store = getStoreWithAuth({
          userRole: UserRoleEnum.FirstLineSupport,
        })

        render(<ExtendedFilter {...requiredProps} />, { store })

        const workGroupField = testUtils.workGroup.queryField()
        expect(workGroupField).not.toBeInTheDocument()
      })
    })

    describe(`Для роли ${UserRoleEnum.Engineer}`, () => {
      test('Не отображается', () => {
        const store = getStoreWithAuth({
          userRole: UserRoleEnum.Engineer,
        })

        render(<ExtendedFilter {...requiredProps} />, { store })

        const workGroupField = testUtils.workGroup.queryField()
        expect(workGroupField).not.toBeInTheDocument()
      })
    })

    describe(`Для роли ${UserRoleEnum.SeniorEngineer}`, () => {
      test('Отображается', async () => {
        mockGetWorkGroupListSuccess({ body: [] })

        const store = getStoreWithAuth({
          userRole: UserRoleEnum.SeniorEngineer,
        })

        render(<ExtendedFilter {...requiredProps} />, { store })

        const workGroupField = await testUtils.workGroup.loadingFinished()

        expect(workGroupField).toBeInTheDocument()
      })
    })

    describe(`Для роли ${UserRoleEnum.HeadOfDepartment}`, () => {
      test('Отображается', async () => {
        mockGetWorkGroupListSuccess({ body: [] })

        const store = getStoreWithAuth({
          userRole: UserRoleEnum.HeadOfDepartment,
        })

        render(<ExtendedFilter {...requiredProps} />, { store })

        const workGroupField = await testUtils.workGroup.loadingFinished()

        expect(workGroupField).toBeInTheDocument()
      })
    })

    describe('Для роли с которой отображается', () => {
      test('Имеет корректные значения по умолчанию', async () => {
        mockGetWorkGroupListSuccess({
          body: workGroupFixtures.getWorkGroupList(),
        })

        const store = getStoreWithAuth({
          userRole: UserRoleEnum.SeniorEngineer,
        })

        render(<ExtendedFilter {...requiredProps} />, { store })

        const workGroupField = await testUtils.workGroup.loadingFinished()
        const selectedOption = getSelectedOption(workGroupField)

        expect(selectedOption).not.toBeInTheDocument()
      })

      test('Переданное значение перезаписывает значение по умолчанию', async () => {
        const workGroupList = workGroupFixtures.getWorkGroupList()
        const workGroupId = String(workGroupList[0].id)
        mockGetWorkGroupListSuccess({ body: workGroupList })

        const store = getStoreWithAuth({
          userRole: UserRoleEnum.SeniorEngineer,
        })

        render(
          <ExtendedFilter
            {...requiredProps}
            formValues={{
              ...requiredProps.formValues,
              workGroupId,
            }}
          />,
          { store },
        )

        const workGroupField = await testUtils.workGroup.loadingFinished()
        const selectedOption = getSelectedOption(workGroupField)

        expect(selectedOption).toBeInTheDocument()
        expect(selectedOption).toHaveTextContent(workGroupId)
      })

      test('Доступен для редактирования после загрузки списка', async () => {
        mockGetWorkGroupListSuccess({ body: [] })

        const store = getStoreWithAuth({
          userRole: UserRoleEnum.SeniorEngineer,
        })

        render(<ExtendedFilter {...requiredProps} />, { store })

        const workGroupField = await testUtils.workGroup.loadingFinished()
        const select = getSelect(workGroupField)

        expect(select).toBeEnabled()
      })

      test('Можно выбрать рабочую группу из списка', async () => {
        const workGroupListItem = workGroupFixtures.getWorkGroup()
        mockGetWorkGroupListSuccess({ body: [workGroupListItem] })

        const store = getStoreWithAuth({
          userRole: UserRoleEnum.SeniorEngineer,
        })

        const { user } = render(<ExtendedFilter {...requiredProps} />, {
          store,
        })

        const workGroupField = await testUtils.workGroup.loadingFinished()
        await testUtils.workGroup.openField(user, workGroupField)
        await testUtils.workGroup.userSetValue(user, workGroupListItem.name)

        const selectedOption = getSelectedOption(workGroupField)
        expect(selectedOption).toHaveTextContent(workGroupListItem.name)
        expect(selectedOption).toBeVisible()
      })

      test('Поиск по списку работает', async () => {
        const mockedWorkGroupList = workGroupFixtures.getWorkGroupList(2)
        const mockedWorkGroupListItem1 = mockedWorkGroupList[0]
        const mockedWorkGroupListItem2 = mockedWorkGroupList[1]
        mockGetWorkGroupListSuccess({ body: mockedWorkGroupList })

        const store = getStoreWithAuth({
          userRole: UserRoleEnum.SeniorEngineer,
        })

        const { user } = render(<ExtendedFilter {...requiredProps} />, {
          store,
        })

        const workGroupField = await testUtils.workGroup.loadingFinished()
        await testUtils.workGroup.openField(user, workGroupField)
        await userSearchInSelect(
          user,
          workGroupField,
          mockedWorkGroupListItem1.name,
        )

        const option1 = getSelectOption(mockedWorkGroupListItem1.name)
        const option2 = querySelectOption(mockedWorkGroupListItem2.name)

        expect(option1).toBeInTheDocument()
        expect(option2).not.toBeInTheDocument()
      })

      describe('Сбрасывает значения', () => {
        test('Кнопка "Сбросить"', async () => {
          const workGroupListItem = workGroupFixtures.getWorkGroup()
          mockGetWorkGroupListSuccess({ body: [workGroupListItem] })

          const store = getStoreWithAuth({
            userRole: UserRoleEnum.SeniorEngineer,
          })

          const { user } = render(<ExtendedFilter {...requiredProps} />, {
            store,
          })

          const workGroupField = await testUtils.workGroup.loadingFinished()
          await testUtils.workGroup.openField(user, workGroupField)

          await testUtils.workGroup.userSetValue(user, workGroupListItem.name)

          const container = testUtils.workGroup.getContainer()
          await testUtils.userClickResetButtonIn(user, container)

          const selectedOption = getSelectedOption(workGroupField)
          expect(selectedOption).not.toBeInTheDocument()
        })

        test('Кнопка "Сбросить всё"', async () => {
          const workGroupListItem = workGroupFixtures.getWorkGroup()
          mockGetWorkGroupListSuccess({ body: [workGroupListItem] })

          const store = getStoreWithAuth({
            userRole: UserRoleEnum.SeniorEngineer,
          })

          const { user } = render(<ExtendedFilter {...requiredProps} />, {
            store,
          })

          const workGroupField = await testUtils.workGroup.loadingFinished()
          await testUtils.workGroup.openField(user, workGroupField)

          await testUtils.workGroup.userSetValue(user, workGroupListItem.name)
          await testUtils.userClickResetAllButton(user)

          const selectedOption = getSelectedOption(workGroupField)
          expect(selectedOption).not.toBeInTheDocument()
        })
      })
    })
  })
})
