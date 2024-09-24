import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { IdType } from 'shared/types/common'
import { MaybeNull, NumberOrString } from 'shared/types/utils'

import { buttonTestUtils, tableTestUtils } from '_tests_/utils/index'

import { TestIdsEnum } from './constants'

const getContainer = () => screen.getByTestId(TestIdsEnum.RelocationEquipmentTable)

const getRow = (id: IdType) => tableTestUtils.getRowById(getContainer(), id)

const getHeadCell = (text: string) => tableTestUtils.getHeadCell(getContainer(), text)

const getColTitle = (text: string) => within(getContainer()).getByText(text)

const getColValue = (id: IdType, value: NumberOrString): MaybeNull<HTMLElement> => {
  const row = getRow(id)
  return row ? within(row).getByText(value) : null
}

// images col
const getViewImagesButton = (id: IdType) => buttonTestUtils.getButtonIn(getRow(id), 'Посмотреть')
const clickViewImagesButton = async (user: UserEvent, id: IdType) => {
  const button = getViewImagesButton(id)
  await user.click(button)
}

// loading
const expectLoadingStarted = () => tableTestUtils.expectLoadingStarted(getContainer())

const expectLoadingFinished = async (): Promise<HTMLElement> => {
  const container = getContainer()
  await tableTestUtils.expectLoadingFinished(container)
  return container
}

export const relocationEquipmentTableTestUtils = {
  getContainer,
  getRow,
  getHeadCell,
  getColTitle,
  getColValue,

  getViewImagesButton,
  clickViewImagesButton,

  expectLoadingStarted,
  expectLoadingFinished,
}
