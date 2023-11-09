import { RelocationTaskModel } from 'modules/warehouse/models'

import { valueOrHyphen } from 'shared/utils/common'

export const getRelocationTaskTitle = (
  relocationTask?: Pick<RelocationTaskModel, 'relocateFrom' | 'relocateTo'>,
): string =>
  `Заявка на перемещение оборудования ${valueOrHyphen(
    relocationTask?.relocateFrom?.title,
  )} → ${valueOrHyphen(relocationTask?.relocateTo?.title)}`
