import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { MaybeNull, NumberOrString } from 'shared/types/utils'

import { iconTestUtils, tableTestUtils } from '_tests_/utils'

import { TestIdsEnum } from './constants'

const getContainer = () => screen.getByTestId(TestIdsEnum.Table)
const getRow = (id: number) => tableTestUtils.getRowById(getContainer(), id)
const getColTitle = (text: string) => within(getContainer()).getByText(text)
const getColValue = (id: number, value: NumberOrString): MaybeNull<HTMLElement> => {
  const row = getRow(id)
  return row ? within(row).getByText(value) : null
}

// icon is credited
const getIsCreditedIcon = (name: 'check-circle' | 'exclamation-circle') =>
  iconTestUtils.getIconByNameIn(getContainer(), name)

const queryIsCreditedIcon = (name: 'check-circle' | 'exclamation-circle') =>
  iconTestUtils.queryIconByNameIn(getContainer(), name)

// edit icon
const getEditIcon = () => iconTestUtils.getIconByNameIn(getContainer(), 'edit')
const clickEditIcon = async (user: UserEvent) => user.click(getEditIcon())

// loading
const expectLoadingStarted = () => tableTestUtils.expectLoadingStarted(getContainer())
const expectLoadingFinished = () => tableTestUtils.expectLoadingFinished(getContainer())

export const checkInventorizationEquipmentsTableTestUtils = {
  getContainer,
  getRow,
  getColTitle,
  getColValue,

  getEditIcon,
  clickEditIcon,

  getIsCreditedIcon,
  queryIsCreditedIcon,

  expectLoadingStarted,
  expectLoadingFinished,
}
