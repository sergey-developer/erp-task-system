import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { CANCEL_TEXT } from 'shared/constants/common'

import { buttonTestUtils, render } from '_tests_/utils'

import ConfirmTransferDraftRelocationTaskToWorkModal, {
  ConfirmTransferDraftRelocationTaskToWorkModalProps,
} from './index'

const props: ConfirmTransferDraftRelocationTaskToWorkModalProps = {
  open: true,
  isLoading: false,
  onCancel: jest.fn(),
  onConfirm: jest.fn(),
}

const getContainer = () =>
  screen.getByTestId('confirm-transfer-draft-relocation-task-to-work-modal')

const findContainer = () =>
  screen.findByTestId('confirm-transfer-draft-relocation-task-to-work-modal')

// confirm button
const getConfirmButton = () => buttonTestUtils.getButtonIn(getContainer(), /Подтвердить/)
const clickConfirmButton = async (user: UserEvent) => user.click(getConfirmButton())

// cancel button
const getCancelButton = () => buttonTestUtils.getButtonIn(getContainer(), CANCEL_TEXT)
const clickCancelButton = async (user: UserEvent) => user.click(getCancelButton())

export const testUtils = {
  getContainer,
  findContainer,

  getConfirmButton,
  clickConfirmButton,

  getCancelButton,
  clickCancelButton,

  expectLoadingStarted: () => buttonTestUtils.expectLoadingStarted(getConfirmButton()),
  expectLoadingFinished: () => buttonTestUtils.expectLoadingFinished(getConfirmButton()),
}

describe('Модалка подтверждения перевода черновика заявки на перемещение в работу', () => {
  test('Заголовок и описание отображается', () => {
    render(<ConfirmTransferDraftRelocationTaskToWorkModal {...props} />)

    const container = getContainer()
    const title = within(container).getByText('Перевести черновик в работу')
    const description1 = within(container).getByText(
      'Вы уверены, что хотите перевести черновик в работу?',
    )
    const description2 = within(container).getByText('Заявку на перемещение нельзя будет удалить')

    expect(title).toBeInTheDocument()
    expect(description1).toBeInTheDocument()
    expect(description2).toBeInTheDocument()
  })

  describe('Кнопка подтверждения', () => {
    test('Отображается и активна', () => {
      render(<ConfirmTransferDraftRelocationTaskToWorkModal {...props} />)

      const button = testUtils.getConfirmButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('При клике обработчик вызывается', async () => {
      const { user } = render(<ConfirmTransferDraftRelocationTaskToWorkModal {...props} />)
      await testUtils.clickConfirmButton(user)
      expect(props.onConfirm).toBeCalledTimes(1)
    })
  })

  describe('Кнопка отмены', () => {
    test('Отображается и активна', () => {
      render(<ConfirmTransferDraftRelocationTaskToWorkModal {...props} />)

      const button = testUtils.getCancelButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('При клике обработчик вызывается', async () => {
      const { user } = render(<ConfirmTransferDraftRelocationTaskToWorkModal {...props} />)
      await testUtils.clickCancelButton(user)
      expect(props.onCancel).toBeCalledTimes(1)
    })
  })
})
