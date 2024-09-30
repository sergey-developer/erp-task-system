import sortBy from 'lodash/sortBy'

import { locationTypeDict } from 'shared/constants/catalogs'
import { LocationsCatalogModel } from 'shared/models/catalogs/locations'
import { IdType } from 'shared/types/common'

import { ExecutorOption, LocationOption, LocationOptionGroup } from './types'

export const makeLocationOptions = (data: LocationsCatalogModel): LocationOptionGroup[] =>
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

export const collectUsersIds = async (
  options: ExecutorOption[],
  excludeIds: (IdType | string)[],
): Promise<ExecutorOption['value'][]> => {
  const usersIds: ExecutorOption['value'][] = []

  options.forEach((opt) => {
    if (opt.users) {
      if (opt.users.length) {
        opt.users.forEach((usr) => {
          if (!excludeIds.includes(usr)) {
            const usrId = usersIds.find((id) => id === usr)
            if (!usrId) usersIds.push(usr)
          }
        })
      }
    } else {
      if (!excludeIds.includes(opt.value)) {
        const usrId = usersIds.find((id) => id === opt.value)
        if (!usrId) usersIds.push(opt.value)
      }
    }
  })

  return usersIds
}
