import { IdType } from 'shared/types/common'

import { MacroregionsCatalogDTO } from './macroregionsCatalog.dto'

export type GetMacroregionsCatalogQueryArgs = Partial<{
  customers: IdType[]
  warehouses: IdType[]
}>

export type GetMacroregionsCatalogSuccessResponse = MacroregionsCatalogDTO
