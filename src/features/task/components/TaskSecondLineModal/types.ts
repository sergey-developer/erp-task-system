import { FormInstance, ModalProps } from 'antd'

import { TaskModel } from 'features/task/models'
import { MatchedUserPermissions } from 'features/users/types'

import { IdType } from 'shared/types/common'

export type TaskSecondLineFormFields = {
  workGroup: IdType
  workType?: IdType
  markAsDefault?: boolean
  comment?: string
}

export type TaskSecondLineModalProps = Pick<TaskModel, 'id' | 'recordId' | 'type'> & {
  permissions: MatchedUserPermissions
  isLoading: boolean

  onSubmit: (
    values: TaskSecondLineFormFields,
    setFields: FormInstance<TaskSecondLineFormFields>['setFields'],
  ) => Promise<void>
  onCancel: NonNullable<ModalProps['onCancel']>
}
