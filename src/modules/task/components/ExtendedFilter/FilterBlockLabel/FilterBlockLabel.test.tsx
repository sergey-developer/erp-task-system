import { screen } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { fakeWord, getButtonIn, render } from '_tests_/utils'

import FilterBlockLabel, { FilterBlockLabelProps } from './index'

const props: Readonly<FilterBlockLabelProps> = {
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
    render(<FilterBlockLabel {...props} />)

    const label = screen.getByRole('heading', { name: props.label })
    expect(label).toBeInTheDocument()
  })

  describe('Кнопка "Сбросить"', () => {
    test('Отображается корректно', () => {
      render(<FilterBlockLabel {...props} />)

      const button = testUtils.getResetButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Обработчик вызывается корректно', async () => {
      const { user } = render(<FilterBlockLabel {...props} />)

      await testUtils.clickResetButton(user)
      expect(props.onReset).toBeCalledTimes(1)
    })
  })
})
