import { within } from '@testing-library/react'

import { props } from '_tests_/features/tasks/components/ConfirmCancelReclassificationRequestModal/constants'
import { confirmCancelReclassificationRequestModalTestUtils } from '_tests_/features/tasks/components/ConfirmCancelReclassificationRequestModal/testUtils'
import { render } from '_tests_/helpers'

import ConfirmCancelReclassificationRequestModal from './index'

describe('Модалка подтверждения отмены запрос на переклассификацию', () => {
  test('Отображается', () => {
    render(<ConfirmCancelReclassificationRequestModal {...props} />)

    const title = within(
      confirmCancelReclassificationRequestModalTestUtils.getContainer(),
    ).getByText('Отменить запрос на переклассификацию')
    const description = within(
      confirmCancelReclassificationRequestModalTestUtils.getContainer(),
    ).getByText('Вы уверены, что хотите отменить запрос на переклассификацию?')

    expect(title).toBeInTheDocument()
    expect(description).toBeInTheDocument()
  })

  test('При клике на кнопку подтверждения вызывается обработчик', async () => {
    const { user } = render(<ConfirmCancelReclassificationRequestModal {...props} />)
    await confirmCancelReclassificationRequestModalTestUtils.clickConfirmButton(user)
    expect(props.onOk).toBeCalledTimes(1)
  })
})
