import { ArrayFirst } from 'shared/types/utils'

import { InventorizationDetailDTO } from '../../api/dto'

type GroupNomenclaturesResult = Record<
  ArrayFirst<InventorizationDetailDTO['nomenclatures']>['title'],
  InventorizationDetailDTO['nomenclatures']
>

export const groupNomenclatures = (
  nomenclatures: InventorizationDetailDTO['nomenclatures'],
): GroupNomenclaturesResult =>
  nomenclatures.reduce<GroupNomenclaturesResult>((acc, nomenclature) => {
    acc[nomenclature.group.title]
      ? acc[nomenclature.group.title].push(nomenclature)
      : (acc[nomenclature.group.title] = [nomenclature])

    return acc
  }, {})
