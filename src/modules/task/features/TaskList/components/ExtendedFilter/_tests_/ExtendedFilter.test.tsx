import { Form } from 'antd'

import { render, screen } from '_tests_/utils'
import { taskStatusDict } from 'modules/task/constants/dict'

import { initialExtendedFilterFormValues } from '../../TaskListPage/constants'
import { searchQueriesDict } from '../constants'
import ExtendedFilter, { ExtendedFilterProps } from '../index'
import {
  getApplyButton,
  getCheckbox,
  getCloseButton,
  getRadioButton,
  getResetAllButton,
} from './utils'

const ExtendedFilterWrapper = (props: Omit<ExtendedFilterProps, 'form'>) => {
  const [form] = Form.useForm()

  return <ExtendedFilter form={form} {...props} />
}

const onClose = jest.fn()
const onSubmit = jest.fn()

describe('Расширенный фильтр', () => {
  afterEach(() => {
    onClose.mockReset()
    onSubmit.mockReset()
  })

  test('Отображается при передаче нужных данных', () => {
    render(
      <ExtendedFilterWrapper
        visible
        onClose={onClose}
        onSubmit={onSubmit}
        initialFormValues={initialExtendedFilterFormValues}
      />,
    )

    const filter = screen.getByTestId('filter-extended')
    expect(filter).toBeInTheDocument()
  })

  test('Не отображается если не передать нужные данные', () => {
    render(
      <ExtendedFilterWrapper
        visible={false}
        onClose={onClose}
        onSubmit={onSubmit}
        initialFormValues={initialExtendedFilterFormValues}
      />,
    )

    const filter = screen.queryByTestId('filter-extended')
    expect(filter).not.toBeInTheDocument()
  })

  describe('Корректно отображает', () => {
    test('header', () => {
      render(
        <ExtendedFilterWrapper
          visible
          onClose={onClose}
          onSubmit={onSubmit}
          initialFormValues={initialExtendedFilterFormValues}
        />,
      )

      const title = screen.getByText('Фильтры')
      const closeButton = getCloseButton()

      expect(title).toBeInTheDocument()
      expect(closeButton).toBeInTheDocument()
      expect(closeButton).toBeEnabled()
    })

    test('footer', () => {
      render(
        <ExtendedFilterWrapper
          visible
          onClose={onClose}
          onSubmit={onSubmit}
          initialFormValues={initialExtendedFilterFormValues}
        />,
      )

      expect(getApplyButton()).toBeInTheDocument()
      expect(getResetAllButton()).toBeInTheDocument()
    })

    describe('Фильтр по', () => {
      test('Статусу', () => {
        render(
          <ExtendedFilterWrapper
            visible
            onClose={onClose}
            onSubmit={onSubmit}
            initialFormValues={initialExtendedFilterFormValues}
          />,
        )

        Object.entries(taskStatusDict).forEach(([status, statusText]) => {
          const checkbox = getCheckbox(new RegExp(statusText))
          expect(checkbox).toBeInTheDocument()
          expect(checkbox).toBeEnabled()
          expect(checkbox).not.toBeChecked()
          expect(checkbox.value).toBe(status)
        })
      })

      test('Периоду выполнения', () => {
        render(
          <ExtendedFilterWrapper
            visible
            onClose={onClose}
            onSubmit={onSubmit}
            initialFormValues={initialExtendedFilterFormValues}
          />,
        )

        const startDateField = screen.getByPlaceholderText('Начальная дата')
        const endDateField = screen.getByPlaceholderText('Конечная дата')

        expect(startDateField).toBeInTheDocument()
        expect(startDateField).toBeEnabled()
        expect(startDateField).not.toHaveValue()

        expect(endDateField).toBeInTheDocument()
        expect(endDateField).toBeEnabled()
        expect(endDateField).not.toHaveValue()
      })
    })
  })

  // то что выше сделать как написано ниже

  describe('По столбцу', () => {
    test('Отображается корректно', () => {
      render(
        <ExtendedFilterWrapper
          visible
          onClose={onClose}
          onSubmit={onSubmit}
          initialFormValues={initialExtendedFilterFormValues}
        />,
      )

      Object.values(searchQueriesDict).forEach((value) => {
        const radioButton = getRadioButton(value)
        expect(radioButton).toBeInTheDocument()
      })

      const searchInput = screen.getByPlaceholderText('Ключевое слово')
      expect(searchInput).toBeInTheDocument()
    })

    test('Имеет корректные значения по умолчанию', () => {
      render(
        <ExtendedFilterWrapper
          visible
          onClose={onClose}
          onSubmit={onSubmit}
          initialFormValues={initialExtendedFilterFormValues}
        />,
      )

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

      const searchInput = screen.getByPlaceholderText('Ключевое слово')
      expect(searchInput).not.toHaveValue()
    })

    test('Все поля доступны для редактирования', () => {
      render(
        <ExtendedFilterWrapper
          visible
          onClose={onClose}
          onSubmit={onSubmit}
          initialFormValues={initialExtendedFilterFormValues}
        />,
      )

      Object.values(searchQueriesDict).forEach((value) => {
        const radioButton = getRadioButton(value)
        expect(radioButton).toBeEnabled()
      })

      const searchInput = screen.getByPlaceholderText('Ключевое слово')
      expect(searchInput).toBeEnabled()
    })
  })
})
