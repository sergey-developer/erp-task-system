import { render } from '_tests_/utils'

import DescriptionTab from '../index'
import { notRequiredProps, requiredProps } from './constants'
import testUtils from './utils'

describe('Вкладка описания заявки', () => {
  test('Заголовок отображается', () => {
    render(<DescriptionTab {...requiredProps} />)

    const title = testUtils.getByTextInTab(requiredProps.title)
    expect(title).toBeInTheDocument()
  })

  describe('Описание', () => {
    test('Отображается если присутствует', () => {
      render(
        <DescriptionTab
          {...requiredProps}
          description={notRequiredProps.description}
        />,
      )

      const description = testUtils.getByTextInTab(
        notRequiredProps.description!,
      )
      expect(description).toBeInTheDocument()
    })

    test('Не отображается если отсутствует', () => {
      render(<DescriptionTab {...requiredProps} />)

      const description = testUtils.queryByTextInTab(
        notRequiredProps.description!,
      )
      expect(description).not.toBeInTheDocument()
    })
  })
})
