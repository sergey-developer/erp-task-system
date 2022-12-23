import { TableAction } from 'antd/es/table/interface'

import { loadingFinishedByIconIn, loadingStartedByIconIn } from '_tests_/utils'
import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import { NumberOrString } from 'shared/interfaces/utils'

import { paginationConfig } from '../constants/pagination'
import testConstants from './constants'

const getTable = () => screen.getByTestId('table-task-list')

const getRow = (id: number) =>
  getTable().querySelector(`[data-row-key='${id}']`)

const userClickRow = async (user: UserEvent, id: number) => {
  const row = getRow(id)
  await user.click(row!)
  return row
}

const getTextInTable = (text: string) => within(getTable()).getByText(text)

const getHeadCol = (text: string) => {
  return getTextInTable(text).parentElement?.parentElement!
}

const userClickColTitle = async (user: UserEvent, text: string) => {
  const col = getTextInTable(text)
  await user.click(col)
  return col
}

const getPaginationContainer = () => within(getTable()).getByRole('list')

const getPaginationNextButton = () =>
  within(getPaginationContainer()).getByRole('button', {
    name: 'right',
  })

const userClickPaginationNextButton = async (user: UserEvent) => {
  const button = getPaginationNextButton()
  await user.click(button)
  return button
}

const getPaginationPrevButton = () =>
  within(getPaginationContainer()).getByRole('button', {
    name: 'left',
  })

const userClickPaginationPrevButton = async (user: UserEvent) => {
  const button = getPaginationPrevButton()
  await user.click(button)
  return button
}

const getPaginationPageButton = (pageNumber: string) =>
  within(getPaginationContainer()).getByRole('listitem', { name: pageNumber })

const userClickPaginationPageButton = async (
  user: UserEvent,
  pageNumber: string,
) => {
  const button = getPaginationPageButton(pageNumber)
  await user.click(button)
  return button
}

const getPageSizeOptionsContainer = (container: HTMLElement) =>
  container.querySelector('.rc-virtual-list') as HTMLElement

const getPageSizeOption = (container: HTMLElement, pageSize: NumberOrString) =>
  within(container).getByText(`${pageSize} / стр.`)

const userOpenPageSizeOptions = async (
  user: UserEvent,
  container: HTMLElement,
) => {
  const button = within(container).getByRole('combobox', {
    expanded: false,
  })

  await user.click(button)
}

const userChangePageSize = async (
  user: UserEvent,
  pageSize: NumberOrString,
) => {
  const pagination = getPaginationContainer()
  await userOpenPageSizeOptions(user, pagination)
  const pageSizeOption = getPageSizeOption(
    getPageSizeOptionsContainer(pagination),
    pageSize,
  )
  await user.click(pageSizeOption)

  return pageSizeOption
}

const loadingStarted = async () => {
  const taskTable = getTable()
  await loadingStartedByIconIn(taskTable)
  return taskTable
}

const loadingFinished = async () => {
  const taskTable = getTable()
  await loadingFinishedByIconIn(taskTable)
  return taskTable
}

const onChangeTableArgs = {
  pagination: (config: typeof testConstants.paginationProps) => ({
    ...paginationConfig,
    ...config,
  }),
  extra: (action: TableAction, dataSource: Readonly<Array<any>>) => ({
    action,
    currentDataSource: dataSource,
  }),
}

const utils = {
  getTable,
  getRow,
  userClickRow,
  getTextInTable,
  getHeadCol,
  getPaginationContainer,
  getPaginationNextButton,
  getPaginationPrevButton,
  getPaginationPageButton,
  getPageSizeOptionsContainer,
  getPageSizeOption,

  userClickColTitle,
  userClickPaginationNextButton,
  userClickPaginationPrevButton,
  userClickPaginationPageButton,
  userOpenPageSizeOptions,
  userChangePageSize,

  loadingStarted,
  loadingFinished,

  onChangeTableArgs,
}

export default utils
