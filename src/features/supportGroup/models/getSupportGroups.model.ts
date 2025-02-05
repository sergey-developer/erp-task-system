import { IdType } from 'shared/types/common'
import { MaybeUndefined } from 'shared/types/utils'

import { SupportGroupListModel } from './supportGroups.model'

export type GetSupportGroupListQueryArgs = MaybeUndefined<
  Partial<{
    hasTemplate: boolean
    assignedToUser: boolean
    customers: IdType[]
    macroregions: IdType[]
  }>
>

export type GetSupportGroupListSuccessResponse = SupportGroupListModel
