import sortBy from 'lodash/sortBy'

import { UsersGroupsModel, UsersModel } from 'modules/user/models'

import { locationTypeDict } from 'shared/constants/catalogs'
import { LocationsModel } from 'shared/models/catalogs/location'
import { IdType } from 'shared/types/common'

import {
  LocationOption,
  LocationOptionGroup,
  UserGroupOption,
  UserGroupOptionGroup,
  UserOption,
} from './types'

export const makeLocationOptions = (data: LocationsModel): LocationOptionGroup[] =>
  data
    .reduce<LocationOptionGroup[]>((acc, loc) => {
      const optionGroup = acc.find((item) => item.type === loc.type)
      const option: LocationOption = {
        label: loc.title,
        value: loc.id,
        type: loc.type,
      }

      optionGroup
        ? optionGroup.options!.push(option)
        : acc.push({ label: locationTypeDict[loc.type], type: loc.type, options: [option] })

      return acc
    }, [])
    .map((group) => ({ ...group, options: sortBy(group.options, 'label') }))

export const makeUserGroupOptions = (
  users: UsersModel,
  usersGroups: UsersGroupsModel,
  usersIdsExclude?: IdType[],
): UserGroupOptionGroup[] => {
  const usersOptions = users.reduce<UserOption[]>((acc, user) => {
    const opt = { label: user.fullName, value: user.id }
    if (usersIdsExclude?.length) {
      if (!usersIdsExclude.includes(user.id)) {
        acc.push(opt)
      }
    } else {
      acc.push(opt)
    }
    return acc
  }, [])

  const usersGroupsOptions = usersGroups.map<UserGroupOption>((group) => ({
    label: group.title,
    users: usersIdsExclude?.length
      ? group.users.filter((usrId) => !usersIdsExclude.includes(usrId))
      : group.users,
    value: `${group.id}-${group.title}`,
  }))

  const options = []
  if (usersOptions.length)
    options.push({ label: 'Пользователи', options: usersOptions, value: 'Пользователи' })

  if (usersGroupsOptions.length)
    options.push({ label: 'Группы', options: usersGroupsOptions, value: 'Группы' })

  return options
}

export const collectUsersIds = async (options: UserGroupOption[]): Promise<IdType[]> => {
  const usersIds: IdType[] = []

  options.forEach((opt) => {
    if (opt.users) {
      if (opt.users.length) {
        opt.users.forEach((usr) => {
          const usrId = usersIds.find((id) => id === usr)
          if (!usrId) usersIds.push(usr)
        })
      }
    } else if (typeof opt.value === 'number') {
      const usrId = usersIds.find((id) => id === opt.value)
      if (!usrId) usersIds.push(opt.value)
    }
  })

  return usersIds
}
