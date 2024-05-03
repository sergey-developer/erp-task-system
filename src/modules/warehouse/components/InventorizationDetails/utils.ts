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
    if (!acc[nomenclature.nomenclaturesGroup.title]) {
      acc[nomenclature.nomenclaturesGroup.title] = [nomenclature]
    } else {
      acc[nomenclature.nomenclaturesGroup.title].push(nomenclature)
    }

    return acc
  }, {})
