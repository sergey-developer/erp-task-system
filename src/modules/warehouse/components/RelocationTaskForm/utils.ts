import sortBy from 'lodash/sortBy'

import { locationTypeDict } from 'shared/constants/catalogs'
import { LocationsModel } from 'shared/models/catalogs/location'

import { LocationOption, LocationOptionGroup } from './types'

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
