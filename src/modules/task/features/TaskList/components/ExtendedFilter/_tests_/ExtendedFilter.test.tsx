import { Form } from 'antd'

import { generateId, render, screen, waitFor, within } from '_tests_/utils'
import { getStoreWithAuth } from '_tests_/utils/auth'
import { taskStatusDict } from 'modules/task/constants/dict'
import { UserRolesEnum } from 'shared/constants/roles'

import { initialExtendedFilterFormValues } from '../../TaskListPage/constants'
import { searchQueriesDict } from '../constants'
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
} from './utils'

const onClose = jest.fn()
const onSubmit = jest.fn()

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
    test('Отображается корректно', () => {
      render(<ExtendedFilterWrapper visible />)

      Object.values(taskStatusDict).forEach((statusText) => {
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

      Object.values(taskStatusDict).forEach((statusText) => {
        const checkbox = getCheckbox(new RegExp(statusText))
        expect(checkbox).toBeEnabled()
      })
    })
  })

  describe('По периоду выполнения', () => {
    test('Отображается корректно', () => {
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
  })

  describe('По столбцу', () => {
    test('Отображается корректно', () => {
      render(<ExtendedFilterWrapper visible />)

      Object.values(searchQueriesDict).forEach((value) => {
        const radioButton = getRadioButton(value)
        expect(radioButton).toBeInTheDocument()
      })

      const keywordField = getKeywordField()
      expect(keywordField).toBeInTheDocument()
    })

    test('Имеет корректные значения по умолчанию', () => {
      render(<ExtendedFilterWrapper visible />)

      const searchByTitle = getRadioButton(searchQueriesDict.searchByTitle)
      const searchByName = getRadioButton(searchQueriesDict.searchByName)
      const searchByAssignee = getRadioButton(
        searchQueriesDict.searchByAssignee,
      )

      expect(searchByTitle.value).toBe('searchByTitle')
      expect(searchByName.value).toBe('searchByName')
      expect(searchByAssignee.value).toBe('searchByAssignee')

      expect(searchByTitle).toBeChecked()
      expect(searchByName).not.toBeChecked()
      expect(searchByAssignee).not.toBeChecked()

      const keywordField = getKeywordField()
      expect(keywordField).not.toHaveValue()
    })

    test('Доступен для редактирования', () => {
      render(<ExtendedFilterWrapper visible />)

      Object.values(searchQueriesDict).forEach((value) => {
        const radioButton = getRadioButton(value)
        expect(radioButton).toBeEnabled()
      })

      const keywordField = getKeywordField()
      expect(keywordField).toBeEnabled()
    })
  })

  describe('По рабочей группе', () => {
    describe(`Для роли ${UserRolesEnum.FirstLineSupport}`, () => {
      test('Не отображается', () => {
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
      test('Отображается корректно', () => {
        const store = getStoreWithAuth({
          userId: generateId(),
          userRole: UserRolesEnum.SeniorEngineer,
        })

        render(<ExtendedFilterWrapper visible />, { store })

        const workGroupField = getWorkGroupField()

        expect(workGroupField).toBeInTheDocument()
        expect(
          within(workGroupField).getByRole('combobox', { expanded: false }),
        ).toBeInTheDocument()
      })

      test('Имеет корректные значения по умолчанию', () => {
        const store = getStoreWithAuth({
          userId: generateId(),
          userRole: UserRolesEnum.SeniorEngineer,
        })

        render(<ExtendedFilterWrapper visible />, { store })

        const workGroupField = getWorkGroupField()

        expect(
          within(workGroupField).getByText('Рабочая группа'),
        ).toBeInTheDocument()
      })

      test('Доступен для редактирования', async () => {
        const store = getStoreWithAuth({
          userId: generateId(),
          userRole: UserRolesEnum.SeniorEngineer,
        })

        render(<ExtendedFilterWrapper visible />, { store })

        const workGroupField = getWorkGroupField()

        await waitFor(() => {
          expect(within(workGroupField).getByRole('combobox')).toBeEnabled()
        })
      })
    })

    describe(`Для роли ${UserRolesEnum.HeadOfDepartment}`, () => {
      test('Отображается корректно', () => {
        const store = getStoreWithAuth({
          userId: generateId(),
          userRole: UserRolesEnum.HeadOfDepartment,
        })

        render(<ExtendedFilterWrapper visible />, { store })

        const workGroupField = getWorkGroupField()

        expect(workGroupField).toBeInTheDocument()
        expect(
          within(workGroupField).getByRole('combobox', { expanded: false }),
        ).toBeInTheDocument()
      })

      test('Имеет корректные значения по умолчанию', () => {
        const store = getStoreWithAuth({
          userId: generateId(),
          userRole: UserRolesEnum.HeadOfDepartment,
        })

        render(<ExtendedFilterWrapper visible />, { store })

        const workGroupField = getWorkGroupField()

        expect(
          within(workGroupField).getByText('Рабочая группа'),
        ).toBeInTheDocument()
      })

      test('Доступен для редактирования', async () => {
        const store = getStoreWithAuth({
          userId: generateId(),
          userRole: UserRolesEnum.HeadOfDepartment,
        })

        render(<ExtendedFilterWrapper visible />, { store })

        const workGroupField = getWorkGroupField()

        await waitFor(() => {
          expect(within(workGroupField).getByRole('combobox')).toBeEnabled()
        })
      })
    })
  })
})
