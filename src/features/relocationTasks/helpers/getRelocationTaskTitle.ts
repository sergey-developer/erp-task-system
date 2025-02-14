import { valueOr } from 'shared/utils/common'

import { RelocationTaskDetailDTO } from '../api/dto'

export const getRelocateFromToTitle = (
  relocationTask?: Pick<RelocationTaskDetailDTO, 'relocateFrom' | 'relocateTo'>,
  text: string = 'Заявка на перемещение оборудования',
): string =>
  `${text} ${valueOr(relocationTask?.relocateFrom?.title)} → ${valueOr(
    relocationTask?.relocateTo?.title,
  )}`
