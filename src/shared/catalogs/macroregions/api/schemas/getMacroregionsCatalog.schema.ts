import { MacroregionsCatalogDTO } from 'shared/catalogs/macroregions/api/dto'
import { IdType } from 'shared/types/common'

export type GetMacroregionsCatalogQueryArgs = Partial<{
  customers: IdType[]
  warehouses: IdType[]
}>

export type GetMacroregionsCatalogSuccessResponse = MacroregionsCatalogDTO
