import { GetNomenclatureListQueryArgs } from 'modules/warehouse/models'

export const defaultGetNomenclaturesParams: Pick<
  NonNullable<GetNomenclatureListQueryArgs>,
  'limit'
> = {
  limit: 999999,
}
