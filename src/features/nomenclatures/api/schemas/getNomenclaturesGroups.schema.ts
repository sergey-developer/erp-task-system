import { FilterParams } from 'shared/types/filter'
import { MaybeUndefined } from 'shared/types/utils'

import { NomenclaturesGroupsDTO } from '../dto'

export type GetNomenclaturesGroupsRequest = MaybeUndefined<FilterParams>
export type GetNomenclaturesGroupsResponse = NomenclaturesGroupsDTO
