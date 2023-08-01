import { screen } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { fakeWord, getButtonIn, render } from '_tests_/utils'

import FilterBlockLabel, { FilterBlockLabelProps } from './index'

const requiredProps: Readonly<FilterBlockLabelProps> = {
  label: fakeWord(),
  onReset: jest.fn(),
}

const getContainer = () => screen.getByTestId('filter-block-label')

// reset button
const getResetButton = () => getButtonIn(getContainer(), /сбросить/i)

const clickResetButton = async (user: UserEvent) => {
  const button = getResetButton()
  await user.click(button)
}

const testUtils = {
  getResetButton,
  clickResetButton,
}

describe('FilterBlockLabel', () => {
  test('Заголовок отображается корректно', () => {
    render(<FilterBlockLabel {...requiredProps} />)

    const label = screen.getByRole('heading', { name: requiredProps.label })
    expect(label).toBeInTheDocument()
  })

  describe('Кнопка "Сбросить"', () => {
    test('Отображается корректно', () => {
      render(<FilterBlockLabel {...requiredProps} />)

      const button = testUtils.getResetButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Обработчик вызывается корректно', async () => {
      const { user } = render(<FilterBlockLabel {...requiredProps} />)

      await testUtils.clickResetButton(user)
      expect(requiredProps.onReset).toBeCalledTimes(1)
    })
  })
})
