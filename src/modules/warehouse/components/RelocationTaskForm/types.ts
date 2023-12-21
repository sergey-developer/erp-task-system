import { ReactNode } from 'react'

import { UserListModel } from 'modules/user/models'
import { RelocationTaskTypeEnum } from 'modules/warehouse/constants/relocationTask'

import { LocationListItemModel, LocationListModel } from 'shared/models/catalogs/location'
import { IdType } from 'shared/types/common'

export type LocationOptionGroup = Pick<LocationOption, 'type' | 'label'> & {
  options: LocationOption[]
}

export type LocationOption = {
  type: LocationListItemModel['type']
  label: ReactNode
  value: IdType
}

export type RelocationTaskFormProps = {
  isLoading: boolean

  userList: UserListModel
  userListIsLoading: boolean

  relocateFromLocationList: LocationListModel
  relocateFromLocationListIsLoading: boolean
  relocateToLocationList: LocationListModel
  relocateToLocationListIsLoading: boolean

  type?: RelocationTaskTypeEnum
  onChangeType: (value: RelocationTaskTypeEnum) => void

  onChangeRelocateFrom: (value: IdType, option: LocationOption) => void
  onChangeRelocateTo: (option: LocationOption) => void
}
