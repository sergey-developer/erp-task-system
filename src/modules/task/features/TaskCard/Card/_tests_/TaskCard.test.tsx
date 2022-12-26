import { render } from '_tests_/utils'

import secondaryDetailsTestUtils from '../../SecondaryDetails/_tests_/utils'
import TaskCard from '../index'
import { requiredProps } from './constants'

describe('Детальная карточка заявки', () => {
  describe('Блок вторичной детальной информации заявки', () => {
    test('Отображается', async () => {
      render(<TaskCard {...requiredProps} />)
      expect(secondaryDetailsTestUtils.getContainer()).toBeInTheDocument()
    })
  })
})
