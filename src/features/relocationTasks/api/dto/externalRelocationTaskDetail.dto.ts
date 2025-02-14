import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

import { ExternalRelocationStatusEnum } from '../constants'

export type ExternalRelocationDetailDTO = {
  id: IdType
  number: MaybeNull<string>
  status: MaybeNull<ExternalRelocationStatusEnum>
}
