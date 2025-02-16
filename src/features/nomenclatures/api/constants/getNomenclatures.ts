import { GetNomenclaturesRequest } from 'features/nomenclatures/api/schemas'

export const defaultGetNomenclaturesRequestParams: Pick<
  NonNullable<GetNomenclaturesRequest>,
  'limit'
> = {
  limit: 999999,
}
