import { RelocationTaskModel } from 'modules/warehouse/models'

import { valueOrHyphen } from 'shared/utils/common'

export const getRelocateFromTo = (
  relocationTask?: Pick<RelocationTaskModel, 'relocateFrom' | 'relocateTo'>,
  text: string = 'Заявка на перемещение оборудования',
): string =>
  `${text} ${valueOrHyphen(relocationTask?.relocateFrom?.title)} → ${valueOrHyphen(
    relocationTask?.relocateTo?.title,
  )}`
