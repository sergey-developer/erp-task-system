import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { IdType } from 'shared/types/common'
import { MaybeNull, NumberOrString } from 'shared/types/utils'

import { TestIdsEnum } from '_tests_/features/warehouse/components/NomenclatureTable/constants'
import { iconTestUtils, tableTestUtils } from '_tests_/utils'

const getContainer = () => screen.getByTestId(TestIdsEnum.NomenclatureTable)
const getChildByText = (text: string) => within(getContainer()).getByText(text)
const queryChildByText = (text: string) => within(getContainer()).queryByText(text)

const getRow = (id: IdType) => tableTestUtils.getRowById(getContainer(), id)
const getHeadCell = (text: string) => {
  // eslint-disable-next-line testing-library/no-node-access
  return getChildByText(text).parentElement?.parentElement!
}

const getColTitle = getChildByText
const queryColTitle = queryChildByText

const clickColTitle = async (user: UserEvent, title: string) => {
  const col = getColTitle(title)
  await user.click(col)
}

const getColValue = (id: IdType, value: NumberOrString): MaybeNull<HTMLElement> => {
  const row = getRow(id)
  return row ? within(row).getByText(value) : null
}

// loading
const expectLoadingStarted = () => iconTestUtils.expectLoadingStartedIn(getContainer())
const expectLoadingFinished = () => iconTestUtils.expectLoadingFinishedIn(getContainer())

export const nomenclatureTableTestUtils = {
  getContainer,
  getRow,
  getChildByText,
  queryChildByText,
  getHeadCell,
  getColTitle,
  getColValue,
  queryColTitle,
  clickColTitle,

  expectLoadingStarted,
  expectLoadingFinished,
}
