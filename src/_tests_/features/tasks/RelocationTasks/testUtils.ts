import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { IdType } from 'shared/types/common'

import { buttonTestUtils, fakeWord } from '_tests_/utils'

import { TestIdsEnum } from './constants'

const getContainer = () => screen.getByTestId(TestIdsEnum.RelocationTasks)

// list item
const getListItem = (id: IdType) =>
  within(getContainer()).getByTestId(`relocation-tasks-item-${id}`)

const getChildInListItem = (id: IdType, text: string | RegExp) =>
  within(getListItem(id)).getByText(text)

const clickListItem = async (user: UserEvent, id: IdType) => {
  const item = getListItem(id)
  await user.click(item)
}

// documents
const getCreateDocumentsButton = (id: IdType) =>
  buttonTestUtils.getButtonIn(getListItem(id), /Добавить вложение/)

const setDocument = async (
  id: IdType,
  user: UserEvent,
  file: File = new File([], fakeWord(), { type: 'image/png' }),
) => {
  const listItem = getListItem(id)
  // eslint-disable-next-line testing-library/no-node-access
  const input = listItem.querySelector('input[type="file"]') as HTMLInputElement
  await user.upload(input, file)
  return { input, file }
}

const getUploadedDocument = (filename: string, id: IdType) =>
  within(getListItem(id)).getByTitle(filename)

export const relocationTasksTestUtils = {
  getContainer,

  getListItem,
  getChildInListItem,
  clickListItem,

  getCreateDocumentsButton,
  setDocument,
  getUploadedDocument,
}
