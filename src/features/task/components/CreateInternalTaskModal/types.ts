import { FormInstance } from 'antd'
import { UploadFile } from 'antd/es/upload'
import { TaskModel } from 'features/task/models'
import { UsersModel } from 'features/user/api/dto'
import { MatchedUserPermissions } from 'features/user/types'
import { WorkTypesModel } from 'features/warehouse/models'
import { Moment } from 'moment-timezone'

import { BaseModalProps } from 'components/Modals/BaseModal'

import { WorkGroupsCatalogDTO } from 'shared/catalogs/api/dto/workGroups'
import { IdType } from 'shared/types/common'
import { SetNonNullable } from 'shared/types/utils'

export type CreateInternalTaskModalProps = SetNonNullable<
  BaseModalProps,
  'open' | 'onCancel' | 'confirmLoading'
> &
  Pick<TaskModel, 'recordId' | 'olaNextBreachTime'> & {
    permissions: MatchedUserPermissions

    onSubmit: (
      values: CreateInternalTaskFormFields,
      form: FormInstance<CreateInternalTaskFormFields>,
    ) => Promise<void>

    onChangeWorkGroup: (value: IdType) => void

    workGroups: WorkGroupsCatalogDTO
    workGroupsIsLoading: boolean

    workTypes: WorkTypesModel
    workTypesIsLoading: boolean

    users: UsersModel
    usersIsLoading: boolean

    observers: UsersModel
    observersIsLoading: boolean

    executors: UsersModel
    executorsIsLoading: boolean
  }

export type CreateInternalTaskFormFields = {
  olaNextBreachDate: Moment
  olaNextBreachTime: Moment
  title: string
  description: string

  workGroup?: IdType
  assignee?: IdType
  isPrivate?: boolean
  attachments?: UploadFile[]
  coExecutors?: IdType[]
  observers?: IdType[]
  workType?: IdType
}
