import { GetNomenclatureListQueryArgs } from 'modules/warehouse/models'

export const defaultGetNomenclatureListParams: Pick<NonNullable<GetNomenclatureListQueryArgs>, 'limit'> = {
  limit: 999999,
}
