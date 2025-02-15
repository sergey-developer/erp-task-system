import { FormInstance, ModalProps } from 'antd'
import { TaskDetailDTO } from 'features/tasks/api/dto'
import { MatchedUserPermissions } from 'features/users/types'

import { IdType } from 'shared/types/common'

export type TaskSecondLineFormFields = {
  workGroup: IdType
  workType?: IdType
  markAsDefault?: boolean
  comment?: string
}

export type TaskSecondLineModalProps = Pick<TaskDetailDTO, 'id' | 'recordId' | 'type'> & {
  permissions: MatchedUserPermissions
  isLoading: boolean

  onSubmit: (
    values: TaskSecondLineFormFields,
    setFields: FormInstance<TaskSecondLineFormFields>['setFields'],
  ) => Promise<void>
  onCancel: NonNullable<ModalProps['onCancel']>
}
