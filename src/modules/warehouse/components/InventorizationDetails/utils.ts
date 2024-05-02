import { InventorizationModel } from 'modules/warehouse/models'

import { ArrayFirst } from 'shared/types/utils'

export const groupNomenclatures = (nomenclatures: InventorizationModel['nomenclatures']) =>
  nomenclatures.reduce<
    Record<
      ArrayFirst<InventorizationModel['nomenclatures']>['title'],
      InventorizationModel['nomenclatures']
    >
  >((acc, nomenclature) => {
    if (!acc[nomenclature.nomenclaturesGroup.title]) {
      acc[nomenclature.nomenclaturesGroup.title] = [nomenclature]
    } else {
      acc[nomenclature.nomenclaturesGroup.title].push(nomenclature)
    }

    return acc
  }, {})
