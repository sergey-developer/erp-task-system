import { buttonTestUtils, modalTestUtils } from '_tests_/utils'
import { within } from '@testing-library/react'

const getContainer = modalTestUtils.getModal
const findContainer = modalTestUtils.findModal

const getDescriptionField = () =>
  within(getContainer()).getByRole('textbox', {
    name: 'Причина возврата',
  })

const getDescriptionFieldContainer = () =>
  within(getContainer()).getByTestId('field-description')

const getSubmitButton = () =>
  buttonTestUtils.getButtonIn(getContainer(), /вернуть заявку/i)

const getCancelButton = modalTestUtils.getCancelButtonFn(getContainer())

const utils = {
  getContainer,
  findContainer,
  getDescriptionField,
  getDescriptionFieldContainer,
  getSubmitButton,
  getCancelButton,
}

export default utils
