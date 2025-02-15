import { GetNomenclaturesRequest } from 'features/warehouses/api/dto'

export const defaultGetNomenclaturesRequestParams: Pick<
  NonNullable<GetNomenclaturesRequest>,
  'limit'
> = {
  limit: 999999,
}
