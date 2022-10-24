import { generateString, render, screen } from '_tests_/utils'
import { within } from '@testing-library/react'

import TaskFirstLineModal from '../index'
import { TaskFirstLineModalProps } from '../interfaces'

const baseProps: TaskFirstLineModalProps = {
  recordId: generateString(),
  isLoading: false,
  onSubmit: jest.fn(),
  onCancel: jest.fn(),
}

const getModal = () => screen.getByTestId('modal-task-first-line')

const getDescription = () =>
  within(getModal()).getByRole('textbox', {
    name: 'Причина возврата',
  })

describe('Модалка перевода запроса на первую линию', () => {
  test('Заголовок отображается корректно', () => {
    render(<TaskFirstLineModal {...baseProps} />)

    const modal = getModal()
    const recordId = within(modal).getByText(baseProps.recordId)

    expect(recordId).toBeInTheDocument()
  })

  describe('Форма перевода заявки', () => {
    describe('Поле ввода причины возврата', () => {
      test('Отображается корректно', () => {
        render(<TaskFirstLineModal {...baseProps} />)

        const description = getDescription()

        expect(description).toBeInTheDocument()
        expect(description).toBeEnabled()
        expect(description).not.toHaveValue()
      })
    })
  })
})
