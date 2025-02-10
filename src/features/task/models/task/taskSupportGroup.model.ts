import { SupportGroupDTO } from 'shared/supportGroups/api/dto'

export type TaskSupportGroupModel = Pick<SupportGroupDTO, 'id' | 'name'> & {
  hasResolutionClassifiers: boolean
}
