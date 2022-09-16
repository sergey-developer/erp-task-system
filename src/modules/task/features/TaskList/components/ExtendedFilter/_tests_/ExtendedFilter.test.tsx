import { Form } from 'antd'

import { render, screen } from '_tests_/utils'
import { taskStatusDict } from 'modules/task/constants/dict'

import { initialExtendedFilterFormValues } from '../../TaskListPage/constants'
import ExtendedFilter, { ExtendedFilterProps } from '../index'
import { getCheckbox, getCloseButton, getFilterBlockLabel } from './utils'

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

  test('Не отображается если нужные данные не переданы', () => {
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

      const applyButton = screen.getByRole('button', { name: 'Применить' })
      const resetAllButton = screen.getByRole('button', {
        name: 'Сбросить все',
      })

      expect(applyButton).toBeInTheDocument()
      expect(resetAllButton).toBeInTheDocument()
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

        const { title, resetButton } = getFilterBlockLabel(
          'filter-extended-label-status',
          'Статус',
        )

        expect(title).toBeInTheDocument()
        expect(resetButton).toBeInTheDocument()

        Object.entries(taskStatusDict).forEach(([status, statusText]) => {
          const checkbox = getCheckbox(new RegExp(statusText))
          expect(checkbox).toBeInTheDocument()
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

        const { title, resetButton } = getFilterBlockLabel(
          'filter-extended-label-execution-period',
          'Период выполнения',
        )

        expect(title).toBeInTheDocument()
        expect(resetButton).toBeInTheDocument()
      })

      test('Столбцу', () => {
        render(
          <ExtendedFilterWrapper
            visible
            onClose={onClose}
            onSubmit={onSubmit}
            initialFormValues={initialExtendedFilterFormValues}
          />,
        )

        const { title, resetButton } = getFilterBlockLabel(
          'filter-extended-label-search-by-column',
          'Поиск по столбцу',
        )

        expect(title).toBeInTheDocument()
        expect(resetButton).toBeInTheDocument()
      })
    })
  })
})
