import { NomenclaturesGroupDTO } from '../dto'
import { GetNomenclaturesGroupsRequest } from './getNomenclaturesGroups.schema'

export type CreateNomenclatureGroupRequest = {
  title: string
  getListParams: GetNomenclaturesGroupsRequest
}

export type CreateNomenclatureGroupResponse = Pick<NomenclaturesGroupDTO, 'id' | 'title'>

export type CreateNomenclatureGroupBadRequestResponse = Partial<
  Omit<CreateNomenclatureGroupRequest, 'getListParams'>
>
