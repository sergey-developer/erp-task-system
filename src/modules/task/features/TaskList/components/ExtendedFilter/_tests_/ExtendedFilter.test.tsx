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
import { taskStatusDict } from 'modules/task/constants/dict'
import { mockGetWorkGroupListSuccess } from 'modules/workGroup/features/WorkGroupList/_tests_/mocks'
import { UserRolesEnum } from 'shared/constants/roles'
import formatDate from 'shared/utils/date/formatDate'

import {
  initialExtendedFilterFormValues,
  searchQueriesDict,
} from '../constants'
import ExtendedFilter, { ExtendedFilterProps } from '../index'
import {
  getApplyButton,
  getCheckbox,
  getCloseButton,
  getEndDateField,
  getKeywordField,
  getRadioButton,
  getResetAllButton,
  getStartDateField,
  getWorkGroupField,
  queryWorkGroupField,
  userClickResetButton,
} from './utils'

const onClose = jest.fn()
const onSubmit = jest.fn()

const taskStatusDictValues = Object.values(taskStatusDict)
const searchQueriesDictValues = Object.values(searchQueriesDict)

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
  afterEach(() => {
    onClose.mockReset()
    onSubmit.mockReset()
  })

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
  })

  describe('По статусу', () => {
    jest.setTimeout(10000)

    test('Отображается', () => {
      render(<ExtendedFilterWrapper visible />)

      taskStatusDictValues.forEach((statusText) => {
        const checkbox = getCheckbox(new RegExp(statusText))
        expect(checkbox).toBeInTheDocument()
      })
    })

    test('Имеет корректные значения по умолчанию', () => {
      render(<ExtendedFilterWrapper visible />)

      Object.entries(taskStatusDict).forEach(([status, statusText]) => {
        const checkbox = getCheckbox(new RegExp(statusText))
        expect(checkbox).not.toBeChecked()
        expect(checkbox.value).toBe(status)
      })
    })

    test('Доступен для редактирования', () => {
      render(<ExtendedFilterWrapper visible />)

      taskStatusDictValues.forEach((statusText) => {
        const checkbox = getCheckbox(new RegExp(statusText))
        expect(checkbox).toBeEnabled()
      })
    })

    test('Можно выбрать любой статус', async () => {
      const { user } = render(<ExtendedFilterWrapper visible />)

      for await (const statusText of taskStatusDictValues) {
        const checkbox = getCheckbox(new RegExp(statusText))
        await user.click(checkbox)
        expect(checkbox).toBeChecked()
      }
    })

    test('Можно сбросить значения', async () => {
      const { user } = render(<ExtendedFilterWrapper visible />)

      for await (const statusText of taskStatusDictValues) {
        const checkbox = getCheckbox(new RegExp(statusText))
        await user.click(checkbox)
      }

      await userClickResetButton(user, 'filter-extended-status')

      taskStatusDictValues.forEach((statusText) => {
        const checkbox = getCheckbox(new RegExp(statusText))
        expect(checkbox).not.toBeChecked()
      })
    })
  })

  describe('По периоду выполнения', () => {
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

      const startDateField = getStartDateField()
      const endDateField = getEndDateField()
      await user.click(startDateField)

      const formattedDate = formatDate(new Date(), 'YYYY-MM-DD')
      const calendarCell = screen.getByTitle(formattedDate)

      await user.click(calendarCell)
      await user.click(calendarCell)

      expect(startDateField).toHaveDisplayValue(formattedDate)
      expect(endDateField).toHaveDisplayValue(formattedDate)
    })

    test('Можно сбросить значения', async () => {
      const { user } = render(<ExtendedFilterWrapper visible />)

      await user.click(getStartDateField())

      const formattedDate = formatDate(new Date(), 'YYYY-MM-DD')
      const calendarCell = screen.getByTitle(formattedDate)

      await user.click(calendarCell)
      await user.click(calendarCell)

      await userClickResetButton(user, 'filter-extended-execution-period')

      expect(getStartDateField()).not.toHaveDisplayValue(formattedDate)
      expect(getEndDateField()).not.toHaveDisplayValue(formattedDate)
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

    test('Можно сбросить значения', async () => {
      const { user } = render(<ExtendedFilterWrapper visible />)

      const keyword = generateName()
      await user.type(getKeywordField(), keyword)
      await user.click(getRadioButton(searchQueriesDict.searchByName))

      await userClickResetButton(user, 'filter-extended-search-by-column')

      expect(getKeywordField()).not.toHaveDisplayValue(keyword)
      expect(getRadioButton(searchQueriesDict.searchByName)).not.toBeChecked()
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

      test('Можно сбросить выбранное значение', async () => {
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

        await userClickResetButton(user, 'filter-extended-work-group')

        const selectedOption = getSelectedOption(workGroupField)
        expect(selectedOption).not.toBeInTheDocument()
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
    })
  })
})
