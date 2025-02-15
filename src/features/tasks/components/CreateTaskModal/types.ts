import { FormInstance } from 'antd'
import { UploadFile } from 'antd/es/upload'
import { TaskTypeEnum } from 'features/tasks/api/constants'
import { UsersDTO } from 'features/users/api/dto'
import { MatchedUserPermissions } from 'features/users/types'
import { CustomersModel, WorkTypesCatalogDTO } from 'features/warehouses/api/dto'
import { Moment } from 'moment-timezone'

import { BaseModalProps } from 'components/Modals/BaseModal'

import { LocationsCatalogDTO } from 'shared/catalogs/api/dto/locations'
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

  workTypes: WorkTypesCatalogDTO
  workTypesIsLoading: boolean

  users: UsersDTO
  usersIsLoading: boolean

  observers: UsersDTO
  observersIsLoading: boolean

  executors: UsersDTO
  executorsIsLoading: boolean

  customers: CustomersModel
  customersIsLoading: boolean

  locations: LocationsCatalogDTO
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
