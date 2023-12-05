import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { testUtils as equipmentsByFileTemplateTableTestUtils } from 'modules/warehouse/components/EquipmentsByFileTemplateTable/EquipmentsByFileTemplateTable.test'

import { ADD_TEXT, CANCEL_TEXT } from 'shared/constants/common'

import { buttonTestUtils, render } from '_tests_/utils'

import CreateEquipmentsByFileTemplateModal, {
  CreateEquipmentsByFileTemplateModalProps,
} from './index'

const props: CreateEquipmentsByFileTemplateModalProps = {
  open: true,
  data: [],
  onOk: jest.fn(),
  onCancel: jest.fn(),
}

const getContainer = () => screen.getByTestId('create-equipments-by-file-template-modal')
const findContainer = () => screen.findByTestId('create-equipments-by-file-template-modal')

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
    render(<CreateEquipmentsByFileTemplateModal {...props} />)
    const title = within(testUtils.getContainer()).getByText('Оборудование из Excel')
    expect(title).toBeInTheDocument()
  })

  test('Таблица отображается', () => {
    render(<CreateEquipmentsByFileTemplateModal {...props} />)
    const table = equipmentsByFileTemplateTableTestUtils.getContainer()
    expect(table).toBeInTheDocument()
  })

  describe('Кнопка добавления', () => {
    test('Отображается', () => {
      render(<CreateEquipmentsByFileTemplateModal {...props} />)

      const button = testUtils.getAddButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('При клике вызывается обработчик', async () => {
      const { user } = render(<CreateEquipmentsByFileTemplateModal {...props} />)
      await testUtils.clickAddButton(user)
      expect(props.onOk).toBeCalledTimes(1)
    })
  })

  describe('Кнопка отмены', () => {
    test('Отображается', () => {
      render(<CreateEquipmentsByFileTemplateModal {...props} />)

      const button = testUtils.getCancelButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('При клике вызывается обработчик', async () => {
      const { user } = render(<CreateEquipmentsByFileTemplateModal {...props} />)
      await testUtils.clickCancelButton(user)
      expect(props.onCancel).toBeCalledTimes(1)
    })
  })
})
