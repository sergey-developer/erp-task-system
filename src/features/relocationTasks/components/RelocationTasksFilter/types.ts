import {
  RelocationTaskStatusEnum,
  RelocationTaskTypeEnum,
} from 'features/relocationTasks/constants'
import { UsersDTO } from 'features/users/api/dto'
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

  users: UsersDTO
  usersIsLoading: boolean

  locations: LocationsCatalogDTO
  locationsIsLoading: boolean

  onApply: (values: RelocationTasksFilterFormFields) => void
}
