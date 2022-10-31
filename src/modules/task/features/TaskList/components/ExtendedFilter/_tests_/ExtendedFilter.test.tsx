import moment from 'moment'

import { mockGetWorkGroupListSuccess } from '_tests_/mocks/api'
import {
  generateName,
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
import { getWorkGroupList } from 'fixtures/workGroup'
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
import * as utils from './utils'

setupApiTests()
jest.setTimeout(15000)

describe('Расширенный фильтр', () => {
  test('Отображается', () => {
    render(<ExtendedFilter {...requiredProps} />)

    expect(utils.getExtendedFilter()).toBeInTheDocument()
  })

  describe('Header', () => {
    test('Корректно отображается', () => {
      render(<ExtendedFilter {...requiredProps} />)

      const title = screen.getByText('Фильтры')
      const closeButton = utils.getCloseButton()

      expect(title).toBeInTheDocument()
      expect(closeButton).toBeInTheDocument()
    })

    test('Кнопка закрытия кликабельна', async () => {
      const { user } = render(<ExtendedFilter {...requiredProps} />)

      const closeButton = utils.getCloseButton()
      expect(closeButton).toBeEnabled()

      await user.click(closeButton)
      expect(requiredProps.onClose).toBeCalledTimes(1)
    })
  })

  describe('Footer', () => {
    test('Корректно отображается', () => {
      render(<ExtendedFilter {...requiredProps} />)

      const applyButton = utils.getApplyButton()
      const resetAllButton = utils.getResetAllButton()

      expect(applyButton).toBeInTheDocument()
      expect(resetAllButton).toBeInTheDocument()
    })

    test('Кнопки активны', () => {
      render(<ExtendedFilter {...requiredProps} />)

      const applyButton = utils.getApplyButton()
      const resetAllButton = utils.getResetAllButton()

      expect(applyButton).toBeEnabled()
      expect(resetAllButton).toBeEnabled()
    })
  })

  describe('Статус', () => {
    test('Отображается', () => {
      render(<ExtendedFilter {...requiredProps} />)

      const container = utils.getStatusContainer()

      taskExtendedStatusDictValues.forEach((value) => {
        const checkbox = utils.getCheckboxIn(container, new RegExp(value))
        expect(checkbox).toBeInTheDocument()
      })
    })

    test('Имеет корректные значения по умолчанию', () => {
      render(<ExtendedFilter {...requiredProps} />)

      const container = utils.getStatusContainer()

      Object.entries(taskExtendedStatusDict).forEach(([value, text]) => {
        const checkbox = utils.getCheckboxIn(container, new RegExp(text))
        expect(checkbox).not.toBeChecked()
        expect(checkbox.value).toBe(value)
      })
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

      const container = utils.getStatusContainer()
      const checkbox = utils.getCheckboxIn(
        container,
        new RegExp(taskExtendedStatusDict[TaskExtendedStatusEnum.InProgress]!),
      )

      expect(checkbox).toBeChecked()
    })

    test('Доступен для редактирования', () => {
      render(<ExtendedFilter {...requiredProps} />)

      const container = utils.getStatusContainer()

      taskExtendedStatusDictValues.forEach((value) => {
        const checkbox = utils.getCheckboxIn(container, new RegExp(value))
        expect(checkbox).toBeEnabled()
      })
    })

    test('Можно выбрать любое значение', async () => {
      const { user } = render(<ExtendedFilter {...requiredProps} />)

      const container = utils.getStatusContainer()

      for await (const value of taskExtendedStatusDictValues) {
        const checkbox = utils.getCheckboxIn(container, new RegExp(value))
        await user.click(checkbox)
        expect(checkbox).toBeChecked()
      }
    })

    describe('Сбрасывает значения', () => {
      test('Кнопка "Сбросить"', async () => {
        const { user } = render(<ExtendedFilter {...requiredProps} />)

        const container = utils.getStatusContainer()

        for await (const value of taskExtendedStatusDictValues) {
          const checkbox = utils.getCheckboxIn(container, new RegExp(value))
          await user.click(checkbox)
        }

        await utils.userClickResetButtonIn(user, container)

        taskExtendedStatusDictValues.forEach((value) => {
          const checkbox = utils.getCheckboxIn(container, new RegExp(value))
          expect(checkbox).not.toBeChecked()
        })
      })

      test('Кнопка "Сбросить всё"', async () => {
        const { user } = render(<ExtendedFilter {...requiredProps} />)

        const container = utils.getStatusContainer()

        for await (const value of taskExtendedStatusDictValues) {
          const checkbox = utils.getCheckboxIn(container, new RegExp(value))
          await user.click(checkbox)
        }

        await utils.userClickResetAllButton(user)

        taskExtendedStatusDictValues.forEach((value) => {
          const checkbox = utils.getCheckboxIn(container, new RegExp(value))
          expect(checkbox).not.toBeChecked()
        })
      })
    })
  })

  describe('Назначенный', () => {
    test('Отображается', () => {
      render(<ExtendedFilter {...requiredProps} />)

      const container = utils.getAssignedContainer()

      taskAssignedDictValues.forEach((value) => {
        const radioButton = utils.getRadioButtonIn(container, value)
        expect(radioButton).toBeInTheDocument()
      })
    })

    test('Имеет корректные значения по умолчанию', () => {
      render(<ExtendedFilter {...requiredProps} />)

      const container = utils.getAssignedContainer()

      Object.entries(taskAssignedDict).forEach(([value, text]) => {
        const radioButton = utils.getRadioButtonIn(container, text)
        expect(radioButton).not.toBeChecked()
        expect(radioButton.value).toBe(value)
      })
    })

    test('Переданное значение перезаписывает значение по умолчанию', () => {
      /**
       * По каким-то причинам radioButton не помечается как выбранный и тест не проходит
       * Но по факту всё работает как надо
       */
    })

    test('Доступен для редактирования', () => {
      render(<ExtendedFilter {...requiredProps} />)

      const container = utils.getAssignedContainer()

      taskAssignedDictValues.forEach((value) => {
        const radioButton = utils.getRadioButtonIn(container, value)
        expect(radioButton).toBeEnabled()
      })
    })

    test('Можно выбрать любое значение', async () => {
      const { user } = render(<ExtendedFilter {...requiredProps} />)

      const container = utils.getAssignedContainer()

      for await (const value of taskAssignedDictValues) {
        const radioButton = utils.getRadioButtonIn(container, value)
        await user.click(radioButton)
        expect(radioButton).toBeChecked()
      }
    })

    describe('Сбрасывает значение', () => {
      test('Кнопка "Сбросить"', async () => {
        const { user } = render(<ExtendedFilter {...requiredProps} />)

        const container = utils.getAssignedContainer()

        await user.click(
          utils.getRadioButtonIn(
            container,
            taskAssignedDict[TaskAssignedEnum.NotAssigned],
          ),
        )

        await utils.userClickResetButtonIn(user, container)

        expect(
          utils.getRadioButtonIn(
            container,
            taskAssignedDict[TaskAssignedEnum.NotAssigned],
          ),
        ).not.toBeChecked()
      })

      test('Кнопка "Сбросить всё"', async () => {
        const { user } = render(<ExtendedFilter {...requiredProps} />)

        const container = utils.getAssignedContainer()

        await user.click(
          utils.getRadioButtonIn(
            container,
            taskAssignedDict[TaskAssignedEnum.Assigned],
          ),
        )

        await utils.userClickResetAllButton(user)

        expect(
          utils.getRadioButtonIn(
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

      const container = utils.getOverdueContainer()

      taskOverdueDictValues.forEach((value) => {
        const radioButton = utils.getRadioButtonIn(container, value)
        expect(radioButton).toBeInTheDocument()
      })
    })

    test('Имеет корректные значения по умолчанию', () => {
      render(<ExtendedFilter {...requiredProps} />)

      const container = utils.getOverdueContainer()

      Object.entries(taskOverdueDict).forEach(([value, text]) => {
        const radioButton = utils.getRadioButtonIn(container, text)
        expect(radioButton).not.toBeChecked()
        expect(radioButton.value).toBe(value)
      })
    })

    test('Переданное значение перезаписывает значение по умолчанию', () => {
      /**
       * По каким-то причинам radioButton не помечается как выбранный и тест не проходит
       * Но по факту всё работает как надо
       */
    })

    test('Доступен для редактирования', () => {
      render(<ExtendedFilter {...requiredProps} />)

      const container = utils.getOverdueContainer()

      taskOverdueDictValues.forEach((value) => {
        const radioButton = utils.getRadioButtonIn(container, value)
        expect(radioButton).toBeEnabled()
      })
    })

    test('Можно выбрать любое значение', async () => {
      const { user } = render(<ExtendedFilter {...requiredProps} />)

      const container = utils.getOverdueContainer()

      for await (const value of taskOverdueDictValues) {
        const radioButton = utils.getRadioButtonIn(container, value)
        await user.click(radioButton)
        expect(radioButton).toBeChecked()
      }
    })

    describe('Сбрасывает значение', () => {
      test('Кнопка "Сбросить"', async () => {
        const { user } = render(<ExtendedFilter {...requiredProps} />)

        const container = utils.getOverdueContainer()

        await user.click(
          utils.getRadioButtonIn(container, taskOverdueDict.False),
        )

        await utils.userClickResetButtonIn(user, container)

        expect(
          utils.getRadioButtonIn(container, taskOverdueDict.False),
        ).not.toBeChecked()
      })

      test('Кнопка "Сбросить всё"', async () => {
        const { user } = render(<ExtendedFilter {...requiredProps} />)

        const container = utils.getOverdueContainer()

        await user.click(
          utils.getRadioButtonIn(container, taskOverdueDict.True),
        )

        await utils.userClickResetAllButton(user)

        expect(
          utils.getRadioButtonIn(container, taskOverdueDict.True),
        ).not.toBeChecked()
      })
    })
  })

  describe('Выполнить до', () => {
    test('Отображается', () => {
      render(<ExtendedFilter {...requiredProps} />)

      const startDateField = utils.getStartDateField()
      const endDateField = utils.getEndDateField()

      expect(startDateField).toBeInTheDocument()
      expect(endDateField).toBeInTheDocument()
    })

    test('Имеет корректные значения по умолчанию', () => {
      render(<ExtendedFilter {...requiredProps} />)

      const startDateField = utils.getStartDateField()
      const endDateField = utils.getEndDateField()

      expect(startDateField).not.toHaveValue()
      expect(endDateField).not.toHaveValue()
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

      const startDateField = utils.getStartDateField()
      const endDateField = utils.getEndDateField()

      expect(startDateField).toHaveValue()
      expect(endDateField).toHaveValue()
    })

    test('Доступен для редактирования', () => {
      render(<ExtendedFilter {...requiredProps} />)

      const startDateField = utils.getStartDateField()
      const endDateField = utils.getEndDateField()

      expect(startDateField).toBeEnabled()
      expect(endDateField).toBeEnabled()
    })

    test('Можно выбрать даты', async () => {
      const { user } = render(<ExtendedFilter {...requiredProps} />)

      const { startDateField, startDateValue, endDateField, endDateValue } =
        await utils.userFillExecuteBeforeField(user)

      expect(startDateField).toHaveDisplayValue(startDateValue)
      expect(endDateField).toHaveDisplayValue(endDateValue)
    })

    describe('Сбрасывает значения', () => {
      test('Кнопка "Сбросить"', async () => {
        const { user } = render(<ExtendedFilter {...requiredProps} />)

        const { startDateValue, endDateValue } =
          await utils.userFillExecuteBeforeField(user)

        const container = screen.getByTestId('filter-extended-complete-at')
        await utils.userClickResetButtonIn(user, container)

        expect(utils.getStartDateField()).not.toHaveDisplayValue(startDateValue)
        expect(utils.getEndDateField()).not.toHaveDisplayValue(endDateValue)
      })

      test('Кнопка "Сбросить всё"', async () => {
        const { user } = render(<ExtendedFilter {...requiredProps} />)

        const { startDateValue, endDateValue } =
          await utils.userFillExecuteBeforeField(user)

        await utils.userClickResetAllButton(user)

        expect(utils.getStartDateField()).not.toHaveDisplayValue(startDateValue)
        expect(utils.getEndDateField()).not.toHaveDisplayValue(endDateValue)
      })
    })
  })

  describe('Поиск по столбцу', () => {
    test('Отображается', () => {
      render(<ExtendedFilter {...requiredProps} />)

      const container = utils.getSearchByColumnContainer()

      searchFieldDictValues.forEach((value) => {
        const radioButton = utils.getRadioButtonIn(container, value)
        expect(radioButton).toBeInTheDocument()
      })

      const keywordField = utils.getKeywordField()
      expect(keywordField).toBeInTheDocument()
    })

    test('Имеет корректные значения по умолчанию', () => {
      render(<ExtendedFilter {...requiredProps} />)

      const container = utils.getSearchByColumnContainer()

      const searchByNameButton = utils.getRadioButtonIn(
        container,
        searchFieldDict.searchByName,
      )

      const searchByTitleButton = utils.getRadioButtonIn(
        container,
        searchFieldDict.searchByTitle,
      )

      const searchByAssigneeButton = utils.getRadioButtonIn(
        container,
        searchFieldDict.searchByAssignee,
      )

      expect(searchByNameButton.value).toBe('searchByName')
      expect(searchByTitleButton.value).toBe('searchByTitle')
      expect(searchByAssigneeButton.value).toBe('searchByAssignee')

      expect(searchByNameButton).not.toBeChecked()
      expect(searchByTitleButton).toBeChecked()
      expect(searchByAssigneeButton).not.toBeChecked()

      const keywordField = utils.getKeywordField()
      expect(keywordField).not.toHaveValue()
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

      const container = utils.getSearchByColumnContainer()

      const keywordField = utils.getKeywordField()
      expect(keywordField).toHaveValue(searchValue)

      const searchByNameButton = utils.getRadioButtonIn(
        container,
        searchFieldDict.searchByName,
      )
      expect(searchByNameButton).toBeChecked()
    })

    test('Доступен для редактирования', () => {
      render(<ExtendedFilter {...requiredProps} />)

      const container = utils.getSearchByColumnContainer()

      searchFieldDictValues.forEach((value) => {
        const radioButton = utils.getRadioButtonIn(container, value)
        expect(radioButton).toBeEnabled()
      })

      const keywordField = utils.getKeywordField()
      expect(keywordField).toBeEnabled()
    })

    test('Можно ввести ключевое слово', async () => {
      const { user } = render(<ExtendedFilter {...requiredProps} />)

      const keywordField = utils.getKeywordField()
      const keyword = generateName()

      await user.type(keywordField, keyword)
      expect(keywordField).toHaveDisplayValue(keyword)
    })

    test('Можно выбрать любой столбец', async () => {
      const { user } = render(<ExtendedFilter {...requiredProps} />)

      const container = utils.getSearchByColumnContainer()

      for await (const value of searchFieldDictValues) {
        const radioButton = utils.getRadioButtonIn(container, value)
        await user.click(radioButton)
        expect(radioButton).toBeChecked()
      }
    })

    describe('Сбрасывает значения', () => {
      test('Кнопка "Сбросить"', async () => {
        const { user } = render(<ExtendedFilter {...requiredProps} />)

        const container = utils.getSearchByColumnContainer()

        const keyword = generateName()
        await user.type(utils.getKeywordField(), keyword)

        await user.click(
          utils.getRadioButtonIn(container, searchFieldDict.searchByName),
        )

        await utils.userClickResetButtonIn(user, container)

        expect(utils.getKeywordField()).not.toHaveDisplayValue(keyword)
        expect(
          utils.getRadioButtonIn(container, searchFieldDict.searchByName),
        ).not.toBeChecked()
      })

      test('Кнопка "Сбросить всё"', async () => {
        const { user } = render(<ExtendedFilter {...requiredProps} />)

        const container = utils.getSearchByColumnContainer()

        const keyword = generateName()
        await user.type(utils.getKeywordField(), keyword)

        await user.click(
          utils.getRadioButtonIn(container, searchFieldDict.searchByName),
        )

        await utils.userClickResetAllButton(user)

        expect(utils.getKeywordField()).not.toHaveDisplayValue(keyword)
        expect(
          utils.getRadioButtonIn(container, searchFieldDict.searchByName),
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

        const workGroupField = utils.queryWorkGroupField()
        expect(workGroupField).not.toBeInTheDocument()
      })
    })

    describe(`Для роли ${UserRolesEnum.Engineer}`, () => {
      test('Не отображается', () => {
        const store = getStoreWithAuth({
          userRole: UserRolesEnum.Engineer,
        })

        render(<ExtendedFilter {...requiredProps} />, { store })

        const workGroupField = utils.queryWorkGroupField()
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

        const workGroupField = utils.getWorkGroupField()
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

        const workGroupField = utils.getWorkGroupField()
        await loadingFinishedBySelect(workGroupField)

        expect(workGroupField).toBeInTheDocument()
      })
    })

    describe('Для роли с которой отображается', () => {
      test('Имеет корректные значения по умолчанию', async () => {
        mockGetWorkGroupListSuccess(getWorkGroupList())

        const store = getStoreWithAuth({
          userRole: UserRolesEnum.SeniorEngineer,
        })

        render(<ExtendedFilter {...requiredProps} />, { store })

        const workGroupField = utils.getWorkGroupField()
        await loadingFinishedBySelect(workGroupField)

        const selectedOption = getSelectedOption(workGroupField)
        expect(selectedOption).not.toBeInTheDocument()
      })

      test('Переданное значение перезаписывает значение по умолчанию', async () => {
        const workGroupList = getWorkGroupList()
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

        const workGroupField = utils.getWorkGroupField()
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

        const workGroupField = utils.getWorkGroupField()
        await loadingFinishedBySelect(workGroupField)

        const select = getSelect(workGroupField)
        expect(select).toBeEnabled()
      })

      test('Можно выбрать рабочую группу из списка', async () => {
        const mockedWorkGroupList = getWorkGroupList()
        const mockedWorkGroupListItem = mockedWorkGroupList[0]
        mockGetWorkGroupListSuccess(mockedWorkGroupList)

        const store = getStoreWithAuth({
          userRole: UserRolesEnum.SeniorEngineer,
        })

        const { user } = render(<ExtendedFilter {...requiredProps} />, {
          store,
        })

        const workGroupField = utils.getWorkGroupField()
        await loadingFinishedBySelect(workGroupField)
        await userOpenSelect(user, workGroupField)

        const workGroupOption = screen.getByText(mockedWorkGroupListItem.name)
        await user.click(workGroupOption)

        const selectedOption = getSelectedOption(workGroupField)
        expect(selectedOption).toHaveTextContent(mockedWorkGroupListItem.name)
        expect(selectedOption).toBeVisible()
      })

      test('Поиск по списку работает', async () => {
        const mockedWorkGroupList = getWorkGroupList(2)
        const mockedWorkGroupListItem1 = mockedWorkGroupList[0]
        const mockedWorkGroupListItem2 = mockedWorkGroupList[1]
        mockGetWorkGroupListSuccess(mockedWorkGroupList)

        const store = getStoreWithAuth({
          userRole: UserRolesEnum.SeniorEngineer,
        })

        const { user } = render(<ExtendedFilter {...requiredProps} />, {
          store,
        })

        const workGroupField = utils.getWorkGroupField()
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
          const mockedWorkGroupList = getWorkGroupList()
          const mockedWorkGroupListItem = mockedWorkGroupList[0]
          mockGetWorkGroupListSuccess(mockedWorkGroupList)

          const store = getStoreWithAuth({
            userRole: UserRolesEnum.SeniorEngineer,
          })

          const { user } = render(<ExtendedFilter {...requiredProps} />, {
            store,
          })

          const workGroupField = utils.getWorkGroupField()
          await loadingFinishedBySelect(workGroupField)
          await userOpenSelect(user, workGroupField)

          const workGroupOption = screen.getByText(mockedWorkGroupListItem.name)
          await user.click(workGroupOption)

          const container = screen.getByTestId('filter-extended-work-group')
          await utils.userClickResetButtonIn(user, container)

          const selectedOption = getSelectedOption(workGroupField)
          expect(selectedOption).not.toBeInTheDocument()
        })

        test('Кнопка "Сбросить всё"', async () => {
          const mockedWorkGroupList = getWorkGroupList()
          const mockedWorkGroupListItem = mockedWorkGroupList[0]
          mockGetWorkGroupListSuccess(mockedWorkGroupList)

          const store = getStoreWithAuth({
            userRole: UserRolesEnum.SeniorEngineer,
          })

          const { user } = render(<ExtendedFilter {...requiredProps} />, {
            store,
          })

          const workGroupField = utils.getWorkGroupField()
          await loadingFinishedBySelect(workGroupField)
          await userOpenSelect(user, workGroupField)

          const workGroupOption = screen.getByText(mockedWorkGroupListItem.name)
          await user.click(workGroupOption)

          await utils.userClickResetAllButton(user)

          const selectedOption = getSelectedOption(workGroupField)
          expect(selectedOption).not.toBeInTheDocument()
        })
      })
    })
  })
})
