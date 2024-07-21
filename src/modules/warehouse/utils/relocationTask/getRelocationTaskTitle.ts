import { RelocationTaskModel } from 'modules/warehouse/models'

import { valueOr } from 'shared/utils/common'

export const getRelocateFromToTitle = (
  relocationTask?: Pick<RelocationTaskModel, 'relocateFrom' | 'relocateTo'>,
  text: string = 'Заявка на перемещение оборудования',
): string =>
  `${text} ${valueOr(relocationTask?.relocateFrom?.title)} → ${valueOr(
    relocationTask?.relocateTo?.title,
  )}`
