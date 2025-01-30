import { SupportGroupModel } from 'features/supportGroup/models'

export type TaskSupportGroupModel = Pick<SupportGroupModel, 'id' | 'name'> & {
  hasResolutionClassifiers: boolean
}
