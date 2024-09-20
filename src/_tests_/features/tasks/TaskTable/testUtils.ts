import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { IdType } from 'shared/types/common'
import { NumberOrString } from 'shared/types/utils'

import { iconTestUtils, tableTestUtils } from '_tests_/utils/index'

const getContainer = () => screen.getByTestId('task-table')
const getChildByText = (text: string) => within(getContainer()).getByText(text)
const queryChildByText = (text: string) => within(getContainer()).queryByText(text)
const getRow = (id: IdType) => tableTestUtils.getRowById(getContainer(), id)
const clickRow = async (user: UserEvent, id: IdType) =>
  tableTestUtils.clickRowById(getContainer(), user, id)

const getHeadCol = (text: string) => {
  // eslint-disable-next-line testing-library/no-node-access
  return getChildByText(text).parentElement?.parentElement!
}

const getColTitle = getChildByText
const queryColTitle = queryChildByText

const clickColTitle = async (user: UserEvent, text: string) => {
  const col = getChildByText(text)
  await user.click(col)
  return col
}

const getPaginationContainer = () => within(getContainer()).getByRole('list')

const getPaginationNextButton = () =>
  within(getPaginationContainer()).getByRole('button', {
    name: 'right',
  })

const clickPaginationNextButton = async (user: UserEvent) => {
  const button = getPaginationNextButton()
  await user.click(button)
  return button
}

const getPaginationPrevButton = () =>
  within(getPaginationContainer()).getByRole('button', { name: 'left' })

const clickPaginationPrevButton = async (user: UserEvent) => {
  const button = getPaginationPrevButton()
  await user.click(button)
  return button
}

const getPaginationPageButton = (pageNumber: string) =>
  within(getPaginationContainer()).getByRole('listitem', { name: pageNumber })

const clickPaginationPageButton = async (user: UserEvent, pageNumber: string) => {
  const button = getPaginationPageButton(pageNumber)
  await user.click(button)
  return button
}

const getPageSizeOptionsContainer = (container: HTMLElement) =>
  // eslint-disable-next-line testing-library/no-node-access
  container.querySelector('.rc-virtual-list') as HTMLElement

const getPageSizeOption = (container: HTMLElement, pageSize: NumberOrString) =>
  within(container).getByText(`${pageSize} / стр.`)

const openPageSizeOptions = async (user: UserEvent, container: HTMLElement) => {
  const button = within(container).getByRole('combobox', {
    expanded: false,
  })

  await user.click(button)
}

const changePageSize = async (user: UserEvent, pageSize: NumberOrString) => {
  const pagination = getPaginationContainer()
  await openPageSizeOptions(user, pagination)
  const pageSizeOption = getPageSizeOption(getPageSizeOptionsContainer(pagination), pageSize)
  await user.click(pageSizeOption)

  return pageSizeOption
}

const expectLoadingStarted = async () => {
  const table = getContainer()
  await iconTestUtils.expectLoadingStartedIn(table)
  return table
}

const expectLoadingFinished = async () => {
  const table = getContainer()
  await iconTestUtils.expectLoadingFinishedIn(table)
  return table
}

export const taskTableTestUtils = {
  getContainer,
  getRow,
  clickRow,
  getChildByText,
  queryChildByText,
  getHeadCol,
  getColTitle,
  queryColTitle,
  getPaginationContainer,
  getPaginationNextButton,
  getPaginationPrevButton,
  getPaginationPageButton,
  getPageSizeOptionsContainer,
  getPageSizeOption,

  clickColTitle,
  clickPaginationNextButton,
  clickPaginationPrevButton,
  clickPaginationPageButton,
  openPageSizeOptions,
  changePageSize,

  expectLoadingStarted,
  expectLoadingFinished,
}
