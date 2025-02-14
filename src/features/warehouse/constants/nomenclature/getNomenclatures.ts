import { GetNomenclatureListRequest } from 'features/warehouse/models'

export const defaultGetNomenclaturesParams: Pick<
  NonNullable<GetNomenclatureListRequest>,
  'limit'
> = {
  limit: 999999,
}
