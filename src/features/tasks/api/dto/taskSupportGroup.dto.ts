import { SupportGroupDTO } from 'shared/supportGroups/api/dto'

export type TaskSupportGroupDTO = Pick<SupportGroupDTO, 'id' | 'name'> & {
  hasResolutionClassifiers: boolean
}
