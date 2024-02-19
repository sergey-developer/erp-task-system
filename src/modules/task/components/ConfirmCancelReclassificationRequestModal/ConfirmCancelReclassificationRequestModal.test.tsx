import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { buttonTestUtils, render } from '_tests_/utils'

import ConfirmCancelReclassificationRequestModal, {
  ConfirmCancelReclassificationRequestModalProps,
} from './index'

const props: ConfirmCancelReclassificationRequestModalProps = {
  open: true,
  confirmLoading: false,
  onOk: jest.fn(),
  onCancel: jest.fn(),
}

const getContainer = () => screen.getByTestId('confirm-cancel-reclassification-request-modal')
const findContainer = () => screen.findByTestId('confirm-cancel-reclassification-request-modal')

const getConfirmButton = () => buttonTestUtils.getButtonIn(getContainer(), /ok/i)
const clickConfirmButton = async (user: UserEvent) => {
  const button = getConfirmButton()
  await user.click(button)
}

export const testUtils = {
  getContainer,
  findContainer,

  getConfirmButton,
  clickConfirmButton,
}

describe('Модалка подтверждения отмены запрос на переклассификацию', () => {
  test('Отображается', () => {
    render(<ConfirmCancelReclassificationRequestModal {...props} />)

    const title = within(testUtils.getContainer()).getByText('Отменить запрос на переклассификацию')
    const description = within(testUtils.getContainer()).getByText(
      'Вы уверены, что хотите отменить запрос на переклассификацию?',
    )

    expect(title).toBeInTheDocument()
    expect(description).toBeInTheDocument()
  })

  test('При клике на кнопку подтверждения вызывается обработчик', async () => {
    const { user } = render(<ConfirmCancelReclassificationRequestModal {...props} />)
    await testUtils.clickConfirmButton(user)
    expect(props.onOk).toBeCalledTimes(1)
  })
})
