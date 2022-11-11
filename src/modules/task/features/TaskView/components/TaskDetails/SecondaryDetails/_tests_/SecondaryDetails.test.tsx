import { render } from '_tests_/utils'

import { getWorkGroup } from '../../WorkGroup/_tests_/utils'
import SecondaryDetails from '../index'
import { requiredProps } from './constants'

describe('Блок детальной информации заявки', () => {
  describe('Блок рабочей группы', () => {
    test('Отображается', () => {
      render(<SecondaryDetails {...requiredProps} />)

      expect(getWorkGroup()).toBeInTheDocument()
    })
  })
})
