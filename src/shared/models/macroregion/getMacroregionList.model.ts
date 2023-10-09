import { IdType } from 'shared/types/common'
import { MaybeUndefined } from 'shared/types/utils'

import { MacroregionListModel } from './macroregionList.model'

export type GetMacroregionListQueryArgs = MaybeUndefined<Partial<{ customers: IdType[] }>>
export type GetMacroregionListSuccessResponse = MacroregionListModel
