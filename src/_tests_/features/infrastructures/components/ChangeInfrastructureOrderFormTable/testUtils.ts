import { screen } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { buttonTestUtils, tableTestUtils } from '_tests_/utils'

import { TestIdsEnum } from './constants'

const getContainer = () =>
  screen.getByTestId(TestIdsEnum.ChangeInfrastructureOrderFormTableContainer)
const findContainer = () =>
  screen.findByTestId(TestIdsEnum.ChangeInfrastructureOrderFormTableContainer)

const getRowByRole = () => tableTestUtils.getOneRowByRole(getContainer())

// add order form works button
const getAddOrderFormWorksButton = () =>
  buttonTestUtils.getButtonIn(getContainer(), /Добавить работы/)
const clickAddOrderFormWorksButton = async (user: UserEvent) =>
  user.click(getAddOrderFormWorksButton())

// delete order form works button
const getDeleteOrderFormWorksButton = (row: HTMLElement) =>
  buttonTestUtils.getButtonIn(row, 'delete')

const clickDeleteOrderFormWorksButton = async (user: UserEvent, row: HTMLElement) =>
  user.click(getDeleteOrderFormWorksButton(row))

export const changeInfrastructureOrderFormTableTestUtils = {
  getContainer,
  findContainer,

  getRowByRole,

  getAddOrderFormWorksButton,
  clickAddOrderFormWorksButton,

  getDeleteOrderFormWorksButton,
  clickDeleteOrderFormWorksButton,
}
