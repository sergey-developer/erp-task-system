import { IdType } from 'shared/types/common'

import { MacroregionsCatalogModel } from './macroregionsCatalog.model'

export type GetMacroregionsQueryArgs = Partial<{ customers: IdType[]; warehouses: IdType[] }>
export type GetMacroregionsSuccessResponse = MacroregionsCatalogModel
