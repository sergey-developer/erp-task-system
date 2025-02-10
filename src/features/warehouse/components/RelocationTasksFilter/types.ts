import { UsersModel } from 'features/user/api/dto'
import {
  RelocationTaskStatusEnum,
  RelocationTaskTypeEnum,
} from 'features/warehouse/constants/relocationTask'
import { Moment } from 'moment-timezone'

import { DrawerFilterProps } from 'components/Filters/DrawerFilter'

import { LocationsCatalogDTO } from 'shared/catalogs/api/dto/locations'
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

  locations: LocationsCatalogDTO
  locationsIsLoading: boolean

  onApply: (values: RelocationTasksFilterFormFields) => void
}
