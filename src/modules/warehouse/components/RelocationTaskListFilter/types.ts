import { Moment } from 'moment-timezone'

import { UsersModel } from 'modules/user/models'
import {
  RelocationTaskStatusEnum,
  RelocationTaskTypeEnum,
} from 'modules/warehouse/constants/relocationTask'

import { DrawerFilterProps } from 'components/Filters/DrawerFilter'

import { LocationListModel } from 'shared/models/catalogs/location'
import { IdType } from 'shared/types/common'

export type RelocationTaskListFilterFormFields = Partial<{
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

export type RelocationTaskListFilterProps = Pick<DrawerFilterProps, 'open' | 'onClose'> & {
  values?: RelocationTaskListFilterFormFields
  initialValues: RelocationTaskListFilterFormFields

  users: UsersModel
  usersIsLoading: boolean

  locations: LocationListModel
  locationsIsLoading: boolean

  onApply: (values: RelocationTaskListFilterFormFields) => void
}
