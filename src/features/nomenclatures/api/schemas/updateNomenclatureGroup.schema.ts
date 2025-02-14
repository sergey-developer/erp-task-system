import { IdType } from 'shared/types/common'

import { NomenclaturesGroupDTO } from '../dto'
import { GetNomenclaturesGroupsRequest } from './getNomenclaturesGroups.schema'

export type UpdateNomenclatureGroupRequest = {
  id: IdType
  title: string
  getListParams: GetNomenclaturesGroupsRequest
}

export type UpdateNomenclatureGroupResponse = Pick<NomenclaturesGroupDTO, 'id' | 'title'>

export type UpdateNomenclatureGroupBadRequestResponse = Partial<
  Omit<UpdateNomenclatureGroupRequest, 'getListParams' | 'id'>
>
