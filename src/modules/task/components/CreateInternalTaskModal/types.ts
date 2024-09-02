import { FormInstance } from 'antd'
import { UploadFile } from 'antd/es/upload'
import { Moment } from 'moment-timezone'

import { TaskModel } from 'modules/task/models'
import { UsersModel } from 'modules/user/models'
import { MatchedUserPermissions } from 'modules/user/types'
import { WorkTypesModel } from 'modules/warehouse/models'

import { BaseModalProps } from 'components/Modals/BaseModal'

import { WorkGroupsCatalogModel } from 'shared/models/catalogs/workGroups'
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

    workGroups: WorkGroupsCatalogModel
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
  coExecutors?: IdType
  observers?: IdType
  workType?: IdType
}
