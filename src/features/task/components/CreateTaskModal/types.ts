import { FormInstance } from 'antd'
import { UploadFile } from 'antd/es/upload'
import { TaskTypeEnum } from 'features/task/constants/task'
import { UsersModel } from 'features/user/models'
import { MatchedUserPermissions } from 'features/user/types'
import { CustomerListModel, WorkTypesModel } from 'features/warehouse/models'
import { Moment } from 'moment-timezone'

import { BaseModalProps } from 'components/Modals/BaseModal'

import { LocationsCatalogModel } from 'shared/catalogs/api/dto/locations'
import { WorkGroupsCatalogDTO } from 'shared/catalogs/api/dto/workGroups'
import { IdType } from 'shared/types/common'
import { SetNonNullable } from 'shared/types/utils'

export type CreateTaskModalProps = SetNonNullable<
  BaseModalProps,
  'open' | 'onCancel' | 'confirmLoading'
> & {
  permissions: MatchedUserPermissions

  onSubmit: (
    values: CreateTaskFormFields,
    form: FormInstance<CreateTaskFormFields>,
  ) => Promise<void>

  onChangeType: (value: CreateTaskFormFields['type']) => void

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

  customers: CustomerListModel
  customersIsLoading: boolean

  locations: LocationsCatalogModel
  locationsIsLoading: boolean
}

export type CreateTaskFormFields = {
  type: TaskTypeEnum.Request | TaskTypeEnum.Incident
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
  customer?: IdType
  contactType?: string
  email?: string
  shopId?: IdType
  address?: string
}
