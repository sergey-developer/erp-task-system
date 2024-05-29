import { InventorizationModel } from 'modules/warehouse/models'

import { ArrayFirst } from 'shared/types/utils'

type GroupNomenclaturesResult = Record<
  ArrayFirst<InventorizationModel['nomenclatures']>['title'],
  InventorizationModel['nomenclatures']
>

export const groupNomenclatures = (
  nomenclatures: InventorizationModel['nomenclatures'],
): GroupNomenclaturesResult =>
  nomenclatures.reduce<GroupNomenclaturesResult>((acc, nomenclature) => {
    if (acc[nomenclature.group.title]) {
      acc[nomenclature.group.title].push(nomenclature)
    } else {
      acc[nomenclature.group.title] = [nomenclature]
    }

    return acc
  }, {})
