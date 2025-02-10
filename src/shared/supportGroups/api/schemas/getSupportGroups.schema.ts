import { IdType } from 'shared/types/common'
import { MaybeUndefined } from 'shared/types/utils'

import { SupportGroupsDTO } from '../dto'

export type GetSupportGroupsQueryArgs = MaybeUndefined<
  Partial<{
    hasTemplate: boolean
    assignedToUser: boolean
    customers: IdType[]
    macroregions: IdType[]
  }>
>

export type GetSupportGroupsSuccessResponse = SupportGroupsDTO
