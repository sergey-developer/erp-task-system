import { screen, within } from '@testing-library/react'

import { IdType } from 'shared/types/common'

const getContainer = (id: IdType) => screen.getByTestId(`journal-entry-${id}`)

const queryContainer = (id: IdType) => screen.queryByTestId(`journal-entry-${id}`)

const getChildByText = (id: IdType, text: string) => within(getContainer(id)).getByText(text)

const queryChildByText = (id: IdType, text: string) => within(getContainer(id)).queryByText(text)

export const journalEntryTestUtils = {
  getContainer,
  queryContainer,
  getChildByText,
  queryChildByText,
}
