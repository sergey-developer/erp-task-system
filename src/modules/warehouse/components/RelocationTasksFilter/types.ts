import { Moment } from 'moment-timezone'

import { UsersModel } from 'modules/user/models'
import {
  RelocationTaskStatusEnum,
  RelocationTaskTypeEnum,
} from 'modules/warehouse/constants/relocationTask'

import { DrawerFilterProps } from 'components/Filters/DrawerFilter'

import { LocationsCatalogModel } from 'shared/models/catalogs/locations'
import { IdType } from 'shared/types/common'

export type RelocationTasksFilterFormFields = Partial<{
  status: RelocationTaskStatusEnum[]
  type: RelocationTaskTypeEnum[]
  deadlineAt: Moment[]
  locationsFrom: IdType[]
  locationsTo: IdType[]
  executor: IdType
  controller: IdType
  createdBy: IdType
  createdAt: Moment[]
}>

export type RelocationTasksFilterProps = Pick<DrawerFilterProps, 'open' | 'onClose'> & {
  values?: RelocationTasksFilterFormFields
  initialValues: RelocationTasksFilterFormFields

  users: UsersModel
  usersIsLoading: boolean

  locations: LocationsCatalogModel
  locationsIsLoading: boolean

  onApply: (values: RelocationTasksFilterFormFields) => void
}
