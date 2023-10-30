import sortBy from 'lodash/sortBy'

import { locationDict } from 'shared/constants/catalogs'
import { LocationListModel } from 'shared/models/catalogs/location'

import { LocationOption } from './types'

export const makeLocationOptions = (data: LocationListModel): LocationOption[] =>
  data
    .reduce<LocationOption[]>((acc, loc) => {
      const optionGroup = acc.find((item) => item.type === loc.type)
      const option: LocationOption = {
        label: loc.title,
        value: loc.id,
        type: loc.type,
      }

      optionGroup
        ? optionGroup.options!.push(option)
        : acc.push({ label: locationDict[loc.type], type: loc.type, options: [option] })

      return acc
    }, [])
    .map((group) => ({ ...group, options: sortBy(group.options, 'label') }))
