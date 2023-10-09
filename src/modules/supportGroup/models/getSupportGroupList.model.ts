import { MaybeUndefined } from 'shared/types/utils'

import { SupportGroupListModel } from './supportGroupList.model'

export type GetSupportGroupListQueryArgs = MaybeUndefined<
  Partial<{
    hasTemplate: boolean
  }>
>

export type GetSupportGroupListSuccessResponse = SupportGroupListModel
