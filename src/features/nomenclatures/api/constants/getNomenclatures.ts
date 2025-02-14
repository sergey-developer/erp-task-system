import { GetNomenclaturesRequest } from 'features/warehouse/models'

export const defaultGetNomenclaturesRequestParams: Pick<
  NonNullable<GetNomenclaturesRequest>,
  'limit'
> = {
  limit: 999999,
}
