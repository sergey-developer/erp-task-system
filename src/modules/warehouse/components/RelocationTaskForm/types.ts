import { ReactNode } from 'react'

import { UserListModel } from 'modules/user/models'

import { LocationListItemModel, LocationListModel } from 'shared/models/catalogs/location'
import { IdType } from 'shared/types/common'

export type LocationOption = {
  type: LocationListItemModel['type']
  label?: ReactNode
  value?: IdType
  options?: LocationOption[]
}

export type RelocationTaskFormProps = {
  isLoading: boolean

  userList: UserListModel
  userListIsLoading: boolean

  locationList: LocationListModel
  locationListIsLoading: boolean

  onChangeRelocateFrom: (value: IdType, option: LocationOption) => void
  onChangeRelocateTo: (option: LocationOption) => void
}
