import { IdType } from 'shared/types/common'

import { MacroregionsModel } from './macroregions.model'

export type GetMacroregionsQueryArgs = Partial<{ customers: IdType[] }>
export type GetMacroregionsSuccessResponse = MacroregionsModel
