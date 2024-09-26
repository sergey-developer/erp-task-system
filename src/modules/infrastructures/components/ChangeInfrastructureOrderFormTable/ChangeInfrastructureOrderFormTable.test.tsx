import { screen } from '@testing-library/react'
import { Form } from 'antd'

import ChangeInfrastructureOrderFormTable from 'modules/infrastructures/components/ChangeInfrastructureOrderFormTable/index'
import { ChangeInfrastructureOrderFormTableProps } from 'modules/infrastructures/components/ChangeInfrastructureOrderFormTable/types'

import { buttonTestUtils, fakeWord, render } from '_tests_/utils/index'

const props: ChangeInfrastructureOrderFormTableProps = {
  editableKeys: [],
  name: fakeWord(),

  infrastructureWorkTypes: [],

  managerIsCurrentUser: true,
}

const getContainer = () => screen.getByTestId('change-infrastructure-order-form-table-container')

describe('Таблица добавления работ к бланк-заказу', () => {
  describe('Кнопка добавить работы', () => {
    test('Отображается корректно', () => {
      render(
        <Form>
          <ChangeInfrastructureOrderFormTable {...props} />
        </Form>,
      )

      const button = buttonTestUtils.getButtonIn(getContainer(), /Добавить работы/)

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Неактивна, если текущий пользователь не назначен менеджером по сопровождению', () => {
      render(
        <Form>
          <ChangeInfrastructureOrderFormTable {...{ ...props, managerIsCurrentUser: false }} />
        </Form>,
      )

      const button = buttonTestUtils.getButtonIn(getContainer(), /Добавить работы/)

      expect(button).toBeInTheDocument()
      expect(button).toBeDisabled()
    })
  })
})
