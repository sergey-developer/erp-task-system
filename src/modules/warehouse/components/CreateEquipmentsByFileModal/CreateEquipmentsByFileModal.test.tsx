import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { testUtils as equipmentsByFileTableTestUtils } from 'modules/warehouse/components/EquipmentsByFileTable/EquipmentsByFileTable.test'

import { ADD_TEXT, CANCEL_TEXT } from 'shared/constants/common'

import { buttonTestUtils, render } from '_tests_/utils'

import CreateEquipmentsByFileModal, { CreateEquipmentsByFileModalProps } from './index'

const props: CreateEquipmentsByFileModalProps = {
  open: true,
  data: [],
  errors: undefined,

  onCreate: jest.fn(),
  isCreating: false,

  onEdit: jest.fn(),

  onCancel: jest.fn(),
}

const getContainer = () => screen.getByTestId('create-equipments-by-file-modal')
const findContainer = () => screen.findByTestId('create-equipments-by-file-modal')

const getAddButton = () => buttonTestUtils.getButtonIn(getContainer(), new RegExp(ADD_TEXT))
const clickAddButton = async (user: UserEvent) => {
  const button = getAddButton()
  await user.click(button)
}

const getCancelButton = () => buttonTestUtils.getButtonIn(getContainer(), CANCEL_TEXT)
const clickCancelButton = async (user: UserEvent) => {
  const button = getCancelButton()
  await user.click(button)
}

export const testUtils = {
  getContainer,
  findContainer,

  getAddButton,
  clickAddButton,

  getCancelButton,
  clickCancelButton,
}

describe('Модалка создания оборудования по шаблону файла', () => {
  test('Заголовок отображается', () => {
    render(<CreateEquipmentsByFileModal {...props} />)
    const title = within(testUtils.getContainer()).getByText('Оборудование из Excel')
    expect(title).toBeInTheDocument()
  })

  test('Таблица отображается', () => {
    render(<CreateEquipmentsByFileModal {...props} />)
    const table = equipmentsByFileTableTestUtils.getContainer()
    expect(table).toBeInTheDocument()
  })

  describe('Кнопка добавления', () => {
    test('Отображается', () => {
      render(<CreateEquipmentsByFileModal {...props} />)

      const button = testUtils.getAddButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('При клике вызывается обработчик', async () => {
      const { user } = render(<CreateEquipmentsByFileModal {...props} />)
      await testUtils.clickAddButton(user)
      expect(props.onCreate).toBeCalledTimes(1)
    })
  })

  describe('Кнопка отмены', () => {
    test('Отображается', () => {
      render(<CreateEquipmentsByFileModal {...props} />)

      const button = testUtils.getCancelButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('При клике вызывается обработчик', async () => {
      const { user } = render(<CreateEquipmentsByFileModal {...props} />)
      await testUtils.clickCancelButton(user)
      expect(props.onCancel).toBeCalledTimes(1)
    })
  })
})
