import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { IdType } from 'shared/types/common'
import { MaybeNull, NumberOrString } from 'shared/types/utils'

import { TestIdsEnum } from '_tests_/features/warehouse/components/EquipmentTable/constants'
import { tableTestUtils } from '_tests_/utils'

const getContainer = () => screen.getByTestId(TestIdsEnum.EquipmentTable)

const getRow = (id: IdType) => tableTestUtils.getRowById(getContainer(), id)

const clickRow = async (user: UserEvent, id: IdType) =>
  tableTestUtils.clickRowById(getContainer(), user, id)

const getHeadCell = (text: string) => tableTestUtils.getHeadCell(getContainer(), text)

const getColTitle = (text: string) => within(getContainer()).getByText(text)

const clickColTitle = async (user: UserEvent, title: string) => {
  const col = getColTitle(title)
  await user.click(col)
}

const getColValue = (id: IdType, value: NumberOrString): MaybeNull<HTMLElement> => {
  const row = getRow(id)
  return row ? within(row).getByText(value) : null
}

// loading
const expectLoadingStarted = () => tableTestUtils.expectLoadingStarted(getContainer())

const expectLoadingFinished = async (): Promise<HTMLElement> => {
  const container = getContainer()
  await tableTestUtils.expectLoadingFinished(container)
  return container
}

export const equipmentTableTestUtils = {
  getContainer,

  getRow,
  clickRow,

  getHeadCell,

  getColTitle,
  clickColTitle,
  getColValue,

  expectLoadingStarted,
  expectLoadingFinished,
}
