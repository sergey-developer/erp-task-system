import { GetNomenclatureListQueryArgs } from 'features/warehouse/models'

export const defaultGetNomenclaturesParams: Pick<
  NonNullable<GetNomenclatureListQueryArgs>,
  'limit'
> = {
  limit: 999999,
}
