import { within } from '@testing-library/react'

import { props } from '_tests_/features/infrastructure/components/InfrastructureStatusHistoryModal/constants'
import { infrastructureStatusHistoryModalTestUtils } from '_tests_/features/infrastructure/components/InfrastructureStatusHistoryModal/testUtils'
import { infrastructureStatusHistoryTableTestUtils } from '_tests_/features/infrastructure/components/InfrastructureStatusHistoryTable/testUtils'
import { buttonTestUtils, render } from '_tests_/utils'

import InfrastructureStatusHistoryModal from './index'

describe('Модалка с историей изменения статусов', () => {
  test('Отображает заголовок модалки и кнопку закрыть', () => {
    render(<InfrastructureStatusHistoryModal {...props} />)
    const modal = infrastructureStatusHistoryModalTestUtils.getContainer()
    const title = within(modal).getByText('История статусов')
    expect(title).toBeInTheDocument()
  })

  test('Отображает кнопку закрыть и при клике вызывается обработчик', async () => {
    const { user } = render(<InfrastructureStatusHistoryModal {...props} />)
    const modal = infrastructureStatusHistoryModalTestUtils.getContainer()
    const button = buttonTestUtils.getButtonIn(modal, 'Закрыть')
    expect(button).toBeInTheDocument()
    expect(button).toBeEnabled()
    await user.click(button)
    expect(props.onOk).toBeCalledTimes(1)
  })

  test('Отображает таблицу', () => {
    render(<InfrastructureStatusHistoryModal {...props} />)
    const table = infrastructureStatusHistoryTableTestUtils.getContainer()
    expect(table).toBeInTheDocument()
  })
})
