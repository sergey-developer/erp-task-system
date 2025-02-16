import { within } from '@testing-library/react'

import { props } from '_tests_/features/infrastructures/components/ConfirmDeleteInfrastructureWorkTypeModal/constants'
import { confirmDeleteInfrastructureWorkTypeModalTestUtils } from '_tests_/features/infrastructures/components/ConfirmDeleteInfrastructureWorkTypeModal/testUtils'
import { render } from '_tests_/helpers'

import ConfirmDeleteInfrastructureWorkTypeModal from './index'

describe('Модалка подтверждения удаления работ', () => {
  test('Отображается', () => {
    render(<ConfirmDeleteInfrastructureWorkTypeModal {...props} />)

    const title = within(
      confirmDeleteInfrastructureWorkTypeModalTestUtils.getContainer(),
    ).getByText('Удаление работ')
    const description = within(
      confirmDeleteInfrastructureWorkTypeModalTestUtils.getContainer(),
    ).getByText('Вы уверены, что хотите удалить данные работы?')

    expect(title).toBeInTheDocument()
    expect(description).toBeInTheDocument()
  })

  test('При клике на кнопку подтверждения вызывается обработчик', async () => {
    const { user } = render(<ConfirmDeleteInfrastructureWorkTypeModal {...props} />)

    await confirmDeleteInfrastructureWorkTypeModalTestUtils.clickConfirmButton(user)

    expect(props.onOk).toBeCalledTimes(1)
  })
})
