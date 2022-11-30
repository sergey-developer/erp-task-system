import { render, setupApiTests } from '_tests_/utils'

import SubTaskListTab from '../index'
import { requiredProps } from './constants'

setupApiTests()

describe('Вкладка списка подзадач', () => {
  describe('Кнопка создания задания', () => {
    test('Отображается', () => {
      render(<SubTaskListTab {...requiredProps} />)
    })

    test('Активна если все условия соблюдены', () => {})

    describe('Не активна если все условия соблюдены', () => {
      test('Но текущий пользователь не является исполнителем заявки', () => {})

      test('Но статус заявки не - "В процессе"', () => {})

      test('Но тип заявки не "Incident" и не "Request"', () => {})
    })
  })
})
