import { render } from '_tests_/utils'

import assigneeTestUtils from '../../TaskAssignee/_tests_/utils'
import { testUtils as workGroupTestUtils } from '../../WorkGroup/WorkGroup.test'
import SecondaryDetails from '../index'
import { requiredProps } from './constants'
import secondaryDetailsTestUtils from './utils'

describe('Блок детальной информации заявки', () => {
  test('Отображается', () => {
    render(<SecondaryDetails {...requiredProps} />)
    expect(secondaryDetailsTestUtils.getContainer()).toBeInTheDocument()
  })

  describe('Блок исполнителя', () => {
    test('Отображается', () => {
      render(<SecondaryDetails {...requiredProps} />)
      expect(assigneeTestUtils.getContainer()).toBeInTheDocument()
    })
  })

  describe('Блок рабочей группы', () => {
    test('Отображается', () => {
      render(<SecondaryDetails {...requiredProps} />)
      expect(workGroupTestUtils.getContainer()).toBeInTheDocument()
    })
  })
})
