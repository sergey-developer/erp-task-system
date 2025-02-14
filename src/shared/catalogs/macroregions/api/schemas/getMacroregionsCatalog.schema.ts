import { MacroregionsCatalogDTO } from 'shared/catalogs/macroregions/api/dto'
import { IdType } from 'shared/types/common'

export type GetMacroregionsCatalogRequest = Partial<{
  customers: IdType[]
  warehouses: IdType[]
}>

export type GetMacroregionsCatalogResponse = MacroregionsCatalogDTO
