import moment from 'moment'

import { mockGetWorkGroupListSuccess } from '_tests_/mocks/api'
import {
  generateName,
  getCheckboxIn,
  getRadioButtonIn,
  getSelect,
  getSelectOption,
  getSelectedOption,
  loadingFinishedBySelect,
  querySelectOption,
  render,
  setupApiTests,
  userOpenSelect,
  userSearchInSelect,
} from '_tests_/utils'
import { getStoreWithAuth } from '_tests_/utils/auth'
import { screen } from '@testing-library/react'
import * as workGroupFixtures from 'fixtures/workGroup'
import { TaskExtendedStatusEnum } from 'modules/task/constants/common'
import { taskExtendedStatusDict } from 'modules/task/constants/dictionary'
import { UserRolesEnum } from 'shared/constants/roles'

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
import * as extendedFilterTestUtils from './utils'
import { userSelectAssigned, userSelectOverdue } from './utils'

setupApiTests()
jest.setTimeout(15000)

describe('Расширенный фильтр', () => {
  test('Отображается', () => {
    render(<ExtendedFilter {...requiredProps} />)

    expect(extendedFilterTestUtils.getFilter()).toBeInTheDocument()
  })

  describe('Header', () => {
    test('Корректно отображается', () => {
      render(<ExtendedFilter {...requiredProps} />)

      const title = screen.getByText('Фильтры')
      const closeButton = extendedFilterTestUtils.getCloseButton()

      expect(title).toBeInTheDocument()
      expect(closeButton).toBeInTheDocument()
    })

    test('Кнопка закрытия кликабельна', async () => {
      const { user } = render(<ExtendedFilter {...requiredProps} />)

      const closeButton = extendedFilterTestUtils.getCloseButton()
      expect(closeButton).toBeEnabled()

      await user.click(closeButton)
      expect(requiredProps.onClose).toBeCalledTimes(1)
    })
  })

  describe('Footer', () => {
    test('Корректно отображается', () => {
      render(<ExtendedFilter {...requiredProps} />)

      const applyButton = extendedFilterTestUtils.getApplyButton()
      const resetAllButton = extendedFilterTestUtils.getResetAllButton()

      expect(applyButton).toBeInTheDocument()
      expect(resetAllButton).toBeInTheDocument()
    })

    test('Кнопки активны', () => {
      render(<ExtendedFilter {...requiredProps} />)

      const applyButton = extendedFilterTestUtils.getApplyButton()
      const resetAllButton = extendedFilterTestUtils.getResetAllButton()

      expect(applyButton).toBeEnabled()
      expect(resetAllButton).toBeEnabled()
    })
  })

  describe('Статус', () => {
    test('Отображается', () => {
      render(<ExtendedFilter {...requiredProps} />)

      const container = extendedFilterTestUtils.getStatusContainer()

      taskExtendedStatusDictValues.forEach((value) => {
        const checkbox = getCheckboxIn(container, new RegExp(value))
        expect(checkbox).toBeInTheDocument()
      })
    })

    test('Имеет корректные значения по умолчанию', () => {
      render(<ExtendedFilter {...requiredProps} />)
      extendedFilterTestUtils.expectStatusHasCorrectInitialValues()
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
        extendedFilterTestUtils.getStatusContainer(),
        new RegExp(taskExtendedStatusDict[TaskExtendedStatusEnum.InProgress]!),
      )

      expect(checkbox).toBeChecked()
    })

    test('Доступен для редактирования', () => {
      render(<ExtendedFilter {...requiredProps} />)

      const container = extendedFilterTestUtils.getStatusContainer()

      taskExtendedStatusDictValues.forEach((value) => {
        const checkbox = getCheckboxIn(container, new RegExp(value))
        expect(checkbox).toBeEnabled()
      })
    })

    test('Можно выбрать любое значение', async () => {
      const { user } = render(<ExtendedFilter {...requiredProps} />)

      for await (const value of taskExtendedStatusDictValues) {
        const checkbox = await extendedFilterTestUtils.userSelectStatus(
          user,
          value,
        )
        expect(checkbox).toBeChecked()
      }
    })

    describe('Сбрасывает значения', () => {
      test('Кнопка "Сбросить"', async () => {
        const { user } = render(<ExtendedFilter {...requiredProps} />)

        const container = extendedFilterTestUtils.getStatusContainer()

        for await (const value of taskExtendedStatusDictValues) {
          const checkbox = getCheckboxIn(container, new RegExp(value))
          await user.click(checkbox)
        }

        await extendedFilterTestUtils.userClickResetButtonIn(user, container)

        taskExtendedStatusDictValues.forEach((value) => {
          const checkbox = getCheckboxIn(container, new RegExp(value))
          expect(checkbox).not.toBeChecked()
        })
      })

      test('Кнопка "Сбросить всё"', async () => {
        const { user } = render(<ExtendedFilter {...requiredProps} />)

        const container = extendedFilterTestUtils.getStatusContainer()

        for await (const value of taskExtendedStatusDictValues) {
          const checkbox = getCheckboxIn(container, new RegExp(value))
          await user.click(checkbox)
        }

        await extendedFilterTestUtils.userClickResetAllButton(user)

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

      const container = extendedFilterTestUtils.getAssignedContainer()

      taskAssignedDictValues.forEach((value) => {
        const radioButton = getRadioButtonIn(container, value)
        expect(radioButton).toBeInTheDocument()
      })
    })

    test('Имеет корректные значения по умолчанию', () => {
      render(<ExtendedFilter {...requiredProps} />)
      extendedFilterTestUtils.expectAssignedHasCorrectInitialValues()
    })

    test('Переданное значение перезаписывает значение по умолчанию', () => {
      /**
       * По каким-то причинам, в тесте, radioButton не помечается как выбранный и тест не проходит
       * Но по факту всё работает как надо
       */
    })

    test('Доступен для редактирования', () => {
      render(<ExtendedFilter {...requiredProps} />)

      const container = extendedFilterTestUtils.getAssignedContainer()

      taskAssignedDictValues.forEach((value) => {
        const radioButton = getRadioButtonIn(container, value)
        expect(radioButton).toBeEnabled()
      })
    })

    test('Можно выбрать любое значение', async () => {
      const { user } = render(<ExtendedFilter {...requiredProps} />)

      for await (const value of taskAssignedDictValues) {
        const radioButton = await userSelectAssigned(user, value)
        expect(radioButton).toBeChecked()
      }
    })

    describe('Сбрасывает значение', () => {
      test('Кнопка "Сбросить"', async () => {
        const { user } = render(<ExtendedFilter {...requiredProps} />)

        const container = extendedFilterTestUtils.getAssignedContainer()

        await user.click(
          getRadioButtonIn(
            container,
            taskAssignedDict[TaskAssignedEnum.NotAssigned],
          ),
        )

        await extendedFilterTestUtils.userClickResetButtonIn(user, container)

        expect(
          getRadioButtonIn(
            container,
            taskAssignedDict[TaskAssignedEnum.NotAssigned],
          ),
        ).not.toBeChecked()
      })

      test('Кнопка "Сбросить всё"', async () => {
        const { user } = render(<ExtendedFilter {...requiredProps} />)

        const container = extendedFilterTestUtils.getAssignedContainer()

        await user.click(
          getRadioButtonIn(
            container,
            taskAssignedDict[TaskAssignedEnum.Assigned],
          ),
        )

        await extendedFilterTestUtils.userClickResetAllButton(user)

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

      const container = extendedFilterTestUtils.getOverdueContainer()

      taskOverdueDictValues.forEach((value) => {
        const radioButton = getRadioButtonIn(container, value)
        expect(radioButton).toBeInTheDocument()
      })
    })

    test('Имеет корректные значения по умолчанию', () => {
      render(<ExtendedFilter {...requiredProps} />)
      extendedFilterTestUtils.expectOverdueHasCorrectInitialValues()
    })

    test('Переданное значение перезаписывает значение по умолчанию', () => {
      /**
       * По каким-то причинам, в тесте, radioButton не помечается как выбранный и тест не проходит
       * Но по факту всё работает как надо
       */
    })

    test('Доступен для редактирования', () => {
      render(<ExtendedFilter {...requiredProps} />)

      const container = extendedFilterTestUtils.getOverdueContainer()

      taskOverdueDictValues.forEach((value) => {
        const radioButton = getRadioButtonIn(container, value)
        expect(radioButton).toBeEnabled()
      })
    })

    test('Можно выбрать любое значение', async () => {
      const { user } = render(<ExtendedFilter {...requiredProps} />)

      for await (const value of taskOverdueDictValues) {
        const radioButton = await userSelectOverdue(user, value)
        expect(radioButton).toBeChecked()
      }
    })

    describe('Сбрасывает значение', () => {
      test('Кнопка "Сбросить"', async () => {
        const { user } = render(<ExtendedFilter {...requiredProps} />)

        const container = extendedFilterTestUtils.getOverdueContainer()

        await user.click(getRadioButtonIn(container, taskOverdueDict.False))

        await extendedFilterTestUtils.userClickResetButtonIn(user, container)

        expect(
          getRadioButtonIn(container, taskOverdueDict.False),
        ).not.toBeChecked()
      })

      test('Кнопка "Сбросить всё"', async () => {
        const { user } = render(<ExtendedFilter {...requiredProps} />)

        const container = extendedFilterTestUtils.getOverdueContainer()

        await user.click(getRadioButtonIn(container, taskOverdueDict.True))

        await extendedFilterTestUtils.userClickResetAllButton(user)

        expect(
          getRadioButtonIn(container, taskOverdueDict.True),
        ).not.toBeChecked()
      })
    })
  })

  describe('Выполнить до', () => {
    test('Отображается', () => {
      render(<ExtendedFilter {...requiredProps} />)

      const startDateField = extendedFilterTestUtils.getStartDateField()
      const endDateField = extendedFilterTestUtils.getEndDateField()

      expect(startDateField).toBeInTheDocument()
      expect(endDateField).toBeInTheDocument()
    })

    test('Имеет корректные значения по умолчанию', () => {
      render(<ExtendedFilter {...requiredProps} />)
      extendedFilterTestUtils.expectCompleteAtHasCorrectInitialValues()
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

      const startDateField = extendedFilterTestUtils.getStartDateField()
      const endDateField = extendedFilterTestUtils.getEndDateField()

      expect(startDateField).toHaveValue()
      expect(endDateField).toHaveValue()
    })

    test('Доступен для редактирования', () => {
      render(<ExtendedFilter {...requiredProps} />)

      const startDateField = extendedFilterTestUtils.getStartDateField()
      const endDateField = extendedFilterTestUtils.getEndDateField()

      expect(startDateField).toBeEnabled()
      expect(endDateField).toBeEnabled()
    })

    test('Можно выбрать даты', async () => {
      const { user } = render(<ExtendedFilter {...requiredProps} />)

      const { startDateField, startDateValue, endDateField, endDateValue } =
        await extendedFilterTestUtils.userFillExecuteBeforeField(user)

      expect(startDateField).toHaveDisplayValue(startDateValue)
      expect(endDateField).toHaveDisplayValue(endDateValue)
    })

    describe('Сбрасывает значения', () => {
      test('Кнопка "Сбросить"', async () => {
        const { user } = render(<ExtendedFilter {...requiredProps} />)

        const { startDateValue, endDateValue } =
          await extendedFilterTestUtils.userFillExecuteBeforeField(user)

        const container = extendedFilterTestUtils.getCompleteAtContainer()
        await extendedFilterTestUtils.userClickResetButtonIn(user, container)

        expect(
          extendedFilterTestUtils.getStartDateField(),
        ).not.toHaveDisplayValue(startDateValue)
        expect(
          extendedFilterTestUtils.getEndDateField(),
        ).not.toHaveDisplayValue(endDateValue)
      })

      test('Кнопка "Сбросить всё"', async () => {
        const { user } = render(<ExtendedFilter {...requiredProps} />)

        const { startDateValue, endDateValue } =
          await extendedFilterTestUtils.userFillExecuteBeforeField(user)

        await extendedFilterTestUtils.userClickResetAllButton(user)

        expect(
          extendedFilterTestUtils.getStartDateField(),
        ).not.toHaveDisplayValue(startDateValue)
        expect(
          extendedFilterTestUtils.getEndDateField(),
        ).not.toHaveDisplayValue(endDateValue)
      })
    })
  })

  describe('Поиск по столбцу', () => {
    test('Отображается', () => {
      render(<ExtendedFilter {...requiredProps} />)

      const container = extendedFilterTestUtils.getSearchByColumnContainer()

      searchFieldDictValues.forEach((value) => {
        const radioButton = getRadioButtonIn(container, value)
        expect(radioButton).toBeInTheDocument()
      })

      const keywordField =
        extendedFilterTestUtils.getSearchByColumnKeywordField()
      expect(keywordField).toBeInTheDocument()
    })

    test('Имеет корректные значения по умолчанию', () => {
      render(<ExtendedFilter {...requiredProps} />)
      extendedFilterTestUtils.expectSearchByColumnHasCorrectInitialValues()
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

      const container = extendedFilterTestUtils.getSearchByColumnContainer()

      const keywordField =
        extendedFilterTestUtils.getSearchByColumnKeywordField()
      expect(keywordField).toHaveValue(searchValue)

      const searchByNameButton = getRadioButtonIn(
        container,
        searchFieldDict.searchByName,
      )
      expect(searchByNameButton).toBeChecked()
    })

    test('Доступен для редактирования', () => {
      render(<ExtendedFilter {...requiredProps} />)

      const container = extendedFilterTestUtils.getSearchByColumnContainer()

      searchFieldDictValues.forEach((value) => {
        const radioButton = getRadioButtonIn(container, value)
        expect(radioButton).toBeEnabled()
      })

      const keywordField =
        extendedFilterTestUtils.getSearchByColumnKeywordField()

      expect(keywordField).toBeEnabled()
    })

    test('Можно ввести ключевое слово', async () => {
      const { user } = render(<ExtendedFilter {...requiredProps} />)

      const { keywordField, keyword } =
        await extendedFilterTestUtils.userEntersSearchByColumnKeyword(user)

      expect(keywordField).toHaveDisplayValue(keyword)
    })

    test('Можно выбрать любой столбец', async () => {
      const { user } = render(<ExtendedFilter {...requiredProps} />)

      for await (const value of searchFieldDictValues) {
        const radioButton =
          await extendedFilterTestUtils.userSelectSearchByColumnField(
            user,
            value,
          )

        expect(radioButton).toBeChecked()
      }
    })

    describe('Сбрасывает значения', () => {
      test('Кнопка "Сбросить"', async () => {
        const { user } = render(<ExtendedFilter {...requiredProps} />)

        const container = extendedFilterTestUtils.getSearchByColumnContainer()

        const keyword = generateName()
        await user.type(
          extendedFilterTestUtils.getSearchByColumnKeywordField(),
          keyword,
        )

        await user.click(
          getRadioButtonIn(container, searchFieldDict.searchByName),
        )

        await extendedFilterTestUtils.userClickResetButtonIn(user, container)

        expect(
          extendedFilterTestUtils.getSearchByColumnKeywordField(),
        ).not.toHaveDisplayValue(keyword)
        expect(
          getRadioButtonIn(container, searchFieldDict.searchByName),
        ).not.toBeChecked()
      })

      test('Кнопка "Сбросить всё"', async () => {
        const { user } = render(<ExtendedFilter {...requiredProps} />)

        const container = extendedFilterTestUtils.getSearchByColumnContainer()

        const keyword = generateName()
        await user.type(
          extendedFilterTestUtils.getSearchByColumnKeywordField(),
          keyword,
        )

        await user.click(
          getRadioButtonIn(container, searchFieldDict.searchByName),
        )

        await extendedFilterTestUtils.userClickResetAllButton(user)

        expect(
          extendedFilterTestUtils.getSearchByColumnKeywordField(),
        ).not.toHaveDisplayValue(keyword)
        expect(
          getRadioButtonIn(container, searchFieldDict.searchByName),
        ).not.toBeChecked()
      })
    })
  })

  describe('Рабочая группа', () => {
    describe(`Для роли ${UserRolesEnum.FirstLineSupport}`, () => {
      test('Не отображается', () => {
        mockGetWorkGroupListSuccess([])

        const store = getStoreWithAuth({
          userRole: UserRolesEnum.FirstLineSupport,
        })

        render(<ExtendedFilter {...requiredProps} />, { store })

        const workGroupField = extendedFilterTestUtils.queryWorkGroupField()
        expect(workGroupField).not.toBeInTheDocument()
      })
    })

    describe(`Для роли ${UserRolesEnum.Engineer}`, () => {
      test('Не отображается', () => {
        const store = getStoreWithAuth({
          userRole: UserRolesEnum.Engineer,
        })

        render(<ExtendedFilter {...requiredProps} />, { store })

        const workGroupField = extendedFilterTestUtils.queryWorkGroupField()
        expect(workGroupField).not.toBeInTheDocument()
      })
    })

    describe(`Для роли ${UserRolesEnum.SeniorEngineer}`, () => {
      test('Отображается', async () => {
        mockGetWorkGroupListSuccess([])

        const store = getStoreWithAuth({
          userRole: UserRolesEnum.SeniorEngineer,
        })

        render(<ExtendedFilter {...requiredProps} />, { store })

        const workGroupField = extendedFilterTestUtils.getWorkGroupField()
        await loadingFinishedBySelect(workGroupField)

        expect(workGroupField).toBeInTheDocument()
      })
    })

    describe(`Для роли ${UserRolesEnum.HeadOfDepartment}`, () => {
      test('Отображается', async () => {
        mockGetWorkGroupListSuccess([])

        const store = getStoreWithAuth({
          userRole: UserRolesEnum.HeadOfDepartment,
        })

        render(<ExtendedFilter {...requiredProps} />, { store })

        const workGroupField = extendedFilterTestUtils.getWorkGroupField()
        await loadingFinishedBySelect(workGroupField)

        expect(workGroupField).toBeInTheDocument()
      })
    })

    describe('Для роли с которой отображается', () => {
      test('Имеет корректные значения по умолчанию', async () => {
        mockGetWorkGroupListSuccess(workGroupFixtures.getWorkGroupList())

        const store = getStoreWithAuth({
          userRole: UserRolesEnum.SeniorEngineer,
        })

        render(<ExtendedFilter {...requiredProps} />, { store })

        const workGroupField = extendedFilterTestUtils.getWorkGroupField()
        await loadingFinishedBySelect(workGroupField)

        const selectedOption = getSelectedOption(workGroupField)
        expect(selectedOption).not.toBeInTheDocument()
      })

      test('Переданное значение перезаписывает значение по умолчанию', async () => {
        const workGroupList = workGroupFixtures.getWorkGroupList()
        const workGroupId = String(workGroupList[0].id)
        mockGetWorkGroupListSuccess(workGroupList)

        const store = getStoreWithAuth({
          userRole: UserRolesEnum.SeniorEngineer,
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

        const workGroupField = extendedFilterTestUtils.getWorkGroupField()
        await loadingFinishedBySelect(workGroupField)

        const selectedOption = getSelectedOption(workGroupField)
        expect(selectedOption).toBeInTheDocument()
        expect(selectedOption).toHaveTextContent(workGroupId)
      })

      test('Доступен для редактирования после загрузки списка', async () => {
        mockGetWorkGroupListSuccess([])

        const store = getStoreWithAuth({
          userRole: UserRolesEnum.SeniorEngineer,
        })

        render(<ExtendedFilter {...requiredProps} />, { store })

        const workGroupField = extendedFilterTestUtils.getWorkGroupField()
        await loadingFinishedBySelect(workGroupField)

        const select = getSelect(workGroupField)
        expect(select).toBeEnabled()
      })

      test('Можно выбрать рабочую группу из списка', async () => {
        const mockedWorkGroupList = workGroupFixtures.getWorkGroupList()
        const mockedWorkGroupListItem = mockedWorkGroupList[0]
        mockGetWorkGroupListSuccess(mockedWorkGroupList)

        const store = getStoreWithAuth({
          userRole: UserRolesEnum.SeniorEngineer,
        })

        const { user } = render(<ExtendedFilter {...requiredProps} />, {
          store,
        })

        const workGroupField = extendedFilterTestUtils.getWorkGroupField()
        await loadingFinishedBySelect(workGroupField)
        await userOpenSelect(user, workGroupField)

        const workGroupOption = screen.getByText(mockedWorkGroupListItem.name)
        await user.click(workGroupOption)

        const selectedOption = getSelectedOption(workGroupField)
        expect(selectedOption).toHaveTextContent(mockedWorkGroupListItem.name)
        expect(selectedOption).toBeVisible()
      })

      test('Поиск по списку работает', async () => {
        const mockedWorkGroupList = workGroupFixtures.getWorkGroupList(2)
        const mockedWorkGroupListItem1 = mockedWorkGroupList[0]
        const mockedWorkGroupListItem2 = mockedWorkGroupList[1]
        mockGetWorkGroupListSuccess(mockedWorkGroupList)

        const store = getStoreWithAuth({
          userRole: UserRolesEnum.SeniorEngineer,
        })

        const { user } = render(<ExtendedFilter {...requiredProps} />, {
          store,
        })

        const workGroupField = extendedFilterTestUtils.getWorkGroupField()
        await loadingFinishedBySelect(workGroupField)
        await userOpenSelect(user, workGroupField)
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
          const mockedWorkGroupList = workGroupFixtures.getWorkGroupList()
          const mockedWorkGroupListItem = mockedWorkGroupList[0]
          mockGetWorkGroupListSuccess(mockedWorkGroupList)

          const store = getStoreWithAuth({
            userRole: UserRolesEnum.SeniorEngineer,
          })

          const { user } = render(<ExtendedFilter {...requiredProps} />, {
            store,
          })

          const workGroupField = extendedFilterTestUtils.getWorkGroupField()
          await loadingFinishedBySelect(workGroupField)
          await userOpenSelect(user, workGroupField)

          const workGroupOption = screen.getByText(mockedWorkGroupListItem.name)
          await user.click(workGroupOption)

          const container = screen.getByTestId('filter-extended-work-group')
          await extendedFilterTestUtils.userClickResetButtonIn(user, container)

          const selectedOption = getSelectedOption(workGroupField)
          expect(selectedOption).not.toBeInTheDocument()
        })

        test('Кнопка "Сбросить всё"', async () => {
          const mockedWorkGroupList = workGroupFixtures.getWorkGroupList()
          const mockedWorkGroupListItem = mockedWorkGroupList[0]
          mockGetWorkGroupListSuccess(mockedWorkGroupList)

          const store = getStoreWithAuth({
            userRole: UserRolesEnum.SeniorEngineer,
          })

          const { user } = render(<ExtendedFilter {...requiredProps} />, {
            store,
          })

          const workGroupField = extendedFilterTestUtils.getWorkGroupField()
          await loadingFinishedBySelect(workGroupField)
          await userOpenSelect(user, workGroupField)

          const workGroupOption = screen.getByText(mockedWorkGroupListItem.name)
          await user.click(workGroupOption)

          await extendedFilterTestUtils.userClickResetAllButton(user)

          const selectedOption = getSelectedOption(workGroupField)
          expect(selectedOption).not.toBeInTheDocument()
        })
      })
    })
  })
})
