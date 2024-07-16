import { SupportGroupModel } from 'modules/supportGroup/models'

export type TaskSupportGroupModel = Pick<SupportGroupModel, 'id' | 'name'> & {
  hasResolutionClassifiers: boolean
}
