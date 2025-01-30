import { AxiosResponse } from 'axios'

import { GetInventorizationEquipmentsXlsxSuccessResponse } from 'features/warehouse/models'

export type GetInventorizationEquipmentsXlsxTransformedSuccessResponse = {
  value: GetInventorizationEquipmentsXlsxSuccessResponse
  meta?: { response?: AxiosResponse }
}
