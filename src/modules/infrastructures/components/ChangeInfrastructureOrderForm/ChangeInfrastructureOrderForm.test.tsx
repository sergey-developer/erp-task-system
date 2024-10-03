import { Form } from 'antd'

import ChangeInfrastructureOrderForm from 'modules/infrastructures/components/ChangeInfrastructureOrderForm/index'

import { props } from '_tests_/features/infrastructures/components/ChangeInfrastructureOrderForm/constants'
import { changeInfrastructureOrderFormTableTestUtils } from '_tests_/features/infrastructures/components/ChangeInfrastructureOrderFormTable/testUtils'
import { confirmDeleteInfrastructureWorkTypeModalTestUtils } from '_tests_/features/infrastructures/components/ConfirmDeleteInfrastructureWorkTypeModal/testUtils'
import { render } from '_tests_/utils'

describe('Форма добавления работ к бланк-заказу', () => {
  describe('Таблица добавления работ к бланк-заказу', () => {
    describe('Удаление работ', () => {
      test('После подтверждения удаления вызывается запрос, работа удаляется из бланк-заказа и модалка закрывается', async () => {
        const { user } = render(
          <Form>
            <ChangeInfrastructureOrderForm {...props} />
          </Form>,
        )

        await changeInfrastructureOrderFormTableTestUtils.findContainer()
        await changeInfrastructureOrderFormTableTestUtils.clickAddOrderFormWorksButton(user)

        const row = changeInfrastructureOrderFormTableTestUtils.getRowByRole()

        await changeInfrastructureOrderFormTableTestUtils.clickDeleteOrderFormWorksButton(user, row)

        const modal = await confirmDeleteInfrastructureWorkTypeModalTestUtils.findContainer()

        await confirmDeleteInfrastructureWorkTypeModalTestUtils.clickConfirmButton(user)

        expect(row).not.toBeInTheDocument()
        expect(modal).not.toBeInTheDocument()
      })
    })
  })
})
