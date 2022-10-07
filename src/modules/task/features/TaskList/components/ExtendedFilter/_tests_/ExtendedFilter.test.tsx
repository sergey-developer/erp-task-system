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
} from '../constants'
import ExtendedFilter, { ExtendedFilterProps } from '../index'
import {
  searchQueriesDictValues,
  taskExtraStatusDictValues,
  taskFilterStatusDictValues,
  taskStatusExtendedFilterDict,
  taskStatusExtendedFilterDictValues,
} from './constants'
import {
  getApplyButton,
  getCheckboxIn,
  getCloseButton,
  getEndDateField,
  getKeywordField,
  getRadioButton,
  getResetAllButton,
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

    test('Кнопки не активны если значения фильтров не менялись', () => {
      render(<ExtendedFilterWrapper visible />)

      const applyButton = getApplyButton()
      const resetAllButton = getResetAllButton()

      expect(applyButton).not.toBeEnabled()
      expect(resetAllButton).not.toBeEnabled()
    })
  })

  describe('По статусу', () => {
    jest.setTimeout(20000)

    test('Отображается', () => {
      render(<ExtendedFilterWrapper visible />)

      const container = getStatusContainer()

      taskStatusExtendedFilterDictValues.forEach((statusText) => {
        const checkbox = getCheckboxIn(container, new RegExp(statusText))
        expect(checkbox).toBeInTheDocument()
      })

      taskExtraStatusDictValues.forEach((statusText) => {
        const checkbox = getCheckboxIn(container, new RegExp(statusText))
        expect(checkbox).toBeInTheDocument()
      })

      taskFilterStatusDictValues.forEach((statusText) => {
        const checkbox = getCheckboxIn(container, new RegExp(statusText))
        expect(checkbox).toBeInTheDocument()
      })
    })

    test('Имеет корректные значения по умолчанию', () => {
      render(<ExtendedFilterWrapper visible />)

      const container = getStatusContainer()

      Object.entries(taskStatusExtendedFilterDict).forEach(
        ([status, statusText]) => {
          const checkbox = getCheckboxIn(container, new RegExp(statusText))
          expect(checkbox).not.toBeChecked()
          expect(checkbox.value).toBe(status)
        },
      )
    })

    test('Доступен для редактирования', () => {
      render(<ExtendedFilterWrapper visible />)

      const container = getStatusContainer()

      taskStatusExtendedFilterDictValues.forEach((statusText) => {
        const checkbox = getCheckboxIn(container, new RegExp(statusText))
        expect(checkbox).toBeEnabled()
      })

      taskExtraStatusDictValues.forEach((statusText) => {
        const checkbox = getCheckboxIn(container, new RegExp(statusText))
        expect(checkbox).toBeEnabled()
      })

      taskFilterStatusDictValues.forEach((statusText) => {
        const checkbox = getCheckboxIn(container, new RegExp(statusText))
        expect(checkbox).toBeEnabled()
      })
    })

    test('Можно выбрать любой статус', async () => {
      const { user } = render(<ExtendedFilterWrapper visible />)

      const container = getStatusContainer()

      for await (const statusText of taskStatusExtendedFilterDictValues) {
        const checkbox = getCheckboxIn(container, new RegExp(statusText))
        await user.click(checkbox)
        expect(checkbox).toBeChecked()
      }

      for await (const statusText of taskExtraStatusDictValues) {
        const checkbox = getCheckboxIn(container, new RegExp(statusText))
        await user.click(checkbox)
        expect(checkbox).toBeChecked()
      }

      for await (const statusText of taskFilterStatusDictValues) {
        const checkbox = getCheckboxIn(container, new RegExp(statusText))
        await user.click(checkbox)
        expect(checkbox).toBeChecked()
      }
    })

    describe('Сбрасывает значения', () => {
      test('Кнопка "Сбросить"', async () => {
        const { user } = render(<ExtendedFilterWrapper visible />)

        const container = getStatusContainer()

        for await (const statusText of taskStatusExtendedFilterDictValues) {
          const checkbox = getCheckboxIn(container, new RegExp(statusText))
          await user.click(checkbox)
        }

        for await (const statusText of taskExtraStatusDictValues) {
          const checkbox = getCheckboxIn(container, new RegExp(statusText))
          await user.click(checkbox)
        }

        for await (const statusText of taskFilterStatusDictValues) {
          const checkbox = getCheckboxIn(container, new RegExp(statusText))
          await user.click(checkbox)
        }

        await userClickResetButtonIn(user, container)

        taskStatusExtendedFilterDictValues.forEach((statusText) => {
          const checkbox = getCheckboxIn(container, new RegExp(statusText))
          expect(checkbox).not.toBeChecked()
        })

        taskExtraStatusDictValues.forEach((statusText) => {
          const checkbox = getCheckboxIn(container, new RegExp(statusText))
          expect(checkbox).not.toBeChecked()
        })

        taskFilterStatusDictValues.forEach((statusText) => {
          const checkbox = getCheckboxIn(container, new RegExp(statusText))
          expect(checkbox).not.toBeChecked()
        })
      })

      test('Кнопка "Сбросить всё"', async () => {
        const { user } = render(<ExtendedFilterWrapper visible />)

        const container = getStatusContainer()

        for await (const statusText of taskStatusExtendedFilterDictValues) {
          const checkbox = getCheckboxIn(container, new RegExp(statusText))
          await user.click(checkbox)
        }

        for await (const statusText of taskExtraStatusDictValues) {
          const checkbox = getCheckboxIn(container, new RegExp(statusText))
          await user.click(checkbox)
        }

        for await (const statusText of taskFilterStatusDictValues) {
          const checkbox = getCheckboxIn(container, new RegExp(statusText))
          await user.click(checkbox)
        }

        await userClickResetAllButton(user)

        taskStatusExtendedFilterDictValues.forEach((statusText) => {
          const checkbox = getCheckboxIn(container, new RegExp(statusText))
          expect(checkbox).not.toBeChecked()
        })

        taskExtraStatusDictValues.forEach((statusText) => {
          const checkbox = getCheckboxIn(container, new RegExp(statusText))
          expect(checkbox).not.toBeChecked()
        })

        taskFilterStatusDictValues.forEach((statusText) => {
          const checkbox = getCheckboxIn(container, new RegExp(statusText))
          expect(checkbox).not.toBeChecked()
        })
      })
    })

    describe('Становится активна после заполнения полей', () => {
      test('Кнопка "Сбросить всё"', async () => {
        const { user } = render(<ExtendedFilterWrapper visible />)

        const resetAllButton = getResetAllButton()
        expect(resetAllButton).not.toBeEnabled()

        const container = getStatusContainer()

        const checkbox = getCheckboxIn(
          container,
          new RegExp(taskStatusExtendedFilterDict.AWAITING!),
        )

        await user.click(checkbox)

        expect(resetAllButton).toBeEnabled()
      })

      test('Кнопка "Применить"', async () => {
        const { user } = render(<ExtendedFilterWrapper visible />)

        const applyButton = getApplyButton()
        expect(applyButton).not.toBeEnabled()

        const container = getStatusContainer()

        const checkbox = getCheckboxIn(
          container,
          new RegExp(taskStatusExtendedFilterDict.RETURNED!),
        )

        await user.click(checkbox)

        expect(applyButton).toBeEnabled()
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

    describe('Становится активна после заполнения полей', () => {
      test('Кнопка "Сбросить всё"', async () => {
        const { user } = render(<ExtendedFilterWrapper visible />)

        const resetAllButton = getResetAllButton()
        expect(resetAllButton).not.toBeEnabled()

        await userFillExecuteBeforeField(user)

        expect(resetAllButton).toBeEnabled()
      })

      test('Кнопка "Применить"', async () => {
        const { user } = render(<ExtendedFilterWrapper visible />)

        const applyButton = getApplyButton()
        expect(applyButton).not.toBeEnabled()

        await userFillExecuteBeforeField(user)

        expect(applyButton).toBeEnabled()
      })
    })
  })

  describe('По столбцу', () => {
    test('Отображается', () => {
      render(<ExtendedFilterWrapper visible />)

      searchQueriesDictValues.forEach((searchFieldName) => {
        const radioButton = getRadioButton(searchFieldName)
        expect(radioButton).toBeInTheDocument()
      })

      const keywordField = getKeywordField()
      expect(keywordField).toBeInTheDocument()
    })

    test('Имеет корректные значения по умолчанию', () => {
      render(<ExtendedFilterWrapper visible />)

      const searchByNameButton = getRadioButton(searchQueriesDict.searchByName)
      const searchByTitleButton = getRadioButton(
        searchQueriesDict.searchByTitle,
      )
      const searchByAssigneeButton = getRadioButton(
        searchQueriesDict.searchByAssignee,
      )

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

      searchQueriesDictValues.forEach((searchFieldName) => {
        const radioButton = getRadioButton(searchFieldName)
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

      for await (const searchFieldName of searchQueriesDictValues) {
        const radioButton = getRadioButton(searchFieldName)
        await user.click(radioButton)
        expect(radioButton).toBeChecked()
      }
    })

    describe('Сбрасывает значения', () => {
      test('Кнопка "Сбросить"', async () => {
        const { user } = render(<ExtendedFilterWrapper visible />)

        const keyword = generateName()
        await user.type(getKeywordField(), keyword)
        await user.click(getRadioButton(searchQueriesDict.searchByName))

        const container = screen.getByTestId('filter-extended-search-by-column')
        await userClickResetButtonIn(user, container)

        expect(getKeywordField()).not.toHaveDisplayValue(keyword)
        expect(getRadioButton(searchQueriesDict.searchByName)).not.toBeChecked()
      })

      test('Кнопка "Сбросить всё"', async () => {
        const { user } = render(<ExtendedFilterWrapper visible />)

        const keyword = generateName()
        await user.type(getKeywordField(), keyword)
        await user.click(getRadioButton(searchQueriesDict.searchByName))

        await userClickResetAllButton(user)

        expect(getKeywordField()).not.toHaveDisplayValue(keyword)
        expect(getRadioButton(searchQueriesDict.searchByName)).not.toBeChecked()
      })
    })

    describe('Становится активна после заполнения полей', () => {
      test('Кнопка "Сбросить всё"', async () => {
        const { user } = render(<ExtendedFilterWrapper visible />)

        const resetAllButton = getResetAllButton()
        expect(resetAllButton).not.toBeEnabled()

        const keyword = generateName()
        await user.type(getKeywordField(), keyword)
        await user.click(getRadioButton(searchQueriesDict.searchByName))

        expect(resetAllButton).toBeEnabled()
      })

      test('Кнопка "Применить"', async () => {
        const { user } = render(<ExtendedFilterWrapper visible />)

        const applyButton = getApplyButton()
        expect(applyButton).not.toBeEnabled()

        const keyword = generateName()
        await user.type(getKeywordField(), keyword)
        await user.click(getRadioButton(searchQueriesDict.searchByName))

        expect(applyButton).toBeEnabled()
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

      describe('Становится активна после заполнения полей', () => {
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

          const resetAllButton = getResetAllButton()
          expect(resetAllButton).not.toBeEnabled()

          const workGroupField = getWorkGroupField()
          await waitFinishLoadingBySelect(workGroupField)
          await userOpenSelect(user, workGroupField)

          const workGroupOption = screen.getByText(mockedWorkGroupListItem.name)
          await user.click(workGroupOption)

          expect(resetAllButton).toBeEnabled()
        })

        test('Кнопка "Применить"', async () => {
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

          const applyButton = getApplyButton()
          expect(applyButton).not.toBeEnabled()

          const workGroupField = getWorkGroupField()
          await waitFinishLoadingBySelect(workGroupField)
          await userOpenSelect(user, workGroupField)

          const workGroupOption = screen.getByText(mockedWorkGroupListItem.name)
          await user.click(workGroupOption)

          expect(applyButton).toBeEnabled()
        })
      })
    })
  })
})
