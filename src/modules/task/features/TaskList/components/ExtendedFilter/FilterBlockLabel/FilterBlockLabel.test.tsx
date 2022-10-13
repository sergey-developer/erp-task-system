import { render, screen } from '_tests_/utils'

import FilterBlockLabel from './index'

const labelText = 'label'
const onReset = jest.fn()

const getResetButton = (): HTMLButtonElement =>
  screen.getByRole('button', { name: 'Сбросить' })

describe('FilterBlockLabel', () => {
  test('Заголовок отображается корректно', () => {
    render(<FilterBlockLabel label={labelText} onReset={onReset} />)

    const label = screen.getByRole('heading', { name: labelText })
    expect(label).toBeInTheDocument()
  })

  describe('Кнопка "Сбросить"', () => {
    test('Отображается', () => {
      render(<FilterBlockLabel label={labelText} onReset={onReset} />)
      expect(getResetButton()).toBeInTheDocument()
    })

    test('Кликабельная', async () => {
      const { user } = render(
        <FilterBlockLabel label={labelText} onReset={onReset} />,
      )

      const button = getResetButton()
      expect(button).toBeEnabled()

      await user.click(button)
      expect(onReset).toBeCalledTimes(1)
    })
  })
})
