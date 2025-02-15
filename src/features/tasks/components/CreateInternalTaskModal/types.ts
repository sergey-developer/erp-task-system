import { FormInstance } from 'antd'
import { UploadFile } from 'antd/es/upload'
import { TaskDetailDTO } from 'features/tasks/api/dto'
import { UsersDTO } from 'features/users/api/dto'
import { MatchedUserPermissions } from 'features/users/types'
import { WorkTypesCatalogDTO } from 'features/warehouses/api/dto'
import { Moment } from 'moment-timezone'

import { BaseModalProps } from 'components/Modals/BaseModal'

import { WorkGroupsCatalogDTO } from 'shared/catalogs/api/dto/workGroups'
import { IdType } from 'shared/types/common'
import { SetNonNullable } from 'shared/types/utils'

export type CreateInternalTaskModalProps = SetNonNullable<
  BaseModalProps,
  'open' | 'onCancel' | 'confirmLoading'
> &
  Pick<TaskDetailDTO, 'recordId' | 'olaNextBreachTime'> & {
    permissions: MatchedUserPermissions

    onSubmit: (
      values: CreateInternalTaskFormFields,
      form: FormInstance<CreateInternalTaskFormFields>,
    ) => Promise<void>

    onChangeWorkGroup: (value: IdType) => void

    workGroups: WorkGroupsCatalogDTO
    workGroupsIsLoading: boolean

    workTypes: WorkTypesCatalogDTO
    workTypesIsLoading: boolean

    users: UsersDTO
    usersIsLoading: boolean

    observers: UsersDTO
    observersIsLoading: boolean

    executors: UsersDTO
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
