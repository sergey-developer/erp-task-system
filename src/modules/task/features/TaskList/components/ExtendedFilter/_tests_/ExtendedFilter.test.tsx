import { Form } from 'antd'

import { getWorkGroupList } from '_fixtures_/workGroup'
import {
  generateId,
  generateName,
  getSelect,
  getSelectOption,
  getSelectedOption,
  querySelectOption,
  render,
  screen,
  setupApiTests,
  userOpenSelect,
  userSearchInSelect,
  waitFinishLoadingBySelect,
} from '_tests_/utils'
import { getStoreWithAuth } from '_tests_/utils/auth'
import { mockGetWorkGroupListSuccess } from 'modules/workGroup/features/WorkGroupList/_tests_/mocks'
import { UserRolesEnum } from 'shared/constants/roles'

import {
  initialExtendedFilterFormValues,
  searchQueriesDict,
  taskAssignedDict,
  taskOverdueDict,
  taskStatusExtendedFilterDict,
} from '../constants'
import ExtendedFilter, { ExtendedFilterProps } from '../index'
import {
  searchQueriesDictValues,
  taskAssignedDictValues,
  taskOverdueDictValues,
  taskStatusExtendedFilterDictValues,
} from './constants'
import {
  getApplyButton,
  getAssignedContainer,
  getCheckboxIn,
  getCloseButton,
  getEndDateField,
  getKeywordField,
  getOverdueContainer,
  getRadioButtonIn,
  getResetAllButton,
  getSearchByColumnContainer,
  getStartDateField,
  getStatusContainer,
  getWorkGroupField,
  queryWorkGroupField,
  userClickResetAllButton,
  userClickResetButtonIn,
  userFillExecuteBeforeField,
} from './utils'

const onClose = jest.fn()
const onSubmit = jest.fn()

setupApiTests()

const ExtendedFilterWrapper = (props: Pick<ExtendedFilterProps, 'visible'>) => {
  const [form] = Form.useForm()

  return (
    <ExtendedFilter
      form={form}
      onClose={onClose}
      onSubmit={onSubmit}
      initialFormValues={initialExtendedFilterFormValues}
      {...props}
    />
  )
}

describe('Расширенный фильтр', () => {
  test('Отображается при передаче нужных данных', () => {
    render(<ExtendedFilterWrapper visible />)

    const filter = screen.getByTestId('filter-extended')
    expect(filter).toBeInTheDocument()
  })

  test('Не отображается если не передать нужные данные', () => {
    render(<ExtendedFilterWrapper visible={false} />)

    const filter = screen.queryByTestId('filter-extended')
    expect(filter).not.toBeInTheDocument()
  })

  describe('Header', () => {
    test('Корректно отображается', () => {
      render(<ExtendedFilterWrapper visible />)

      const title = screen.getByText('Фильтры')
      const closeButton = getCloseButton()

      expect(title).toBeInTheDocument()
      expect(closeButton).toBeInTheDocument()
    })

    test('Кнопка закрытия кликабельна', async () => {
      const { user } = render(<ExtendedFilterWrapper visible />)

      const closeButton = getCloseButton()
      expect(closeButton).toBeEnabled()

      await user.click(closeButton)
      expect(onClose).toBeCalledTimes(1)
    })
  })

  describe('Footer', () => {
    test('Корректно отображается', () => {
      render(<ExtendedFilterWrapper visible />)

      const applyButton = getApplyButton()
      const resetAllButton = getResetAllButton()

      expect(applyButton).toBeInTheDocument()
      expect(resetAllButton).toBeInTheDocument()
    })

    test('Кнопки активны', () => {
      render(<ExtendedFilterWrapper visible />)

      const applyButton = getApplyButton()
      const resetAllButton = getResetAllButton()

      expect(applyButton).toBeEnabled()
      expect(resetAllButton).toBeEnabled()
    })
  })

  describe('Статус', () => {
    test('Отображается', () => {
      render(<ExtendedFilterWrapper visible />)

      const container = getStatusContainer()

      taskStatusExtendedFilterDictValues.forEach((value) => {
        const checkbox = getCheckboxIn(container, { name: new RegExp(value) })
        expect(checkbox).toBeInTheDocument()
      })
    })

    test('Имеет корректные значения по умолчанию', () => {
      render(<ExtendedFilterWrapper visible />)

      const container = getStatusContainer()

      Object.entries(taskStatusExtendedFilterDict).forEach(([value, text]) => {
        const checkbox = getCheckboxIn(container, { name: new RegExp(text) })
        expect(checkbox).not.toBeChecked()
        expect(checkbox.value).toBe(value)
      })
    })

    test('Доступен для редактирования', () => {
      render(<ExtendedFilterWrapper visible />)

      const container = getStatusContainer()

      taskStatusExtendedFilterDictValues.forEach((value) => {
        const checkbox = getCheckboxIn(container, { name: new RegExp(value) })
        expect(checkbox).toBeEnabled()
      })
    })

    test('Можно выбрать любое значение', async () => {
      const { user } = render(<ExtendedFilterWrapper visible />)

      const container = getStatusContainer()

      for await (const value of taskStatusExtendedFilterDictValues) {
        const checkbox = getCheckboxIn(container, { name: new RegExp(value) })
        await user.click(checkbox)
        expect(checkbox).toBeChecked()
      }
    })

    describe('Сбрасывает значения', () => {
      test('Кнопка "Сбросить"', async () => {
        const { user } = render(<ExtendedFilterWrapper visible />)

        const container = getStatusContainer()

        for await (const value of taskStatusExtendedFilterDictValues) {
          const checkbox = getCheckboxIn(container, { name: new RegExp(value) })
          await user.click(checkbox)
        }

        await userClickResetButtonIn(user, container)

        taskStatusExtendedFilterDictValues.forEach((value) => {
          const checkbox = getCheckboxIn(container, { name: new RegExp(value) })
          expect(checkbox).not.toBeChecked()
        })
      })

      test('Кнопка "Сбросить всё"', async () => {
        const { user } = render(<ExtendedFilterWrapper visible />)

        const container = getStatusContainer()

        for await (const value of taskStatusExtendedFilterDictValues) {
          const checkbox = getCheckboxIn(container, { name: new RegExp(value) })
          await user.click(checkbox)
        }

        await userClickResetAllButton(user)

        taskStatusExtendedFilterDictValues.forEach((value) => {
          const checkbox = getCheckboxIn(container, { name: new RegExp(value) })
          expect(checkbox).not.toBeChecked()
        })
      })
    })
  })

  describe('Назначенный', () => {
    test('Отображается', () => {
      render(<ExtendedFilterWrapper visible />)

      const container = getAssignedContainer()

      taskAssignedDictValues.forEach((value) => {
        const radioButton = getRadioButtonIn(container, { name: value })
        expect(radioButton).toBeInTheDocument()
      })
    })

    test('Имеет корректные значения по умолчанию', () => {
      render(<ExtendedFilterWrapper visible />)

      const container = getAssignedContainer()

      Object.entries(taskAssignedDict).forEach(([value, text]) => {
        const radioButton = getRadioButtonIn(container, { name: text })
        expect(radioButton).not.toBeChecked()
        expect(radioButton.value).toBe(value)
      })
    })

    test('Доступен для редактирования', () => {
      render(<ExtendedFilterWrapper visible />)

      const container = getAssignedContainer()

      taskAssignedDictValues.forEach((value) => {
        const radioButton = getRadioButtonIn(container, { name: value })
        expect(radioButton).toBeEnabled()
      })
    })

    test('Можно выбрать любое значение', async () => {
      const { user } = render(<ExtendedFilterWrapper visible />)

      const container = getAssignedContainer()

      for await (const value of taskAssignedDictValues) {
        const radioButton = getRadioButtonIn(container, { name: value })
        await user.click(radioButton)
        expect(radioButton).toBeChecked()
      }
    })

    describe('Сбрасывает значение', () => {
      test('Кнопка "Сбросить"', async () => {
        const { user } = render(<ExtendedFilterWrapper visible />)

        const container = getAssignedContainer()

        await user.click(
          getRadioButtonIn(container, {
            name: taskAssignedDict.False,
          }),
        )

        await userClickResetButtonIn(user, container)

        expect(
          getRadioButtonIn(container, {
            name: taskAssignedDict.False,
          }),
        ).not.toBeChecked()
      })

      test('Кнопка "Сбросить всё"', async () => {
        const { user } = render(<ExtendedFilterWrapper visible />)

        const container = getAssignedContainer()

        await user.click(
          getRadioButtonIn(container, {
            name: taskAssignedDict.True,
          }),
        )

        await userClickResetAllButton(user)

        expect(
          getRadioButtonIn(container, {
            name: taskAssignedDict.True,
          }),
        ).not.toBeChecked()
      })
    })
  })

  describe('Просрочено', () => {
    test('Отображается', () => {
      render(<ExtendedFilterWrapper visible />)

      const container = getOverdueContainer()

      taskOverdueDictValues.forEach((value) => {
        const radioButton = getRadioButtonIn(container, { name: value })
        expect(radioButton).toBeInTheDocument()
      })
    })

    test('Имеет корректные значения по умолчанию', () => {
      render(<ExtendedFilterWrapper visible />)

      const container = getOverdueContainer()

      Object.entries(taskOverdueDict).forEach(([value, text]) => {
        const radioButton = getRadioButtonIn(container, { name: text })
        expect(radioButton).not.toBeChecked()
        expect(radioButton.value).toBe(value)
      })
    })

    test('Доступен для редактирования', () => {
      render(<ExtendedFilterWrapper visible />)

      const container = getOverdueContainer()

      taskOverdueDictValues.forEach((value) => {
        const radioButton = getRadioButtonIn(container, { name: value })
        expect(radioButton).toBeEnabled()
      })
    })

    test('Можно выбрать любое значение', async () => {
      const { user } = render(<ExtendedFilterWrapper visible />)

      const container = getOverdueContainer()

      for await (const value of taskOverdueDictValues) {
        const radioButton = getRadioButtonIn(container, { name: value })
        await user.click(radioButton)
        expect(radioButton).toBeChecked()
      }
    })

    describe('Сбрасывает значение', () => {
      test('Кнопка "Сбросить"', async () => {
        const { user } = render(<ExtendedFilterWrapper visible />)

        const container = getOverdueContainer()

        await user.click(
          getRadioButtonIn(container, {
            name: taskOverdueDict.False,
          }),
        )

        await userClickResetButtonIn(user, container)

        expect(
          getRadioButtonIn(container, {
            name: taskOverdueDict.False,
          }),
        ).not.toBeChecked()
      })

      test('Кнопка "Сбросить всё"', async () => {
        const { user } = render(<ExtendedFilterWrapper visible />)

        const container = getOverdueContainer()

        await user.click(
          getRadioButtonIn(container, {
            name: taskOverdueDict.True,
          }),
        )

        await userClickResetAllButton(user)

        expect(
          getRadioButtonIn(container, {
            name: taskOverdueDict.True,
          }),
        ).not.toBeChecked()
      })
    })
  })

  describe('Выполнить до', () => {
    test('Отображается', () => {
      render(<ExtendedFilterWrapper visible />)

      const startDateField = getStartDateField()
      const endDateField = getEndDateField()

      expect(startDateField).toBeInTheDocument()
      expect(endDateField).toBeInTheDocument()
    })

    test('Имеет корректные значения по умолчанию', () => {
      render(<ExtendedFilterWrapper visible />)

      const startDateField = getStartDateField()
      const endDateField = getEndDateField()

      expect(startDateField).not.toHaveValue()
      expect(endDateField).not.toHaveValue()
    })

    test('Доступен для редактирования', () => {
      render(<ExtendedFilterWrapper visible />)

      const startDateField = getStartDateField()
      const endDateField = getEndDateField()

      expect(startDateField).toBeEnabled()
      expect(endDateField).toBeEnabled()
    })

    test('Можно выбрать даты', async () => {
      const { user } = render(<ExtendedFilterWrapper visible />)

      const { startDateField, startDateValue, endDateField, endDateValue } =
        await userFillExecuteBeforeField(user)

      expect(startDateField).toHaveDisplayValue(startDateValue)
      expect(endDateField).toHaveDisplayValue(endDateValue)
    })

    describe('Сбрасывает значения', () => {
      test('Кнопка "Сбросить"', async () => {
        const { user } = render(<ExtendedFilterWrapper visible />)

        const { startDateValue, endDateValue } =
          await userFillExecuteBeforeField(user)

        const container = screen.getByTestId('filter-extended-complete-at')
        await userClickResetButtonIn(user, container)

        expect(getStartDateField()).not.toHaveDisplayValue(startDateValue)
        expect(getEndDateField()).not.toHaveDisplayValue(endDateValue)
      })

      test('Кнопка "Сбросить всё"', async () => {
        const { user } = render(<ExtendedFilterWrapper visible />)

        const { startDateValue, endDateValue } =
          await userFillExecuteBeforeField(user)

        await userClickResetAllButton(user)

        expect(getStartDateField()).not.toHaveDisplayValue(startDateValue)
        expect(getEndDateField()).not.toHaveDisplayValue(endDateValue)
      })
    })
  })

  describe('По столбцу', () => {
    test('Отображается', () => {
      render(<ExtendedFilterWrapper visible />)

      const container = getSearchByColumnContainer()

      searchQueriesDictValues.forEach((value) => {
        const radioButton = getRadioButtonIn(container, { name: value })
        expect(radioButton).toBeInTheDocument()
      })

      const keywordField = getKeywordField()
      expect(keywordField).toBeInTheDocument()
    })

    test('Имеет корректные значения по умолчанию', () => {
      render(<ExtendedFilterWrapper visible />)

      const container = getSearchByColumnContainer()

      const searchByNameButton = getRadioButtonIn(container, {
        name: searchQueriesDict.searchByName,
      })

      const searchByTitleButton = getRadioButtonIn(container, {
        name: searchQueriesDict.searchByTitle,
      })

      const searchByAssigneeButton = getRadioButtonIn(container, {
        name: searchQueriesDict.searchByAssignee,
      })

      expect(searchByNameButton.value).toBe('searchByName')
      expect(searchByTitleButton.value).toBe('searchByTitle')
      expect(searchByAssigneeButton.value).toBe('searchByAssignee')

      expect(searchByNameButton).not.toBeChecked()
      expect(searchByTitleButton).toBeChecked()
      expect(searchByAssigneeButton).not.toBeChecked()

      const keywordField = getKeywordField()
      expect(keywordField).not.toHaveValue()
    })

    test('Доступен для редактирования', () => {
      render(<ExtendedFilterWrapper visible />)

      const container = getSearchByColumnContainer()

      searchQueriesDictValues.forEach((value) => {
        const radioButton = getRadioButtonIn(container, { name: value })
        expect(radioButton).toBeEnabled()
      })

      const keywordField = getKeywordField()
      expect(keywordField).toBeEnabled()
    })

    test('Можно ввести ключевое слово', async () => {
      const { user } = render(<ExtendedFilterWrapper visible />)

      const keywordField = getKeywordField()
      const keyword = generateName()

      await user.type(keywordField, keyword)
      expect(keywordField).toHaveDisplayValue(keyword)
    })

    test('Можно выбрать любой столбец', async () => {
      const { user } = render(<ExtendedFilterWrapper visible />)

      const container = getSearchByColumnContainer()

      for await (const value of searchQueriesDictValues) {
        const radioButton = getRadioButtonIn(container, { name: value })
        await user.click(radioButton)
        expect(radioButton).toBeChecked()
      }
    })

    describe('Сбрасывает значения', () => {
      test('Кнопка "Сбросить"', async () => {
        const { user } = render(<ExtendedFilterWrapper visible />)

        const container = getSearchByColumnContainer()

        const keyword = generateName()
        await user.type(getKeywordField(), keyword)

        await user.click(
          getRadioButtonIn(container, { name: searchQueriesDict.searchByName }),
        )

        await userClickResetButtonIn(user, container)

        expect(getKeywordField()).not.toHaveDisplayValue(keyword)
        expect(
          getRadioButtonIn(container, { name: searchQueriesDict.searchByName }),
        ).not.toBeChecked()
      })

      test('Кнопка "Сбросить всё"', async () => {
        const { user } = render(<ExtendedFilterWrapper visible />)

        const container = getSearchByColumnContainer()

        const keyword = generateName()
        await user.type(getKeywordField(), keyword)

        await user.click(
          getRadioButtonIn(container, { name: searchQueriesDict.searchByName }),
        )

        await userClickResetAllButton(user)

        expect(getKeywordField()).not.toHaveDisplayValue(keyword)
        expect(
          getRadioButtonIn(container, { name: searchQueriesDict.searchByName }),
        ).not.toBeChecked()
      })
    })
  })

  describe('По рабочей группе', () => {
    describe(`Для роли ${UserRolesEnum.FirstLineSupport}`, () => {
      test('Не отображается', () => {
        mockGetWorkGroupListSuccess([])

        const store = getStoreWithAuth({
          userId: generateId(),
          userRole: UserRolesEnum.FirstLineSupport,
        })

        render(<ExtendedFilterWrapper visible />, { store })

        const workGroupField = queryWorkGroupField()
        expect(workGroupField).not.toBeInTheDocument()
      })
    })

    describe(`Для роли ${UserRolesEnum.Engineer}`, () => {
      test('Не отображается', () => {
        const store = getStoreWithAuth({
          userId: generateId(),
          userRole: UserRolesEnum.Engineer,
        })

        render(<ExtendedFilterWrapper visible />, { store })

        const workGroupField = queryWorkGroupField()
        expect(workGroupField).not.toBeInTheDocument()
      })
    })

    describe(`Для роли ${UserRolesEnum.SeniorEngineer}`, () => {
      test('Отображается', async () => {
        mockGetWorkGroupListSuccess([])

        const store = getStoreWithAuth({
          userId: generateId(),
          userRole: UserRolesEnum.SeniorEngineer,
        })

        render(<ExtendedFilterWrapper visible />, { store })

        const workGroupField = getWorkGroupField()
        await waitFinishLoadingBySelect(workGroupField)

        expect(workGroupField).toBeInTheDocument()
      })
    })

    describe(`Для роли ${UserRolesEnum.HeadOfDepartment}`, () => {
      test('Отображается', async () => {
        mockGetWorkGroupListSuccess([])

        const store = getStoreWithAuth({
          userId: generateId(),
          userRole: UserRolesEnum.HeadOfDepartment,
        })

        render(<ExtendedFilterWrapper visible />, { store })

        const workGroupField = getWorkGroupField()
        await waitFinishLoadingBySelect(workGroupField)

        expect(workGroupField).toBeInTheDocument()
      })
    })

    describe('Для роли с которой отображается', () => {
      test('Имеет корректные значения по умолчанию', async () => {
        mockGetWorkGroupListSuccess(getWorkGroupList())

        const store = getStoreWithAuth({
          userId: generateId(),
          userRole: UserRolesEnum.SeniorEngineer,
        })

        render(<ExtendedFilterWrapper visible />, { store })

        const workGroupField = getWorkGroupField()
        await waitFinishLoadingBySelect(workGroupField)

        const selectedOption = getSelectedOption(workGroupField)
        expect(selectedOption).not.toBeInTheDocument()
      })

      test('Доступен для редактирования после загрузки списка', async () => {
        mockGetWorkGroupListSuccess([])

        const store = getStoreWithAuth({
          userId: generateId(),
          userRole: UserRolesEnum.SeniorEngineer,
        })

        render(<ExtendedFilterWrapper visible />, { store })

        const workGroupField = getWorkGroupField()
        await waitFinishLoadingBySelect(workGroupField)

        const select = getSelect(workGroupField)
        expect(select).toBeEnabled()
      })

      test('Можно выбрать рабочую группу из списка', async () => {
        const mockedWorkGroupList = getWorkGroupList()
        const mockedWorkGroupListItem = mockedWorkGroupList[0]
        mockGetWorkGroupListSuccess(mockedWorkGroupList)

        const store = getStoreWithAuth({
          userId: generateId(),
          userRole: UserRolesEnum.SeniorEngineer,
        })

        const { user } = render(<ExtendedFilterWrapper visible />, {
          store,
        })

        const workGroupField = getWorkGroupField()
        await waitFinishLoadingBySelect(workGroupField)
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
          userId: generateId(),
          userRole: UserRolesEnum.SeniorEngineer,
        })

        const { user } = render(<ExtendedFilterWrapper visible />, {
          store,
        })

        const workGroupField = getWorkGroupField()
        await waitFinishLoadingBySelect(workGroupField)
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
            userId: generateId(),
            userRole: UserRolesEnum.SeniorEngineer,
          })

          const { user } = render(<ExtendedFilterWrapper visible />, {
            store,
          })

          const workGroupField = getWorkGroupField()
          await waitFinishLoadingBySelect(workGroupField)
          await userOpenSelect(user, workGroupField)

          const workGroupOption = screen.getByText(mockedWorkGroupListItem.name)
          await user.click(workGroupOption)

          const container = screen.getByTestId('filter-extended-work-group')
          await userClickResetButtonIn(user, container)

          const selectedOption = getSelectedOption(workGroupField)
          expect(selectedOption).not.toBeInTheDocument()
        })

        test('Кнопка "Сбросить всё"', async () => {
          const mockedWorkGroupList = getWorkGroupList()
          const mockedWorkGroupListItem = mockedWorkGroupList[0]
          mockGetWorkGroupListSuccess(mockedWorkGroupList)

          const store = getStoreWithAuth({
            userId: generateId(),
            userRole: UserRolesEnum.SeniorEngineer,
          })

          const { user } = render(<ExtendedFilterWrapper visible />, {
            store,
          })

          const workGroupField = getWorkGroupField()
          await waitFinishLoadingBySelect(workGroupField)
          await userOpenSelect(user, workGroupField)

          const workGroupOption = screen.getByText(mockedWorkGroupListItem.name)
          await user.click(workGroupOption)

          await userClickResetAllButton(user)

          const selectedOption = getSelectedOption(workGroupField)
          expect(selectedOption).not.toBeInTheDocument()
        })
      })
    })
  })
})
