import { render } from '_tests_/utils'

import TaskDetails from '../index'
import { getSecondaryDetails } from '../SecondaryDetails/_tests_/utils'
import { requiredProps } from './constants'

describe('Детальная карточка заявки', () => {
  describe('SecondaryDetails / Блок детальной информации заявки', () => {
    test('Отображается', async () => {
      render(<TaskDetails {...requiredProps} />)

      expect(getSecondaryDetails()).toBeInTheDocument()
    })
  })
})
