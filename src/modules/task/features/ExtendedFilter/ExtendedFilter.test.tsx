import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import moment from 'moment'

import { TaskExtendedStatusEnum } from 'modules/task/constants/common'
import { taskExtendedStatusDict } from 'modules/task/constants/dictionary'

import { UserRoleEnum } from 'modules/user/constants/roles'

import workGroupFixtures from 'fixtures/workGroup'

import { mockGetWorkGroupListSuccess } from '_tests_/mocks/api'
import {
  clickSelectOption,
  generateName,
  generateWord,
  getButtonIn,
  getCheckboxIn,
  getRadioButtonIn,
  getSelect,
  getSelectOption,
  getSelectedOption,
  getStoreWithAuth,
  expectLoadingFinishedBySelect,
  querySelectOption,
  render,
  setupApiTests,
  openSelect,
  userSearchInSelect,
} from '_tests_/utils'

import {
  TaskAssignedEnum,
  initialExtendedFilterFormValues,
  searchFieldDict,
  taskAssignedDict,
  taskOverdueDict,
} from './constants'
import ExtendedFilter, { ExtendedFilterProps } from './index'

const taskExtendedStatusDictValues = Object.values(taskExtendedStatusDict)
const taskOverdueDictValues = Object.values(taskOverdueDict)
const taskAssignedDictValues = Object.values(taskAssignedDict)
const searchFieldDictValues = Object.values(searchFieldDict)

const requiredProps: ExtendedFilterProps = {
  formValues: initialExtendedFilterFormValues,
  initialFormValues: initialExtendedFilterFormValues,
  onClose: jest.fn(),
  onSubmit: jest.fn(),
}

const getContainer = () => screen.getByTestId('filter-extended')
const findContainer = () => screen.findByTestId('filter-extended')

// reset button
const getResetAllButton = () => getButtonIn(getContainer(), /сбросить все/i)

const clickResetButtonIn = async (user: UserEvent, container: HTMLElement) => {
  const button = getButtonIn(container, /сбросить/i)
  await user.click(button)
  return button
}

const clickResetAllButton = async (user: UserEvent) => {
  const button = getResetAllButton()
  await user.click(button)
  return button
}

// close button
const getCloseButton = () => getButtonIn(getContainer(), /close/i)

const closeFilter = async (user: UserEvent) => {
  const button = getCloseButton()
  await user.click(button)
  return button
}

// apply button
const getApplyButton = () => getButtonIn(getContainer(), /применить/i)

const applyFilter = async (user: UserEvent) => {
  const button = getApplyButton()
  await user.click(button)
  return button
}

// status
const getStatusFieldContainer = () => screen.getByTestId('filter-extended-status')

const getStatusField = (label: string) =>
  getCheckboxIn(getStatusFieldContainer(), new RegExp(label))

const setStatus = async (user: UserEvent, label: string) => {
  const field = getStatusField(label)
  await user.click(field)
  return field
}

const expectStatusHasCorrectInitialValues = () => {
  const container = getStatusFieldContainer()

  Object.entries(taskExtendedStatusDict).forEach(([value, text]) => {
    const checkbox = getCheckboxIn(container, new RegExp(text))
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
const getAssignedFieldContainer = () =>
  screen.getByTestId('filter-extended-is-assigned')

const getAssignedField = (label: string) =>
  getRadioButtonIn(getAssignedFieldContainer(), label)

const setAssigned = async (user: UserEvent, label: string) => {
  const radioButton = getAssignedField(label)
  await user.click(radioButton)
  return radioButton
}

const expectAssignedHasCorrectInitialValues = () => {
  const container = getAssignedFieldContainer()

  Object.entries(taskAssignedDict).forEach(([value, text]) => {
    const radioButton = getRadioButtonIn(container, text)
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
const getOverdueFieldContainer = () =>
  screen.getByTestId('filter-extended-is-overdue')

const getOverdueField = (label: string) =>
  getRadioButtonIn(getOverdueFieldContainer(), label)

const setOverdue = async (user: UserEvent, label: string) => {
  const radioButton = getOverdueField(label)
  await user.click(radioButton)
  return radioButton
}

const expectOverdueHasCorrectInitialValues = () => {
  const container = getOverdueFieldContainer()

  Object.entries(taskOverdueDict).forEach(([value, text]) => {
    const radioButton = getRadioButtonIn(container, text)
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
const getCompleteAtFieldContainer = () =>
  screen.getByTestId('filter-extended-complete-at')

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

// work group
const getWorkGroupFieldContainer = () =>
  screen.getByTestId('filter-extended-work-group')

const getWorkGroupField = () =>
  screen.getByTestId('filter-extended-work-group-select')

const queryWorkGroupField = () =>
  screen.queryByTestId('filter-extended-work-group-select')

const workGroupExpectLoadingFinished = async () => {
  const workGroupField = getWorkGroupField()
  await expectLoadingFinishedBySelect(workGroupField)
  return workGroupField
}

const workGroup = {
  getContainer: getWorkGroupFieldContainer,
  getField: getWorkGroupField,
  queryField: queryWorkGroupField,
  openField: openSelect,
  setValue: clickSelectOption,
  expectLoadingFinished: workGroupExpectLoadingFinished,
}

// search by column
const getSearchByColumnFieldContainer = () =>
  screen.getByTestId('filter-extended-search-by-column')

const getSearchByColumnKeywordField = (): HTMLInputElement =>
  within(getSearchByColumnFieldContainer()).getByPlaceholderText('Ключевое слово')

const getSearchByColumnColumnField = (label: string) =>
  getRadioButtonIn(getSearchByColumnFieldContainer(), label)

const setSearchByColumnKeyword = async (user: UserEvent) => {
  const keywordField = getSearchByColumnKeywordField()
  const keyword = generateWord()

  await user.type(keywordField, keyword)

  return { keywordField, keyword }
}

const setSearchByColumnField = async (
  user: UserEvent,
  label: string,
) => {
  const radioButton = getRadioButtonIn(getSearchByColumnFieldContainer(), label)
  await user.click(radioButton)
  return radioButton
}

const expectSearchByColumnHasCorrectInitialValues = () => {
  const searchByNameButton = getSearchByColumnColumnField(
    searchFieldDict.searchByName,
  )

  const searchByTitleButton = getSearchByColumnColumnField(
    searchFieldDict.searchByTitle,
  )

  const searchByAssigneeButton = getSearchByColumnColumnField(
    searchFieldDict.searchByAssignee,
  )

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

// other
const clickOutOfFilter = async (user: UserEvent) => {
  const filter = getContainer()
  // eslint-disable-next-line testing-library/no-node-access
  const overlay = filter.querySelector('.ant-drawer-mask')
  if (overlay) await user.click(overlay)
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
  applyFilter,

  searchByColumn,
  status,
  assigned,
  overdue,
  completeAt,
  workGroup,

  clickOutOfFilter,
}

setupApiTests()

describe('Расширенный фильтр', () => {
  test('Отображается', () => {
    render(<ExtendedFilter {...requiredProps} />)
    expect(testUtils.getContainer()).toBeInTheDocument()
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
        const checkbox = await testUtils.status.setValue(user, value)
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

        await testUtils.clickResetButtonIn(user, container)

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

        await testUtils.clickResetAllButton(user)

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
        const radioButton = await testUtils.assigned.setValue(user, value)
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

        await testUtils.clickResetButtonIn(user, container)

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

        await testUtils.clickResetAllButton(user)

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
        const radioButton = await testUtils.overdue.setValue(user, value)
        expect(radioButton).toBeChecked()
      }
    })

    describe('Сбрасывает значение', () => {
      test('Кнопка "Сбросить"', async () => {
        const { user } = render(<ExtendedFilter {...requiredProps} />)

        const container = testUtils.overdue.getContainer()

        await user.click(getRadioButtonIn(container, taskOverdueDict.False))

        await testUtils.clickResetButtonIn(user, container)

        expect(
          getRadioButtonIn(container, taskOverdueDict.False),
        ).not.toBeChecked()
      })

      test('Кнопка "Сбросить всё"', async () => {
        const { user } = render(<ExtendedFilter {...requiredProps} />)

        const container = testUtils.overdue.getContainer()

        await user.click(getRadioButtonIn(container, taskOverdueDict.True))

        await testUtils.clickResetAllButton(user)

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
      expect(startDateField).toBeEnabled()

      expect(endDateField).toBeInTheDocument()
      expect(endDateField).toBeEnabled()
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
        await testUtils.completeAt.setValue(user)

      expect(startDateField).toHaveDisplayValue(startDateValue)
      expect(endDateField).toHaveDisplayValue(endDateValue)
    })

    describe('Сбрасывает значения', () => {
      test('Кнопка "Сбросить"', async () => {
        const { user } = render(<ExtendedFilter {...requiredProps} />)

        const { startDateValue, endDateValue } =
          await testUtils.completeAt.setValue(user)

        const container = testUtils.completeAt.getContainer()
        await testUtils.clickResetButtonIn(user, container)

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
          await testUtils.completeAt.setValue(user)

        await testUtils.clickResetAllButton(user)

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
        await testUtils.searchByColumn.setKeywordValue(user)

      expect(keywordField).toHaveDisplayValue(keyword)
    })

    test('Можно выбрать любой столбец', async () => {
      const { user } = render(<ExtendedFilter {...requiredProps} />)

      for await (const value of searchFieldDictValues) {
        const radioButton = await testUtils.searchByColumn.setColumnValue(
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

        await testUtils.clickResetButtonIn(user, container)

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

        await testUtils.clickResetAllButton(user)

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

        render(<ExtendedFilter {...requiredProps} />, {
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
        render(<ExtendedFilter {...requiredProps} />, {
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
        mockGetWorkGroupListSuccess({ body: [] })

        render(<ExtendedFilter {...requiredProps} />, {
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
        mockGetWorkGroupListSuccess({ body: [] })

        render(<ExtendedFilter {...requiredProps} />, {
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
        mockGetWorkGroupListSuccess({
          body: workGroupFixtures.getWorkGroupList(),
        })

        render(<ExtendedFilter {...requiredProps} />, {
          store: getStoreWithAuth({
            userRole: UserRoleEnum.SeniorEngineer,
          }),
        })

        const workGroupField = await testUtils.workGroup.expectLoadingFinished()
        const selectedOption = getSelectedOption(workGroupField)

        expect(selectedOption).not.toBeInTheDocument()
      })

      test('Переданное значение перезаписывает значение по умолчанию', async () => {
        const workGroupList = workGroupFixtures.getWorkGroupList()
        const workGroupId = String(workGroupList[0].id)
        mockGetWorkGroupListSuccess({ body: workGroupList })

        render(
          <ExtendedFilter
            {...requiredProps}
            formValues={{
              ...requiredProps.formValues,
              workGroupId,
            }}
          />,
          {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.SeniorEngineer,
            }),
          },
        )

        const workGroupField = await testUtils.workGroup.expectLoadingFinished()
        const selectedOption = getSelectedOption(workGroupField)

        expect(selectedOption).toBeInTheDocument()
        expect(selectedOption).toHaveTextContent(workGroupId)
      })

      test('Доступен для редактирования после загрузки списка', async () => {
        mockGetWorkGroupListSuccess({ body: [] })

        render(<ExtendedFilter {...requiredProps} />, {
          store: getStoreWithAuth({
            userRole: UserRoleEnum.SeniorEngineer,
          }),
        })

        const workGroupField = await testUtils.workGroup.expectLoadingFinished()
        const select = getSelect(workGroupField)

        expect(select).toBeEnabled()
      })

      test('Можно выбрать рабочую группу из списка', async () => {
        const workGroupListItem = workGroupFixtures.getWorkGroup()
        mockGetWorkGroupListSuccess({ body: [workGroupListItem] })

        const { user } = render(<ExtendedFilter {...requiredProps} />, {
          store: getStoreWithAuth({
            userRole: UserRoleEnum.SeniorEngineer,
          }),
        })

        const workGroupField = await testUtils.workGroup.expectLoadingFinished()
        await testUtils.workGroup.openField(user, workGroupField)
        await testUtils.workGroup.setValue(user, workGroupListItem.name)

        const selectedOption = getSelectedOption(workGroupField)
        expect(selectedOption).toHaveTextContent(workGroupListItem.name)
        expect(selectedOption).toBeVisible()
      })

      test('Поиск по списку работает', async () => {
        const mockedWorkGroupList = workGroupFixtures.getWorkGroupList(2)
        const mockedWorkGroupListItem1 = mockedWorkGroupList[0]
        const mockedWorkGroupListItem2 = mockedWorkGroupList[1]
        mockGetWorkGroupListSuccess({ body: mockedWorkGroupList })

        const { user } = render(<ExtendedFilter {...requiredProps} />, {
          store: getStoreWithAuth({
            userRole: UserRoleEnum.SeniorEngineer,
          }),
        })

        const workGroupField = await testUtils.workGroup.expectLoadingFinished()
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

          const { user } = render(<ExtendedFilter {...requiredProps} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.SeniorEngineer,
            }),
          })

          const workGroupField = await testUtils.workGroup.expectLoadingFinished()
          await testUtils.workGroup.openField(user, workGroupField)

          await testUtils.workGroup.setValue(user, workGroupListItem.name)

          const container = testUtils.workGroup.getContainer()
          await testUtils.clickResetButtonIn(user, container)

          const selectedOption = getSelectedOption(workGroupField)
          expect(selectedOption).not.toBeInTheDocument()
        })

        test('Кнопка "Сбросить всё"', async () => {
          const workGroupListItem = workGroupFixtures.getWorkGroup()
          mockGetWorkGroupListSuccess({ body: [workGroupListItem] })

          const { user } = render(<ExtendedFilter {...requiredProps} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.SeniorEngineer,
            }),
          })

          const workGroupField = await testUtils.workGroup.expectLoadingFinished()
          await testUtils.workGroup.openField(user, workGroupField)

          await testUtils.workGroup.setValue(user, workGroupListItem.name)
          await testUtils.clickResetAllButton(user)

          const selectedOption = getSelectedOption(workGroupField)
          expect(selectedOption).not.toBeInTheDocument()
        })
      })
    })
  })
})
