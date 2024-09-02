import { FormInstance } from 'antd'
import { UploadFile } from 'antd/es/upload'
import { Moment } from 'moment-timezone'

import { TaskTypeEnum } from 'modules/task/constants/task'
import { UsersModel } from 'modules/user/models'
import { MatchedUserPermissions } from 'modules/user/types'
import { CustomerListModel, WorkTypesModel } from 'modules/warehouse/models'

import { BaseModalProps } from 'components/Modals/BaseModal'

import { LocationsCatalogModel } from 'shared/models/catalogs/locations'
import { WorkGroupsCatalogModel } from 'shared/models/catalogs/workGroups'
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
  coExecutors?: IdType
  observers?: IdType
  workType?: IdType
  customer?: IdType
  contactType?: string
  email?: string
  sapId?: IdType
  address?: string
}
