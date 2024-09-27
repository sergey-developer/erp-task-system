import { Form } from 'antd'

import ChangeInfrastructureOrderFormTable from 'modules/infrastructures/components/ChangeInfrastructureOrderFormTable'

import { props } from '_tests_/features/infrastructures/components/ChangeInfrastructurePage/constants'
import { changeInfrastructureOrderFormTableTestUtils } from '_tests_/features/infrastructures/components/ChangeInfrastructurePage/testUtils'
import { buttonTestUtils, render } from '_tests_/utils'

describe('Таблица добавления работ к бланк-заказу', () => {
  describe('Кнопка добавить работы', () => {
    test('Отображается и активна', () => {
      render(
        <Form>
          <ChangeInfrastructureOrderFormTable {...props} />
        </Form>,
      )

      const button = buttonTestUtils.getButtonIn(
        changeInfrastructureOrderFormTableTestUtils.getContainer(),
        /Добавить работы/,
      )

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Неактивна, если текущий пользователь не назначен менеджером по сопровождению', () => {
      render(
        <Form>
          <ChangeInfrastructureOrderFormTable {...{ ...props, managerIsCurrentUser: false }} />
        </Form>,
      )

      const button = buttonTestUtils.getButtonIn(
        changeInfrastructureOrderFormTableTestUtils.getContainer(),
        /Добавить работы/,
      )

      expect(button).toBeDisabled()
    })
  })
})
