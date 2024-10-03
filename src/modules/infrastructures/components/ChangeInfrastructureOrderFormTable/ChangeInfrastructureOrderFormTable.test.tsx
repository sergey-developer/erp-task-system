import { Form } from 'antd'

import ChangeInfrastructureOrderFormTable from 'modules/infrastructures/components/ChangeInfrastructureOrderFormTable'

import { props } from '_tests_/features/infrastructures/components/ChangeInfrastructureOrderFormTable/constants'
import { changeInfrastructureOrderFormTableTestUtils } from '_tests_/features/infrastructures/components/ChangeInfrastructureOrderFormTable/testUtils'
import { render } from '_tests_/utils'

describe('Таблица добавления работ к бланк-заказу', () => {
  describe('Кнопка добавить работы', () => {
    test('Отображается и активна', () => {
      render(
        <Form>
          <ChangeInfrastructureOrderFormTable {...props} />
        </Form>,
      )

      const button = changeInfrastructureOrderFormTableTestUtils.getAddOrderFormWorksButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Неактивна, если текущий пользователь не назначен менеджером по сопровождению', () => {
      render(
        <Form>
          <ChangeInfrastructureOrderFormTable {...props} managerIsCurrentUser={false} />
        </Form>,
      )

      const button = changeInfrastructureOrderFormTableTestUtils.getAddOrderFormWorksButton()

      expect(button).toBeDisabled()
    })
  })

  describe('Кнопка удаления работ', () => {
    test('При нажатии вызывается обработчик', async () => {
      const { user } = render(
        <Form>
          <ChangeInfrastructureOrderFormTable {...props} />
        </Form>,
      )

      await changeInfrastructureOrderFormTableTestUtils.clickAddOrderFormWorksButton(user)

      const row = changeInfrastructureOrderFormTableTestUtils.getRowByRole()

      await changeInfrastructureOrderFormTableTestUtils.clickDeleteOrderFormWorksButton(user, row)

      expect(props.onClickDeleteInfrastructureWorkType).toBeCalledTimes(1)
      expect(props.onClickDeleteInfrastructureWorkType).toBeCalledWith({
        id: undefined,
        rowIndex: 0,
      })
    })
  })
})
