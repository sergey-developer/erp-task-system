import { render } from '_tests_/utils'

import TaskDetails from '../index'
import secondaryDetailsTestUtils from '../SecondaryDetails/_tests_/utils'
import { requiredProps } from './constants'

describe('Детальная карточка заявки', () => {
  describe('Блок вторичной детальной информации заявки', () => {
    test('Отображается', async () => {
      render(<TaskDetails {...requiredProps} />)
      expect(secondaryDetailsTestUtils.getContainer()).toBeInTheDocument()
    })
  })
})
